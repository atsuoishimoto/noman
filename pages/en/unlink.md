# unlink command

Remove a single file.

## Overview

The `unlink` command removes a single file by deleting its name from the filesystem. Unlike `rm`, it can only operate on one file at a time and doesn't accept options for recursive deletion or interactive prompting. It's a simple, focused command that performs the basic file deletion operation.

## Options

`unlink` is a simple command with minimal options:

### **--help**

Display help information and exit.

```console
$ unlink --help
Usage: unlink FILE
  or:  unlink OPTION
Call the unlink function to remove the specified FILE.

      --help     display this help and exit
      --version  output version information and exit
```

### **--version**

Output version information and exit.

```console
$ unlink --version
unlink (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by Michael Stone.
```

## Usage Examples

### Removing a file

```console
$ touch testfile.txt
$ ls
testfile.txt
$ unlink testfile.txt
$ ls
$
```

### Attempting to remove a directory (will fail)

```console
$ mkdir testdir
$ unlink testdir
unlink: cannot unlink 'testdir': Is a directory
```

## Tips:

### Use `rm` for More Flexibility

While `unlink` is useful for simple file deletion, `rm` provides more options like recursive deletion (`-r`), force deletion (`-f`), and interactive prompting (`-i`).

### Symbolic Links

When using `unlink` on a symbolic link, it removes the link itself, not the file it points to.

### Error Handling

`unlink` will fail with an error message if the file doesn't exist, is a directory, or if you don't have permission to remove it.

## Frequently Asked Questions

#### Q1. What's the difference between `unlink` and `rm`?
A. `unlink` can only remove a single file and has no options for modifying its behavior. `rm` can remove multiple files, directories (with `-r`), and has various options for controlling how deletion works.

#### Q2. Can `unlink` remove directories?
A. No, `unlink` cannot remove directories. Use `rmdir` for empty directories or `rm -r` for directories with contents.

#### Q3. What happens if I try to `unlink` a file that doesn't exist?
A. `unlink` will display an error message stating that the file doesn't exist.

#### Q4. Is there any way to recover a file after using `unlink`?
A. Generally no. Once a file is unlinked, it's removed from the filesystem. Recovery might be possible with specialized tools, but it's not guaranteed.

## References

https://www.gnu.org/software/coreutils/manual/html_node/unlink-invocation.html

## Revisions

- 2025/05/05 First revision