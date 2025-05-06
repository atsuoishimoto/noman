# gdbコマンド

GNUデバッガを使用してプログラムを対話的にデバッグします。

## 概要

GDB（GNU Debugger）は、プログラムの実行を監視および制御できる強力なデバッグツールです。実行を一時停止し、メモリを調査し、ブレークポイントを設定し、コードをステップ実行し、実行時に変数を検査することで、バグを見つけて修正するのに役立ちます。GDBはC、C++、Objective-C、Fortranなど多くのプログラミング言語で動作します。

## オプション

### **-q, --quiet, --silent**

紹介文と著作権メッセージを表示せずにGDBを起動します

```console
$ gdb -q ./program
(gdb)
```

### **-c FILE**

FILEをコアダンプとして使用して調査します

```console
$ gdb -c core ./program
```

### **-p PID**

指定されたプロセスIDを持つ実行中のプロセスにアタッチします

```console
$ gdb -p 1234
```

### **-x FILE**

FILEからGDBコマンドを実行します

```console
$ gdb -x commands.gdb ./program
```

### **--args**

プログラム名の後の引数をデバッグ対象のプログラムに渡します

```console
$ gdb --args ./program arg1 arg2
```

### **-d DIRECTORY**

ソースファイルを検索するパスにDIRECTORYを追加します

```console
$ gdb -d /path/to/source ./program
```

## 使用例

### 基本的なデバッグセッション

```console
$ gdb ./program
(gdb) break main
Breakpoint 1 at 0x1149: file main.c, line 5.
(gdb) run
Starting program: /path/to/program 

Breakpoint 1, main () at main.c:5
5       int x = 10;
(gdb) next
6       printf("x = %d\n", x);
(gdb) print x
$1 = 10
(gdb) continue
Continuing.
x = 10
[Inferior 1 (process 12345) exited normally]
(gdb) quit
```

### 引数付きプログラムのデバッグ

```console
$ gdb --args ./program input.txt output.txt
(gdb) run
Starting program: /path/to/program input.txt output.txt
[Program execution...]
```

### コアダンプの調査

```console
$ gdb ./program core
(gdb) bt
#0  0x00007f8b4c5e32a3 in __GI_raise (sig=sig@entry=6) at ../sysdeps/unix/sysv/linux/raise.c:50
#1  0x00007f8b4c5e4921 in __GI_abort () at abort.c:79
#2  0x0000555555555160 in main () at crash.c:5
```

## ヒント:

### 一般的なGDBコマンド

- `break`（または`b`）：行または関数にブレークポイントを設定
- `run`（または`r`）：プログラムを開始
- `continue`（または`c`）：停止後に実行を継続
- `next`（または`n`）：関数内に入らずに次の行を実行
- `step`（または`s`）：関数内に入りながら次の行を実行
- `print`（または`p`）：変数または式の値を表示
- `backtrace`（または`bt`）：コールスタックを表示
- `info breakpoints`：すべてのブレークポイントを一覧表示
- `watch`：変数が変更されたときに停止するウォッチポイントを設定

### TUIモードの使用

`Ctrl+X+A`でテキストユーザーインターフェースモードを有効にすると、ソースコードとGDBコマンドを同時に表示する分割ビューが表示されます。

### ブレークポイントの保存

`save breakpoints file.txt`を使用してブレークポイントをファイルに保存し、将来のセッションで`source file.txt`を使用して読み込むことができます。

## よくある質問

#### Q1. プログラムのデバッグを開始するにはどうすればよいですか？
A. `gdb ./program`を実行し、`break main`でメイン関数にブレークポイントを設定し、`run`で実行を開始します。

#### Q2. セグメンテーション違反の原因を調査するにはどうすればよいですか？
A. クラッシュ後、`backtrace`（または`bt`）を使用してコールスタックを確認し、クラッシュが発生した場所を特定します。次に`frame N`を使用して特定のフレームを選択し、変数を調査します。

#### Q3. 実行中のプロセスをデバッグするにはどうすればよいですか？
A. `gdb -p PID`を使用して、指定されたプロセスIDを持つ実行中のプロセスにアタッチします。

#### Q4. 条件付きブレークポイントを設定するにはどうすればよいですか？
A. `break location if condition`を使用します。例：`break main.c:25 if x > 10`

#### Q5. 配列のすべての要素を表示するにはどうすればよいですか？
A. `print *array@length`を使用します。ここで`length`は表示する要素の数です。

## 参考文献

https://sourceware.org/gdb/current/onlinedocs/gdb/

## 改訂履歴

- 2025/05/05 初版