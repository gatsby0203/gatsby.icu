---
title: 安装 OMNeT++
date: 2023-06-01T19:29:04+08:00
type: posts
tags: 
    - OMNeT++
categories: 
    - OMNeT++
    - Tutorial
reward: false
---

OMNeT++ 是一个可扩展的、模块化的、基于组件的 C++ 框架，OMNeT++ 目前主要用于构建网络仿真。本文详细介绍了如何在 Windows, WSL, macOS, Linux 中编译安装 OMNeT++.

<!--more-->

通过以下链接可以下载到最新的 OMNeT++ 6.0.1，压缩包包含官方的安装指南“doc/InstallGuide.pdf”，其中

{{< link href="https://github.com/omnetpp/omnetpp/releases/download/omnetpp-6.0.1/omnetpp-6.0.1-linux-x86_64.tgz" content="Linux" title="OMNeT++ for Linux" download="omnetpp-6.0.1-linux-x86_64.tgz">}} | {{< link href="https://github.com/omnetpp/omnetpp/releases/download/omnetpp-6.0.1/omnetpp-6.0.1-macos-x86_64.tgz" content="macOS" title="OMNeT++ for macOS" download="omnetpp-6.0.1-macos-x86_64.tgz">}} | {{< link href="https://github.com/omnetpp/omnetpp/releases/download/omnetpp-6.0.1/omnetpp-6.0.1-windows-x86_64.zip" content="Windows" title="OMNeT++ for Windows" download="omnetpp-6.0.1-windows-x86_64.tgz">}}

## 配置

将安装文件解压，保险起见解压的目标路径尽量为英文和下划线的组合，不可以包含 @ ? # $ & ( ) \ | : ; ‘ ’ “ ” < >，也最好不要有空格和制表符。解压目标路径默认为程序最终存放路径，编译部署完成之后不可挪动程序，否则可能需要进行额外设置或是重新配置和编译。

解压后的文件中 `configure.user` 包含了所有用户可选配置，如无特殊需求保持默认即可，以下列出了 `configure.user` 全部配置，并进行了一些补充说明。

