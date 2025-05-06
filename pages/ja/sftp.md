# sftp コマンド

ホスト間で暗号化されたSSH接続を介してファイルを安全に転送します。

## 概要

SFTP（Secure File Transfer Protocol）は、安全な接続を介してファイルアクセス、ファイル転送、ファイル管理を提供するネットワークプロトコルです。`sftp`コマンドはFTPに似たインタラクティブなファイル転送プログラムですが、すべての操作を暗号化されたSSH通信上で実行します。

## オプション

### **-b** *バッチファイル*

sftpコマンドのバッチファイルを処理します。

```console
$ sftp -b commands.txt user@remote.server
Connecting to remote.server...
sftp> get file.txt
Fetching /home/user/file.txt to file.txt
sftp> exit
```

### **-F** *ssh_config*

sshの代替ユーザー設定ファイルを指定します。

```console
$ sftp -F ~/.ssh/custom_config user@remote.server
Connecting to remote.server...
```

### **-i** *identity_file*

公開鍵認証に使用するアイデンティティ（秘密鍵）を読み込むファイルを選択します。

```console
$ sftp -i ~/.ssh/private_key user@remote.server
Connecting to remote.server...
```

### **-l** *limit*

使用する帯域幅を制限します（Kbit/s単位で指定）。

```console
$ sftp -l 100 user@remote.server
Connecting to remote.server...
```

### **-P** *port*

リモートホストに接続するポートを指定します。

```console
$ sftp -P 2222 user@remote.server
Connecting to remote.server...
```

### **-r**

ディレクトリ全体を再帰的にコピーします。

```console
$ sftp user@remote.server
sftp> get -r remote_directory
```

### **-v**

ログレベルを上げ、sftpが進行状況についてのデバッグメッセージを表示するようにします。

```console
$ sftp -v user@remote.server
OpenSSH_8.1p1, LibreSSL 2.7.3
debug1: Reading configuration data /etc/ssh/ssh_config
...
```

## 使用例

### リモートサーバーへの接続

```console
$ sftp user@remote.server
Connected to remote.server.
sftp>
```

### ファイルのダウンロード

```console
$ sftp user@remote.server
sftp> get remote_file.txt local_file.txt
Fetching /home/user/remote_file.txt to local_file.txt
sftp>
```

### ファイルのアップロード

```console
$ sftp user@remote.server
sftp> put local_file.txt remote_file.txt
Uploading local_file.txt to /home/user/remote_file.txt
sftp>
```

### ディレクトリの移動

```console
$ sftp user@remote.server
sftp> pwd
Remote working directory: /home/user
sftp> cd documents
sftp> pwd
Remote working directory: /home/user/documents
sftp> lcd ~/downloads
sftp> lpwd
Local working directory: /Users/localuser/downloads
```

### ファイルの一覧表示

```console
$ sftp user@remote.server
sftp> ls
file1.txt  file2.txt  documents/  images/
sftp> lls
local_file1.txt  local_file2.txt  downloads/
```

## ヒント:

### タブ補完を使用する

SFTPはローカルとリモートの両方のファイルに対してタブ補完をサポートしており、完全なパスを入力せずに簡単にナビゲートしてファイルを転送できます。

### 頻繁に使用する接続にエイリアスを作成する

シェル設定ファイルに頻繁に使用するSFTP接続のエイリアスを追加します：
```bash
alias work-sftp='sftp user@work-server.com'
```

### 複数ファイル転送にワイルドカードを使用する

ワイルドカードを使用して一度に複数のファイルを転送します：
```
sftp> get *.txt
```

### 低速接続では圧縮を有効にする

`-C`オプションを使用して圧縮を有効にすると、低速接続での転送速度が向上する場合があります：
```
$ sftp -C user@remote.server
```

## よくある質問

#### Q1. SFTPとFTPの違いは何ですか？
A. SFTPはSSHを使用して安全で暗号化されたファイル転送を行いますが、従来のFTPはデータ（パスワードを含む）を平文で送信するため、傍受される危険性があります。

#### Q2. ディレクトリ全体を転送するにはどうすればよいですか？
A. getまたはputコマンドで再帰オプションを使用します：`get -r remote_directory`または`put -r local_directory`。

#### Q3. SFTP転送を自動化できますか？
A. はい、SFTPコマンドを含むバッチファイルと`-b`オプションを使用するか、スクリプトでの簡単な転送には`scp`の使用を検討してください。

#### Q4. SFTPセッションを終了するにはどうすればよいですか？
A. sftpプロンプトで`exit`または`quit`と入力するか、Ctrl+Dを押します。

#### Q5. SFTPで利用可能なコマンドを確認するにはどうすればよいですか？
A. sftpプロンプトで`help`または`?`と入力すると、利用可能なコマンドのリストが表示されます。

## 参考文献

https://man.openbsd.org/sftp.1

## 改訂履歴

- 2025/05/05 初版