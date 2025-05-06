# git merge command

Combines changes from different branches into the current branch.

## Overview

`git merge` integrates changes from one or more branches into the current branch. It's commonly used to incorporate completed features from development branches into the main branch or to bring the latest changes from the main branch into a feature branch. The command creates a new commit that represents the merged state, unless it's a fast-forward merge.

## Options

### **--ff**

Perform a fast-forward merge when possible (default behavior).

```console
$ git merge feature-branch
Updating 5ab1c2d..8ef9a0b
Fast-forward
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

### **--no-ff**

Creates a merge commit even when a fast-forward merge would be possible.

```console
$ git merge --no-ff feature-branch
Merge made by the 'recursive' strategy.
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

### **--squash**

Combines all changes from the specified branch into a single set of changes, which can then be committed separately.

```console
$ git merge --squash feature-branch
Squash commit -- not updating HEAD
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

### **-m, --message**

Sets the commit message for the merge commit.

```console
$ git merge -m "Merge feature X into main" feature-branch
Merge made by the 'recursive' strategy.
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

### **--abort**

Aborts the current merge and restores the pre-merge state.

```console
$ git merge feature-branch
Auto-merging file.txt
CONFLICT (content): Merge conflict in file.txt
Automatic merge failed; fix conflicts and then commit the result.

$ git merge --abort
```

### **--continue**

Continues the merge after conflicts have been resolved.

```console
$ git merge --continue
```

### **-s, --strategy**

Specifies the merge strategy to use.

```console
$ git merge -s recursive feature-branch
Merge made by the 'recursive' strategy.
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

## Usage Examples

### Basic Branch Merge

```console
$ git checkout main
Switched to branch 'main'

$ git merge feature-branch
Updating 5ab1c2d..8ef9a0b
Fast-forward
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

### Creating a Merge Commit

```console
$ git checkout main
Switched to branch 'main'

$ git merge --no-ff feature-branch
Merge made by the 'recursive' strategy.
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

### Squashing Commits from a Branch

```console
$ git checkout main
Switched to branch 'main'

$ git merge --squash feature-branch
Squash commit -- not updating HEAD
 file.txt | 2 ++
 1 file changed, 2 insertions(+)

$ git commit -m "Implemented feature X"
[main abc1234] Implemented feature X
 1 file changed, 2 insertions(+)
```

### Resolving Merge Conflicts

```console
$ git merge feature-branch
Auto-merging file.txt
CONFLICT (content): Merge conflict in file.txt
Automatic merge failed; fix conflicts and then commit the result.

# Edit the conflicted files to resolve conflicts

$ git add file.txt
$ git merge --continue
# Or alternatively: git commit
```

## Tips

### Understanding Fast-Forward Merges

A fast-forward merge occurs when the target branch's history is a direct extension of the source branch. Git simply moves the pointer forward without creating a merge commit. Use `--no-ff` to force a merge commit for better history tracking.

### Previewing Merges

Before performing a merge, use `git diff <branch>` to preview changes that will be merged, or `git merge --no-commit --no-ff <branch>` to stage the merge without committing, allowing you to inspect the result.

### Handling Merge Conflicts

When conflicts occur, Git marks them in the affected files. Edit these files to resolve conflicts, then use `git add` to mark them as resolved, and finally `git merge --continue` or `git commit` to complete the merge.

### Using Merge Strategies

For complex merges, consider using different strategies with `-s`. The default `recursive` strategy works well for most cases, but `ours` or `theirs` can be useful when you want to prefer one side's changes over the other.

## Frequently Asked Questions

#### Q1. What's the difference between merge and rebase?
A. Merge creates a new commit that combines changes from both branches, preserving the branch history. Rebase replays your branch's commits on top of the target branch, creating a linear history but rewriting commit history.

#### Q2. How do I undo a merge?
A. If you haven't pushed the merge, use `git reset --hard HEAD~1` to undo the last commit. If you've already pushed, consider using `git revert -m 1 <merge-commit-hash>` to create a new commit that undoes the merge.

#### Q3. What is a fast-forward merge?
A. A fast-forward merge occurs when the current branch has no new commits since the branch being merged was created. Git simply moves the branch pointer forward to the latest commit of the merged branch.

#### Q4. How do I merge only specific files from another branch?
A. Use `git checkout <branch-name> -- <file-path>` to bring specific files from another branch, then commit those changes.

## References

https://git-scm.com/docs/git-merge

## Revisions

- 2025/05/05 First revision