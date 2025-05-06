# mkfifoコマンド

指定した名前の名前付きパイプ（FIFO）を作成します。

## 概要

`mkfifo`は、プロセス間通信を可能にする特殊なFIFO（First-In-First-Out）ファイル、いわゆる名前付きパイプを作成します。`|`演算子で作成される通常のパイプとは異なり、名前付きパイプはファイルシステム上に削除されるまで存続し、関連のないプロセス同士が通信できるようにします。

## オプション

### **-m, --mode=MODE**

作成されるFIFOのパーミッションモード（chmodと同様）を設定します。デフォルトモードの0666（全員が読み書き可能、umaskによって変更される）の代わりに使用します。

```console
$ mkfifo -m 0600 private_pipe
$ ls -l private_pipe
prw-------  1 user  group  0 May  5 10:00 private_pipe
```

### **-Z, --context=CTX**

作成された各FIFOのSELinuxセキュリティコンテキストをCTXに設定します。

```console
$ mkfifo -Z user_u:object_r:user_fifo_t private_pipe
```

### **--help**

ヘルプ情報を表示して終了します。

```console
$ mkfifo --help
Usage: mkfifo [OPTION]... NAME...
Create named pipes (FIFOs) with the given NAMEs.
...
```

### **--version**

バージョン情報を出力して終了します。

```console
$ mkfifo --version
mkfifo (GNU coreutils) 8.32
...
```

## 使用例

### 基本的な名前付きパイプの作成

```console
$ mkfifo mypipe
$ ls -l mypipe
prw-r--r--  1 user  group  0 May  5 10:00 mypipe
```

### 名前付きパイプを使ったプロセス間通信

ターミナル1:
```console
$ mkfifo mypipe
$ cat > mypipe
Hello, world!
```

ターミナル2:
```console
$ cat < mypipe
Hello, world!
```

### 複数のパイプを一度に作成

```console
$ mkfifo pipe1 pipe2 pipe3
$ ls -l pipe*
prw-r--r--  1 user  group  0 May  5 10:00 pipe1
prw-r--r--  1 user  group  0 May  5 10:00 pipe2
prw-r--r--  1 user  group  0 May  5 10:00 pipe3
```

## ヒント:

### 名前付きパイプの理解

名前付きパイプは、誰かが書き込み用に開くまで読み取り用に開かれるとブロックします（その逆も同様）。この動作はFIFOを扱う際に理解しておくことが重要です。

### クリーンアップ

名前付きパイプは、`rm`で明示的に削除されるまでファイルシステム上に残ります。混乱を避けるため、不要になったパイプは常にクリーンアップしましょう。

### デッドロックの回避

同じパイプを単一プロセスで読み書きする場合は、デッドロックにつながる可能性があるため注意が必要です。一般的に、読み取りと書き込みには別々のプロセスを使用します。

### リダイレクションとの併用

名前付きパイプは標準入出力のリダイレクションとうまく連携するため、通常のパイプラインでは接続できないコマンドを接続するのに役立ちます。

## よくある質問

#### Q1. 名前付きパイプと通常のパイプの違いは何ですか？
A. 通常のパイプ（`|`で作成）は接続されたプロセスが実行中の間だけ存在し、関連のないプロセスからアクセスできません。名前付きパイプはファイルシステムオブジェクトとして存在し、適切な権限を持つどのプロセスからも使用できます。

#### Q2. 名前付きパイプを双方向通信に使用できますか？
A. いいえ、名前付きパイプは一方向です。双方向通信には、2つの別々のパイプを作成する必要があります。

#### Q3. 書き込み側がないパイプから読み取ろうとするとどうなりますか？
A. 書き込み側がパイプを開くまで読み取り操作はブロックされます。すべての書き込み側がパイプを閉じると、読み取り側はEOF（ファイル終端）を受け取ります。

#### Q4. 名前付きパイプを削除するにはどうすればよいですか？
A. 通常のファイルと同様に`rm`コマンドを使用します：`rm mypipe`

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/mkfifo-invocation.html

## 改訂履歴

- 2025/05/05 初版