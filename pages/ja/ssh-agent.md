# ssh-agent コマンド

SSH秘密鍵の認証エージェントで、パスフレーズの繰り返し入力を避けるために鍵をメモリに保持します。

## 概要

ssh-agentは、SSH公開鍵認証に使用される秘密鍵を保持するプログラムです。バックグラウンドで実行され、SSHでサーバーに接続するたびにパスフレーズを入力する必要がなくなります。エージェントに鍵を追加すると、パスフレーズを一度入力するだけで、エージェントは復号化された鍵を将来の使用のためにメモリに保持します。

## オプション

### **-c**

標準出力にC-shellコマンドを生成します。SHELLがcshスタイルのシェルのように見える場合、これがデフォルトになります。

```console
$ ssh-agent -c
setenv SSH_AUTH_SOCK /tmp/ssh-XXXXXXXX/agent.12345;
setenv SSH_AGENT_PID 12345;
echo Agent pid 12345;
```

### **-s**

標準出力にBourneシェルコマンドを生成します。SHELLがcshスタイルのシェルのように見えない場合、これがデフォルトになります。

```console
$ ssh-agent -s
SSH_AUTH_SOCK=/tmp/ssh-XXXXXXXX/agent.12345; export SSH_AUTH_SOCK;
SSH_AGENT_PID=12345; export SSH_AGENT_PID;
echo Agent pid 12345;
```

### **-d**

デバッグモード。このオプションが指定されると、ssh-agentはフォークせず、デバッグ情報を標準エラーに書き込みます。

```console
$ ssh-agent -d
```

### **-a** *bind_address*

エージェントをUnixドメインソケットbind_addressにバインドします。

```console
$ ssh-agent -a /tmp/custom-ssh-agent.socket
```

### **-t** *life*

エージェントに追加されるIDの最大寿命のデフォルト値を設定します。寿命は秒単位で指定するか、sshd_config(5)で指定された時間形式で指定できます。

```console
$ ssh-agent -t 1h
```

### **-k**

現在のエージェント（SSH_AGENT_PID環境変数で指定）を終了します。

```console
$ ssh-agent -k
```

## 使用例

### ssh-agentを起動して鍵を読み込む

```console
$ eval $(ssh-agent)
Agent pid 12345
$ ssh-add
Enter passphrase for /home/user/.ssh/id_rsa: 
Identity added: /home/user/.ssh/id_rsa
```

### 特定の有効期限でssh-agentを起動する

```console
$ eval $(ssh-agent -t 4h)
Agent pid 12345
$ ssh-add
Enter passphrase for /home/user/.ssh/id_rsa: 
Identity added: /home/user/.ssh/id_rsa (will expire in 4 hours)
```

### ssh-agentプロセスを終了する

```console
$ eval $(ssh-agent -k)
Agent pid 12345 killed
```

## ヒント:

### ssh-agentをシェルの起動ファイルに追加する

`eval $(ssh-agent)`をシェルの起動ファイル（~/.bashrcや~/.zshrcなど）に追加して、ターミナルを開いたときに自動的にssh-agentを起動するようにします。

### ssh-add -lで鍵を一覧表示する

`ssh-add -l`を実行して、現在エージェントに読み込まれている鍵を確認します。

### SSHエージェントを転送する

リモートサーバーに接続する際に`ssh -A user@host`を使用して、ローカルのSSHエージェントをリモートサーバーに転送し、そのサーバーでの認証にローカルの鍵を使用できるようにします。

### セキュリティに関する考慮事項

エージェント転送（`ssh -A`）は、特に信頼できないサーバーでは注意して使用してください。リモートサーバー上のroot権限を持つ人が、あなたの鍵を使用する可能性があります。

## よくある質問

#### Q1. ssh-agentとssh-addの違いは何ですか？
A. ssh-agentは復号化された鍵を保持するバックグラウンドサービスであり、ssh-addは実行中のエージェントに鍵を追加するために使用されるコマンドです。

#### Q2. ssh-agentが実行中かどうかを確認するにはどうすればよいですか？
A. `echo $SSH_AGENT_PID`を実行します - 数字が返ってくれば、エージェントは実行中です。

#### Q3. ssh-agentを起動したときに自動的に鍵を読み込むにはどうすればよいですか？
A. `ssh-add -c ~/.ssh/id_rsa`を使用して確認付きで鍵を追加するか、IdentityFileディレクティブを含む~/.ssh/configファイルを作成します。

#### Q4. ssh-agentの実行を停止するにはどうすればよいですか？
A. `eval $(ssh-agent -k)`を実行して、現在のエージェントプロセスを終了します。

## 参考文献

https://man.openbsd.org/ssh-agent.1

## 改訂履歴

- 2025/05/05 初版