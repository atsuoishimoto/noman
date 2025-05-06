# truncateコマンド

ファイルのサイズを指定したサイズに縮小または拡張します。

## 概要

`truncate`コマンドは、ファイルのサイズを指定した長さに変更します。末尾からデータを削除してファイルを縮小したり、ヌルバイトを追加して拡張したりすることができます。このコマンドは、特定のサイズのファイルを作成する場合や、ファイルを保持したままコンテンツをクリアする場合、またはディスク容量のシナリオをテストする場合に便利です。

## オプション

### **-s, --size=SIZE**

ファイルサイズをSIZEに設定または調整します。SIZEは絶対的な数値、または「+」や「-」の接頭辞を付けた相対的な調整値を指定できます。

```console
$ truncate -s 100 myfile.txt
$ ls -l myfile.txt
-rw-r--r-- 1 user group 100 May 5 10:00 myfile.txt
```

### **-c, --no-create**

存在しないファイルを作成しません。

```console
$ truncate -c -s 50 nonexistent.txt
truncate: cannot open 'nonexistent.txt' for writing: No such file or directory
```

### **-o, --io-blocks**

SIZEをバイト数ではなくI/Oブロック数として扱います。

```console
$ truncate -o -s 2 blockfile.dat
```

### **-r, --reference=RFILE**

RFILEのサイズに基づいてサイズを設定します。

```console
$ truncate -r reference.txt target.txt
```

### **--help**

ヘルプ情報を表示して終了します。

```console
$ truncate --help
```

### **--version**

バージョン情報を出力して終了します。

```console
$ truncate --version
```

## 使用例

### 特定のサイズの空ファイルを作成する

```console
$ truncate -s 1M largefile.dat
$ ls -lh largefile.dat
-rw-r--r-- 1 user group 1.0M May 5 10:05 largefile.dat
```

### ファイルを小さいサイズに縮小する

```console
$ echo "This is a test file with content" > testfile.txt
$ truncate -s 10 testfile.txt
$ cat testfile.txt
This is a 
```

### ファイルサイズを拡張する

```console
$ echo "Small" > smallfile.txt
$ truncate -s 100 smallfile.txt
$ ls -l smallfile.txt
-rw-r--r-- 1 user group 100 May 5 10:10 smallfile.txt
```

### 相対サイズの使用

```console
$ truncate -s 100 myfile.txt
$ truncate -s +50 myfile.txt  # 50バイト追加
$ truncate -s -30 myfile.txt  # 30バイト削除
$ ls -l myfile.txt
-rw-r--r-- 1 user group 120 May 5 10:15 myfile.txt
```

## ヒント:

### スパースファイルの作成

ファイルを拡張する際、`truncate`はヌルバイトを追加することでスパースファイル（実際に消費するディスク容量よりも大きく見えるファイル）を作成します。これは、実際のディスク容量を消費せずに大きなファイルでアプリケーションをテストするのに役立ちます。

### ファイルを素早く空にする

`truncate -s 0 filename`を使用すると、ファイルを削除せずに素早く空にできます。これにより、すべてのコンテンツを削除しながらもファイルの権限と所有権が保持されます。

### 縮小時の注意点

ファイルを縮小する場合、新しいサイズを超えるデータは永久に失われます。重要なファイルを切り詰める前には、必ずバックアップを作成してください。

## よくある質問

#### Q1. ファイルを小さいサイズに切り詰めると何が起こりますか？
A. 指定したサイズを超えるデータは永久に削除されます。ファイルは指定したバイト位置で正確に切り取られます。

#### Q2. truncateはすべてのファイルタイプで動作しますか？
A. `truncate`は通常のファイルでは動作しますが、デバイスやソケットなどの特殊ファイルでは期待通りに動作しない場合があります。主に通常のファイル用に設計されています。

#### Q3. truncateと`> file`リダイレクションの違いは何ですか？
A. `> file`はファイルを完全に空にしますが、`truncate`はファイルを任意の特定のサイズに設定でき、拡張したり正確なバイト数に縮小したりできます。

#### Q4. truncateで特定の内容を持つファイルを作成できますか？
A. いいえ、`truncate`はファイルサイズのみを調整します。ファイルを拡張する場合、ヌルバイト（ゼロ）が追加されます。特定の内容を持つファイルを作成するには、`echo`や`cat`などの他のコマンドを使用する必要があります。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/truncate-invocation.html

## 改訂履歴

- 2025/05/05 初版