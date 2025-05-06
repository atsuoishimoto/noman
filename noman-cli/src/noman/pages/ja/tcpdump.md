# tcpdumpコマンド

システム上のネットワークトラフィックをキャプチャして分析します。

## 概要

`tcpdump`は強力なコマンドラインパケットアナライザで、ネットワーク経由で送受信されるTCP/IPやその他のパケットをキャプチャして表示することができます。ネットワークのトラブルシューティング、セキュリティ分析、ネットワークアクティビティの監視によく使用されます。

## オプション

### **-i インターフェース**

リッスンするネットワークインターフェースを指定します

```console
$ tcpdump -i eth0
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:45:22.357932 IP host1.ssh > host2.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

### **-n**

アドレス（ホストアドレス、ポート番号など）を名前に変換しません

```console
$ tcpdump -n
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:46:12.357932 IP 192.168.1.10.22 > 192.168.1.20.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

### **-c カウント**

指定した数のパケットをキャプチャした後に終了します

```console
$ tcpdump -c 5
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
5 packets captured
5 packets received by filter
0 packets dropped by kernel
```

### **-w ファイル**

パケットを解析して表示する代わりに、生のパケットをファイルに書き込みます

```console
$ tcpdump -w capture.pcap
tcpdump: listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
^C
45 packets captured
45 packets received by filter
0 packets dropped by kernel
```

### **-r ファイル**

ファイルからパケットを読み込みます（以前に-wオプションで作成したもの）

```console
$ tcpdump -r capture.pcap
reading from file capture.pcap, link-type EN10MB (Ethernet)
13:45:22.357932 IP host1.ssh > host2.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

### **-v, -vv, -vvv**

詳細レベルを上げます（より多くのパケット情報を表示）

```console
$ tcpdump -v
tcpdump: listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:45:22.357932 IP (tos 0x10, ttl 64, id 12345, offset 0, flags [DF], proto TCP (6), length 104) host1.ssh > host2.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

## 使用例

### 特定のインターフェースでパケットをキャプチャする

```console
$ tcpdump -i eth0
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:45:22.357932 IP host1.ssh > host2.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

### ホストでトラフィックをフィルタリングする

```console
$ tcpdump host 192.168.1.10
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:45:22.357932 IP 192.168.1.10.ssh > host2.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

### ポートでトラフィックをフィルタリングする

```console
$ tcpdump port 80
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:45:22.357932 IP host1.http > host2.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

### パケットをキャプチャしてファイルに保存する

```console
$ tcpdump -w capture.pcap -i eth0
tcpdump: listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
^C
45 packets captured
45 packets received by filter
0 packets dropped by kernel
```

## ヒント:

### 完全なアクセスのためにsudoで実行する

ほとんどのシステムではパケットをキャプチャするために管理者権限が必要です。適切な権限を確保するために`sudo tcpdump`を使用してください。

### 対象を絞ったキャプチャにはフィルタ式を使用する

フィルタを組み合わせてトラフィックを絞り込みます：`tcpdump 'tcp port 80 and host 192.168.1.10'`は特定のホストとの間のHTTPトラフィックのみをキャプチャします。

### 高速なキャプチャのために名前解決を無効にする

特に混雑したネットワークでは、DNSルックアップによってパケットキャプチャが遅くなる可能性があるため、`-n`を使用してください。

### パケットの内容全体をキャプチャする

ヘッダーだけでなくパケット全体をキャプチャするには`-s 0`を使用します（最新バージョンのデフォルトは262144バイトです）。

### 分析にはWiresharkを使用する

`-w ファイル名.pcap`でキャプチャを保存し、詳細なグラフィカル分析のためにWiresharkで開きます。

## よくある質問

#### Q1. 特定のインターフェースでパケットをキャプチャするにはどうすればよいですか？
A. `tcpdump -i インターフェース名`を使用します（例：`tcpdump -i eth0`）。

#### Q2. キャプチャしたパケットをファイルに保存するにはどうすればよいですか？
A. `tcpdump -w ファイル名.pcap`を使用して生のパケットをファイルに保存します。

#### Q3. IPアドレスでトラフィックをフィルタリングするにはどうすればよいですか？
A. `tcpdump host 192.168.1.10`を使用して、そのIPとの間のトラフィックをキャプチャします。

#### Q4. ポート番号でフィルタリングするにはどうすればよいですか？
A. `tcpdump port 80`を使用してHTTPトラフィックまたはポート80上のすべてのトラフィックをキャプチャします。

#### Q5. より詳細なパケット情報を見るにはどうすればよいですか？
A. `-v`、`-vv`、または`-vvv`フラグを使用して詳細レベルを上げます。

## 参考文献

https://www.tcpdump.org/manpages/tcpdump.1.html

## 改訂履歴

- 2025/05/05 初版