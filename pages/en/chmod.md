# chmod command

Change file mode bits (permissions) for files and directories.

## Overview

The `chmod` command modifies file and directory permissions on Unix-like systems. It allows users to control who can read, write, or execute files by changing the access mode. Permissions can be specified using either symbolic notation (letters) or octal notation (numbers).

## Options

### **-R, --recursive**

Change permissions recursively, affecting all files and directories within the specified directory.

```console
$ chmod -R 755 projects/
```

### **-v, --verbose**

Display a diagnostic message for every file processed, showing the changes made.

```console
$ chmod -v 644 file.txt
mode of 'file.txt' changed from 0755 (rwxr-xr-x) to 0644 (rw-r--r--)
```

### **-c, --changes**

Like verbose, but only reports when a change is actually made.

```console
$ chmod -c 644 file.txt
mode of 'file.txt' changed from 0755 (rwxr-xr-x) to 0644 (rw-r--r--)
```

### **-f, --silent, --quiet**

Suppress most error messages.

```console
$ chmod -f 644 nonexistent.txt
```

## Usage Examples

### Using Octal Notation

```console
$ chmod 755 script.sh
$ ls -l script.sh
-rwxr-xr-x 1 user group 1024 May 5 10:00 script.sh
```

### Using Symbolic Notation

```console
$ chmod u+x script.sh
$ ls -l script.sh
-rwxr--r-- 1 user group 1024 May 5 10:00 script.sh
```

### Adding Multiple Permissions

```console
$ chmod u+rwx,g+rx,o+r file.txt
$ ls -l file.txt
-rwxr-xr-- 1 user group 1024 May 5 10:00 file.txt
```

### Removing Permissions

```console
$ chmod go-w file.txt
$ ls -l file.txt
-rw-r--r-- 1 user group 1024 May 5 10:00 file.txt
```

## Tips:

### Understanding Octal Notation

The three digits in octal notation represent permissions for owner, group, and others:
- 4 = read (r)
- 2 = write (w)
- 1 = execute (x)

Common combinations:
- 755 (rwxr-xr-x): Owner can read/write/execute, others can read/execute
- 644 (rw-r--r--): Owner can read/write, others can only read
- 700 (rwx------): Owner can read/write/execute, no permissions for others

### Using Symbolic Notation Effectively

- `u` (user/owner), `g` (group), `o` (others), `a` (all)
- `+` (add permission), `-` (remove permission), `=` (set exact permission)
- `r` (read), `w` (write), `x` (execute)

### Setting Default Permissions

Use `umask` to control default permissions for newly created files and directories.

## Frequently Asked Questions

#### Q1. What's the difference between octal and symbolic notation?
A. Octal notation (like 755) uses numbers to set exact permissions, while symbolic notation (like u+x) allows adding or removing specific permissions without changing others.

#### Q2. How do I make a file executable?
A. Use `chmod +x filename` or `chmod u+x filename` to make it executable for the owner.

#### Q3. What permissions should I use for sensitive files?
A. For sensitive files, use restrictive permissions like 600 (rw-------) so only the owner can read and write.

#### Q4. How do I change permissions for all files in a directory?
A. Use the recursive option: `chmod -R permissions directory/`

## References

https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html

## Revisions

- 2025/05/05 First revision