# iotop コマンド

システム上のプロセスによるI/O使用状況を監視します。

## 概要

`iotop`は、プロセスやスレッドによるI/O使用状況を監視するtopのようなユーティリティです。リアルタイムのディスクI/O統計を表示し、どのプロセスが最もディスクの読み書き帯域幅を使用しているかを示します。このツールは、システムの遅延を引き起こす可能性のあるI/O集約型プロセスを特定するのに特に役立ちます。

## オプション

### **-o, --only**

実際にI/Oを実行しているプロセスやスレッドのみを表示します

```console
$ sudo iotop -o
Total DISK READ:         0.00 B/s | Total DISK WRITE:         7.63 K/s
Current DISK READ:       0.00 B/s | Current DISK WRITE:       0.00 B/s
    TID  PRIO  USER     DISK READ  DISK WRITE  SWAPIN     IO>    COMMAND
   1234 be/4 root        0.00 B/s    7.63 K/s  0.00 %  0.00 % systemd-journald
```

### **-b, --batch**

非対話モードで実行します。ログ記録に便利です

```console
$ sudo iotop -b -n 5
Total DISK READ:         0.00 B/s | Total DISK WRITE:        15.27 K/s
Current DISK READ:       0.00 B/s | Current DISK WRITE:       0.00 B/s
    TID  PRIO  USER     DISK READ  DISK WRITE  SWAPIN     IO>    COMMAND
      1 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % systemd
   1234 be/4 root        0.00 B/s   15.27 K/s  0.00 %  0.00 % systemd-journald
[...]
```

### **-n NUM, --iter=NUM**

終了前の繰り返し回数を設定します（非対話モード用）

```console
$ sudo iotop -b -n 2
Total DISK READ:         0.00 B/s | Total DISK WRITE:        15.27 K/s
[...2回分の出力...]
```

### **-d SEC, --delay=SEC**

繰り返し間の遅延を秒単位で設定します（デフォルトは1.0）

```console
$ sudo iotop -d 5
# デフォルトの1秒ではなく5秒ごとに更新されます
```

### **-p PID, --pid=PID**

指定したPIDのプロセスのみを監視します

```console
$ sudo iotop -p 1234
# PID 1234のプロセスのI/O統計のみを表示します
```

### **-u USER, --user=USER**

指定したユーザーのプロセスのみを監視します

```console
$ sudo iotop -u apache
# 'apache'ユーザーが所有するプロセスのI/O統計のみを表示します
```

### **-a, --accumulated**

帯域幅ではなく累積I/Oを表示します

```console
$ sudo iotop -a
# 現在のレートではなく、プロセス開始以降の合計I/Oを表示します
```

## 使用例

### 基本的な監視

```console
$ sudo iotop
Total DISK READ:         0.00 B/s | Total DISK WRITE:        23.47 K/s
Current DISK READ:       0.00 B/s | Current DISK WRITE:       0.00 B/s
    TID  PRIO  USER     DISK READ  DISK WRITE  SWAPIN     IO>    COMMAND
      1 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % systemd
   1234 be/4 root        0.00 B/s   15.27 K/s  0.00 %  0.00 % systemd-journald
   2345 be/4 mysql       0.00 B/s    8.20 K/s  0.00 %  0.00 % mysqld
```

### I/Oアクティビティをファイルに記録する

```console
$ sudo iotop -botq -n 10 > io_log.txt
# バッチモードで10回分のI/Oアクティビティをログに記録し、I/Oを実行しているプロセスのみを表示し、
# タイムスタンプを含め、ヘッダー情報なしで出力します
```

### 特定ユーザーのプロセスを監視する

```console
$ sudo iotop -o -u www-data
# www-dataユーザーが所有するI/Oアクティブなプロセスのみを表示します
```

## ヒント:

### 対話的コマンド

iotopを対話的に実行している間、以下のキーボードショートカットを使用できます：
- `o`: --onlyモードの切り替え（I/Oを実行しているプロセスのみを表示）
- `p`: プロセス表示の切り替え（スレッドとの切り替え）
- `a`: 累積I/Oモードの切り替え
- `q`: プログラムの終了

### sudoで実行

`iotop`はI/O統計にアクセスするために管理者権限が必要です。常に`sudo`を付けるか、rootユーザーとして実行してください。

### I/Oボトルネックの特定

`iotop -o`を使用して、現在I/O負荷を引き起こしているプロセスをすばやく特定できます。これはシステムの遅延のトラブルシューティングに役立ちます。

### ログ記録と組み合わせる

長期的な監視には、`iotop -b -o -n [回数] > ログファイル`を使用して、時間の経過とともにI/O統計を記録します。

## よくある質問

#### Q1. 「iotop: command not found」と表示されるのはなぜですか？
A. まずiotopをインストールする必要があります。Debian/Ubuntuでは：`sudo apt install iotop`、RHEL/CentOSでは：`sudo yum install iotop`を実行してください。

#### Q2. iotopを実行すると「Permission denied」と表示されるのはなぜですか？
A. iotopは管理者権限が必要です。`sudo iotop`として実行するか、rootユーザーとして実行してください。

#### Q3. ディスクI/Oを積極的に使用しているプロセスだけを見るにはどうすればよいですか？
A. `sudo iotop -o`を使用して、実際にI/O操作を実行しているプロセスのみを表示します。

#### Q4. iotopの出力をファイルに記録できますか？
A. はい、バッチモードを使用します：`sudo iotop -b -n [繰り返し回数] > ファイル名.log`

#### Q5. 特定のプロセスのI/Oを監視するにはどうすればよいですか？
A. `sudo iotop -p PID`を使用します。PIDは監視したいプロセスIDです。

## 参考文献

https://man7.org/linux/man-pages/man8/iotop.8.html

## 改訂履歴

- 2025/05/05 初版