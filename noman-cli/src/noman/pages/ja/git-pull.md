# git pull コマンド

リモートリポジトリやローカルブランチから変更を取得して統合します。

## 概要

`git pull` は、リモートリポジトリから変更を取得し、現在のブランチに統合するコマンドです。基本的には `git fetch` の後に `git merge` または `git rebase`（設定による）を実行することと同じです。このコマンドは、他の人が行った変更でローカルリポジトリを更新するために一般的に使用されます。

## オプション

### **--all**

すべてのリモートから取得します。

```console
$ git pull --all
Fetching origin
Updating 3e4f123..8a9b012
Fast-forward
 README.md | 5 +++++
 1 file changed, 5 insertions(+)
```

### **-r, --rebase[=false|true|merges|interactive]**

取得後、マージする代わりに現在のブランチをアップストリームブランチの上にリベースします。

```console
$ git pull --rebase
Successfully rebased and updated refs/heads/main.
```

### **-v, --verbose**

より詳細な情報を表示します。

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

マージがfast-forwardで解決できる場合、マージコミットを作成せずにブランチポインタのみを更新します。--no-ffを使用すると、マージがfast-forwardで解決できる場合でもマージコミットを作成します。

```console
$ git pull --no-ff
From https://github.com/user/repo
 * branch            main       -> FETCH_HEAD
Merge made by the 'recursive' strategy.
 README.md | 5 +++++
 1 file changed, 5 insertions(+)
```

### **--ff-only**

fast-forwardが可能な場合のみ実行します。不可能な場合は、非ゼロステータスで終了します。

```console
$ git pull --ff-only
fatal: Not possible to fast-forward, aborting.
```

### **-q, --quiet**

静かに実行します。エラーのみを報告します。

```console
$ git pull -q
```

## 使用例

### 基本的なoriginからのpull

```console
$ git pull
From https://github.com/user/repo
 * branch            main       -> FETCH_HEAD
Updating 3e4f123..8a9b012
Fast-forward
 README.md | 5 +++++
 1 file changed, 5 insertions(+)
```

### 特定のリモートとブランチからpull

```console
$ git pull upstream feature-branch
From https://github.com/upstream/repo
 * branch            feature-branch -> FETCH_HEAD
Updating 3e4f123..8a9b012
Fast-forward
 feature.js | 15 +++++++++++++++
 1 file changed, 15 insertions(+)
```

### マージの代わりにリベースを使用したpull

```console
$ git pull --rebase origin main
From https://github.com/user/repo
 * branch            main       -> FETCH_HEAD
Successfully rebased and updated refs/heads/main.
```

## ヒント:

### pullする前に変更をコミットまたはスタッシュする

コミットされていない変更との競合を避けるため、`git pull`を実行する前に作業ディレクトリがクリーンであることを確認してください。

### クリーンな履歴のために`--rebase`を使用する

`git pull --rebase`を使用すると、マージコミットなしの線形的な履歴が作成され、コミット履歴が追いやすくなります。

### デフォルトのpull動作を設定する

デフォルトのpull戦略を以下のように設定できます：
```console
$ git config --global pull.rebase true  # リベース用
$ git config --global pull.ff only      # fast-forwardのみ
```

### 先に何がpullされるかを確認する

実際にpullする前に、`git fetch`の後に`git log HEAD..origin/main`を使用して、どの変更がpullされるかを確認できます。

## よくある質問

#### Q1. `git pull`と`git fetch`の違いは何ですか？
A. `git fetch`はリモートリポジトリから新しいデータをダウンロードするだけで、作業ファイルに変更を統合しません。`git pull`は両方を行います：取得した後、自動的にマージまたはリベースします。

#### Q2. git pullを元に戻すにはどうすればよいですか？
A. `git reset --hard ORIG_HEAD`を使用して、最後のpullを元に戻し、ブランチをpull前の状態にリセットできます。

#### Q3. pullするときにマージ競合が発生するのはなぜですか？
A. 競合は、ファイルの同じ部分がリモートとローカルの両方で変更された場合に発生します。競合したファイルを手動で編集して、これらの競合を解決する必要があります。

#### Q4. マージせずにpullするにはどうすればよいですか？
A. `git pull`の代わりに`git fetch`を使用して、マージせずに変更をダウンロードします。

#### Q5. git pullでの「fast-forward」とは何ですか？
A. fast-forwardマージは、現在のブランチのポインタを単に前方に移動して、マージコミットを作成する必要なく、入ってくるコミットを指すようにできる場合に発生します。

## 参考文献

https://git-scm.com/docs/git-pull

## 改訂履歴

- 2025/05/05 初版