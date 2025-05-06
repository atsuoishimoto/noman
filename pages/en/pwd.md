# pwd command

Print the full pathname of the current working directory.

## Overview

The `pwd` command displays the absolute path of the directory you are currently in. This helps you understand your location within the filesystem hierarchy, which is especially useful when navigating between directories or writing scripts that need to reference the current location.

## Options

### **-L, --logical**

Print the logical current working directory, with symbolic links in the path resolved as encountered (default behavior).

```console
$ pwd -L
/home/user/projects
```

### **-P, --physical**

Print the physical current working directory, with all symbolic links resolved.

```console
$ pwd -P
/var/www/html/projects
```

## Usage Examples

### Basic usage

```console
$ pwd
/home/user/documents
```

### Using pwd in scripts

```console
$ echo "Current directory: $(pwd)"
Current directory: /home/user/documents
```

### Comparing logical vs physical paths

```console
$ cd /home/user/symlink_to_projects
$ pwd -L
/home/user/symlink_to_projects
$ pwd -P
/home/user/actual/projects
```

## Tips:

### Use in Shell Scripts

Store the current directory in a variable to reference it later in your script:
```bash
CURRENT_DIR=$(pwd)
cd /some/other/directory
# Do some work
cd "$CURRENT_DIR"  # Return to original directory
```

### Avoid Hardcoding Paths

Instead of hardcoding paths in scripts, use `pwd` to make scripts more portable across different systems.

### Troubleshooting Symbolic Links

When working with symbolic links, use `pwd -P` to see where files are actually stored on disk, which can help troubleshoot permission issues.

## Frequently Asked Questions

#### Q1. What is the difference between `pwd` and `echo $PWD`?
A. They typically show the same result, but `$PWD` is an environment variable that stores the current directory path. `pwd` is a command that actively determines the current directory.

#### Q2. Why might `pwd -P` and `pwd -L` show different results?
A. They differ when your current directory contains symbolic links. `-L` shows the path with symbolic links intact, while `-P` resolves all symbolic links to show the actual physical path.

#### Q3. Does `pwd` work the same on all Unix-like systems?
A. The basic functionality is the same, but there might be slight differences in available options between GNU/Linux, macOS, and other Unix variants.

## References

https://www.gnu.org/software/coreutils/manual/html_node/pwd-invocation.html

## Revisions

- 2025/05/05 First revision