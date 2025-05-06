# wc command

Count lines, words, and bytes in files.

## Overview

The `wc` (word count) command counts and displays the number of lines, words, bytes, or characters in specified files. It's commonly used in text processing to analyze file content or as part of pipelines to count output from other commands.

## Options

### **-l, --lines**

Count the number of lines in a file.

```console
$ wc -l file.txt
      42 file.txt
```

### **-w, --words**

Count the number of words in a file.

```console
$ wc -w file.txt
     320 file.txt
```

### **-c, --bytes**

Count the number of bytes in a file.

```console
$ wc -c file.txt
    1872 file.txt
```

### **-m, --chars**

Count the number of characters in a file (may differ from bytes in multibyte encodings).

```console
$ wc -m file.txt
    1850 file.txt
```

### **-L, --max-line-length**

Display the length of the longest line in a file.

```console
$ wc -L file.txt
      78 file.txt
```

## Usage Examples

### Basic Usage (Default Output)

```console
$ wc file.txt
      42     320    1872 file.txt
```

The output shows lines, words, and bytes (in that order).

### Multiple Files

```console
$ wc file1.txt file2.txt
      42     320    1872 file1.txt
      10      85     492 file2.txt
      52     405    2364 total
```

### Using wc in a Pipeline

```console
$ cat file.txt | grep "error" | wc -l
       5
```

This counts the number of lines containing "error" in file.txt.

## Tips:

### Counting Words in Multiple Files

Use wildcards to count words across multiple files: `wc -w *.txt` will show word counts for all text files in the current directory.

### Counting Files in a Directory

Combine with `ls` to count files: `ls -1 | wc -l` counts the number of entries in the current directory.

### Memory Usage

For very large files, `wc` is more memory-efficient than loading files into text editors to check size.

### Ignoring Line Count Headers

When using `wc -l` in scripts, use `awk` to extract just the number: `wc -l file.txt | awk '{print $1}'`

## Frequently Asked Questions

#### Q1. What does wc stand for?
A. `wc` stands for "word count."

#### Q2. How do I count only the characters in a file?
A. Use `wc -m` to count characters. For bytes, use `wc -c` (they're the same for ASCII files).

#### Q3. Why are the line counts different from what I see in my text editor?
A. `wc` counts newline characters, so the count may differ if the last line doesn't end with a newline or if your editor displays "virtual lines" for wrapped text.

#### Q4. How can I get just the number without the filename?
A. Either pipe the content: `cat file.txt | wc -l` or use awk: `wc -l file.txt | awk '{print $1}'`

## References

https://www.gnu.org/software/coreutils/manual/html_node/wc-invocation.html

## Revisions

- 2025/05/05 First revision