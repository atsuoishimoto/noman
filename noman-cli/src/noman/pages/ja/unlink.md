# unlink コマンド

単一のファイルを削除します。

## 概要

`unlink` コマンドは、ファイルシステムからその名前を削除することで単一のファイルを削除します。`rm` とは異なり、一度に1つのファイルにしか操作できず、再帰的な削除やインタラクティブなプロンプトのオプションは受け付けません。これは基本的なファイル削除操作を実行するシンプルで焦点を絞ったコマンドです。

## オプション

`unlink` はシンプルなコマンドで、最小限のオプションがあります：

### **--help**

ヘルプ情報を表示して終了します。

```console
$ unlink --help
Usage: unlink FILE
  or:  unlink OPTION
指定されたFILEを削除するためにunlink関数を呼び出す。

      --help     このヘルプを表示して終了する
      --version  バージョン情報を出力して終了する
```

### **--version**

バージョン情報を出力して終了します。

```console
$ unlink --version
unlink (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by Michael Stone.
```

## 使用例

### ファイルの削除

```console
$ touch testfile.txt
$ ls
testfile.txt
$ unlink testfile.txt
$ ls
$
```

### ディレクトリの削除を試みる（失敗します）

```console
$ mkdir testdir
$ unlink testdir
unlink: cannot unlink 'testdir': Is a directory
```

## ヒント:

### より柔軟性のために `rm` を使用する

`unlink` はシンプルなファイル削除に便利ですが、`rm` は再帰的な削除（`-r`）、強制削除（`-f`）、インタラクティブなプロンプト（`-i`）などのより多くのオプションを提供します。

### シンボリックリンク

シンボリックリンクに対して `unlink` を使用すると、リンク先のファイルではなく、リンク自体が削除されます。

### エラー処理

ファイルが存在しない場合、ディレクトリである場合、または削除する権限がない場合、`unlink` はエラーメッセージを表示して失敗します。

## よくある質問

#### Q1. `unlink` と `rm` の違いは何ですか？
A. `unlink` は単一のファイルのみを削除でき、その動作を変更するオプションはありません。`rm` は複数のファイル、ディレクトリ（`-r` を使用）を削除でき、削除の動作を制御するための様々なオプションがあります。

#### Q2. `unlink` でディレクトリを削除できますか？
A. いいえ、`unlink` はディレクトリを削除できません。空のディレクトリには `rmdir` を、内容のあるディレクトリには `rm -r` を使用してください。

#### Q3. 存在しないファイルを `unlink` しようとするとどうなりますか？
A. `unlink` はファイルが存在しないことを示すエラーメッセージを表示します。

#### Q4. `unlink` を使用した後にファイルを復元する方法はありますか？
A. 一般的にはありません。ファイルがリンク解除されると、ファイルシステムから削除されます。専門的なツールを使用して復元できる可能性はありますが、保証はされていません。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/unlink-invocation.html

## 改訂履歴

- 2025/05/05 初版