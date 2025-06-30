# ufw コマンド

Uncomplicated Firewall（簡易ファイアウォール）を管理するためのユーザーフレンドリーなインターフェースで、iptables ファイアウォールルールを管理します。

## 概要

UFW（Uncomplicated Firewall）は、Linux システム上の netfilter ファイアウォールルールを管理するためのシンプルなインターフェースを提供します。複雑な iptables の構文を理解する必要なく、堅牢なファイアウォール機能を提供しながら使いやすいように設計されています。UFW を使用すると、ポート、サービス、IP アドレスに基づいてトラフィックを許可または拒否することができます。

## オプション

### **enable**

ファイアウォールを有効にし、設定されたルールを適用します

```console
$ sudo ufw enable
Firewall is active and enabled on system startup
```

### **disable**

ファイアウォールを無効にし、ルールの適用を停止します

```console
$ sudo ufw disable
Firewall stopped and disabled on system startup
```

### **status**

ファイアウォールの現在の状態（有効/無効の状態やアクティブなルール）を表示します

```console
$ sudo ufw status
Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
22/tcp (v6)                ALLOW       Anywhere (v6)
80/tcp (v6)                ALLOW       Anywhere (v6)
443/tcp (v6)               ALLOW       Anywhere (v6)
```

### **status verbose**

デフォルトポリシーを含む詳細なステータス情報を表示します

```console
$ sudo ufw status verbose
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW IN    Anywhere
80/tcp                     ALLOW IN    Anywhere
```

### **allow**

指定されたポートまたは特定のアドレスからのトラフィックを許可します

```console
$ sudo ufw allow 22/tcp
Rule added
Rule added (v6)
```

### **deny**

指定されたポートまたは特定のアドレスからのトラフィックをブロックします

```console
$ sudo ufw deny 23/tcp
Rule added
Rule added (v6)
```

### **reject**

トラフィックをブロックしますが、deny とは異なり、拒否応答を送信します（deny は無言でドロップします）

```console
$ sudo ufw reject 25/tcp
Rule added
Rule added (v6)
```

### **delete**

指定されたルールを削除します

```console
$ sudo ufw delete deny 23/tcp
Rule deleted
Rule deleted (v6)
```

### **reset**

ファイアウォールを無効にし、すべてのルールを削除してデフォルト設定にリセットします

```console
$ sudo ufw reset
Resetting all rules to installed defaults. This may disrupt existing ssh connections. Proceed with operation (y|n)? y
Backing up 'user.rules' to '/etc/ufw/user.rules.20250630_123456'
Backing up 'user6.rules' to '/etc/ufw/user6.rules.20250630_123456'
```

## 使用例

### サービス名でトラフィックを許可する

```console
$ sudo ufw allow ssh
Rule added
Rule added (v6)
```

### 特定の IP アドレスからのトラフィックを許可する

```console
$ sudo ufw allow from 192.168.1.100
Rule added
```

### 特定のインターフェースの特定のポートへのトラフィックを許可する

```console
$ sudo ufw allow in on eth0 to any port 80
Rule added
```

### サブネットから特定のポートへのトラフィックを許可する

```console
$ sudo ufw allow from 192.168.1.0/24 to any port 3306
Rule added
```

### 特定のドメインへの送信トラフィックを拒否する

```console
$ sudo ufw deny out to example.com
Rule added
Rule added (v6)
```

## ヒント:

### アプリケーションプロファイルを使用する

UFW には `/etc/ufw/applications.d/` に事前定義されたアプリケーションプロファイルが含まれています。`sudo ufw app list` で利用可能なプロファイルを表示し、`sudo ufw allow "Apache Full"` のように名前で許可できます。

### ロギングを有効にする

`sudo ufw logging on` でロギングを有効にして、ブロックされた接続を追跡できます。`sudo ufw logging low|medium|high|full` で詳細レベルを制御できます。

### ルール番号を確認する

`sudo ufw status numbered` を使用してルール番号を確認すると、ルール全体の構文を再作成するのではなく、番号で特定のルールを削除するのが簡単になります。

### デフォルトポリシー

ファイアウォールを有効にする前に、`sudo ufw default deny incoming` と `sudo ufw default allow outgoing` でデフォルトポリシーを設定し、すべての着信接続をブロックしながら、すべての送信接続をデフォルトで許可します。

## よくある質問

#### Q1. UFW で SSH 接続を許可するにはどうすればよいですか？
A. `sudo ufw allow ssh` または `sudo ufw allow 22/tcp` を使用して SSH 接続を許可します。

#### Q2. UFW が実行されているかどうかを確認するにはどうすればよいですか？
A. `sudo ufw status` を実行して、ファイアウォールがアクティブかどうかと、どのルールが設定されているかを確認します。

#### Q3. ルールを削除するにはどうすればよいですか？
A. `sudo ufw delete [ルール]` を使用するか、最初に `sudo ufw status numbered` を実行してから `sudo ufw delete [番号]` で番号で削除します。

#### Q4. UFW を有効にすると現在の SSH セッションが切断されますか？
A. UFW を有効にする前に SSH（ポート 22）を許可するルールを追加していない場合、セッションが切断される可能性があります。常にファイアウォールを有効にする前に SSH ルールを追加してください。

#### Q5. 複数のポートでトラフィックを許可するにはどうすればよいですか？
A. `sudo ufw allow 80,443/tcp` を使用して、1つのコマンドで複数の TCP ポートでのトラフィックを許可できます。

## 参考文献

https://manpages.ubuntu.com/manpages/jammy/man8/ufw.8.html

## 改訂履歴

- 2025/06/30 リセット例を現在の日付で更新
- 2025/05/08 初版