# xargsコマンド

標準入力から引数を受け取ってコマンドを実行します。

## 概要

`xargs`は標準入力からアイテムを読み取り、それらをコマンドの引数として実行します。他のコマンドの出力からコマンドラインを構築したり、大きな引数リストを処理したり、データをバッチで処理したりする場合に特に便利です。

## オプション

### **-0, --null**

入力アイテムは空白ではなくnull文字で区切られます。入力にスペースや改行が含まれる可能性がある場合に便利です。

```console
$ find . -name "*.txt" -print0 | xargs -0 grep "pattern"
./file1.txt:pattern found here
./path with spaces/file2.txt:pattern also here
```

### **-I, --replace[=R]**

初期引数内のR（デフォルトは{}）の出現を標準入力から読み取った名前に置き換えます。

```console
$ echo "file1.txt file2.txt" | xargs -I {} cp {} backup/
```

### **-n, --max-args=MAX-ARGS**

コマンドラインごとに最大MAX-ARGS個の引数を使用します。

```console
$ echo "1 2 3 4" | xargs -n 2 echo
1 2
3 4
```

### **-P, --max-procs=MAX-PROCS**

最大MAX-PROCSのプロセスを同時に実行します。

```console
$ find . -name "*.jpg" | xargs -P 4 -I {} convert {} {}.png
```

### **-d, --delimiter=DELIM**

入力アイテムは空白ではなくDELIM文字で区切られます。

```console
$ echo "file1.txt:file2.txt:file3.txt" | xargs -d ":" ls -l
-rw-r--r-- 1 user group 123 May 5 10:00 file1.txt
-rw-r--r-- 1 user group 456 May 5 10:01 file2.txt
-rw-r--r-- 1 user group 789 May 5 10:02 file3.txt
```

### **-p, --interactive**

各コマンドを実行する前にユーザーに確認を求めます。

```console
$ echo "important_file.txt" | xargs -p rm
rm important_file.txt ?...
```

## 使用例

### ファイルの検索と削除

```console
$ find . -name "*.tmp" | xargs rm
```

### 複数の引数によるバッチ処理

```console
$ cat file_list.txt | xargs -n 3 tar -czf archive.tar.gz
```

### grepと組み合わせて複数のファイルを検索

```console
$ find . -name "*.py" | xargs grep "import requests"
./script1.py:import requests
./utils/http.py:import requests as req
```

### スペースを含むファイル名の処理

```console
$ find . -name "*.jpg" -print0 | xargs -0 -I {} mv {} ./images/
```

## ヒント:

### 空の入力でのコマンド実行を防止する

`xargs --no-run-if-empty`を使用すると、標準入力が空の場合にコマンドが実行されるのを防ぎ、予期しない動作を防止できます。

### 実行前にコマンドをプレビューする

`xargs -t`を使用すると、実行前に各コマンドが表示されるため、対話モードを使用せずに何が実行されるかを確認できます。

### 特殊文字を含むファイル名の処理

スペース、改行、その他の特殊文字を含む可能性のあるファイル名を扱う場合は、常に`find`と一緒に`-print0`を、`xargs`と一緒に`-0`を使用してください。

### 大規模な操作のためのバッチサイズの制限

多数のファイルを処理する場合は、`-n`を使用してコマンド実行ごとの引数の数を制限し、「引数リストが長すぎる」エラーを回避します。

## よくある質問

#### Q1. パイプでコマンドに送る方法とxargsを使用する方法の違いは何ですか？
A. パイプ（`|`）は出力を次のコマンドの標準入力として送りますが、`xargs`は入力をコマンドライン引数に変換します。`rm`や`cp`などの多くのコマンドは標準入力ではなく引数を期待しています。

#### Q2. ファイル名を途中に必要とするコマンドでxargsを使用するにはどうすればよいですか？
A. プレースホルダーと共に`-I`オプションを使用します：`find . -name "*.txt" | xargs -I {} mv {} {}.bak`

#### Q3. 多数のファイルに対してxargsをより速く実行するにはどうすればよいですか？
A. 複数のプロセスを並行して実行するために`-P`オプションを使用します：`xargs -P 4`は最大4つのプロセスを同時に実行します。

#### Q4. xargsが時々入力を予期せず分割するのはなぜですか？
A. デフォルトでは、xargsは空白で分割します。異なる区切り文字を指定するには`-d`を使用するか、null終端の入力には`-0`を使用してください。

## 参考文献

https://www.gnu.org/software/findutils/manual/html_node/find_html/xargs-options.html

## 改訂履歴

- 2025/05/05 初版