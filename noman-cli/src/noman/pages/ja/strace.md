# strace コマンド

プロセスのシステムコールとシグナルをトレースします。

## 概要

`strace` は Linux 用の診断およびデバッグユーティリティで、指定されたプログラムのシステムコールとシグナルをトレースします。プロセスによって行われるシステムコールと受信したシグナルを傍受して記録するため、トラブルシューティング、プログラムの動作の理解、アプリケーションの問題の診断に非常に役立つツールです。

## オプション

### **-f**

現在トレースされているプロセスによって作成される子プロセスをトレースします。

```console
$ strace -f ./my_program
execve("./my_program", ["./my_program"], 0x7ffc8e5bb4a0 /* 58 vars */) = 0
brk(NULL)                               = 0x55a8a9899000
[pid 12345] clone(child_stack=NULL, flags=CLONE_CHILD|SIGCHLD, ...) = 12346
[pid 12346] execve("/bin/ls", ["ls"], 0x7ffc8e5bb4a0 /* 58 vars */) = 0
```

### **-p PID**

指定された PID のプロセスにアタッチしてトレースを開始します。

```console
$ strace -p 1234
strace: Process 1234 attached
read(3, "Hello, world!\n", 4096)        = 14
write(1, "Hello, world!\n", 14)         = 14
```

### **-o FILENAME**

トレース出力を stderr ではなくファイルに書き込みます。

```console
$ strace -o trace.log ls
$ cat trace.log
execve("/bin/ls", ["ls"], 0x7ffc8e5bb4a0 /* 58 vars */) = 0
brk(NULL)                               = 0x55a8a9899000
access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
```

### **-e EXPR**

トレースするイベントやトレース方法を修正する修飾式です。

```console
$ strace -e open,close ls
open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
close(3)                                = 0
open("/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
close(3)                                = 0
```

### **-c**

各システムコールの時間、呼び出し回数、エラーをカウントし、要約を報告します。

```console
$ strace -c ls
% time     seconds  usecs/call     calls    errors syscall
------ ----------- ----------- --------- --------- ----------------
 25.00    0.000125          21         6           mmap
 20.00    0.000100          25         4           open
 15.00    0.000075          25         3           read
 10.00    0.000050          17         3           close
------ ----------- ----------- --------- --------- ----------------
100.00    0.000500                    45         5 total
```

### **-t**

トレースの各行の先頭に時刻を付けます。

```console
$ strace -t ls
14:15:23 execve("/bin/ls", ["ls"], 0x7ffc8e5bb4a0 /* 58 vars */) = 0
14:15:23 brk(NULL)                      = 0x55a8a9899000
14:15:23 access("/etc/ld.so.preload", R_OK) = -1 ENOENT (No such file or directory)
```

## 使用例

### プログラムを最初から最後までトレースする

```console
$ strace ls -l
execve("/bin/ls", ["ls", "-l"], 0x7ffc8e5bb4a0 /* 58 vars */) = 0
brk(NULL)                               = 0x55a8a9899000
access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
...
```

### 特定のシステムコールをトレースする

```console
$ strace -e trace=open,read,write ls
openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0\360\23\2\0\0\0\0\0"..., 832) = 832
write(1, "file1.txt  file2.txt  file3.txt\n", 32) = 32
```

### 実行中のプロセスにアタッチして出力をファイルに保存する

```console
$ strace -p 1234 -o process_trace.log
strace: Process 1234 attached
^C
$ cat process_trace.log
read(4, "data from socket", 1024)       = 16
write(1, "data from socket", 16)        = 16
```

## ヒント:

### システムコールのフィルタリング

`-e trace=` を使用して特定のシステムコールに焦点を当てます。例えば、`-e trace=network` はネットワーク関連の呼び出しのみを表示し、接続の問題をデバッグしやすくします。

### パフォーマンスの問題を理解する

`-c` を使用して各システムコールにかかる時間の要約を取得します。これにより、アプリケーションでどのシステムコールが最も時間がかかっているかを特定できます。

### 子プロセスをトレースする

子プロセスをフォークするプログラムをトレースする場合は、常に `-f` を使用してください。これがないと、親プロセスのアクティビティしか見えません。

### 出力の冗長性を減らす

大きなファイルやバッファの場合、`-s` の後に数字を付けて文字列出力の長さを制限します。例えば、`-s 100` は文字列を100文字に制限します。

### トレースにタイムスタンプを付ける

`-t` または `-tt`（マイクロ秒精度の場合）を追加してトレースにタイムスタンプを含めると、イベントを他のログと関連付けるのに役立ちます。

## よくある質問

#### Q1. strace と ltrace の違いは何ですか？
A. `strace` はシステムコール（プログラムとカーネルの間の相互作用）をトレースし、`ltrace` はライブラリコール（プログラムとライブラリの間の相互作用）をトレースします。

#### Q2. root 権限が必要なプログラムをトレースするにはどうすればよいですか？
A. sudo で strace を実行します：`sudo strace command`。root が所有する実行中のプロセスにアタッチするには、`sudo strace -p PID` を使用します。

#### Q3. strace でトレースすると、プログラムの実行が非常に遅くなるのはなぜですか？
A. トレースはすべてのシステムコールを傍受するため、大きなオーバーヘッドが追加されます。これは正常な動作であり、タイミング結果を解釈する際に考慮する必要があります。

#### Q4. ファイル関連の操作だけを見るにはどうすればよいですか？
A. `strace -e trace=file command` を使用して、ファイル関連のシステムコールのみを表示します。

#### Q5. strace はマルチスレッドアプリケーションをトレースできますか？
A. はい、`strace -f` を使用してスレッド（Linux ではプロセスとして実装されています）をフォローできます。

## 参考文献

https://man7.org/linux/man-pages/man1/strace.1.html

## 改訂履歴

- 2025/05/05 初版