# git pull command

Fetch from and integrate with another repository or a local branch.

## Overview

`git pull` is a command that fetches changes from a remote repository and integrates them into the current branch. It's essentially a combination of `git fetch` followed by `git merge` or `git rebase`, depending on configuration. This command is commonly used to update your local repository with changes made by others.

## Options

### **--all**

Fetch all remotes.

```console
$ git pull --all
Fetching origin
Updating 3e4f123..8a9b012
Fast-forward
 README.md | 5 +++++
 1 file changed, 5 insertions(+)
```

### **-r, --rebase[=false|true|merges|interactive]**

Rebase the current branch on top of the upstream branch after fetching, instead of merging.

```console
$ git pull --rebase
Successfully rebased and updated refs/heads/main.
```

### **-v, --verbose**

Be more verbose.

```console
$ git pull -v
From https://github.com/user/repo
 * branch            main       -> FETCH_HEAD
Updating 3e4f123..8a9b012
Fast-forward
 README.md | 5 +++++
 1 file changed, 5 insertions(+)
```

### **--ff, --no-ff**

When the merge resolves as a fast-forward, only update the branch pointer, without creating a merge commit. With --no-ff create a merge commit even when the merge resolves as a fast-forward.

```console
$ git pull --no-ff
From https://github.com/user/repo
 * branch            main       -> FETCH_HEAD
Merge made by the 'recursive' strategy.
 README.md | 5 +++++
 1 file changed, 5 insertions(+)
```

### **--ff-only**

Only fast-forward if possible. If not, exit with a non-zero status.

```console
$ git pull --ff-only
fatal: Not possible to fast-forward, aborting.
```

### **-q, --quiet**

Be quiet. Only report errors.

```console
$ git pull -q
```

## Usage Examples

### Basic pull from origin

```console
$ git pull
From https://github.com/user/repo
 * branch            main       -> FETCH_HEAD
Updating 3e4f123..8a9b012
Fast-forward
 README.md | 5 +++++
 1 file changed, 5 insertions(+)
```

### Pull from a specific remote and branch

```console
$ git pull upstream feature-branch
From https://github.com/upstream/repo
 * branch            feature-branch -> FETCH_HEAD
Updating 3e4f123..8a9b012
Fast-forward
 feature.js | 15 +++++++++++++++
 1 file changed, 15 insertions(+)
```

### Pull with rebase instead of merge

```console
$ git pull --rebase origin main
From https://github.com/user/repo
 * branch            main       -> FETCH_HEAD
Successfully rebased and updated refs/heads/main.
```

## Tips:

### Always commit or stash changes before pulling

Make sure your working directory is clean before running `git pull` to avoid conflicts with uncommitted changes.

### Use `--rebase` for cleaner history

Using `git pull --rebase` creates a linear history without merge commits, which can make the commit history easier to follow.

### Configure default pull behavior

You can set your default pull strategy with:
```console
$ git config --global pull.rebase true  # For rebase
$ git config --global pull.ff only      # For fast-forward only
```

### Check what will be pulled first

Use `git fetch` followed by `git log HEAD..origin/main` to see what changes will be pulled before actually pulling them.

## Frequently Asked Questions

#### Q1. What's the difference between `git pull` and `git fetch`?
A. `git fetch` only downloads new data from a remote repository but doesn't integrate changes into your working files. `git pull` does both: it fetches and then automatically merges or rebases.

#### Q2. How do I undo a git pull?
A. You can use `git reset --hard ORIG_HEAD` to undo the last pull and reset your branch to where it was before pulling.

#### Q3. Why am I getting merge conflicts when pulling?
A. Conflicts occur when the same part of a file has been modified both remotely and locally. You need to resolve these conflicts manually by editing the conflicted files.

#### Q4. How can I pull without merging?
A. Use `git fetch` instead of `git pull` to download changes without merging them.

#### Q5. What does "fast-forward" mean in git pull?
A. A fast-forward merge happens when the current branch's pointer can simply be moved forward to point to the incoming commit, without needing to create a merge commit.

## References

https://git-scm.com/docs/git-pull

## Revisions

- 2025/05/05 First revision