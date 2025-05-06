# digコマンド

DNSネームサーバーにドメイン情報を問い合わせます。

## 概要

`dig`（Domain Information Groper）は柔軟なDNS検索ユーティリティで、DNSサーバーにホストアドレス、メール交換、ネームサーバー、および関連情報について問い合わせを行います。DNS問題のトラブルシューティングやDNSレコードの検証によく使用されます。

## オプション

### **@server**

問い合わせるDNSサーバーを指定します

```console
$ dig @8.8.8.8 example.com
```

### **-t**

問い合わせるDNSレコードの種類を指定します（デフォルトはA）

```console
$ dig -t MX gmail.com
```

### **+short**

簡潔な回答を表示し、回答セクションのレコードデータのみを表示します

```console
$ dig +short example.com
93.184.216.34
```

### **+noall, +answer**

レスポンスのどのセクションを表示するかを制御します

```console
$ dig +noall +answer example.com
example.com.		86400	IN	A	93.184.216.34
```

### **-x**

逆引きDNS検索（IPからホスト名）を実行します

```console
$ dig -x 8.8.8.8
```

### **+trace**

ルートネームサーバーからの委任パスをトレースします

```console
$ dig +trace example.com
```

## 使用例

### Aレコードの検索（デフォルト）

```console
$ dig example.com
; <<>> DiG 9.16.1-Ubuntu <<>> example.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 31892
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;example.com.			IN	A

;; ANSWER SECTION:
example.com.		86400	IN	A	93.184.216.34

;; Query time: 28 msec
;; SERVER: 127.0.0.53#53(127.0.0.53)
;; WHEN: Mon May 05 12:00:00 UTC 2025
;; MSG SIZE  rcvd: 56
```

### MXレコードの検索

```console
$ dig -t MX gmail.com +short
10 alt1.gmail-smtp-in.l.google.com.
20 alt2.gmail-smtp-in.l.google.com.
30 alt3.gmail-smtp-in.l.google.com.
40 alt4.gmail-smtp-in.l.google.com.
5 gmail-smtp-in.l.google.com.
```

### 特定のネームサーバーへの問い合わせ

```console
$ dig @1.1.1.1 example.org
```

### ドメインのすべてのDNSレコードの確認

```console
$ dig example.com ANY
```

## ヒント:

### 素早い結果を得るには+shortを使用する

IPアドレスやレコード値だけが必要で余分な情報が不要な場合は、`dig +short domain.com`を使用すると、簡潔で最小限の出力が得られます。

### 複数のオプションを組み合わせる

`dig +noall +answer +authority example.com`のように複数のオプションを組み合わせて、DNS応答の特定のセクションのみを表示することができます。

### DNS伝播を確認する

DNS変更が伝播したかどうかを確認するには、複数のDNSサーバーに問い合わせます：`dig @8.8.8.8 example.com`と`dig @1.1.1.1 example.com`を実行して結果を比較します。

### メール配信のトラブルシューティング

メール配信の問題をトラブルシューティングする際は、`dig -t MX domain.com`を使用してメール交換レコードを確認します。

## よくある質問

#### Q1. digとnslookupの違いは何ですか？
A. `dig`はより詳細な情報を提供し、DNSトラブルシューティングにより柔軟性がありますが、`nslookup`はよりシンプルですが機能が少ないです。一般的にネットワーク管理者は`dig`を好みます。

#### Q2. DNS変更が伝播したかどうかを確認するにはどうすればよいですか？
A. `dig @server domain.com`を使用して複数のDNSサーバーに問い合わせ、結果を比較します。期待する値と一致していれば、伝播は完了しています。

#### Q3. ドメインの権威ネームサーバーを見つけるにはどうすればよいですか？
A. `dig -t NS domain.com`を使用して、ドメインを担当するネームサーバーを見つけます。

#### Q4. 逆引きDNS検索を実行するにはどうすればよいですか？
A. `dig -x IP_ADDRESS`を使用して、IPアドレスに関連付けられたホスト名を見つけます。

## 参考文献

https://linux.die.net/man/1/dig

## 改訂履歴

- 2025/05/05 初版