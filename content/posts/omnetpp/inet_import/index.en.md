---
title: Import INET to OMNeT++
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

INET Framework is an open-source model library for the OMNeT++ simulation environment. INET contains models for the Internet stack (TCP, UDP, IPv4, IPv6, OSPF, BGP, etc.), wired and wireless link layer protocols (Ethernet, PPP, IEEE 802.11, etc), support for mobility, MANET protocols, DiffServ, MPLS with LDP and RSVP-TE signalling, several application models, and many other protocols and components. Several other simulation frameworks take INET as a base, and extend it into specific directions, such as vehicular networks, overlay/peer-to-peer networks, or LTE. This article will explain the process of importing INET into OMNeT++, as well as how to create a new project based on INET.

<!--more-->

Basically all INET version can be find on {{< link href="https://inet.omnetpp.org/Download.html" content="INET Download" title="INET Download">}}, download the INET which is compatible with your OMNeT++.

## Importing INET

INET itself is an OMNeT++ project, importing it into OMNeT++ is no different from importing any other OMNeT++ project. In the OMNeT++ IDE, go to the "File" option and click on "Import" to initiate the project import process.

{{< image src="images/OMNeT-Import_Option.png" caption="OMNeT++ Import Option" title="OMNeT Import Option">}}

* On the "Select" page, choose "Existing Project into Workspace" under the "General" category. 
{{< image src="images/OMNeT-Import_Type.png" caption="OMNeT++ Import Type Select" title="OMNeT Import Type Select">}}

* On the "Import Projects" configuration page, for the downloaded INET, which is in a compressed tar ball, select "Select archive file" and click "Browse..." to choose the INET tar ball, if the project is a folder, choose "Select a root directory..." and click "Browse..." to locate the folder path. In the "Projects" section, select the INET project, and if you import the project a an folder it is recommended to check the “Copy project file into workspace” for better management. Finally, click on "Finish" to complete the importing process.
{{< image src="images/OMNeT-Import_Configure.png" caption="OMNeT++ Import Configuration - 1" title="OMNeT Import Configure">}}
{{< image src="images/OMNeT-Import_Tarball.png" caption="OMNeT++ Import Configuration - 2" title="OMNeT Import Tarball">}}

* After importing, right-click on the project and select "Properties" to open the project's property configuration page. In "Project Feature" section, you can customize the features of the INET. You can uncheck unnecessary modules and check the ones you need. For instance, to enable real network emulation functions, check the "Network emulation support" option (only supported on Linux). By default, "Visualization OSG (3D)" and "Visualization OSG (3D) showcase" are not checked. Enabling these features requires compiling and installing OpenSceneGraph functionality in OMNeT++, these two need to be checked if you need 3D visualization environment.
{{< image src="images/INET-Feature_Select.png" caption="INET Feature Configuration" title="INET Feature Configure">}}

* After configuring, save the configurations and close the project properties window. Right click the project and select "Build Project" to compile the project. Please be patient and wait for the compilation process to finish.

{{< admonition tip >}}

INET is compiled by default in "Debug" mode, but simulations runs faster in  "Release" mode. The IDE will ask you to compile a "Release" version for better  performance when you run (not debug) simulations, we can do it in advance.

Right-click on the project -> Build Configurations  -> Set Active  -> release.

{{< /admonition >}}

{{< admonition note >}}

You may encounter the following error while modifying INET features or compiling INET. The error indicates that the current feature configuration does not match the configuration in "NED Source Folders" and  "Makemake". You can simply click "OK" to automatically fix it.

{{< image src="images/INET-Setup_Error.png" caption="INET Setup Error" title="INET Error">}}

{{< /admonition >}}

## Create a New Project Based on INET

### Create a New Project

Click on "File" in the top right corner, then select "New" followed by "OMNeT++ Project..." to create a new OMNeT++ project.

{{< image src="images/OMNeT-New_Project.png" caption="OMNeT++ New Project Option" title="OMNeT++ New Project">}}

* In the "New OMNeT++ Project" page, provide a name for the project.
{{< image src="images/OMNeT-Project_Name.png" caption="OMNeT++ Name Project" title="OMNeT++ Name Project">}}

* In the "Initial Content" interface, there are two options to choose from for the project type:

    1. "Empty project": This option creates a basic project structure without any predefined folders or files. If you only intend to use existing INET modules without writing new C++ modules, you can select this option.
    2. "Empty project with 'src' and 'simulations' folders": This option includes the 'src' and 'simulations' folders in the initial project structure. The 'src' folder is used to store C++ module source code, `.msg` message definition files, and `.ned` files associated with C++ modules. The 'simulations' folder is typically used to store simulation configuration `.ini` files and `.ned` files that describe the network topology. If you have requirements that involve writing new modules in C++, you can choose this option.
{{< image src="images/OMNeT-Project_Contents.png" caption="OMNeT++ Content Select" title="OMNeT++ Project Content">}}

* In the "C++ Project Type" page, you can select the project type and the toolchain to be used. It is recommended to keep the default settings in this step.
{{< image src="images/OMNeT-Project_Type.png" caption="OMNeT++ Project Type Select" title="OMNeT++ Project Type">}}

* In the "Select Configurations" page, you can custom the build configurations. There is no need for additional configuration, so you can simply keep the default settings.
{{< image src="images/OMNeT-Project_Configuration.png" caption="OMNeT++ Compile Configuration" title="OMNeT++ Project Configure">}}

* Click "Finish" to complete.

### Project Configurations

If you do not need to use the INET framework, you can proceed directly with writing simulation code. However, if you intend to use modules from the INET framework, further configuration of the project is required. Right-click on the newly created project in the "Project Explorer" and select "Properties" to open the project's property configuration page.

* Check "inet" under "Project References". If you don't need to modify or extend the C++ modules of INET for your simulation, it is sufficient for your simulations.
{{< image src="images/OMNeT-Project_Reference.png" caption="OMNeT++ Project Reference" title="OMNeT++ Project Reference">}}

* If you need to write new C++ code based on some modules of INET, additional settings are required. In the project properties configuration page, locate "OMNeT++" and click "Makemake". Select "src: makemake..." on the right and click "Options...".
{{< image src="images/OMNeT-Makemkae_Option.png" caption="OMNeT++ Project Makemake Options" title="OMNeT++ Makemkae Option">}}

* Modify the settings in the "Compile," "Link," and "Custom" sections as shown in the following images.
{{< image src="images/OMNeT-Makemake_Configure_1.png" caption="OMNeT++ Project Makemake Compile Settings" title="OMNeT++ Makemkae Compile Option">}}
{{< image src="images/OMNeT-Makemake_Configure_2.png" caption="OMNeT++ Project Makemake Link Settings" title="OMNeT++ Makemkae Link Option">}}
{{< image src="images/OMNeT-Makemake_Configure_3.png" caption="OMNeT++ Project Makemake Custom Settings" title="OMNeT++ Makemkae Custom Option">}}

* The code in "Custom" section is as follow:

    ```Makefile

    MSGC:=$(MSGC) --msg6

    ifeq ($(PLATFORM),win32.x86_64)
    LIBS += -lws2_32
    DEFINES += -DINET_EXPORT
    ENABLE_AUTO_IMPORT=-Wl,--enable-auto-import
    LDFLAGS := $(filter-out $(ENABLE_AUTO_IMPORT), $(LDFLAGS))
    endif

    ```