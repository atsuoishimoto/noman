# ls command

List directory contents.

## Overview

The `ls` command displays files and directories in the specified location. By default, it shows the contents of the current working directory, sorted alphabetically, excluding hidden files (those starting with a dot). It's one of the most frequently used commands for navigating and exploring the filesystem.

## Options

### **-l**

Display detailed information in a long listing format, showing file permissions, number of links, owner, group, size, and modification time.

```console
$ ls -l
total 16
-rw-r--r--  1 user  staff  1024 Apr 10 15:30 document.txt
drwxr-xr-x  3 user  staff   96  Apr 9  14:22 projects
```

### **-a, --all**

Show all files, including hidden files (those starting with a dot).

```console
$ ls -a
.  ..  .hidden  document.txt  projects
```

### **-d, --directory**

List directories themselves, not their contents.

```console
$ ls -d */
projects/  documents/  downloads/
```

### **-s, --size**

Print the allocated size of each file in blocks.

```console
$ ls -s
total 16
8 document.txt  8 projects
```

### **-t**

Sort by modification time, newest first.

```console
$ ls -lt
total 16
-rw-r--r--  1 user  staff  1024 Apr 10 15:30 document.txt
drwxr-xr-x  3 user  staff   96  Apr 9  14:22 projects
```

### **-r, --reverse**

Reverse the order of the sort.

```console
$ ls -ltr
total 16
drwxr-xr-x  3 user  staff   96  Apr 9  14:22 projects
-rw-r--r--  1 user  staff  1024 Apr 10 15:30 document.txt
```

## Usage Examples

### Listing files with human-readable sizes

```console
$ ls -lh
total 16K
-rw-r--r--  1 user  staff  1.0K Apr 10 15:30 document.txt
drwxr-xr-x  3 user  staff   96B Apr 9  14:22 projects
```

### Listing only directories

```console
$ ls -ld */
drwxr-xr-x 3 user staff 96 Apr 9 14:22 projects/
drwxr-xr-x 5 user staff 160 Apr 8 10:15 documents/
```

### Listing files by file type

```console
$ ls -F
document.txt  projects/  script.sh*
```

### Recursive listing of directories

```console
$ ls -R
.:
document.txt  projects

./projects:
README.md  src

./projects/src:
main.c  utils.h
```

## Tips:

### Combine Options for Powerful Listings

Combine options like `ls -lha` to show all files (including hidden ones) with detailed information and human-readable sizes.

### Use Color Coding for Better Visibility

Many systems have `ls` aliased to `ls --color=auto`, which color-codes different file types. If not, you can add this to your shell configuration.

### Sort Files by Size

Use `ls -lS` to sort files by size (largest first), which helps identify space-consuming files.

### Customize the Output Format

Use `ls -l --time-style=long-iso` for a more standardized timestamp format (YYYY-MM-DD HH:MM).

## Frequently Asked Questions

#### Q1. How do I list only directories?
A. Use `ls -d */` to list only directories in the current location.

#### Q2. How can I see file sizes in KB, MB, etc.?
A. Use `ls -lh` for human-readable sizes.

#### Q3. How do I sort files by modification time?
A. Use `ls -lt` to sort by modification time, newest first.

#### Q4. How do I list files recursively?
A. Use `ls -R` to list all files and subdirectories recursively.

#### Q5. How can I see hidden files?
A. Use `ls -a` to show all files, including hidden ones.

## References

https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html

## Revisions

- 2025/05/05 First revision