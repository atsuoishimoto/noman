# git コマンド

ソフトウェア開発中のソースコードの変更を追跡するための分散型バージョン管理システムです。

## 概要

Gitは分散型バージョン管理システムで、複数の開発者が同時にプロジェクトに取り組むことを可能にします。ファイルの変更を追跡し、修正の履歴を維持し、異なるソースからの変更をマージできるようにすることでコラボレーションを促進します。Gitは主にローカルリポジトリを通じて動作し、リモートリポジトリと同期する機能を持っています。

## オプション

### **--version**

インストールされているGitのバージョンを表示します。

```console
$ git --version
git version 2.39.2
```

### **--help**

GitまたはGitの特定のコマンドに関するヘルプ情報を表示します。

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

指定されたパスで起動されたかのようにGitを実行します。

```console
$ git -C /path/to/repo status
On branch main
Your branch is up to date with 'origin/main'.
```

### **-c \<name\>=\<value\>**

コマンドの実行中のみ有効な設定変数を設定します。

```console
$ git -c user.name="Temporary User" commit -m "Temporary commit"
[main 1a2b3c4] Temporary commit
 1 file changed, 2 insertions(+)
```

## 使用例

### リポジトリの初期化

```console
$ git init
Initialized empty Git repository in /path/to/project/.git/
```

### リポジトリのクローン

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

### 基本的なワークフロー

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

### ステータスと履歴の確認

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

## ヒント

### よく使うコマンドにエイリアスを設定する

頻繁に使用するコマンドにエイリアスを設定して時間を節約しましょう：

```console
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
```

### 変更を一時的に退避する

ブランチを切り替える必要があるがまだコミットする準備ができていない場合：

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

### 履歴をクリーンにするためのインタラクティブリベースを使用する

プッシュする前にコミットを結合、編集、または並べ替えます：

```console
$ git rebase -i HEAD~3
```

### .gitignoreファイルを作成する

不要なファイルが追跡されるのを防ぎます：

```console
$ echo "node_modules/" > .gitignore
$ echo "*.log" >> .gitignore
$ git add .gitignore
$ git commit -m "Add gitignore file"
```

## よくある質問

#### Q1. 最後のコミットを取り消すにはどうすればよいですか？
A. 変更を保持したまま最後のコミットを取り消すには `git reset HEAD~1` を使用し、変更を完全に破棄するには `git reset --hard HEAD~1` を使用します。

#### Q2. 新しいブランチを作成するにはどうすればよいですか？
A. `git branch ブランチ名` でブランチを作成し、`git checkout ブランチ名` で切り替えるか、`git checkout -b ブランチ名` で両方を一度に行います。

#### Q3. ブランチをマージするにはどうすればよいですか？
A. まず `git checkout main` でターゲットブランチをチェックアウトし、次に `git merge 機能ブランチ` で機能ブランチからの変更をマージします。

#### Q4. マージの競合を解決するにはどうすればよいですか？
A. 競合が発生した場合、競合したファイルを編集して差異を解決し、`git add` で解決したファイルを追加し、`git commit` でマージを完了します。

#### Q5. ローカルリポジトリをリモートの変更で更新するにはどうすればよいですか？
A. リモートの変更をフェッチしてマージするには `git pull` を使用するか、より制御したい場合は `git fetch` の後に `git merge` を使用します。

## 参考文献

https://git-scm.com/docs

## 改訂履歴

- 2025/05/05 初版