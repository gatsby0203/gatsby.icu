---
title: Install OMNeT++
date: 2023-06-01T19:29:04+08:00
type: posts
tags: 
    - OMNeT++
categories: 
    - OMNeT++
    - Tutorial
reward: false
---

OMNeT++ is an extensible, modular, component-based C++ simulation library and framework, primarily for building network simulators.  This article provides detailed instructions of how to install OMNeT++ on Windows, WSL, macOS, Linux.

<!--more-->

You can download the latest OMNeT++ 6.0.1 through the following links.

{{< link href="https://github.com/omnetpp/omnetpp/releases/download/omnetpp-6.0.1/omnetpp-6.0.1-linux-x86_64.tgz" content="Linux" title="OMNeT++ for Linux" download="omnetpp-6.0.1-linux-x86_64.tgz">}} | {{< link href="https://github.com/omnetpp/omnetpp/releases/download/omnetpp-6.0.1/omnetpp-6.0.1-macos-x86_64.tgz" content="macOS" title="OMNeT++ for macOS" download="omnetpp-6.0.1-macos-x86_64.tgz">}} | {{< link href="https://github.com/omnetpp/omnetpp/releases/download/omnetpp-6.0.1/omnetpp-6.0.1-windows-x86_64.zip" content="Windows" title="OMNeT++ for Windows" download="omnetpp-6.0.1-windows-x86_64.tgz">}}

## Configure

Extract the installation files and ensure that the target path contains only letters and underscores. Avoid using characters such as @ ? # $ & ( ) \ | : ; ‘ ’ “ ” < >, and it is preferable to avoid spaces and tabs. The default target path for extraction should be the final storage location for the program. Once the compilation and deployment are completed, it is recommended not to move the program. Otherwise, additional settings or reconfiguration and recompilation may be required.

The file "configure.user" in the extracted files contains all the user-selectable configurations. Unless you have specific requirements, it is recommended to keep the defaults. Below is all the configurations in "configure.user," along with some additional explanations.

