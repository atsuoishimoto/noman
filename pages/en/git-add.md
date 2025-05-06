# git add command

Add file contents to the index (staging area) for the next commit.

## Overview

`git add` updates the Git index (staging area) with the current content of files in the working directory. It marks modified files to be included in the next commit. This command is essential for the Git workflow as it allows you to selectively choose which changes to commit.

## Options

### **-A, --all**

Add changes from all tracked and untracked files.

```console
$ git add -A
```

### **-u, --update**

Update the index just for files that are already tracked.

```console
$ git add -u
```

### **-p, --patch**

Interactively choose hunks of patch between the index and the work tree and add them to the index.

```console
$ git add -p
diff --git a/file.txt b/file.txt
index 1234567..abcdefg 100644
--- a/file.txt
+++ b/file.txt
@@ -1,4 +1,5 @@
 Line 1
 Line 2
+New line added
 Line 3
 Line 4
Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]? 
```

### **-i, --interactive**

Add modified contents interactively.

```console
$ git add -i
           staged     unstaged path
  1:    unchanged        +2/-0 file1.txt
  2:    unchanged        +1/-1 file2.txt

*** Commands ***
  1: status       2: update       3: revert       4: add untracked
  5: patch        6: diff         7: quit         8: help
What now> 
```

### **-n, --dry-run**

Don't actually add the files, just show what would happen.

```console
$ git add -n *.txt
add 'document.txt'
add 'notes.txt'
```

### **-f, --force**

Allow adding otherwise ignored files.

```console
$ git add -f build/generated.js
```

### **-v, --verbose**

Be verbose.

```console
$ git add -v *.js
add 'app.js'
add 'utils.js'
```

## Usage Examples

### Adding specific files

```console
$ git add file1.txt file2.txt
```

### Adding all files in a directory

```console
$ git add src/
```

### Adding all files with a specific extension

```console
$ git add *.js
```

### Adding all changes in the working directory

```console
$ git add .
```

## Tips:

### Use Patch Mode for Precise Control

The `-p` (patch) option allows you to review and selectively stage parts of a file. This is useful when you've made multiple changes to a file but want to commit them separately.

### Verify What's Being Added

Before committing, use `git status` to verify what changes are staged. This helps prevent accidentally committing unwanted changes.

### Undo Staging with Reset

If you accidentally stage a file, you can unstage it with `git reset HEAD <file>`.

### Use Interactive Mode for Complex Changes

For repositories with many changed files, `-i` (interactive) mode provides a menu-driven interface to selectively stage changes.

## Frequently Asked Questions

#### Q1. What's the difference between `git add .` and `git add -A`?
A. `git add .` adds all changes in the current directory and its subdirectories, while `git add -A` adds changes from the entire working tree, regardless of your current directory.

#### Q2. How do I add only modified and deleted files but not untracked files?
A. Use `git add -u` or `git add --update`.

#### Q3. How can I see what changes I'm about to add?
A. Use `git add -n` (dry run) to see what would be added without actually adding anything, or `git diff` to see the changes in detail.

#### Q4. What happens if I add a file and then modify it again?
A. Only the changes that were present when you ran `git add` will be staged. The newer changes will need to be added with another `git add` command.

## References

https://git-scm.com/docs/git-add

## Revisions

- 2025/05/05 First revision