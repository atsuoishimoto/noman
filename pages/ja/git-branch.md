# git-branch コマンド

Gitリポジトリ内のブランチを一覧表示、作成、または削除します。

## 概要

`git branch`コマンドはGitリポジトリ内のブランチを管理します。新しいブランチの作成、既存ブランチの一覧表示、ブランチの名前変更、不要になったブランチの削除が可能です。ブランチはコミットへの軽量なポインタであり、並行開発ワークフローを可能にします。

## オプション

### **-a, --all**

リモート追跡ブランチとローカルブランチの両方を一覧表示します。

```console
$ git branch -a
* main
  feature-login
  remotes/origin/main
  remotes/origin/feature-login
```

### **-d, --delete**

ブランチを削除します。ブランチは上流ブランチ、または上流が設定されていない場合はHEADに完全にマージされている必要があります。

```console
$ git branch -d feature-done
Deleted branch feature-done (was 3e563c4).
```

### **-D**

マージされていない変更が含まれていても、ブランチを強制的に削除します。

```console
$ git branch -D feature-incomplete
Deleted branch feature-incomplete (was 7d9f12a).
```

### **-m, --move**

ブランチとそのreflogを移動/名前変更します。

```console
$ git branch -m old-name new-name
```

### **-r, --remotes**

リモート追跡ブランチのみを一覧表示します。

```console
$ git branch -r
  origin/main
  origin/feature-login
  origin/dev
```

### **-v, --verbose**

各ブランチのSHA-1とコミットの件名行を表示します。

```console
$ git branch -v
* main       a72f324 Update README.md
  feature-ui 8d3e5c1 Add new button component
```

### **--merged**

現在のブランチにマージされたブランチを一覧表示します。

```console
$ git branch --merged
* main
  feature-complete
```

### **--no-merged**

現在のブランチにマージされていないブランチを一覧表示します。

```console
$ git branch --no-merged
  feature-in-progress
  experimental
```

## 使用例

### 新しいブランチの作成

```console
$ git branch new-feature
$ git branch
* main
  new-feature
```

### 新しいブランチの作成と切り替え

```console
$ git branch feature-login
$ git checkout feature-login
Switched to branch 'feature-login'

# または git checkout -b でより簡潔に
$ git checkout -b feature-login
Switched to a new branch 'feature-login'
```

### 複数のブランチの削除

```console
$ git branch -d feature-1 feature-2 feature-3
Deleted branch feature-1 (was 3e563c4).
Deleted branch feature-2 (was 7d9f12a).
Deleted branch feature-3 (was 2f5e8b9).
```

### より詳細な情報付きでブランチを一覧表示

```console
$ git branch -vv
* main            a72f324 [origin/main] Update README.md
  feature-ui      8d3e5c1 [origin/feature-ui: ahead 2] Add new button component
  feature-api     3f5d9a2 [origin/feature-api: behind 3] Implement API client
```

## ヒント

### 説明的なブランチ名を使用する

ブランチの目的を示す明確で説明的なブランチ名を使用しましょう。例えば、`feature/login`、`bugfix/header`、`refactor/auth-system`などです。

### マージされたブランチをクリーンアップする

リポジトリをきれいに保つために、マージされたブランチを定期的に削除しましょう：
```console
$ git branch --merged | grep -v "\*" | xargs git branch -d
```

### リモートブランチを追跡する

リモートブランチを操作する場合は、`git branch --track branch-name origin/branch-name`を使用して追跡を設定するか、より簡単に`git checkout --track origin/branch-name`を使用します。

### ブランチの履歴を表示する

特定のブランチのコミット履歴を確認するには、以下を使用します：
```console
$ git log branch-name
```

## よくある質問

#### Q1. 新しいブランチを作成するにはどうすればよいですか？
A. `git branch ブランチ名`でブランチを作成し、`git checkout ブランチ名`で切り替えます。または、`git checkout -b ブランチ名`を使用して、一度に作成と切り替えを行うこともできます。

#### Q2. ブランチを削除するにはどうすればよいですか？
A. マージされたブランチを削除するには`git branch -d ブランチ名`を使用し、マージ状態に関係なくブランチを強制的に削除するには`git branch -D ブランチ名`を使用します。

#### Q3. ブランチの名前を変更するにはどうすればよいですか？
A. `git branch -m 古い名前 新しい名前`を使用してブランチの名前を変更します。名前を変更したいブランチに現在いる場合は、単に`git branch -m 新しい名前`を使用できます。

#### Q4. マージされたブランチを確認するにはどうすればよいですか？
A. 現在のブランチにマージされたブランチを確認するには`git branch --merged`を使用し、まだマージされていないブランチを確認するには`git branch --no-merged`を使用します。

#### Q5. 新しいローカルブランチをリモートリポジトリにプッシュするにはどうすればよいですか？
A. `git push -u origin ブランチ名`を使用して、ローカルブランチをリモートリポジトリにプッシュし、追跡を設定します。

## 参考資料

https://git-scm.com/docs/git-branch

## 改訂履歴

- 2025/05/05 初版