---
title: 在 RedHat 系 Linux 中部署 LNMP
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

LNMP 是一个开源的 Web 开发应用栈，本文详细讲解了如何在 RedHat 系的 Linux 发行版中安装部署 LNMP.
<!--more-->

{{< admonition info "什么是 LNMP" true >}}

LNMP分别代表Linux、Nginx、MySQL/MariaDB、PHP，LNMP就是 Linux 系统下 Nginx + MySQL/MariaDB + PHP 这种网站服务器架构。

此教程适用于所有 RedHat 系 Linux 发行版 (RedHat、CentOS、Fedora、Alma Linux、Rocky Linux 等)

{{< /admonition >}}

## Nginx

### 安装

{{< admonition tip >}}

如果你使用的是 CentOS 请首先确保系统中已经添加了 EPEL repository，如果没有可以使用以下指令进行添加安装

```bash
sudo yum install epel-release
```

{{< /admonition >}}

使用 `yum` 或者 `dnf` 的安装命令安装 Nginx 即可

```bash
sudo yum install nginx # RHEL/CentOS 7 或更早版本
sudo dnf install nginx
```

使用 `systemctl` 相关指令启动服务（一般来说会自动启动）

```bash
sudo systemctl start nginx  # 启动 nginx 服务
sudo systemctl enable nginx # 设置 nginx 开机自启
```

`systemctl` 指令在启动服务后不会自动返回服务运行状态，可以使用 `systemctl status nginx` 查看当前 `nginx` 运行状态。

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

{{< admonition tip "查看服务运行日志" false >}}

`systemctl status <UNIT>` 可以查看当前服务运行状态，并输出简略的日志记录。更详细的日志可以通过 `journalctl` 进行查看，例如

```bash
sudo journalctl -u nginx
```

会打印输出所有 `nginx` 运行日志。
{{< /admonition >}}

{{< admonition tip "更多实用 `ststemctl` 指令" false >}}

```bash
sudo systemctl start nginx   # 启动 Nginx 服务
sudo systemctl status nginx  # 查看 Nginx 状态
sudo systemctl stop nginx    # 停止 Nginx 服务
sudo systemctl restart nginx # 重启 Nginx 服务
sudo systemctl enable nginx  # 配置 Nginx 开机自启
sudo systemctl disable nginx # 关闭 Nginx 开机自启
```

{{< /admonition >}}

### 防火墙配置

为了让网页服务能够被正常访问，需要放行 HTTP 以及 HTTPS 相关端口的流量，可以通过以下指令进行系统防火墙配置。

```bash
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --reload
```

{{< admonition warning >}}

为了安全起见，建议启动系统防火墙；若此前防火墙未被开启且你当前正在使用 SSH 链接到服务主机，在开启防火墙之前请先确保 SSH 服务相关端口没有被防火墙阻挡，否则可能会造成链接中断。

通过以下指令查询服务端口是否已经被预先定义(例如 http，https，mysql)

```bash
firewall-cmd -get-services
```

如果其中包含了 `ssh` 服务，直接使用一下指令放行该服务流量

```bash
sudo firewall-cmd --permanent --add-service=SERVICE
```

如果其中未定义 `ssh` 服务端口，则可以通过以下指令放行特定端口的流量(以默认 `ssh` 默认使用的 22 号端口为例)

``` bash
sudo firewall-cmd --permanent --add-port=22/tcp
```

{{< /admonition >}}

完成上述配置以后，在浏览器中输入服务器的 IP 或域名可以看到以下页面，说明 nginx 已经正常安装配置完成

{{< image src="images/nginx_example_page.webp" caption="Example Page" title="CentOS Nginx Example Page">}}

> **注**：不同的 Linux 发行版展示的页面会有所不同。

## MySQL/MariaDB

### 安装

MariaDB 兼容 MySQL 的所有功能，同时还提供了一些额外的功能，并在性能相对 MySQL 有一定性能上的提升。他们的命令行接口几乎是完全一致的，根据自己的需要安装一个即可。

```bash
# MySQL
sudo yum install mysql mysql-server # RHEL/CentOS 7 或更早版本
sudo dnf install mysql mysql-server
# MariaDB
sudo yum install mariadb mariadb-server # RHEL/CentOS 7 或更早版本
sudo dnf install mariadb mariadb-server
```

安装完成之后启动 MySQL 服务 (一般来说会自动启动)

```bash
sudo systemctl start mysql  # 启动 mysql 服务
sudo systemctl enable mysql # 设置 mysql 开机自启
```

{{< admonition tip >}}

部分系统自带的源中并不包含 MySQL，但都包含 MariaDB. 如果需要安装 MySQL 需要先到 [MySQL 社区版 Yum 仓库](https://dev.mysql.com/downloads/repo/yum/) 中找到自己系统对应的源并下载安装。

例如 CentOS 7 可以下载安装该源。

{{< image src="images/mysql_yum_repositories.webp" title="MySQL Yum Repositories">}}

```bash
curl -sSLO https://dev.mysql.com/get/mysql80-community-release-el7-7.noarch.rpm
sudo rpm -ivh mysql80-community-release-el7-7.noarch.rpm
```

{{< /admonition >}}

### 配置

对于全新安装的 MySQL 建议运行 DBMS (Database Management System) 提供的安全配置脚本 `mysql_secure_installation`，进行基础的安全性设置。（该脚本会帮助更改一些不那么安全的默认配置，例如 远程 root 登陆）。

{{< admonition warning >}}

从 2022 年 7 月开始，新安装的 MySQL 需要爱进行一定的配置才能使用 `mysql_secure_installation` 脚本，否则会卡在一个设置 root 用户密码的死循环。这是因为新安装的 MySQL 默认没有为 root 用户分配密码，且当前并没有启动密码访问。

为了避免这样的问题，在进行安全选项配置之前需要先为 root 用户设定密码。

```bash
# 以 root 身份运行 MySQL 命令提示符
sudo mysql
# 修改 root 用户密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<new_password>';
# 刷新用户数据
FLUSH PRIVILEGES；
```

完成以上设置后输入 `exit` 退出 MySQL 命令提示符，至此可以进行后续配置了。

{{< /admonition >}}

运行 `mysql_secure_installation` 根据提示进行安全配置。

```bash
sudo mysql_secure_installation 
```

{{< admonition tip "建议配置" true >}}

* VALIDATE PASSWORD COMPONENT - `Y`
* Level of password validation policy - `2` (STRONG)
* Remove anonymous users? - `Y`
* Disallow root login remotely? - `Y`
* Remove test database and access to it? - `Y`
* Reload privilege tables now? - `Y`

{{< /admonition >}}

## PHP 安装

直接使用 `yum` 或者 `dnf` 安装相关 Package 即可

```bash
sudo yum install php php-mysqlnd php-fpm # RHEL/CentOS 7 或更早版本
sudo dnf install php php-mysqlnd php-fpm
```

{{< admonition tips >}}

如果当前系统的源中没有 PHP 相关的 Pakage 可以通过以下指令进行配置。

```bash
# 对于 RHEL/CentOS 7
sudo yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm

# 对于 RHEL/CentOS/Alma/Rocky 8
sudo dnf install http://rpms.remirepo.net/enterprise/remi-release-8.rpm

# 对于 RHEL/CentOS/Alma/Rocky 9
sudo dnf install http://rpms.remirepo.net/enterprise/remi-release-8.rpm
```

{{< /admonition >}}

安装完成后启动 PHP-FPM (一般会自行启动)

```bash
sudo systemctl start php-fpm  # 启动 php-fpm
sudo systemctl enable php-fpm # 设置 php-fpm 开机自启
```
