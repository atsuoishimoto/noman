# grep command

Search for patterns in files.

## Overview

`grep` searches for text patterns in files or standard input. It's primarily used to find lines that match a specified pattern and display them. The command is essential for searching through logs, code, and text files, making it one of the most frequently used text-processing tools in Unix/Linux systems.

## Options

### **-i, --ignore-case**

Ignore case distinctions in patterns and input data

```console
$ grep -i "error" log.txt
ERROR: Connection failed
error: file not found
Warning: Some errors were detected
```

### **-v, --invert-match**

Select non-matching lines

```console
$ grep -v "error" log.txt
Connection established
Process completed successfully
System started
```

### **-r, --recursive**

Read all files under each directory, recursively

```console
$ grep -r "function" /path/to/project
/path/to/project/file1.js:function calculateTotal() {
/path/to/project/lib/utils.js:function formatDate(date) {
```

### **-l, --files-with-matches**

Print only names of files containing matches

```console
$ grep -l "error" *.log
app.log
system.log
```

### **-n, --line-number**

Prefix each line of output with the line number within its input file

```console
$ grep -n "import" script.py
3:import os
5:import sys
12:import datetime
```

### **-c, --count**

Print only a count of matching lines per file

```console
$ grep -c "error" *.log
app.log:15
system.log:7
debug.log:0
```

### **-o, --only-matching**

Print only the matched parts of matching lines

```console
$ grep -o "error" log.txt
error
error
error
```

### **-A NUM, --after-context=NUM**

Print NUM lines of trailing context after matching lines

```console
$ grep -A 2 "Exception" error.log
Exception in thread "main" java.lang.NullPointerException
    at com.example.Main.process(Main.java:24)
    at com.example.Main.main(Main.java:5)
```

### **-B NUM, --before-context=NUM**

Print NUM lines of leading context before matching lines

```console
$ grep -B 1 "fatal" system.log
May 4 15:30:22 server application[1234]: Critical error detected
May 4 15:30:23 server application[1234]: fatal: system halted
```

### **-E, --extended-regexp**

Interpret pattern as an extended regular expression

```console
$ grep -E "error|warning" log.txt
error: file not found
warning: disk space low
```

## Usage Examples

### Basic Pattern Search

```console
$ grep "function" script.js
function calculateTotal() {
function displayResults() {
```

### Combining Multiple Options

```console
$ grep -in "error" --color=auto log.txt
15:Error: Unable to connect to database
42:error: invalid configuration
78:ERROR: Service unavailable
```

### Using Regular Expressions

```console
$ grep "^[0-9]" data.txt
123 Main St
456 Oak Ave
789 Pine Rd
```

### Searching Multiple Files

```console
$ grep "TODO" *.py
main.py:# TODO: Implement error handling
utils.py:# TODO: Optimize this algorithm
config.py:# TODO: Add configuration validation
```

### Displaying Only Filenames with Matches

```console
$ grep -l "error" logs/*.log
logs/app.log
logs/system.log
```

## Tips:

### Use Color Highlighting

The `--color=auto` option highlights matching text in color, making it easier to spot matches in large outputs.

### Pipe with Other Commands

Combine grep with other commands using pipes for powerful filtering:
```console
$ ps aux | grep "nginx"
```

### Use Word Boundaries

The `-w` option matches whole words only, preventing partial matches:
```console
$ grep -w "log" file.txt  # Matches "log" but not "login" or "catalog"
```

### Quiet Mode for Scripts

Use `-q` for quiet mode when you only need to check if a pattern exists (returns exit status 0 if found):
```console
$ grep -q "error" log.txt && echo "Errors found!"
```

## Frequently Asked Questions

#### Q1. How do I search for a pattern in multiple files?
A. Simply list the files after the pattern: `grep "pattern" file1 file2 file3` or use wildcards: `grep "pattern" *.txt`.

#### Q2. How can I search for a pattern that contains spaces?
A. Enclose the pattern in quotes: `grep "hello world" file.txt`.

#### Q3. How do I search for lines that don't contain a pattern?
A. Use the `-v` option: `grep -v "pattern" file.txt`.

#### Q4. Can grep search for multiple patterns at once?
A. Yes, use the `-E` option with the pipe symbol: `grep -E "pattern1|pattern2" file.txt` or use `egrep "pattern1|pattern2" file.txt`.

#### Q5. How do I make grep show only the matching part of a line?
A. Use the `-o` option: `grep -o "pattern" file.txt`.

## References

https://www.gnu.org/software/grep/manual/grep.html

## Revisions

- 2025/05/06 Added -o option for displaying only matched parts of lines.
- 2025/05/05 First revision