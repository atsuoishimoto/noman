# gzip command

Compress or expand files using the gzip algorithm.

## Overview

`gzip` compresses files to reduce their size, creating files with a `.gz` extension. It replaces the original file with a compressed version by default. The command can also decompress files previously compressed with gzip.

## Options

### **-c, --stdout, --to-stdout**

Write output to standard output and keep original files unchanged.

```console
$ gzip -c file.txt > file.txt.gz
```

### **-d, --decompress, --uncompress**

Decompress a compressed file.

```console
$ gzip -d file.txt.gz
```

### **-f, --force**

Force compression or decompression even if the file has multiple links or the corresponding file already exists.

```console
$ gzip -f already_exists.txt
```

### **-k, --keep**

Keep (don't delete) input files during compression or decompression.

```console
$ gzip -k important_file.txt
```

### **-l, --list**

List the compressed and uncompressed size, ratio, and filename for each compressed file.

```console
$ gzip -l *.gz
         compressed        uncompressed  ratio uncompressed_name
                 220                 631  65.1% file1.txt
                 143                 341  58.1% file2.txt
```

### **-r, --recursive**

Recursively compress files in directories.

```console
$ gzip -r directory/
```

### **-v, --verbose**

Display the name and percentage reduction for each file compressed or decompressed.

```console
$ gzip -v file.txt
file.txt:       63.4% -- replaced with file.txt.gz
```

### **-[1-9], --fast, --best**

Regulate the speed of compression using the specified digit, where -1 (or --fast) indicates the fastest compression method (less compression) and -9 (or --best) indicates the slowest compression method (optimal compression). The default compression level is -6.

```console
$ gzip -9 file.txt
```

## Usage Examples

### Basic Compression

```console
$ gzip large_file.txt
$ ls
large_file.txt.gz
```

### Compressing Multiple Files

```console
$ gzip file1.txt file2.txt file3.txt
$ ls
file1.txt.gz file2.txt.gz file3.txt.gz
```

### Decompressing Files

```console
$ gzip -d archive.gz
$ ls
archive
```

### Viewing Compressed Files Without Decompressing

```console
$ zcat compressed_file.gz
[contents of the file displayed without decompression]
```

### Compressing While Keeping Original Files

```console
$ gzip -k important_document.txt
$ ls
important_document.txt important_document.txt.gz
```

## Tips:

### Use zcat, zless, or zgrep for Compressed Files

Instead of decompressing files to view or search their contents, use `zcat`, `zless`, or `zgrep` to work directly with compressed files.

```console
$ zgrep "search term" file.gz
```

### Combine with tar for Directory Compression

For compressing entire directories, combine with `tar`:

```console
$ tar -czf archive.tar.gz directory/
```

### Use gunzip as an Alternative to gzip -d

The `gunzip` command is equivalent to `gzip -d` for decompression:

```console
$ gunzip file.gz
```

### Preserve Original Files

Always use `-k` when you want to keep the original files, as gzip removes them by default.

## Frequently Asked Questions

#### Q1. How do I compress a file with gzip?
A. Simply run `gzip filename` to compress a file. The original file will be replaced with a compressed version having a `.gz` extension.

#### Q2. How do I decompress a gzip file?
A. Use `gzip -d filename.gz` or `gunzip filename.gz` to decompress the file.

#### Q3. How can I compress a file without deleting the original?
A. Use `gzip -k filename` to keep the original file while creating a compressed version.

#### Q4. What compression level should I use?
A. Use `-1` for fastest compression (less space savings) or `-9` for best compression (slower). The default level `-6` offers a good balance.

#### Q5. How do I compress an entire directory?
A. `gzip` itself doesn't compress directories. Use `tar` with `gzip`: `tar -czf archive.tar.gz directory/`.

## References

https://www.gnu.org/software/gzip/manual/gzip.html

## Revisions

- 2025/05/05 First revision