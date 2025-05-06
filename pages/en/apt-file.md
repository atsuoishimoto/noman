# apt-file command

Search for files within packages in the APT package management system.

## Overview

apt-file is a command-line utility for Debian-based systems that allows users to search for files in packages, even if they are not installed. It's particularly useful for finding which package provides a specific file, or for exploring the contents of packages before installation.

## Options

### **search**

Search for packages containing files matching the pattern

```console
$ apt-file search /usr/bin/python3
python3-minimal: /usr/bin/python3
```

### **list**

List files in the specified package

```console
$ apt-file list python3-minimal
python3-minimal: /usr/bin/python3
python3-minimal: /usr/share/doc/python3-minimal/README.Debian
python3-minimal: /usr/share/doc/python3-minimal/changelog.Debian.gz
python3-minimal: /usr/share/doc/python3-minimal/copyright
```

### **-a, --architecture**

Specify the architecture to search

```console
$ apt-file -a amd64 search libssl.so
libssl-dev: /usr/lib/x86_64-linux-gnu/libssl.so
```

### **-F, --fixed-string**

Do not interpret pattern as a regular expression

```console
$ apt-file -F search "libssl.so.1.1"
libssl1.1: /usr/lib/x86_64-linux-gnu/libssl.so.1.1
```

### **-l, --package-only**

Display only package names, not file paths

```console
$ apt-file -l search /usr/bin/python3
python3-minimal
```

### **-x, --regexp**

Interpret pattern as a regular expression (default)

```console
$ apt-file -x search "^/usr/bin/py.*3$"
python3-minimal: /usr/bin/python3
```

### **-v, --verbose**

Display more information during operation

```console
$ apt-file -v search /usr/bin/python3
Reading package lists... Done
Building dependency tree... Done
python3-minimal: /usr/bin/python3
```

### **update**

Update the contents database

```console
$ sudo apt-file update
Downloading complete file https://deb.debian.org/debian/dists/bookworm/Contents-amd64.gz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 45.2M  100 45.2M    0     0  5215k      0  0:00:08  0:00:08 --:--:-- 6123k
```

## Usage Examples

### Finding which package provides a specific file

```console
$ apt-file search /usr/bin/convert
imagemagick-6.q16: /usr/bin/convert
```

### Listing all files in a package

```console
$ apt-file list wget
wget: /etc/wgetrc
wget: /usr/bin/wget
wget: /usr/share/doc/wget/AUTHORS
wget: /usr/share/doc/wget/COPYING
wget: /usr/share/doc/wget/NEWS.gz
wget: /usr/share/doc/wget/README
wget: /usr/share/info/wget.info.gz
wget: /usr/share/man/man1/wget.1.gz
```

### Finding header files for development

```console
$ apt-file search "include/openssl/ssl.h"
libssl-dev: /usr/include/openssl/ssl.h
```

## Tips:

### Update the Database First

Always run `sudo apt-file update` before using apt-file, especially after system updates or if you haven't used it recently. This ensures you have the latest package information.

### Use with grep for Complex Filtering

Combine apt-file with grep for more complex filtering:
```console
$ apt-file list python3 | grep "bin/"
```

### Find Dependencies for Compilation

When compiling software that reports missing header files, use apt-file to find which development packages you need to install:
```console
$ apt-file search missing_header.h
```

## Frequently Asked Questions

#### Q1. What's the difference between apt-file and dpkg -S?
A. dpkg -S only searches installed packages, while apt-file can search all available packages, even those not installed.

#### Q2. How do I install apt-file?
A. Run `sudo apt install apt-file` and then `sudo apt-file update` to initialize the database.

#### Q3. Why is apt-file search slow?
A. apt-file searches through a large database of files. Using more specific search patterns or the -F option can speed up searches.

#### Q4. How often should I update the apt-file database?
A. Update whenever you update your package lists with apt update, or at least once a month.

## References

https://manpages.debian.org/bookworm/apt-file/apt-file.1.en.html

## Revisions

- 2025/05/05 First revision