# du command

Estimate file space usage for directories and files.

## Overview

The `du` (disk usage) command estimates and displays the disk space used by files and directories. It's particularly useful for finding which directories are consuming the most space on your system, helping you identify areas for cleanup.

## Options

### **-h, --human-readable**

Display sizes in human-readable format (e.g., 1K, 234M, 2G)

```console
$ du -h Documents
4.0K    Documents/notes
16K     Documents/projects/code
24K     Documents/projects
28K     Documents
```

### **-s, --summarize**

Display only a total for each argument

```console
$ du -s Documents
28      Documents
```

### **-c, --total**

Produce a grand total of all arguments

```console
$ du -c Documents Downloads
28      Documents
156     Downloads
184     total
```

### **-a, --all**

Show sizes for files as well as directories

```console
$ du -a Documents
4       Documents/notes/todo.txt
4       Documents/notes
8       Documents/projects/code/script.py
16      Documents/projects/code
24      Documents/projects
28      Documents
```

### **--max-depth=N**

Print the total for a directory only if it is N or fewer levels below the command line argument

```console
$ du --max-depth=1 Documents
4       Documents/notes
24      Documents/projects
28      Documents
```

### **-x, --one-file-system**

Skip directories on different file systems

```console
$ du -x /home
```

## Usage Examples

### Finding the largest directories

```console
$ du -h --max-depth=1 /home/user | sort -hr
1.2G    /home/user
650M    /home/user/Downloads
320M    /home/user/Videos
200M    /home/user/Documents
45M     /home/user/.cache
```

### Checking specific directory size with human-readable output

```console
$ du -sh /var/log
156M    /var/log
```

### Finding large files in the current directory

```console
$ du -ah . | sort -hr | head -n 10
1.2G    .
650M    ./Downloads
320M    ./Videos
200M    ./Documents
150M    ./Downloads/ubuntu.iso
100M    ./Videos/lecture.mp4
45M     ./.cache
25M     ./Documents/thesis.pdf
20M     ./Pictures
15M     ./Music
```

## Tips:

### Combine with sort for better insights

Pipe `du` output to `sort -hr` to list directories by size in descending order:
```console
$ du -h | sort -hr
```

### Use with find to target specific file types

Combine with `find` to analyze space used by specific file types:
```console
$ find . -name "*.log" -exec du -ch {} \; | grep total$
```

### Exclude certain directories

Use with `grep -v` to exclude directories from analysis:
```console
$ du -h | grep -v "node_modules"
```

### On macOS

The BSD version of `du` on macOS has slightly different options. Use `brew install coreutils` and then `gdu` to get GNU-compatible behavior.

## Frequently Asked Questions

#### Q1. What's the difference between `du` and `df`?
A. `du` shows disk usage of files and directories, while `df` shows available and used disk space on mounted filesystems.

#### Q2. Why does `du` report different sizes than what I see in a file manager?
A. `du` measures disk space used (including filesystem overhead), while file managers often show logical file sizes.

#### Q3. How can I exclude certain directories from the calculation?
A. Use the `--exclude=PATTERN` option: `du --exclude=node_modules`.

#### Q4. Why is `du` slow on large directories?
A. `du` needs to traverse the entire directory structure to calculate sizes. For large directories, consider using `du -s` for summary only.

## References

https://www.gnu.org/software/coreutils/manual/html_node/du-invocation.html

## Revisions

- 2025/05/05 First revision