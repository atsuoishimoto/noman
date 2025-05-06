# pstackコマンド

実行中のプロセスのスタックトレースを表示します。

## 概要

`pstack`は実行中のプロセスにアタッチし、そのプロセス内のすべてのスレッドのスタックトレースを表示するユーティリティです。特に、プロセスを再起動したり、事前にデバッガをセットアップしたりすることなく、ハングしたり誤動作しているプロセスをデバッグするのに役立ちます。

## オプション

`pstack`はシンプルなコマンドで、多くのオプションはありません。主に引数としてプロセスID（PID）を取ります。

## 使用例

### 基本的な使い方

```console
$ pstack 1234
Thread 1 (process 1234):
#0  0x00007f8e2d72dea3 in poll () from /lib64/libc.so.6
#1  0x00007f8e2c8b11d8 in ?? () from /lib64/libpulse.so.0
#2  0x00007f8e2c8a9e3c in pa_mainloop_poll () from /lib64/libpulse.so.0
#3  0x00007f8e2c8aa41c in pa_mainloop_iterate () from /lib64/libpulse.so.0
#4  0x00007f8e2c8aa49c in pa_mainloop_run () from /lib64/libpulse.so.0
#5  0x00007f8e2c8b1228 in ?? () from /lib64/libpulse.so.0
#6  0x00007f8e2c8a4259 in ?? () from /lib64/libpulse.so.0
#7  0x00007f8e2d6c1609 in start_thread () from /lib64/libpthread.so.0
#8  0x00007f8e2d7e7163 in clone () from /lib64/libc.so.6
```

### 複数のプロセス

```console
$ pstack 1234 5678
==> 1234 <==
Thread 1 (process 1234):
#0  0x00007f8e2d72dea3 in poll () from /lib64/libc.so.6
#1  0x00007f8e2c8b11d8 in ?? () from /lib64/libpulse.so.0
...

==> 5678 <==
Thread 1 (process 5678):
#0  0x00007f9a3c45ea35 in nanosleep () from /lib64/libc.so.6
#1  0x000055d7e44f5b1a in main ()
```

## ヒント:

### プロセスIDの検索

`pstack`を使用する前に、プロセスIDを知る必要があります。`ps`や`pidof`を使用して見つけることができます：

```console
$ ps aux | grep firefox
user     1234  2.5  1.8 2589452 298796 ?      Sl   09:15   0:45 /usr/lib/firefox/firefox

$ pidof firefox
1234
```

### ハングしたプロセスのデバッグ

プロセスがフリーズしているように見える場合、`pstack`を使用して何をしているか確認できます：

```console
$ pstack $(pidof frozen_app)
```

### root権限

自分が所有していないプロセスの場合、`sudo`を使用する必要があります：

```console
$ sudo pstack 1234
```

### 代替コマンド

一部のシステムでは、`pstack`が利用できない場合があります。以下の代替手段を使用できます：
- `gdb -p PID -ex "thread apply all bt" -batch`
- Javaプロセスの場合は`jstack`

## よくある質問

#### Q1. `pstack`は実際に何をしているのですか？
A. `pstack`はデバッグ機能を使用して実行中のプロセスにアタッチし、そのプロセス内のすべてのスレッドの現在のコールスタックを抽出し、読みやすい形式で表示します。

#### Q2. `pstack`はすべてのUnixシステムで利用できますか？
A. いいえ、`pstack`は標準的なUnixコマンドではありません。主にRed Hat由来のLinuxシステムで一般的に利用できます。他のシステムでは、`gdb`などの代替手段を使用する必要があるかもしれません。

#### Q3. `pstack`は実行中のプロセスに影響を与えますか？
A. `pstack`はスタックトレースを抽出している間、一時的にプロセスを停止しますが、この一時停止は通常非常に短く、通常の操作に影響を与えるべきではありません。

#### Q4. なぜ一部のスタックフレームで関数名の代わりに「??」が表示されるのですか？
A. これは通常、その特定のライブラリや実行可能ファイルのデバッグシンボルが利用できない場合に発生します。プロセスは正常に実行されていますが、`pstack`は正確な関数名を判断できません。

## 参考文献

https://man7.org/linux/man-pages/man1/pstack.1.html

## 改訂履歴

- 2025/05/05 初版