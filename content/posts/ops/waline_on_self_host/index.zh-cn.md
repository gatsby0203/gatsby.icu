---
title: "服务器独立部署 Waline"
date: 2023-04-21T22:11:27+08:00
type: posts
tags: 
    - Waline
categories: 
    - Ops
    - Tutorial
---

Waline 从 [Valine][valine] 衍生而来，是一款简洁、安全的评论系统。Waline 功能丰富，作为博客评论系统是一个非常不错的选择。Waline 有多种部署方式可选，在拥有服务器的情况下，当然更希望将 Waline 部署到自己的服务器上。本文主要分享在服务器上使用本地数据库部署 Waline 的经验。

<!--more-->

以下为 Waline 支持的所有部署方式，在个人服务器上可以选择在 Docker 容器中安装，也可以选择直接安装。Waline 数据库的支持十分多样，本地数据库有 MongoDB、MySQL/MariaDB、TiDB、PostgreSQL 四种选择。本文主要介绍的是以 MySQL/MariaDB 为后端数据库的部署流程，其他数据库的部署方式也完全类似。

| **客户端脚本**                    | **服务端部署**                    | **数据存储**                     |
| :------------------------------:| :------------------------------: | :------------------------------:|
| [@waline/client][waline_client] | [Vercel][vercel]                 | [LeanCloud][leancloud]          |
| [MiniValine][minivaline]        | [Deta][data]                     | [CloudBase][cloudbase]          |
| [sodesu][sodesu]                | [CloudBase][cloud_base]          | [MongoDB][mongodb]              |
|                                 | [百度云 CFC][baidu_cfc]           | [MySQL][mysql]                  |
|                                 | [阿里云 FC][ali_cfc]              | [SQLite][sqllite]               |
|                                 | [Railway][railway]               | [PostgreSQL][postgresql]        |
|                                 | [Render][render]                 | [GitHub][github]                |
|                                 | [Zeabur][zeabur]                 | [Deta Base][data_base]          |
|                                 | [Netlify][netify]                | [TiDB][tidb]                    |
|                                 | Docker                           |                                 |
|                                 | 独立部署                           |                                 |

## 准备数据库

打开 MySQL 命令提示符为 Waline 新建一个用户用于数据库访问（也可以使用现有用户），以及一个数据库为 Waline 提供后端数据存储支持，并为用户授予该数据库的所有访问权限。

```mysql
# 新建用户
CREATE USER <用户名> IDENTIFIED BY mysql_native_password BY '<密码>';

# 新建数据库
CREATE DATABASE <数据库名> DEFAULT CHARSET=utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;

# 授予用户数据库访问权限
GRANT ALL PRIVILEGES ON <数据库名>.* TO <用户>;

# 刷新用户数据
FLUSH PRIVILEGES;
```

> **注**：如果 Database 名称包含 “.”、“-” 等特殊字符时，需要用 `` ` `` 号括起来.

{{< admonition warning >}}

一些版本的 PHP 与 MySQL 的身份认证插件 `caching_sha2_password` 不兼容，从 MySQL 8.0.4 开始 MySQL 默认身份验证插件从 `mysql_native_password`  改为 `caching_sha2_password`. 目前 Waline 并不默认支持这样的验证方式，如果提供给 Waline 的账户使用的是 `caching_sha2_password` 身份认证插件则将无法正确启动 Waline，可以使用修改用户密码的方式将身份认证插件更改为 `mysql_native_password`

```mysql
ALTER USER <用户> IDENTIFIED WITH mysql_native_password BY '<密码>';
```

> **注**：出于安全性考量，建议为 Waline 单独建立使用 `mysql_native_password` 认证的账户，而非更改现有账户的认证方式。

{{< /admonition >}}

使用提供给 Waline 的 账户启动 MySQL 提示符，导入 [waline.sql][waline_sql] 以完成 Waline 存储数据的三张表的构建。

```mysql
USE <数据库名称>
SOURCE <waline.sql 文件路径>
```

## 下载安装 Waline

{{< admonition tip >}}

安装 Waline 之前请确保服务器上已经安装了 Node.js (>=14) 以及对应的 `npm`. 一些 Linux 发行版的官方 Repository 中也许只包含较早版本的 Node.js，可以根据 [通过包管理器安装 Node.js][nodejs_install]的操作说明安装合适Node.js。

[nodejs_install]:https://nodejs.org/en/download/package-manager

{{< /admonition >}}

直接使用 `npm` 安装 Waline

```bash
npm install --prefix <Waline 安装路径> @waline/vercel
```

> **注**：不使用 `--prefix <Waline 安装路径>` 指定安装路径时，默认安装的到当前工作路径。

## 配置启动 Waline

目前几乎所有的 Linux 发行版都使用 `systemd`，这里也使用 `systemd` 来创建和管理 Waline 服务。首先创建 systemd 单元，在 */etc/systemd/system/multi-user.target.wants/waline.service* 路径下创建 *waline.service* 文件，编辑文件填入相关配置，此处以 MySQL 举例：

```systemd
[Unit]
Description=A simple comment system with backend support fork from Valine.

