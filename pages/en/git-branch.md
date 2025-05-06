# git-branch command

List, create, or delete branches in a Git repository.

## Overview

The `git branch` command manages branches in a Git repository. It allows you to create new branches, list existing ones, rename branches, and delete branches that are no longer needed. Branches are lightweight pointers to commits that enable parallel development workflows.

## Options

### **-a, --all**

List both remote-tracking branches and local branches.

```console
$ git branch -a
* main
  feature-login
  remotes/origin/main
  remotes/origin/feature-login
```

### **-d, --delete**

Delete a branch. The branch must be fully merged in its upstream branch, or in HEAD if no upstream was set.

```console
$ git branch -d feature-done
Deleted branch feature-done (was 3e563c4).
```

### **-D**

Force delete a branch, even if it contains unmerged changes.

```console
$ git branch -D feature-incomplete
Deleted branch feature-incomplete (was 7d9f12a).
```

### **-m, --move**

Move/rename a branch and its reflog.

```console
$ git branch -m old-name new-name
```

### **-r, --remotes**

List remote-tracking branches only.

```console
$ git branch -r
  origin/main
  origin/feature-login
  origin/dev
```

### **-v, --verbose**

Show SHA-1 and commit subject line for each branch.

```console
$ git branch -v
* main       a72f324 Update README.md
  feature-ui 8d3e5c1 Add new button component
```

### **--merged**

List branches that have been merged into the current branch.

```console
$ git branch --merged
* main
  feature-complete
```

### **--no-merged**

List branches that have not been merged into the current branch.

```console
$ git branch --no-merged
  feature-in-progress
  experimental
```

## Usage Examples

### Creating a new branch

```console
$ git branch new-feature
$ git branch
* main
  new-feature
```

### Creating and switching to a new branch

```console
$ git branch feature-login
$ git checkout feature-login
Switched to branch 'feature-login'

# Or more concisely with git checkout -b
$ git checkout -b feature-login
Switched to a new branch 'feature-login'
```

### Deleting multiple branches

```console
$ git branch -d feature-1 feature-2 feature-3
Deleted branch feature-1 (was 3e563c4).
Deleted branch feature-2 (was 7d9f12a).
Deleted branch feature-3 (was 2f5e8b9).
```

### Listing branches with more information

```console
$ git branch -vv
* main            a72f324 [origin/main] Update README.md
  feature-ui      8d3e5c1 [origin/feature-ui: ahead 2] Add new button component
  feature-api     3f5d9a2 [origin/feature-api: behind 3] Implement API client
```

## Tips

### Use Descriptive Branch Names

Use clear, descriptive branch names that indicate the purpose of the branch, such as `feature/login`, `bugfix/header`, or `refactor/auth-system`.

### Clean Up Merged Branches

Regularly delete branches that have been merged to keep your repository clean:
```console
$ git branch --merged | grep -v "\*" | xargs git branch -d
```

### Track Remote Branches

When working with remote branches, use `git branch --track branch-name origin/branch-name` to set up tracking, or more simply `git checkout --track origin/branch-name`.

### View Branch History

To see the commit history of a specific branch, use:
```console
$ git log branch-name
```

## Frequently Asked Questions

#### Q1. How do I create a new branch?
A. Use `git branch branch-name` to create a branch, then `git checkout branch-name` to switch to it. Alternatively, use `git checkout -b branch-name` to create and switch in one command.

#### Q2. How do I delete a branch?
A. Use `git branch -d branch-name` to delete a branch that has been merged, or `git branch -D branch-name` to force delete a branch regardless of its merge status.

#### Q3. How do I rename a branch?
A. Use `git branch -m old-name new-name` to rename a branch. If you're currently on the branch you want to rename, you can simply use `git branch -m new-name`.

#### Q4. How do I see which branches are merged?
A. Use `git branch --merged` to see branches that have been merged into the current branch, and `git branch --no-merged` to see branches that haven't been merged yet.

#### Q5. How do I push a new local branch to a remote repository?
A. Use `git push -u origin branch-name` to push a local branch to the remote repository and set up tracking.

## References

https://git-scm.com/docs/git-branch

## Revisions

- 2025/05/05 First revision