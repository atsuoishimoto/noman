# git reset command

Reset current HEAD to the specified state.

## Overview

`git reset` is used to undo changes by moving the HEAD and current branch to a different commit. It can also modify the staging area (index) and optionally the working directory, allowing you to undo commits, unstage files, or completely discard changes.

## Options

### **--soft**

Reset HEAD to specified commit but leave staging area and working directory unchanged.

```console
$ git reset --soft HEAD~1
```

### **--mixed**

Default mode. Reset HEAD and staging area but leave working directory unchanged.

```console
$ git reset HEAD~1
```

### **--hard**

Reset HEAD, staging area, and working directory to match the specified commit.

```console
$ git reset --hard HEAD~1
```

### **-p, --patch**

Interactively select hunks of changes to reset.

```console
$ git reset -p
```

### **<commit>**

The commit to reset to. Can be a commit hash, branch name, tag, or relative reference.

```console
$ git reset abc123f
```

## Usage Examples

### Unstaging a file

```console
$ git add file.txt
$ git reset file.txt
Unstaged changes after reset:
M       file.txt
```

### Undoing the last commit but keeping changes staged

```console
$ git reset --soft HEAD~1
```

### Completely discarding the last three commits

```console
$ git reset --hard HEAD~3
HEAD is now at 1a2b3c4 Previous commit message
```

### Resetting to a specific commit

```console
$ git reset --mixed 1a2b3c4
Unstaged changes after reset:
M       file1.txt
M       file2.txt
```

## Tips:

### Use `--soft` for Amending Commits

When you want to add more changes to your last commit or change the commit message, use `git reset --soft HEAD~1` to undo the commit but keep all changes staged.

### Recover from a Hard Reset

If you accidentally reset with `--hard`, you can often recover using `git reflog` to find the commit you reset from, then `git reset --hard` to that commit hash.

### Understand the Three Reset Modes

Think of the three reset modes as levels of impact:
- `--soft`: Only moves HEAD (safest)
- `--mixed`: Moves HEAD and updates staging area
- `--hard`: Moves HEAD, updates staging area, and working directory (most destructive)

### Use `git reset` Instead of `git checkout` for Branches

When switching to a different branch, prefer `git switch` or `git checkout` over `git reset`. Using reset to switch branches can lead to unexpected results.

## Frequently Asked Questions

#### Q1. What's the difference between `git reset` and `git revert`?
A. `git reset` changes history by moving HEAD to a previous commit, while `git revert` creates a new commit that undoes changes from a previous commit, preserving history.

#### Q2. How do I undo a `git reset --hard`?
A. Use `git reflog` to find the commit hash before the reset, then `git reset --hard <commit-hash>` to return to that state.

#### Q3. How can I unstage all files?
A. Use `git reset` with no arguments to unstage all files.

#### Q4. Can I reset only specific files?
A. Yes, use `git reset <filename>` to unstage specific files or `git reset -p` to interactively select parts of files to unstage.

## References

https://git-scm.com/docs/git-reset

## Revisions

- 2025/05/05 First revision