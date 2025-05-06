# grepコマンド

ファイル内のパターンを検索します。

## 概要

`grep`はファイルや標準入力からテキストパターンを検索します。主に指定されたパターンに一致する行を見つけて表示するために使用されます。このコマンドはログ、コード、テキストファイルを検索するのに不可欠であり、Unix/Linuxシステムで最も頻繁に使用されるテキスト処理ツールの一つです。

## オプション

### **-i, --ignore-case**

パターンと入力データの大文字小文字の区別を無視します

```console
$ grep -i "error" log.txt
ERROR: Connection failed
error: file not found
Warning: Some errors were detected
```

### **-v, --invert-match**

一致しない行を選択します

```console
$ grep -v "error" log.txt
Connection established
Process completed successfully
System started
```

### **-r, --recursive**

各ディレクトリ下のすべてのファイルを再帰的に読み込みます

```console
$ grep -r "function" /path/to/project
/path/to/project/file1.js:function calculateTotal() {
/path/to/project/lib/utils.js:function formatDate(date) {
```

### **-l, --files-with-matches**

一致を含むファイル名のみを表示します

```console
$ grep -l "error" *.log
app.log
system.log
```

### **-n, --line-number**

出力の各行の前に入力ファイル内の行番号を付けます

```console
$ grep -n "import" script.py
3:import os
5:import sys
12:import datetime
```

### **-c, --count**

ファイルごとに一致する行数のみを表示します

```console
$ grep -c "error" *.log
app.log:15
system.log:7
debug.log:0
```

### **-o, --only-matching**

一致した部分のみを表示します

```console
$ grep -o "error" log.txt
error
error
error
```

### **-A NUM, --after-context=NUM**

一致する行の後にNUM行の後続コンテキストを表示します

```console
$ grep -A 2 "Exception" error.log
Exception in thread "main" java.lang.NullPointerException
    at com.example.Main.process(Main.java:24)
    at com.example.Main.main(Main.java:5)
```

### **-B NUM, --before-context=NUM**

一致する行の前にNUM行の先行コンテキストを表示します

```console
$ grep -B 1 "fatal" system.log
May 4 15:30:22 server application[1234]: Critical error detected
May 4 15:30:23 server application[1234]: fatal: system halted
```

### **-E, --extended-regexp**

パターンを拡張正規表現として解釈します

```console
$ grep -E "error|warning" log.txt
error: file not found
warning: disk space low
```

## 使用例

### 基本的なパターン検索

```console
$ grep "function" script.js
function calculateTotal() {
function displayResults() {
```

### 複数のオプションの組み合わせ

```console
$ grep -in "error" --color=auto log.txt
15:Error: Unable to connect to database
42:error: invalid configuration
78:ERROR: Service unavailable
```

### 正規表現の使用

```console
$ grep "^[0-9]" data.txt
123 Main St
456 Oak Ave
789 Pine Rd
```

### 複数ファイルの検索

```console
$ grep "TODO" *.py
main.py:# TODO: Implement error handling
utils.py:# TODO: Optimize this algorithm
config.py:# TODO: Add configuration validation
```

### 一致を含むファイル名のみの表示

```console
$ grep -l "error" logs/*.log
logs/app.log
logs/system.log
```

## ヒント:

### カラーハイライトを使用する

`--color=auto`オプションを使用すると、一致するテキストが色付けされ、大量の出力の中で一致箇所を見つけやすくなります。

### 他のコマンドとパイプで連携する

grepを他のコマンドとパイプで組み合わせることで、強力なフィルタリングが可能です:
```console
$ ps aux | grep "nginx"
```

### 単語境界を使用する

`-w`オプションは完全な単語のみに一致させ、部分一致を防ぎます:
```console
$ grep -w "log" file.txt  # "log"には一致するが、"login"や"catalog"には一致しない
```

### スクリプト用の静かモード

パターンが存在するかどうかだけを確認したい場合は、`-q`を使用します（見つかった場合は終了ステータス0を返します）:
```console
$ grep -q "error" log.txt && echo "Errors found!"
```

## よくある質問

#### Q1. 複数のファイルでパターンを検索するにはどうすればよいですか？
A. パターンの後にファイルを列挙するだけです: `grep "pattern" file1 file2 file3` またはワイルドカードを使用します: `grep "pattern" *.txt`。

#### Q2. スペースを含むパターンを検索するにはどうすればよいですか？
A. パターンを引用符で囲みます: `grep "hello world" file.txt`。

#### Q3. パターンを含まない行を検索するにはどうすればよいですか？
A. `-v`オプションを使用します: `grep -v "pattern" file.txt`。

#### Q4. grepで複数のパターンを一度に検索できますか？
A. はい、`-E`オプションとパイプ記号を使用します: `grep -E "pattern1|pattern2" file.txt` または `egrep "pattern1|pattern2" file.txt` を使用します。

#### Q5. grepで行の一致部分のみを表示するにはどうすればよいですか？
A. `-o`オプションを使用します: `grep -o "pattern" file.txt`。

## 参考文献

https://www.gnu.org/software/grep/manual/grep.html

## 改訂履歴

- 2025/05/06 行の一致部分のみを表示する-oオプションを追加。
- 2025/05/05 初版