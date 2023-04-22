---
title: "Deploy Waline on Self Host"
date: 2023-04-21T22:11:27+08:00
type: posts
tags: 
    - Waline
categories: 
    - Ops
    - Tutorial
---

Waline is derived from [Valine][valine] and is a very simple and secure comment system. With rich features, Waline is an excellent choice as a blog comment system. There are various deployment methods available for Waline, but if you have your own server, it is preferable to deploy Waline on it with a local database. This article mainly shares the experience of deploying Waline with a local database on a self host.

<!--more-->

Here are all the deploy methods supported by Waline. On a self host, you can choose to install it directly or in a Docker container. Waline supports various types of databases, including MongoDB, MySQL/MariaDB, TiDB, and PostgreSQL. This article mainly introduces the deploy procedure using MySQL/MariaDB as the database. (deploy with other databases is similar)

|                                   |                          |                            |
| ----------------------------------| :----------------------: | -------------------------- |
| **Client**                        | **Server**               | **Storage**                |
| [@waline/client][waline_client]   | [Vercel][vercel]         | [LeanCloud][leancloud]     |
| [MiniValine][minivaline]          | [Deta][data]             | [CloudBase][cloudbase]     |
| [sodesu][sodesu]                  | [CloudBase][cloud_base]  | [MongoDB][mongodb]         |
|                                   | [Railway][railway]       | [MySQL][mysql]             |
|                                   | [Render][render]         | [SQLite][sqllite]          |
|                                   | [Zeabur][zeabur]         | [PostgreSQL][postgresql]   |
|                                   | [Netlify][netify]        | [GitHub][github]           |
|                                   | Docker                   | [Deta Base][data_base]     |
|                                   | Self Host                | [TiDB][tidb]               |

## Prepare Database

Open a MySQL prompt and create a new user for Waline to access the database (or use an existing user), then create a database for Waline. Grant the user all privileges for that database.

```mysql
# Create user
CREATE USER <user> IDENTIFIED BY mysql_native_password BY '<password>';

# Create daabase
CREATE DATABASE <database_name> DEFAULT CHARSET=utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;

# Grant user privilleges
GRANT ALL PRIVILEGES ON <database_name>.* TO <user>;

# flush user data
FLUSH PRIVILEGES;
```

> **Note**：If the database name contains special characters such as "." or "-", you need to enclose it in "``".

{{< admonition warning >}}

Some PHP versions are not compatible with the MySQL new authentication plugin `caching_sha2_password`. Starting from MySQL 8.0.4, the default authentication plugin for MySQL has been changed from `mysql_native_password` to `caching_sha2_password`. Waline does not support this authentication method by now. If the account provided to Waline uses the `caching_sha2_password` authentication plugin, Waline will not be able to start correctly. You can change the authentication plugin to `mysql_native_password` by changing the user's password.

```mysql
ALTER USER <user> IDENTIFIED WITH mysql_native_password BY '<password>';
```

> **Note**：For security reasons, it is recommended to create a separate account for Waline with the `mysql_native_password` authentication instead of changing the authentication method of an existing account.

{{< /admonition >}}

Start a MySQL prompt with Waline's MySQL account, and import [waline.sql][waline_sql] to create the Waline data structure.

```mysql
USE <database_name>
SOURCE <path_to_waline.sql>
```

## Install Waline

{{< admonition tip >}}

Before installing Waline, please make sure that Node.js (>=14) and the corresponding `npm` have been installed on your system. Some official of the Linux distributions may only provide elder versions of Node.js. You can follow the instructions on [installing Node.js via package manager][nodejs_install] to install a proper version.

[nodejs_install]:https://nodejs.org/en/download/package-manager

{{< /admonition >}}

Install Waline directly using `npm`

```bash
npm install --prefix <waline_install_dir> @waline/vercel
```

> **Note**：Without --prefix <waline_install_dir> option, Waline will be installed to the current working directory by default.

## Configure Waline

