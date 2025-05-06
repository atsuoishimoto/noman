# which コマンド

ユーザーのPATH内にあるコマンドの実行ファイルを探します。

## 概要

`which`コマンドは、PATH環境変数にリストされているディレクトリを検索して、実行可能プログラムの場所を見つけます。コマンドラインから実行した場合にどのバージョンのプログラムが実行されるかを判断するのに役立ちます。

## オプション

### **-a, --all**

PATH内の一致する実行ファイルをすべて表示します（最初の1つだけではなく）。

```console
$ which -a python
/usr/bin/python
/usr/local/bin/python
```

### **-s**

サイレントモード - 出力なしで終了ステータスを返します（見つかった場合は0、見つからなかった場合は1）。

```console
$ which -s git
$ echo $?
0
```

## 使用例

### コマンドの場所を見つける

```console
$ which ls
/bin/ls
```

### コマンドが存在するかチェックする

```console
$ which nonexistentcommand
which: no nonexistentcommand in (/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin)
```

### 複数のコマンドで使用する

```console
$ which bash python perl
/bin/bash
/usr/bin/python
/usr/bin/perl
```

## ヒント:

### コマンド置換で使用する

`which`をコマンド置換と一緒に使用して、コマンドのフルパスを実行できます:
```console
$ $(which python) --version
Python 3.9.6
```

### 複数のバージョンを確認する

`which -a`を使用してPATH内のコマンドのすべてのインスタンスを見つけることができます。これはバージョンの競合をトラブルシューティングする際に役立ちます。

### 他のコマンドと組み合わせる

より多くの情報を得るために他のコマンドと組み合わせます:
```console
$ ls -l $(which python)
-rwxr-xr-x 1 root wheel 31488 Jan 1 2023 /usr/bin/python
```

## よくある質問

#### Q1. `which`と`whereis`の違いは何ですか？
A. `which`はPATH内の実行ファイルの場所のみを表示しますが、`whereis`はコマンドのソースコード、マニュアルページ、関連ファイルも見つけます。

#### Q2. なぜ`which`は存在するコマンドを見つけられないことがありますか？
A. そのコマンドはシェルビルトイン（`cd`など）、エイリアス、またはPATH環境変数に含まれていない可能性があります。

#### Q3. コマンドがインストールされているかを確認するために`which`をどのように使用できますか？
A. `which -s command && echo "Installed" || echo "Not installed"`を使用して、コマンドがPATHに存在するかを確認できます。

#### Q4. `which`はシェルビルトインに対して機能しますか？
A. いいえ、`which`はPATH内の実行ファイルのみを見つけ、`cd`や`echo`などのシェルビルトインは見つけません。

## 参考文献

https://pubs.opengroup.org/onlinepubs/9699919799/utilities/which.html

## 改訂履歴

- 2025/05/05 初版