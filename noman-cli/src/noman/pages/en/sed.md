# sed command

Stream editor for filtering and transforming text.

## Overview

`sed` (stream editor) is a powerful utility that parses and transforms text, line by line. It reads input from files or standard input, applies specified editing commands, and outputs the result to standard output. It's commonly used for search and replace operations, text extraction, and other text transformations without modifying the original file.

## Options

### **-e script, --expression=script**

Add commands in the script to the set of commands to be executed.

```console
$ echo "hello world" | sed -e 's/hello/hi/' -e 's/world/there/'
hi there
```

### **-f script-file, --file=script-file**

Add commands from script-file to the set of commands to be executed.

```console
$ cat script.sed
s/hello/hi/
s/world/there/
$ echo "hello world" | sed -f script.sed
hi there
```

### **-i[SUFFIX], --in-place[=SUFFIX]**

Edit files in place (makes backup if SUFFIX supplied).

```console
$ echo "hello world" > file.txt
$ sed -i 's/hello/hi/' file.txt
$ cat file.txt
hi world
```

### **-n, --quiet, --silent**

Suppress automatic printing of pattern space.

```console
$ echo -e "line 1\nline 2\nline 3" | sed -n '2p'
line 2
```

### **-r, --regexp-extended**

Use extended regular expressions in the script.

```console
$ echo "hello 123 world" | sed -r 's/[0-9]+/NUMBER/'
hello NUMBER world
```

## Usage Examples

### Basic Substitution

```console
$ echo "The quick brown fox" | sed 's/brown/red/'
The quick red fox
```

### Global Substitution

```console
$ echo "one two one three one" | sed 's/one/1/g'
1 two 1 three 1
```

### Delete Lines

```console
$ echo -e "line 1\nline 2\nline 3" | sed '2d'
line 1
line 3
```

### Print Specific Lines

```console
$ echo -e "line 1\nline 2\nline 3" | sed -n '2,3p'
line 2
line 3
```

### Multiple Editing Commands

```console
$ echo "hello world" | sed 's/hello/hi/; s/world/there/'
hi there
```

## Tips:

### Use Delimiter Other Than '/'

When working with paths or URLs that contain slashes, use a different delimiter:

```console
$ echo "/usr/local/bin" | sed 's:/usr:~:g'
~/local/bin
```

### Create Backup Before In-place Editing

Always create backups when using `-i` for in-place editing:

```console
$ sed -i.bak 's/old/new/g' file.txt
```

### Address Ranges

Use address ranges to apply commands to specific lines:
- `1,5s/old/new/` - substitute on lines 1-5
- `/start/,/end/s/old/new/` - substitute between patterns

### Multiline Editing

For complex edits across multiple lines, consider using the `-z` option to work with null-terminated lines.

## Frequently Asked Questions

#### Q1. How do I replace all occurrences of a pattern in a file?
A. Use the global flag: `sed 's/pattern/replacement/g' file.txt`

#### Q2. How do I edit a file in-place?
A. Use the `-i` option: `sed -i 's/pattern/replacement/g' file.txt`

#### Q3. How do I delete specific lines from a file?
A. Use the delete command: `sed '5d' file.txt` (deletes line 5) or `sed '/pattern/d' file.txt` (deletes lines matching pattern)

#### Q4. How do I extract specific lines from a file?
A. Use `-n` with the print command: `sed -n '10,20p' file.txt` (prints lines 10-20)

#### Q5. How do I use multiple sed commands?
A. Either use `-e` for each command: `sed -e 'cmd1' -e 'cmd2'` or separate commands with semicolons: `sed 'cmd1; cmd2'`

## References

https://www.gnu.org/software/sed/manual/sed.html

## Revisions

- 2025/05/05 First revision