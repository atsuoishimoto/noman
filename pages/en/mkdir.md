# mkdir command

Create directories with specified names.

## Overview

The `mkdir` command creates new directories in the file system. It allows users to create single or multiple directories at once, and can create parent directories automatically when needed. By default, directories are created with permissions based on the user's umask setting.

## Options

### **-p, --parents**

Create parent directories as needed. No error if existing.

```console
$ mkdir -p projects/website/css
```

### **-m, --mode=MODE**

Set file mode (permissions) for the created directories.

```console
$ mkdir -m 755 secure_folder
```

### **-v, --verbose**

Print a message for each created directory.

```console
$ mkdir -v new_folder
mkdir: created directory 'new_folder'
```

### **-Z, --context=CTX**

Set the SELinux security context of each created directory to CTX.

```console
$ mkdir -Z new_folder
```

## Usage Examples

### Creating multiple directories at once

```console
$ mkdir docs images videos
$ ls
docs  images  videos
```

### Creating nested directories with parent creation

```console
$ mkdir -p projects/webapp/src/components
$ ls -R projects
projects:
webapp

projects/webapp:
src

projects/webapp/src:
components
```

### Creating a directory with specific permissions

```console
$ mkdir -m 700 private_data
$ ls -l
total 4
drwx------  2 user  user  4096 May  5 10:30 private_data
```

## Tips:

### Use -p for Nested Directories

The `-p` option is extremely useful when creating a directory structure. It creates all necessary parent directories and doesn't error if directories already exist.

### Set Permissions During Creation

Instead of creating a directory and then changing its permissions with `chmod`, use the `-m` option to set permissions during creation.

### Create Multiple Directories Efficiently

You can create multiple directories with a single command: `mkdir dir1 dir2 dir3`.

### Use Brace Expansion for Related Directories

Combine with bash brace expansion for creating related directories: `mkdir -p project/{src,docs,tests}`.

## Frequently Asked Questions

#### Q1. How do I create a directory with specific permissions?
A. Use `mkdir -m MODE directory_name`. For example, `mkdir -m 755 my_dir` creates a directory with read, write, and execute permissions for the owner, and read and execute permissions for group and others.

#### Q2. How do I create multiple nested directories at once?
A. Use `mkdir -p parent/child/grandchild`. The `-p` option creates all necessary parent directories.

#### Q3. What happens if I try to create a directory that already exists?
A. Without the `-p` option, `mkdir` will return an error. With `-p`, it will silently continue without error.

#### Q4. Can I see what directories are being created?
A. Yes, use the `-v` (verbose) option to see a message for each directory created.

## References

https://www.gnu.org/software/coreutils/manual/html_node/mkdir-invocation.html

## Revisions

- 2025/05/05 First revision