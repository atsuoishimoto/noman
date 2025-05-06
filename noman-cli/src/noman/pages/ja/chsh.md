# chshコマンド

ユーザーのログインシェルを変更します。

## 概要

`chsh`コマンドを使用すると、ユーザーはログインシェル（ログイン時に起動するコマンドインタープリタ）を変更できます。このコマンドはパスワードファイル内のユーザーエントリを修正し、システムにログインしたときに実行されるシェルプログラムを設定します。

## オプション

### **-s, --shell**

使用するログインシェルを指定します。実行するユーザーがスーパーユーザーでない限り、シェルは/etc/shellsファイルに記載されている必要があります。

```console
$ chsh -s /bin/zsh
Password: 
Shell changed.
```

### **-l, --list-shells**

/etc/shellsファイルに記載されているシェルの一覧を表示します。

```console
$ chsh -l
/bin/sh
/bin/bash
/bin/zsh
/bin/fish
```

### **-h, --help**

ヘルプ情報を表示して終了します。

```console
$ chsh --help
Usage: chsh [options] [LOGIN]

Options:
  -s, --shell SHELL         specify login shell
  -l, --list-shells         list shells and exit
  -h, --help                display this help and exit
  -v, --version             display version information and exit
```

### **-v, --version**

バージョン情報を表示して終了します。

```console
$ chsh --version
chsh from util-linux 2.38.1
```

## 使用例

### 自分自身のシェルを変更する

```console
$ chsh -s /bin/zsh
Password: 
Shell changed.
```

### 現在のシェルを確認する

```console
$ grep "^$(whoami):" /etc/passwd
username:x:1000:1000:User Name:/home/username:/bin/zsh
```

### 他のユーザーのシェルを変更する（root権限が必要）

```console
$ sudo chsh -s /bin/bash otheruser
Shell changed.
```

## ヒント:

### 最初に利用可能なシェルを確認する

シェルを変更する前に、必ず`chsh -l`を使用するか、`/etc/shells`をチェックして、システムで利用可能なシェルを確認しましょう。

### ログアウトが必要

ログインシェルの変更は、ログアウトして再度ログインするまで有効になりません。

### シェルは/etc/shellsに記載されている必要がある

スーパーユーザーでない限り、選択するシェルは`/etc/shells`ファイルに記載されている必要があります。これはユーザーが任意のプログラムをログインシェルとして設定することを防ぐセキュリティ対策です。

### 変更を元に戻す

使いにくいシェルに変更してしまった場合は、同じコマンドを使用して以前のシェルに戻すことができます。

## よくある質問

#### Q1. ログインシェルと現在のシェルの違いは何ですか？
A. ログインシェルはシステムにログインしたときに起動するシェルです。現在のシェルは現在使用しているシェルであり、ログインシェルから別のシェルを起動している場合は異なる場合があります。

#### Q2. 現在のシェルを確認するにはどうすればよいですか？
A. ログインシェルを確認するには`echo $SHELL`を実行し、現在使用しているシェルを確認するには`ps -p $$`を実行します。

#### Q3. 任意のプログラムをシェルとして使用できますか？
A. いいえ、セキュリティ上の理由から、一般ユーザーは`/etc/shells`に記載されているシェルのみを使用できます。スーパーユーザーのみが任意のプログラムをシェルとして設定できます。

#### Q4. 無効なシェルを設定するとどうなりますか？
A. 存在しないか正常に動作しないシェルを設定すると、通常の方法でログインできなくなる可能性があります。そのような場合は、回復方法を使用するか、システム管理者に修正を依頼する必要があります。

## 参考資料

https://man7.org/linux/man-pages/man1/chsh.1.html

## 改訂履歴

- 2025/05/05 初版