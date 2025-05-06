# dirname コマンド

パス名からディレクトリ部分を出力します。

## 概要

`dirname` コマンドはパス名から最後のコンポーネントを削除し、ディレクトリパスのみを残します。シェルスクリプトでファイルパスからディレクトリ部分を抽出するために一般的に使用され、特定のディレクトリへの移動や同じ場所にあるファイルを処理する際に便利です。

## オプション

### **--zero, -z**

各パス名の後に改行ではなくゼロバイト（ASCII NUL）を出力します。

```console
$ dirname -z /usr/bin/zip
/usr/bin$
```

### **--help**

ヘルプ情報を表示して終了します。

```console
$ dirname --help
Usage: dirname [OPTION] NAME...
Output each NAME with its last non-slash component and trailing slashes
removed; if NAME contains no /'s, output '.' (meaning the current directory).

  -z, --zero     end each output line with NUL, not newline
      --help     display this help and exit
      --version  output version information and exit

Examples:
  dirname /usr/bin/          -> "/usr"
  dirname dir1/str dir2/str  -> "dir1" followed by "dir2"
  dirname stdio.h            -> "."
```

### **--version**

バージョン情報を出力して終了します。

```console
$ dirname --version
dirname (GNU coreutils) 9.0
Copyright (C) 2021 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by David MacKenzie.
```

## 使用例

### 基本的な使い方

```console
$ dirname /usr/bin/zip
/usr/bin
```

### 複数の引数

```console
$ dirname /usr/bin/zip /etc/passwd /home/user/file.txt
/usr/bin
/etc
/home/user
```

### カレントディレクトリ

```console
$ dirname file.txt
.
```

### シェルスクリプトでの使用

```console
$ script_dir=$(dirname "$0")
$ echo "This script is located in: $script_dir"
This script is located in: /path/to/script/directory
```

## ヒント:

### basename と組み合わせる

`dirname` と `basename` を一緒に使用して、パスをディレクトリとファイル名のコンポーネントに分割できます：

```console
$ path="/home/user/documents/report.pdf"
$ dir=$(dirname "$path")
$ file=$(basename "$path")
$ echo "Directory: $dir, File: $file"
Directory: /home/user/documents, File: report.pdf
```

### スペースを含むパスの処理

スペースを含むパスを正しく処理するために、`dirname` を使用する際は常に変数を引用符で囲みます：

```console
$ path="/home/user/my documents/report.pdf"
$ dir=$(dirname "$path")  # 引用符が重要
$ echo "$dir"
/home/user/my documents
```

### cd と一緒に使用する

`cd` と組み合わせてファイルのディレクトリに移動できます：

```console
$ cd "$(dirname "/path/to/file.txt")"
```

## よくある質問

#### Q1. パスなしでファイル名を渡すと、`dirname` は何を返しますか？
A. `.`（カレントディレクトリ）を返します。

#### Q2. `dirname` は一度に複数のパスを処理できますか？
A. はい、複数の引数を渡すことができ、それぞれを個別に処理します。

#### Q3. `dirname` は末尾のスラッシュをどのように処理しますか？
A. パスを処理する前に末尾のスラッシュを削除します。

#### Q4. `dirname` と `basename` の違いは何ですか？
A. `dirname` はパスのディレクトリ部分を返し、`basename` はファイル名部分を返します。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/dirname-invocation.html

## 改訂履歴

- 2025/05/05 初版