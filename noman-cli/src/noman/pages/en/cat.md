# cat command

Concatenate and display file contents to standard output.

## Overview

The `cat` command reads files and outputs their contents. It's primarily used to display file contents, combine multiple files, or create new files. The name "cat" comes from "concatenate," reflecting its ability to join files together.

## Options

### **-n, --number**

Number all output lines, starting with 1.

```console
$ cat -n file.txt
     1  This is the first line
     2  This is the second line
     3  This is the third line
```

### **-b, --number-nonblank**

Number only non-empty output lines, starting with 1.

```console
$ cat -b file.txt
     1  This is the first line
     
     2  This is the third line
```

### **-s, --squeeze-blank**

Suppress repeated empty output lines, showing only one blank line instead of multiple consecutive ones.

```console
$ cat -s file_with_blanks.txt
This is text.

This has only one blank line between paragraphs instead of multiple.
```

### **-A, --show-all**

Show all control characters and non-printing characters.

```console
$ cat -A file.txt
This is a line with a tab^I and a newline$
```

### **-E, --show-ends**

Display $ at the end of each line.

```console
$ cat -E file.txt
This is line one.$
This is line two.$
```

### **-T, --show-tabs**

Display TAB characters as ^I.

```console
$ cat -T file.txt
This is a^Itabbed line
```

## Usage Examples

### Displaying file contents

```console
$ cat document.txt
This is the content of document.txt
It has multiple lines
that will be displayed.
```

### Concatenating multiple files

```console
$ cat file1.txt file2.txt
Contents of file1.txt
Contents of file2.txt
```

### Creating a new file with content

```console
$ cat > newfile.txt
Type your content here
Press Ctrl+D when finished
$ cat newfile.txt
Type your content here
Press Ctrl+D when finished
```

### Appending to an existing file

```console
$ cat >> existing.txt
This text will be added to the end of the file
Press Ctrl+D when finished
```

## Tips:

### Use cat with caution on large files

For very large files, use tools like `less` or `more` instead of `cat` to avoid overwhelming your terminal with output.

### Combine cat with grep for searching

Pipe `cat` output to `grep` to search for specific patterns: `cat file.txt | grep "search term"`.

### Create files quickly with heredocs

Use heredocs for creating files with multiple lines:
```console
$ cat > script.sh << 'EOF'
#!/bin/bash
echo "Hello World"
EOF
```

### View non-printable characters

When troubleshooting files with strange formatting, use `cat -A` to see all control characters.

## Frequently Asked Questions

#### Q1. What does "cat" stand for?
A. "Cat" stands for "concatenate," which means to link things together in a series.

#### Q2. How do I view a file without modifying it?
A. Simply use `cat filename` without any redirection operators.

#### Q3. How can I create a file with cat?
A. Use `cat > filename`, type your content, and press Ctrl+D when finished.

#### Q4. How do I append to a file without overwriting it?
A. Use `cat >> filename` to add content to the end of an existing file.

#### Q5. Why does cat sometimes display strange characters?
A. When viewing binary files or files with non-text content, `cat` will display unprintable characters. Use `cat -A` to see control characters or use specialized tools for binary files.

## References

https://www.gnu.org/software/coreutils/manual/html_node/cat-invocation.html

## Revisions

- 2025/05/05 First revision