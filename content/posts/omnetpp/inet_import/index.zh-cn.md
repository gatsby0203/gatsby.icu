---
title: OMNeT++ 导入 INET
date: 2023-06-01T19:29:04+08:00
type: posts
tags: 
    - OMNeT++
    - INET
categories: 
    - OMNeT++
    - Tutorial
reward: false
---

INET 框架是一个基于 OMNeT++ 仿真环境的开源模型库，INET 集成了大量互联网协议 (例如：TCP, UDP, IPv4, IPv6, OSPF, BGP 等)、有线/无线网链路层协议 (例如：Ethernet, PPP, IEEE 802.11 等)、同时对移动性、MANET协议、DiffServ, MPLS 应用层模型 提供支持。INET 还包含许多其他协议和模型，有不少仿真模型是基于 INET 进行开发的，本文将介绍如何将 INET 倒入 OMNeT++，以及如何给予 INET 建立新工程。

<!--more-->


你可以通过 {{< link href="https://inet.omnetpp.org/Download.html" content="INET Download" title="INET Download">}} 页面下载到最新版本的 INET，根据当前使用的 OMNeT++ 版本进行选择即可。

## INET 导入

INET 本身就是一个 OMNeT++ 工程，导入 OMNeT++ 工程与导入其他一般的工程无异。在 OMNeT++ IDE 中 File 选项下点击“Import”进行工程导入。

{{< image src="images/OMNeT-Import_Option.png" caption="OMNeT++ 导入选项" title="OMNeT Import Option">}}

* 在工程类型选择 (Select) 页面中选择“General”下的“Existing Project into Workspace”；
{{< image src="images/OMNeT-Import_Type.png" caption="OMNeT++ 导入类型选择" title="OMNeT Import Type Select">}}

* 在工程导入配置页面 (Import Projects) 进行最后的导入配置，由于下载下来的 INET 为压缩的 tar 包，这里选择“Select archive file”，点击“Browse…”选择 INET 的 tar 包；如果工程是以文件夹存放则选择“Select a root directory...”，点击“Brows”选择文件夹路径，在“Projects”一栏中勾选相应的 INET，如果是以文件夹导入的工程建议勾选“Copy project file into workspace”以便后续管理，最后点击“Finish”完成导入。
{{< image src="images/OMNeT-Import_Configure.png" caption="OMNeT++ 工程导入配置 - 1" title="OMNeT Import Configure">}}
{{< image src="images/OMNeT-Import_Tarball.png" caption="OMNeT++ 工程导入配置 - 2" title="OMNeT Import Tarball">}}

* 完成导入后，右键点击工程选择“Properties”调出工程的属性选项。在“Project Feature”选项中可以对 INET 模块的功能进行个性化设置，可以取消勾选一些不需要的模块，勾选一些需要的模块，例如需要实现在线仿真的功能就可以勾选“Network emulation support”部分的选项 (仅支持 Linux)。“Visualization OSG (3D)”以及“Visualization OSG (3D) showcase”默认没有勾选，启用这两个功能需 OMNeT++ 编译安装 OpenSceneGraph 相关功能才行，需要运行或搭建 3D 可视化环境时候可以启用这两个选项。
{{< image src="images/INET-Feature_Select.png" caption="INET 功能模块选择" title="INET Feature Configure">}}

* 完成配置后保存并关闭工程属性窗口，右键选择工程点击“Build Project”编译工程即可，耐心等待编译结束。

{{< admonition tip >}}

INET 默认以“Debug”模式进行编译，使用“Release”模式编译可以让仿真运行的更快。我们可以事先编译一个“Release”版本的 INET 方便之后调用。即便没有事先编译在运行（并非Debug）仿真时，IDE 也会提示你编译一个 “Release” 版本以加速仿真运行。

具体方法为：右键选择工程 -> Build Configurations  -> Set Active  -> release.

{{< /admonition >}}

{{< admonition note >}}

在修改 INET Feature 和编译 INET 时可能会遇到以下错误，这个错误说的是当前的 Feature 配置与 Makemake 中源文件夹的配置以及 NED 文件夹的相关配置不匹配。直接点击“OK”自动修复即可。