Currently, almost all the Linux distributions use `systemd`, so we will use `systemd` to manage the Waline service. First, you need to create a `systemd` unit file, create the *waline.service* file under the path */etc/systemd/system/multi-user.target.wants/*, and fill in the your configurations. Here is an example using MySQL:

```systemd
[Unit]
Description=A simple comment system with backend support fork from Valine.

[Service]
User=<service_user>
Group=<service_user_group>
Restart=always
Type=simple
WorkingDirectory=<waline_work_fdir>
ExecStart=/usr/bin/node <waline_install_dir>/node_modules/@waline/vercel/vanilla.js
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
Environment=MYSQL_HOST=127.0.0.1
Environment=MYSQL_PORT=3306
Environment=MYSQL_PREFIX=wl_
Environment=MYSQL_CHARSET=utf8mb4
Environment=MYSQL_SSL=false
Environment=MYSQL_DB=<waline_database_name>
Environment=MYSQL_USER=<waline_database_user>
Environment=MYSQL_PASSWORD=<waline_database_user_password>

[Install]
WantedBy=multi-user.target
```

> `systemd` supports the syntax `Environment=<param1>=<value1> "<param2>=<value2> <value3>"` to add environment variables. `systemd` also supports using `EnvironmentFile=<file_path>` to specify the environment configure file. Adding a prefix "-" before the <file_path> ignores the read error if the file does not exist.
> Other database environment variables configuration can be found in the [Official Documentation][waline_dbenv].

After creating the unit file, use `sudo systemctl daemon-reload` to reload the systemd unit and then start Waline.

```bash
sudo systemctl start waline  # Start Waline Service
sudo systemctl enable waline # Configure Waline to start automatically on boot
```

You can use `sudo systemctl status waline` to check the current running status of Waline. If *Active* is shown, it indicates Waline is now running.

```bash
sudo systemctl status waline
● waline.service - A simple comment system with backend support fork from Valine.
     Loaded: loaded (/etc/systemd/system/multi-user.target.wants/waline.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2023-04-21 15:25:49 BST; 1h 58min ago
   Main PID: 43772 (node)
      Tasks: 18 (limit: 882)
     Memory: 150.8M
     CGroup: /system.slice/waline.service
             ├─43772 /usr/bin/node /path_to_waline/node_modules/@waline/vercel/vanilla.js
             └─43788 /usr/bin/node /path_to_waline/node_modules/@waline/vercel/vanilla.js

Apr 21 15:25:50 my_server node[43772]: [2023-04-21T15:25:50.976] [43772] [INFO] - ThinkJS version: 3.2.14
Apr 21 15:25:50 my_server node[43772]: [2023-04-21T15:25:50.977] [43772] [INFO] - Environment: production
```

> If error occurs, you can use `sudo journalctl -u waline` to view the complete Waline running log for debugging.

If Waline is running properly, you can access `http://<server IP or domain name>:8360/ui/register` to register a user account. The first registered user will automatically become an administrator.

> Traffic of port 8360 needs to be allowed for Waline web accessing.
> If you don't want to use a port to access Waline, you can refer to [Nginx Reverse Proxy][nginx_proxy].

[valine]:https://valine.js.org/
[waline_client]:https://waline.js.org/
[minivaline]:https://minivaline.js.org/
[sodesu]:https://github.com/BeiyanYunyi/sodesu
[vercel]:https://vercel.com/
[data]:https://deta.space/
[cloud_base]:https://cloudbase.net/
[railway]:https://railway.app/
[render]:https://render.com/
[zeabur]:https://zeabur.com/
[netify]:https://netlify.com/
[leancloud]:https://leancloud.app/
[cloudbase]:https://cloudbase.net/
[mongodb]:https://mongodb.com/
[mysql]:https://www.mysql.com
[sqllite]:https://sqlite.org/index.html
[postgresql]:https://www.postgresql.org/
[github]:https://github.com/
[data_base]:https://deta.space/docs/en/reference/base/about
[tidb]:https://tidbcloud.com/
[waline_sql]:https://raw.githubusercontent.com/walinejs/waline/main/assets/waline.sql
[waline_dbenv]:https://waline.js.org/en/reference/server/env.html#database
[nginx_proxy]:https://waline.js.org/en/guide/deploy/vps.html#nginx-config