```bash
#
# Edit here if you want to use a different compiler from the one autodetected
# by configure. Turns off the compiler autodetection.
#
#CC=gcc
#CXX=g++

#
# Set to "no" if you want to use gcc/g++ instead of default clang/clang++ when both
# compiler is installed.
#
PREFER_CLANG=yes

#
# Set to "no" if you want to use the GNU linker instead of LLVM-LLD when both
# linker is installed.
#
PREFER_LLD=yes

#
# On Windows, use the separately installed Visual C linker and Windows SDK. This will generate
# binaries, that are compatible with the Visual C++ compiler.
# USE_MS_ABI=yes

#
# Compiler optimization switches. 
# There are two sets of switches, and the MODE variable ("debug" or "release") 
# decides which one gets used. If you set them manually, you should specify all options you need,
# since it will omit autodetect. It is recommended to check what options are detected automatically 
# (check the Makefile.inc after running configure and look for the CFLAGS_[RELEASE/DEBUG] variables.)
# and add/modify those options manually in the configure.user file.
# (Note: For maximum debugging info use switch -ggdb or -gstabs+3 when using gcc and gdb)
# With gcc, do NOT use --omit-frame-pointer (it crashes when coroutines and
# C++ exceptions (throw/catch) are used together)!
#
#CFLAGS_DEBUG='-g -Wall'
#CFLAGS_RELEASE='-O3 -DNDEBUG=1'

#
# C++ specific compiler options. As OMNeT++ requires C++14 or later, this is
# the place to specify -std=c++14 or a similar option if your compiler's
# default language compliance level is lower than C++14. These options will be
# used when compiling OMNeT++ and also when compiling simulation models.
#
#CXXFLAGS=-std=c++17

#
# Linker switches used for linking.
# If you set it manually, you should specify all options you need, since it will omit autodetect.
# It is recommended to check what options are detected automatically (check the 
# Makefile.inc after running configure and look for the LDFLAGS variable.) and add/modify 
# those options manually in the configure.user file.
#
#LDFLAGS=""

#
# Set to "yes" to enable the Qt based graphical runtime environment (Qtenv)
# Use this option if your platform does not have a suitable Qt package or you will run 
# the simulation only in command line mode.
#
WITH_QTENV=yes

#
# Set to "yes" to enable OpenSceneGraph and support in Qtenv
#
WITH_OSG=yes

#
# Set to "yes" to enable osgEarth support in Qtenv (requires OpenScreenGraph enabled)
#
WITH_OSGEARTH=yes

#
# Set to "yes" to enable simulation executables to load NED files dynamically.
# This option allows you to leave out the NED language parser and the network builder. 
# (This is needed only if you are building your network with C++ API calls and you do 
# not use the built-in NED language parser at all.)
#
WITH_NETBUILDER=yes

#
# Set to "yes" to allow the use of LibXML2. OMNeT++ will only use LibXML for loading
# XML files that have a DOCTYPE declaration such as an associated DTD. All other XML files
# are loaded using an embedded XML parser, which is both faster and more memory-efficient.
#
WITH_LIBXML=no

#
# Set to "yes" to enable the parallel distributed simulation feature.
#
WITH_PARSIM=no

#
# Set to "yes" to use SQLite as default file format for output vector and
# output scalar files. As of version 5.1, SQLite support is an experimental
# feature.
#
# To try SQLite result files without changing the default, add the following
# lines into the omnetpp.ini files of your simulations (or specify the same
# settings on the simulation command line, with the "--" prefix):
#
# outputvectormanager-class="omnetpp::envir::SqliteOutputVectorManager"
# outputscalarmanager-class="omnetpp::envir::SqliteOutputScalarManager"
#
PREFER_SQLITE_RESULT_FILES=no

#
# Set to "yes" to enable SystemC support. (Available only in the commercial version (OMNEST))
# Please note that SystemC is not supported on MAC OS X and on the MinGW compiler on Windows.
#
WITH_SYSTEMC=no

#
# Set to no if you want to create static OMNeT++ libraries. 
# Can be overridden with "make SHARED_LIBS=no" but then simulation models also need 
# to be built with "make SHARED_LIBS=no".
# By default, the OMNeT++ runtime is built as a set of shared libraries. If you want 
# to build a single executable from your simulation, set this option to "no". Once OMNeT++ 
# static libraries are correctly built, your own project have to be rebuilt, too. 
# You will get a single, statically linked executable, which requires only the NED and INI files to run.
#
SHARED_LIBS=yes

#
# Compiler and linker options for Qt
#
# If you wish to use a custom Qt bundle (for example downloaded from the
# official Qt web page, or built from source) instead of the one installed
# on your system as the default (most likely by the package manager), set
# this variable to point to the 'qmake' program in that installation.
# Leave it empty or commented out to use the default Qt installation.
# Please note that on Windows and macOS it is highly recommended to just
# use the Qt bundle included in the OMNeT++ release, and not change this.
#
#QMAKE="/home/user/Qt/5.12/gcc_64/bin/qmake"
#
# You can also explicitly tell 'configure' what compiler options (QT_CFLAGS)
# and linker switches (QT_LIBS) are needed to build an application with Qt
# support. Normally these are autodetected by 'configure' using the QT_PATH
# variable above, so you only need to edit here if autodetection doesn't work.
#
#QT_CFLAGS=
#QT_LIBS=

#
# OpenSceneGraph libraries we want to use. Leave empty for autodetection
# or specify some invalid value (like "no" to explicitly disable OpenSceneGraph)
# At least the following libraries must be found: osg osgGA osgViewer osgQt OpenThreads
#
#OSG_LIBS=

# osgEarth libraries to be used. Leave empty for autodetection.
# At least the following libraries are required: osgEarth osgEarthUtil
#
#OSGEARTH_LIBS=

#
# ZLib is a compression library needed by libxml2.
#
# On MinGW we use the following (dynamically linking against the DLL)
#
#ZLIB_CFLAGS="-I/c/Tools/zlib-1.2.3/include"
#ZLIB_LIBS="-L/c/Tools/zlib-1.2.3/bin -lzlib1"
# or:
#ZLIB_CFLAGS="-I$MSYS/include"
#ZLIB_LIBS="-L$MSYS/lib -lz"

#
# Compiler and linker options for MPI (optional component).
# On LAM/MPI, typing `mpic++ -showme' can give you a hint about MPI_LIBS.
#
# If commented out, the configure script will try to autodetect it
#
#MPI_CFLAGS="-I /usr/include"
#MPI_LIBS="-pthread -llammpio -llammpi++ -llamf77mpi -lmpi -llam -laio -laio -lutil"
#MPI_LIBS="-lmpi++ -lmpi"   #SGI

