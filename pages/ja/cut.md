# cutコマンド

各行から選択した部分を抽出するコマンドです。

## 概要

`cut`コマンドは、入力ファイルまたは標準入力の各行から特定の部分を抽出します。文字位置、バイト位置、または区切り文字で区切られたフィールドによってテキストの一部を選択できます。このコマンドは、CSVやTSVなどの構造化されたテキストファイルの処理や、コマンド出力から特定の列を抽出する場合に特に便利です。

## オプション

### **-b, --bytes=LIST**

各行から指定したバイトをLISTに従って抽出します。

```console
$ echo "Hello" | cut -b 1-3
Hel
```

### **-c, --characters=LIST**

各行から指定した文字をLISTに従って抽出します。

```console
$ echo "Hello" | cut -c 2-4
ell
```

### **-d, --delimiter=DELIM**

デフォルトのタブの代わりにDELIMをフィールド区切り文字として使用します。

```console
$ echo "name,age,city" | cut -d, -f2
age
```

### **-f, --fields=LIST**

各行から指定したフィールドのみを選択します。

```console
$ echo "name:age:city" | cut -d: -f1,3
name:city
```

### **-s, --only-delimited**

区切り文字を含まない行は出力しません。

```console
$ printf "field1,field2,field3\nno delimiter here\nA,B,C" | cut -d, -f1 -s
field1
A
```

### **--complement**

選択されたバイト、文字、またはフィールドの集合の補集合を取ります。

```console
$ echo "field1,field2,field3" | cut -d, -f1 --complement
field2,field3
```

### **--output-delimiter=STRING**

入力区切り文字の代わりにSTRINGを出力区切り文字として使用します。

```console
$ echo "field1,field2,field3" | cut -d, -f1,3 --output-delimiter=" | "
field1 | field3
```

## 使用例

### CSVファイルから特定の列を抽出する

```console
$ cat data.csv
Name,Age,City
John,25,New York
Alice,30,London
$ cut -d, -f1,3 data.csv
Name,City
John,New York
Alice,London
```

### 各行から特定の範囲の文字を抽出する

```console
$ cat file.txt
This is a test file
Another line of text
$ cut -c 1-10 file.txt
This is a 
Another li
```

### 複数の文字範囲を抽出する

```console
$ echo "abcdefghijklmnopqrstuvwxyz" | cut -c 1-5,10-15
abcdeijklmn
```

### cutを他のコマンドと組み合わせる

```console
$ ps aux | cut -c 1-10,42-50
USER       PID
root       1
user       435
```

## ヒント:

### 欠落フィールドの処理

`-f`を区切り文字と共に使用する場合、区切り文字のない行はデフォルトでは処理されません。これらの行をスキップするには`-s`を使用するか、すべての行を処理するために省略します。

### 固定幅ファイルの処理

列がスペースで整列された固定幅ファイルの場合、`-f`（フィールド）ではなく`-c`（文字位置）を使用します。

### 他のコマンドとの組み合わせ

`cut`は`grep`、`sort`、`awk`などのコマンドとパイプラインで上手く機能します。例えば、`grep "pattern" file.txt | cut -d, -f2,3`は一致する行から特定のフィールドを抽出します。

### 特殊な区切り文字の処理

スペースなどの特殊文字を区切り文字として使用する場合は、エスケープするか引用符を使用します：`cut -d' ' -f1`または`cut -d" " -f1`。

## よくある質問

#### Q1. 連続していない複数のフィールドを抽出するにはどうすればよいですか？
A. カンマを使用してフィールド番号を区切ります：`cut -d, -f1,3,5 file.csv`

#### Q2. cutは複数文字の区切り文字を処理できますか？
A. いいえ、`cut`は単一文字の区切り文字のみをサポートしています。複数文字の区切り文字の場合は、代わりに`awk`の使用を検討してください。

#### Q3. 特定のフィールド以外のすべてを抽出するにはどうすればよいですか？
A. `--complement`オプションを使用します：`cut -d, -f2 --complement file.csv`は2番目のフィールド以外のすべてのフィールドを抽出します。

#### Q4. スペース区切りのファイルでcutがうまく機能しないのはなぜですか？
A. スペース区切りのファイルには、多くの場合、可変数のスペースがあります。より柔軟なフィールド区切りには`awk`の使用を検討してください。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html

## 改訂履歴

- 2025/05/05 初版