[Service]
User=<运行服务用户>
Group=<运行服务用户组>
Restart=always
Type=simple
WorkingDirectory=<waline 工作路径>
ExecStart=/usr/bin/node <waline 安装路径>/node_modules/@waline/vercel/vanilla.js
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
Environment=MYSQL_HOST=127.0.0.1
Environment=MYSQL_PORT=3306
Environment=MYSQL_PREFIX=wl_
Environment=MYSQL_CHARSET=utf8mb4
Environment=MYSQL_SSL=false
Environment=MYSQL_DB=<waline 数据库名>
Environment=MYSQL_USER=<waline 数据库用户名>
Environment=MYSQL_PASSWORD=<waline 数据库用户密码>

[Install]
WantedBy=multi-user.target
```

> `systemd` 支持 `Environment=<环境变量1>=<值1> "<环境变量2>=<值2> <值3>"` 的语法添加环境变量。`systemd` 也支持使用 `EnvironmentFile=<文件路径>` 的方式指定文件路径，然后在相应文件中进行环境变量的配置。在“<文件路径>”前添加前缀“-”可以忽略文件不存在的读取错误。
> 其他数据库的环境变量配置请参见[官方文档][waline_dbenv]。

完成单元文件配置后，使用 `sudo systemctl daemon-reload` 重新载入 `systemd` 单元便可以启动 Waline 了。

```bash
sudo systemctl start waline  # 启动 Waline
sudo systemctl enable waline # 配置 Waline 开机自启
```

使用 `sudo systemctl status waline` 可以查看当前 Waline 的运行状态，*Active* 即表示成功运行。

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

> 如果运行出现问题，可以使用 `sudo journalctl -u waline` 查看 Waline 完整运行日志进行问题排查。

Waline 成功运行后，就可以通过浏览器访问 *http://<服务器IP或域名>:8360/ui/register* 进行用户注册。第一个注册的用户将会自动成为管理员。

> 进行网页访问时请确保端口 8360 已开启，否则无法进行访问；如果你的服务器部署在中国大陆境内且未完成备案，那么你可能无法通过域名进行访问。
> 如果你不想使用端口进行访问，可以参考官方文档中的 [Nginx 反向代理][nginx_proxy] 配置文件进行配置。

[valine]:https://valine.js.org/
[waline_client]:https://waline.js.org/
[minivaline]:https://minivaline.js.org/
[sodesu]:https://github.com/BeiyanYunyi/sodesu
[vercel]:https://vercel.com/
[data]:https://deta.space/
[cloud_base]:https://cloudbase.net/
[baidu_cfc]:https://console.bce.baidu.com/cfc/#/cfc/functions
[ali_cfc]:https://fc.console.aliyun.com/
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
[waline_dbenv]:https://waline.js.org/reference/server/env.html#数据库
[nginx_proxy]:https://waline.js.org/guide/deploy/vps.html#nginx-配置