#
# Compiler and linker options for LIBXML (optional component)
#
# With MinGW I use the following:
#  LIBXML_CFLAGS="-I/c/Tools/libxml2-2.6.20.win32/include -I/c/Tools/iconv-1.9.1.win32/include"
#  LIBXML_LIBS="-L/c/Tools/libxml2-2.6.20.win32/bin -lxml2 -L/c/Tools/iconv-1.9.1.win32/lib -liconv"
# or:
#  LIBXML_CFLAGS="-I$MSYS/include"
#  LIBXML_LIBS="-L$MSYS/bin -lxml2 -L$MSYS/bin -liconv"
# If commented out, the configure script will try to autodetect it
#

#
# Set to "yes" to enable AKAROA support.
# Akaroa package is used to improve the credibility of results speed up simulations using Multiple 
# Replications In Parallel (MRIP).
# Akaroa(2.7.9) yet only supports Linux and Solaris, and it must be downloaded, compiled and 
# installed manually before installing OMNeT++.
# For more information: https://akaroa.canterbury.ac.nz/akaroa/
#
WITH_AKAROA=no

#
# Compiler and linker options for Akaroa (optional component)
#
# With MinGW I use the following:
#  AKAROA_CFLAGS="-I/d/home/tools/akaroa-2.7.4/include"
#  AKAROA_LIBS="-L/d/home/tools/akaroa-2.7.4/lib -lakaroa"
# If commented out, the configure script will try to autodetect it
#
#AKAROA_CFLAGS=
#AKAROA_LIBS=

#
# The following OMNETPP_* variables don't need to be touched unless
# you want to relocate parts of the package (e.g. put libraries to
# /usr/lib, include files to /usr/include/omnetpp, and so on).
#
#OMNETPP_SRC_DIR="$OMNETPP_ROOT/src"
#OMNETPP_SAMPLES_DIR="$OMNETPP_ROOT/samples"
#OMNETPP_BIN_DIR="$OMNETPP_ROOT/bin"
#OMNETPP_INCL_DIR="$OMNETPP_ROOT/include"
#OMNETPP_LIB_DIR="$OMNETPP_ROOT/lib"

#
# Some more OMNeT++ variables. They select the programs opp_makemake-generated
# makefiles will use. (They get default values if commented out.)
#
#MSGC="$OMNETPP_BIN_DIR/opp_msgc"

#
#
# You may override the following setting if you have additional icons somewhere else.
#
# OMNETPP_IMAGE_PATH="$OMNETPP_ROOT/images"

