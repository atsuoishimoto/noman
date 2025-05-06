# ssh-copy-id コマンド

リモートマシンの authorized_keys ファイルに公開鍵をインストールし、パスワードなしの SSH 認証を可能にします。

## 概要

`ssh-copy-id` は、SSH 公開鍵をリモートサーバーの `~/.ssh/authorized_keys` ファイルにコピーするユーティリティです。これにより、リモートサーバーへのパスワードなしの SSH ログインが可能になり、接続するたびにパスワードを入力する必要がなくなります。これは鍵ベースの認証を設定する簡単な方法であり、パスワード認証よりも便利で安全です。

## オプション

### **-i [identity_file]**

使用する ID ファイル（秘密鍵）を指定します。デフォルトでは `~/.ssh/id_rsa.pub` を使用します。

```console
$ ssh-copy-id -i ~/.ssh/custom_key.pub user@remote-host
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@remote-host's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'user@remote-host'"
and check to make sure that only the key(s) you wanted were added.
```

### **-f**

鍵がリモートサーバーに既に存在する場合でも、インストールを強制します。

```console
$ ssh-copy-id -f user@remote-host
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@remote-host's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'user@remote-host'"
and check to make sure that only the key(s) you wanted were added.
```

### **-n**

ドライランモード - 実際にインストールせずに、どの鍵がインストールされるかを表示します。

```console
$ ssh-copy-id -n user@remote-host
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/user/.ssh/id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
Would have added the following key(s):
ssh-rsa AAAAB3NzaC1yc2EAAA...truncated...user@local-host
```

### **-p [port]**

リモートホストに接続するポートを指定します。

```console
$ ssh-copy-id -p 2222 user@remote-host
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@remote-host's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh -p 2222 'user@remote-host'"
and check to make sure that only the key(s) you wanted were added.
```

## 使用例

### 基本的な使用法

```console
$ ssh-copy-id user@remote-host
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@remote-host's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'user@remote-host'"
and check to make sure that only the key(s) you wanted were added.
```

### 特定の ID ファイルの使用

```console
$ ssh-copy-id -i ~/.ssh/id_ed25519.pub user@remote-host
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@remote-host's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'user@remote-host'"
and check to make sure that only the key(s) you wanted were added.
```

### 非標準ポートへの接続

```console
$ ssh-copy-id -p 2222 user@remote-host
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@remote-host's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh -p 2222 'user@remote-host'"
and check to make sure that only the key(s) you wanted were added.
```

## ヒント

### 最初に SSH 鍵を生成する

`ssh-copy-id` を使用する前に、SSH 鍵が生成されていることを確認してください。生成されていない場合は、次のコマンドで作成します：

```console
$ ssh-keygen -t rsa -b 4096
```

### 鍵のインストールを確認する

`ssh-copy-id` を実行した後、リモートサーバーに SSH 接続を試みて、パスワードなしのログインが機能することを確認します：

```console
$ ssh user@remote-host
```

### 複数の鍵

複数の SSH 鍵がある場合は、`-i` オプションで使用する鍵を指定します。これは、異なるサーバーに異なる鍵を使用する場合に便利です。

### リモートディレクトリ構造

`ssh-copy-id` は、リモートサーバー上に `~/.ssh` ディレクトリと `authorized_keys` ファイルが存在しない場合、適切な権限でそれらを作成します。

## よくある質問

#### Q1. まだ SSH 鍵がない場合はどうすればよいですか？
A. まず `ssh-keygen -t rsa -b 4096` または `ssh-keygen -t ed25519` を使用して SSH 鍵ペアを生成し、その後 `ssh-copy-id` を使用します。

#### Q2. カスタム SSH ポートで `ssh-copy-id` を使用できますか？
A. はい、`-p` オプションを使用します：`ssh-copy-id -p 2222 user@remote-host`。

#### Q3. 鍵が正常にインストールされたかどうかを確認するにはどうすればよいですか？
A. `ssh-copy-id` を実行した後、`ssh user@remote-host` でログインを試みます。パスワードの入力を求められなければ、鍵は正常にインストールされています。

#### Q4. 複数の鍵を一度にコピーできますか？
A. はい、`ssh-copy-id` はデフォルトで `~/.ssh` ディレクトリにあるすべての公開鍵をコピーします。特定の鍵を指定するには、`-i` オプションを使用します。

#### Q5. リモートサーバーに `.ssh` ディレクトリがない場合はどうなりますか？
A. `ssh-copy-id` は自動的にディレクトリを作成し、適切な権限を設定します。

## 参考文献

https://man.openbsd.org/ssh-copy-id

## 改訂履歴

- 2025/05/05 初版