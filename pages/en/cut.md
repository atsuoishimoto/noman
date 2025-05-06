# cut command

Extract selected portions of each line from files.

## Overview

The `cut` command extracts sections from each line of input files or standard input. It can select parts of text by character position, byte position, or delimiter-separated fields. This command is particularly useful for processing structured text files like CSV or TSV files, or for extracting specific columns from command output.

## Options

### **-b, --bytes=LIST**

Extract specific bytes from each line according to LIST.

```console
$ echo "Hello" | cut -b 1-3
Hel
```

### **-c, --characters=LIST**

Extract specific characters from each line according to LIST.

```console
$ echo "Hello" | cut -c 2-4
ell
```

### **-d, --delimiter=DELIM**

Use DELIM as the field delimiter character instead of the default tab.

```console
$ echo "name,age,city" | cut -d, -f2
age
```

### **-f, --fields=LIST**

Select only the specified fields from each line.

```console
$ echo "name:age:city" | cut -d: -f1,3
name:city
```

### **-s, --only-delimited**

Do not print lines that do not contain the delimiter character.

```console
$ printf "field1,field2,field3\nno delimiter here\nA,B,C" | cut -d, -f1 -s
field1
A
```

### **--complement**

Complement the set of selected bytes, characters, or fields.

```console
$ echo "field1,field2,field3" | cut -d, -f1 --complement
field2,field3
```

### **--output-delimiter=STRING**

Use STRING as the output delimiter instead of the input delimiter.

```console
$ echo "field1,field2,field3" | cut -d, -f1,3 --output-delimiter=" | "
field1 | field3
```

## Usage Examples

### Extract specific columns from CSV file

```console
$ cat data.csv
Name,Age,City
John,25,New York
Alice,30,London
$ cut -d, -f1,3 data.csv
Name,City
John,New York
Alice,London
```

### Extract a range of characters from each line

```console
$ cat file.txt
This is a test file
Another line of text
$ cut -c 1-10 file.txt
This is a 
Another li
```

### Extract multiple ranges of characters

```console
$ echo "abcdefghijklmnopqrstuvwxyz" | cut -c 1-5,10-15
abcdeijklmn
```

### Using cut with other commands

```console
$ ps aux | cut -c 1-10,42-50
USER       PID
root       1
user       435
```

## Tips:

### Handling Missing Fields

When using `-f` with a delimiter, lines without the delimiter won't be processed by default. Use `-s` to skip these lines or omit it to process all lines.

### Working with Fixed-Width Files

For fixed-width files where columns are aligned by spaces, use `-c` (character positions) rather than `-f` (fields).

### Combining with Other Commands

`cut` works well in pipelines with commands like `grep`, `sort`, and `awk`. For example, `grep "pattern" file.txt | cut -d, -f2,3` extracts specific fields from matching lines.

### Handling Special Delimiters

When using special characters as delimiters (like space), escape them or use quotes: `cut -d' ' -f1` or `cut -d" " -f1`.

## Frequently Asked Questions

#### Q1. How do I extract multiple fields that aren't consecutive?
A. Use a comma to separate field numbers: `cut -d, -f1,3,5 file.csv`

#### Q2. Can cut handle multi-character delimiters?
A. No, `cut` only supports single-character delimiters. For multi-character delimiters, consider using `awk` instead.

#### Q3. How do I extract everything except certain fields?
A. Use the `--complement` option: `cut -d, -f2 --complement file.csv` extracts all fields except the second one.

#### Q4. Why doesn't cut work with my space-delimited file?
A. Space-delimited files often have variable numbers of spaces. Consider using `awk` for more flexible field separation.

## References

https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html

## Revisions

- 2025/05/05 First revision