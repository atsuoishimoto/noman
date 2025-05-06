# chgrp コマンド

ファイルとディレクトリのグループ所有権を変更します。

## 概要

`chgrp` コマンドはファイルとディレクトリのグループ所有権を変更します。適切な権限を持つユーザーが、特定のファイルやディレクトリにどのグループがアクセスできるかを変更できるようにします。これはマルチユーザー環境でのファイル権限とアクセス制御を管理するのに役立ちます。

## オプション

### **-c, --changes**

変更が行われた場合のみ診断メッセージを表示します。

```console
$ chgrp -c staff document.txt
changed group of 'document.txt' from 'users' to 'staff'
```

### **-f, --silent, --quiet**

ほとんどのエラーメッセージを抑制します。

```console
$ chgrp -f nonexistentgroup file.txt
```

### **-v, --verbose**

処理されるすべてのファイルに対して診断メッセージを出力します。

```console
$ chgrp -v developers scripts/
changed group of 'scripts/' from 'users' to 'developers'
```

### **-R, --recursive**

ファイルとディレクトリに対して再帰的に操作します。

```console
$ chgrp -R developers project/
```

### **-h, --no-dereference**

参照先のファイルではなくシンボリックリンク自体に影響を与えます。

```console
$ chgrp -h staff symlink.txt
```

### **--reference=RFILE**

グループ名を指定する代わりに、RFILEのグループを使用します。

```console
$ chgrp --reference=template.txt newfile.txt
```

## 使用例

### 基本的なグループ変更

```console
$ ls -l document.txt
-rw-r--r--  1 user  users  1024 May 5 10:30 document.txt
$ chgrp developers document.txt
$ ls -l document.txt
-rw-r--r--  1 user  developers  1024 May 5 10:30 document.txt
```

### グループを再帰的に変更する

```console
$ chgrp -R webadmin /var/www/html
$ ls -l /var/www/html
total 16
drwxr-xr-x  3 www-data  webadmin  4096 May 4 14:22 css
drwxr-xr-x  2 www-data  webadmin  4096 May 4 14:22 js
-rw-r--r--  1 www-data  webadmin  8192 May 5 09:15 index.html
```

### 数値グループIDの使用

```console
$ chgrp 1001 config.ini
$ ls -l config.ini
-rw-r--r--  1 user  1001  512 May 5 11:45 config.ini
```

## ヒント:

### 一貫性のために数値グループIDを使用する

スクリプト作成や複数のシステム間で作業する場合、グループ名の代わりに数値グループID（GID）を使用すると、より信頼性が高くなります。グループ名はシステムによって異なる場合がありますが、GIDは一貫しています。

### 先にグループメンバーシップを確認する

ファイルのグループを変更する前に、所有者が対象グループのメンバーであることを確認してください。`groups`コマンドを使用して、ユーザーがどのグループに属しているかを確認できます。

### 完全な権限管理のためにchmodと組み合わせる

多くの場合、グループ所有権と権限の両方を変更したいでしょう。`chgrp`の後に`chmod g+rw`を使用して、新しいグループに読み取りと書き込みの権限を与えます。

### ルートディレクトリの権限を保持する

システムディレクトリで`-R`を使用する場合は、重要なシステムファイルのグループを変更しないように注意してください。システムの安定性に影響を与える可能性があります。

## よくある質問

#### Q1. `chgrp`と`chown`の違いは何ですか？
A. `chgrp`はファイルのグループ所有権のみを変更しますが、`chown`はユーザーとグループの両方の所有権を変更できます。

#### Q2. 誰でもファイルのグループを変更できますか？
A. いいえ。ファイル所有者またはroot権限を持つユーザーのみがファイルのグループを変更でき、所有者は自分が属しているグループにのみ割り当てることができます。

#### Q3. ファイルに割り当てられるグループを確認するにはどうすればよいですか？
A. `groups`コマンドを使用して、自分が属しているグループを確認できます。

#### Q4. ディレクトリのグループを変更すると、その中のファイルに影響しますか？
A. いいえ、`-R`（再帰的）オプションを使用しない限り、ディレクトリのグループを変更してもその中のファイルには影響しません。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/chgrp-invocation.html

## 改訂履歴

- 2025/05/05 初版