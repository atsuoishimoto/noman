# egrep コマンド

拡張正規表現を使用してパターンを検索します。

## 概要

`egrep` はファイル内のテキストパターンを拡張正規表現を使って検索するパターンマッチングツールです。機能的には `grep -E` と同等であり、標準の `grep` よりも強力なパターンマッチング機能を提供します。このコマンドは指定されたパターンに一致する行を出力します。

## オプション

### **-i, --ignore-case**

パターンと入力データの大文字と小文字の区別を無視します

```console
$ egrep -i "error" logfile.txt
Error: Connection refused
WARNING: error in line 42
System error detected
```

### **-v, --invert-match**

一致しない行を選択します

```console
$ egrep -v "error" logfile.txt
Connection established successfully
System started at 10:00 AM
All processes running normally
```

### **-c, --count**

ファイルごとに一致する行数のみを表示します

```console
$ egrep -c "error" logfile.txt
3
```

### **-n, --line-number**

出力の各行の先頭に入力ファイル内の行番号を付けます

```console
$ egrep -n "error" logfile.txt
5:error: file not found
12:system error occurred
27:error code: 404
```

### **-l, --files-with-matches**

一致を含むファイル名のみを表示します

```console
$ egrep -l "error" *.log
app.log
system.log
error.log
```

### **-o, --only-matching**

パターンに一致する部分のみを表示します

```console
$ egrep -o "error[0-9]+" logfile.txt
error404
error500
```

### **-r, --recursive**

各ディレクトリ下のすべてのファイルを再帰的に読み込みます

```console
$ egrep -r "password" /home/user/
/home/user/config.txt:password=123456
/home/user/notes/secret.txt:my password is qwerty
```

## 使用例

### 基本的なパターンマッチング

```console
$ egrep "apple|orange" fruits.txt
apple
orange
mixed apple juice
fresh orange
```

### 文字クラスの使用

```console
$ egrep "[0-9]+" numbers.txt
42
123
7890
```

### 量指定子の使用

```console
$ egrep "a{2,}" words.txt
aardvark
baaad
shaaa
```

### 複数のオプションの組み合わせ

```console
$ egrep -in "error|warning" --color=auto logfile.txt
3:WARNING: disk space low
7:error: connection timeout
15:WARNING: memory usage high
22:error: invalid input
```

## ヒント:

### 拡張正規表現を使用する

`egrep` は `+`、`?`、`|`、`()`、`{}` などの強力な正規表現機能をエスケープせずにサポートしているため、複雑なパターンマッチングが容易になります。

### 一致箇所を色付けする

`--color=auto` を使用して一致するテキストを色付けすることで、大量の出力の中で一致箇所を見つけやすくなります。

### 他のコマンドと組み合わせる

他のコマンドの出力を `egrep` にパイプして結果をフィルタリングできます：
```console
$ ps aux | egrep "(firefox|chrome)"
```

### 単語境界を使用する

完全な単語のみを一致させるには、単語境界 `\b` を使用します：
```console
$ egrep "\berror\b" logfile.txt
```

## よくある質問

#### Q1. `grep` と `egrep` の違いは何ですか？
A. `egrep` は `grep -E` と同等で、拡張正規表現を使用します。拡張正規表現では、バックスラッシュを必要とせずに `+`、`?`、`|` などの追加のメタ文字をサポートしています。

#### Q2. 複数のパターンを検索するにはどうすればよいですか？
A. パイプ記号（`|`）を使用して代替パターンを検索します：`egrep "pattern1|pattern2" file.txt`

#### Q3. ディレクトリ内のすべてのファイルでパターンを検索するにはどうすればよいですか？
A. 再帰オプションを使用します：`egrep -r "pattern" directory/`

#### Q4. 特定のファイルを検索から除外するにはどうすればよいですか？
A. `--exclude` または `--exclude-dir` オプションを使用します：`egrep -r "pattern" --exclude="*.log" directory/`

## 参考文献

https://www.gnu.org/software/grep/manual/grep.html

## 改訂履歴

- 2025/05/06 -o, --only-matching オプションを追加
- 2025/05/05 初版