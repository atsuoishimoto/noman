# cp command

Copy files and directories from source to destination.

## Overview

The `cp` command copies files and directories. It can copy a single file to another file, multiple files to a directory, or entire directory structures. By default, `cp` will not overwrite existing files unless forced with options, and it preserves the original file's timestamps and permissions.

## Options

### **-r, -R, --recursive**

Copy directories recursively, including all subdirectories and their contents.

```console
$ cp -r Documents/ Backup/
```

### **-i, --interactive**

Prompt before overwriting existing files.

```console
$ cp -i file.txt destination/
cp: overwrite 'destination/file.txt'? y
```

### **-f, --force**

Force the copy by removing the destination file if needed, without prompting.

```console
$ cp -f important.txt destination/
```

### **-p, --preserve**

Preserve file attributes like mode, ownership, and timestamps.

```console
$ cp -p config.ini backup/
```

### **-v, --verbose**

Display the name of each file being copied.

```console
$ cp -v *.txt Documents/
'file1.txt' -> 'Documents/file1.txt'
'file2.txt' -> 'Documents/file2.txt'
```

### **-u, --update**

Copy only when the source file is newer than the destination file or when the destination file is missing.

```console
$ cp -u *.log archive/
```

### **-a, --archive**

Preserve all file attributes and copy directories recursively (equivalent to -dR --preserve=all).

```console
$ cp -a source_dir/ destination_dir/
```

## Usage Examples

### Copying a Single File

```console
$ cp report.pdf ~/Documents/
```

### Copying Multiple Files to a Directory

```console
$ cp file1.txt file2.txt file3.txt ~/Backup/
```

### Copying a Directory with All Contents

```console
$ cp -r Projects/ ~/Backup/Projects/
```

### Copying with Verbose Output and Preservation

```console
$ cp -vp important.conf /etc/
'important.conf' -> '/etc/important.conf'
```

## Tips:

### Use Wildcards for Multiple Files

Use wildcards to copy multiple files matching a pattern:
```console
$ cp *.jpg ~/Pictures/
```

### Backup Before Overwriting

Create backups of existing files by using the `-b` option:
```console
$ cp -b config.ini /etc/
```
This creates a backup file named `config.ini~` before overwriting.

### Copy Only If Newer

Use `-u` to update files only if the source is newer than the destination:
```console
$ cp -u -r source_dir/ destination_dir/
```
This is useful for synchronizing directories.

### Preserve Symbolic Links

Use `-d` or `--no-dereference` to preserve symbolic links as links rather than copying the files they point to:
```console
$ cp -d link.txt destination/
```

## Frequently Asked Questions

#### Q1. How do I copy a file without overwriting an existing file?
A. Use `cp -n source destination` where the `-n` option prevents overwriting existing files.

#### Q2. How do I copy hidden files?
A. Hidden files (starting with `.`) are copied normally. To copy all files including hidden ones, use wildcards like `cp -r source/. destination/`.

#### Q3. How do I copy a file and maintain its permissions?
A. Use `cp -p source destination` to preserve mode, ownership, and timestamps.

#### Q4. How do I copy a directory with all its contents?
A. Use `cp -r source_directory destination_directory` to recursively copy the directory and all its contents.

#### Q5. How do I copy only specific file types from a directory?
A. Use wildcards: `cp source_directory/*.txt destination_directory/` to copy only text files.

## References

https://www.gnu.org/software/coreutils/manual/html_node/cp-invocation.html

## Revisions

- 2025/05/05 First revision