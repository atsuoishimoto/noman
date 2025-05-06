# touch command

Create or update file timestamps.

## Overview

The `touch` command creates empty files if they don't exist or updates the access and modification timestamps of existing files to the current time. It's commonly used to create empty files or update file timestamps without changing content.

## Options

### **-a**

Change only the access time.

```console
$ touch -a file.txt
```

### **-c, --no-create**

Do not create files that don't exist.

```console
$ touch -c nonexistent.txt
```

### **-m**

Change only the modification time.

```console
$ touch -m file.txt
```

### **-r, --reference=FILE**

Use the timestamp of the reference FILE instead of the current time.

```console
$ touch -r reference.txt target.txt
```

### **-t STAMP**

Use the specified time instead of the current time. Format: [[CC]YY]MMDDhhmm[.ss]

```console
$ touch -t 202505051200 file.txt
```

### **-d, --date=STRING**

Parse STRING and use it instead of current time.

```console
$ touch -d "2025-05-05 12:00:00" file.txt
```

## Usage Examples

### Creating multiple empty files

```console
$ touch file1.txt file2.txt file3.txt
```

### Updating timestamp to current time

```console
$ touch existing_file.txt
$ ls -l existing_file.txt
-rw-r--r-- 1 user group 0 May  5 10:30 existing_file.txt
```

### Setting a specific timestamp

```console
$ touch -d "yesterday" file.txt
$ ls -l file.txt
-rw-r--r-- 1 user group 0 May  4 10:30 file.txt
```

### Using another file's timestamp

```console
$ touch -r source.txt destination.txt
$ ls -l source.txt destination.txt
-rw-r--r-- 1 user group 0 May  5 09:15 source.txt
-rw-r--r-- 1 user group 0 May  5 09:15 destination.txt
```

## Tips:

### Create Files with Directory Path

If you need to create a file in a directory that doesn't exist yet, use `mkdir -p` first:

```console
$ mkdir -p path/to/directory
$ touch path/to/directory/file.txt
```

### Batch Create Files with Patterns

Use brace expansion to create multiple files with a pattern:

```console
$ touch file{1..5}.txt
$ ls
file1.txt file2.txt file3.txt file4.txt file5.txt
```

### Update Timestamps Without Creating Files

When you want to update timestamps only for existing files, use the `-c` option to prevent creating new files:

```console
$ touch -c *.txt
```

## Frequently Asked Questions

#### Q1. What happens if I touch a file that doesn't exist?
A. By default, `touch` creates an empty file with that name.

#### Q2. How can I update only the modification time without changing the access time?
A. Use `touch -m filename` to update only the modification time.

#### Q3. Can I set a file's timestamp to a specific date and time?
A. Yes, use `touch -d "YYYY-MM-DD HH:MM:SS" filename` or `touch -t YYYYMMDDhhmm.ss filename`.

#### Q4. Does touch change file content?
A. No, `touch` only creates empty files or updates timestamps; it never modifies existing file content.

## References

https://www.gnu.org/software/coreutils/manual/html_node/touch-invocation.html

## Revisions

- 2025/05/05 First revision