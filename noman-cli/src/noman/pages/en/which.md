# which command

Locate a command's executable file in the user's PATH.

## Overview

The `which` command searches through the directories listed in the PATH environment variable to find the location of executable programs. It helps determine which version of a program would be executed if run from the command line.

## Options

### **-a, --all**

Display all matching executables in PATH, not just the first one.

```console
$ which -a python
/usr/bin/python
/usr/local/bin/python
```

### **-s**

Silent mode - return exit status (0 if found, 1 if not found) without output.

```console
$ which -s git
$ echo $?
0
```

## Usage Examples

### Finding a command's location

```console
$ which ls
/bin/ls
```

### Checking if a command exists

```console
$ which nonexistentcommand
which: no nonexistentcommand in (/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin)
```

### Using with multiple commands

```console
$ which bash python perl
/bin/bash
/usr/bin/python
/usr/bin/perl
```

## Tips:

### Use with command substitution

You can use `which` with command substitution to execute the full path of a command:
```console
$ $(which python) --version
Python 3.9.6
```

### Check for multiple versions

Use `which -a` to find all instances of a command in your PATH, which is helpful when troubleshooting version conflicts.

### Combine with other commands

Combine with other commands for more information:
```console
$ ls -l $(which python)
-rwxr-xr-x 1 root wheel 31488 Jan 1 2023 /usr/bin/python
```

## Frequently Asked Questions

#### Q1. What's the difference between `which` and `whereis`?
A. `which` only shows the executable's location in your PATH, while `whereis` also finds the command's source code, man pages, and related files.

#### Q2. Why does `which` sometimes not find a command that exists?
A. The command might be a shell builtin (like `cd`), an alias, or not in your PATH environment variable.

#### Q3. How can I use `which` to check if a command is installed?
A. Use `which -s command && echo "Installed" || echo "Not installed"` to check if a command exists in your PATH.

#### Q4. Does `which` work for shell builtins?
A. No, `which` only finds executable files in your PATH, not shell builtins like `cd` or `echo`.

## References

https://pubs.opengroup.org/onlinepubs/9699919799/utilities/which.html

## Revisions

- 2025/05/05 First revision