# od command

Display file contents in various formats, primarily octal, decimal, or hexadecimal.

## Overview

The `od` (octal dump) command displays the content of files in different formats. While originally designed to show data in octal format, modern versions support multiple output formats including hexadecimal, decimal, ASCII, and more. It's particularly useful for examining binary files, viewing non-printable characters, or analyzing file content byte by byte.

## Options

### **-t, --format=TYPE**

Specify the output format. Common TYPE values include:
- `a` - named characters
- `c` - ASCII characters or backslash escapes
- `d` - signed decimal
- `o` - octal (default)
- `x` - hexadecimal
- `f` - floating point

```console
$ echo "Hello" | od -t c
0000000   H   e   l   l   o  \n
0000006
```

### **-A, --address-radix=RADIX**

Specify the format for file offsets. RADIX can be:
- `d` - decimal
- `o` - octal (default)
- `x` - hexadecimal
- `n` - none (no addresses)

```console
$ echo "Hello" | od -A x
000000   48 65 6c 6c 6f 0a
000006
```

### **-j, --skip-bytes=BYTES**

Skip BYTES input bytes before formatting and writing.

```console
$ echo "Hello World" | od -c -j 6
0000006  W   o   r   l   d  \n
0000014
```

### **-N, --read-bytes=BYTES**

Format and write at most BYTES input bytes.

```console
$ echo "Hello World" | od -c -N 5
0000000   H   e   l   l   o
0000005
```

### **-w, --width=BYTES**

Output BYTES bytes per output line. Default is 16.

```console
$ echo "Hello World" | od -c -w4
0000000   H   e   l   l
0000004   o       W   o
0000010   r   l   d  \n
0000014
```

### **-v, --output-duplicates**

Do not use * to mark line suppression (by default, * indicates when multiple identical lines are collapsed).

```console
$ dd if=/dev/zero bs=1 count=32 | od -v
0000000 000000 000000 000000 000000 000000 000000 000000 000000
0000020 000000 000000 000000 000000 000000 000000 000000 000000
0000040
```

## Usage Examples

### Viewing a file in hexadecimal format

```console
$ od -t x1 sample.bin
0000000 48 65 6c 6c 6f 20 57 6f 72 6c 64 0a
0000014
```

### Viewing a file in multiple formats simultaneously

```console
$ echo "ABC123" | od -t x1z -t c
0000000 41 42 43 31 32 33 0a                              >ABC123.<
0000007
```

### Examining binary data with addresses in hexadecimal

```console
$ head -c 16 /dev/urandom | od -A x -t x1z
000000 ca f8 b1 35 94 55 29 45 9c 42 2a 8f 27 4a 0d 9e  >...5.U)E.B*..'J..<
000010
```

### Viewing file content as ASCII characters

```console
$ echo "Hello\tWorld\nTest" | od -c
0000000   H   e   l   l   o  \t   W   o   r   l   d  \n   T   e   s   t
0000020
```

## Tips

### Combine Format Types for Better Analysis

Use multiple `-t` options to display the same data in different formats simultaneously, making it easier to interpret binary data.

```console
$ echo "Hello" | od -t x1 -t c
0000000 48 65 6c 6c 6f 0a
         H   e   l   l   o  \n
0000006
```

### Use with Pipes for Quick Data Inspection

Pipe command output to `od` for quick inspection of binary data or to reveal hidden characters.

```console
$ cat /bin/ls | head -c 20 | od -t x1c
```

### Analyze File Headers

Use `od` with `-N` to examine just the header bytes of binary files, which often contain format information.

```console
$ od -t x1 -N 16 image.jpg
```

### Debugging Non-Printing Characters

When troubleshooting text files with unexpected behavior, use `od -c` to reveal non-printing characters like carriage returns or null bytes.

## Frequently Asked Questions

#### Q1. What does "od" stand for?
A. "od" stands for "octal dump," reflecting its original purpose of displaying file contents in octal format.

#### Q2. How can I view a file in hexadecimal format?
A. Use `od -t x1 filename` to view the file in hexadecimal format, with each byte shown separately.

#### Q3. How do I display only ASCII characters?
A. Use `od -t c filename` to display the file content as ASCII characters, with non-printable characters shown as escape sequences.

#### Q4. How can I skip the first few bytes of a file?
A. Use `od -j N filename` where N is the number of bytes to skip before starting the display.

#### Q5. How do I remove the address column from the output?
A. Use `od -A n filename` to suppress the address column in the output.

## References

https://www.gnu.org/software/coreutils/manual/html_node/od-invocation.html

## Revisions

- 2025/05/05 First revision