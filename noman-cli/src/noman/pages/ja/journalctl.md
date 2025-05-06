# journalctl コマンド

systemdジャーナルからメッセージを検索して表示します。

## 概要

`journalctl`は、systemdジャーナルシステムによって収集されたログを検索・表示するためのコマンドラインユーティリティです。システムログの閲覧、様々な条件によるエントリのフィルタリング、リアルタイムでのログの追跡などが可能です。systemdジャーナルは、構造化されたインデックス付きの形式でログデータを保存するため、特定の情報を効率的に検索・取得できます。

## オプション

### **-f, --follow**

ジャーナルをフォローし、新しいエントリが追加されるたびに表示します。

```console
$ journalctl -f
May 06 14:32:10 hostname systemd[1]: Started Daily apt download activities.
May 06 14:32:15 hostname CRON[12345]: (root) CMD (command_from_crontab)
-- Logs begin at Mon 2025-05-06 14:32:10 UTC. --
```

### **-n, --lines=**

指定した数の最新ジャーナルエントリを表示します。

```console
$ journalctl -n 5
May 06 14:30:10 hostname systemd[1]: Started Session 42 of user username.
May 06 14:30:15 hostname sshd[12345]: Accepted publickey for username from 192.168.1.10
May 06 14:31:20 hostname sudo[12346]: username : TTY=pts/0 ; PWD=/home/username ; USER=root ; COMMAND=/usr/bin/apt update
May 06 14:31:45 hostname systemd[1]: Starting Daily apt upgrade and clean activities...
May 06 14:32:10 hostname systemd[1]: Started Daily apt download activities.
```

### **-u, --unit=**

指定したsystemdユニットからのログを表示します。

```console
$ journalctl -u ssh
May 06 08:15:20 hostname sshd[1234]: Server listening on 0.0.0.0 port 22.
May 06 08:15:20 hostname sshd[1234]: Server listening on :: port 22.
May 06 14:30:15 hostname sshd[12345]: Accepted publickey for username from 192.168.1.10
```

### **-b, --boot**

現在の起動からのログを表示します。前回の起動は -b -1、その前の起動は -b -2 などと指定します。

```console
$ journalctl -b
May 06 08:00:01 hostname kernel: Linux version 5.15.0-generic
May 06 08:00:05 hostname systemd[1]: System Initialization.
May 06 08:00:10 hostname systemd[1]: Started Journal Service.
...
```

### **--since=, --until=**

指定した日時より新しい、または古いエントリを表示します。

```console
$ journalctl --since="2025-05-06 10:00:00" --until="2025-05-06 11:00:00"
May 06 10:00:05 hostname systemd[1]: Started Scheduled task.
May 06 10:15:30 hostname nginx[1234]: 192.168.1.100 - - [06/May/2025:10:15:30 +0000] "GET / HTTP/1.1" 200 612
May 06 10:45:22 hostname kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:11:22:33:44:55 SRC=203.0.113.1
```

時間指定は柔軟に行えます：

```console
$ journalctl --since="1 hour ago"
$ journalctl --since="yesterday" --until="today"
$ journalctl --since="2025-05-06" --until="2025-05-06 12:00:00"
$ journalctl --since="09:00" --until="10:00"
```

### **-p, --priority=**

メッセージの優先度でフィルタリングします（0-7またはdebug、info、notice、warning、err、crit、alert、emerg）。

```console
$ journalctl -p err
May 06 09:12:34 hostname application[1234]: Failed to connect to database: Connection refused
May 06 11:23:45 hostname kernel: CPU: 2 PID: 1234 Comm: process Tainted: G        W  O 5.15.0-generic
```

### **-k, --dmesg**

`dmesg`コマンドの出力と同様に、カーネルメッセージのみを表示します。

```console
$ journalctl -k
May 06 08:00:01 hostname kernel: Linux version 5.15.0-generic
May 06 08:00:02 hostname kernel: Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-generic
May 06 08:00:03 hostname kernel: Memory: 16384MB available
```

### **-o, --output=**

出力形式を制御します（short、short-precise、verbose、json、json-prettyなど）。

```console
$ journalctl -n 1 -o json-pretty
{
    "__CURSOR" : "s=6c081a8b9c4b4f91a4a5f5c9d8e7f6a5;i=1234;b=5a4b3c2d1e0f;m=9876543210;t=5e4d3c2b1a09;x=abcdef0123456789",
    "__REALTIME_TIMESTAMP" : "1714924330000000",
    "__MONOTONIC_TIMESTAMP" : "9876543210",
    "_BOOT_ID" : "5a4b3c2d1e0f",
    "PRIORITY" : "6",
    "_MACHINE_ID" : "0123456789abcdef0123456789abcdef",
    "_HOSTNAME" : "hostname",
    "MESSAGE" : "Started Daily apt download activities.",
    "_PID" : "1",
    "_COMM" : "systemd",
    "_EXE" : "/usr/lib/systemd/systemd",
    "_SYSTEMD_CGROUP" : "/init.scope",
    "_SYSTEMD_UNIT" : "init.scope"
}
```

