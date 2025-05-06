# git reset コマンド

現在のHEADを指定した状態にリセットします。

## 概要

`git reset`は、HEADと現在のブランチを別のコミットに移動させることで変更を元に戻すために使用されます。また、ステージングエリア（インデックス）を変更し、オプションで作業ディレクトリも変更できるため、コミットの取り消し、ファイルのアンステージ、または変更の完全な破棄が可能です。

## オプション

### **--soft**

HEADを指定したコミットにリセットしますが、ステージングエリアと作業ディレクトリは変更しません。

```console
$ git reset --soft HEAD~1
```

### **--mixed**

デフォルトモード。HEADとステージングエリアをリセットしますが、作業ディレクトリは変更しません。

```console
$ git reset HEAD~1
```

### **--hard**

HEAD、ステージングエリア、作業ディレクトリを指定したコミットに一致するようにリセットします。

```console
$ git reset --hard HEAD~1
```

### **-p, --patch**

リセットする変更の塊を対話的に選択します。

```console
$ git reset -p
```

### **<commit>**

リセット先のコミット。コミットハッシュ、ブランチ名、タグ、または相対参照が使用できます。

```console
$ git reset abc123f
```

## 使用例

### ファイルのアンステージ

```console
$ git add file.txt
$ git reset file.txt
Unstaged changes after reset:
M       file.txt
```

### 最後のコミットを取り消すが、変更はステージングされたままにする

```console
$ git reset --soft HEAD~1
```

### 最後の3つのコミットを完全に破棄する

```console
$ git reset --hard HEAD~3
HEAD is now at 1a2b3c4 Previous commit message
```

### 特定のコミットにリセットする

```console
$ git reset --mixed 1a2b3c4
Unstaged changes after reset:
M       file1.txt
M       file2.txt
```

## ヒント:

### コミットの修正には `--soft` を使用する

最後のコミットにさらに変更を追加したり、コミットメッセージを変更したりしたい場合は、`git reset --soft HEAD~1`を使用してコミットを取り消しつつ、すべての変更をステージングされたままにします。

### ハードリセットからの復旧

誤って`--hard`でリセットした場合、`git reflog`を使用してリセット元のコミットを見つけ、そのコミットハッシュに`git reset --hard`することで復旧できることが多いです。

### 3つのリセットモードを理解する

3つのリセットモードは影響レベルとして考えてください：
- `--soft`：HEADのみを移動（最も安全）
- `--mixed`：HEADを移動し、ステージングエリアを更新
- `--hard`：HEAD、ステージングエリア、作業ディレクトリを更新（最も破壊的）

### ブランチの切り替えには `git reset` ではなく `git checkout` を使用する

別のブランチに切り替える場合は、`git reset`よりも`git switch`または`git checkout`を使用してください。リセットを使用してブランチを切り替えると、予期しない結果になる可能性があります。

## よくある質問

#### Q1. `git reset`と`git revert`の違いは何ですか？
A. `git reset`はHEADを以前のコミットに移動させて履歴を変更しますが、`git revert`は以前のコミットの変更を元に戻す新しいコミットを作成し、履歴を保持します。

#### Q2. `git reset --hard`を元に戻すにはどうすればよいですか？
A. `git reflog`を使用してリセット前のコミットハッシュを見つけ、`git reset --hard <commit-hash>`を使用してその状態に戻ります。

#### Q3. すべてのファイルをアンステージするにはどうすればよいですか？
A. 引数なしで`git reset`を使用すると、すべてのファイルがアンステージされます。

#### Q4. 特定のファイルだけをリセットできますか？
A. はい、`git reset <filename>`を使用して特定のファイルをアンステージしたり、`git reset -p`を使用してアンステージするファイルの一部を対話的に選択したりできます。

## 参考資料

https://git-scm.com/docs/git-reset

## 改訂履歴

- 2025/05/05 初版