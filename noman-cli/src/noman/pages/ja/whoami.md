# whoami コマンド

現在のユーザーの実効ユーザーIDを表示します。

## 概要

`whoami` コマンドは、現在の実効ユーザーIDに関連付けられたユーザー名を表示します。これは、ターミナルセッションで現在使用されているユーザーアカウントを識別するのに役立つシンプルなユーティリティで、スクリプト内や異なるユーザーアカウント間で切り替える際に特に便利です。

## オプション

`whoami` コマンドは単一の明確な機能を実行するため、オプションはほとんどありません。

### **--help**

ヘルプ情報を表示して終了します。

```console
$ whoami --help
Usage: whoami [OPTION]...
Print the user name associated with the current effective user ID.
Same as id -un.

      --help     display this help and exit
      --version  output version information and exit

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Report whoami translation bugs to <https://translationproject.org/team/>
```

### **--version**

バージョン情報を出力して終了します。

```console
$ whoami --version
whoami (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by Richard Mlynarik.
```

## 使用例

### 基本的な使い方

```console
$ whoami
john
```

### スクリプト内で現在のユーザーを確認する

```console
$ echo "Current user is $(whoami)"
Current user is john
```

### sudoでユーザーを切り替えた後の使用

```console
$ whoami
john
$ sudo whoami
root
```

## ヒント

### `id` コマンドとの違い

`whoami` コマンドは `id -un` と同等です。`id` コマンドはより包括的なユーザー識別情報を提供しますが、`whoami` はユーザー名のみに焦点を当てています。

### シェルスクリプトでの使用

`whoami` は、スクリプトを実行しているユーザーを確認するためにシェルスクリプトで特に役立ち、ユーザー識別に基づいた条件付き実行を可能にします。

### ルートユーザーの確認

`sudo` や `su` などのコマンドを使用した後、現在ルート権限で操作しているかどうかを確認するために `whoami` を使用します。

## よくある質問

#### Q1. `whoami` と `who am i` の違いは何ですか？
A. `whoami` は実効ユーザー名（現在実行中のユーザー）を表示しますが、`who am i`（または `who -m`）は元のログイン名を表示します。`su` や `sudo` を使用した場合は異なる場合があります。

#### Q2. `whoami` は他のユーザーに関する情報を表示できますか？
A. いいえ、`whoami` は現在の実効ユーザーに関する情報のみを表示します。他のユーザーに関する情報を取得するには、`id username` や `finger username` などのコマンドを使用してください。

#### Q3. `whoami` はすべてのUnix/Linuxシステムで同じように動作しますか？
A. はい、`whoami` はLinuxやmacOSを含むUnixライクなオペレーティングシステム全体で一貫した動作をする標準コマンドです。

#### Q4. なぜ `echo $USER` の代わりに `whoami` を使用するのですか？
A. `whoami` は実効ユーザー（実行中のユーザー）を表示しますが、`$USER` はログインユーザーを表示します。`sudo` や `su` を使ってユーザーを変更した場合に違いが生じます。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/whoami-invocation.html

## 改訂履歴

- 2025/05/05 初版