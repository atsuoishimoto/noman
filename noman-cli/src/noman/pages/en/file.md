# file command

Determine file type by examining file contents.

## Overview

The `file` command identifies the type of a file by examining its contents, rather than relying on filename extensions. It performs various tests to determine whether files are text, executable binaries, data files, or other types. This is particularly useful when working with files that have missing or misleading extensions.

## Options

### **-b, --brief**

Display the result without the filename prefix.

```console
$ file -b document.txt
ASCII text
```

### **-i, --mime**

Display MIME type instead of traditional file type description.

```console
$ file -i document.txt
document.txt: text/plain; charset=us-ascii
```

### **-z, --uncompress**

Try to look inside compressed files.

```console
$ file -z archive.gz
archive.gz: ASCII text (gzip compressed data, was "notes.txt", last modified: Wed Apr 28 15:30:45 2021, from Unix)
```

### **-L, --dereference**

Follow symbolic links.

```console
$ file -L symlink
symlink: ASCII text
```

### **-s, --special-files**

Read block or character special files.

```console
$ file -s /dev/sda1
/dev/sda1: Linux rev 1.0 ext4 filesystem data (extents) (large files)
```

## Usage Examples

### Checking multiple files at once

```console
$ file document.txt image.png script.sh
document.txt: ASCII text
image.png:    PNG image data, 1920 x 1080, 8-bit/color RGB, non-interlaced
script.sh:    Bourne-Again shell script, ASCII text executable
```

### Examining a binary file

```console
$ file /bin/ls
/bin/ls: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=2f15ad836be3339dec0e2e6a3c637e08e48aacbd, for GNU/Linux 3.2.0, stripped
```

### Checking file encoding

```console
$ file --mime-encoding document.txt
document.txt: us-ascii
```

## Tips:

### Use with find command

Combine with `find` to identify file types in a directory structure:

```console
$ find . -type f -exec file {} \;
```

### Examining disk partitions

Use `file -s` to examine disk partitions and filesystems:

```console
$ sudo file -s /dev/sd*
```

### Checking file encoding

When working with international text, use `file --mime-encoding` to determine character encoding:

```console
$ file --mime-encoding international_text.txt
international_text.txt: utf-8
```

## Frequently Asked Questions

#### Q1. How accurate is the file command?
A. The `file` command is generally accurate but not infallible. It uses "magic" tests that examine file contents for patterns, but some file types may be misidentified, especially custom or obscure formats.

#### Q2. Can file detect encrypted files?
A. Yes, `file` can often detect encrypted files, but it may only identify them as "data" or "encrypted data" without specifying the encryption method.

#### Q3. How does file differ from using file extensions?
A. Unlike relying on file extensions (which can be changed or misleading), `file` examines the actual content of files to determine their type, providing more reliable identification.

#### Q4. Can file identify programming language source code?
A. Yes, `file` can identify many programming language source files, though it may sometimes only identify them generically as "ASCII text" or similar.

## References

https://man7.org/linux/man-pages/man1/file.1.html

## Revisions

- 2025/05/05 First revision