```bash
#
# 编译前的配置脚本会自动检测可用的编译器，但也可以手动指定编译器，手动设置 CC 和 CXX 后
# 将不再会自动检测可用编译器。
#
#CC=gcc
#CXX=g++

#
# 如果安装了多个编译器，默认优先使用 clang 进行编译，设置为 "no" 时优先使用 gcc/g++
# compiler is installed.
#
PREFER_CLANG=yes

#
# 如果安装了多个链接器，默认优先使用 LLVM-LLD  进行链接，设置为 "no" 时优先使用 GNU linker.
#
PREFER_LLD=yes

#
# 在 Windows 系统中是否使用 Visual C linker 和 Windows SDK 生成二进制文件
# 这将生成与 Visual C++ 编译器相互兼容的二进制文件. 该设置在其他操作系统中无效.
#
# USE_MS_ABI=yes

#
# 编译器优化选项
# 有两组选项，其中 MODE 变量("debug"或"release")会决定使用哪一组选项。手动设置时不会再进行任何自动检测，
# 因此在手动设置时要将所需的选项都设置完全。若需要修改，建议的做法是使用 `configure` 脚本自动检测生成配置，
# 生成完之后检查 Makefile.inc 中 CFLAGS_[RELEASE/DEBUG] 两个变量的配置，在其基础上根据需求进行修改再填写
# 到下面。
# (注意：在使用 gcc 和 gdb 时，为了获得最大的调试信息，请使用 -ggdb 或 -gstabs+3 选项）
# 使用gcc时，请勿使用 --omit-frame-pointer (当协程和同时使用 C++ 异常处理
# (throw/catch) 时会导致崩溃!)
#
#CFLAGS_DEBUG='-g -Wall'
#CFLAGS_RELEASE='-O3 -DNDEBUG=1'

#
# C++ 编译选项
# 由于OMNeT++需要 C++14 或更高版本，如果使用的编译器的默认语言兼容级别低于 C++14，
# 则可以在此处指定 -std=c++14 或类似的选项。这些选项将在编译 OMNeT++ 和仿真模型时使用.
#
#CXXFLAGS=-std=c++17

#
# 链接选项
# 手动设置时不会再进行任何自动检测，因此在手动设置时要将所需的选项都设置完全。若需要修改，
# 建议的做法是使用 `configure` 脚本自动检测生成配置，生成完之后检查 Makefile.inc 中的 LDFLAGS 变量的配置，
# 在其基础上根据需求进行修改再填写到下面。
#LDFLAGS=""

#
# 是否开启基于 QT 的图形化运行环境 (Qtenv).
# 当系统没有合适的 QT 版本，或仅需要使用命令行来运行仿真时，可以关闭该选项.
#
WITH_QTENV=yes

#
# 是否在QT环境中启用 OpenSceneGraph 支持
# OMNeT++ 中 3D 模型的渲染依赖 OpenSceneGraph，不开启此选项无法在 OMNeT++ 中渲染 3D 模型.
# OpenSceneGraph 版本需要 >= 3.2.
#
WITH_OSG=yes

#
# 是否启用 osgEarth
# osgEarth 是基于 OpenSceneGraph 开发的三维数字地球引擎.
# osgEarth 版本需要 >= 2.7.
#
WITH_OSGEARTH=no

#
# 是否在仿真可执行文件中动态加载 “NED” 文件
# 选择是否使用 “NED” 文件来构建网络，当你完全使用 C++ API 来构建仿真时可以选择 “no”.
#
WITH_NETBUILDER=yes

#
# 是否允许使用 LibXML2
# OMNeT++ 默认只使用 LibXML 来加载带有 DOCTYPE 声明的 XML 文件，其他 XML 文件
# 则用内置的解析器进行加载，他们相对 LibXML2 运行速度都更快且更节省内存.
#
WITH_LIBXML=no

#
# 是否启用并行分布式仿真功能
# 启用该功能需要装有 OpenMPI 或 MPICH2.
#
WITH_PARSIM=no

#
# 是否使用 SQLite 作为默认文件格式保存输出的 vector 和 scalar 文件
# 对 SQLite 的支持在 OMNeT++ 5.1 作为实验性功能引入
#
# 在 omnetpp.ini 文件中加入一下两行内容，或者在仿真运行命令中指定相关配置
#（指定配置时使用 "--" 作为前缀）即可在不改变默认设置的情况下输出 SQLite 格式的文件.
#
# outputvectormanager-class="omnetpp::envir::SqliteOutputVectorManager"
# outputscalarmanager-class="omnetpp::envir::SqliteOutputScalarManager"
#
PREFER_SQLITE_RESULT_FILES=no

#
# 是否启用 SystemC 支持 （只在商业版 OMNETS 中支持）
# SystemC 在 macOS 和 使用 MinGW 编译器的 Windows 中不受支持.
#
WITH_SYSTEMC=no

#
# 是否编译 OMNeT++ 为共享库（动态库）
# 如果想将 OMNeT++ 编译为静态库可以将该选项修改为 "no". 
# 在 make 编译时候，该选项可以被 `make SHARED_LIBS=no` 覆写. 设置为 "no" 时编译仿真模块时
# 也需要保持相同配置，使用 `make SHARED_LIBS=no` 进行编译.
# 默认情况下，OMNeT++ 将被编译成一系列共享库，如果想将仿真编译成一个独立的可执行文件，可以将这里设置为
# "no", 这样在编译仿真后将得到一个只需要 NED 和 INI 就可以运行仿真的可执行文件。
#
SHARED_LIBS=yes

#
# QT 相关的编译和链接选项
#
# 如果您希望使用自定义的 Qt（例如从官方Qt网页下载的或从源代码构建的）而不是系统上安装的默认版本
#（很可能是由软件包管理器安装的），请将该变量设置为指相应的 “qmake” 的路径。将其留空或注释掉则
# 使用系统默认 QT。
# 注意，在 Windows 和 macOS 上，强烈建议仅使用 OMNeT++ 附带的 QT，不要更改这个设置.
#
#QMAKE="/home/user/Qt/5.12/gcc_64/bin/qmake"
#
# 通过以下选项，可以指定编译 QT 相关模块时对应的编译选项和链接选项，通常，这些选项会通过 QT_PATH 变量
# 由 `configure` 脚本自动检测，因此只有在自动检测失败时才需要在此处进行编辑.
#
#QT_CFLAGS=
#QT_LIBS=

#
# 指定要使用的 OpenSceneGraph 库，留空以进行自动检测.
# 或指定一些无效值（如 "no" 以显式禁用 OpenSceneGraph ）
# 库中至少包含这些模块：osg osgGA osgViewer osgQt OpenThreads
#
#OSG_LIBS=

#
# 指定要使用的 osgEarth 库，留空以进行自动检测.
# 库中至少包含这些模块: osgEarth osgEarthUtil
#
#OSGEARTH_LIBS=

#
# ZLib 是一个受 libxml2 依赖的用于压缩的库.
#
# 在 MinGW 使用以下配置 (动态链接到 DLL)
#
#ZLIB_CFLAGS="-I/c/Tools/zlib-1.2.3/include"
#ZLIB_LIBS="-L/c/Tools/zlib-1.2.3/bin -lzlib1"
# 或:
#ZLIB_CFLAGS="-I$MSYS/include"
#ZLIB_LIBS="-L$MSYS/lib -lz"

# MPI (可选) 的编译和链接选项
# 对于 LAM/MPI, 终端中输入 `mpic++ -showme' 会给出 MPI_LIBS 使用提示（编译指令）.
#
# 如果注释掉以下配置，"configure" 脚本会尝试进行自动识别.
#
#MPI_CFLAGS="-I /usr/include"
#MPI_LIBS="-pthread -llammpio -llammpi++ -llamf77mpi -lmpi -llam -laio -laio -lutil"
#MPI_LIBS="-lmpi++ -lmpi"   #SGI

