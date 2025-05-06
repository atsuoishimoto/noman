# git push command

Update remote refs along with associated objects.

## Overview

`git push` sends local commits to a remote repository. It updates the remote branch to match your local branch, uploading all necessary objects to complete the update. This command is essential for sharing your changes with others or backing up your work to a remote repository.

## Options

### **-u, --set-upstream**

Set upstream for the current branch, establishing a tracking relationship.

```console
$ git push -u origin main
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 294 bytes | 294.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To github.com:username/repository.git
   a1b2c3d..e4f5g6h  main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### **-f, --force**

Force update the remote branch, overriding its state. Use with extreme caution as it can cause data loss.

```console
$ git push -f origin main
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 294 bytes | 294.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To github.com:username/repository.git
 + a1b2c3d...e4f5g6h main -> main (forced update)
```

### **--all**

Push all branches to the remote repository.

```console
$ git push --all origin
Enumerating objects: 8, done.
Counting objects: 100% (8/8), done.
Delta compression using up to 8 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 584 bytes | 584.00 KiB/s, done.
Total 6 (delta 4), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
To github.com:username/repository.git
   a1b2c3d..e4f5g6h  main -> main
   b2c3d4e..f5g6h7i  feature -> feature
```

### **--tags**

Push all tags to the remote repository.

```console
$ git push --tags origin
Enumerating objects: 1, done.
Counting objects: 100% (1/1), done.
Writing objects: 100% (1/1), 160 bytes | 160.00 KiB/s, done.
Total 1 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:username/repository.git
 * [new tag]         v1.0.0 -> v1.0.0
 * [new tag]         v1.1.0 -> v1.1.0
```

### **-d, --delete**

Delete the specified remote branch.

```console
$ git push -d origin feature-branch
To github.com:username/repository.git
 - [deleted]         feature-branch
```

## Usage Examples

### Pushing to the default remote

```console
$ git push
Everything up-to-date
```

### Pushing a specific branch to a specific remote

```console
$ git push origin feature-branch
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 294 bytes | 294.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To github.com:username/repository.git
   a1b2c3d..e4f5g6h  feature-branch -> feature-branch
```

### Pushing to a different remote branch name

```console
$ git push origin local-branch:remote-branch
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 294 bytes | 294.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To github.com:username/repository.git
   a1b2c3d..e4f5g6h  local-branch -> remote-branch
```

## Tips:

### Set Up Tracking Branches

When creating a new branch, use `git push -u origin branch-name` to set up tracking. This allows you to use `git pull` and `git push` without specifying the remote and branch each time.

### Use `--force-with-lease` Instead of `--force`

`--force-with-lease` is safer than `--force` as it ensures you don't overwrite others' changes that you haven't seen yet. It only forces the push if the remote branch is in the state you expect.

### Push Only Specific Tags

Instead of pushing all tags with `--tags`, you can push a specific tag using `git push origin tag-name`.

### Verify Before Force Pushing

Always run `git log origin/branch..branch` before force pushing to see what commits you're about to overwrite on the remote.

## Frequently Asked Questions

#### Q1. What's the difference between `git push` and `git push origin main`?
A. `git push` pushes the current branch to its upstream branch if configured. `git push origin main` explicitly pushes the local main branch to the main branch on the origin remote, regardless of the current branch.

#### Q2. How do I push a new local branch to a remote repository?
A. Use `git push -u origin branch-name` to create and push a new branch while setting up tracking.

#### Q3. I get a "rejected" error when pushing. What should I do?
A. This usually means the remote has changes you don't have locally. Run `git pull` first to integrate those changes, resolve any conflicts, and then push again.

#### Q4. How can I undo a push?
A. You can revert the changes with `git revert` and push the revert, or use `git push -f` after resetting to an earlier commit (use with caution).

#### Q5. What does "non-fast-forward updates were rejected" mean?
A. It means your local repository is behind the remote. You need to pull the latest changes before pushing, or use `--force` if you're certain you want to overwrite the remote (not recommended for shared branches).

## References

https://git-scm.com/docs/git-push

## Revisions

- 2025/05/05 First revision