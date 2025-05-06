# ps コマンド

実行中のプロセスに関する情報を表示します。

## 概要

`ps` コマンドは、システム上で現在実行中のプロセスのスナップショットを表示します。プロセスID（PID）、CPU使用率、メモリ消費量、その他のプロセス関連情報の詳細を提供します。デフォルトでは、`ps` は現在のユーザーが所有し、現在の端末に関連付けられたプロセスのみを表示します。

## オプション

### **-e**

すべてのプロセスに関する情報を表示します（-Aと同等）。

```console
$ ps -e
  PID TTY          TIME CMD
    1 ?        00:00:03 systemd
  546 ?        00:00:00 systemd-journal
  578 ?        00:00:00 systemd-udevd
  933 ?        00:00:00 sshd
 1028 tty1     00:00:00 bash
 1892 tty1     00:00:00 ps
```

### **-f**

UID、PID、PPID、CPU使用率などを表示する完全なフォーマットのリストを表示します。

```console
$ ps -f
UID        PID  PPID  C STIME TTY          TIME CMD
user      1028  1027  0 10:30 tty1     00:00:00 bash
user      1893  1028  0 10:35 tty1     00:00:00 ps -f
```

### **-l**

優先度、状態コード、メモリ使用量などの詳細情報を含む長いフォーマットで表示します。

```console
$ ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 S  1000  1028  1027  0  80   0 -  2546 wait   tty1     00:00:00 bash
0 R  1000  1894  1028  0  80   0 -  2715 -      tty1     00:00:00 ps
```

### **-u username**

指定したユーザーに属するプロセスを表示します。

```console
$ ps -u john
  PID TTY          TIME CMD
 1028 tty1     00:00:00 bash
 1895 tty1     00:00:00 ps
 2156 ?        00:00:01 firefox
```

### **-aux**

すべてのプロセスに関する詳細情報を表示します（BSDスタイル）。

```console
$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 168940  9128 ?        Ss   May04   0:03 /sbin/init
root       546  0.0  0.1  55492  8456 ?        Ss   May04   0:00 /lib/systemd/systemd-journald
user      1028  0.0  0.0  21712  5312 tty1     Ss   10:30   0:00 bash
user      1896  0.0  0.0  37364  3328 tty1     R+   10:36   0:00 ps aux
```

## 使用例

### 名前でプロセスを検索する

```console
$ ps -ef | grep firefox
user      2156  1028  2 10:15 ?        00:01:23 /usr/lib/firefox/firefox
user      1897  1028  0 10:36 tty1     00:00:00 grep --color=auto firefox
```

### プロセスツリーを表示する

```console
$ ps -ejH
  PID  PGID   SID TTY          TIME CMD
    1     1     1 ?        00:00:03 systemd
  546   546   546 ?        00:00:00   systemd-journal
  578   578   578 ?        00:00:00   systemd-udevd
  933   933   933 ?        00:00:00   sshd
 1027  1027  1027 tty1     00:00:00   login
 1028  1028  1028 tty1     00:00:00     bash
 1898  1898  1028 tty1     00:00:00       ps
```

### メモリ使用量でプロセスをソートする

```console
$ ps aux --sort=-%mem
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
user      2156  2.0  8.5 1854036 348216 ?      Sl   10:15   1:23 /usr/lib/firefox/firefox
user      2201  0.5  2.3 1123460 95684 ?       Sl   10:18   0:15 /usr/lib/thunderbird/thunderbird
root       546  0.0  0.1  55492  8456 ?        Ss   May04   0:00 /lib/systemd/systemd-journald
```

## ヒント:

### 出力フィールドをカスタマイズする

`-o` オプションを使用して表示するフィールドを指定します：

```console
$ ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu
  PID  PPID CMD                         %MEM %CPU
 2156  1028 /usr/lib/firefox/firefox     8.5  2.0
 2201  1028 /usr/lib/thunderbird/thun    2.3  0.5
    1     0 /sbin/init                   0.1  0.0
```

### プロセスをリアルタイムで監視する

`ps` と `watch` を組み合わせてプロセスをリアルタイムで監視します：

```console
$ watch -n 1 'ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head -10'
```

### 親子プロセスの関係を見つける

`ps -f` を使用して PPID（親プロセスID）列を確認し、プロセス間の関係を理解します。

## よくある質問

#### Q1. `ps aux` と `ps -ef` の違いは何ですか？
A. どちらもすべてのプロセスを表示しますが、`ps aux` は BSD スタイルの出力で、`ps -ef` は UNIX スタイルの出力です。`ps aux` は %CPU と %MEM の使用率を表示し、`ps -ef` は PPID（親プロセスID）を表示します。

#### Q2. CPU を最も消費しているプロセスを見つけるにはどうすればよいですか？
A. `ps aux --sort=-%cpu` を使用して、CPU 使用率の降順でプロセスをソートします。

#### Q3. メモリを最も消費しているプロセスを見つけるにはどうすればよいですか？
A. `ps aux --sort=-%mem` を使用して、メモリ使用率の降順でプロセスをソートします。

#### Q4. 特定のユーザーのプロセスだけを表示するにはどうすればよいですか？
A. `ps -u ユーザー名` を使用して、特定のユーザーが所有するプロセスのみを表示します。

## macOSに関する考慮事項

macOSでは、一部のBSDスタイルのオプションがLinuxとは異なります。例えば、`-e` は利用できませんが、`ps -A` を使用してすべてのプロセスを表示できます。また、メモリレポートの列はLinuxシステムとは異なる値を表示する場合があります。

## 参考文献

https://man7.org/linux/man-pages/man1/ps.1.html

## 改訂履歴

- 2025/05/05 初版