```

## Compile and Install

### Windows

After extracting the files, open "omnetpp-6.0/mingwenv.cmd". Upon running it for the first time, it will automatically extract and install the MinGW environment (without conflicting with any existing MinGW installations). Once the installation is complete, a new command prompt window will open automatically.

{{< image src="images/Windows-OMNeT++_Compile-1.webp" caption="Windows OMNeT++ Prompt" title="Windows OMNeT++ Compile - 1">}}

Since the Windows installation package already includes all the necessary dependencies, there is no need to install any additional packages. Simply follow the prompts and enter the `./configure` command, which will automatically generate the Makefile based on your current user configuration. Once the Makefile is generated, you can proceed with the compilation by entering `make` as instructed. The compilation process may take some time.

You can set the `-j` parameter of `make`, which determines the number of parallel compilation tasks allowed to execute simultaneously. This allows for more efficient utilization of CPU resources and faster compilation. For example, you can use make `-j8` to allow a maximum of 8 compilation tasks to run simultaneously. You can set it to the number of CPU cores or supported threads, or use `make -j$(nproc)` to compile with the maximum number of processes allowed.

{{< image src="images/Windows-OMNeT++_Compile-2.webp" caption="Windows OMNeT++ configure Prompt" title="Windows OMNeT++ configure Prompt">}}

{{< image src="images/Windows-OMNeT++_Compile-3.webp" caption="Windows OMNeT++ make Prompt" title="Windows OMNeT++ make Prompt">}}

{{< admonition tip >}}

After compiling OMNeT++ 6.0, two shortcuts will be generated in the OMNeT++ folder. One shortcut is used to launch the IDE, and the other is used to launch the terminal. You can copy these shortcuts to your desktop for quick access to OMNeT++.

{{< image src="images/Windows-OMNeT++_Shortcut.webp" caption="Windows OMNeT++ Shortcut" title="Windows OMNeT++ Shortcut">}}

{{< /admonition >}}

### Windows Subsystem for Linux (WSL)

The execution speed of OMNeT++ on Linux is significantly faster than on Windows. If you want to use a Linux development environment on Windows, WSL (Windows Subsystem for Linux) is a good choice. In this section, a brief introduction to the configuration of WSLis provided. After completing the installation and configuration of WSL, you can follow the instructions in the [Installation of OMNeT++ on Linux](#linux) guide to install OMNeT++.

{{< admonition note >}}

* It is highly recommended to install OMNeT++ within WSL2. However, this has certain requirements for the Windows version. Your Windows version should be newer than Windows 10 version 2004 (build 19041). You can check your Windows version by pressing the Windows + R, typing "winver", and running the command to view the Windows version.

* Not all versions of WSL support GUI applications. If your Windows version is newer than Windows 11 (build 22000.*) or Windows 11 Insider Preview (builds 21362+), installing WSL2 will automatically install WSLg, which allows you to run GUI applications directly. If you are a Windows 10 user and unable to install WSLg, you will need to set up an X-Window Server on your Windows system to display GUI applications.

* Currently, WSL's support for GUI applications is not yet fully mature. There may be some bugs when running OMNeT++ in WSL, such as issues with 3D model rendering. However, it should be sufficient for most use cases and requirements.

{{< /admonition >}}

#### WSL Setup

It is recommended to use Windows Terminal and PowerShell 7 as your toolkit. You can install Windows Terminal by searching for it in the Microsoft Store. As for PowerShell 7, you can download the latest release from the [Official GitHub Page][pwsh_github] and install it.

##### Install WSL for the First Time

Run Windows Terminal as an administrator and open a PowerShell 7 terminal. Enter the following command to install WSL.

```powershell
wsl.exe --install [Linux distribution name]
```

Fill in the [Linux distribution name] you want to install. You can use the command `wsl -l -o` to view all the online downloadable distributions currently provided by Microsoft.

{{< image src="images/WSL-Supported_Distributions.webp" caption="WSL Supported Linux Distribution" title="WSL Supported Distributions">}}

{{< admonition tip >}}

Sometimes, installation may fail due to network issues. You can try setting it to download data from the website instead of downloading it from the Microsoft Store.

```powershell
wsl.exe --install --web-download [Linux distribution name]
```

{{< /admonition >}}

The first time you install WSL, you need to restart your computer. After restarting, the system will automatically start the Linux installation process, which may take a few minute, please wait for it to complete. Once everything is ready, follow the prompts in the window to set the username and password for Linux.

##### Update to WSL2

By default, Linux is installed on WSL2. You can use the command `wsl -l -v` to view the installed Linux distributions and their respective WSL versions.

{{< image src="images/WSL-Installed_List.webp" caption="WSL Installed List" title="WSL Installed List">}}

If you already have a Linux distribution running on WSL1, you can upgrade it to run on WSL2.

```powershell
wsl --set-version [Linux distribution name] 2
```

{{< admonition tip >}}

You can set the default WSL version for future installations using the following command.

```powershell
wsl --set-default-version [Version(1 or 2)]
```

{{< /admonition >}}

#### WSL GUI Setup

##### Windows 11

If your system version is newer than Windows 11 (build 22000.*) or Windows 11 Insider Preview (builds 21362+), WSLg will be automatically installed when you install WSL, which provides GUI support. It is recommended to update the software packages before proceeding with further operations.

```bash
# Debian-Based Debian/Ubuntu/Kali-Linux/Deepin
sudo apt update && sudo apt upgrade

# RedHat-Based RHEL/CentOS/OracleLinux/Fedora/AlmaLinux/RockyLinux
sudo dnf upgrade

