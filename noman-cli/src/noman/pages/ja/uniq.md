# uniqコマンド

隣接する一致する行を入力からフィルタリングしたり、ユニークな行を報告したりします。

## 概要

`uniq`コマンドは、ファイルや入力ストリームから繰り返し行をフィルタリングします。隣接する行を比較し、重複する行を削除または識別することで動作します。デフォルトでは、`uniq`は隣接している場合にのみ重複行を検出するため、通常は`sort`コマンドを使用して入力を最初にソートします。

## オプション

### **-c, --count**

行の前に出現回数を付けます

```console
$ sort names.txt | uniq -c
      2 Alice
      1 Bob
      3 Charlie
```

### **-d, --repeated**

重複行のみを表示し、各グループにつき1行を出力する

```console
$ sort names.txt | uniq -d
Alice
Charlie
```

### **-u, --unique**

ユニークな行のみを表示する（入力で重複していない行）

```console
$ sort names.txt | uniq -u
Bob
```

### **-i, --ignore-case**

行を比較する際に大文字と小文字を区別しない

```console
$ sort names.txt | uniq -i
Alice
Bob
Charlie
```

### **-f N, --skip-fields=N**

最初のNフィールドの比較をスキップする

```console
$ cat data.txt
1 Alice Engineering
1 Alice Marketing
2 Bob Sales
$ uniq -f 1 data.txt
1 Alice Engineering
2 Bob Sales
```

### **-s N, --skip-chars=N**

最初のN文字の比較をスキップする

```console
$ cat codes.txt
ABC123
ABC456
DEF789
$ uniq -s 3 codes.txt
ABC123
DEF789
```

## 使用例

### sortと組み合わせた基本的な使い方

```console
$ cat names.txt
Alice
Bob
Alice
Charlie
Charlie
Charlie
Bob
$ sort names.txt | uniq
Alice
Bob
Charlie
```

### 各行の出現回数をカウントする

```console
$ sort names.txt | uniq -c
      2 Alice
      2 Bob
      3 Charlie
```

### 一度だけ表示される行のみを表示する

```console
$ sort names.txt | uniq -u
```

### 重複行のみを表示する

```console
$ sort names.txt | uniq -d
Alice
Bob
Charlie
```

## ヒント:

### 常に最初にソートする

`uniq`は隣接する重複行のみを削除するため、すべての重複を検出するために常に`sort`の出力を`uniq`にパイプしてください：

```console
$ sort file.txt | uniq
```

### 単語の頻度をカウントする

ファイル内の単語の頻度をカウントするには、次のようにします：

```console
$ cat file.txt | tr -s ' ' '\n' | sort | uniq -c | sort -nr
```

これによりテキストを単語に分割し、ソートし、出現回数をカウントし、頻度でソートします。

### 大文字小文字を区別しないマッチング

同じ単語の大文字と小文字のバージョンを同一として扱いたい場合は、`-i`を使用します：

```console
$ sort words.txt | uniq -i
```

## よくある質問

#### Q1. なぜ`uniq`がファイル内のすべての重複行を削除しないのですか？
A. `uniq`は隣接する重複行のみを削除します。最初にファイルをソートする必要があります：`sort file.txt | uniq`

#### Q2. 各行が何回出現するかをカウントするにはどうすればよいですか？
A. `sort file.txt | uniq -c`を使用してください

#### Q3. 一度だけ表示される行を見つけるにはどうすればよいですか？
A. `sort file.txt | uniq -u`を使用してください

#### Q4. 重複した行を見つけるにはどうすればよいですか？
A. `sort file.txt | uniq -d`を使用してください

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html

## 改訂履歴

- 2025/05/05 初版