# egrep command

Search for patterns using extended regular expressions.

## Overview

`egrep` is a pattern-matching tool that searches for text patterns in files using extended regular expressions. It's functionally equivalent to `grep -E` and provides more powerful pattern matching capabilities than standard `grep`. The command prints lines that match the specified pattern.

## Options

### **-i, --ignore-case**

Ignore case distinctions in patterns and input data

```console
$ egrep -i "error" logfile.txt
Error: Connection refused
WARNING: error in line 42
System error detected
```

### **-v, --invert-match**

Select non-matching lines

```console
$ egrep -v "error" logfile.txt
Connection established successfully
System started at 10:00 AM
All processes running normally
```

### **-c, --count**

Print only a count of matching lines per file

```console
$ egrep -c "error" logfile.txt
3
```

### **-n, --line-number**

Prefix each line of output with the line number within its input file

```console
$ egrep -n "error" logfile.txt
5:error: file not found
12:system error occurred
27:error code: 404
```

### **-l, --files-with-matches**

Print only names of files containing matches

```console
$ egrep -l "error" *.log
app.log
system.log
error.log
```

### **-o, --only-matching**

Show only the part of a line matching the pattern

```console
$ egrep -o "error[0-9]+" logfile.txt
error404
error500
```

### **-r, --recursive**

Read all files under each directory, recursively

```console
$ egrep -r "password" /home/user/
/home/user/config.txt:password=123456
/home/user/notes/secret.txt:my password is qwerty
```

## Usage Examples

### Basic Pattern Matching

```console
$ egrep "apple|orange" fruits.txt
apple
orange
mixed apple juice
fresh orange
```

### Using Character Classes

```console
$ egrep "[0-9]+" numbers.txt
42
123
7890
```

### Using Quantifiers

```console
$ egrep "a{2,}" words.txt
aardvark
baaad
shaaa
```

### Combining Multiple Options

```console
$ egrep -in "error|warning" --color=auto logfile.txt
3:WARNING: disk space low
7:error: connection timeout
15:WARNING: memory usage high
22:error: invalid input
```

## Tips:

### Use Extended Regular Expressions

`egrep` supports powerful regex features like `+`, `?`, `|`, `()`, and `{}` without escaping, making complex pattern matching easier.

### Colorize Matches

Use `--color=auto` to highlight matching text in color, making it easier to spot matches in large outputs.

### Combine with Other Commands

Pipe the output of other commands to `egrep` to filter results:
```console
$ ps aux | egrep "(firefox|chrome)"
```

### Use Word Boundaries

To match whole words only, use word boundaries `\b`:
```console
$ egrep "\berror\b" logfile.txt
```

## Frequently Asked Questions

#### Q1. What's the difference between `grep` and `egrep`?
A. `egrep` is equivalent to `grep -E`, which uses extended regular expressions. Extended regex supports additional metacharacters like `+`, `?`, and `|` without requiring backslashes.

#### Q2. How do I search for multiple patterns?
A. Use the pipe symbol (`|`) to search for alternative patterns: `egrep "pattern1|pattern2" file.txt`

#### Q3. How can I search for a pattern in all files in a directory?
A. Use the recursive option: `egrep -r "pattern" directory/`

#### Q4. How do I exclude certain files from the search?
A. Use `--exclude` or `--exclude-dir` options: `egrep -r "pattern" --exclude="*.log" directory/`

## References

https://www.gnu.org/software/grep/manual/grep.html

## Revisions

- 2025/05/06 Added -o, --only-matching option
- 2025/05/05 First revision