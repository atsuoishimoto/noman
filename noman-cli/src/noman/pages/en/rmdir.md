# rmdir command

Remove empty directories from the filesystem.

## Overview

The `rmdir` command removes empty directories from the filesystem. Unlike `rm -r`, which can remove directories with their contents, `rmdir` will only succeed if the specified directories are completely empty.

## Options

### **-p, --parents**

Remove directory and its ancestors. For example, `rmdir -p a/b/c` is similar to `rmdir a/b/c a/b a`.

```console
$ mkdir -p test/nested/dir
$ rmdir -p test/nested/dir
$ ls test
ls: cannot access 'test': No such file or directory
```

### **-v, --verbose**

Output a diagnostic message for every directory processed.

```console
$ mkdir empty_dir
$ rmdir -v empty_dir
rmdir: removing directory, 'empty_dir'
```

### **--ignore-fail-on-non-empty**

Ignore failures that occur solely because a directory is non-empty.

```console
$ mkdir dir_with_file
$ touch dir_with_file/file.txt
$ rmdir --ignore-fail-on-non-empty dir_with_file
$ ls
dir_with_file
```

## Usage Examples

### Removing a single empty directory

```console
$ mkdir empty_dir
$ rmdir empty_dir
$ ls
[empty_dir no longer appears in the listing]
```

### Removing nested empty directories

```console
$ mkdir -p parent/child/grandchild
$ rmdir -p parent/child/grandchild
$ ls
[parent directory and its subdirectories are removed]
```

### Attempting to remove a non-empty directory

```console
$ mkdir non_empty
$ touch non_empty/file.txt
$ rmdir non_empty
rmdir: failed to remove 'non_empty': Directory not empty
```

## Tips:

### Use rm -r for Non-Empty Directories

When you need to remove directories that contain files, use `rm -r directory_name` instead of `rmdir`. Be careful with this command as it will recursively delete everything in the directory.

### Combine with find to Remove Multiple Empty Directories

You can use `find` with `rmdir` to remove multiple empty directories at once:
```console
$ find . -type d -empty -exec rmdir {} \;
```

### Check Before Removing

If you're unsure whether a directory is empty, use `ls -la directory_name` to check its contents before attempting to remove it.

## Frequently Asked Questions

#### Q1. What's the difference between `rmdir` and `rm -r`?
A. `rmdir` only removes empty directories, while `rm -r` removes directories and all their contents recursively.

#### Q2. How do I remove a directory that contains files?
A. You cannot use `rmdir` for this purpose. Use `rm -r directory_name` instead.

#### Q3. Can I remove multiple directories at once with `rmdir`?
A. Yes, you can specify multiple directory names as arguments: `rmdir dir1 dir2 dir3`.

#### Q4. What happens if I try to remove a non-existent directory?
A. `rmdir` will display an error message indicating that the directory does not exist.

## References

https://www.gnu.org/software/coreutils/manual/html_node/rmdir-invocation.html

## Revisions

- 2025/05/05 First revision