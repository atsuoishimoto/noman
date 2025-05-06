# sort コマンド

テキストファイルの行を並べ替えます。

## 概要

`sort` コマンドは、テキストファイルや標準入力の行をアルファベット順、数値順、または逆順に並べ替えます。複数のソート済みファイルを結合したり、重複行を削除したり、各行内の特定のフィールドや文字に基づいてさまざまな並べ替え操作を実行したりすることができます。

## オプション

### **-n, --numeric-sort**

アルファベット順ではなく数値順（数値の大きさ）で並べ替えます

```console
$ sort -n numbers.txt
1
2
10
20
100
```

### **-r, --reverse**

比較結果を逆順にします

```console
$ sort -r names.txt
Zack
Victor
Susan
Alice
```

### **-f, --ignore-case**

並べ替え時に大文字と小文字を区別しません

```console
$ sort -f mixed_case.txt
Alice
apple
Banana
cat
Dog
```

### **-k, --key=POS1[,POS2]**

POS1から始まりPOS2で終わるキーで並べ替えます

```console
$ sort -k 2 employees.txt
101 Adams 5000
103 Brown 4500
102 Clark 5500
```

### **-t, --field-separator=SEP**

非空白から空白への遷移の代わりに、SEPをフィールド区切り文字として使用します

```console
$ sort -t: -k3,3n /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
```

### **-u, --unique**

等しい行の最初のもののみを出力します（重複を削除）

```console
$ sort -u duplicates.txt
apple
banana
orange
```

### **-M, --month-sort**

月として比較します（JAN < FEB < ... < DEC）

```console
$ sort -M months.txt
Jan
Feb
Mar
Apr
Dec
```

### **-h, --human-numeric-sort**

人間が読みやすい数値（例：2K、1G）を比較します

```console
$ sort -h sizes.txt
10K
1M
2M
1G
```

### **-R, --random-sort**

キーのランダムハッシュで並べ替えます

```console
$ sort -R names.txt
Victor
Alice
Susan
Zack
```

## 使用例

### ファイルを数値順に並べ替える

```console
$ cat numbers.txt
10
2
100
1
20
$ sort -n numbers.txt
1
2
10
20
100
```

### カスタム区切り文字を使用して特定の列で並べ替える

```console
$ cat data.csv
John,25,Engineer
Alice,30,Doctor
Bob,22,Student
$ sort -t, -k2,2n data.csv
Bob,22,Student
John,25,Engineer
Alice,30,Doctor
```

### 複数のソート済みファイルを結合する

```console
$ sort -m file1.txt file2.txt > merged.txt
```

### 重複を削除して新しいファイルに保存する

```console
$ sort -u input.txt > output.txt
```

## ヒント

### 一度に並べ替えと重複削除を行う
`sort -u` を使用すると、ファイルの並べ替えと重複行の削除を一度の操作で行うことができます。これは `sort | uniq` を使用するよりも効率的です。

### ファイルが既に並べ替えられているかを確認する
`sort -c filename` を使用すると、実際に何も出力せずにファイルが既に並べ替えられているかを確認できます。ファイルが並べ替えられていない場合はエラーメッセージが返されます。

### 大きなファイルのメモリ考慮事項
非常に大きなファイルの場合、`sort -T /tmp` を使用して十分な容量のある一時ディレクトリを指定するか、`sort -S 1G` を使用して並べ替えにより多くのメモリを割り当てます。

### 安定ソート
`sort -s` を使用すると安定ソートが行われ、等しいキーを持つ行の元の順序が保持されます。これは、同等のアイテムの元の順序を維持したい場合に便利です。

## よくある質問

#### Q1. ファイルを逆順に並べ替えるにはどうすればよいですか？
A. `sort -r filename` を使用して、逆順（降順）で並べ替えます。

#### Q2. CSVファイルを特定の列で並べ替えるにはどうすればよいですか？
A. `sort -t, -k2,2 filename.csv` を使用して2列目で並べ替えます。ここで `-t,` はカンマをフィールド区切り文字として指定します。

#### Q3. IPアドレスを正しく並べ替えるにはどうすればよいですか？
A. バージョン並べ替えには `sort -V` を使用します。これはIPアドレスに適しています：`sort -V ip_addresses.txt`

#### Q4. 複数のフィールドで並べ替えるにはどうすればよいですか？
A. 複数のキーを指定します：`sort -k1,1 -k2,2n filename` は最初にフィールド1をアルファベット順に、次にフィールド2を数値順に並べ替えます。

#### Q5. ヘッダーのあるファイルを並べ替え、ヘッダーを先頭に保持するにはどうすればよいですか？
A. 次のように使用します：`(head -1 file.txt; tail -n +2 file.txt | sort) > sorted_file.txt`

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html

## 改訂履歴

- 2025/05/05 初版