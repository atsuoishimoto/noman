# git command

Distributed version control system for tracking changes in source code during software development.

## Overview

Git is a distributed version control system that allows multiple developers to work on a project simultaneously. It tracks changes to files, maintains a history of modifications, and facilitates collaboration by enabling users to merge changes from different sources. Git operates primarily through a local repository, with the ability to synchronize with remote repositories.

## Options

### **--version**

Display the version of Git installed.

```console
$ git --version
git version 2.39.2
```

### **--help**

Display help information for Git or a specific Git command.

```console
$ git --help
usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           [--super-prefix=<path>] [--config-env=<name>=<envvar>]
           <command> [<args>]
```

### **-C \<path\>**

Run Git as if it was started in the specified path.

```console
$ git -C /path/to/repo status
On branch main
Your branch is up to date with 'origin/main'.
```

### **-c \<name\>=\<value\>**

Set a configuration variable for the duration of the command.

```console
$ git -c user.name="Temporary User" commit -m "Temporary commit"
[main 1a2b3c4] Temporary commit
 1 file changed, 2 insertions(+)
```

## Usage Examples

### Initializing a Repository

```console
$ git init
Initialized empty Git repository in /path/to/project/.git/
```

### Cloning a Repository

```console
$ git clone https://github.com/username/repository.git
Cloning into 'repository'...
remote: Enumerating objects: 125, done.
remote: Counting objects: 100% (125/125), done.
remote: Compressing objects: 100% (80/80), done.
remote: Total 125 (delta 40), reused 120 (delta 35), pack-reused 0
Receiving objects: 100% (125/125), 2.01 MiB | 3.50 MiB/s, done.
Resolving deltas: 100% (40/40), done.
```

### Basic Workflow

```console
$ git add file.txt
$ git commit -m "Add new file"
[main 1a2b3c4] Add new file
 1 file changed, 10 insertions(+)
 create mode 100644 file.txt
$ git push origin main
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 294 bytes | 294.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/username/repository.git
   7f8d922..1a2b3c4  main -> main
```

### Checking Status and History

```console
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

$ git log
commit 1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0 (HEAD -> main, origin/main)
Author: User Name <user@example.com>
Date:   Mon May 5 10:00:00 2025 -0700

    Add new file
```

## Tips

### Use Aliases for Common Commands

Set up aliases for frequently used commands to save time:

```console
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
```

### Stash Changes Temporarily

When you need to switch branches but aren't ready to commit:

```console
$ git stash
Saved working directory and index state WIP on main: 1a2b3c4 Latest commit
$ git stash pop
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   file.txt
```

### Use Interactive Rebase for Cleaning History

Combine, edit, or reorder commits before pushing:

```console
$ git rebase -i HEAD~3
```

### Create a .gitignore File

Prevent unwanted files from being tracked:

```console
$ echo "node_modules/" > .gitignore
$ echo "*.log" >> .gitignore
$ git add .gitignore
$ git commit -m "Add gitignore file"
```

## Frequently Asked Questions

#### Q1. How do I undo the last commit?
A. Use `git reset HEAD~1` to undo the last commit but keep the changes, or `git reset --hard HEAD~1` to discard the changes completely.

#### Q2. How do I create a new branch?
A. Use `git branch branch-name` to create a branch and `git checkout branch-name` to switch to it, or use `git checkout -b branch-name` to do both in one command.

#### Q3. How do I merge branches?
A. First checkout the target branch with `git checkout main`, then use `git merge feature-branch` to merge changes from the feature branch.

#### Q4. How do I resolve merge conflicts?
A. When conflicts occur, edit the conflicted files to resolve the differences, then `git add` the resolved files and complete the merge with `git commit`.

#### Q5. How do I update my local repository with remote changes?
A. Use `git pull` to fetch and merge remote changes, or `git fetch` followed by `git merge` for more control.

## References

https://git-scm.com/docs

## Revisions

- 2025/05/05 First revision