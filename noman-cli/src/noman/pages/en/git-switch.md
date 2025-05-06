# git switch command

Switch branches or restore working tree files.

## Overview

The `git switch` command is used to switch between branches in a Git repository. It was introduced in Git 2.23 as a more user-friendly alternative to certain uses of `git checkout`. While `git checkout` serves multiple purposes, `git switch` is specifically designed for branch operations, making the command structure more intuitive.

## Options

### **-c, --create**

Create a new branch and switch to it.

```console
$ git switch -c feature-login
Switched to a new branch 'feature-login'
```

### **-d, --detach**

Switch to a commit in detached HEAD state.

```console
$ git switch -d 1a2b3c4
Note: switching to '1a2b3c4'.

You are in 'detached HEAD' state...
HEAD is now at 1a2b3c4 Add login functionality
```

### **--discard-changes**

Throw away local modifications before switching.

```console
$ git switch --discard-changes main
Switched to branch 'main'
```

### **-f, --force**

Force switch even if the index or working tree differs from HEAD.

```console
$ git switch -f main
Switched to branch 'main'
```

### **-m, --merge**

Perform a three-way merge between the current branch, your working tree contents, and the new branch.

```console
$ git switch -m feature-branch
Switched to branch 'feature-branch'
```

### **--orphan**

Create a new orphan branch (a branch with no history).

```console
$ git switch --orphan new-root
Switched to a new branch 'new-root'
```

### **-t, --track**

When creating a new branch, set up "upstream" configuration.

```console
$ git switch -c feature-branch -t origin/feature-branch
Branch 'feature-branch' set up to track remote branch 'feature-branch' from 'origin'.
Switched to a new branch 'feature-branch'
```

### **-**

Switch to the previous branch.

```console
$ git switch -
Switched to branch 'main'
```

## Usage Examples

### Basic Branch Switching

```console
$ git switch main
Switched to branch 'main'
```

### Creating and Switching to a New Branch

```console
$ git switch -c feature-auth
Switched to a new branch 'feature-auth'
```

### Switching to a Remote Branch

```console
$ git switch feature-branch
Branch 'feature-branch' set up to track remote branch 'feature-branch' from 'origin'.
Switched to a new branch 'feature-branch'
```

### Switching to a Specific Commit

```console
$ git switch -d 1a2b3c4
Note: switching to '1a2b3c4'.

You are in 'detached HEAD' state...
HEAD is now at 1a2b3c4 Add login functionality
```

## Tips:

### Use `-` to Toggle Between Branches

The dash shorthand (`git switch -`) allows you to quickly toggle between the current and previous branch, similar to `cd -` in the shell.

### Combine with `git branch` for Better Workflow

Use `git branch` to see available branches before switching: `git branch` followed by `git switch branch-name`.

### Prefer `switch` Over `checkout` for Branch Operations

`git switch` is more intuitive than `git checkout` for branch operations, as it's specifically designed for this purpose and has clearer semantics.

### Create Tracking Branches Automatically

When switching to a remote branch that doesn't exist locally, Git will automatically create a tracking branch if the branch name exists on a single remote.

## Frequently Asked Questions

#### Q1. What's the difference between `git switch` and `git checkout`?
A. `git switch` is focused solely on branch operations, while `git checkout` has multiple purposes including branch switching, file restoration, and more. `git switch` was introduced to provide clearer, more specific commands.

#### Q2. How do I create a new branch and switch to it?
A. Use `git switch -c new-branch-name` to create and switch to a new branch in one command.

#### Q3. How can I discard local changes when switching branches?
A. Use `git switch --discard-changes branch-name` to discard local modifications before switching.

#### Q4. How do I switch back to my previous branch?
A. Use `git switch -` to switch to the previously checked out branch.

#### Q5. What happens if I have uncommitted changes when switching branches?
A. Git will prevent you from switching if there are conflicts. You can either commit your changes, stash them with `git stash`, or use the `--discard-changes` or `--merge` options.

## References

https://git-scm.com/docs/git-switch

## Revisions

- 2025/05/05 First revision