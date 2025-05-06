# git switch コマンド

ブランチの切り替えやワーキングツリーファイルの復元を行います。

## 概要

`git switch` コマンドは、Gitリポジトリでブランチを切り替えるために使用されます。これはGit 2.23で導入され、`git checkout`の特定の用途に対するよりユーザーフレンドリーな代替手段です。`git checkout`が複数の目的を果たすのに対し、`git switch`は特にブランチ操作のために設計されており、コマンド構造がより直感的になっています。

## オプション

### **-c, --create**

新しいブランチを作成して切り替えます。

```console
$ git switch -c feature-login
Switched to a new branch 'feature-login'
```

### **-d, --detach**

デタッチドHEAD状態でコミットに切り替えます。

```console
$ git switch -d 1a2b3c4
Note: switching to '1a2b3c4'.

You are in 'detached HEAD' state...
HEAD is now at 1a2b3c4 Add login functionality
```

### **--discard-changes**

切り替える前にローカルの変更を破棄します。

```console
$ git switch --discard-changes main
Switched to branch 'main'
```

### **-f, --force**

インデックスまたはワーキングツリーがHEADと異なる場合でも強制的に切り替えます。

```console
$ git switch -f main
Switched to branch 'main'
```

### **-m, --merge**

現在のブランチ、ワーキングツリーの内容、および新しいブランチの間で3方向マージを実行します。

```console
$ git switch -m feature-branch
Switched to branch 'feature-branch'
```

### **--orphan**

新しい孤立ブランチ（履歴のないブランチ）を作成します。

```console
$ git switch --orphan new-root
Switched to a new branch 'new-root'
```

### **-t, --track**

新しいブランチを作成する際に、「upstream」設定を行います。

```console
$ git switch -c feature-branch -t origin/feature-branch
Branch 'feature-branch' set up to track remote branch 'feature-branch' from 'origin'.
Switched to a new branch 'feature-branch'
```

### **-**

前のブランチに切り替えます。

```console
$ git switch -
Switched to branch 'main'
```

## 使用例

### 基本的なブランチの切り替え

```console
$ git switch main
Switched to branch 'main'
```

### 新しいブランチの作成と切り替え

```console
$ git switch -c feature-auth
Switched to a new branch 'feature-auth'
```

### リモートブランチへの切り替え

```console
$ git switch feature-branch
Branch 'feature-branch' set up to track remote branch 'feature-branch' from 'origin'.
Switched to a new branch 'feature-branch'
```

### 特定のコミットへの切り替え

```console
$ git switch -d 1a2b3c4
Note: switching to '1a2b3c4'.

You are in 'detached HEAD' state...
HEAD is now at 1a2b3c4 Add login functionality
```

## ヒント:

### `-` を使用してブランチ間をトグルする

ダッシュの省略形（`git switch -`）を使用すると、シェルの `cd -` と同様に、現在のブランチと前のブランチの間を素早く切り替えることができます。

### より良いワークフローのために `git branch` と組み合わせる

切り替える前に利用可能なブランチを確認するには、`git branch` を使用してから `git switch ブランチ名` を実行します。

### ブランチ操作には `checkout` よりも `switch` を優先する

`git switch` は、ブランチ操作に特化して設計されており、より明確なセマンティクスを持っているため、ブランチ操作には `git checkout` よりも直感的です。

### 自動的に追跡ブランチを作成する

ローカルに存在しないリモートブランチに切り替える場合、ブランチ名が単一のリモートに存在すれば、Gitは自動的に追跡ブランチを作成します。

## よくある質問

#### Q1. `git switch` と `git checkout` の違いは何ですか？
A. `git switch` はブランチ操作のみに焦点を当てていますが、`git checkout` はブランチの切り替え、ファイルの復元など、複数の目的を持っています。`git switch` は、より明確で具体的なコマンドを提供するために導入されました。

#### Q2. 新しいブランチを作成して切り替えるにはどうすればよいですか？
A. `git switch -c 新しいブランチ名` を使用して、1つのコマンドで新しいブランチを作成して切り替えることができます。

#### Q3. ブランチを切り替える際にローカルの変更を破棄するにはどうすればよいですか？
A. `git switch --discard-changes ブランチ名` を使用して、切り替える前にローカルの変更を破棄できます。

#### Q4. 前のブランチに戻るにはどうすればよいですか？
A. `git switch -` を使用して、以前にチェックアウトしたブランチに切り替えることができます。

#### Q5. コミットしていない変更がある状態でブランチを切り替えるとどうなりますか？
A. 競合がある場合、Gitは切り替えを防止します。変更をコミットするか、`git stash` で一時保存するか、`--discard-changes` または `--merge` オプションを使用することができます。

## 参考文献

https://git-scm.com/docs/git-switch

## 改訂履歴

- 2025/05/05 初版