# awk command

Pattern scanning and text processing language for manipulating structured data.

## Overview

`awk` is a powerful text processing tool that treats each line of input as a record and each word as a field. It excels at extracting and manipulating data from structured text files like CSV, logs, and tables. The command follows the pattern: `awk 'pattern {action}' file`.

## Options

### **-F, --field-separator**

Specify the field separator character (default is whitespace)

```console
$ echo "apple,orange,banana" | awk -F, '{print $2}'
orange
```

### **-f, --file**

Read the AWK program from a file instead of the command line

```console
$ cat script.awk
{print $1}
$ awk -f script.awk data.txt
First
Second
Third
```

### **-v, --assign**

Assign a value to a variable before program execution

```console
$ awk -v name="John" '{print "Hello, " name}' /dev/null
Hello, John
```

### **-W, --compat, --posix**

Run in POSIX compatibility mode

```console
$ awk -W posix '{print $1}' data.txt
First
Second
Third
```

## Usage Examples

### Basic Field Printing

```console
$ echo "Hello World" | awk '{print $1}'
Hello
```

### Processing CSV Data

```console
$ cat data.csv
John,25,Engineer
Mary,30,Doctor
$ awk -F, '{print "Name: " $1 ", Job: " $3}' data.csv
Name: John, Job: Engineer
Name: Mary, Job: Doctor
```

### Filtering Lines with Pattern Matching

```console
$ cat /etc/passwd | awk -F: '/root/ {print $1 " has home directory " $6}'
root has home directory /root
```

### Calculating Sums

```console
$ cat numbers.txt
10 20
30 40
$ awk '{sum += $1} END {print "Sum:", sum}' numbers.txt
Sum: 40
```

## Tips:

### Built-in Variables

AWK has useful built-in variables like `NR` (current record number), `NF` (number of fields in current record), and `FS` (field separator).

```console
$ echo -e "a b c\nd e f" | awk '{print "Line", NR, "has", NF, "fields"}'
Line 1 has 3 fields
Line 2 has 3 fields
```

### Conditional Processing

Use if-else statements for conditional processing:

```console
$ cat ages.txt
John 25
Mary 17
Bob 32
$ awk '{if ($2 >= 18) print $1, "is an adult"; else print $1, "is a minor"}' ages.txt
John is an adult
Mary is a minor
Bob is an adult
```

### Multiple Commands

Separate multiple commands with semicolons:

```console
$ echo "Hello World" | awk '{count=split($0,arr," "); print "Words:", count; print "First word:", arr[1]}'
Words: 2
First word: Hello
```

## Frequently Asked Questions

#### Q1. What's the difference between awk, sed, and grep?
A. While grep searches for patterns, and sed performs text transformations, awk is designed for structured data processing with more programming capabilities including variables, functions, and arithmetic operations.

#### Q2. How do I process multiple files with awk?
A. Simply list the files after the awk command: `awk '{print $1}' file1.txt file2.txt`

#### Q3. Can awk handle multi-line processing?
A. Yes, using the `RS` (record separator) variable: `awk 'BEGIN{RS="";FS="\n"}{print $1}' file.txt` processes paragraph-separated text.

#### Q4. How do I use regular expressions in awk?
A. Regular expressions are placed between slashes: `awk '/pattern/ {print}' file.txt`

## References

https://www.gnu.org/software/gawk/manual/gawk.html

## Revisions

- 2025/05/05 First revision