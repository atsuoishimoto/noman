# xargs command

Execute commands using arguments from standard input.

## Overview

`xargs` reads items from standard input and executes a command with those items as arguments. It's particularly useful for building command lines from the output of other commands, handling large argument lists, and processing data in batches.

## Options

### **-0, --null**

Input items are terminated by a null character instead of whitespace, useful when input might contain spaces or newlines.

```console
$ find . -name "*.txt" -print0 | xargs -0 grep "pattern"
./file1.txt:pattern found here
./path with spaces/file2.txt:pattern also here
```

### **-I, --replace[=R]**

Replace occurrences of R (default is {}) in the initial arguments with names read from standard input.

```console
$ echo "file1.txt file2.txt" | xargs -I {} cp {} backup/
```

### **-n, --max-args=MAX-ARGS**

Use at most MAX-ARGS arguments per command line.

```console
$ echo "1 2 3 4" | xargs -n 2 echo
1 2
3 4
```

### **-P, --max-procs=MAX-PROCS**

Run up to MAX-PROCS processes simultaneously.

```console
$ find . -name "*.jpg" | xargs -P 4 -I {} convert {} {}.png
```

### **-d, --delimiter=DELIM**

Input items are terminated by DELIM character instead of whitespace.

```console
$ echo "file1.txt:file2.txt:file3.txt" | xargs -d ":" ls -l
-rw-r--r-- 1 user group 123 May 5 10:00 file1.txt
-rw-r--r-- 1 user group 456 May 5 10:01 file2.txt
-rw-r--r-- 1 user group 789 May 5 10:02 file3.txt
```

### **-p, --interactive**

Prompt the user before executing each command.

```console
$ echo "important_file.txt" | xargs -p rm
rm important_file.txt ?...
```

## Usage Examples

### Finding and removing files

```console
$ find . -name "*.tmp" | xargs rm
```

### Batch processing with multiple arguments

```console
$ cat file_list.txt | xargs -n 3 tar -czf archive.tar.gz
```

### Using with grep to search multiple files

```console
$ find . -name "*.py" | xargs grep "import requests"
./script1.py:import requests
./utils/http.py:import requests as req
```

### Handling filenames with spaces

```console
$ find . -name "*.jpg" -print0 | xargs -0 -I {} mv {} ./images/
```

## Tips:

### Prevent Command Execution with Empty Input

Use `xargs --no-run-if-empty` to avoid running the command if standard input is empty, which can prevent unexpected behavior.

### Preview Commands Before Execution

Use `xargs -t` to print each command before executing it, which helps verify what will be run without using interactive mode.

### Handle Filenames with Special Characters

Always use `-print0` with `find` and `-0` with `xargs` when dealing with filenames that might contain spaces, newlines, or other special characters.

### Limit Batch Size for Large Operations

When processing many files, use `-n` to limit the number of arguments per command execution to avoid "argument list too long" errors.

## Frequently Asked Questions

#### Q1. What's the difference between piping to a command and using xargs?
A. Piping (`|`) sends the output as standard input to the next command, while `xargs` converts the input into command-line arguments. Many commands like `rm` or `cp` expect arguments, not standard input.

#### Q2. How do I use xargs with commands that need the filename in the middle?
A. Use the `-I` option with a placeholder: `find . -name "*.txt" | xargs -I {} mv {} {}.bak`

#### Q3. How can I make xargs run faster for many files?
A. Use the `-P` option to run multiple processes in parallel: `xargs -P 4` runs up to 4 processes simultaneously.

#### Q4. Why does xargs sometimes split my input unexpectedly?
A. By default, xargs splits on whitespace. Use `-d` to specify a different delimiter or `-0` for null-terminated input.

## References

https://www.gnu.org/software/findutils/manual/html_node/find_html/xargs-options.html

## Revisions

- 2025/05/05 First revision