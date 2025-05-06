# diff command

Compare files line by line.

## Overview

The `diff` command compares two files or directories and displays the differences between them. It's commonly used to identify changes between file versions, create patches, or check what has been modified in a file.

## Options

### **-u, --unified**

Output differences in unified format, showing context around the changes.

```console
$ diff -u file1.txt file2.txt
--- file1.txt	2025-05-05 10:00:00.000000000 -0400
+++ file2.txt	2025-05-05 10:30:00.000000000 -0400
@@ -1,3 +1,4 @@
 This is a test file.
-It has some content.
+It has some modified content.
 The end of the file.
+A new line added.
```

### **-b, --ignore-space-change**

Ignore changes in the amount of white space.

```console
$ diff -b file1.txt file2.txt
2c2
< It has some content.
---
> It has some   modified content.
```

### **-i, --ignore-case**

Ignore case differences in file contents.

```console
$ diff -i uppercase.txt lowercase.txt
[No output if files differ only in case]
```

### **-r, --recursive**

Recursively compare any subdirectories found.

```console
$ diff -r dir1 dir2
diff -r dir1/file.txt dir2/file.txt
2c2
< This is in dir1
---
> This is in dir2
Only in dir2: newfile.txt
```

### **-N, --new-file**

Treat absent files as empty.

```console
$ diff -N file1.txt nonexistent.txt
1,3d0
< This is a test file.
< It has some content.
< The end of the file.
```

### **-c, --context**

Output differences in context format with 3 lines of context.

```console
$ diff -c file1.txt file2.txt
*** file1.txt	2025-05-05 10:00:00.000000000 -0400
--- file2.txt	2025-05-05 10:30:00.000000000 -0400
***************
*** 1,3 ****
  This is a test file.
- It has some content.
  The end of the file.
--- 1,4 ----
  This is a test file.
+ It has some modified content.
  The end of the file.
+ A new line added.
```

## Usage Examples

### Comparing two files

```console
$ diff original.txt modified.txt
2c2
< This is the original line.
---
> This is the modified line.
4d3
< This line will be deleted.
```

### Creating a patch file

```console
$ diff -u original.txt modified.txt > changes.patch
$ cat changes.patch
--- original.txt	2025-05-05 10:00:00.000000000 -0400
+++ modified.txt	2025-05-05 10:30:00.000000000 -0400
@@ -1,4 +1,3 @@
 First line is unchanged.
-This is the original line.
+This is the modified line.
 Third line is unchanged.
-This line will be deleted.
```

### Comparing directories

```console
$ diff -r dir1 dir2
Only in dir1: uniquefile1.txt
Only in dir2: uniquefile2.txt
diff -r dir1/common.txt dir2/common.txt
1c1
< This is in dir1
---
> This is in dir2
```

## Tips:

### Understanding diff output

The standard diff output format uses line numbers and commands:
- `a` (add): Lines added to the second file
- `d` (delete): Lines deleted from the first file
- `c` (change): Lines changed between files

### Use color for better readability

Many systems support colored diff output with `diff --color=auto` which makes changes easier to spot.

### Combine with grep for specific changes

Use `diff file1 file2 | grep pattern` to find only differences containing specific text.

### Side-by-side comparison

Use `diff -y` or `diff --side-by-side` to see differences in a two-column format, which can be easier to read for some changes.

## Frequently Asked Questions

#### Q1. What do the symbols in diff output mean?
A. In standard output, `<` indicates lines from the first file, `>` indicates lines from the second file, and `---` separates changed sections.

#### Q2. How do I create a patch file?
A. Use `diff -u original.txt modified.txt > changes.patch` to create a unified format patch file.

#### Q3. How can I ignore whitespace differences?
A. Use `diff -b` to ignore changes in whitespace, or `diff -w` to ignore all whitespace.

#### Q4. How do I apply a diff patch?
A. Use the `patch` command: `patch original.txt < changes.patch`

## References

https://www.gnu.org/software/diffutils/manual/html_node/diff-Options.html

## Revisions

- 2025/05/05 First revision