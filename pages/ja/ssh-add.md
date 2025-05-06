# ssh-addコマンド

OpenSSH認証エージェントに秘密鍵の識別情報を追加します。

## 概要

`ssh-add`はSSH認証に使用される秘密鍵を管理します。SSHエージェントに鍵を追加することで、リモートサーバーに接続する際にパスフレーズを繰り返し入力する必要がなくなります。ssh-addを使用する前に、SSHエージェントが実行されている必要があります。

## オプション

### **-l**

現在エージェントが保持しているすべての識別情報のフィンガープリントを一覧表示します。

```console
$ ssh-add -l
2048 SHA256:abcdefghijklmnopqrstuvwxyz1234567890ABCD user@hostname (RSA)
```

### **-L**

現在エージェントが保持しているすべての識別情報の公開鍵パラメータを一覧表示します。

```console
$ ssh-add -L
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC... user@hostname
```

### **-d**

指定した秘密鍵識別情報をエージェントから削除します。

```console
$ ssh-add -d ~/.ssh/id_rsa
Identity removed: /home/user/.ssh/id_rsa (user@hostname)
```

### **-D**

エージェントからすべての識別情報を削除します。

```console
$ ssh-add -D
All identities removed.
```

### **-t life**

エージェントに識別情報を追加する際の最大有効期間を設定します。有効期間は秒単位、またはsshd_config(5)で指定された時間形式で指定できます。

```console
$ ssh-add -t 3600 ~/.ssh/id_rsa
Identity added: /home/user/.ssh/id_rsa (user@hostname)
Lifetime set to 3600 seconds
```

### **-x**

パスワードでエージェントをロックします。

```console
$ ssh-add -x
Enter lock password: 
Again: 
Agent locked.
```

### **-X**

エージェントのロックを解除します。

```console
$ ssh-add -X
Enter unlock password: 
Agent unlocked.
```

## 使用例

### エージェントに鍵を追加する

```console
$ ssh-add ~/.ssh/id_rsa
Enter passphrase for /home/user/.ssh/id_rsa: 
Identity added: /home/user/.ssh/id_rsa (user@hostname)
```

### 複数の鍵を一度に追加する

```console
$ ssh-add ~/.ssh/id_rsa ~/.ssh/id_ed25519
Enter passphrase for /home/user/.ssh/id_rsa: 
Identity added: /home/user/.ssh/id_rsa (user@hostname)
Enter passphrase for /home/user/.ssh/id_ed25519: 
Identity added: /home/user/.ssh/id_ed25519 (user@hostname)
```

### すべてのデフォルト鍵を追加する

```console
$ ssh-add
Identity added: /home/user/.ssh/id_rsa (user@hostname)
Identity added: /home/user/.ssh/id_ed25519 (user@hostname)
```

## ヒント:

### SSHエージェントを自動的に起動する

ほとんどのシステムでは、以下の行を`~/.bashrc`または`~/.bash_profile`に追加することで、SSHエージェントが自動的に起動するようにできます：
```bash
if [ -z "$SSH_AUTH_SOCK" ]; then
   eval $(ssh-agent -s)
fi
```

### SSH設定で鍵管理を行う

手動で鍵を追加する代わりに、`~/.ssh/config`ファイルで特定のホストに使用する鍵を指定できます：
```
Host example.com
    IdentityFile ~/.ssh/special_key
```

### 鍵が既に追加されているか確認する

鍵を追加する前に、`ssh-add -l`で既に読み込まれているかを確認し、重複エントリを避けましょう。

## よくある質問

#### Q1. なぜssh-addを使用する必要があるのですか？
A. `ssh-add`を使うと、SSHエージェントに秘密鍵のパスフレーズを保存できるため、サーバーに接続するたびにパスフレーズを入力する必要がなくなります。

#### Q2. 再起動後もssh-addで鍵を記憶させるにはどうすればよいですか？
A. SSHエージェントはデフォルトでは再起動後に保持されません。`keychain`などのツールを使用するか、ログインマネージャーを設定してSSHエージェントを自動的に起動し、鍵を追加するように設定できます。

#### Q3. ssh-add -lとssh-add -Lの違いは何ですか？
A. `-l`は読み込まれた鍵のフィンガープリントを表示し（短い出力）、`-L`は完全な公開鍵データを表示します（より長く、詳細な出力）。

#### Q4. エージェントに鍵が保存される時間を制限するにはどうすればよいですか？
A. `ssh-add -t <秒数>`を使用して時間制限を設定すると、指定した時間後に鍵が自動的に削除されます。

## macOS固有の情報

macOSでは、SSHエージェントがKeychainと統合されているため、`ssh-add -K`で追加された鍵は再起動後も永続的に保存されます。新しいmacOSバージョン（Montereyおよびそれよりあとのバージョン）では、非推奨の`-K`オプションの代わりに`ssh-add --apple-use-keychain`を使用してください。

## 参考資料

https://man.openbsd.org/ssh-add.1

## 改訂履歴

- 2025/05/05 初版