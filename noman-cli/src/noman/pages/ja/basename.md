# basename コマンド

パス名からファイル名またはディレクトリ名を抽出します。

## 概要

`basename`はパスからディレクトリ部分と接尾辞を取り除き、ファイル名または最終ディレクトリ名だけを返します。シェルスクリプトでフルパスからファイル名を抽出したり、ファイル拡張子を削除したりする際によく使用されます。

## オプション

### **basename NAME [SUFFIX]**

NAMEからディレクトリ部分と、オプションのSUFFIXを削除します。

```console
$ basename /usr/bin/sort
sort
```

### **basename OPTION... NAME...**

指定されたオプションに従って複数の名前を処理します。

### **-a, --multiple**

複数の引数をサポートし、それぞれをNAMEとして扱います。

```console
$ basename -a /usr/bin/sort /usr/bin/cut
sort
cut
```

### **-s, --suffix=SUFFIX**

各NAMEから末尾のSUFFIXを削除します。

```console
$ basename -s .txt file.txt
file
```

### **-z, --zero**

各出力行を改行ではなくNUL文字で終了します。

```console
$ basename -z /usr/bin/sort | hexdump -C
00000000  73 6f 72 74 00                                    |sort.|
00000005
```

## 使用例

### ディレクトリ部分の削除

```console
$ basename /home/user/documents/report.pdf
report.pdf
```

### ファイル拡張子の削除

```console
$ basename /home/user/documents/report.pdf .pdf
report
```

### 同じ接尾辞を持つ複数のファイルの処理

```console
$ basename -a -s .txt file1.txt file2.txt file3.txt
file1
file2
file3
```

### シェルスクリプトでの使用

```console
$ filename=$(basename "$fullpath")
$ echo "The filename is: $filename"
The filename is: document.pdf
```

## ヒント:

### `dirname`との併用によるパス操作

`basename`は`dirname`と組み合わせると、パスをコンポーネントに分割する際に便利です：
```console
$ path="/home/user/documents/report.pdf"
$ dirname "$path"
/home/user/documents
$ basename "$path"
report.pdf
```

### スペースを含むパスの処理

パスにスペースが含まれる可能性がある場合は、常に引数を引用符で囲みます：
```console
$ basename "/path/with spaces/file.txt"
file.txt
```

### 複数の拡張子の削除

複数の拡張子（`.tar.gz`など）を削除するには、複数のコマンドや`sed`などの他のツールを使用する必要があります：
```console
$ basename "archive.tar.gz" .gz | basename -s .tar
archive
```

## よくある質問

#### Q1. `basename`とbashのパラメータ展開を使用する違いは何ですか？
A. bashでの`${filename##*/}`は同様の機能を実行しますが、`basename`は異なるシェルでも動作し、接尾辞の削除などの追加オプションを提供します。

#### Q2. `basename`は一度に複数のファイルを処理できますか？
A. はい、`-a`または`--multiple`オプションを使用すると、1つのコマンドで複数のファイル名を処理できます。

#### Q3. `.tar.gz`のような複数の拡張子を削除するにはどうすればよいですか？
A. `basename`は一度に1つの接尾辞しか削除できません。複数の拡張子の場合は、`basename`を複数回実行するか、他のテキスト処理ツールを使用する必要があります。

#### Q4. `basename`は元のファイルを変更しますか？
A. いいえ、`basename`は変更された名前を標準出力に出力するだけです。ディスク上のファイルは変更しません。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/basename-invocation.html

## 改訂履歴

- 2025/05/05 初版