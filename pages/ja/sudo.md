# sudo コマンド

別のユーザー（通常は特権を持つユーザー）としてコマンドを実行します。

## 概要

`sudo`（superuser do）は、デフォルトではスーパーユーザー（root）として、別のユーザーのセキュリティ特権でプログラムを実行することをユーザーに許可します。rootパスワードを共有せずに、`/etc/sudoers`ファイルにリストされているユーザーに限定的なroot権限を付与する方法を提供します。

## オプション

### **-b, --background**

コマンドをバックグラウンドで実行します。

```console
$ sudo -b apt update
[1] 12345
```

### **-u, --user**

デフォルトのターゲットユーザー（root）以外のユーザーとしてコマンドを実行します。

```console
$ sudo -u postgres psql
psql (14.5)
Type "help" for help.

postgres=#
```

### **-s, --shell**

ユーザーのパスワードデータベースエントリで指定されたシェルをログインシェルとして実行します。

```console
$ sudo -s
root@hostname:~#
```

### **-i, --login**

ターゲットユーザーのパスワードデータベースエントリで指定されたシェルをログインシェルとして実行します。

```console
$ sudo -i
root@hostname:~#
```

### **-k, --reset-timestamp**

ユーザーのキャッシュされた認証情報を無効にします。

```console
$ sudo -k
[sudo] password for user:
```

### **-v, --validate**

ユーザーのキャッシュされた認証情報を更新し、タイムアウトを延長します。

```console
$ sudo -v
[sudo] password for user:
```

### **-l, --list**

現在のユーザーに許可された（および禁止された）コマンドを一覧表示します。

```console
$ sudo -l
User user may run the following commands on hostname:
    (ALL : ALL) ALL
```

## 使用例

### 特権を持ってソフトウェアをインストールする

```console
$ sudo apt install nginx
[sudo] password for user: 
Reading package lists... Done
Building dependency tree... Done
...
```

### システム設定ファイルを編集する

```console
$ sudo nano /etc/hosts
[sudo] password for user:
```

### 別のユーザーとしてコマンドを実行する

```console
$ sudo -u www-data php /var/www/html/script.php
[sudo] password for user:
Script output...
```

### rootシェルを取得する

```console
$ sudo -i
[sudo] password for user:
root@hostname:~#
```

## ヒント:

### `sudo !!`を使用して前のコマンドをsudoで繰り返す

sudoが必要なコマンドでsudoを使用し忘れた場合は、`sudo !!`と入力して前のコマンドをsudo特権で繰り返すことができます。

### パスワードなしでsudoを設定する

`sudo visudo`でsudoersファイルを編集し、`username ALL=(ALL) NOPASSWD: ALL`のような行を追加すると、ユーザーはパスワードを入力せずにsudoコマンドを実行できます。

### `sudo -E`を使用して環境変数を保持する

sudoでコマンドを実行する必要があるが、現在の環境変数を保持したい場合は、`-E`フラグを使用します。

### セキュリティの影響を理解する

信頼できるユーザーにのみsudoアクセスを許可し、実行を許可するコマンドには注意してください。無制限のsudoアクセスを持つユーザーは、実質的にシステムを完全に制御できます。

## よくある質問

#### Q1. `sudo -s`と`sudo -i`の違いは何ですか？
A. `sudo -s`はroot権限でシェルを起動しますが、現在の環境を維持します。`sudo -i`はrootとしての完全なログインをシミュレートし、rootの環境を使用します。

#### Q2. sudo認証はどれくらい持続しますか？
A. デフォルトでは、sudoは認証情報を15分間キャッシュします。その後、再度パスワードを入力する必要があります。

#### Q3. sudo設定を安全に編集するにはどうすればよいですか？
A. 常に`sudo visudo`を使用してsudoersファイルを編集してください。このコマンドは保存前に構文エラーをチェックし、自分自身をロックアウトすることを防ぎます。

#### Q4. 他のユーザーがsudoで実行したコマンドを確認できますか？
A. はい、sudoはすべてのコマンドをシステムログに記録します。通常は`/var/log/auth.log`または`/var/log/secure`に記録されます。

#### Q5. パスワードの入力を求められずにrootとしてコマンドを実行するにはどうすればよいですか？
A. 特定のコマンドまたはすべてのコマンドに対してNOPASSWDオプションでsudoersファイルを設定する必要があります。

## 参考文献

https://www.sudo.ws/docs/man/sudo.man/

## 改訂履歴

- 2025/05/05 初版