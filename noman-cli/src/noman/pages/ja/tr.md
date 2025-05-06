# tr コマンド

標準入力から文字を変換または削除し、標準出力に書き込みます。

## 概要

`tr` コマンドは文字単位で操作するテキスト変換ユーティリティです。標準入力から読み取り、指定されたパラメータに従って文字の置換、削除、または圧縮を実行し、結果を標準出力に書き込みます。大文字小文字の変換、文字の削除、基本的なテキスト変換などのタスクでシェルスクリプトでよく使用されます。

## オプション

### **-d**

SET1の文字を削除し、変換は行いません。

```console
$ echo "Hello, World!" | tr -d 'aeiou'
Hll, Wrld!
```

### **-s**

SET1内の繰り返し文字のシーケンスを単一の出現に置き換えます。

```console
$ echo "Hello    World!" | tr -s ' '
Hello World!
```

### **-c, --complement**

SET1の補集合を使用します。

```console
$ echo "Hello, World!" | tr -cd 'a-zA-Z\n'
HelloWorld
```

### **-t, --truncate-set1**

SET1をSET2の長さに切り詰めます。

```console
$ echo "Hello, World!" | tr -t 'a-z' 'A-Z'
HELLO, WORLD!
```

## 使用例

### 小文字から大文字への変換

```console
$ echo "hello world" | tr 'a-z' 'A-Z'
HELLO WORLD
```

### テキストからすべての数字を削除

```console
$ echo "Phone: 123-456-7890" | tr -d '0-9'
Phone: --
```

### スペースを改行に変換

```console
$ echo "one two three" | tr ' ' '\n'
one
two
three
```

### すべての非印刷文字を削除

```console
$ cat binary_file | tr -cd '[:print:]\n' > cleaned_file
```

### 複数の改行を1つに圧縮

```console
$ cat file.txt | tr -s '\n'
```

## ヒント:

### 文字クラスを使用する

`tr`は`[:alnum:]`、`[:alpha:]`、`[:digit:]`などのPOSIX文字クラスをサポートしており、文字グループの操作が容易になります。

```console
$ echo "Hello123" | tr '[:digit:]' 'x'
Helloxxx
```

### 複雑な変換のためにオプションを組み合わせる

`-d`や`-c`などのオプションを組み合わせて、特定の文字だけを保持するなどのより複雑な操作を実行できます。

```console
$ echo "user@example.com" | tr -cd '[:alnum:]@.\n'
user@example.com
```

### 特殊文字をエスケープする

変換セットで使用する場合、改行（`\n`）、タブ（`\t`）、バックスラッシュ（`\\`）などの特殊文字をエスケープすることを忘れないでください。

### 他のコマンドとパイプで連結する

`tr`は、より複雑なテキスト処理のために`grep`、`sed`、`awk`などの他のコマンドとパイプラインで使用すると最も効果的です。

## よくある質問

#### Q1. ファイルを大文字に変換するにはどうすればよいですか？
A. `cat file.txt | tr 'a-z' 'A-Z'`または`tr 'a-z' 'A-Z' < file.txt`を使用します。

#### Q2. ファイルからすべての空白を削除するにはどうすればよいですか？
A. すべての空白文字を削除するには`tr -d '[:space:]'`を使用します。

#### Q3. trは文字列または単一の文字だけを置き換えることができますか？
A. `tr`は文字列ではなく、単一の文字に対してのみ機能します。文字列の置換には代わりに`sed`を使用してください。

#### Q4. 複数の文字を単一の文字に変換するにはどうすればよいですか？
A. `tr 'abc' 'x'`を使用して、a、b、cをすべてxに変換します。

#### Q5. ファイル内のユニークな文字を数えるにはどうすればよいですか？
A. `tr -d '\n' < file.txt | fold -w1 | sort | uniq -c`を使用します。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/tr-invocation.html

## 改訂履歴

- 2025/05/05 初版