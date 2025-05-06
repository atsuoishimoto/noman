# hd command

Display file contents in hexadecimal, decimal, octal, or ASCII format.

## Overview

The `hd` command (hexdump) displays the contents of files in various formats, primarily hexadecimal. It's useful for examining binary files, viewing non-printable characters, and analyzing file structures. The command reads from files or standard input and outputs formatted representations of the data.

## Options

### **-a, --ascii**

Display ASCII characters alongside the hex dump.

```console
$ echo "Hello" | hd -a
00000000  48 65 6c 6c 6f 0a                                 |Hello.|
00000006
```

### **-c, --canonical**

Use canonical hex+ASCII display format.

```console
$ echo "Hello" | hd -c
00000000  48 65 6c 6c 6f 0a                                 |Hello.|
00000006
```

### **-d, --decimal**

Display output in decimal format instead of hexadecimal.

```console
$ echo "Hello" | hd -d
0000000   072 101 108 108 111 012
0000006
```

### **-o, --octal**

Display output in octal format.

```console
$ echo "Hello" | hd -o
0000000 000110 000145 000154 000154 000157 000012
0000006
```

### **-n, --length=N**

Interpret only N bytes of input.

```console
$ echo "Hello World" | hd -n 5
00000000  48 65 6c 6c 6f                                    |Hello|
00000005
```

### **-s, --skip=N**

Skip N bytes from the beginning of input.

```console
$ echo "Hello World" | hd -s 6
00000006  57 6f 72 6c 64 0a                                 |World.|
0000000c
```

### **-v, --no-squeezing**

Display all input data (disable the default behavior of replacing duplicate lines with an asterisk).

```console
$ dd if=/dev/zero bs=16 count=3 | hd -v
00000000  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000010  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000020  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000030
```

## Usage Examples

### Examining a binary file

```console
$ hd /bin/ls | head -3
00000000  cf fa ed fe 07 00 00 01  03 00 00 80 02 00 00 00  |................|
00000010  10 00 00 00 18 07 00 00  85 00 20 00 00 00 00 00  |.......... .....|
00000020  19 00 00 00 48 00 00 00  5f 5f 50 41 47 45 5a 45  |....H...__PAGEZE|
```

### Viewing file headers

```console
$ hd -n 16 image.jpg
00000000  ff d8 ff e0 00 10 4a 46  49 46 00 01 01 01 00 48  |......JFIF.....H|
00000010
```

### Comparing binary files

```console
$ hd file1.bin > file1.hex
$ hd file2.bin > file2.hex
$ diff file1.hex file2.hex
```

## Tips

### Combine with Other Commands

Pipe output from other commands to `hd` for quick inspection of binary data:

```console
$ curl -s https://example.com | hd | head
```

### Examine Non-Printable Characters

Use `hd` to see hidden characters like carriage returns, line feeds, and null bytes that might cause issues in text files.

### Analyze File Formats

`hd` is useful for examining file headers to identify file types or debugging file format issues.

### Memory Efficiency

For very large files, use the `-s` and `-n` options to examine specific portions without loading the entire file.

## Frequently Asked Questions

#### Q1. What's the difference between `hd` and `hexdump`?
A. On many systems, `hd` is actually a symbolic link to `hexdump` or a simplified version of it. They serve the same basic purpose, but `hexdump` may offer more formatting options.

#### Q2. How can I view only the ASCII representation?
A. While `hd` always shows some hex representation, you can use `strings` command instead if you only want printable ASCII characters.

#### Q3. Can I use `hd` to modify files?
A. No, `hd` is only for viewing file contents. To modify binary files, you would need tools like `hexedit` or `dd`.

#### Q4. How do I interpret the output format?
A. The leftmost column shows the byte offset (position) in hexadecimal. The middle columns show the hex/decimal/octal values of each byte. The rightmost column (when using -a or -c) shows the ASCII representation, with dots for non-printable characters.

## References

https://man.openbsd.org/hd.1

## Revisions

- 2025/05/05 First revision