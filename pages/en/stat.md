# stat command

Display file or file system status information.

## Overview

The `stat` command displays detailed information about files, directories, or file systems. It shows metadata such as file size, permissions, access times, inode information, and more. This command is useful for system administrators and users who need to examine file attributes beyond what basic commands like `ls` provide.

## Options

### **-c, --format=FORMAT**

Output information using a specified format string.

```console
$ stat -c "%n %s %U" file.txt
file.txt 1024 user
```

### **-f, --file-system**

Display file system status instead of file status.

```console
$ stat -f /home
  File: "/home"
    ID: 2f5b04742a3bfad9 Namelen: 255     Type: ext4
Block size: 4096       Fundamental block size: 4096
Blocks: Total: 121211648  Free: 62303156   Available: 56073252
Inodes: Total: 30539776   Free: 29752540
```

### **-L, --dereference**

Follow links (show information about the file the link references rather than the link itself).

```console
$ stat -L symlink.txt
  File: 'symlink.txt'
  Size: 1024      	Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d	Inode: 1234567     Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/    user)   Gid: ( 1000/    user)
Access: 2025-05-01 10:15:30.000000000 +0000
Modify: 2025-05-01 10:15:30.000000000 +0000
Change: 2025-05-01 10:15:30.000000000 +0000
 Birth: 2025-05-01 10:15:30.000000000 +0000
```

### **-t, --terse**

Print the information in terse form.

```console
$ stat -t file.txt
file.txt 1024 8 81a4 1000 1000 801 1234567 1 0 0 1619875530 1619875530 1619875530 1619875530
```

### **--printf=FORMAT**

Like --format, but interpret backslash escapes and do not output a mandatory trailing newline.

```console
$ stat --printf="%n has %s bytes\n" file.txt
file.txt has 1024 bytes
```

## Usage Examples

### Basic file information

```console
$ stat document.txt
  File: document.txt
  Size: 1024      	Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d	Inode: 1234567     Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/    user)   Gid: ( 1000/    user)
Access: 2025-05-01 10:15:30.000000000 +0000
Modify: 2025-05-01 10:15:30.000000000 +0000
Change: 2025-05-01 10:15:30.000000000 +0000
 Birth: 2025-05-01 10:15:30.000000000 +0000
```

### Custom format for multiple files

```console
$ stat -c "Name: %n, Size: %s bytes, Owner: %U" *.txt
Name: document.txt, Size: 1024 bytes, Owner: user
Name: notes.txt, Size: 512 bytes, Owner: user
Name: readme.txt, Size: 256 bytes, Owner: user
```

### File system information

```console
$ stat -f /
  File: "/"
    ID: 2f5b04742a3bfad9 Namelen: 255     Type: ext4
Block size: 4096       Fundamental block size: 4096
Blocks: Total: 121211648  Free: 62303156   Available: 56073252
Inodes: Total: 30539776   Free: 29752540
```

## Tips:

### Get Only Specific Information

Use the `-c` option with format specifiers to extract only the information you need. For example, `stat -c "%s" file.txt` will show only the file size.

### Compare File Timestamps

Use `stat` to check when a file was last accessed, modified, or had its metadata changed. This is useful for troubleshooting or verifying file operations.

### Check Inode Information

The inode number shown by `stat` can help identify if two files are hard-linked to each other (they would share the same inode number).

### Format Specifiers

Learn common format specifiers for `-c` option:
- `%n`: file name
- `%s`: total size in bytes
- `%U`: user name of owner
- `%G`: group name of owner
- `%a`: access rights in octal
- `%x`: time of last access
- `%y`: time of last modification
- `%z`: time of last change

## Frequently Asked Questions

#### Q1. What's the difference between Modify and Change times?
A. Modify time (`%y`) is when the file's content was last modified. Change time (`%z`) is when the file's metadata (permissions, ownership, etc.) was last changed.

#### Q2. How can I see only the file size?
A. Use `stat -c "%s" filename` to display only the file size in bytes.

#### Q3. How do I check disk space with stat?
A. Use `stat -f /path/to/filesystem` to see filesystem information including total, free, and available space.

#### Q4. What's the difference between stat and ls -l?
A. `stat` provides more detailed metadata about files, including exact timestamps and inode information, while `ls -l` gives a more concise summary of file attributes.

## macOS Considerations

On macOS, the `stat` command has different syntax and options compared to GNU/Linux. The format option uses `-f` instead of `-c`, and the format specifiers are different:

```console
$ stat -f "Name: %N, Size: %z bytes, Owner: %Su" file.txt
Name: file.txt, Size: 1024 bytes, Owner: user
```

Common macOS format specifiers:
- `%N`: file name
- `%z`: size in bytes
- `%Su`: user name of owner
- `%Sg`: group name of owner
- `%Sp`: file permissions
- `%a`: last access time
- `%m`: last modification time
- `%c`: last status change time

## References

https://www.gnu.org/software/coreutils/manual/html_node/stat-invocation.html

## Revisions

- 2025/05/05 First revision