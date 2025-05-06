# git commit command

Record changes to the repository by saving staged content as a new commit.

## Overview

The `git commit` command captures a snapshot of the project's currently staged changes. Committed snapshots are "safe" versions of a project that Git will never change unless explicitly asked to do so. Before running `git commit`, you need to use `git add` to stage the changes you want to include in the commit.

## Options

### **-m, --message=<msg>**

Use the given message as the commit message instead of launching an editor.

```console
$ git commit -m "Add new feature"
[main 5d6e7f8] Add new feature
 1 file changed, 10 insertions(+), 2 deletions(-)
```

### **-a, --all**

Automatically stage all modified and deleted files before committing (does not include untracked files).

```console
$ git commit -a -m "Update existing files"
[main 1a2b3c4] Update existing files
 2 files changed, 15 insertions(+), 5 deletions(-)
```

### **--amend**

Replace the tip of the current branch by creating a new commit, using the same log message as the previous commit.

```console
$ git commit --amend -m "Fix previous commit message"
[main 7f8e9d6] Fix previous commit message
 Date: Mon May 5 10:30:45 2025 -0700
 1 file changed, 10 insertions(+), 2 deletions(-)
```

### **-v, --verbose**

Show diff of changes to be committed in the commit message editor.

```console
$ git commit -v
# Opens editor with diff included in the commit template
```

### **--no-verify**

Bypass the pre-commit and commit-msg hooks.

```console
$ git commit --no-verify -m "Emergency fix"
[main 3e4f5d6] Emergency fix
 1 file changed, 3 insertions(+)
```

## Usage Examples

### Creating a standard commit

```console
$ git add file1.txt file2.txt
$ git commit -m "Add new files and update documentation"
[main 1a2b3c4] Add new files and update documentation
 2 files changed, 25 insertions(+), 0 deletions(-)
 create mode 100644 file1.txt
 create mode 100644 file2.txt
```

### Amending the previous commit with new changes

```console
$ git add forgotten_file.txt
$ git commit --amend
[main 1a2b3c4] Add new files and update documentation
 3 files changed, 30 insertions(+), 0 deletions(-)
 create mode 100644 file1.txt
 create mode 100644 file2.txt
 create mode 100644 forgotten_file.txt
```

### Creating an empty commit

```console
$ git commit --allow-empty -m "Trigger CI build"
[main 9d8c7b6] Trigger CI build
```

## Tips:

### Write Meaningful Commit Messages

Good commit messages should explain why a change was made, not just what was changed. Use the present tense ("Add feature" not "Added feature") and keep the first line under 50 characters, followed by a blank line and more detailed explanation if needed.

### Use Atomic Commits

Make each commit a logical unit of work that focuses on a single change. This makes it easier to understand, review, and potentially revert changes later.

### Verify What You're Committing

Before committing, use `git status` to verify what files are staged and `git diff --staged` to review the exact changes that will be committed.

### Sign Your Commits

For security-sensitive projects, consider using `git commit -S` to cryptographically sign your commits, verifying that you are the author.

## Frequently Asked Questions

#### Q1. How do I undo my last commit?
A. Use `git reset HEAD~1` to undo the commit but keep the changes staged, or `git reset --hard HEAD~1` to discard the changes completely.

#### Q2. How can I change my commit message after pushing?
A. Use `git commit --amend` to change the message, then `git push --force` to update the remote (use with caution on shared branches).

#### Q3. What's the difference between `git commit` and `git commit -a`?
A. `git commit` only commits changes that have been staged with `git add`, while `git commit -a` automatically stages and commits all modified and deleted tracked files.

#### Q4. Can I commit only part of a file's changes?
A. Yes, use `git add -p` to interactively select which changes to stage before committing.

## References

https://git-scm.com/docs/git-commit

## Revisions

- 2025/05/05 First revision