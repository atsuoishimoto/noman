# ss コマンド

ソケット統計を表示し、ネットワーク接続に関する情報を提供します。

## 概要

`ss` コマンドは、ソケットを調査するためのユーティリティで、ネットワーク接続、ルーティングテーブル、ネットワークインターフェイスに関する情報を表示します。古い `netstat` コマンドよりも強力で高速な代替手段であり、Linux システム上の TCP、UDP、およびその他のソケットタイプに関する詳細な情報を提供します。

## オプション

### **-a, --all**

リッスン中および非リッスン中の両方のソケットを表示します

```console
$ ss -a
Netid  State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port  Process
u_str  ESTAB   0       0       * 19350               * 19351
u_str  ESTAB   0       0       * 19351               * 19350
tcp    LISTEN  0       128     0.0.0.0:22            0.0.0.0:*
tcp    ESTAB   0       0       192.168.1.5:22        192.168.1.10:52914
```

### **-l, --listening**

リッスン中のソケットのみを表示します

```console
$ ss -l
Netid  State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port  Process
tcp    LISTEN  0       128     0.0.0.0:22            0.0.0.0:*
tcp    LISTEN  0       128     127.0.0.1:631         0.0.0.0:*
tcp    LISTEN  0       128     127.0.0.1:25          0.0.0.0:*
```

### **-t, --tcp**

TCP ソケットのみを表示します

```console
$ ss -t
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port
ESTAB   0       0       192.168.1.5:22        192.168.1.10:52914
```

### **-u, --udp**

UDP ソケットのみを表示します

```console
$ ss -u
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port
UNCONN  0       0       0.0.0.0:68            0.0.0.0:*
UNCONN  0       0       0.0.0.0:5353          0.0.0.0:*
```

### **-p, --processes**

ソケットを使用しているプロセスを表示します

```console
$ ss -p
Netid  State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port  Process
tcp    ESTAB   0       0       192.168.1.5:22        192.168.1.10:52914 users:(("sshd",pid=1234,fd=3))
```

### **-n, --numeric**

サービス名を解決しません（代わりにポート番号を表示）

```console
$ ss -n
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port
ESTAB   0       0       192.168.1.5:22        192.168.1.10:52914
```

### **-r, --resolve**

数値アドレス/ポートを解決します

```console
$ ss -r
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port
ESTAB   0       0       server:ssh            client:52914
```

## 使用例

### すべての TCP 接続を表示

```console
$ ss -ta
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port
LISTEN  0       128     0.0.0.0:ssh           0.0.0.0:*
LISTEN  0       128     127.0.0.1:ipp         0.0.0.0:*
ESTAB   0       0       192.168.1.5:ssh       192.168.1.10:52914
```

### プロセス情報付きでリッスン中の TCP ソケットを表示

```console
$ ss -tlp
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port   Process
LISTEN  0       128     0.0.0.0:ssh           0.0.0.0:*           users:(("sshd",pid=1234,fd=3))
LISTEN  0       128     127.0.0.1:ipp         0.0.0.0:*           users:(("cupsd",pid=5678,fd=12))
```

### ポートで接続をフィルタリング

```console
$ ss -t '( dport = :ssh or sport = :ssh )'
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port
ESTAB   0       0       192.168.1.5:ssh       192.168.1.10:52914
```

## ヒント:

### 詳細な出力のためにオプションを組み合わせる

`ss -tuln` のようにオプションを組み合わせて、数値アドレスを持つ TCP および UDP のリッスンソケットを表示します。これはシステム上で開いているポートを素早く確認するのに役立ちます。

### 接続状態でフィルタリングする

`ss state established` を使用して確立された接続のみを表示したり、`ss state time-wait` を使用して TIME-WAIT 状態の接続を表示したりします。これは接続の問題をトラブルシューティングする際に役立ちます。

### リアルタイムで接続を監視する

`watch -n1 'ss -t'` を使用して、1秒ごとに更新される TCP 接続をリアルタイムで監視します。これはトラブルシューティング中に接続の変化を追跡する際に役立ちます。

## よくある質問

#### Q1. `ss` と `netstat` の違いは何ですか？
A. `ss` は `netstat` よりも高速で、より多くの情報を提供します。`/proc` ファイルを解析するのではなく、ソケット情報をカーネル空間から直接クエリします。

#### Q2. 特定のポートを使用しているプロセスを確認するにはどうすればよいですか？
A. `ss -ltp` を使用して、プロセス情報付きのリッスン中の TCP ソケットを表示します。ポートでフィルタリングすることもできます：`ss -ltp sport = :80`。

#### Q3. 特定の IP アドレスへの確立された接続を確認するにはどうすればよいですか？
A. `ss -t dst 192.168.1.10` を使用して、その IP アドレスへのすべての TCP 接続を表示します。

#### Q4. ソケットのメモリ使用量を確認するにはどうすればよいですか？
A. `ss -m` を使用して、ソケットのメモリ使用量情報を表示します。

## 参考文献

https://man7.org/linux/man-pages/man8/ss.8.html

## 改訂履歴

- 2025/05/05 初版