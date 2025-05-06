# git commit コマンド

リポジトリに変更を記録し、ステージングされたコンテンツを新しいコミットとして保存します。

## 概要

`git commit` コマンドは、プロジェクトの現在ステージングされている変更のスナップショットを取得します。コミットされたスナップショットはプロジェクトの「安全な」バージョンであり、明示的に指示されない限りGitが変更することはありません。`git commit` を実行する前に、`git add` を使用してコミットに含めたい変更をステージングする必要があります。

## オプション

### **-m, --message=<msg>**

エディタを起動する代わりに、指定されたメッセージをコミットメッセージとして使用します。

```console
$ git commit -m "新機能を追加"
[main 5d6e7f8] 新機能を追加
 1 file changed, 10 insertions(+), 2 deletions(-)
```

### **-a, --all**

コミットする前に、変更されたファイルと削除されたファイルを自動的にステージングします（未追跡のファイルは含まれません）。

```console
$ git commit -a -m "既存ファイルを更新"
[main 1a2b3c4] 既存ファイルを更新
 2 files changed, 15 insertions(+), 5 deletions(-)
```

### **--amend**

前回のコミットと同じログメッセージを使用して新しいコミットを作成し、現在のブランチの先端を置き換えます。

```console
$ git commit --amend -m "前回のコミットメッセージを修正"
[main 7f8e9d6] 前回のコミットメッセージを修正
 Date: Mon May 5 10:30:45 2025 -0700
 1 file changed, 10 insertions(+), 2 deletions(-)
```

### **-v, --verbose**

コミットメッセージエディタにコミットされる変更の差分を表示します。

```console
$ git commit -v
# 差分を含むコミットテンプレートでエディタが開く
```

### **--no-verify**

pre-commitとcommit-msgフックをバイパスします。

```console
$ git commit --no-verify -m "緊急修正"
[main 3e4f5d6] 緊急修正
 1 file changed, 3 insertions(+)
```

## 使用例

### 標準的なコミットの作成

```console
$ git add file1.txt file2.txt
$ git commit -m "新しいファイルを追加しドキュメントを更新"
[main 1a2b3c4] 新しいファイルを追加しドキュメントを更新
 2 files changed, 25 insertions(+), 0 deletions(-)
 create mode 100644 file1.txt
 create mode 100644 file2.txt
```

### 新しい変更で前回のコミットを修正

```console
$ git add forgotten_file.txt
$ git commit --amend
[main 1a2b3c4] 新しいファイルを追加しドキュメントを更新
 3 files changed, 30 insertions(+), 0 deletions(-)
 create mode 100644 file1.txt
 create mode 100644 file2.txt
 create mode 100644 forgotten_file.txt
```

### 空のコミットの作成

```console
$ git commit --allow-empty -m "CIビルドをトリガー"
[main 9d8c7b6] CIビルドをトリガー
```

## ヒント:

### 意味のあるコミットメッセージを書く

良いコミットメッセージは、何が変更されたかだけでなく、なぜ変更されたかを説明すべきです。現在形（「機能を追加する」であり「機能を追加した」ではない）を使用し、最初の行は50文字以内に収め、必要に応じて空行を挟んでより詳細な説明を続けます。

### アトミックコミットを使用する

各コミットは単一の変更に焦点を当てた論理的な作業単位にしましょう。これにより、後で変更を理解、レビュー、そして潜在的に元に戻すことが容易になります。

### コミットする内容を確認する

コミットする前に、`git status` を使用してどのファイルがステージングされているかを確認し、`git diff --staged` を使用してコミットされる正確な変更を確認しましょう。

### コミットに署名する

セキュリティに敏感なプロジェクトでは、`git commit -S` を使用してコミットに暗号的に署名し、あなたが作者であることを検証することを検討してください。

## よくある質問

#### Q1. 最後のコミットを取り消すにはどうすればよいですか？
A. 変更をステージングしたまま取り消すには `git reset HEAD~1` を使用し、変更を完全に破棄するには `git reset --hard HEAD~1` を使用します。

#### Q2. プッシュ後にコミットメッセージを変更するにはどうすればよいですか？
A. `git commit --amend` でメッセージを変更し、その後 `git push --force` でリモートを更新します（共有ブランチでは注意して使用してください）。

#### Q3. `git commit` と `git commit -a` の違いは何ですか？
A. `git commit` は `git add` でステージングされた変更のみをコミットしますが、`git commit -a` は変更および削除された追跡ファイルを自動的にステージングしてコミットします。

#### Q4. ファイルの変更の一部だけをコミットできますか？
A. はい、`git add -p` を使用して、コミット前にステージングする変更を対話的に選択できます。

## 参考文献

https://git-scm.com/docs/git-commit

## 改訂履歴

- 2025/05/05 初版