# apt command

Package management tool for Debian-based Linux distributions.

## Overview

`apt` (Advanced Package Tool) is a command-line utility for installing, updating, removing, and managing software packages on Debian-based Linux distributions like Ubuntu. It simplifies package management by handling dependencies, configuration, and installation processes automatically.

## Options

### **update**

Updates the package lists from repositories

```console
$ sudo apt update
Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
All packages are up to date.
```

### **upgrade**

Upgrades installed packages to their latest versions

```console
$ sudo apt upgrade
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Calculating upgrade... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```

### **install**

Installs new packages

```console
$ sudo apt install nginx
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  nginx-common nginx-core
Suggested packages:
  fcgiwrap nginx-doc
The following NEW packages will be installed:
  nginx nginx-common nginx-core
0 upgraded, 3 newly installed, 0 to remove and 0 not upgraded.
```

### **remove**

Removes packages but keeps configuration files

```console
$ sudo apt remove nginx
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following packages will be REMOVED:
  nginx nginx-core
0 upgraded, 0 newly installed, 2 to remove and 0 not upgraded.
```

### **purge**

Removes packages along with their configuration files

```console
$ sudo apt purge nginx
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following packages will be REMOVED:
  nginx* nginx-common* nginx-core*
0 upgraded, 0 newly installed, 3 to remove and 0 not upgraded.
```

### **autoremove**

Removes packages that were automatically installed to satisfy dependencies and are no longer needed

```console
$ sudo apt autoremove
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```

### **search**

Searches for packages by name or description

```console
$ apt search nginx
Sorting... Done
Full Text Search... Done
nginx/jammy-updates,jammy-security 1.18.0-6ubuntu14.4 all
  small, powerful, scalable web/proxy server
```

### **show**

Shows detailed information about a package

```console
$ apt show nginx
Package: nginx
Version: 1.18.0-6ubuntu14.4
Priority: optional
Section: web
Origin: Ubuntu
...
```

### **list --installed**

Lists all installed packages

```console
$ apt list --installed
Listing... Done
accountsservice/jammy,now 22.07.5-2ubuntu1.4 amd64 [installed]
acl/jammy,now 2.3.1-1 amd64 [installed]
acpi-support/jammy,now 0.144 amd64 [installed]
...
```

## Usage Examples

### Installing multiple packages at once

```console
$ sudo apt install git curl wget
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
curl is already the newest version (7.81.0-1ubuntu1.14).
The following NEW packages will be installed:
  git wget
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
```

### Upgrading the entire system

```console
$ sudo apt update && sudo apt upgrade -y
Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Reading package lists... Done
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Calculating upgrade... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```

### Installing a specific version of a package

```console
$ sudo apt install nginx=1.18.0-6ubuntu14.3
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  nginx-common nginx-core
The following NEW packages will be installed:
  nginx nginx-common nginx-core
0 upgraded, 3 newly installed, 0 to remove and 0 not upgraded.
```

## Tips

### Use apt instead of apt-get

`apt` provides a more user-friendly interface with progress bars and color output compared to the older `apt-get` command.

### Clean up your system regularly

Run `sudo apt autoremove` and `sudo apt clean` periodically to free up disk space by removing unnecessary packages and clearing the local repository of retrieved package files.

### Hold package versions

If you want to prevent a package from being upgraded, use `sudo apt-mark hold package_name`. To allow upgrades again, use `sudo apt-mark unhold package_name`.

### Check for broken dependencies

Use `sudo apt --fix-broken install` to fix broken dependencies that might occur after failed installations.

## Frequently Asked Questions

#### Q1. What's the difference between apt and apt-get?
A. `apt` is a newer, more user-friendly command that combines the most commonly used features of `apt-get` and `apt-cache` with improved output formatting and progress information.

#### Q2. How do I fix "Could not get lock" errors?
A. This usually means another package manager is running. Wait for it to finish or check for stuck processes with `ps aux | grep apt` and kill them if necessary with `sudo kill <process_id>`.

#### Q3. How can I install a package without being prompted?
A. Use the `-y` flag: `sudo apt install -y package_name` to automatically answer "yes" to prompts.

#### Q4. How do I update only security packages?
A. Use `sudo apt update && sudo apt upgrade -s` to simulate an upgrade, then `sudo apt install package_name` for specific security packages you want to update.

#### Q5. How do I downgrade a package?
A. Use `sudo apt install package_name=version_number` to install a specific older version.

## References

https://manpages.ubuntu.com/manpages/jammy/man8/apt.8.html

## Revisions

- 2025/05/05 First revision