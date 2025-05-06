# readlink command

Print the resolved symbolic links or canonical file names.

## Overview

The `readlink` command displays the target of a symbolic link or the canonical path of a file. It resolves symbolic links and returns the actual destination path. This is useful for scripts that need to determine where a symbolic link points to or to get the absolute path of a file.

## Options

### **-f, --canonicalize**

Canonicalize by following every symlink in every component of the given name recursively; all but the last component must exist

```console
$ ln -s /etc/hosts mylink
$ readlink -f mylink
/etc/hosts
```

### **-e, --canonicalize-existing**

Canonicalize by following every symlink in every component of the given name recursively, all components must exist

```console
$ readlink -e mylink
/etc/hosts
```

### **-m, --canonicalize-missing**

Canonicalize by following every symlink in every component of the given name recursively, without requirements on components existence

```console
$ readlink -m /nonexistent/path
/nonexistent/path
```

### **-n, --no-newline**

Do not output the trailing delimiter (newline)

```console
$ readlink -n mylink && echo " (this is the target)"
/etc/hosts (this is the target)
```

### **-z, --zero**

End each output line with NUL, not newline

```console
$ readlink -z mylink | hexdump -C
00000000  2f 65 74 63 2f 68 6f 73  74 73 00                 |/etc/hosts.|
0000000b
```

### **-v, --verbose**

Report errors

```console
$ readlink -v nonexistent
readlink: nonexistent: No such file or directory
```

## Usage Examples

### Basic usage to read a symbolic link

```console
$ ln -s /usr/bin bin_link
$ readlink bin_link
/usr/bin
```

### Getting the absolute path of a file

```console
$ readlink -f ../relative/path/to/file.txt
/absolute/path/to/file.txt
```

### Using readlink in a script

```console
$ SCRIPT_PATH=$(readlink -f "$0")
$ SCRIPT_DIR=$(dirname "$SCRIPT_PATH")
$ echo "This script is located in: $SCRIPT_DIR"
This script is located in: /home/user/scripts
```

## Tips:

### Difference Between -f, -e, and -m

- `-f` follows all symlinks but requires only the final component to exist
- `-e` follows all symlinks but requires all components to exist
- `-m` follows all symlinks with no existence requirements (useful for nonexistent paths)

### Use in Shell Scripts

When writing shell scripts, use `readlink -f "$0"` to get the absolute path of the script itself, regardless of where it's called from.

### Handling Spaces in Filenames

Always quote variables when using readlink to handle filenames with spaces:

```console
$ readlink -f "$my_file"  # Correct
$ readlink -f $my_file    # Incorrect with spaces
```

## Frequently Asked Questions

#### Q1. What's the difference between `readlink` and `realpath`?
A. Both commands resolve symbolic links, but `realpath` always provides the absolute path, while `readlink` without options simply shows the target of a symlink. With `-f`, `readlink` behaves similarly to `realpath`.

#### Q2. How do I get the directory containing a script?
A. Use `dirname "$(readlink -f "$0")"` to get the directory containing the script, regardless of where it's called from.

#### Q3. Why does `readlink` without options fail on regular files?
A. Without options, `readlink` only works on symbolic links. Use `-f` to make it work on regular files too.

#### Q4. How can I use `readlink` to check if a file is a symbolic link?
A. If `readlink` without options returns output, the file is a symlink. If it returns an error, it's not a symlink.

## References

https://www.gnu.org/software/coreutils/manual/html_node/readlink-invocation.html

## Revisions

- 2025/05/05 First revision