# SUSE openSUSE/SLES
sudo zypper update
```

By default, WSL does not come with a desktop environment or any GUI tools installed. To use GUI tools, you need to install them separately. You need to install the `xdg-utils` package, it necessary for OMNeT++ compilation. Other GUI tools like file managers and text editors can be installed based on your requirements.

```bash
# Debian-Based Debian/Ubuntu/Kali-Linux/Deepin
sudo apt install xdg-utils

# RedHat-Based RHEL/CentOS/OracleLinux/Fedora/AlmaLinux/RockyLinux
sudo dnf install xdg-utils

# SUSE openSUSE/SLES
sudo zypper in xdg-utils

```

After completing the steps mentioned above, you can refer to [Installation of OMNeT++ on Linux](#linux) to proceed with the installation. The final result of the installation should resemble the following.

{{< image src="images/WSL-WSLg_Home.webp" caption="OMNeT++ on WSL+WSLg" title="WSL+WSLg OMNeT++ Installation">}}

##### Windows 10

Windows 10 currently does not support WSLg, so you will need to install VcXsrv on Windows to provide an X-Window Server for WSL  (or any other software that provides an X-Window Server, such as X410). You can download and install the latest version of VcXsrv from [SourceForge][vcxsrv_sourceforge]. Additionally, you need to configure the `DISPLAY` environment variable on your Linux. You can use **any one of the following commands** to set the environment variable. To avoid setting the environment variable every time you open a new Linux terminal, you can add command to your `.bashrc` file (or the appropriate file based on your shell).

```bash
export DISPLAY="`grep nameserver /etc/resolv.conf | sed 's/nameserver //'`:0"

export DISPLAY="`sed -n 's/nameserver //p' /etc/resolv.conf`:0"

export DISPLAY=$(ip route|awk '/^default/{print $3}'):0.0
```

Before proceeding with further operations, it is recommended to update all packages on your Linux.

```bash
# Debian-Based Debian/Ubuntu/Kali-Linux/Deepin
sudo apt update && sudo apt upgrade

# RedHat-Based RHEL/CentOS/OracleLinux/Fedora/AlmaLinux/RockyLinux
sudo dnf upgrade

# SUSE openSUSE/SLES
sudo zypper update
```

By default, WSL does not come with a desktop environment or any GUI tools installed. To use GUI tools, you need to install them separately. You need to install the `xdg-utils` package, it necessary for OMNeT++ compilation. Other GUI tools like file managers and text editors can be installed based on your requirements.

```bash
# Debian-Based Debian/Ubuntu/Kali-Linux/Deepin
sudo apt install xdg-utils

# RedHat-Based RHEL/CentOS/OracleLinux/Fedora/AlmaLinux/RockyLinux
sudo dnf install xdg-utils

