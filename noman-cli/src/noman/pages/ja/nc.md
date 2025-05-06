# nc コマンド

ネットワーク接続を作成・管理し、データ転送、ポートスキャン、ネットワークデバッグを行うコマンドです。

## 概要

`nc`（netcat）は、TCPまたはUDPプロトコルを使用してネットワーク接続を介してデータを読み書きする多目的ネットワークユーティリティです。ネットワーク操作のための「スイスアーミーナイフ」として機能し、サーバーの作成、サービスへの接続、ファイル転送、ポートスキャン、ネットワーク問題のデバッグなどを行うことができます。

## オプション

### **-l**

リモートホストへの接続を開始するのではなく、着信接続をリッスンします。

```console
$ nc -l 8080
```

### **-p**

ncが使用するソースポートを指定します。

```console
$ nc -p 12345 example.com 80
```

### **-v**

詳細な出力を有効にし、より多くの接続詳細を表示します。

```console
$ nc -v example.com 80
Connection to example.com port 80 [tcp/http] succeeded!
```

### **-z**

データを送信せずにリスニングデーモンをスキャンします（ポートスキャンモード）。

```console
$ nc -z -v example.com 20-30
Connection to example.com 22 port [tcp/ssh] succeeded!
```

### **-u**

デフォルトのTCPプロトコルの代わりにUDPを使用します。

```console
$ nc -u 192.168.1.1 53
```

### **-w**

接続とポートスキャンのタイムアウトを秒単位で指定します。

```console
$ nc -w 5 example.com 80
```

### **-n**

DNS検索をスキップし、数値IPアドレスのみを使用します。

```console
$ nc -n 192.168.1.1 80
```

## 使用例

### 簡単なチャットサーバーとクライアント

```console
# サーバー側
$ nc -l 1234
Hello from client!
Hello from server!

# クライアント側
$ nc 192.168.1.100 1234
Hello from client!
Hello from server!
```

### ファイル転送

```console
# 受信側
$ nc -l 1234 > received_file.txt

# 送信側
$ nc 192.168.1.100 1234 < file_to_send.txt
```

### ポートスキャン

```console
$ nc -z -v 192.168.1.1 20-30
Connection to 192.168.1.1 22 port [tcp/ssh] succeeded!
Connection to 192.168.1.1 25 port [tcp/smtp] succeeded!
```

### HTTPリクエスト

```console
$ echo -e "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n" | nc example.com 80
HTTP/1.1 200 OK
Content-Type: text/html
...
```

## ヒント

### 永続的なリスニングサーバー

クライアント切断後もサーバーを実行し続けるには、（サポートされているシステムで）`-k`オプションを使用します：
```console
$ nc -k -l 8080
```

### バナーグラビング

特定のポートで実行されているサービスを素早く識別します：
```console
$ nc -v example.com 22
SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.5
```

### プロキシ接続

ncを使用して2つのエンドポイント間の簡単なプロキシを作成します：
```console
$ nc -l 8080 | nc example.com 80
```

### ネットワーク問題のデバッグ

接続問題のトラブルシューティングを行う際は、アプリケーション固有のデバッグに入る前に、ncを使用して特定のポートに到達可能かどうかをテストします。

## よくある質問

#### Q1. ncで簡単なチャットサーバーを作成するにはどうすればよいですか？
A. サーバー側で`nc -l PORT`を実行し、クライアント側で`nc SERVER_IP PORT`を実行します。メッセージを入力してEnterキーを押すと送信されます。

#### Q2. ncを使用してファイルを転送できますか？
A. はい。受信側で`nc -l PORT > filename`を実行し、送信側で`nc DESTINATION_IP PORT < filename`を実行します。

#### Q3. ncでオープンポートをスキャンするにはどうすればよいですか？
A. `nc -z -v TARGET_IP PORT_RANGE`を使用します（例：`nc -z -v example.com 20-100`）。

#### Q4. 機密データの転送にncは安全ですか？
A. いいえ、ncはデータを平文で送信します。機密データには、scp、sftpなどの安全な代替手段を使用するか、送信前にデータを暗号化してください。

#### Q5. ncとncatの違いは何ですか？
A. ncatはNmapプロジェクトの一部であり、従来のncとの互換性を維持しながら、SSL対応、プロキシ接続、より高度なオプションなどの追加機能を提供します。

## 参考文献

https://man.openbsd.org/nc.1

## 改訂履歴

- 2025/05/05 初版