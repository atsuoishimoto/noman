# zip command

Create or update ZIP archives by compressing files and directories.

## Overview

The `zip` command creates compressed archives in the ZIP format, which is widely used for file compression and packaging. It can add files to existing archives, update files in archives, and create self-extracting archives. ZIP files maintain file attributes and directory structures, making them useful for cross-platform file sharing.

## Options

### **-r**

Recursively include files in directories and their subdirectories

```console
$ zip -r archive.zip documents/
  adding: documents/ (stored 0%)
  adding: documents/report.txt (deflated 35%)
  adding: documents/images/ (stored 0%)
  adding: documents/images/photo.jpg (deflated 2%)
```

### **-u**

Update existing entries in the zip archive if they are newer than the version in the archive

```console
$ zip -u archive.zip documents/report.txt
updating: documents/report.txt (deflated 35%)
```

### **-d**

Delete entries from a zip archive

```console
$ zip -d archive.zip documents/report.txt
deleting: documents/report.txt
```

### **-e**

Encrypt the contents of the zip file with a password

```console
$ zip -e secure.zip confidential.txt
Enter password: 
Verify password: 
  adding: confidential.txt (deflated 42%)
```

### **-j**

Store just the file names (junk the paths)

```console
$ zip -j archive.zip documents/report.txt documents/images/photo.jpg
  adding: report.txt (deflated 35%)
  adding: photo.jpg (deflated 2%)
```

### **-m**

Move the specified files into the zip archive (delete the original files)

```console
$ zip -m archive.zip temp.txt
  adding: temp.txt (deflated 30%)
```

### **-9**

Use maximum compression (slowest)

```console
$ zip -9 archive.zip largefile.dat
  adding: largefile.dat (deflated 65%)
```

### **-0**

Store files without compression

```console
$ zip -0 archive.zip already-compressed.jpg
  adding: already-compressed.jpg (stored 0%)
```

### **-v**

Display verbose information about the zip operation

```console
$ zip -v archive.zip document.txt
  adding: document.txt (deflated 35%)
zip diagnostic: adding document.txt
Total bytes read: 1024 (1.0k)
Total bytes written: 665 (665b)
Compression ratio: 35.1%
```

## Usage Examples

### Creating a basic zip archive

```console
$ zip backup.zip file1.txt file2.txt
  adding: file1.txt (deflated 42%)
  adding: file2.txt (deflated 38%)
```

### Zipping an entire directory with subdirectories

```console
$ zip -r project.zip project/
  adding: project/ (stored 0%)
  adding: project/src/ (stored 0%)
  adding: project/src/main.c (deflated 45%)
  adding: project/docs/ (stored 0%)
  adding: project/docs/readme.md (deflated 40%)
```

### Creating a password-protected zip file

```console
$ zip -e -r confidential.zip sensitive_data/
Enter password: 
Verify password: 
  adding: sensitive_data/ (stored 0%)
  adding: sensitive_data/accounts.xlsx (deflated 52%)
  adding: sensitive_data/passwords.txt (deflated 35%)
```

### Updating files in an existing archive

```console
$ zip -u archive.zip updated_file.txt
updating: updated_file.txt (deflated 40%)
```

## Tips:

### Use Different Compression Levels

For large archives, consider using different compression levels. Use `-0` for already compressed files (like JPEGs) and `-9` for text files where maximum compression is beneficial.

### Exclude Unwanted Files

Use patterns to exclude files: `zip -r archive.zip directory -x "*.git*" "*.DS_Store"` excludes Git files and macOS system files.

### Create Self-Extracting Archives

On some systems, you can create self-extracting archives with `zip -A archive.zip`, which adds extraction code to make the ZIP file executable.

### Split Large Archives

For very large archives that need to be transferred across limited media, use the `-s` option to split the archive into smaller pieces: `zip -s 100m -r archive.zip large_directory/`

## Frequently Asked Questions

#### Q1. How do I extract a ZIP file?
A. Use the `unzip` command: `unzip archive.zip`. The `zip` command only creates or modifies archives.

#### Q2. How can I see the contents of a ZIP file without extracting it?
A. Use `unzip -l archive.zip` to list the contents without extraction.

#### Q3. How do I create a ZIP file that preserves Unix permissions?
A. Use the `-X` option: `zip -X archive.zip files` to preserve file attributes including Unix permissions.

#### Q4. Can I add comments to a ZIP file?
A. Yes, use the `-z` option: `zip -z archive.zip` and you'll be prompted to enter a comment.

#### Q5. How do I handle filename encoding issues?
A. Use `-UN=encoding` to specify the encoding for filenames, e.g., `zip -UN=UTF8 archive.zip files`.

## macOS Considerations

On macOS, the default `zip` command may create additional hidden files like `.DS_Store` or `__MACOSX` directories in your archives. To avoid this, use the `-X` option to exclude extended attributes, or add exclusion patterns like `-x "*.DS_Store" "__MACOSX/*"`.

## References

https://linux.die.net/man/1/zip

## Revisions

- 2025/05/05 First revision