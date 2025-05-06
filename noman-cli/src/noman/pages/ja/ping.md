# ping コマンド

ネットワーク接続を確認するために、ICMP ECHO_REQUESTパケットをネットワークホストに送信します。

## 概要

`ping`コマンドは、指定したホストにインターネット制御メッセージプロトコル（ICMP）エコーリクエストパケットを送信し、応答を待つことでネットワーク接続をテストします。ホストに到達可能かどうかの確認、往復時間の測定、ネットワーク問題の診断によく使用されます。

## オプション

### **-c count**

指定した数（count）のECHO_RESPONSEパケットを送信（および受信）した後に停止します。

```console
$ ping -c 4 google.com
PING google.com (142.250.190.78): 56 data bytes
64 bytes from 142.250.190.78: icmp_seq=0 ttl=116 time=14.252 ms
64 bytes from 142.250.190.78: icmp_seq=1 ttl=116 time=14.618 ms
64 bytes from 142.250.190.78: icmp_seq=2 ttl=116 time=14.465 ms
64 bytes from 142.250.190.78: icmp_seq=3 ttl=116 time=14.361 ms

--- google.com ping statistics ---
4 packets transmitted, 4 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 14.252/14.424/14.618/0.135 ms
```

### **-i interval**

各パケットの送信間隔を指定した秒数（interval）待ちます。デフォルトでは各パケット間に1秒待機します。

```console
$ ping -i 2 -c 3 example.com
PING example.com (93.184.216.34): 56 data bytes
64 bytes from 93.184.216.34: icmp_seq=0 ttl=56 time=11.632 ms
64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=11.726 ms
64 bytes from 93.184.216.34: icmp_seq=2 ttl=56 time=11.978 ms

--- example.com ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 11.632/11.779/11.978/0.146 ms
```

### **-t ttl**

送信パケットのIP存続時間（TTL）を設定します。

```console
$ ping -t 64 -c 2 github.com
PING github.com (140.82.121.3): 56 data bytes
64 bytes from 140.82.121.3: icmp_seq=0 ttl=64 time=15.361 ms
64 bytes from 140.82.121.3: icmp_seq=1 ttl=64 time=15.244 ms

--- github.com ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 15.244/15.303/15.361/0.059 ms
```

### **-s packetsize**

送信するデータバイト数を指定します。デフォルトは56バイトで、8バイトのICMPヘッダーデータと組み合わせると64バイトのICMPデータになります。

```console
$ ping -s 100 -c 2 example.com
PING example.com (93.184.216.34): 100 data bytes
108 bytes from 93.184.216.34: icmp_seq=0 ttl=56 time=11.632 ms
108 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=11.726 ms

--- example.com ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 11.632/11.679/11.726/0.047 ms
```

## 使用例

### 基本的な接続テスト

```console
$ ping google.com
PING google.com (142.250.190.78): 56 data bytes
64 bytes from 142.250.190.78: icmp_seq=0 ttl=116 time=14.252 ms
64 bytes from 142.250.190.78: icmp_seq=1 ttl=116 time=14.618 ms
^C
--- google.com ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 14.252/14.435/14.618/0.183 ms
```

### IPアドレスへのping

```console
$ ping -c 3 8.8.8.8
PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=116 time=12.252 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=12.618 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=116 time=12.465 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 12.252/12.445/12.618/0.150 ms
```

### タイムスタンプ付きの継続的なping

```console
$ ping -D example.com
PING example.com (93.184.216.34): 56 data bytes
[1715011234.123456] 64 bytes from 93.184.216.34: icmp_seq=0 ttl=56 time=11.632 ms
[1715011235.125678] 64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=11.726 ms
^C
--- example.com ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 11.632/11.679/11.726/0.047 ms
```

## ヒント

### pingを適切に終了する

実行中のpingコマンドを停止するには、Ctrl+Cを押します。これによりping統計の概要が表示されます。

### ネットワークの遅延を確認する

ping応答の「time」値に注目してください。値が高いほど遅延が大きいことを示し、ビデオ通話やオンラインゲームなどのリアルタイムアプリケーションに影響を与える可能性があります。

### パケットロスを解釈する

パケットロス（統計に表示される）はネットワークの問題を示します。時折のパケットロス（1-2%）は正常かもしれませんが、一貫した、または高いパケットロスはネットワークの問題を示唆しています。

### トラブルシューティングにpingを使用する

ホストにpingできない場合は、中間デバイスや既知の動作中のホストにpingを試みて、接続問題が発生している可能性のある場所を特定してください。

## よくある質問

#### Q1. 「Request timeout」とはどういう意味ですか？
A. ターゲットホストが予想時間内に応答しなかったことを意味します。これはネットワークの輻輳、ファイアウォールのブロック、またはホストがオフラインであることを示している可能性があります。

#### Q2. なぜpingはIPアドレスでは機能するが、ドメイン名では機能しないことがあるのですか？
A. これは通常、DNS解決の問題を示しています。ネットワークはIPアドレスに直接到達できますが、ドメイン名をIPアドレスに変換できません。

#### Q3. pingで特定のポートが開いているかどうかを確認できますか？
A. いいえ、pingはICMPを使用した基本的なIP接続のみをテストします。特定のポートが開いているかどうかをテストするには、`telnet`や`nc`（netcat）などのツールを使用してください。

#### Q4. なぜpingがブロックされることがあるのですか？
A. 多くのネットワークやサーバーはセキュリティ上の理由からICMPパケットをブロックしています。pingが失敗してもホストがダウンしているとは限りません。

## macOSに関する考慮事項

macOSでは、1秒未満の間隔に変更するなど、特定のオプションを使用するためにsudoでpingを実行する必要がある場合があります。また、Linuxバージョンのpingで利用可能な一部のオプションは、macOSでは利用できないか、構文が異なる場合があります。

## 参考資料

https://man.openbsd.org/ping.8

## 改訂履歴

- 2025/05/05 初版