#
# LIBXML (可选) 的编译和链接选项 
#
# 使用 MinGW 编译时可以使用以下配置:
#  LIBXML_CFLAGS="-I/c/Tools/libxml2-2.6.20.win32/include -I/c/Tools/iconv-1.9.1.win32/include"
#  LIBXML_LIBS="-L/c/Tools/libxml2-2.6.20.win32/bin -lxml2 -L/c/Tools/iconv-1.9.1.win32/lib -liconv"
# 或:
#  LIBXML_CFLAGS="-I$MSYS/include"
#  LIBXML_LIBS="-L$MSYS/bin -lxml2 -L$MSYS/bin -liconv"
#
# 如果注释掉相关配置，"configure" 脚本会尝试进行自动识别.
#

#
# 是否启用 Akaroa
# Akaroa 可以用来提高仿真的可行度，通过 MRIP 技术对仿真进行加速.
# Akaroa(2.7.9) 目前只支持 Linux 和 Solaris，其他操作系统需要自己进行移植适配，
# Akaroa 需要事先手动进行编译和安装.
# 更多信息可以到 Akaroa 的网站查询: https://akaroa.canterbury.ac.nz/akaroa/
#
WITH_AKAROA=no

#
# Akaroa (可选) 的编译和链接选项 
#
# 使用 MinGW 编译时可以使用以下配置:
#  AKAROA_CFLAGS="-I/d/home/tools/akaroa-2.7.4/include"
#  AKAROA_LIBS="-L/d/home/tools/akaroa-2.7.4/lib -lakaroa"
# 
# 如果注释掉相关配置，"configure" 脚本会尝试进行自动识别.
#
#AKAROA_CFLAGS=
#AKAROA_LIBS=

#
# 以下的 OMNETPP_* 变量不需要进行修改，除非需要将 OMNeT++ 的部分内容放置到其他路径.
# (e.g. 例如将库放到 /usr/lib 中, 将头文件放到 /usr/include/omnetpp 中, 以此类推).
#
#OMNETPP_SRC_DIR="$OMNETPP_ROOT/src"
#OMNETPP_SAMPLES_DIR="$OMNETPP_ROOT/samples"
#OMNETPP_BIN_DIR="$OMNETPP_ROOT/bin"
#OMNETPP_INCL_DIR="$OMNETPP_ROOT/include"
#OMNETPP_LIB_DIR="$OMNETPP_ROOT/lib"

