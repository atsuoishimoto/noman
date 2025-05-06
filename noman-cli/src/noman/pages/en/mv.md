# mv command

Move (rename) files and directories.

## Overview

The `mv` command moves files or directories from one location to another. It can also be used to rename files and directories. When moving files across filesystems, `mv` copies the file and deletes the original.

## Options

### **-f, --force**

Override existing files without prompting for confirmation.

```console
$ mv -f oldfile.txt newfile.txt
```

### **-i, --interactive**

Prompt before overwriting existing files.

```console
$ mv -i oldfile.txt newfile.txt
mv: overwrite 'newfile.txt'? y
```

### **-n, --no-clobber**

Do not overwrite existing files.

```console
$ mv -n oldfile.txt newfile.txt
```

### **-v, --verbose**

Explain what is being done.

```console
$ mv -v oldfile.txt newfile.txt
'oldfile.txt' -> 'newfile.txt'
```

### **-b, --backup**

Make a backup of each existing destination file.

```console
$ mv -b oldfile.txt newfile.txt
```

## Usage Examples

### Renaming a file

```console
$ mv oldname.txt newname.txt
```

### Moving a file to another directory

```console
$ mv file.txt /path/to/directory/
```

### Moving multiple files to a directory

```console
$ mv file1.txt file2.txt file3.txt /path/to/directory/
```

### Moving and renaming a directory

```console
$ mv old_directory/ new_directory/
```

## Tips:

### Prevent Accidental Overwrites

Use `mv -i` to enable interactive mode, which prompts for confirmation before overwriting existing files. This is especially useful in scripts or when moving multiple files.

### Create Backups Automatically

When overwriting important files, use `mv -b` to create backups of the original files. This creates a backup with a tilde (~) appended to the filename.

### Move Hidden Files

When moving hidden files (those starting with a dot), be explicit with the filename to avoid confusion:
```console
$ mv .hidden_file /new/location/
```

### Use Wildcards Carefully

When using wildcards, first use `ls` with the same pattern to verify which files will be moved:
```console
$ ls *.txt
$ mv *.txt /destination/
```

## Frequently Asked Questions

#### Q1. What's the difference between `mv` and `cp`?
A. `mv` moves files (removing them from the original location), while `cp` copies files (leaving the original intact).

#### Q2. How do I move a file without overwriting an existing file?
A. Use `mv -n source destination` to prevent overwriting existing files.

#### Q3. Can I move multiple files at once?
A. Yes, specify multiple source files followed by a destination directory: `mv file1 file2 file3 /destination/`.

#### Q4. How do I rename a file?
A. Use `mv oldname newname` to rename a file.

#### Q5. What happens when I move files between different filesystems?
A. When moving between filesystems, `mv` copies the file to the new location and then deletes the original.

## References

https://www.gnu.org/software/coreutils/manual/html_node/mv-invocation.html

## Revisions

- 2025/05/05 First revision