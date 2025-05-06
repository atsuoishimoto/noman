# git stash command

Temporarily stores modified, tracked files to save changes without committing.

## Overview

`git stash` saves your local modifications away and reverts the working directory to match the HEAD commit. It's useful when you need to switch branches but aren't ready to commit your current work, or when you need to apply a quick fix without committing incomplete work.

## Options

### **stash**

Save your local modifications to a new stash entry and roll them back to HEAD

```console
$ git stash
Saved working directory and index state WIP on main: 2d4e15a Updated README
```

### **save [message]**

Save your local modifications with a custom message

```console
$ git stash save "Work in progress for feature X"
Saved working directory and index state On main: Work in progress for feature X
```

### **list**

List all stashes you have stored

```console
$ git stash list
stash@{0}: WIP on main: 2d4e15a Updated README
stash@{1}: On feature-branch: Implementing new login form
```

### **show [stash]**

Show the changes recorded in the stash as a diff

```console
$ git stash show
 index.html | 2 +-
 style.css  | 5 +++++
 2 files changed, 6 insertions(+), 1 deletion(-)
```

### **pop [stash]**

Apply a stash and remove it from the stash list

```console
$ git stash pop
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html
        modified:   style.css

Dropped refs/stash@{0} (32b3aa1d185dfe6d57b3c3cc3e3f31b61a97ec2c)
```

### **apply [stash]**

Apply a stash without removing it from the stash list

```console
$ git stash apply
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html
        modified:   style.css
```

### **drop [stash]**

Remove a stash from the stash list

```console
$ git stash drop stash@{0}
Dropped stash@{0} (32b3aa1d185dfe6d57b3c3cc3e3f31b61a97ec2c)
```

### **clear**

Remove all stash entries

```console
$ git stash clear
```

### **-u, --include-untracked**

Include untracked files in the stash

```console
$ git stash -u
Saved working directory and index state WIP on main: 2d4e15a Updated README
```

### **-a, --all**

Include both untracked and ignored files in the stash

```console
$ git stash -a
Saved working directory and index state WIP on main: 2d4e15a Updated README
```

## Usage Examples

### Stashing changes before pulling updates

```console
$ git stash
Saved working directory and index state WIP on main: 2d4e15a Updated README
$ git pull
$ git stash pop
```

### Creating a branch from a stash

```console
$ git stash
Saved working directory and index state WIP on main: 2d4e15a Updated README
$ git stash branch new-feature stash@{0}
Switched to a new branch 'new-feature'
On branch new-feature
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html
        modified:   style.css
Dropped refs/stash@{0} (32b3aa1d185dfe6d57b3c3cc3e3f31b61a97ec2c)
```

### Stashing specific files

```console
$ git stash push -m "Stashing only CSS files" -- *.css
Saved working directory and index state On main: Stashing only CSS files
```

## Tips

### Use Descriptive Messages

Always use descriptive messages with `git stash save "message"` to make it easier to identify stashes later.

### Check Stash Contents Before Applying

Use `git stash show -p stash@{n}` to view the full diff of a stash before applying it.

### Create a Branch from a Stash

If you realize your stashed changes should be in their own branch, use `git stash branch <branchname> [stash]` to create a new branch with the stashed changes applied.

### Partial Stashing

Use `git stash -p` (or `--patch`) to interactively select which changes to stash, allowing you to keep some changes in your working directory.

## Frequently Asked Questions

#### Q1. What happens to my stashes when I switch branches?
A. Stashes are stored separately from branches and remain accessible regardless of which branch you're on.

#### Q2. How long do stashes persist?
A. Stashes persist indefinitely until you explicitly drop them or clear the stash list.

#### Q3. Can I recover a dropped stash?
A. Yes, if you know the stash's commit ID (shown when dropping), you can recover it using `git stash apply <commit-id>` within the git reflog expiration period.

#### Q4. How do I stash only certain files?
A. Use `git stash push [--] [<pathspec>...]` to stash specific files, e.g., `git stash push -- file1.txt file2.js`.

#### Q5. What's the difference between `pop` and `apply`?
A. `pop` applies the stash and removes it from the stash list, while `apply` only applies the stash but keeps it in the stash list.

## References

https://git-scm.com/docs/git-stash

## Revisions

- 2025/05/05 First revision