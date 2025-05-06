# patch command

Apply a diff file to an original file or files.

## Overview

The `patch` command applies changes (patches) to files. It reads a patch file (typically created by the `diff` command) and modifies the target files to incorporate those changes. This is commonly used for applying bug fixes, updates, or modifications to source code and text files.

## Options

### **-p[num], --strip=[num]**

Strip the smallest prefix containing `num` leading slashes from each file name in the patch. Default is 1.

```console
$ patch -p1 < changes.patch
patching file src/main.c
```

### **-b, --backup**

Create a backup of each file before modifying it.

```console
$ patch -b file.txt < changes.patch
patching file file.txt
```

### **-R, --reverse**

Assume patches were created with old and new files swapped, effectively reversing the patch.

```console
$ patch -R < changes.patch
patching file file.txt
```

### **-i file, --input=file**

Read patch from specified file instead of stdin.

```console
$ patch -i changes.patch
patching file file.txt
```

### **-d dir, --directory=dir**

Change to the specified directory before applying the patch.

```console
$ patch -d src/ -i ../changes.patch
patching file main.c
```

### **-E, --remove-empty-files**

Remove output files that become empty after applying the patch.

```console
$ patch -E < changes.patch
patching file empty.txt
removed empty file empty.txt
```

### **-N, --forward**

Ignore patches that appear to be reversed or already applied.

```console
$ patch -N < changes.patch
patching file file.txt
```

### **-f, --force**

Force patching even when the patch appears to be incorrect.

```console
$ patch -f < changes.patch
patching file file.txt
Hunk #1 FAILED at 10.
1 out of 1 hunk FAILED -- saving rejects to file file.txt.rej
```

### **-t, --batch**

Skip user interaction; assume "yes" to all questions.

```console
$ patch -t < changes.patch
patching file file.txt
```

## Usage Examples

### Applying a patch file to a single file

```console
$ patch original.txt < changes.patch
patching file original.txt
```

### Applying a patch with backup files

```console
$ patch -b program.c < bugfix.patch
patching file program.c
```

### Applying a patch to a directory

```console
$ cd project/
$ patch -p1 < ../feature.patch
patching file src/main.c
patching file include/header.h
```

### Reversing a patch

```console
$ patch -R < changes.patch
patching file file.txt
```

## Tips:

### Examine a Patch Before Applying

Use `patch --dry-run` to see what would happen without actually changing any files. This helps prevent unexpected modifications.

### Handle Rejected Patches

When a patch fails to apply cleanly, `patch` creates `.rej` files containing the rejected hunks. Examine these files to manually apply the changes.

### Create Context-Aware Patches

When creating patches with `diff`, use the `-u` option (unified format) to include context lines. This helps `patch` apply changes more accurately, especially when the target files have been modified.

### Apply Patches to the Right Directory

Use the `-p` option to strip path prefixes when applying patches to a different directory structure than where they were created.

## Frequently Asked Questions

#### Q1. What's the difference between a unified and context diff?
A. Unified diffs (`diff -u`) show changed lines with context in a single block prefixed with `+` and `-`, while context diffs (`diff -c`) show before and after blocks separately. Unified diffs are more compact and commonly used.

#### Q2. How do I apply a patch that was created in a different directory?
A. Use the `-p` option to strip directory levels from filenames in the patch. For example, `patch -p1` removes the first directory component.

#### Q3. How can I reverse a patch I've applied?
A. Use `patch -R` with the same patch file to undo the changes.

#### Q4. What do I do if a patch fails to apply?
A. Examine the `.rej` files created by patch, which contain the hunks that couldn't be applied. You may need to manually apply these changes or update the patch file.

## References

https://www.gnu.org/software/diffutils/manual/html_node/Invoking-patch.html

## Revisions

- 2025/05/05 First revision