#
# 更多 OMNeT++ 环境变量
# 通过以下选项可以设置 opp_makemake 生成的 Makefile 中使用的工具.
# MSGC 决定编译 .msg 文件时使用的工具 (opp_msgc)，它可以将定义好的 Message
# 文件 (.msg) 转译为 C++.
#
# 注释掉相关配置，则使用默认值.
#MSGC="$OMNETPP_BIN_DIR/opp_msgc"

#
#
# 如果需要添加额外的图片或图标（可在仿真中使用），可以修改以下变量将它们添加进来
#
# OMNETPP_IMAGE_PATH="$OMNETPP_ROOT/images"
```

## 编译安装

### Windows

解压后，打开“omnetpp-6.0/mingwenv.cmd”，第一次运行时会自行解压安装 MinGW 环境（不会与已有 MinGW 冲突），完成后会自动打开新的命令行窗口。

{{< image src="images/Windows-OMNeT++_Compile-1.webp" caption="Windows 首次运行 OMNeT++ 终端" title="Windows OMNeT++ Compile - 1">}}

由于 Windows 安装包内包含了所有需要的依赖，无需安装额外的 Package，直接根据提示输入 `./configure` 脚本会自动根据当前用户配置生成 Makefile. Makefile 生成完之后根据提示输入 `make` 编译即可，编译过程会持续一段时间。此处可以设置 `make` 的 `-j` 参数，即同时允许执行的编译任务数量，这样可以更有效的利用CPU资源，加快编译的速度。例如 `make -j8`，让 `make` 最多允许 8 个编译任务同时执行。可设置为 CPU 的核心数或支持的线程 (Thread) 数，或者使用 `make -j$(nproc)` 以允许的最大进程数进行编译。

{{< image src="images/Windows-OMNeT++_Compile-2.webp" caption="Windows OMNeT++ configure 提示" title="Windows OMNeT++ configure Prompt">}}

{{< image src="images/Windows-OMNeT++_Compile-3.webp" caption="Windows OMNeT++ make 提示" title="Windows OMNeT++ make Prompt">}}

{{< admonition tip >}}

在 OMNeT++6.0 中编译完成之后，在 OMNeT++ 文件夹下会生成两个快捷方式，分别可用于启动 IDE 以及启动终端，可将快捷方式复制到桌面，以便快速启动OMNeT++.

{{< image src="images/Windows-OMNeT++_Shortcut.webp" caption="Windows OMNeT++ 快捷方式" title="Windows OMNeT++ Shortcut">}}

{{< /admonition >}}

### Windows Subsystem for Linux (WSL)

OMNeT++ 在 Linux 上的运行速度要明显快于在 Windows 上的运行速度。想要在 Windows 上使用 Linux 的开发环境，目前来看 WSL 是一个不错的选择。这一节简单介绍一下WSL的环境配置，完成 WSL 的安装配置以后直接按照 [Linux 下的 OMNeT++ 的安装](#linux) 教程进行安装即可。

{{< admonition note >}}

* 强烈建议在 WSL2 中进行安装，不过这对 Windows 系统版本有一定要求，Windows版本需要新于 Windows 10 version 2004 (build 19041)。(可以使用快捷键 Windows+R，输入 winver，运行查看 Windows 版本)

* 并不是所有 WLS 都对 GUI 程序进行了支持，如果你的 Windows 版本新于 Windows 11 (build 22000.*) 或 Windows 11 Insider Preview (builds 21362+)，安装 WLS2 时会自动安装 WSLg，可以直接运行 GUI 程序。若你为 Windows10 用户无法安装 WSLg，需要在你的 Windows 上额外部署一个 X-Window Server 来显示 GUI 程序。

* 目前 WSL 对 GUI 的支持还不够完善，再 WSL 中运行 OMNeT++ 多少存在一些 Bug (例如：3D模型渲染)，不过已经能够满足绝大部分的使用需求了。

{{< /admonition >}}

#### WSL 基本环境配置

建议 Windows Terminal 和 PowerShell 7 配合使用，Windows Terminal 在微软应用商店搜索安装即可，PowerShell 7 可在 [官方 GitHub 主页][pwsh_github] 下载最新的发行版进行安装。

##### 第一次安装

以管理员身份运行 Windows Terminal 并打开一个 PowerSehll 7 终端，输入以下指令安装 WSL.

```powershell
wsl.exe --install [Linux 发行版名称]
```

[Linux 发行版名称] 填入自己想要安装的Linux发行版即可，通过指令 `wsl -l -o`，可以查看目前微软提供的在线可下载的所有发行版。

{{< image src="images/WSL-Supported_Distributions.webp" caption="WSL 支持的 Linux 发行版" title="WSL Supported Distributions">}}

{{< admonition tip >}}

有时会因为网络问题无法安装，可以尝试设置为从网站下载数据而不是从 Microsoft Store 进行下载。

```powershell
wsl.exe --install --web-download [Linux 发行版名称]
```

{{< /admonition >}}

第一次安装 WSL 需要重启电脑，重启后系统会自动启动 Linux 的安装，安装过程需要耗费几分钟。等待系统安装完成，一切准备就绪后按照窗口提示设定 Linux 的用户名和密码即可。

##### 升级到 WSL2

一般默认会将 Linux 安装到 WSL2 上，可以通过指令 `wsl -l -v` 查看目前运行的 Linux 发行版以及相应的 WSL 版本。

{{< image src="images/WSL-Installed_List.webp" caption="WSL 已安装的发行版列表" title="WSL Installed List">}}

如果已经有运行在 WSL1 上的 Linux 发行版，可以将其升级到 WSL2 上运行。

```powershell
wsl --set-version [Linux发行版名称] 2
```

{{< admonition tip >}}

可以通过以下指令设定以后安装默认的WSL版本

```powershell
wsl --set-default-version [Version(1 或 2)]
```

{{< /admonition >}}

#### WSL GUI 配置

##### Windows 11

如果你的系统版本新于 Windows 11 (build 22000.*) 或 Windows 11 Insider Preview (builds 21362+)，则在安装 WSL 时会自动安装 WSLg，支持 GUI 程序显示。在进行后续操作时建议对软件包进行一下更新。

```bash
# Debian系 Debian/Ubuntu/Kali-Linux/Deepin
sudo apt update && sudo apt upgrade

