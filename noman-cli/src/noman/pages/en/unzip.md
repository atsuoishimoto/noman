# unzip command

Extract files from ZIP archives.

## Overview

`unzip` extracts files and directories from ZIP archives. It supports various compression methods and can handle password-protected archives. The command can list, test, and extract the contents of ZIP files, making it essential for working with compressed data.

## Options

### **-l**

List archive contents without extracting

```console
$ unzip -l archive.zip
Archive:  archive.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
     1024  2025-01-01 12:34   file1.txt
      512  2025-01-02 15:45   file2.txt
---------                     -------
     1536                     2 files
```

### **-t**

Test archive integrity without extracting

```console
$ unzip -t archive.zip
Archive:  archive.zip
    testing: file1.txt               OK
    testing: file2.txt               OK
No errors detected in compressed data of archive.zip.
```

### **-o**

Overwrite existing files without prompting

```console
$ unzip -o archive.zip
Archive:  archive.zip
  inflating: file1.txt
  inflating: file2.txt
```

### **-d, --directory**

Extract files to specified directory

```console
$ unzip archive.zip -d extracted_files
Archive:  archive.zip
   creating: extracted_files/
  inflating: extracted_files/file1.txt
  inflating: extracted_files/file2.txt
```

### **-P**

Use password for encrypted archives

```console
$ unzip -P secretpassword protected.zip
Archive:  protected.zip
  inflating: confidential.txt
```

### **-q**

Quiet mode (suppress normal output)

```console
$ unzip -q archive.zip
```

### **-j**

Junk paths (don't create directories)

```console
$ unzip -j archive.zip
Archive:  archive.zip
  inflating: file1.txt
  inflating: file2.txt
```

## Usage Examples

### Extracting specific files from an archive

```console
$ unzip archive.zip file1.txt
Archive:  archive.zip
  inflating: file1.txt
```

### Listing contents with detailed information

```console
$ unzip -v archive.zip
Archive:  archive.zip
 Length   Method    Size  Cmpr    Date    Time   CRC-32   Name
--------  ------  ------- ---- ---------- ----- --------  ----
    1024  Defl:N      512  50% 2025-01-01 12:34 a1b2c3d4  file1.txt
     512  Defl:N      256  50% 2025-01-02 15:45 e5f6g7h8  file2.txt
--------          -------  ---                            -------
    1536              768  50%                            2 files
```

### Extracting all files except specific ones

```console
$ unzip archive.zip -x file2.txt
Archive:  archive.zip
  inflating: file1.txt
```

## Tips:

### Preview Archive Contents Before Extracting

Always use `unzip -l archive.zip` to preview the contents before extraction. This helps avoid accidentally extracting files that might overwrite existing ones.

### Handle Password-Protected Archives

For encrypted archives, use `unzip -P password archive.zip`. If you don't want to expose the password in command history, omit the -P option and unzip will prompt for the password.

### Extract to a Specific Directory

Use `unzip archive.zip -d target_directory` to extract files to a specific location instead of the current directory. This keeps your workspace organized.

### Dealing with Path Issues

If a ZIP file contains absolute paths or paths with `../`, use `unzip -j` to extract just the files without their directory structure, preventing potential security issues.

## Frequently Asked Questions

#### Q1. How do I extract only specific files from a ZIP archive?
A. Use `unzip archive.zip filename1 filename2` to extract only the specified files.

#### Q2. How can I extract a ZIP file without overwriting existing files?
A. By default, unzip prompts before overwriting. Use `unzip -n archive.zip` to never overwrite existing files.

#### Q3. How do I handle ZIP files with non-English filenames?
A. Use `unzip -O CP936 archive.zip` for Chinese filenames or other appropriate character encodings for different languages.

#### Q4. Can unzip handle password-protected ZIP files?
A. Yes, use `unzip -P password archive.zip` or omit the password to be prompted securely.

#### Q5. How do I extract a ZIP file without creating its directory structure?
A. Use `unzip -j archive.zip` to "junk" the paths and extract all files to a single directory.

## References

https://linux.die.net/man/1/unzip

## Revisions

- 2025/05/05 First revision