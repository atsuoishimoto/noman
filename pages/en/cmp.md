# cmp command

Compare two files byte by byte.

## Overview

The `cmp` command compares two files of any type and reports the location of the first difference. Unlike `diff`, which shows all differences between text files, `cmp` simply identifies the first byte or line where files differ, making it useful for quick binary file comparisons.

## Options

### **-b, --print-bytes**

Print differing bytes as octal values.

```console
$ cmp -b file1.txt file2.txt
file1.txt file2.txt differ: byte 5, line 1 is 141 a 142 b
```

### **-i, --ignore-initial=SKIP**

Skip the first SKIP bytes of both input files before comparing.

```console
$ cmp -i 10 file1.bin file2.bin
file1.bin file2.bin differ: byte 11, line 1
```

### **-l, --verbose**

Print the byte number and the differing byte values for each difference.

```console
$ cmp -l file1.txt file2.txt
5 141 142
8 144 145
12 150 151
```

### **-n, --bytes=LIMIT**

Compare at most LIMIT bytes.

```console
$ cmp -n 100 largefile1.bin largefile2.bin
largefile1.bin largefile2.bin differ: byte 64, line 1
```

### **-s, --quiet, --silent**

Suppress all normal output; only return exit status.

```console
$ cmp -s file1.txt file2.txt
$ echo $?
1
```

## Usage Examples

### Basic comparison

```console
$ cmp file1.txt file2.txt
file1.txt file2.txt differ: byte 5, line 1
```

### Comparing specific portions of files

```console
$ cmp -i 100 -n 1000 bigfile1.dat bigfile2.dat
bigfile1.dat bigfile2.dat differ: byte 340, line 3
```

### Silent comparison in scripts

```console
$ if cmp -s file1.txt file2.txt; then
>   echo "Files are identical"
> else
>   echo "Files are different"
> fi
Files are different
```

## Tips:

### Use Exit Status in Scripts

The `cmp` command returns 0 if files are identical, 1 if they differ, and 2 if an error occurs. This makes it perfect for conditional logic in shell scripts.

### Combine with Other Commands

Pipe the output of commands to `cmp` using process substitution to compare command outputs:
```bash
cmp <(command1) <(command2)
```

### Binary File Comparison

While `diff` is better for text files, `cmp` excels at comparing binary files where you only need to know if and where they differ.

## Frequently Asked Questions

#### Q1. What's the difference between `cmp` and `diff`?
A. `cmp` reports only the first difference between files and works well with binary files. `diff` shows all differences and is designed primarily for text files.

#### Q2. How can I check if two files are identical without seeing any output?
A. Use `cmp -s file1 file2` and check the exit status with `echo $?`. A return value of 0 means the files are identical.

#### Q3. Can `cmp` compare directories?
A. No, `cmp` only compares files. For directory comparison, use `diff -r` instead.

#### Q4. How do I compare large files efficiently?
A. Use `cmp` with the `-s` option for a quick check if files differ, or use `-i` and `-n` to compare specific portions of large files.

## References

https://www.gnu.org/software/diffutils/manual/html_node/Invoking-cmp.html

## Revisions

- 2025/05/05 First revision