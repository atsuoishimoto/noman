# basename command

Extract the filename or directory name from a pathname.

## Overview

`basename` strips directory components and suffixes from a given path, returning just the filename or the final directory name. It's commonly used in shell scripts to extract filenames from full paths or to remove file extensions.

## Options

### **basename NAME [SUFFIX]**

Removes directory components from NAME and an optional SUFFIX.

```console
$ basename /usr/bin/sort
sort
```

### **basename OPTION... NAME...**

Process multiple names according to the specified options.

### **-a, --multiple**

Support multiple arguments and treat each as a NAME.

```console
$ basename -a /usr/bin/sort /usr/bin/cut
sort
cut
```

### **-s, --suffix=SUFFIX**

Remove a trailing SUFFIX from each NAME.

```console
$ basename -s .txt file.txt
file
```

### **-z, --zero**

End each output line with NUL, not newline.

```console
$ basename -z /usr/bin/sort | hexdump -C
00000000  73 6f 72 74 00                                    |sort.|
00000005
```

## Usage Examples

### Removing directory components

```console
$ basename /home/user/documents/report.pdf
report.pdf
```

### Removing file extension

```console
$ basename /home/user/documents/report.pdf .pdf
report
```

### Processing multiple files with the same suffix

```console
$ basename -a -s .txt file1.txt file2.txt file3.txt
file1
file2
file3
```

### Using in shell scripts

```console
$ filename=$(basename "$fullpath")
$ echo "The filename is: $filename"
The filename is: document.pdf
```

## Tips:

### Use with `dirname` for Path Manipulation

`basename` pairs well with `dirname` when you need to separate a path into its components:
```console
$ path="/home/user/documents/report.pdf"
$ dirname "$path"
/home/user/documents
$ basename "$path"
report.pdf
```

### Handling Paths with Spaces

Always quote your arguments when paths might contain spaces:
```console
$ basename "/path/with spaces/file.txt"
file.txt
```

### Stripping Multiple Extensions

To remove multiple extensions (like `.tar.gz`), you'll need to use multiple commands or other tools like `sed`:
```console
$ basename "archive.tar.gz" .gz | basename -s .tar
archive
```

## Frequently Asked Questions

#### Q1. What's the difference between `basename` and just using parameter expansion in bash?
A. While `${filename##*/}` in bash performs a similar function, `basename` works across different shells and provides additional options like suffix removal.

#### Q2. Can `basename` handle multiple files at once?
A. Yes, with the `-a` or `--multiple` option, it can process multiple filenames in a single command.

#### Q3. How do I remove multiple extensions like `.tar.gz`?
A. `basename` can only remove one suffix at a time. For multiple extensions, you'll need to run `basename` multiple times or use other text processing tools.

#### Q4. Does `basename` modify the original file?
A. No, `basename` only outputs the modified name to standard output. It doesn't change any files on disk.

## References

https://www.gnu.org/software/coreutils/manual/html_node/basename-invocation.html

## Revisions

- 2025/05/05 First revision