## 使用例

### 特定のサービスのログを表示する

```console
$ journalctl -u nginx.service
May 06 08:10:15 hostname systemd[1]: Started A high performance web server and a reverse proxy server.
May 06 08:10:16 hostname nginx[1234]: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
May 06 08:10:16 hostname nginx[1234]: nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 時間範囲でログをフィルタリングする

```console
$ journalctl --since yesterday --until today
May 05 00:00:10 hostname systemd[1]: Starting Daily Cleanup of Temporary Directories...
May 05 00:01:15 hostname systemd[1]: Finished Daily Cleanup of Temporary Directories.
...
May 05 23:59:45 hostname systemd[1]: Starting Daily apt upgrade and clean activities...
```

### 特定の実行ファイルからのログを表示する

```console
$ journalctl /usr/bin/sshd
May 06 08:15:20 hostname sshd[1234]: Server listening on 0.0.0.0 port 22.
May 06 08:15:20 hostname sshd[1234]: Server listening on :: port 22.
May 06 14:30:15 hostname sshd[12345]: Accepted publickey for username from 192.168.1.10
```

### 複数のフィルターを組み合わせる

```console
$ journalctl -u apache2.service --since today -p err
May 06 09:45:12 hostname apache2[2345]: [error] [client 192.168.1.50] File does not exist: /var/www/html/favicon.ico
May 06 13:22:30 hostname apache2[2345]: [error] [client 192.168.1.60] PHP Fatal error: Uncaught Error: Call to undefined function in /var/www/html/index.php:42
```

## ヒント:

### 永続的なストレージを使用する

デフォルトでは、ジャーナルログは再起動後に失われる可能性があります。再起動後もログを永続化するには、`/var/log/journal`ディレクトリを作成します：

```console
$ sudo mkdir -p /var/log/journal
$ sudo systemd-tmpfiles --create --prefix /var/log/journal
```

### ジャーナルサイズを制限する

`journalctl --vacuum-size=1G`でストレージを1GBに制限したり、`journalctl --vacuum-time=1month`で1ヶ月より古いエントリを削除したりして、ジャーナルサイズを制御できます。

### フィールドフィルタリングによる高速検索

パフォーマンス向上のためにフィールド固有の検索を使用します：
```console
$ journalctl _SYSTEMD_UNIT=ssh.service _PID=1234
```

### 分析用にログをエクスポートする

さらなる分析や共有のためにログをファイルにエクスポートします：
```console
$ journalctl -u nginx --since today > nginx-logs.txt
```

### ページャーを効果的に使用する

デフォルトでは、journalctlは`less`のようなページャーを通して出力をパイプします。`/`で検索、`n`で次の一致、`q`で終了できます。ページャーを無効にするには`--no-pager`を使用します：

```console
$ journalctl --no-pager -n 20 > recent-logs.txt
```

## よくある質問

#### Q1. 現在の起動からのログのみを表示するにはどうすればよいですか？
A. `journalctl -b`を使用して、現在の起動からのログを表示します。

#### Q2. リアルタイムでログを表示するには（tail -fのように）？
A. `journalctl -f`を使用してジャーナルをフォローし、新しいエントリが到着したときに表示します。

#### Q3. 古いジャーナルエントリを消去するにはどうすればよいですか？
A. `journalctl --vacuum-time=2d`を使用して2日より古いエントリを削除するか、`journalctl --vacuum-size=500M`でジャーナルサイズを500MBに制限します。

#### Q4. 特定のアプリケーションからのログを表示するにはどうすればよいですか？
A. systemdサービスの場合は`journalctl -u サービス名.service`を、特定のバイナリの場合は`journalctl /実行ファイルへのパス`を使用します。

#### Q5. カーネルメッセージのみを表示するにはどうすればよいですか？
A. `journalctl -k`または`journalctl --dmesg`を使用して、カーネルメッセージのみを表示します。

#### Q6. 特定の時間帯のログをフィルタリングするにはどうすればよいですか？
A. `journalctl --since="YYYY-MM-DD HH:MM:SS" --until="YYYY-MM-DD HH:MM:SS"`を使用するか、`--since="1 hour ago"`や`--since="yesterday"`などの人間が読みやすい形式を使用します。

## 参考文献

https://www.freedesktop.org/software/systemd/man/journalctl.html

## 改訂履歴

- 2025/05/06 時間指定の例とページャー使用のヒントを追加。
- 2025/05/05 初版