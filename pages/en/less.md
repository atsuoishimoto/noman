# less command

Display text files in a scrollable interface with search capabilities.

## Overview

`less` is a terminal pager program that allows you to view text files one screen at a time. Unlike `cat`, which displays the entire file at once, `less` provides navigation controls to move forward, backward, search for text, and more. It's particularly useful for viewing large files without overwhelming your terminal.

## Options

### **-N**

Display line numbers at the beginning of each line.

```console
$ less -N file.txt
      1 This is line 1
      2 This is line 2
      3 This is line 3
```

### **-i**

Perform case-insensitive searches. When this option is enabled, searching for "text" will match "text", "Text", "TEXT", etc.

```console
$ less -i file.txt
```

### **-S**

Disable line wrapping. Long lines will be truncated rather than wrapped to the next line, allowing horizontal scrolling.

```console
$ less -S file.txt
```

### **-F**

Automatically exit if the entire file can be displayed on the first screen.

```console
$ less -F short_file.txt
```

### **-R**

Display ANSI color escape sequences in their raw form, allowing colored text to be displayed properly.

```console
$ less -R colored_output.txt
```

### **-X**

Don't clear the screen when exiting less, keeping the content visible in the terminal.

```console
$ less -X file.txt
```

## Usage Examples

### Basic file viewing

```console
$ less /var/log/syslog
[file content appears in scrollable interface]
```

### Viewing command output

```console
$ ls -la | less
total 112
drwxr-xr-x  18 user  staff   576 May  5 10:23 .
drwxr-xr-x   5 user  staff   160 Apr 29 14:12 ..
-rw-r--r--   1 user  staff  8196 May  5 09:45 file1.txt
-rw-r--r--   1 user  staff  5423 May  4 16:32 file2.txt
```

### Viewing compressed files

```console
$ zless compressed_file.gz
[decompressed content appears in scrollable interface]
```

## Navigation Commands

While in less, you can use these keyboard commands:

- **Space/Page Down**: Move forward one screen
- **b/Page Up**: Move backward one screen
- **Down Arrow/Enter**: Move forward one line
- **Up Arrow**: Move backward one line
- **g**: Go to the first line
- **G**: Go to the last line
- **/pattern**: Search forward for "pattern"
- **n**: Repeat the last search forward
- **N**: Repeat the last search backward
- **q**: Quit less

## Tips:

### Mark Positions for Quick Navigation

Press `m` followed by any letter to mark your current position. Later, you can return to that position by pressing `'` (apostrophe) followed by the same letter.

### Follow Growing Files

Use `less +F file.log` to follow a growing file (similar to `tail -f`). Press Ctrl+C to stop following and return to normal browsing mode. Press `F` to resume following.

### Customize Your Experience with Environment Variables

Set `LESS="-R -i"` in your shell configuration to always use those options without typing them.

### Multiple File Navigation

When opening multiple files with `less file1 file2 file3`, use `:n` to move to the next file and `:p` to move to the previous file.

## Frequently Asked Questions

#### Q1. What's the difference between `less` and `more`?
A. `less` is an improved version of `more` with bidirectional scrolling, better search capabilities, and doesn't need to load the entire file before viewing.

#### Q2. How do I search for text in a file?
A. Press `/` followed by your search term and Enter. Use `n` to find the next occurrence and `N` for the previous one.

#### Q3. How can I display line numbers?
A. Use `less -N filename` or press `-N` while viewing a file in less.

#### Q4. How do I exit less?
A. Press `q` to quit.

#### Q5. Can less display binary files?
A. While less can open binary files, it's designed for text. For binary files, consider using specialized tools like `hexdump` or `xxd`.

## References

https://www.greenwoodsoftware.com/less/

## Revisions

- 2025/05/05 First revision