# su コマンド

ユーザーIDを切り替えたり、別のユーザーになったりするコマンドです。

## 概要

`su` コマンドを使用すると、ログインセッション中に一時的に別のユーザーになることができます。ユーザー名を指定しない場合、デフォルトではスーパーユーザー（root）に切り替わります。このコマンドは、対象ユーザーの環境変数と権限を持つ新しいシェルを作成します。

## オプション

### **-**, **-l**, **--login**

ログイン環境を提供し、対象ユーザーとして直接ログインしたかのように動作します。これには環境変数の設定、対象ユーザーのホームディレクトリへの移動、ログインスクリプトの実行が含まれます。

```console
$ su - john
Password: 
john@hostname:~$
```

### **-c**, **--command=COMMAND**

指定したユーザーとして単一のコマンドを実行し、その後終了します。

```console
$ su -c "ls -la /root" root
Password: 
total 28
drwx------  4 root root 4096 May  5 10:15 .
drwxr-xr-x 20 root root 4096 May  5 10:15 ..
-rw-------  1 root root  571 May  5 10:15 .bash_history
-rw-r--r--  1 root root 3106 May  5 10:15 .bashrc
drwx------  2 root root 4096 May  5 10:15 .cache
-rw-r--r--  1 root root  161 May  5 10:15 .profile
drwx------  2 root root 4096 May  5 10:15 .ssh
```

### **-s**, **--shell=SHELL**

対象ユーザーのデフォルトシェルの代わりに、指定したシェルを実行します。

```console
$ su -s /bin/zsh john
Password: 
john@hostname:~$
```

### **-p**, **--preserve-environment**

対象ユーザーの環境変数に切り替えるのではなく、現在の環境変数を保持します。

```console
$ su -p john
Password: 
john@hostname:/current/directory$
```

## 使用例

### rootユーザーになる

```console
$ su
Password: 
root@hostname:/home/user#
```

### rootとしてコマンドを実行し、通常ユーザーに戻る

```console
$ su -c "apt update && apt upgrade" root
Password: 
[apt update and upgrade output]
$
```

### ログイン環境を持つ別のユーザーに切り替える

```console
$ su - john
Password: 
john@hostname:~$
```

## ヒント:

### 可能な場合は sudo を使用する

最近のシステムでは、管理タスクには `su` よりも `sudo` を使用することが推奨されています。`sudo` はより良いログ記録と、より細かい権限制御を提供します。

### 環境変数に注意する

`-` オプションなしで `su` を使用すると、現在の環境変数が保持され、予期しない動作を引き起こす可能性があります。クリーンな環境のためには `-` を使用してください。

### suセッションを適切に終了する

特権セッションが終了したら、`exit` と入力するか Ctrl+D を押して、元のユーザーセッションに戻ります。

### rootとしてコマンドを実行する前に確認する

rootとしてコマンドを実行する前には、常に二重確認してください。ミスがあるとシステムを損傷する可能性があります。

## よくある質問

#### Q1. `su` と `sudo` の違いは何ですか？
A. `su` はユーザーセッション全体を別のユーザー（通常はroot）に切り替えますが、`sudo` は特権を持つ単一のコマンドを実行した後、通常のユーザーに戻ります。

#### Q2. なぜ `su` はパスワードを要求するのですか？
A. `su` は切り替え先のユーザーのパスワードを要求します。これは自分自身のパスワードを要求する `sudo` とは異なります。

#### Q3. `su` セッションからどうやって抜け出しますか？
A. `exit` と入力するか Ctrl+D を押すと、元のユーザーセッションに戻ります。

#### Q4. 単に `su` ではなく `su -` を使用する理由は何ですか？
A. `su -` は対象ユーザーの完全なログイン環境を提供します。これには環境変数、作業ディレクトリ、シェル設定が含まれます。単なる `su` はユーザーIDのみを変更し、現在の環境を保持します。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/su-invocation.html

## 改訂履歴

- 2025/05/05 初版