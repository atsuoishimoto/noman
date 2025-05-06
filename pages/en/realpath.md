# realpath command

Print the resolved absolute file path.

## Overview

The `realpath` command resolves symbolic links and relative path components to display the absolute canonical path of a file or directory. It follows all symbolic links, resolves references to /./, /../, and removes extra '/' characters to produce a standardized path.

## Options

### **-e, --canonicalize-existing**

All components of the path must exist

```console
$ realpath -e /etc/hosts
/etc/hosts

$ realpath -e /nonexistent/file
realpath: /nonexistent/file: No such file or directory
```

### **-m, --canonicalize-missing**

No path components need to exist or be a directory

```console
$ realpath -m /nonexistent/file
/nonexistent/file
```

### **-L, --logical**

Resolve '..' components before symlinks

```console
$ realpath -L /etc/alternatives/../hosts
/etc/hosts
```

### **-P, --physical**

Resolve symlinks as encountered (default)

```console
$ realpath -P /etc/alternatives/../hosts
/etc/hosts
```

### **-q, --quiet**

Suppress most error messages

```console
$ realpath -q /nonexistent/file
```

### **-s, --strip, --no-symlinks**

Don't expand symlinks

```console
$ ln -s /etc/hosts symlink_to_hosts
$ realpath -s symlink_to_hosts
/path/to/current/directory/symlink_to_hosts
```

### **-z, --zero**

End each output line with NUL, not newline

```console
$ realpath -z /etc/hosts | hexdump -C
00000000  2f 65 74 63 2f 68 6f 73  74 73 00              |/etc/hosts.|
0000000b
```

## Usage Examples

### Resolving a relative path

```console
$ cd /usr/local
$ realpath bin/../share
/usr/local/share
```

### Resolving a symbolic link

```console
$ ln -s /etc/hosts my_hosts
$ realpath my_hosts
/etc/hosts
```

### Processing multiple paths

```console
$ realpath /etc/hosts /etc/passwd /etc/group
/etc/hosts
/etc/passwd
/etc/group
```

## Tips:

### Use in Scripts for Reliable File Paths

When writing shell scripts, use `realpath` to ensure you're working with absolute paths, which helps avoid issues with relative paths when the script changes directories.

### Combine with Other Commands

Pipe the output of `realpath` to other commands when you need the absolute path:
```console
$ cd $(realpath ~/Documents)
```

### Check if Paths Exist

Use `-e` to verify that a path exists before attempting operations on it.

## Frequently Asked Questions

#### Q1. What's the difference between `realpath` and `readlink -f`?
A. They're similar, but `realpath` is part of GNU coreutils and has more options. `readlink -f` is more commonly available on various Unix systems.

#### Q2. How do I get the absolute path without resolving symlinks?
A. Use `realpath -s` or `realpath --no-symlinks` to get the absolute path without resolving symbolic links.

#### Q3. Can `realpath` handle spaces in filenames?
A. Yes, `realpath` properly handles spaces and special characters in filenames.

#### Q4. How do I use `realpath` to get the directory containing a file?
A. Use `dirname` with `realpath`: `dirname $(realpath filename)`

## References

https://www.gnu.org/software/coreutils/manual/html_node/realpath-invocation.html

## Revisions

- 2025/05/05 First revision