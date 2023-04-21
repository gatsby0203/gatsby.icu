---
title: Install LNMP Stack on Red Hat-Based System
date: 2023-04-20T19:29:04+08:00
type: posts
tags: 
    - LNMP
    - RedHat
    - CentOS
    - Fedora
    - Alma Linux
    - Rocky Linux
categories: 
    - Ops
    - Tutorial
---

LEMP is an open-source web application stack used to develop web applications. This is a comprehensive tutorial of how to install LNMP stack on Red Hat-based linux distribution.

<!--more-->

{{< admonition info "What is LNMP" true >}}
The acronym LNMP stands for Linux, Nginx, MySQL/MariaDB, and PHP
A LNMP stack is a group of open source software (Nginx, MySQL/MariaDB, and PHP) running on a Linux system to implement a web server.

This tutorial is applicable to all Red Hat-based systems (Red Hat, CentOS, Fedora, Alma Linux, and Rocky Linux, etc.).
{{< /admonition >}}

## Nginx

### Installation

{{< admonition tip >}}

If you are using CentOS, please ensure that the EPEL repository has been added to the system. If not, you can add it using the following commands:

```bash
sudo yum install epel-release
```

{{< /admonition >}}

Use `yum` or `dnf` to install Nginx

```bash
sudo yum install nginx # RHEL/CentOS 7 or earlier
sudo dnf install nginx
```

Use the `systemctl` command to start a service (which is generally started automatically).

```bash
sudo systemctl start nginx  # Start nginx service
sudo systemctl enable nginx # Configure Nginx to start automatically on boot
```

The `systemctl` command does not automatically return the status of a service after starting it. You can use `systemctl status nginx` to view the current running status of the nginx service.

```bash
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2023-04-17 14:08:59 BST; 1 day 14h ago
       Docs: man:nginx(8)
   Main PID: 406 (nginx)
      Tasks: 2 (limit: 882)
     Memory: 7.2M
     CGroup: /system.slice/nginx.service
             ├─ 406 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
             └─4225 nginx: worker process

Apr 17 14:08:59 gatsby-RackNerd systemd[1]: Starting A high performance web server and a reverse proxy server...
```

{{< admonition tip "Check service logs" false >}}

`systemctl status <UNIT>` can be used to check the current running status of a service and output a brief log record. More detailed logs can be viewed using `journalctl`. For example:

```bash
sudo journalctl -u nginx
```

It will print all `nginx` running logs.

{{< /admonition >}}

{{< admonition tip "More useful `ststemctl` command" false >}}

```bash
sudo systemctl start nginx   # Start Nginx service
sudo systemctl status nginx  # Check Nginx service status
sudo systemctl stop nginx    # Stop Nginx service
sudo systemctl restart nginx # Restart Nginx service
sudo systemctl enable nginx  # Configure Nginx to start automatically on boot
sudo systemctl disable nginx # Disable Nginx from starting automatically on boot
```

{{< /admonition >}}

### Firewall Configurations

To allow access to web services, you need to allow traffic on the HTTP and HTTPS ports. This can be done by configuring the system firewall with the following commands.

```bash
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --reload
```

{{< admonition warning >}}

For security purposes, it is recommended to enable the system firewall. If the firewall was not previously enabled and you are currently using SSH to connect to the server, make sure that the SSH service port is not blocked by the firewall before enabling it, otherwise your connection may be interrupted.

Use the following command to check if the service ports have been pre-defined (for example, http, https, mysql).

```bash
firewall-cmd -get-services
```

If the `ssh` service is defined, use the following command to allow traffic of `ssh`.

```bash
sudo firewall-cmd --permanent --add-service=SERVICE
```

If the `ssh` is not defined, use the following command to allow traffic for a specific port (for example, port 22, which is the default port for `ssh`).

``` bash
sudo firewall-cmd --permanent --add-port=22/tcp
```

{{< /admonition >}}

