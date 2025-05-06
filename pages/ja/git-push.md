# git push コマンド

リモートレフを関連するオブジェクトと共に更新します。

## 概要

`git push` はローカルのコミットをリモートリポジトリに送信します。リモートブランチをローカルブランチと一致するように更新し、更新を完了するために必要なすべてのオブジェクトをアップロードします。このコマンドは、変更を他の人と共有したり、作業をリモートリポジトリにバックアップしたりするために不可欠です。

## オプション

### **-u, --set-upstream**

現在のブランチのアップストリームを設定し、追跡関係を確立します。

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

リモートブランチの状態を上書きして強制的に更新します。データ損失を引き起こす可能性があるため、細心の注意を払って使用してください。

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

すべてのブランチをリモートリポジトリにプッシュします。

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

すべてのタグをリモートリポジトリにプッシュします。

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

指定したリモートブランチを削除します。

```console
$ git push -d origin feature-branch
To github.com:username/repository.git
 - [deleted]         feature-branch
```

## 使用例

### デフォルトのリモートにプッシュする

```console
$ git push
Everything up-to-date
```

### 特定のブランチを特定のリモートにプッシュする

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

### 異なるリモートブランチ名にプッシュする

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

## ヒント:

### 追跡ブランチの設定

新しいブランチを作成する際は、`git push -u origin branch-name` を使用して追跡を設定しましょう。これにより、毎回リモートとブランチを指定せずに `git pull` や `git push` を使用できるようになります。

### `--force` の代わりに `--force-with-lease` を使用する

`--force-with-lease` は `--force` よりも安全です。まだ見ていない他の人の変更を上書きしないことを保証します。リモートブランチが予期した状態にある場合にのみプッシュを強制します。

### 特定のタグのみをプッシュする

`--tags` ですべてのタグをプッシュする代わりに、`git push origin tag-name` を使用して特定のタグをプッシュできます。

### 強制プッシュする前に確認する

強制プッシュする前に、必ず `git log origin/branch..branch` を実行して、リモートで上書きしようとしているコミットを確認しましょう。

## よくある質問

#### Q1. `git push` と `git push origin main` の違いは何ですか？
A. `git push` は、設定されている場合、現在のブランチをそのアップストリームブランチにプッシュします。`git push origin main` は、現在のブランチに関係なく、ローカルの main ブランチを origin リモートの main ブランチに明示的にプッシュします。

#### Q2. 新しいローカルブランチをリモートリポジトリにプッシュするにはどうすればよいですか？
A. `git push -u origin branch-name` を使用して、新しいブランチを作成してプッシュし、同時に追跡を設定します。

#### Q3. プッシュ時に「rejected」エラーが発生します。どうすればよいですか？
A. これは通常、リモートにローカルにない変更があることを意味します。まず `git pull` を実行して変更を統合し、コンフリクトがあれば解決してから、再度プッシュしてください。

#### Q4. プッシュを元に戻すにはどうすればよいですか？
A. `git revert` で変更を元に戻してそのリバートをプッシュするか、以前のコミットにリセットした後に `git push -f` を使用します（注意して使用してください）。

#### Q5. 「non-fast-forward updates were rejected」とはどういう意味ですか？
A. ローカルリポジトリがリモートより古いことを意味します。プッシュする前に最新の変更を取得する必要があります。または、リモートを上書きしたい場合は `--force` を使用します（共有ブランチでは推奨されません）。

## 参考文献

https://git-scm.com/docs/git-push

## 改訂履歴

- 2025/05/05 初版