# RedHat系 RHEL/CentOS/OracleLinux/Fedora/AlmaLinux/RockyLinux
sudo dnf upgrade

# SUSE openSUSE/SLES
sudo zypper update
```

WSL 默认不会安装桌面环境，也没有安装任何 GUI 工具，需要额外安装 `xdg-utils` 这个 Package 在 OMNeT++ 编译过程中会用到，其他 GUI 工具可以根据需要安装 (文件管理、文本编辑等)。

```bash
# Debian系 Debian/Ubuntu/Kali-Linux/Deepin
sudo apt install xdg-utils

# RedHat系 RHEL/CentOS/OracleLinux/Fedora/AlmaLinux/RockyLinux
sudo dnf install xdg-utils

# SUSE openSUSE/SLES
sudo zypper in xdg-utils
```

完成以上步骤后参照 [Linux 下的 OMNeT++ 的安装](#linux) 进行安装即可。最终安装后的运行效果如下：

{{< image src="images/WSL-WSLg_Home.webp" caption="WSL+WSLg OMNeT++ 运行效果" title="WSL+WSLg OMNeT++ Installation">}}

##### Windows 10

Windows10 目前不支持 WSLg，需要安装 VcXsrv 在 Windows 上为 WSL 提供一个 X-Window Server. 可以在 [SourceForge][vcxsrv_sourceforge] 上下载并安装最新版的 VcXsrv (当然你有其他能提供 X-Window Server 的软件也可以，例如 X410)。此外还需要在 Linux 系统中进行 `DISPLAY` 环境变量的设置。使用以下任一指令均可完成环境变量的设置。为了避免每次重新打开 Linux 终端都要设置环境变量，可以将下面**任意一行**指令添加到 `.bashrc`(具体哪个文件取决于你使用的 shell).

```bash
export DISPLAY="`grep nameserver /etc/resolv.conf | sed 's/nameserver //'`:0"