Now, enter the server's IP or domain name in a web browser, you will see the following page, witch indicating that Nginx has been successfully installed and configured.

{{< image src="images/nginx_example_page.png" caption="Example Page" title="CentOS Nginx Example Page">}}

> **Note**: This page may diverse in different Linux distributions. 

## MySQL/MariaDB

### Installation

MariaDB is fully compatible with MySQL and also provides some additional features, while having a certain performance improvement compared to MySQL. Their command line interfaces are almost identical. Install one according to your needs.

```bash
# MySQL
sudo yum install mysql mysql-server # RHEL/CentOS 7 or earlier
sudo dnf install mysql mysql-server
# MariaDB
sudo yum install mariadb mariadb-server # RHEL/CentOS 7 or earlier
sudo dnf install mariadb mariadb-server
```

After installation, start the MySQL service (which is generally started automatically).

```bash
sudo systemctl start mysql  # Start MySQL service
sudo systemctl enable mysql # Configure MySQL to start automatically on boot
```

{{< admonition tip >}}

Some distributions do not include MySQL in repositories, but they probably include MariaDB. If you are insist to install MySQL, you need to first go to the [MySQL Yum Repository](https://dev.mysql.com/downloads/repo/yum/) to find the repository that corresponds to your distribution, download and install it.

For example, CentOS 7 should install this package.

{{< image src="images/mysql_yum_repositories.png" title="MySQL Yum Repositories">}}

```bash
curl -sSLO https://dev.mysql.com/get/mysql80-community-release-el7-7.noarch.rpm
sudo rpm -ivh mysql80-community-release-el7-7.noarch.rpm
```

{{< /admonition >}}

### Configuration

For a newly installed MySQL, it is recommended to run the security configuration script `mysql_secure_installation` provided by the DBMS (Database Management System) to perform basic security settings. (This script will help change some default configurations which may have security risks, eg. remote root login.)

{{< admonition warning >}}

As of July 2022, new installation of MySQL requires some configuration before running the `mysql_secure_installation` script, otherwise it will get stuck in a endless loop of attempting to set the root user password. This is because the root user does not connect a password by default and there is currently no password authentication enabled.

To avoid this issue, you need to set a password for the root user before performing security option configuration.

```bash
# start a MySQL prompt with root
sudo mysql
# assign a password to root user
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<new_password>';
# flush user data
FLUSH PRIVILEGES；
```

Enter `exit` to exit the MySQL prompt, and now you can proceed.

{{< /admonition >}}

Run `mysql_secure_installation` to perform security configurations based on prompts.

```bash
sudo mysql_secure_installation 
```

{{< admonition tip "Recommended Configurations" true >}}

* VALIDATE PASSWORD COMPONENT - `Y`
* Level of password validation policy - `2` (STRONG)
* Remove anonymous users? - `Y`
* Disallow root login remotely? - `Y`
* Remove test database and access to it? - `Y`
* Reload privilege tables now? - `Y`

{{< /admonition >}}

## PHP

Use `yum` or `dnf` to install the relevant package directly.

```bash
sudo yum install php php-mysqlnd php-fpm # RHEL/CentOS 7 or earlier
sudo dnf install php php-mysqlnd php-fpm
```

{{< admonition tip >}}

If the PHP related packages are not available in the system repository, you can configure them using the following command.

```bash
# for RHEL/CentOS 7
sudo yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm

# for RHEL/CentOS/Alma/Rocky 8
sudo dnf install http://rpms.remirepo.net/enterprise/remi-release-8.rpm

# for RHEL/CentOS/Alma/Rocky 9
sudo dnf install http://rpms.remirepo.net/enterprise/remi-release-8.rpm
```

{{< /admonition >}}

Start the PHP-FPM service (which is generally started automatically):

```bash
sudo systemctl start php-fpm  # Start php-fpm
sudo systemctl enable php-fpm # Configure php-fpm to start automatically on boot
```
