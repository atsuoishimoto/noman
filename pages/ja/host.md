# hostコマンド

DNSサーバーに問い合わせを行うDNS検索ユーティリティです。

## 概要

`host`コマンドは、DNS検索を実行するためのシンプルなユーティリティです。ドメイン名をIPアドレスに、またその逆の変換を行うことができます。また、MX（メール交換）、NS（ネームサーバー）などのDNSレコードタイプを照会するためにも使用できます。ネットワークのトラブルシューティングやDNS検証によく使用されます。

## オプション

### **-t, --type**

クエリタイプを指定します（例：A, AAAA, MX, NS, SOA, TXT）

```console
$ host -t MX gmail.com
gmail.com mail is handled by 10 alt1.gmail-smtp-in.l.google.com.
gmail.com mail is handled by 20 alt2.gmail-smtp-in.l.google.com.
gmail.com mail is handled by 30 alt3.gmail-smtp-in.l.google.com.
gmail.com mail is handled by 40 alt4.gmail-smtp-in.l.google.com.
gmail.com mail is handled by 5 gmail-smtp-in.l.google.com.
```

### **-a, --all**

-vを使用し、クエリタイプをANYに設定するのと同等です

```console
$ host -a example.com
Trying "example.com"
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;example.com.                   IN      ANY

;; ANSWER SECTION:
example.com.            86400   IN      A       93.184.216.34
```

### **-v, --verbose**

より詳細な情報を含む詳細出力を有効にします

```console
$ host -v google.com
Trying "google.com"
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;google.com.                    IN      A

;; ANSWER SECTION:
google.com.             300     IN      A       142.250.190.78
```

### **-4, --ipv4**

IPv4クエリトランスポートのみを使用します

```console
$ host -4 example.com
example.com has address 93.184.216.34
example.com has IPv6 address 2606:2800:220:1:248:1893:25c8:1946
example.com mail is handled by 0 .
```

### **-6, --ipv6**

IPv6クエリトランスポートのみを使用します

```console
$ host -6 example.com
example.com has address 93.184.216.34
example.com has IPv6 address 2606:2800:220:1:248:1893:25c8:1946
example.com mail is handled by 0 .
```

## 使用例

### 基本的なドメイン検索

```console
$ host google.com
google.com has address 142.250.190.78
google.com has IPv6 address 2a00:1450:4001:830::200e
google.com mail is handled by 10 smtp.google.com.
```

### 逆引きDNS検索

```console
$ host 8.8.8.8
8.8.8.8.in-addr.arpa domain name pointer dns.google.
```

### 特定のDNSサーバーに問い合わせる

```console
$ host example.com 1.1.1.1
Using domain server:
Name: 1.1.1.1
Address: 1.1.1.1#53
Aliases: 

example.com has address 93.184.216.34
example.com has IPv6 address 2606:2800:220:1:248:1893:25c8:1946
example.com mail is handled by 0 .
```

## ヒント:

### クイック検索には短い形式を使用する

日常的なDNS検索では、最も単純な形式の`host domain.com`が通常十分であり、最も一般的な情報（A、AAAA、およびMXレコード）を提供します。

### メール配信の問題をトラブルシューティングする

メール配信の問題を診断する場合は、`host -t MX domain.com`を使用してドメインのメール交換レコードを確認します。

### DNS伝播を確認する

DNS変更を行った後、異なるDNSサーバーで`host`を使用して変更が伝播されたかどうかを確認します：`host domain.com 8.8.8.8`と`host domain.com 1.1.1.1`。

## よくある質問

#### Q1. `host`と`dig`の違いは何ですか？
A. `host`は一般的な検索に焦点を当てた、よりシンプルで人間が読みやすい出力を提供します。一方、`dig`はDNS管理者やデバッグに役立つ形式で、より詳細なDNS情報を提供します。

#### Q2. ドメインのすべてのDNSレコードを確認するにはどうすればよいですか？
A. `host -a domain.com`を使用して、ドメインのすべてのレコードタイプを照会します。

#### Q3. DNSサーバーが応答しているかどうかを確認するために`host`を使用できますか？
A. はい、ドメインの後にDNSサーバーを指定します：`host domain.com dns-server-ip`。

#### Q4. ネームサーバーレコードを検索するにはどうすればよいですか？
A. `host -t NS domain.com`を使用して、ドメインのネームサーバーを照会します。

## 参考資料

https://linux.die.net/man/1/host

## 改訂履歴

- 2025/05/05 初版