export DISPLAY="`sed -n 's/nameserver //p' /etc/resolv.conf`:0"

export DISPLAY=$(ip route|awk '/^default/{print $3}'):0.0
```

在进行后续操作之前建议对所有 Package 进行一下更新

```bash
# Debian系 Debian/Ubuntu/Kali-Linux/Deepin
sudo apt update && sudo apt upgrade

# RedHat系 RHEL/CentOS/OracleLinux/Fedora/AlmaLinux/RockyLinux
sudo dnf upgrade

# SUSE openSUSE/SLES
sudo zypper update
```

WSL 默认不会安装桌面环境，也没有安装任何 GUI 工具，需要额外安装 xdg-utils，这个 Package 在 OMNeT++ 编译过程中会用到，其他 GUI 工具可以根据需要安装 (文件管理、文本编辑等)。

```bash
# Debian系 Debian/Ubuntu/Kali-Linux/Deepin
sudo apt install xdg-utils

# RedHat系 RHEL/CentOS/OracleLinux/Fedora/AlmaLinux/RockyLinux
sudo dnf install xdg-utils

# SUSE openSUSE/SLES
sudo zypper in xdg-utils
```

在 WSL 中运行 GUI 程序之前，需要先在 Windows 中启动 VcXsrv，为WSL提供一个 X-Window Server. 启动VcXsrv并进行如下配置：

1. “Select display settings”以及“Select how to start client”配置页面保持默认即可；
2. 在“Extra settings”中勾选“Disable access control”。

配置完成后启动 VcXsrv，注意每次运行GUI程序之前需要先在 Windows 上启动 VcXsrv。之后参照 [Linux 下的 OMNeT++ 的安装](#linux) 进行安装即可,最终安装完成后的效果如下：

{{< image src="images/WSL-VcXsrv_Home.webp" caption="WSL+VcXsrv OMNeT++ 运行效果" title="WSL+VcXsrv OMNeT++ Installation">}}

### macOS

{{< admonition note >}}

* macOS 版本不低于11.x.
* 截止文档编辑日期，OMNeT++ 目前还没有对 Apple Silicon 进行原生支持，在使用 Apple Silicon 的设备上使用 OMNeT++ 可能会遇到一些 bug.

{{< /admonition >}}

#### 编译环境配置

打开终端，输入以下指令安装 xcode 命令行开发工具。

```zsh
xcode-select --install
```

打开“系统偏好设置(System Preference)” →“隐私与安全(Privacy and Security)”的隐私(Privacy)中，在左侧找到“开发者工具(Developer Tools)”解锁后勾选右侧“终端(Terminal)”。开启此选项后才能在终端中运行未签名的代码。

{{< image src="images/macOS-Privacy_and_Security_Setting-1.webp" caption="macOS 隐私与安全设置 - 1" title="macOS Privacy & Security Setting - 1">}}

为了能够正常进行代码调试，还需要关闭全局的签名检查

```zsh
sudo spctl --master-disable
```

并在系统偏好设置(System Preference)” → “安全与隐私(Security and Privacy)”的通用(General)选项卡中勾选“Anywhere”。

{{< image src="images/macOS-Privacy_and_Security_Setting-2.webp" caption="macOS 隐私与安全设置 - 2" title="macOS Privacy & Security Setting - 2">}}

{{< admonition warning >}}

此设置一定程度上会降低计算机的安全性，不需要此功能时可以在终端中运行下述指令恢复签名检查。

```zsh
sudo spctl --master-enable
```

{{< /admonition >}}

#### 编译

将终端的工作路径切换到 OMNeT++ 解压的目标路径中，由于 macOS 安装包内包含了所有需要的依赖，因此不需要额外安装任何 Package，直接运行以下命令进行配置和编译即可。

```zsh
source setenv
./configure
make -j$(sysctl -n hw.ncpu) 
```

此处可以设置 `make` 的 `-j` 参数，即同时允许执行的编译任务数量，这样可以更有效的利用CPU资源，加快编译的速度。例如 `make -j8`，让 `make` 最多允许8个编译任务同时执行。可设置为 CPU 的核心数或支持的线程 (Thread) 数，可直接使用 `make -j$(sysctl -n hw.ncpu) ` 设置任务数为 CPU 核心数进行编译。完成之后终端输入 `omnetpp` 即可启动 IDE.

{{< admonition tip >}}

可以将下面的指令添加到 `.zshrc`(具体哪个文件取决于你使用的 shell)，来避免每次打开终端都要重新设置环境变量。

```bash
source "[OMNeT++ 存放路径]/omnetpp-6.0/setenv"
```

{{< /admonition >}}

### Linux

OMNeT++ 是从源码进行安装的并且它依赖的软件也均为开源软件，理论上来说几乎所有的 Linux 发行版都能找到安装 OMNeT++ 的方法。不过在实际操作中 OMNeT++ IDE 要求 **GLIBC >= 2.28**，因此系统中 GLIBC 版本低于 2.28 的 Linux 发行版都无法直接编译 OMNeT++ (例如 Ubuntu 18.04，RHEL7 等)。

#### 依赖安装

Linux 中安装 OMNeT++ 需要手动配置安装环境，为 OMNeT++ 准备所依赖的 Pakcge. 以下列出了三类 Linux 发行版安装所需 Package 的命令。那些基于 Arch 的 Linux 发行版，可以直接通过这个 [Package][omnetpp_aur_package] 进行安装。

| Linux     | 命令                                                                                                                                                                                                                  |
|:---------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Debian 系 | `sudo apt install build-essential clang lld gdb bison flex perl python3 python3-pip qtbase5-dev qtchooser qt5-qmake qtbase5-dev-tools libqt5opengl5-dev libxml2-dev zlib1g-dev doxygen graphviz libwebkit2gtk-4.0-37` |
| RedHat 系 | `sudo dnf install make gcc gcc-c++ clang lld bison flex perl python3-devel python3-pip qt5-devel libxml2-devel zlib-devel doxygen graphviz`                                                                           |
| SUSE     | `sudo zypper in make gcc gcc-c++ clang lld bison flex perl python3-devel python3-pip libqt5-qtbase-devel libxml2-devel zlib-devel doxygen graphviz`                                                                   |

{{< admonition note >}}

并不一定所有发行版的 Repository 中都包含以上所有的 Package，遇到 Package 没有的情况可以考虑安装同一类发行版中的 Package 或者自行从源码进行编译。

没有桌面环境的 Linux 发行版还需要额外安装 `xdg-utils` 才能正常进行编译。

{{< /admonition >}}

OMNeT++ 还需要一些 Python 的 Package，通过以下命令安装即可。

```bash
python3 -m pip install --user --upgrade numpy pandas matplotlib scipy seaborn posix_ipc
```

OMNeT++ 有若干可选功能，这些功能并不是必须的，可以根据自己的需要进行安装。

1. OpenSceneGraph (>=3.2) 为 OMNeT++ 提供 3D 模型渲染的功能，用于搭建 3D 的仿真场景，虽然作为可选功能但 `configure.user` 配置文件中默认开启了该项功能，**建议进行安装**。

    ```bash
    # Debian系 Debian/Ubuntu/Kali-Linux/Deepin
    sudo apt install libopenscenegraph-dev

    # RedHat系 RHEL/CentOS/OracleLinux/Fedora/AlmaLinux/RockyLinux
    sudo dnf install OpenSceneGraph-devel

    # SUSE openSUSE/SLES
    sudo zypper install libOpenSceneGraph-devel
    ```

2. osgEarth (>=2.7) 是基于 OpenSceneGraph 开发的地形渲染引擎，属于对 OpenSceneGraph 对功能扩展。不过，并不是所有的发行版的 Repository 中都包含 osgEarth，很多时候只能从原码编译安装。

    ``` bash
    # Debian系 Debian 10/Ubuntu 20.04/Deepin
    sudo apt install openscenegraph-plugin-osgearth libosgearth-dev

    # RedHat系 仅 Fedora
    sudo dnf osgearth-devel

    # SUSE 不支持

    ```

3. MPI 用于 OMNeT++ 实现并行分布式仿真。

    ```bash
    # Debian系 Debian/Ubuntu/Kali-Linux/Deepin
    sudo apt-get install mpi-default-dev

    # RedHat系 RHEL/CentOS/OracleLinux/Fedora/AlmaLinux/RockyLinux
    sudo dnf openmpi-devel

    # SUSE openSUSE/SLES
    sudo zypper install openmpi-devel
    ```

4. Akaroa (>=2.7.9) 可以用来提高仿真的可行度，通过 MRIP 技术对仿真进行加速，Akaroa 只能通过源码编译安装，且目前需要到官网申请或者购买相应的 License.

{{< admonition note >}}

安装完以上的依赖以后，只能确保 OMNeT++ 能够正常进行编译，但是不能确保能够成功运行 OMNeT++ IDE. 例如你需要安装 `gtk3` 才能正常渲 OMNeT++ IDE 的图形界面。

如果你使用的是带有桌面环境的 Linux 发行版基本不用担心缺少依赖的情况，如果你的 Linux 发行版默认没有安装桌面环境的相关组件，则可能需要根据错误信息自行补全需要的依赖。

{{< /admonition >}}

#### 编译

将终端的工作路径切换到 OMNeT++ 解压的目标路径中，运行以下命令进行配置和编译。

```bash
source setenv
./configure
make -j$(nproc)
```

此处可以设置 `make` 的 `-j` 参数，即同时允许执行的编译指令数量，这样可以更有效的利用CPU资源，加快编译的速度。例如 `make -j8`，让 `make` 最多允许 8 个编译任务同时执行。可设置为 CPU 的核心数或支持的线程 (Thread) 数，或者使用 `make -j$(nproc)` 以最大进程数进行编译。

编译完成之后，在终端中输入 `omnetpp` 即可启动 OMNeT++ IDE.

{{< admonition tip >}}

可以将下面的指令添加到 `.bashrc`(具体哪个文件取决于你使用的 shell)，来避免每次打开终端都要重新设置环境变量。

```bash
source "[OMNeT++ 存放路径]/omnetpp-6.0/setenv"
```

OMNeT++6.0 安装后会自动添加 OMNeT++ IDE 和 Shell 的 `.desktop` 文件到 `~/.local/share/applications` 文件夹中，可以直接点击 Launcher 中的快捷方式启动 OMNeT++.

{{< image src="images/Ubuntu-OMNeT++_Shortcut.webp" caption="Ubuntu 中的 OMNeT++ 快捷方式" title="Ubuntu OMNeT++ Shortcut">}}

{{< /admonition >}}

## 安装验证

切换工作路径到“omnetpp-6.0/samples/aloha”中，运行“./aloha”即可打开测试工程。运行之后会启动Qt仿真环境，在“Set Up Inifile Configuration”窗口任意选择一个配置运行即可。点击运行仿真，能够正常运行没有异常输出即表示环境配置基本正常。

{{< image src="images/Validation_Command.webp" caption="ALOHA 例程运行命令" title="Validation Command">}}

{{< image src="images/Validation_Configure.webp" caption="ALOHA 例程 QT 环境配置选择" title="Validation Configure">}}

{{< image src="images/Validation_Scene.webp" caption="ALOHA 例程 QT 环境运行效果" title="Validation Scene">}}

[pwsh_github]: https://github.com/PowerShell/PowerShell/releases
[vcxsrv_sourceforge]: https://sourceforge.net/projects/vcxsrv
[omnetpp_aur_package]: https://aur.archlinux.org/packages/omnetpp