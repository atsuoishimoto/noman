# scpコマンド

ネットワーク上のホスト間でSSHを使用してデータ転送を行い、ファイルを安全にコピーします。

## 概要

`scp`（secure copy）はSSHの暗号化接続を介してホスト間でファイルを転送します。`cp`コマンドと同様に動作しますが、リモートシステムとの間でファイルをコピーすることができます。このコマンドは認証、暗号化、ファイル転送を一度の操作で処理するため、安全なファイル転送のための便利なツールです。

## オプション

### **-r**

ディレクトリ全体を再帰的にコピーします。

```console
$ scp -r documents/ user@remote:/home/user/backup/
user@remote's password: 
file1.txt                                 100%  123     1.2KB/s   00:00    
file2.txt                                 100%  456     4.5KB/s   00:00
```

### **-P**

SSH接続に異なるポートを指定します（注：sshが小文字のpを使用するのとは異なり、大文字のPを使用します）。

```console
$ scp -P 2222 file.txt user@remote:/home/user/
user@remote's password: 
file.txt                                  100%  789     7.8KB/s   00:00
```

### **-p**

元のファイルから更新時刻、アクセス時刻、モードを保持します。

```console
$ scp -p important.conf user@remote:/etc/
user@remote's password: 
important.conf                            100%  321     3.2KB/s   00:00
```

### **-C**

転送中に圧縮を有効にします。

```console
$ scp -C largefile.zip user@remote:/home/user/
user@remote's password: 
largefile.zip                             100%  10MB    5.0MB/s   00:02
```

### **-q**

静かモード - 進捗メーターと警告/診断メッセージを無効にします。

```console
$ scp -q confidential.pdf user@remote:/home/user/
user@remote's password: 
```

### **-i**

公開鍵認証のためのアイデンティティファイル（秘密鍵）を指定します。

```console
$ scp -i ~/.ssh/mykey.pem file.txt user@remote:/home/user/
file.txt                                  100%  789     7.8KB/s   00:00
```

## 使用例

### リモートサーバーにファイルをコピーする

```console
$ scp document.txt user@remote.server.com:/home/user/documents/
user@remote.server.com's password: 
document.txt                              100%  1234     12.3KB/s   00:00
```

### リモートサーバーからファイルをコピーする

```console
$ scp user@remote.server.com:/home/user/report.pdf ./
user@remote.server.com's password: 
report.pdf                                100%  5678     56.7KB/s   00:01
```

### 2つのリモートホスト間でコピーする

```console
$ scp user1@source.com:/files/data.txt user2@destination.com:/backup/
user1@source.com's password: 
user2@destination.com's password: 
data.txt                                  100%  2345     23.4KB/s   00:00
```

### 複数のファイルを一度にコピーする

```console
$ scp file1.txt file2.txt user@remote:/destination/
user@remote's password: 
file1.txt                                 100%  123     1.2KB/s   00:00
file2.txt                                 100%  456     4.5KB/s   00:00
```

## ヒント:

### SSHの設定を使用してコマンドを簡略化する

`~/.ssh/config`ファイルにホストが定義されている場合、完全なホスト名とユーザー名を入力する代わりにホストエイリアスを使用できます。

### ファイル名の特殊文字をエスケープする

スペースや特殊文字を含むファイル名を指定する場合は、引用符を使用するかバックスラッシュでエスケープしてください。

### 公開鍵認証を使用する

SSHキーを設定して、転送ごとにパスワードを入力する必要をなくしましょう。これはより安全で便利です。

### 帯域幅制限

低速接続で大きなファイルを転送する場合は、`-l`オプションを使用して帯域幅の使用量（Kbit/s単位）を制限できます。

## よくある質問

#### Q1. scpは通常のcpとどう違いますか？
A. `scp`はSSHを介して異なるホスト間でファイルを安全にコピーするのに対し、`cp`は同じシステム上でローカルにファイルをコピーするだけです。

#### Q2. 中断された転送を再開できますか？
A. いいえ、`scp`は中断された転送の再開をサポートしていません。その機能が必要な場合は、代わりに`rsync`の使用を検討してください。

#### Q3. ディレクトリ全体をコピーするにはどうすればよいですか？
A. `-r`（再帰的）オプションを使用します：`scp -r /source/directory user@remote:/destination/`

#### Q4. scpは安全ですか？
A. はい、`scp`は認証と暗号化にSSHを使用するため、信頼されていないネットワーク上でファイルを転送するのに安全です。

#### Q5. なぜscpの転送が遅いのですか？
A. `-C`オプションを使用して圧縮を有効にするか、ネットワーク状態を確認してみてください。小さなファイルが多数ある大きなディレクトリの場合は、最初に`tar`を使用してアーカイブを作成することを検討してください。

## 参考文献

https://man.openbsd.org/scp.1

## 改訂履歴

- 2025/05/05 初版