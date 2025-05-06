# tail コマンド

ファイルの末尾部分を表示します。

## 概要

`tail` コマンドは、1つ以上のファイルの末尾部分（デフォルトでは10行）を出力します。ログファイルの最新エントリの確認、ファイル変更のリアルタイム監視、またはファイル全体を開かずにテキストファイルの末尾を確認するのによく使用されます。

## オプション

### **-n, --lines=NUM**

末尾からNUM行を出力します（デフォルトは10行）

```console
$ tail -n 5 /var/log/syslog
May  5 10:15:22 hostname service[1234]: Processing request
May  5 10:15:23 hostname service[1234]: Request completed
May  5 10:15:25 hostname service[1234]: New connection from 192.168.1.5
May  5 10:15:26 hostname service[1234]: Processing request
May  5 10:15:27 hostname service[1234]: Request completed
```

### **-f, --follow**

ファイルが成長するにつれて追加されたデータを出力します。ログファイルの監視に便利です

```console
$ tail -f /var/log/apache2/access.log
192.168.1.5 - - [05/May/2025:10:15:22 +0000] "GET /index.html HTTP/1.1" 200 2326
192.168.1.6 - - [05/May/2025:10:15:25 +0000] "GET /images/logo.png HTTP/1.1" 200 4589
192.168.1.7 - - [05/May/2025:10:15:27 +0000] "POST /login HTTP/1.1" 302 -
```

### **-c, --bytes=NUM**

末尾からNUMバイトを出力します

```console
$ tail -c 20 file.txt
end of the file.
```

### **-q, --quiet, --silent**

ファイル名を示すヘッダーを出力しません

```console
$ tail -q file1.txt file2.txt
Last line of file1
Last line of file2
```

### **--pid=PID**

-fと共に使用すると、プロセスID（PID）が終了した後に終了します

```console
$ tail -f --pid=1234 logfile.txt
```

## 使用例

### 複数のログファイルを同時に監視する

```console
$ tail -f /var/log/syslog /var/log/auth.log
==> /var/log/syslog <==
May  5 10:20:22 hostname service[1234]: Processing request

==> /var/log/auth.log <==
May  5 10:20:25 hostname sshd[5678]: Accepted publickey for user from 192.168.1.10
```

### 行番号付きで末尾20行を表示する

```console
$ tail -n 20 file.txt | nl
     1  Line content here
     2  More content here
     ...
     20 Last line here
```

### プロセスが終了したときに停止するログファイルの監視

```console
$ tail -f --pid=$(pgrep apache2) /var/log/apache2/access.log
```

## ヒント:

### grepと組み合わせてフィルタリングする

`tail -f logfile.txt | grep ERROR` を使用して、ログファイルをリアルタイムで監視しながら「ERROR」を含む行のみを表示します。

### headと組み合わせて中間部分を取得する

`head -n 20 file.txt | tail -n 10` でファイルの中間部分（11〜20行目）を抽出できます。

### 複数ファイルを効率的に監視する

`tail -f` で複数のログファイルを監視する場合、`--retry` を使用するとファイルが一時的にアクセス不能になり、後で再表示された場合も継続して監視できます。

### フォローモードを適切に終了する

監視が終わったら、Ctrl+Cを押してtailのフォローモードを終了します。

## よくある質問

#### Q1. ファイルの最後の10行を表示するにはどうすればよいですか？
A. 単に `tail ファイル名` または `tail -n 10 ファイル名` を使用します。

#### Q2. ログファイルの変更をリアルタイムで監視するにはどうすればよいですか？
A. `tail -f logfile.txt` を使用して、新しいコンテンツが追加されるとリアルタイムでファイルを監視します。

#### Q3. 複数のファイルを一度に監視できますか？
A. はい、`tail -f file1.txt file2.txt` を使用して複数のファイルを同時に監視できます。

#### Q4. 末尾から特定の行数を表示するにはどうすればよいですか？
A. `tail -n 数字 ファイル名` を使用します。「数字」は表示したい行数です。

#### Q5. tailのフォローモードを終了するにはどうすればよいですか？
A. フォローモード中にCtrl+Cを押してtailコマンドを終了します。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/tail-invocation.html

## 改訂履歴

- 2025/05/05 初版