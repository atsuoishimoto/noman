# diff3 command

Compare three files line by line.

## Overview

`diff3` compares three files and identifies the differences between them. It's particularly useful for merging changes from two different versions of a file that both originated from a common ancestor, making it valuable for version control and collaborative editing.

## Options

### **-A, --show-all**

Output all changes, including conflicts, with special markers.

```console
$ diff3 -A file1 file2 file3
<<<<<<< file1
Line from file1
||||||| file2
Line from file2
======= 
Line from file3
>>>>>>> file3
```

### **-e, --ed**

Create an ed script that incorporates changes from the first to the third file into the second file.

```console
$ diff3 -e file1 file2 file3
w
q
```

### **-m, --merge**

Output a merged file with conflicts marked.

```console
$ diff3 -m file1 file2 file3
<<<<<<< file1
Line from file1
||||||| file2
Line from file2
=======
Line from file3
>>>>>>> file3
```

### **-T, --initial-tab**

Make tabs line up by prefixing a tab to output lines.

```console
$ diff3 -T file1 file2 file3
	<<<<<<< file1
	Line from file1
	||||||| file2
	Line from file2
	=======
	Line from file3
	>>>>>>> file3
```

### **-x, --overlap-only**

Show only overlapping changes.

```console
$ diff3 -x file1 file2 file3
==== 1:1c 2:1c 3:1c
Line from file1
Line from file2
Line from file3
```

## Usage Examples

### Basic Comparison

```console
$ diff3 original.txt yours.txt theirs.txt
====
1:1c
This is the original line.
2:1c
This is your modified line.
3:1c
This is their modified line.
```

### Creating a Merged File

```console
$ diff3 -m original.txt yours.txt theirs.txt > merged.txt
$ cat merged.txt
<<<<<<< yours.txt
This is your modified line.
||||||| original.txt
This is the original line.
=======
This is their modified line.
>>>>>>> theirs.txt
```

### Creating an Ed Script for Merging

```console
$ diff3 -e original.txt yours.txt theirs.txt > merge.ed
$ ed - yours.txt < merge.ed > merged.txt
```

## Tips:

### Understanding the Output Format

In the default output, each change is marked with `====` followed by line numbers and change types. For example, `1:1c 2:1c 3:1c` means line 1 in all three files is changed.

### Using diff3 for Version Control

When merging changes from different branches, use the original file as the first argument, your modified version as the second, and their modified version as the third.

### Resolving Merge Conflicts

When using `-m` option, look for conflict markers (`<<<<<<<`, `|||||||`, `=======`, `>>>>>>>`) in the output file and manually edit them to resolve conflicts.

## Frequently Asked Questions

#### Q1. What's the difference between diff and diff3?
A. `diff` compares two files, while `diff3` compares three files, making it useful for merging changes from two different versions that originated from a common ancestor.

#### Q2. How do I interpret the output of diff3?
A. The output shows sections where the files differ, with line numbers and content from each file. The format varies based on the options used.

#### Q3. Can diff3 automatically resolve conflicts?
A. No, diff3 can identify conflicts but cannot automatically resolve them. It marks conflicts in the output, which must be manually resolved.

#### Q4. How do I save the merged output to a file?
A. Use redirection: `diff3 -m file1 file2 file3 > merged_file`

## References

https://www.gnu.org/software/diffutils/manual/html_node/Invoking-diff3.html

## Revisions

- 2025/05/05 First revision