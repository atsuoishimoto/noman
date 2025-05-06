# truncate command

Shrink or extend the size of a file to a specified size.

## Overview

The `truncate` command modifies the size of a file to a specified length. It can either shrink a file by removing data from the end or extend it by adding null bytes. This command is useful for creating files of specific sizes, clearing file contents while preserving the file, or testing disk space scenarios.

## Options

### **-s, --size=SIZE**

Set or adjust the file size to SIZE. SIZE can be an absolute number or a relative adjustment with a prefix of '+' or '-'.

```console
$ truncate -s 100 myfile.txt
$ ls -l myfile.txt
-rw-r--r-- 1 user group 100 May 5 10:00 myfile.txt
```

### **-c, --no-create**

Do not create files that do not exist.

```console
$ truncate -c -s 50 nonexistent.txt
truncate: cannot open 'nonexistent.txt' for writing: No such file or directory
```

### **-o, --io-blocks**

Treat SIZE as number of I/O blocks instead of bytes.

```console
$ truncate -o -s 2 blockfile.dat
```

### **-r, --reference=RFILE**

Base the size on the size of RFILE.

```console
$ truncate -r reference.txt target.txt
```

### **--help**

Display help information and exit.

```console
$ truncate --help
```

### **--version**

Output version information and exit.

```console
$ truncate --version
```

## Usage Examples

### Creating an empty file of specific size

```console
$ truncate -s 1M largefile.dat
$ ls -lh largefile.dat
-rw-r--r-- 1 user group 1.0M May 5 10:05 largefile.dat
```

### Shrinking a file to a smaller size

```console
$ echo "This is a test file with content" > testfile.txt
$ truncate -s 10 testfile.txt
$ cat testfile.txt
This is a 
```

### Extending a file's size

```console
$ echo "Small" > smallfile.txt
$ truncate -s 100 smallfile.txt
$ ls -l smallfile.txt
-rw-r--r-- 1 user group 100 May 5 10:10 smallfile.txt
```

### Using relative sizes

```console
$ truncate -s 100 myfile.txt
$ truncate -s +50 myfile.txt  # Add 50 bytes
$ truncate -s -30 myfile.txt  # Remove 30 bytes
$ ls -l myfile.txt
-rw-r--r-- 1 user group 120 May 5 10:15 myfile.txt
```

## Tips:

### Create Sparse Files

When extending a file, `truncate` creates sparse files (files that appear larger than the actual disk space they consume) by adding null bytes. This is useful for testing applications with large files without consuming actual disk space.

### Quickly Empty a File

Use `truncate -s 0 filename` to quickly empty a file without deleting it. This preserves file permissions and ownership while removing all content.

### Be Careful with Shrinking

When shrinking files, data beyond the new size is permanently lost. Always make backups of important files before truncating them.

## Frequently Asked Questions

#### Q1. What happens when I truncate a file to a smaller size?
A. Any data beyond the specified size is permanently deleted. The file will be cut off at exactly the byte position specified.

#### Q2. Does truncate work on all file types?
A. `truncate` works on regular files but may not work as expected on special files like devices or sockets. It's primarily designed for regular files.

#### Q3. How is truncate different from using `> file` redirection?
A. While `> file` empties a file completely, `truncate` can set a file to any specific size, including extending it or reducing it to a precise byte count.

#### Q4. Can truncate create files with specific content?
A. No, `truncate` only adjusts file size. When extending files, it adds null bytes (zeros). To create files with specific content, you need to use other commands like `echo` or `cat`.

## References

https://www.gnu.org/software/coreutils/manual/html_node/truncate-invocation.html

## Revisions

- 2025/05/05 First revision