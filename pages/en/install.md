# install command

Copy files and set attributes.

## Overview

The `install` command copies files to specified destinations while setting permissions, ownership, and timestamps. It's commonly used in scripts and makefiles to place files in their proper locations during software installation, combining the functionality of `cp`, `chmod`, `chown`, and `mkdir` into a single command.

## Options

### **-d, --directory**

Create directories instead of copying files.

```console
$ install -d /tmp/new_directory
$ ls -ld /tmp/new_directory
drwxr-xr-x 2 user user 4096 May 5 10:00 /tmp/new_directory
```

### **-m, --mode=MODE**

Set permission mode (as in chmod), instead of the default rwxr-xr-x.

```console
$ install -m 644 source.txt /tmp/
$ ls -l /tmp/source.txt
-rw-r--r-- 1 user user 123 May 5 10:01 /tmp/source.txt
```

### **-o, --owner=OWNER**

Set ownership (super-user only).

```console
$ sudo install -o root source.txt /tmp/
$ ls -l /tmp/source.txt
-rwxr-xr-x 1 root user 123 May 5 10:02 /tmp/source.txt
```

### **-g, --group=GROUP**

Set group ownership (super-user only).

```console
$ sudo install -g wheel source.txt /tmp/
$ ls -l /tmp/source.txt
-rwxr-xr-x 1 user wheel 123 May 5 10:03 /tmp/source.txt
```

### **-s, --strip**

Strip symbol tables from executables.

```console
$ install -s executable /tmp/
```

### **-v, --verbose**

Print the name of each directory as it is created.

```console
$ install -v source.txt /tmp/
'source.txt' -> '/tmp/source.txt'
```

### **-b, --backup[=CONTROL]**

Make a backup of each existing destination file.

```console
$ install -b source.txt /tmp/
$ ls -l /tmp/
-rwxr-xr-x 1 user user 123 May 5 10:04 source.txt
-rwxr-xr-x 1 user user 123 May 5 10:03 source.txt~
```

### **-c, --compare**

Do not copy if the source and destination files are the same.

```console
$ install -c source.txt /tmp/
```

## Usage Examples

### Installing a file with specific permissions

```console
$ install -m 755 myscript.sh /usr/local/bin/
```

### Creating multiple directories at once

```console
$ install -d /tmp/dir1 /tmp/dir2 /tmp/dir3
```

### Installing a file with specific owner and group

```console
$ sudo install -o www-data -g www-data -m 644 config.php /var/www/html/
```

### Installing multiple files to a directory

```console
$ install -m 644 *.txt /tmp/
```

## Tips:

### Use for Deployment Scripts

The `install` command is ideal for deployment scripts because it handles permissions and ownership in one step, making it more efficient than separate `cp` and `chmod` commands.

### Create Parent Directories

Unlike `mkdir -p`, `install -d` doesn't create parent directories. If you need to create a nested directory structure, create the parents first or use `mkdir -p` instead.

### Preserve File Attributes

When you want to preserve the original file's attributes, use `install -p` which preserves the modification time, access time, and modes of the source files.

### Backup Strategy

When using `-b` for backups, you can control the backup suffix with `--suffix=SUFFIX` or set the backup method with `--backup=CONTROL` (where CONTROL can be 'none', 'numbered', 'existing', or 'simple').

## Frequently Asked Questions

#### Q1. What's the difference between `install` and `cp`?
A. `install` combines copying with setting permissions and ownership in one command, while `cp` only copies files. `install` is designed for software installation, while `cp` is a general-purpose copy command.

#### Q2. Can `install` create directories like `mkdir`?
A. Yes, with the `-d` option, `install` can create directories with specific permissions in one step.

#### Q3. Does `install` preserve file timestamps?
A. By default, `install` updates timestamps to the current time. Use the `-p` option to preserve the original timestamps.

#### Q4. Can I use `install` to copy directories recursively?
A. No, `install` doesn't have a recursive option like `cp -r`. You need to create the directory structure first and then install files into it.

## References

https://www.gnu.org/software/coreutils/manual/html_node/install-invocation.html

## Revisions

- 2025/05/05 First revision