# git merge コマンド

異なるブランチからの変更を現在のブランチに統合します。

## 概要

`git merge` は、1つ以上のブランチからの変更を現在のブランチに統合します。これは一般的に、開発ブランチから完成した機能をメインブランチに取り込んだり、メインブランチの最新の変更を機能ブランチに取り込んだりするために使用されます。このコマンドは、高速前進（fast-forward）マージでない限り、マージされた状態を表す新しいコミットを作成します。

## オプション

### **--ff**

可能な場合は高速前進マージを実行します（デフォルトの動作）。

```console
$ git merge feature-branch
Updating 5ab1c2d..8ef9a0b
Fast-forward
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

### **--no-ff**

高速前進マージが可能な場合でも、マージコミットを作成します。

```console
$ git merge --no-ff feature-branch
Merge made by the 'recursive' strategy.
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

### **--squash**

指定されたブランチからのすべての変更を単一の変更セットにまとめ、それを別途コミットできるようにします。

```console
$ git merge --squash feature-branch
Squash commit -- not updating HEAD
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

### **-m, --message**

マージコミットのコミットメッセージを設定します。

```console
$ git merge -m "Merge feature X into main" feature-branch
Merge made by the 'recursive' strategy.
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

### **--abort**

現在のマージを中止し、マージ前の状態に戻します。

```console
$ git merge feature-branch
Auto-merging file.txt
CONFLICT (content): Merge conflict in file.txt
Automatic merge failed; fix conflicts and then commit the result.

$ git merge --abort
```

### **--continue**

コンフリクトが解決された後にマージを続行します。

```console
$ git merge --continue
```

### **-s, --strategy**

使用するマージ戦略を指定します。

```console
$ git merge -s recursive feature-branch
Merge made by the 'recursive' strategy.
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

## 使用例

### 基本的なブランチのマージ

```console
$ git checkout main
Switched to branch 'main'

$ git merge feature-branch
Updating 5ab1c2d..8ef9a0b
Fast-forward
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

### マージコミットの作成

```console
$ git checkout main
Switched to branch 'main'

$ git merge --no-ff feature-branch
Merge made by the 'recursive' strategy.
 file.txt | 2 ++
 1 file changed, 2 insertions(+)
```

### ブランチからのコミットのスカッシュ

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

### マージコンフリクトの解決

```console
$ git merge feature-branch
Auto-merging file.txt
CONFLICT (content): Merge conflict in file.txt
Automatic merge failed; fix conflicts and then commit the result.

# コンフリクトしたファイルを編集して解決する

$ git add file.txt
$ git merge --continue
# または代わりに: git commit
```

## ヒント

### 高速前進マージの理解

高速前進マージは、ターゲットブランチの履歴がソースブランチの直接的な延長である場合に発生します。Gitは単にポインタを前方に移動させるだけで、マージコミットを作成しません。より良い履歴追跡のために `--no-ff` を使用して、マージコミットを強制することができます。

### マージのプレビュー

マージを実行する前に、`git diff <branch>` を使用してマージされる変更をプレビューするか、`git merge --no-commit --no-ff <branch>` を使用してコミットせずにマージをステージングし、結果を検査できるようにします。

### マージコンフリクトの処理

コンフリクトが発生すると、Gitは影響を受けるファイルにマークを付けます。これらのファイルを編集してコンフリクトを解決し、`git add` を使用して解決済みとマークし、最後に `git merge --continue` または `git commit` を使用してマージを完了します。

### マージ戦略の使用

複雑なマージの場合は、`-s` で異なる戦略を使用することを検討してください。デフォルトの `recursive` 戦略はほとんどの場合うまく機能しますが、一方の側の変更を優先したい場合は `ours` または `theirs` が役立つことがあります。

## よくある質問

#### Q1. マージとリベースの違いは何ですか？
A. マージは両方のブランチからの変更を組み合わせた新しいコミットを作成し、ブランチの履歴を保持します。リベースはブランチのコミットをターゲットブランチの上に再生し、線形の履歴を作成しますが、コミット履歴を書き換えます。

#### Q2. マージを元に戻すにはどうすればよいですか？
A. マージをプッシュしていない場合は、`git reset --hard HEAD~1` を使用して最後のコミットを元に戻します。すでにプッシュしている場合は、`git revert -m 1 <merge-commit-hash>` を使用してマージを元に戻す新しいコミットを作成することを検討してください。

#### Q3. 高速前進マージとは何ですか？
A. 高速前進マージは、マージされるブランチが作成されてから現在のブランチに新しいコミットがない場合に発生します。Gitは単にブランチポインタをマージされるブランチの最新のコミットに前進させるだけです。

#### Q4. 別のブランチから特定のファイルだけをマージするにはどうすればよいですか？
A. `git checkout <branch-name> -- <file-path>` を使用して別のブランチから特定のファイルを取得し、それらの変更をコミットします。

## 参考文献

https://git-scm.com/docs/git-merge

## 改訂履歴

- 2025/05/05 初版