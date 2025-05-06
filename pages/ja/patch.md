# patch コマンド

差分ファイルを元のファイルに適用します。

## 概要

`patch` コマンドは、ファイルに変更（パッチ）を適用します。パッチファイル（通常は `diff` コマンドで作成されたもの）を読み込み、対象ファイルを修正してそれらの変更を取り込みます。これは一般的にバグ修正、更新、またはソースコードやテキストファイルの変更を適用するために使用されます。

## オプション

### **-p[num], --strip=[num]**

パッチ内の各ファイル名から、`num` 個の先頭スラッシュを含む最小の接頭辞を削除します。デフォルトは1です。

```console
$ patch -p1 < changes.patch
patching file src/main.c
```

### **-b, --backup**

修正する前に各ファイルのバックアップを作成します。

```console
$ patch -b file.txt < changes.patch
patching file file.txt
```

### **-R, --reverse**

パッチが古いファイルと新しいファイルを入れ替えて作成されたと仮定し、実質的にパッチを逆適用します。

```console
$ patch -R < changes.patch
patching file file.txt
```

### **-i file, --input=file**

標準入力の代わりに指定されたファイルからパッチを読み込みます。

```console
$ patch -i changes.patch
patching file file.txt
```

### **-d dir, --directory=dir**

パッチを適用する前に指定されたディレクトリに移動します。

```console
$ patch -d src/ -i ../changes.patch
patching file main.c
```

### **-E, --remove-empty-files**

パッチ適用後に空になった出力ファイルを削除します。

```console
$ patch -E < changes.patch
patching file empty.txt
removed empty file empty.txt
```

### **-N, --forward**

逆適用されているように見えるパッチや、すでに適用されているパッチを無視します。

```console
$ patch -N < changes.patch
patching file file.txt
```

### **-f, --force**

パッチが不正確に見える場合でも強制的にパッチを適用します。

```console
$ patch -f < changes.patch
patching file file.txt
Hunk #1 FAILED at 10.
1 out of 1 hunk FAILED -- saving rejects to file file.txt.rej
```

### **-t, --batch**

ユーザー対話をスキップし、すべての質問に「はい」と仮定します。

```console
$ patch -t < changes.patch
patching file file.txt
```

## 使用例

### 単一ファイルにパッチファイルを適用する

```console
$ patch original.txt < changes.patch
patching file original.txt
```

### バックアップファイル付きでパッチを適用する

```console
$ patch -b program.c < bugfix.patch
patching file program.c
```

### ディレクトリにパッチを適用する

```console
$ cd project/
$ patch -p1 < ../feature.patch
patching file src/main.c
patching file include/header.h
```

### パッチを逆適用する

```console
$ patch -R < changes.patch
patching file file.txt
```

## ヒント:

### パッチを適用する前に確認する

`patch --dry-run` を使用して、実際にファイルを変更せずに何が起こるかを確認します。これにより予期しない変更を防ぐことができます。

### 拒否されたパッチの処理

パッチがきれいに適用できない場合、`patch` は拒否されたハンクを含む `.rej` ファイルを作成します。これらのファイルを調べて、手動で変更を適用してください。

### コンテキスト対応のパッチを作成する

`diff` でパッチを作成する際は、`-u` オプション（統合フォーマット）を使用して前後の行を含めます。これにより、特に対象ファイルが変更されている場合に、`patch` がより正確に変更を適用できるようになります。

### 適切なディレクトリにパッチを適用する

パッチが作成された場所とは異なるディレクトリ構造にパッチを適用する場合は、`-p` オプションを使用してパスの接頭辞を削除します。

## よくある質問

#### Q1. 統合差分とコンテキスト差分の違いは何ですか？
A. 統合差分（`diff -u`）は変更された行を `+` と `-` の接頭辞を付けて単一のブロックで表示しますが、コンテキスト差分（`diff -c`）は変更前と変更後のブロックを別々に表示します。統合差分はよりコンパクトで一般的に使用されています。

#### Q2. 異なるディレクトリで作成されたパッチをどのように適用しますか？
A. `-p` オプションを使用して、パッチ内のファイル名からディレクトリレベルを削除します。例えば、`patch -p1` は最初のディレクトリコンポーネントを削除します。

#### Q3. 適用したパッチを元に戻すにはどうすればよいですか？
A. 同じパッチファイルで `patch -R` を使用して変更を元に戻します。

#### Q4. パッチの適用に失敗した場合はどうすればよいですか？
A. パッチによって作成された `.rej` ファイルを調べます。これには適用できなかったハンクが含まれています。これらの変更を手動で適用するか、パッチファイルを更新する必要があるかもしれません。

## 参考文献

https://www.gnu.org/software/diffutils/manual/html_node/Invoking-patch.html

## 改訂履歴

- 2025/05/05 初版