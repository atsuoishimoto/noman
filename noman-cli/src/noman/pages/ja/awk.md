# awk コマンド

構造化されたデータを操作するためのパターンスキャンとテキスト処理言語です。

## 概要

`awk` は強力なテキスト処理ツールで、入力の各行をレコードとして、各単語をフィールドとして扱います。CSV、ログ、テーブルなどの構造化されたテキストファイルからデータを抽出・操作するのに優れています。コマンドは次のパターンに従います: `awk 'パターン {アクション}' ファイル`。

## オプション

### **-F, --field-separator**

フィールド区切り文字を指定します（デフォルトは空白）

```console
$ echo "apple,orange,banana" | awk -F, '{print $2}'
orange
```

### **-f, --file**

コマンドラインではなくファイルからAWKプログラムを読み込みます

```console
$ cat script.awk
{print $1}
$ awk -f script.awk data.txt
First
Second
Third
```

### **-v, --assign**

プログラム実行前に変数に値を割り当てます

```console
$ awk -v name="John" '{print "Hello, " name}' /dev/null
Hello, John
```

### **-W, --compat, --posix**

POSIX互換モードで実行します

```console
$ awk -W posix '{print $1}' data.txt
First
Second
Third
```

## 使用例

### 基本的なフィールド表示

```console
$ echo "Hello World" | awk '{print $1}'
Hello
```

### CSVデータの処理

```console
$ cat data.csv
John,25,Engineer
Mary,30,Doctor
$ awk -F, '{print "Name: " $1 ", Job: " $3}' data.csv
Name: John, Job: Engineer
Name: Mary, Job: Doctor
```

### パターンマッチングによる行のフィルタリング

```console
$ cat /etc/passwd | awk -F: '/root/ {print $1 " has home directory " $6}'
root has home directory /root
```

### 合計の計算

```console
$ cat numbers.txt
10 20
30 40
$ awk '{sum += $1} END {print "Sum:", sum}' numbers.txt
Sum: 40
```

## ヒント:

### 組み込み変数

AWKには、`NR`（現在のレコード番号）、`NF`（現在のレコードのフィールド数）、`FS`（フィールド区切り文字）などの便利な組み込み変数があります。

```console
$ echo -e "a b c\nd e f" | awk '{print "Line", NR, "has", NF, "fields"}'
Line 1 has 3 fields
Line 2 has 3 fields
```

### 条件付き処理

if-else文を使用して条件付き処理を行います：

```console
$ cat ages.txt
John 25
Mary 17
Bob 32
$ awk '{if ($2 >= 18) print $1, "is an adult"; else print $1, "is a minor"}' ages.txt
John is an adult
Mary is a minor
Bob is an adult
```

### 複数のコマンド

セミコロンで複数のコマンドを区切ります：

```console
$ echo "Hello World" | awk '{count=split($0,arr," "); print "Words:", count; print "First word:", arr[1]}'
Words: 2
First word: Hello
```

## よくある質問

#### Q1. awk、sed、grepの違いは何ですか？
A. grepがパターンを検索し、sedがテキスト変換を実行するのに対し、awkは変数、関数、算術演算などのプログラミング機能を含む構造化データ処理用に設計されています。

#### Q2. awkで複数のファイルを処理するにはどうすればよいですか？
A. awkコマンドの後にファイルを列挙するだけです：`awk '{print $1}' file1.txt file2.txt`

#### Q3. awkは複数行処理を扱えますか？
A. はい、`RS`（レコード区切り文字）変数を使用します：`awk 'BEGIN{RS="";FS="\n"}{print $1}' file.txt` は段落で区切られたテキストを処理します。

#### Q4. awkで正規表現を使用するにはどうすればよいですか？
A. 正規表現はスラッシュの間に配置します：`awk '/pattern/ {print}' file.txt`

## 参考文献

https://www.gnu.org/software/gawk/manual/gawk.html

## 改訂履歴

- 2025/05/05 初版