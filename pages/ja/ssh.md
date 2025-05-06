# sshコマンド

暗号化されたネットワーク接続を介してリモートシステムに安全に接続します。

## 概要

SSH（Secure Shell）は、リモートコンピュータに安全にアクセスし、リモートでコマンドを実行するためのプロトコルです。安全でないネットワーク上で、二つの信頼されていないホスト間の暗号化された通信を提供し、telnetやrshなどの古いプロトコルに代わるものです。SSHは一般的に、リモートログイン、コマンド実行、ファイル転送、および他のアプリケーションのトンネリングに使用されます。

## オプション

### **-p port**

リモートホストに接続するポートを指定します（デフォルトは22）

```console
$ ssh -p 2222 user@example.com
user@example.com's password: 
Last login: Mon May 5 10:23:45 2025 from 192.168.1.100
user@example.com:~$ 
```

### **-i identity_file**

公開鍵認証に使用するアイデンティティ（秘密鍵）を読み込むファイルを選択します

```console
$ ssh -i ~/.ssh/my_private_key user@example.com
Last login: Mon May 5 09:15:30 2025 from 192.168.1.100
user@example.com:~$ 
```

### **-v**

詳細モード、接続問題のデバッグに役立ちます

```console
$ ssh -v user@example.com
OpenSSH_8.9p1, LibreSSL 3.3.6
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: Connecting to example.com port 22.
debug1: Connection established.
...
```

### **-L local_port:remote_host:remote_port**

ローカルポートをリモートホストのポートに転送します

```console
$ ssh -L 8080:localhost:80 user@example.com
user@example.com's password: 
Last login: Mon May 5 11:30:22 2025 from 192.168.1.100
```

### **-X**

X11転送を有効にし、グラフィカルアプリケーションをローカルに表示できるようにします

```console
$ ssh -X user@example.com
user@example.com's password: 
Last login: Mon May 5 14:45:10 2025 from 192.168.1.100
user@example.com:~$ firefox
```

### **-t**

疑似端末の割り当てを強制します。リモートシステム上でインタラクティブなプログラムを実行する際に役立ちます

```console
$ ssh -t user@example.com "sudo apt update"
user@example.com's password: 
[sudo] password for user: 
Get:1 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
...
```

## 使用例

### 基本的なSSH接続

```console
$ ssh user@example.com
user@example.com's password: 
Last login: Mon May 5 08:30:15 2025 from 192.168.1.100
user@example.com:~$ 
```

### リモートホストでのコマンド実行

```console
$ ssh user@example.com "ls -la"
total 32
drwxr-xr-x 5 user user 4096 May  5 08:30 .
drwxr-xr-x 3 root root 4096 Jan  1 00:00 ..
-rw-r--r-- 1 user user  220 Jan  1 00:00 .bash_logout
-rw-r--r-- 1 user user 3771 Jan  1 00:00 .bashrc
drwx------ 2 user user 4096 May  5 08:30 .ssh
```

### 鍵ベースの認証を使用したSSH

```console
$ ssh -i ~/.ssh/id_rsa user@example.com
Last login: Mon May 5 12:15:30 2025 from 192.168.1.100
user@example.com:~$ 
```

### ポート転送（ローカルからリモートへ）

```console
$ ssh -L 8080:localhost:80 user@example.com
user@example.com's password: 
Last login: Mon May 5 15:20:45 2025 from 192.168.1.100
```

## ヒント:

### パスワードなしログイン用のSSH鍵の設定

`ssh-keygen`でSSH鍵ペアを生成し、`ssh-copy-id user@example.com`で公開鍵をリモートサーバーにコピーします。これにより、接続ごとにパスワードを入力する必要がなくなります。

### SSH設定ファイルの使用

頻繁にアクセスするサーバーの接続設定を保存するために、`~/.ssh/config`ファイルを作成します：

```
Host myserver
    HostName example.com
    User username
    Port 2222
    IdentityFile ~/.ssh/special_key
```

その後、単に`ssh myserver`で接続できます。

### SSH接続を維持する

タイムアウトを防ぐために、`~/.ssh/config`ファイルに以下の行を追加します：

```
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

### 鍵管理にSSHエージェントを使用する

`ssh-agent`を起動し、`ssh-add`で鍵を追加すると、セッション中にパスフレーズを繰り返し入力する必要がなくなります。

## よくある質問

#### Q1. SSH鍵を生成するにはどうすればよいですか？
A. `ssh-keygen`コマンドを使用します。デフォルトは`ssh-keygen -t rsa -b 4096`で、4096ビットのRSA鍵ペアを作成します。

#### Q2. SSH公開鍵をサーバーにコピーするにはどうすればよいですか？
A. `ssh-copy-id user@example.com`を使用して、公開鍵をリモートサーバーのauthorized_keysファイルにコピーします。

#### Q3. SSHを使用してファイルを転送するにはどうすればよいですか？
A. SSHプロトコルを使用する関連コマンドの`scp`（セキュアコピー）または`sftp`（セキュアファイル転送プロトコル）を使用します。

#### Q4. SSH接続がタイムアウトしないようにするにはどうすればよいですか？
A. SSH設定ファイルで`ServerAliveInterval`と`ServerAliveCountMax`を設定するか、`-o`オプションを使用します：`ssh -o ServerAliveInterval=60 user@example.com`。

#### Q5. SSH接続の問題をトラブルシューティングするにはどうすればよいですか？
A. `-v`（詳細）オプションを使用し、より詳細な情報を得るには追加のv（`-vv`または`-vvv`）を使用します。

## 参考文献

https://man.openbsd.org/ssh.1

## 改訂履歴

- 2025/05/05 初版