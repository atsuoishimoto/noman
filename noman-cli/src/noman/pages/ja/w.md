# w コマンド

現在ログインしているユーザーとそのプロセスに関する情報を表示します。

## 概要

`w` コマンドは、誰がログインしていて何をしているかを表示します。システムの現在のアクティビティの概要を表示し、ユーザー名、端末名、リモートホスト、ログイン時間、アイドル時間、CPU使用率、および現在のプロセスのコマンドラインが含まれます。

## オプション

### **-h, --no-header**

ヘッダーを表示しません

```console
$ w -h
user     tty      from             login@   idle   JCPU   PCPU  what
john     tty1     -                09:15    0.00s  0.05s  0.01s  w -h
jane     pts/0    192.168.1.5      08:30    2:35   0.10s  0.05s  vim document.txt
```

### **-s, --short**

短い形式を使用します（ログイン時間、JCPUまたはPCPU時間を表示しません）

```console
$ w -s
 10:15:03 up  1:33,  3 users,  load average: 0.01, 0.03, 0.05
USER     TTY      FROM             IDLE   WHAT
john     tty1     -                0.00s  w -s
jane     pts/0    192.168.1.5      2:35   vim document.txt
bob      pts/1    10.0.0.25        0.00s  top
```

### **-f, --from**

FROM（リモートホスト名）フィールドの表示を切り替えます

```console
$ w -f
 10:15:03 up  1:33,  3 users,  load average: 0.01, 0.03, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
john     tty1     -                09:15    0.00s  0.05s  0.01s w -f
jane     pts/0    192.168.1.5      08:30    2:35   0.10s  0.05s vim document.txt
bob      pts/1    10.0.0.25        10:05    0.00s  0.15s  0.10s top
```

### **-i, --ip-addr**

FROMフィールドにホスト名の代わりにIPアドレスを表示します

```console
$ w -i
 10:15:03 up  1:33,  3 users,  load average: 0.01, 0.03, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
john     tty1     -                09:15    0.00s  0.05s  0.01s w -i
jane     pts/0    192.168.1.5      08:30    2:35   0.10s  0.05s vim document.txt
bob      pts/1    10.0.0.25        10:05    0.00s  0.15s  0.10s top
```

## 使用例

### 基本的な使用法

```console
$ w
 10:15:03 up  1:33,  3 users,  load average: 0.01, 0.03, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
john     tty1     -                09:15    0.00s  0.05s  0.01s w
jane     pts/0    192.168.1.5      08:30    2:35   0.10s  0.05s vim document.txt
bob      pts/1    10.0.0.25        10:05    0.00s  0.15s  0.10s top
```

### 特定のユーザーの情報を表示

```console
$ w jane
 10:15:03 up  1:33,  3 users,  load average: 0.01, 0.03, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
jane     pts/0    192.168.1.5      08:30    2:35   0.10s  0.05s vim document.txt
```

## ヒント:

### 出力列の理解

- **USER**: ログインしているユーザーのユーザー名
- **TTY**: ユーザーがログインしている端末名
- **FROM**: リモートホスト名またはIPアドレス
- **LOGIN@**: ユーザーがログインした時間
- **IDLE**: ユーザーの最後のアクティビティからの経過時間
- **JCPU**: ttyに接続されているすべてのプロセスで使用された時間
- **PCPU**: 現在のプロセス（WHATに表示）で使用された時間
- **WHAT**: ユーザーの現在のプロセスのコマンドライン

### grepと組み合わせてフィルタリング

`w | grep username`を使用すると、ユーザー名パラメータを使わなくても特定のユーザーに関する情報をすばやく見つけることができます。

### システム負荷の確認

`w`出力の最初の行にはシステムの稼働時間と負荷平均が表示され、システムの健全性を素早くチェックするのに役立ちます。

## よくある質問

#### Q1. `w`と`who`の違いは何ですか？
A. `w`は`who`よりも詳細な情報を提供し、各ユーザーが何をしているかやシステムの負荷平均などが含まれます。`who`は単にログインしている人を一覧表示するだけです。

#### Q2. IDLE時間は何を表していますか？
A. IDLE時間は、ユーザーが端末で最後にアクティビティを行ってからの経過時間を示します。アイドル時間が長いということは、ユーザーはログインしているがシステムを積極的に使用していないことを示します。

#### Q3. 負荷平均はどのように解釈すればよいですか？
A. 負荷平均は、過去1分、5分、15分のシステム需要を示します。CPU コア数を下回る数値は、一般的にシステムが過負荷になっていないことを示します。

#### Q4. JCPUとPCPU列は何を意味しますか？
A. JCPUはユーザーの端末に接続されているすべてのプロセスで使用された時間を示します。PCPUはWHAT列に表示されている現在のプロセスで使用された時間を示します。

## 参考文献

https://www.man7.org/linux/man-pages/man1/w.1.html

## 改訂履歴

- 2025/05/05 初版