{{< image src="images/INET-Setup_Error.png" caption="INET 错误提示" title="INET Error">}}

{{< /admonition >}}


## 基于 INET 建立新工程

### 新建工程

在OMNeT++窗口的右上角点击“File” -> “New” -> “OMNeT++ Project…”，新建一个OMNeT++工程。

{{< image src="images/OMNeT-New_Project.png" caption="OMNeT++ 新建工程选项" title="OMNeT++ New Project">}}

* 在“New OMNeT++ Project”界面对要建立的工程进行命名。
{{< image src="images/OMNeT-Project_Name.png" caption="OMNeT++ 工程命名" title="OMNeT++ Name Project">}}

* 在“Initial Content”界面提供了两种可选的工程类型
    1. “Empty project”: 此选项创建一个基本的工程结构，没有预定义的文件夹或文件。如果只打算使用现有的INET模块而不编写新的 C++ 模块，可以选择此选项。
    2. “Empty project with ‘src’ and ‘simulations’ folders”：此选项在初始工程结构中包括'src'和'simulations'文件夹。 'src' 文件夹用于存储 C++ 模块的源代码，`.msg` 消息定义文件以及与 C++ 模块关联的 `.ned` 文件。'simulations' 文件夹通常用于存储仿真配置 `.ini` 文件和描述网络拓扑的 `.ned` 文件。如果有涉及编写新的C++模块的需求，选择此选项。
{{< image src="images/OMNeT-Project_Contents.png" caption="OMNeT++ 工程模版选择" title="OMNeT++ Project Content">}}

* 在“C++ Project Type”界面选择工程类型以及要使用的工具链。此处建议保持默认即可。
{{< image src="images/OMNeT-Project_Type.png" caption="OMNeT++ 工程类型" title="OMNeT++ Project Type">}}

* 在“Select Configurations”界面用于进行编译配置，此处无需额外配置，保持默认即可。
{{< image src="images/OMNeT-Project_Configuration.png" caption="OMNeT++ 工程编译环境配置" title="OMNeT++ Project Configure">}}

* 点击“Finish”完成工程的创建。

### 工程配置

通过上述步骤完成OMNeT++工程创建后，如果不需要使用 INET 框架，现在就可以直接开始编写仿真代码了。若需要使用INET框架中的模块则需要对工程进行进一步的配置。“Project Explorer”中右键点击新建的工程，再选择“Properties”进入工程的属性配置。

* 在“Project References”勾选“inet”，如果不需要在 INET 的基础上对其 C++ 模块进行改写和扩展完成这一步仿真就已经足够了。
{{< image src="images/OMNeT-Project_Reference.png" caption="OMNeT++ 工程 Reference 设置" title="OMNeT++ Project Reference">}}

* 如果需要基于 INET 的一些模块编写新的 C++ 则需要进行一些额外的设置，在工程属性选项中找到“OMNeT++”点击“Makemake”，右侧窗口中选中“src： makemake…”点击“Options…”进行设置。
{{< image src="images/OMNeT-Makemkae_Option.png" caption="OMNeT++ 工程 Makemake 选项" title="OMNeT++ Makemkae Option">}}

* 分别在“Compile”，“Link”，“Custom”进行下图所示的设置。
{{< image src="images/OMNeT-Makemake_Configure_1.png" caption="OMNeT++ 工程 Makemake 编译配置" title="OMNeT++ Makemkae Compile Option">}}
{{< image src="images/OMNeT-Makemake_Configure_2.png" caption="OMNeT++ 工程 Makemake 链接配置" title="OMNeT++ Makemkae Link Option">}}
{{< image src="images/OMNeT-Makemake_Configure_3.png" caption="OMNeT++ 工程 Makemake 自定义配置" title="OMNeT++ Makemkae Custom Option">}}

* 自定义配置中填写的代码如下：

    ```Makefile

    MSGC:=$(MSGC) --msg6

    ifeq ($(PLATFORM),win32.x86_64)
    LIBS += -lws2_32
    DEFINES += -DINET_EXPORT
    ENABLE_AUTO_IMPORT=-Wl,--enable-auto-import
    LDFLAGS := $(filter-out $(ENABLE_AUTO_IMPORT), $(LDFLAGS))
    endif

    ```