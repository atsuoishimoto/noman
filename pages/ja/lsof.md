# lsofコマンド

開いているファイルとそれを開いたプロセスを一覧表示します。

## 概要

`lsof`（list open filesの略）は、システム上で実行中のプロセスによって現在開かれているファイルに関する情報を表示します。特定のファイルを開いているプロセス、特定のプロセスが開いているファイル、ネットワーク接続などを表示できます。このコマンドは、システムのトラブルシューティング、セキュリティ監視、システムリソースの使用状況の理解に非常に役立ちます。

## オプション

### **-p PID**

指定したプロセスIDによって開かれたすべてのファイルを一覧表示します。

```console
$ lsof -p 1234
COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
bash     1234   user  cwd    DIR    8,1     4096 123456 /home/user
bash     1234   user  txt    REG    8,1   940336 789012 /usr/bin/bash
```

### **-i**

インターネット接続（ネットワークファイル）に関連するファイルを一覧表示します。

```console
$ lsof -i
COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
chrome   1234   user   52u  IPv4  12345      0t0  TCP localhost:49152->localhost:http (ESTABLISHED)
sshd     5678   root    3u  IPv4  23456      0t0  TCP *:ssh (LISTEN)
```

### **-i:[port]**

指定したポートに関連するファイルを一覧表示します。

```console
$ lsof -i:22
COMMAND  PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
sshd    1234 root    3u  IPv4  12345      0t0  TCP *:ssh (LISTEN)
```

### **-u username**

特定のユーザーによって開かれたファイルを一覧表示します。

```console
$ lsof -u john
COMMAND  PID   USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
bash    1234   john  cwd    DIR    8,1     4096 123456 /home/john
chrome  2345   john   10r   REG    8,1    12345 234567 /home/john/Downloads/file.pdf
```

### **-c command**

指定したコマンド名を持つプロセスによって開かれたファイルを一覧表示します。

```console
$ lsof -c chrome
COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
chrome   1234   user  cwd    DIR    8,1     4096 123456 /home/user
chrome   1234   user  txt    REG    8,1 12345678 234567 /opt/google/chrome/chrome
```

### **-t**

プロセスIDのみを表示します。スクリプト作成に便利です。

```console
$ lsof -t -i:80
1234
5678
```

### **+D directory**

指定したディレクトリとそのサブディレクトリ内のすべての開いているファイルを一覧表示します。

```console
$ lsof +D /var/log
COMMAND  PID USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
rsyslogd 123 root    5w   REG    8,1    12345 123456 /var/log/syslog
nginx   1234 www     3w   REG    8,1     5678 234567 /var/log/nginx/access.log
```

## 使用例

### 特定のファイルを使用しているプロセスを見つける

```console
$ lsof /var/log/syslog
COMMAND  PID USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
rsyslogd 123 root    5w   REG    8,1    12345 123456 /var/log/syslog
```

### 特定のポートをリッスンしているプロセスを見つける

```console
$ lsof -i TCP:80
COMMAND  PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
nginx   1234 root    6u  IPv4  12345      0t0  TCP *:http (LISTEN)
```

### 複数のオプションを組み合わせる

```console
$ lsof -u john -c chrome -i TCP
COMMAND  PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
chrome  1234  john   52u  IPv4  12345      0t0  TCP localhost:49152->server:https (ESTABLISHED)
chrome  1234  john   60u  IPv4  23456      0t0  TCP localhost:49153->cdn:https (ESTABLISHED)
```

## ヒント

### 削除されたファイルを使用しているプロセスを見つける

プロセスが削除されたファイルを開いている場合、`lsof | grep deleted`で見つけることができます。これは、削除されたファイルを保持しているプロセスを再起動してディスク容量を解放するのに役立ちます。

### ネットワーク接続の監視

`lsof -i -P -n`を使用して、数値ポートとIPアドレスを持つすべてのネットワーク接続を表示します。`-P`はポート番号からサービス名への変換を防ぎ、`-n`はホスト名の検索を防ぎます。

### メモリマップされたファイルを見つける

`lsof -a -p PID -d mem`を使用して、特定のプロセスのメモリマップされたファイルを確認します。これはメモリ使用パターンを理解するのに役立ちます。

### 継続的な監視

`lsof -r 2`を使用して、2秒ごとに一覧を繰り返し表示します。これは変化するファイル使用パターンを監視するのに役立ちます。

## よくある質問

#### Q1. 特定のポートを使用しているプロセスを見つけるにはどうすればよいですか？
A. `lsof -i:ポート番号`を使用します（例：HTTPポートの場合は`lsof -i:80`）。

#### Q2. すべてのネットワーク接続を確認するにはどうすればよいですか？
A. すべてのネットワーク接続を見るには`lsof -i`を使用するか、TCPのみの接続を見るには`lsof -i TCP`を使用します。

#### Q3. 特定のユーザーによって開かれたすべてのファイルを見つけるにはどうすればよいですか？
A. `lsof -u ユーザー名`を使用して、特定のユーザーによって開かれたすべてのファイルを一覧表示します。

#### Q4. 特定のディレクトリにアクセスしているプロセスを見つけるにはどうすればよいですか？
A. `lsof +D /path/to/directory`を使用して、そのディレクトリ内のファイルにアクセスしているすべてのプロセスを一覧表示します。

#### Q5. 特定のファイルを使用しているプロセスを見つけるにはどうすればよいですか？
A. 単に`lsof /path/to/file`を実行して、そのファイルを開いているプロセスを確認します。

## macOSに関する考慮事項

macOSでは、`lsof`の動作がLinuxバージョンと若干異なる場合があります：
- 出力形式に若干の違いがある場合があります
- `+D`などの一部のオプションは、ファイルシステムの違いによりmacOSでは遅くなる場合があります
- ネットワーク接続の場合、macOSはデフォルトでサービス名を解決する傾向があるため、`lsof -i -P`の使用を検討してください

## 参考文献

https://www.freebsd.org/cgi/man.cgi?query=lsof

## 改訂履歴

- 2025/05/05 初版