# git stash コマンド

変更を一時的に保存し、コミットせずに変更を保存するためのコマンドです。

## 概要

`git stash`は、ローカルの変更を保存し、作業ディレクトリをHEADコミットと一致するように戻します。現在の作業をコミットする準備ができていないけれどブランチを切り替える必要がある場合や、未完成の作業をコミットせずに緊急の修正を適用する必要がある場合に便利です。

## オプション

### **stash**

ローカルの変更を新しいスタッシュエントリに保存し、HEADに戻します

```console
$ git stash
Saved working directory and index state WIP on main: 2d4e15a Updated README
```

### **save [メッセージ]**

カスタムメッセージを付けてローカルの変更を保存します

```console
$ git stash save "機能Xの作業中"
Saved working directory and index state On main: 機能Xの作業中
```

### **list**

保存したすべてのスタッシュを一覧表示します

```console
$ git stash list
stash@{0}: WIP on main: 2d4e15a Updated README
stash@{1}: On feature-branch: Implementing new login form
```

### **show [stash]**

スタッシュに記録された変更を差分として表示します

```console
$ git stash show
 index.html | 2 +-
 style.css  | 5 +++++
 2 files changed, 6 insertions(+), 1 deletion(-)
```

### **pop [stash]**

スタッシュを適用し、スタッシュリストから削除します

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

スタッシュをスタッシュリストから削除せずに適用します

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

スタッシュリストからスタッシュを削除します

```console
$ git stash drop stash@{0}
Dropped stash@{0} (32b3aa1d185dfe6d57b3c3cc3e3f31b61a97ec2c)
```

### **clear**

すべてのスタッシュエントリを削除します

```console
$ git stash clear
```

### **-u, --include-untracked**

未追跡ファイルをスタッシュに含めます

```console
$ git stash -u
Saved working directory and index state WIP on main: 2d4e15a Updated README
```

### **-a, --all**

未追跡ファイルと無視されたファイルの両方をスタッシュに含めます

```console
$ git stash -a
Saved working directory and index state WIP on main: 2d4e15a Updated README
```

## 使用例

### 更新をプルする前に変更をスタッシュする

```console
$ git stash
Saved working directory and index state WIP on main: 2d4e15a Updated README
$ git pull
$ git stash pop
```

### スタッシュからブランチを作成する

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

### 特定のファイルをスタッシュする

```console
$ git stash push -m "CSSファイルのみをスタッシュ" -- *.css
Saved working directory and index state On main: CSSファイルのみをスタッシュ
```

## ヒント

### 説明的なメッセージを使用する

後でスタッシュを識別しやすくするために、常に`git stash save "メッセージ"`で説明的なメッセージを使用しましょう。

### スタッシュの内容を適用前に確認する

`git stash show -p stash@{n}`を使用して、スタッシュを適用する前に完全な差分を確認しましょう。

### スタッシュからブランチを作成する

スタッシュした変更を独自のブランチに含めるべきだと気づいた場合は、`git stash branch <ブランチ名> [stash]`を使用して、スタッシュした変更を適用した新しいブランチを作成できます。

### 部分的なスタッシュ

`git stash -p`（または`--patch`）を使用して、スタッシュする変更を対話的に選択し、作業ディレクトリに一部の変更を残すことができます。

## よくある質問

#### Q1. ブランチを切り替えるとスタッシュはどうなりますか？
A. スタッシュはブランチとは別に保存され、どのブランチにいても引き続きアクセスできます。

#### Q2. スタッシュはどれくらい長く保持されますか？
A. スタッシュは明示的に削除するか、スタッシュリストをクリアするまで無期限に保持されます。

#### Q3. 削除したスタッシュを復元できますか？
A. はい、スタッシュのコミットID（削除時に表示される）がわかっていれば、gitのreflogの有効期限内であれば`git stash apply <コミットID>`を使用して復元できます。

#### Q4. 特定のファイルだけをスタッシュするにはどうすればよいですか？
A. `git stash push [--] [<パス指定>...]`を使用して特定のファイルをスタッシュできます。例：`git stash push -- file1.txt file2.js`

#### Q5. `pop`と`apply`の違いは何ですか？
A. `pop`はスタッシュを適用してスタッシュリストから削除しますが、`apply`はスタッシュを適用するだけでスタッシュリストには残します。

## 参考資料

https://git-scm.com/docs/git-stash

## 改訂履歴

- 2025/05/05 初版