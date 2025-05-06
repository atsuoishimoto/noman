# gunzip command

Decompress files compressed with gzip.

## Overview

`gunzip` is a utility that expands files compressed with gzip compression. It restores the original files by removing the `.gz` extension. By default, gunzip keeps the original compressed file unless the `-k` option is used.

## Options

### **-c, --stdout, --to-stdout**

Write output to standard output and keep original files unchanged.

```console
$ gunzip -c archive.gz > extracted_file
```

### **-f, --force**

Force decompression even if the file has multiple links or the corresponding file already exists.

```console
$ gunzip -f already_exists.gz
```

### **-k, --keep**

Keep (don't delete) input files during decompression.

```console
$ gunzip -k data.gz
$ ls
data  data.gz
```

### **-l, --list**

List the contents of the compressed file without decompressing.

```console
$ gunzip -l archive.gz
         compressed        uncompressed  ratio uncompressed_name
                 220                 356  38.2% archive
```

### **-q, --quiet**

Suppress all warnings.

```console
$ gunzip -q noisy.gz
```

### **-r, --recursive**

Recursively decompress files in directories.

```console
$ gunzip -r ./compressed_directory/
```

### **-t, --test**

Test the compressed file integrity without decompressing.

```console
$ gunzip -t archive.gz
```

### **-v, --verbose**

Display the name and percentage reduction for each file decompressed.

```console
$ gunzip -v data.gz
data.gz:	 65.3% -- replaced with data
```

## Usage Examples

### Basic decompression

```console
$ gunzip archive.gz
$ ls
archive
```

### Decompressing multiple files

```console
$ gunzip file1.gz file2.gz file3.gz
$ ls
file1 file2 file3
```

### Decompressing to standard output

```console
$ gunzip -c config.gz | grep "setting"
default_setting=true
advanced_setting=false
```

### Testing compressed files without extracting

```console
$ gunzip -tv *.gz
archive1.gz: OK
archive2.gz: OK
data.gz: OK
```

## Tips:

### Use with tar files

Many tar archives are also gzip compressed (with .tar.gz or .tgz extension). Instead of using gunzip first, you can use `tar -xzf` to extract them in one step.

### Handling multiple compression formats

If you're unsure about the compression format, consider using `zcat` which works with various compression formats, or try the more versatile `unzip` for zip files.

### Preserving timestamps

gunzip preserves the original file's timestamp by default, which helps maintain file history information.

### Pipe usage

When working with large files, use the `-c` option to pipe the output directly to another command without creating intermediate files.

## Frequently Asked Questions

#### Q1. What's the difference between gunzip and gzip -d?
A. They are functionally equivalent. `gunzip file.gz` is the same as `gzip -d file.gz`.

#### Q2. How can I decompress a file without removing the original?
A. Use the `-k` or `--keep` option: `gunzip -k file.gz`

#### Q3. Can gunzip handle .zip files?
A. No, gunzip only handles gzip-compressed files (.gz). For .zip files, use the `unzip` command.

#### Q4. How do I decompress multiple files at once?
A. Simply list all files: `gunzip file1.gz file2.gz file3.gz` or use wildcards: `gunzip *.gz`

#### Q5. How can I see what's in a .gz file without extracting it?
A. Use `gunzip -l file.gz` to list the contents or `zcat file.gz | less` to view the contents.

## References

https://www.gnu.org/software/gzip/manual/gzip.html

## Revisions

- 2025/05/05 First revision