# SUSE openSUSE/SLES
sudo zypper in xdg-utils
```

Before running GUI programs in WSL, you need to start VcXsrv in Windows to provide an X-Window Server for WSL. Start VcXsrv and configure it with the following settings:

1. Keep default settings on "Select display settings" and "Select how to start client" pages.
2. In the "Extra settings" section, check "Disable access control".

Remember to start VcXsrv on Windows each time before running a GUI program. Then, you can proceed with [Installation of OMNeT++ on Linux](#linux). The final result of the installation should resemble the following:

{{< image src="images/WSL-VcXsrv_Home.webp" caption="OMNeT++ on WSL+VcXsrv" title="WSL+VcXsrv OMNeT++ Installation">}}

### macOS

{{< admonition note >}}

* To use OMNeT++ on macOS, your macOS version should be 11.x or higher.

* As of the date of document editing, OMNeT++ does not have native support for Apple Silicon. Therefore, when using OMNeT++ on devices with Apple Silicon, you may encounter some bugs or compatibility issues.

{{< /admonition >}}

#### Compile Enviroment Setup

Open the Terminal and enter the following command，to install the Xcode Command Line Tools

```zsh
xcode-select --install
```

In order to run unsigned code in the Terminal, some system setting is required.

1. Open "System Preferences" on your macOS.
2. Go to "Privacy & Security" and click on the "Privacy" tab.
3. In the left sidebar, scroll down and find "Developer Tools", check the "Terminal".


{{< image src="images/macOS-Privacy_and_Security_Setting-1.webp" caption="macOS Privacy and Security Setting - 1" title="macOS Privacy & Security Setting - 1">}}

To enable proper code debugging, it is necessary to disable global code signing enforcement

```zsh
sudo spctl --master-disable
```

Open "System Preferences" -> "Security & Privacy", check the "Anywhere" option in the "General" section.

{{< image src="images/macOS-Privacy_and_Security_Setting-2.webp" caption="macOS Privacy and Security Setting - 2" title="macOS Privacy & Security Setting - 2">}}

{{< admonition warning >}}

This setting will somewhat decrease the security of the computer. When you no longer need this feature, you can restore the signature check by running the following command in the terminal.

```zsh
sudo spctl --master-enable
```

{{< /admonition >}}

#### Compile

Switch the working directory of the terminal to the directory where OMNeT++ is extracted. Since the macOS installation package includes all the necessary dependencies, there is no need to install any additional packages. Simply run the following command to configure and compile.

```zsh
source setenv
./configure
make -j$(sysctl -n hw.ncpu) 
```

You can set the `-j` parameter of `make`, which specifies the number of parallel compilation tasks allowed to run simultaneously. This allows for more efficient utilization of CPU resources and speeds up the compilation process. For example, you can use make `-j8` to allow a maximum of 8 compilation tasks to run simultaneously. You can also set it to the number of CPU cores or supported threads. Using make `-j$(sysctl -n hw.ncpu)` to compile with a task number equals to the number of CPU cores. After completion, you can launch the IDE by entering `omnetpp` in the terminal.

{{< admonition tip >}}

You can add the following command to the `.zshrc` file (or the appropriate file depending on the shell you are using) to avoid source the environment variables every time you open the terminal.

```bash
source "[path to OMNeT++]/omnetpp-6.0/setenv"
```

{{< /admonition >}}

### Linux

OMNeT++ is installed from source code, and all its dependencies are open-source software. In theory, you can always find a way to install OMNeT++ on almost all Linux distributions. However, in practice, the OMNeT++ IDE requires **GLIBC >= 2.28**, which means that Linux distributions with GLIBC versions lower than 2.28 cannot directly compile OMNeT++ (e.g., Ubuntu 18.04, RHEL7, etc.).

#### Install Dependencies

Installing OMNeT++ on Linux requires manually configuring the installation environment and installing the necessary packages for OMNeT++. Below are commands for three categories of Linux distributions to install the required packages. For Arch-based Linux distributions, you can directly install OMNeT++ using this [Package][omnetpp_aur_package].

| Linux     | Command                                                                                                                                                                                                                  |
|:---------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Debian-Based | `sudo apt install build-essential clang lld gdb bison flex perl python3 python3-pip qtbase5-dev qtchooser qt5-qmake qtbase5-dev-tools libqt5opengl5-dev libxml2-dev zlib1g-dev doxygen graphviz libwebkit2gtk-4.0-37` |
| RedHat-Based | `sudo dnf install make gcc gcc-c++ clang lld bison flex perl python3-devel python3-pip qt5-devel libxml2-devel zlib-devel doxygen graphviz`                                                                           |
| SUSE     | `sudo zypper in make gcc gcc-c++ clang lld bison flex perl python3-devel python3-pip libqt5-qtbase-devel libxml2-devel zlib-devel doxygen graphviz`                                                                   |

{{< admonition note >}}

Not all repositories of Linux distributions necessarily include all of the mentioned packages. If you encounter a situation where a package is not available, you can consider installing a similar package from the repository of the same category of Linux distribution or manually compiling from source code.

> Linux distributions without a desktop environment may require the additional installation of `xdg-utils` in order to compile OMNeT++ properly.

{{< /admonition >}}

OMNeT++ requires some python packages, you can use the following command to install them.

```bash
python3 -m pip install --user --upgrade numpy pandas matplotlib scipy seaborn posix_ipc
```

OMNeT++ offers several optional features that are not mandatory. You can choose to install these features based on your specific needs.

1. OpenSceneGraph (>=3.2) provides 3D model rendering functionality for OMNeT++, allowing you to create 3D simulation scenes. Although it is an optional feature, it is recommended to install it as the `configure.user` configuration file enables this feature by default.

    ```bash
    # Debian-Based Debian/Ubuntu/Kali-Linux/Deepin
    sudo apt install libopenscenegraph-dev

    # RedHat-Based RHEL/CentOS/OracleLinux/Fedora/AlmaLinux/RockyLinux
    sudo dnf install OpenSceneGraph-devel

    # SUSE openSUSE/SLES
    sudo zypper install libOpenSceneGraph-devel
    ```

2. osgEarth (>=2.7) is a terrain rendering engine developed based on OpenSceneGraph, and it extends the functionality of OpenSceneGraph. However, not all Linux distribution repositories include osgEarth, and often it needs to be compiled and installed from source code.

    ``` bash
    # Debian-Based Debian 10/Ubuntu 20.04/Deepin
    sudo apt install openscenegraph-plugin-osgearth libosgearth-dev

    # RedHat-Based only Fedora
    sudo dnf install osgearth-devel

    # SUSE not support

    ```

3. MPI is used in OMNeT++ to enable parallel and distributed simulations. 

    ```bash
    # Debian-Based Debian/Ubuntu/Kali-Linux/Deepin
    sudo apt-get install mpi-default-dev

    # RedHat-Based RHEL/CentOS/OracleLinux/Fedora/AlmaLinux/RockyLinux
    sudo dnf install openmpi-devel

    # SUSE openSUSE/SLES
    sudo zypper install openmpi-devel
    ```

4. Akaroa (>=2.7.9) is a tool that can enhance the feasibility of simulations by accelerating them through MRIP (Multiple Replications in Parallel) technology. Akaroa can only be installed by compiling the source code, and currently, you need to apply for or purchase the corresponding license from the official website.

{{< admonition note >}}

It only ensures that OMNeT++ can be compiled successfully. However, it does not guarantee the successful execution of the OMNeT++ IDE. For example, you may need to install `gtk3` in order to properly render the graphical interface of the OMNeT++ IDE.

If you are using a Linux distribution with a desktop environment, you generally don't need to worry about missing dependencies. However, if your Linux distribution does not have the necessary components, you may need to identify the missing dependencies based on the error messages and manually install them to fulfill the requirements.

{{< /admonition >}}

#### Compile

Switch the working directory of the terminal to the directory of OMNeT++, use the following command to compile OMNeT++

```bash
source setenv
./configure
make -j$(nproc)
```

You can set the `-j` parameter of `make`, which determines the number of parallel compilation tasks allowed to execute simultaneously. This allows for more efficient utilization of CPU resources and faster compilation. For example, you can use make `-j8` to allow a maximum of 8 compilation tasks to run simultaneously. You can set it to the number of CPU cores or supported threads, or use `make -j$(nproc)` to compile with the maximum number of processes allowed.

After the compilation, you can launch the OMNeT++ IDE by entering `omnetpp` in the terminal.

{{< admonition tip >}}

You can add the following command to the `.bashrc` file (or the appropriate file depending on the shell you are using) to avoid source the environment variables every time you open the terminal.

```bash
source "[path to OMNeT++]/omnetpp-6.0/setenv"
```

OMNeT++ 6.0 will automatically add the `.desktop` files for the OMNeT++ IDE and Shell to the `~/.local/share/applications` folder after installation, allowing you to directly launch OMNeT++ by clicking on the shortcuts in the Launcher.

{{< image src="images/Ubuntu-OMNeT++_Shortcut.webp" caption="Ubuntu 中的 OMNeT++ Shortcuts" title="Ubuntu OMNeT++ Shortcut">}}

{{< /admonition >}}

## Verify Installation

Switch to the working directory to "omnetpp-6.0/samples/aloha", run "./aloha". After running it, the Qt simulation environment will start. In the "Set Up Inifile Configuration" window, you can choose any configuration and click on "Run Simulation" to execute the simulation. If it runs without any abnormal output, it indicates that the environment configuration is generally correct.

{{< image src="images/Validation_Command.webp" caption="Run ALOHA Example Command " title="Validation Command">}}

{{< image src="images/Validation_Configure.webp" caption="ALOHA QT Enviroment Configure" title="Validation Configure">}}

{{< image src="images/Validation_Scene.webp" caption="ALOHA Runing in QT Enviroment" title="Validation Scene">}}

[pwsh_github]: https://github.com/PowerShell/PowerShell/releases
[vcxsrv_sourceforge]: https://sourceforge.net/projects/vcxsrv
[omnetpp_aur_package]: https://aur.archlinux.org/packages/omnetpp