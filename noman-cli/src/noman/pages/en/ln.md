# ln command

Create links between files.

## Overview

The `ln` command creates links between files. It can create hard links (the default) or symbolic links (with the `-s` option). Hard links point directly to the file's data on disk, while symbolic links are special files that point to another file by name.

## Options

### **-s, --symbolic**

Create a symbolic link instead of a hard link.

```console
$ ln -s target_file link_name
$ ls -l link_name
lrwxrwxrwx 1 user user 10 May 5 10:00 link_name -> target_file
```

### **-f, --force**

Remove existing destination files.

```console
$ ln -sf target_file existing_link
```

### **-n, --no-dereference**

Treat destination that is a symlink to a directory as if it were a normal file.

```console
$ ln -sfn new_target existing_link
```

### **-v, --verbose**

Print the name of each linked file.

```console
$ ln -sv target_file link_name
'link_name' -> 'target_file'
```

### **-r, --relative**

Create symbolic links relative to link location.

```console
$ ln -sr ../target_file link_name
```

## Usage Examples

### Creating a hard link

```console
$ echo "Original content" > original.txt
$ ln original.txt hardlink.txt
$ ls -l original.txt hardlink.txt
-rw-r--r-- 2 user user 16 May 5 10:00 hardlink.txt
-rw-r--r-- 2 user user 16 May 5 10:00 original.txt
```

### Creating a symbolic link to a file

```console
$ ln -s /path/to/file.txt symlink.txt
$ ls -l symlink.txt
lrwxrwxrwx 1 user user 14 May 5 10:00 symlink.txt -> /path/to/file.txt
```

### Creating a symbolic link to a directory

```console
$ ln -s /path/to/directory dir_link
$ ls -l dir_link
lrwxrwxrwx 1 user user 17 May 5 10:00 dir_link -> /path/to/directory
```

### Creating a relative symbolic link

```console
$ ln -sr ../../shared/config.txt config_link
$ ls -l config_link
lrwxrwxrwx 1 user user 22 May 5 10:00 config_link -> ../../shared/config.txt
```

## Tips

### Understanding Hard Links vs Symbolic Links

- Hard links share the same inode as the original file, meaning they point to the same physical data on disk. Changes to either file affect both, and the file isn't deleted until all hard links are removed.
- Symbolic links are separate files that point to another file by name. If the original file is moved or deleted, the symlink becomes broken.

### Hard Link Limitations

Hard links cannot link to directories or files on different filesystems. Use symbolic links in these cases.

### Checking if a File is a Link

Use `ls -l` to see if a file is a link. Symbolic links show with an "l" at the beginning of permissions and an arrow pointing to the target.

### Fixing Broken Symbolic Links

If you move the target of a symbolic link, the link will break. Use `ln -sf` to update it to point to the new location.

## Frequently Asked Questions

#### Q1. What's the difference between hard and symbolic links?
A. Hard links share the same inode (data on disk) as the original file, while symbolic links are separate files that point to another file by name. Hard links can't cross filesystems or link to directories.

#### Q2. How do I create a symbolic link to a directory?
A. Use `ln -s /path/to/directory link_name` to create a symbolic link to a directory.

#### Q3. How can I update an existing symbolic link?
A. Use `ln -sf new_target existing_link` to force the creation of a new link, replacing the existing one.

#### Q4. Why is my symbolic link broken?
A. Symbolic links break when the target file is moved or deleted. They point to a path, not the actual file data.

## References

https://www.gnu.org/software/coreutils/manual/html_node/ln-invocation.html

## Revisions

- 2025/05/05 First revision