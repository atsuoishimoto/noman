# dpkg command

Package management tool for Debian-based systems that handles installation, removal, and information about .deb packages.

## Overview

`dpkg` (Debian Package) is the core package management utility in Debian-based Linux distributions like Ubuntu. It directly handles .deb package files, allowing users to install, remove, configure, and query information about packages. Unlike higher-level tools like `apt`, `dpkg` works directly with package files and doesn't handle dependencies automatically.

## Options

### **-i, --install**

Install a package from a .deb file

```console
$ sudo dpkg -i package.deb
(Reading database ... 200000 files and directories currently installed.)
Preparing to unpack package.deb ...
Unpacking package (1.0-1) ...
Setting up package (1.0-1) ...
```

### **-r, --remove**

Remove an installed package, keeping configuration files

```console
$ sudo dpkg -r package
(Reading database ... 200000 files and directories currently installed.)
Removing package (1.0-1) ...
```

### **-P, --purge**

Remove an installed package including configuration files

```console
$ sudo dpkg -P package
(Reading database ... 200000 files and directories currently installed.)
Purging configuration files for package (1.0-1) ...
```

### **-l, --list**

List all installed packages matching a pattern

```console
$ dpkg -l firefox*
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name           Version      Architecture Description
+++-==============-============-============-=================================
ii  firefox        115.0.2      amd64        Safe and easy web browser from Mozilla
```

### **-L, --listfiles**

List files installed by a package

```console
$ dpkg -L firefox
/usr/lib/firefox
/usr/lib/firefox/browser
/usr/lib/firefox/browser/chrome
/usr/lib/firefox/browser/chrome.manifest
...
```

### **-s, --status**

Display package status details

```console
$ dpkg -s firefox
Package: firefox
Status: install ok installed
Priority: optional
Section: web
Installed-Size: 256000
Maintainer: Ubuntu Mozilla Team <ubuntu-mozillateam@lists.ubuntu.com>
Architecture: amd64
Version: 115.0.2
...
```

### **-S, --search**

Search for packages that own a file

```console
$ dpkg -S /usr/bin/firefox
firefox: /usr/bin/firefox
```

### **--configure**

Configure an unpacked package

```console
$ sudo dpkg --configure package
Setting up package (1.0-1) ...
```

### **--unpack**

Unpack a package without configuring it

```console
$ sudo dpkg --unpack package.deb
(Reading database ... 200000 files and directories currently installed.)
Preparing to unpack package.deb ...
Unpacking package (1.0-1) over (1.0-0) ...
```

## Usage Examples

### Installing multiple packages at once

```console
$ sudo dpkg -i package1.deb package2.deb package3.deb
(Reading database ... 200000 files and directories currently installed.)
Preparing to unpack package1.deb ...
Unpacking package1 (1.0-1) ...
Preparing to unpack package2.deb ...
Unpacking package2 (2.0-1) ...
Preparing to unpack package3.deb ...
Unpacking package3 (3.0-1) ...
Setting up package1 (1.0-1) ...
Setting up package2 (2.0-1) ...
Setting up package3 (3.0-1) ...
```

### Listing all installed packages

```console
$ dpkg -l
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name           Version      Architecture Description
+++-==============-============-============-=================================
ii  accountsservice 0.6.55-0ubuntu12 amd64    query and manipulate user account information
ii  acl            2.2.53-6      amd64        access control list - utilities
ii  adduser        3.118ubuntu2  all          add and remove users and groups
...
```

### Fixing broken package installations

```console
$ sudo dpkg --configure -a
Setting up package1 (1.0-1) ...
Setting up package2 (2.0-1) ...
```

## Tips

### Handling Dependencies

`dpkg` doesn't resolve dependencies automatically. If you encounter dependency errors, use:
```console
$ sudo apt-get -f install
```
This will attempt to fix broken dependencies after a `dpkg` installation.

### Preventing Configuration During Installation

Use `--unpack` instead of `-i` to unpack a package without configuring it, which is useful when you need to modify files before configuration:
```console
$ sudo dpkg --unpack package.deb
$ # make changes to files
$ sudo dpkg --configure package
```

### Finding Which Package Owns a Command

When you want to know which package provides a specific command:
```console
$ which command
/usr/bin/command
$ dpkg -S /usr/bin/command
package: /usr/bin/command
```

### Understanding Package Status Codes

In `dpkg -l` output, the first two characters indicate package status:
- `ii`: package is installed and configured
- `rc`: package was removed but config files remain
- `un`: package is unknown/not installed

## Frequently Asked Questions

#### Q1. How is dpkg different from apt?
A. `dpkg` is a low-level package manager that works directly with .deb files and doesn't handle dependencies automatically. `apt` is a higher-level tool that resolves dependencies and can download packages from repositories.

#### Q2. How do I fix "dependency problems" errors?
A. Run `sudo apt-get -f install` to attempt to resolve dependency issues after a `dpkg` installation.

#### Q3. How can I see what files a package will install before installing it?
A. Use `dpkg-deb --contents package.deb` to list the files contained in a package without installing it.

#### Q4. How do I reinstall a package with dpkg?
A. Use `sudo dpkg -i --force-reinstall package.deb` to reinstall a package even if it's already installed.

#### Q5. How do I prevent a package from being upgraded?
A. Use `sudo apt-mark hold package` to prevent a package from being automatically upgraded.

## References

https://man7.org/linux/man-pages/man1/dpkg.1.html

## Revisions

- 2025/05/05 First revision