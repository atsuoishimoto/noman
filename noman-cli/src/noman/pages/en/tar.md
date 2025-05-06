# tar command

Manipulate tape archives by creating, extracting, listing, or updating files in archive format.

## Overview

The `tar` command creates, maintains, and extracts files from archive files known as tarballs. It's commonly used for packaging files together for distribution or backup, preserving file permissions, ownership, and directory structure. Originally designed for tape archives (hence the name), it's now primarily used for file archiving on disk.

## Options

### **-c, --create**

Create a new archive

```console
$ tar -c -f archive.tar file1.txt file2.txt
```

### **-x, --extract**

Extract files from an archive

```console
$ tar -x -f archive.tar
```

### **-t, --list**

List the contents of an archive

```console
$ tar -t -f archive.tar
file1.txt
file2.txt
```

### **-f, --file=ARCHIVE**

Use archive file or device ARCHIVE (required for most operations)

```console
$ tar -c -f backup.tar documents/
```

### **-v, --verbose**

Verbosely list files processed

```console
$ tar -cvf archive.tar file1.txt file2.txt
file1.txt
file2.txt
```

### **-z, --gzip**

Filter the archive through gzip (create/extract .tar.gz files)

```console
$ tar -czf archive.tar.gz directory/
```

### **-j, --bzip2**

Filter the archive through bzip2 (create/extract .tar.bz2 files)

```console
$ tar -cjf archive.tar.bz2 directory/
```

### **-C, --directory=DIR**

Change to directory DIR before performing any operations

```console
$ tar -xf archive.tar -C /tmp/extract/
```

### **--exclude=PATTERN**

Exclude files matching PATTERN

```console
$ tar -cf backup.tar --exclude="*.log" directory/
```

## Usage Examples

### Creating a compressed archive

```console
$ tar -czf project-backup.tar.gz project/
```

### Extracting a compressed archive

```console
$ tar -xzf project-backup.tar.gz
```

### Listing contents of a compressed archive

```console
$ tar -tzf project-backup.tar.gz
project/
project/file1.txt
project/file2.txt
project/subdirectory/
project/subdirectory/file3.txt
```

### Extracting specific files from an archive

```console
$ tar -xf archive.tar file1.txt
```

### Creating an archive with verbose output

```console
$ tar -cvf documents.tar Documents/
Documents/
Documents/report.pdf
Documents/presentation.pptx
Documents/notes.txt
```

## Tips:

### Combine Options for Brevity

You can combine options without the hyphen, like `tar czf` instead of `tar -c -z -f`. This is a common shorthand used by experienced users.

### Preserve Permissions and Ownership

By default, `tar` preserves file permissions and ownership. When extracting as root, be careful as this could create files with restricted permissions.

### Use Progress Indicators for Large Archives

For large archives, add `--checkpoint=1000 --checkpoint-action=dot` to show progress dots during operation.

### Verify Archive Integrity

Use `tar -tf archive.tar` to verify an archive's contents without extracting it. This helps ensure the archive isn't corrupted.

### Remember Compression Type When Extracting

You must specify the same compression option when extracting as was used when creating the archive (e.g., `-z` for gzip, `-j` for bzip2).

## Frequently Asked Questions

#### Q1. What's the difference between .tar, .tar.gz, and .tar.bz2?
A. `.tar` is an uncompressed archive, `.tar.gz` is compressed with gzip (faster, less compression), and `.tar.bz2` is compressed with bzip2 (slower, better compression).

#### Q2. How do I extract a single file from a tar archive?
A. Use `tar -xf archive.tar path/to/specific/file` to extract just that file.

#### Q3. How can I see what's in a tar file without extracting it?
A. Use `tar -tf archive.tar` to list all files without extraction.

#### Q4. How do I create a tar archive that excludes certain files?
A. Use the `--exclude` option: `tar -cf archive.tar directory/ --exclude="*.tmp"`.

#### Q5. How do I update files in an existing tar archive?
A. Use the `-u` or `--update` option: `tar -uf archive.tar newfile.txt`.

## References

https://www.gnu.org/software/tar/manual/tar.html

## Revisions

- 2025/05/05 First revision