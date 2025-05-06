# find command

Search for files in a directory hierarchy.

## Overview

The `find` command searches for files in a directory hierarchy based on various criteria such as name, type, size, or modification time. It's a powerful tool for locating files and executing operations on the matching results.

## Options

### **-iname**

Performs a case-insensitive search for files matching the specified pattern. Similar to `-name` but ignores case differences.

```console
$ find . -iname "*.txt"
./notes.txt
./Documents/README.txt
./projects/readme.TXT
```

### **-name**

Searches for files matching the specified pattern (case-sensitive).

```console
$ find . -name "*.txt"
./notes.txt
./Documents/README.txt
```

### **-type**

Searches for files of a specific type. Common types include:
- `f` (regular file)
- `d` (directory)
- `l` (symbolic link)

```console
$ find . -type f -name "*.jpg"
./photos/vacation.jpg
./profile.jpg
```

### **-size**

Searches for files based on their size.
- `+n` (larger than n)
- `-n` (smaller than n)
- `n` (exactly n)

Units: `c` (bytes), `k` (kilobytes), `M` (megabytes), `G` (gigabytes)

```console
$ find . -size +10M
./videos/tutorial.mp4
./backups/archive.zip
```

### **-mtime**

Searches for files based on their modification time in days.
- `+n` (more than n days ago)
- `-n` (less than n days ago)
- `n` (exactly n days ago)

```console
$ find . -mtime -7
./documents/recent_report.pdf
./notes.txt
```

### **-exec**

Executes a command on each matching file.

```console
$ find . -name "*.log" -exec rm {} \;
```

## Usage Examples

### Finding files with a specific extension regardless of case

```console
$ find /home/user -iname "*.jpg"
/home/user/Pictures/vacation.jpg
/home/user/Downloads/photo.JPG
/home/user/Documents/scan.Jpg
```

### Finding and deleting temporary files

```console
$ find /tmp -name "temp*" -type f -exec rm {} \;
```

### Finding large files modified in the last week

```console
$ find /home -type f -size +100M -mtime -7
/home/user/Downloads/movie.mp4
/home/user/Documents/presentation.pptx
```

### Finding empty directories

```console
$ find /var/log -type d -empty
/var/log/old
/var/log/archive/2024
```

## Tips:

### Use Wildcards Carefully

When using patterns with `-name` or `-iname`, remember to quote the pattern to prevent shell expansion: `find . -name "*.txt"` not `find . -name *.txt`.

### Limit Directory Depth

Use `-maxdepth` to limit how deep `find` will search, which can significantly improve performance: `find . -maxdepth 2 -name "*.log"`.

### Combine Multiple Conditions

Use `-a` (AND, default), `-o` (OR), and `!` or `-not` (NOT) to create complex search criteria: `find . -name "*.jpg" -a -size +1M`.

### Avoid Permission Denied Messages

Redirect error messages to `/dev/null` to suppress "Permission denied" errors: `find / -name "file.txt" 2>/dev/null`.

## Frequently Asked Questions

#### Q1. How do I find files by name ignoring case?
A. Use the `-iname` option: `find . -iname "pattern"`.

#### Q2. How can I find files modified within the last 24 hours?
A. Use `-mtime -1`: `find . -mtime -1`.

#### Q3. How do I find and delete files in one command?
A. Use the `-exec` option: `find . -name "pattern" -exec rm {} \;`.

#### Q4. What's the difference between `-iname` and `-name`?
A. `-iname` performs a case-insensitive search, while `-name` is case-sensitive.

#### Q5. How can I make find search only the current directory without subdirectories?
A. Use `-maxdepth 1`: `find . -maxdepth 1 -name "pattern"`.

## References

https://www.gnu.org/software/findutils/manual/html_node/find_html/index.html

## Revisions

- 2025/05/05 First revision