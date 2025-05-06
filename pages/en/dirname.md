# dirname command

Output the directory portion of a pathname.

## Overview

The `dirname` command strips the last component from a pathname, leaving only the directory path. It's commonly used in shell scripts to extract the directory part of a file path, which is useful for navigating to specific directories or processing files in the same location.

## Options

### **--zero, -z**

Output a zero byte (ASCII NUL) instead of a newline after each pathname.

```console
$ dirname -z /usr/bin/zip
/usr/bin$
```

### **--help**

Display help information and exit.

```console
$ dirname --help
Usage: dirname [OPTION] NAME...
Output each NAME with its last non-slash component and trailing slashes
removed; if NAME contains no /'s, output '.' (meaning the current directory).

  -z, --zero     end each output line with NUL, not newline
      --help     display this help and exit
      --version  output version information and exit

Examples:
  dirname /usr/bin/          -> "/usr"
  dirname dir1/str dir2/str  -> "dir1" followed by "dir2"
  dirname stdio.h            -> "."
```

### **--version**

Output version information and exit.

```console
$ dirname --version
dirname (GNU coreutils) 9.0
Copyright (C) 2021 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by David MacKenzie.
```

## Usage Examples

### Basic Usage

```console
$ dirname /usr/bin/zip
/usr/bin
```

### Multiple Arguments

```console
$ dirname /usr/bin/zip /etc/passwd /home/user/file.txt
/usr/bin
/etc
/home/user
```

### Current Directory

```console
$ dirname file.txt
.
```

### Using in Shell Scripts

```console
$ script_dir=$(dirname "$0")
$ echo "This script is located in: $script_dir"
This script is located in: /path/to/script/directory
```

## Tips:

### Combine with basename

Use `dirname` together with `basename` to split a path into its directory and filename components:

```console
$ path="/home/user/documents/report.pdf"
$ dir=$(dirname "$path")
$ file=$(basename "$path")
$ echo "Directory: $dir, File: $file"
Directory: /home/user/documents, File: report.pdf
```

### Handle Paths with Spaces

Always quote variables when using `dirname` to handle paths with spaces correctly:

```console
$ path="/home/user/my documents/report.pdf"
$ dir=$(dirname "$path")  # Quotes are important
$ echo "$dir"
/home/user/my documents
```

### Use with cd

Combine with `cd` to navigate to a file's directory:

```console
$ cd "$(dirname "/path/to/file.txt")"
```

## Frequently Asked Questions

#### Q1. What does `dirname` return if I pass a filename without a path?
A. It returns `.` (the current directory).

#### Q2. Can `dirname` process multiple paths at once?
A. Yes, you can pass multiple arguments, and it will process each one separately.

#### Q3. How does `dirname` handle trailing slashes?
A. It removes trailing slashes before processing the path.

#### Q4. What's the difference between `dirname` and `basename`?
A. `dirname` returns the directory portion of a path, while `basename` returns the filename portion.

## References

https://www.gnu.org/software/coreutils/manual/html_node/dirname-invocation.html

## Revisions

- 2025/05/05 First revision