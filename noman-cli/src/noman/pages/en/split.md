# split command

Split a file into pieces.

## Overview

The `split` command divides a file into multiple smaller files. It's useful for breaking up large files for easier handling, transferring across size-limited media, or processing in chunks. By default, it creates files named 'xaa', 'xab', etc., each containing a specified number of lines or bytes from the original file.

## Options

### **-b, --bytes=SIZE**

Split by bytes instead of lines. SIZE can be a number followed by a multiplier: k (1024), m (1024²), g (1024³), etc.

```console
$ split -b 1M largefile.dat chunk_
$ ls chunk_*
chunk_aa  chunk_ab  chunk_ac
```

### **-l, --lines=NUMBER**

Split file by NUMBER lines (default is 1000).

```console
$ split -l 100 data.csv part_
$ ls part_*
part_aa  part_ab  part_ac  part_ad
```

### **-d, --numeric-suffixes[=FROM]**

Use numeric suffixes instead of alphabetic ones, starting at FROM (default 0).

```console
$ split -d -l 100 data.txt section_
$ ls section_*
section_00  section_01  section_02
```

### **-a, --suffix-length=N**

Generate suffixes of length N (default 2).

```console
$ split -a 3 -l 100 data.txt part_
$ ls part_*
part_aaa  part_aab  part_aac
```

### **--additional-suffix=SUFFIX**

Append an additional SUFFIX to file names.

```console
$ split -l 100 --additional-suffix=.txt data.csv part_
$ ls part_*
part_aa.txt  part_ab.txt  part_ac.txt
```

### **-n, --number=CHUNKS**

Split into CHUNKS files based on size or count.

```console
$ split -n 3 largefile.dat chunk_
$ ls chunk_*
chunk_aa  chunk_ab  chunk_ac
```

## Usage Examples

### Splitting a large log file by line count

```console
$ split -l 1000 server.log server_log_
$ ls server_log_*
server_log_aa  server_log_ab  server_log_ac  server_log_ad
```

### Splitting a large file into equal-sized chunks

```console
$ split -n 5 backup.tar.gz backup_part_
$ ls backup_part_*
backup_part_aa  backup_part_ab  backup_part_ac  backup_part_ad  backup_part_ae
```

### Creating chunks of specific byte size with numeric suffixes

```console
$ split -b 10M -d large_video.mp4 video_
$ ls video_*
video_00  video_01  video_02  video_03
```

## Tips

### Reassembling Split Files

To recombine split files, use the `cat` command with the files in the correct order:
```console
$ cat chunk_* > original_file_restored
```

### Preserving File Extensions

When splitting files with extensions, use `--additional-suffix` to maintain the extension for easier identification:
```console
$ split -b 5M --additional-suffix=.mp4 video.mp4 video_part_
```

### Splitting CSV Files with Headers

When splitting CSV files, you might want to preserve the header in each file:
```console
$ head -1 data.csv > header
$ tail -n +2 data.csv | split -l 1000 - part_
$ for f in part_*; do cat header "$f" > "${f}.csv"; rm "$f"; done
```

## Frequently Asked Questions

#### Q1. How do I split a file into equal-sized parts?
A. Use `split -n NUMBER filename prefix` where NUMBER is the number of parts you want.

#### Q2. How do I split a file by size?
A. Use `split -b SIZE filename prefix` where SIZE can be specified in bytes, KB (k), MB (m), or GB (g).

#### Q3. How do I recombine split files back into the original?
A. Use `cat prefix* > original_filename` to concatenate all the split parts in order.

#### Q4. Can I use numeric suffixes instead of alphabetic ones?
A. Yes, use the `-d` option to get numeric suffixes (00, 01, 02, etc.) instead of alphabetic ones.

## References

https://www.gnu.org/software/coreutils/manual/html_node/split-invocation.html

## Revisions

- 2025/05/05 First revision