# uniq command

Filter adjacent matching lines from input, or report unique lines.

## Overview

The `uniq` command filters out repeated lines in a file or input stream. It works by comparing adjacent lines and removing or identifying duplicate lines. By default, `uniq` only detects duplicate lines if they are adjacent, so input is typically sorted first using the `sort` command.

## Options

### **-c, --count**

Prefix lines with the number of occurrences

```console
$ sort names.txt | uniq -c
      2 Alice
      1 Bob
      3 Charlie
```

### **-d, --repeated**

Only print duplicate lines, one for each group

```console
$ sort names.txt | uniq -d
Alice
Charlie
```

### **-u, --unique**

Only print unique lines (not duplicated in input)

```console
$ sort names.txt | uniq -u
Bob
```

### **-i, --ignore-case**

Ignore case when comparing lines

```console
$ sort names.txt | uniq -i
Alice
Bob
Charlie
```

### **-f N, --skip-fields=N**

Skip comparing the first N fields

```console
$ cat data.txt
1 Alice Engineering
1 Alice Marketing
2 Bob Sales
$ uniq -f 1 data.txt
1 Alice Engineering
2 Bob Sales
```

### **-s N, --skip-chars=N**

Skip comparing the first N characters

```console
$ cat codes.txt
ABC123
ABC456
DEF789
$ uniq -s 3 codes.txt
ABC123
DEF789
```

## Usage Examples

### Basic usage with sort

```console
$ cat names.txt
Alice
Bob
Alice
Charlie
Charlie
Charlie
Bob
$ sort names.txt | uniq
Alice
Bob
Charlie
```

### Count occurrences of each line

```console
$ sort names.txt | uniq -c
      2 Alice
      2 Bob
      3 Charlie
```

### Show only lines that appear exactly once

```console
$ sort names.txt | uniq -u
```

### Show only duplicate lines

```console
$ sort names.txt | uniq -d
Alice
Bob
Charlie
```

## Tips:

### Always Sort First

Since `uniq` only removes adjacent duplicate lines, always pipe the output of `sort` to `uniq` to ensure all duplicates are detected:

```console
$ sort file.txt | uniq
```

### Counting Word Frequency

To count word frequency in a file, use:

```console
$ cat file.txt | tr -s ' ' '\n' | sort | uniq -c | sort -nr
```

This splits text into words, sorts them, counts occurrences, and sorts by frequency.

### Case-Insensitive Matching

Use `-i` when you want to treat uppercase and lowercase versions of the same word as identical:

```console
$ sort words.txt | uniq -i
```

## Frequently Asked Questions

#### Q1. Why doesn't `uniq` remove all duplicate lines in my file?
A. `uniq` only removes adjacent duplicate lines. You need to sort the file first: `sort file.txt | uniq`

#### Q2. How can I count how many times each line appears?
A. Use `sort file.txt | uniq -c`

#### Q3. How do I find lines that appear only once?
A. Use `sort file.txt | uniq -u`

#### Q4. How do I find duplicated lines?
A. Use `sort file.txt | uniq -d`

## References

https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html

## Revisions

- 2025/05/05 First revision