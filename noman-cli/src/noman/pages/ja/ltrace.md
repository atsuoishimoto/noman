# ltrace コマンド

プログラムのライブラリ呼び出しをトレースします。

## 概要

`ltrace` は、プログラム実行中に行われる動的ライブラリ呼び出しを表示するデバッグユーティリティです。システムコールや受信したシグナルも表示できます。このツールは、プログラムがライブラリとどのように相互作用するかを理解したり、問題を診断したり、アプリケーションのリバースエンジニアリングを行ったりする際に役立ちます。

## オプション

### **-c**

時間、呼び出し回数をカウントし、最後に要約レポートを表示します。

```console
$ ltrace -c ls
% time     seconds  usecs/call     calls      function
------ ----------- ----------- --------- --------------------
 28.57    0.000040          8         5 strlen
 21.43    0.000030         15         2 readdir64
 14.29    0.000020         10         2 closedir
 14.29    0.000020         10         2 opendir
  7.14    0.000010         10         1 __errno_location
  7.14    0.000010         10         1 fclose
  7.14    0.000010         10         1 fopen
------ ----------- ----------- --------- --------------------
100.00    0.000140                    14 total
```

### **-f**

現在トレース中のプロセスによって作成される子プロセスをトレースします。

```console
$ ltrace -f ./parent_program
[pid 12345] malloc(32)                                      = 0x55d45e9a12a0
[pid 12345] fork()                                          = 12346
[pid 12346] malloc(64)                                      = 0x55d45e9a1340
```

### **-e PATTERN**

トレースするライブラリ呼び出しやトレースしないライブラリ呼び出しを指定します。

```console
$ ltrace -e malloc+free ls
ls->malloc(24)                                             = 0x55d45e9a12a0
ls->malloc(13)                                             = 0x55d45e9a1340
ls->free(0x55d45e9a12a0)                                   = <void>
ls->free(0x55d45e9a1340)                                   = <void>
```

### **-p PID**

指定されたPIDのプロセスにアタッチしてトレースを開始します。

```console
$ ltrace -p 1234
[pid 1234] read(5, "Hello World", 1024)                    = 11
[pid 1234] write(1, "Hello World", 11)                     = 11
```

### **-S**

ライブラリ呼び出しに加えてシステムコールも表示します。

```console
$ ltrace -S ls
SYS_brk(NULL)                                              = 0x55d45e9a1000
SYS_access("/etc/ld.so.preload", R_OK)                     = -2
malloc(256)                                                = 0x55d45e9a12a0
SYS_open("/etc/ld.so.cache", O_RDONLY)                     = 3
```

### **-o FILENAME**

トレース出力を標準エラー出力ではなく、指定したファイルに書き込みます。

```console
$ ltrace -o trace.log ls
$ cat trace.log
malloc(256)                                                = 0x55d45e9a12a0
free(0x55d45e9a12a0)                                       = <void>
```

## 使用例

### 基本的な使い方

```console
$ ltrace ls
__libc_start_main(0x401670, 1, 0x7ffd74a3c648, 0x406750 <unfinished ...>
strrchr("ls", '/')                                         = NULL
setlocale(LC_ALL, "")                                      = "en_US.UTF-8"
bindtextdomain("coreutils", "/usr/share/locale")           = "/usr/share/locale"
textdomain("coreutils")                                    = "coreutils"
__cxa_atexit(0x402860, 0, 0, 0x736c6974)                   = 0
isatty(1)                                                  = 1
getenv("QUOTING_STYLE")                                    = NULL
getenv("COLUMNS")                                          = NULL
ioctl(1, 21523, 0x7ffd74a3c4e0)                            = 0
...
+++ exited (status 0) +++
```

### 特定の関数をトレースする

```console
$ ltrace -e malloc+free+open ./program
program->malloc(1024)                                      = 0x55d45e9a12a0
program->open("/etc/passwd", 0, 0)                         = 3
program->free(0x55d45e9a12a0)                              = <void>
```

### 時間情報付きでトレースする

```console
$ ltrace -tt ls
15:30:45.789012 __libc_start_main(0x401670, 1, 0x7ffd74a3c648, 0x406750 <unfinished ...>
15:30:45.789234 strrchr("ls", '/')                         = NULL
15:30:45.789456 setlocale(LC_ALL, "")                      = "en_US.UTF-8"
...
15:30:45.795678 +++ exited (status 0) +++
```

## ヒント

### ノイズをフィルタリングする

`-e` オプションを使用して、関心のある特定の関数呼び出しに焦点を当て、出力の混雑を減らします：
```console
$ ltrace -e malloc+free+open ./program
```

### 他のツールと組み合わせる

ltraceの出力をgrepにパイプして、特定の関数呼び出しを見つけます：
```console
$ ltrace ./program 2>&1 | grep "open"
```

### 子プロセスをトレースする

子プロセスを生成する複雑なアプリケーションをデバッグする場合は、`-f` を使用して子プロセスも追跡します：
```console
$ ltrace -f ./server
```

### 後で分析するために出力を保存する

長時間実行されるプログラムの場合、`-o` でトレースをファイルに保存します：
```console
$ ltrace -o debug.log ./program
```

## よくある質問

#### Q1. ltraceとstraceの違いは何ですか？
A. `ltrace` はライブラリ呼び出し（共有ライブラリからの関数）をトレースし、`strace` はシステムコール（カーネルとの相互作用）をトレースします。`ltrace -S` を使用すると両方を見ることができます。

#### Q2. なぜltraceはすべての関数呼び出しを表示しないのですか？
A. `ltrace` は外部ライブラリへの呼び出しのみを表示し、プログラム内部の関数呼び出しは表示しません。それにはプロファイラやデバッガが必要です。

#### Q3. ltraceはトレース対象のプログラムを遅くすることがありますか？
A. はい、トレースには大きなオーバーヘッドがあります。特に `-f`（フォークを追跡）を有効にすると、プログラムの実行速度は遅くなります。

#### Q4. すでに実行中のプログラムをトレースするにはどうすればよいですか？
A. `ltrace -p PID` を使用して、すでに実行中のプロセスにアタッチします。

#### Q5. 静的にリンクされたバイナリでltraceを使用できますか？
A. いいえ、`ltrace` は主に動的にリンクされた実行ファイルで動作します。共有ライブラリへの呼び出しを傍受するためです。

## 参考文献

https://man7.org/linux/man-pages/man1/ltrace.1.html

## 改訂履歴

- 2025/05/05 初版