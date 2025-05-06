# git-rebase command

Reapply commits on top of another base tip, rewriting the commit history.

## Overview

`git rebase` is used to change the base of your branch from one commit to another, making it appear as if you created your branch from a different commit. It rewrites the commit history by creating new commits for each commit in the original branch, potentially resulting in a cleaner, linear project history.

## Options

### **-i, --interactive**

Start an interactive rebase session, allowing you to edit, squash, reorder, or drop commits.

```console
$ git rebase -i HEAD~3
# Opens editor with the last 3 commits listed for modification
```

### **--onto <newbase>**

Specify the new base commit to reapply your changes onto.

```console
$ git rebase --onto main feature-branch
# Reapplies commits from current branch onto main, starting from feature-branch
```

### **--continue**

Continue the rebase operation after resolving conflicts.

```console
$ git rebase --continue
# Continues the rebase after fixing conflicts
```

### **--abort**

Cancel the rebase operation and return to the pre-rebase state.

```console
$ git rebase --abort
# Cancels the rebase and restores the original state
```

### **--skip**

Skip the current patch and continue with the next one.

```console
$ git rebase --skip
# Skips the current commit and continues with the next one
```

### **-m, --merge**

Use merging strategies to rebase.

```console
$ git rebase -m main
# Uses merge strategy when rebasing onto main
```

### **-s, --strategy=<strategy>**

Use the given merge strategy.

```console
$ git rebase -s recursive main
# Uses recursive strategy when rebasing onto main
```

## Usage Examples

### Basic Rebasing

```console
$ git checkout feature
$ git rebase main
# Reapplies commits from feature branch onto the tip of main
```

### Interactive Rebasing to Squash Commits

```console
$ git rebase -i HEAD~5
# In the editor that opens:
# pick 01ab234 First commit message
# squash 56cd789 Second commit message
# squash 89ef012 Third commit message
# pick 34gh567 Fourth commit message
# pick 78ij890 Fifth commit message
```

### Moving a Branch to a Different Base

```console
$ git rebase --onto main feature-base feature
# Reapplies commits from feature-base to feature onto main
```

## Tips:

### Never Rebase Public Branches

Avoid rebasing commits that have been pushed to public repositories. Rebasing changes commit history, which can cause conflicts for others who have based work on those commits.

### Resolve Conflicts Carefully

When conflicts occur during rebase, Git pauses the operation. Resolve conflicts in each file, then use `git add` to mark them as resolved before continuing with `git rebase --continue`.

### Create a Backup Branch

Before performing a complex rebase, create a backup branch: `git branch backup-branch`. This provides a safety net if the rebase goes wrong.

### Use Interactive Rebase for Cleanup

Interactive rebase (`-i`) is excellent for cleaning up your commit history before sharing your work. You can combine related commits, remove unnecessary ones, and rewrite commit messages.

## Frequently Asked Questions

#### Q1. What's the difference between merge and rebase?
A. Merge preserves history and creates a merge commit, while rebase rewrites history by creating new commits, resulting in a linear history.

#### Q2. How do I undo a rebase?
A. If you haven't pushed the changes, use `git reflog` to find the commit before the rebase and then `git reset --hard <commit-hash>` to return to that state.

#### Q3. When should I use rebase instead of merge?
A. Use rebase for cleaning up your local, unpublished commits or maintaining a linear history. Use merge for integrating public branches.

#### Q4. How do I resolve conflicts during a rebase?
A. Edit the conflicted files to resolve the conflicts, then `git add` the resolved files and run `git rebase --continue`.

#### Q5. Can I rebase multiple branches at once?
A. No, you must rebase one branch at a time.

## References

https://git-scm.com/docs/git-rebase

## Revisions

- 2025/05/05 First revision