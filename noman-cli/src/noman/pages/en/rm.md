# rm command

Remove files or directories from the filesystem.

## Overview

The `rm` command deletes files and directories from the filesystem. By default, it doesn't remove directories and doesn't prompt for confirmation before removing files. Once files are deleted with `rm`, they cannot be easily recovered, so use this command with caution.

## Options

### **-f, --force**

Ignore nonexistent files and arguments, never prompt for confirmation

```console
$ rm -f nonexistent_file.txt
$
```

### **-i, --interactive**

Prompt before every removal

```console
$ rm -i important.txt
rm: remove regular file 'important.txt'? y
$
```

### **-r, -R, --recursive**

Remove directories and their contents recursively

```console
$ rm -r project_folder/
$
```

### **-d, --dir**

Remove empty directories

```console
$ rm -d empty_directory/
$
```

### **-v, --verbose**

Explain what is being done

```console
$ rm -v file.txt
removed 'file.txt'
$
```

## Usage Examples

### Removing multiple files

```console
$ rm file1.txt file2.txt file3.txt
$
```

### Removing files with confirmation

```console
$ rm -i *.txt
rm: remove regular file 'document.txt'? y
rm: remove regular file 'notes.txt'? n
$
```

### Removing directories and their contents

```console
$ rm -rf old_project/
$
```

### Removing files with verbose output

```console
$ rm -v *.log
removed 'error.log'
removed 'access.log'
removed 'system.log'
$
```

## Tips:

### Use with Caution

The `rm` command permanently deletes files without moving them to a trash or recycle bin. Always double-check what you're deleting, especially when using wildcards.

### Safer Deletion with Interactive Mode

When deleting multiple files, use `rm -i` to confirm each deletion. This helps prevent accidental removal of important files.

### Avoid `rm -rf /`

Never run `rm -rf /` or `rm -rf /*` as these commands will attempt to delete everything on your system, potentially rendering it unusable.

### Use Aliases for Safety

Consider creating an alias in your shell configuration: `alias rm='rm -i'` to always use interactive mode by default.

## Frequently Asked Questions

#### Q1. Can I recover files deleted with `rm`?
A. Generally no. Unlike graphical file managers, `rm` doesn't move files to a trash folder. Recovery requires specialized tools and isn't guaranteed.

#### Q2. How do I remove files with special characters in their names?
A. Use quotes around the filename or escape the special characters with a backslash. For example: `rm "file with spaces.txt"` or `rm file\ with\ spaces.txt`.

#### Q3. How can I safely remove a directory and all its contents?
A. Use `rm -r directory/` to recursively remove a directory and its contents. Add `-i` for confirmation prompts.

#### Q4. What's the difference between `rm -r` and `rmdir`?
A. `rmdir` only removes empty directories, while `rm -r` removes directories and all their contents recursively.

## macOS Considerations

On macOS, the default `rm` command doesn't support the `--one-file-system` option available in GNU rm. Also, to completely bypass the macOS Trash when deleting files from external drives, you must use `rm` rather than the Finder's delete function.

## References

https://www.gnu.org/software/coreutils/manual/html_node/rm-invocation.html

## Revisions

- 2025/05/05 First revision