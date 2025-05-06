# [ コマンド

条件式を評価し、評価結果に基づいてステータスを返します。

## 概要

`[` コマンド（`test` としても知られています）は、条件式を評価し、0（真）または1（偽）のステータスを返すシェル組み込みコマンドです。シェルスクリプトでファイル属性のテスト、文字列比較、算術演算の条件テストによく使用されます。このコマンドは構文を完成させるために閉じる `]` が必要です。

## オプション

### **-e file**

ファイルが存在するかテストします。

```console
$ [ -e /etc/passwd ] && echo "File exists" || echo "File does not exist"
File exists
```

### **-f file**

ファイルが存在し、通常ファイルであるかテストします。

```console
$ [ -f /etc/passwd ] && echo "Regular file" || echo "Not a regular file"
Regular file
```

### **-d file**

ファイルが存在し、ディレクトリであるかテストします。

```console
$ [ -d /etc ] && echo "Directory exists" || echo "Not a directory"
Directory exists
```

### **-r file**

ファイルが存在し、読み取り可能であるかテストします。

```console
$ [ -r /etc/passwd ] && echo "File is readable" || echo "File is not readable"
File is readable
```

### **-w file**

ファイルが存在し、書き込み可能であるかテストします。

```console
$ [ -w /tmp ] && echo "Directory is writable" || echo "Directory is not writable"
Directory is writable
```

### **-x file**

ファイルが存在し、実行可能であるかテストします。

```console
$ [ -x /bin/ls ] && echo "File is executable" || echo "File is not executable"
File is executable
```

### **-z string**

文字列の長さがゼロであるかテストします。

```console
$ [ -z "" ] && echo "String is empty" || echo "String is not empty"
String is empty
```

### **-n string**

文字列の長さがゼロでないかテストします。

```console
$ [ -n "hello" ] && echo "String is not empty" || echo "String is empty"
String is not empty
```

## 使用例

### 文字列比較

```console
$ name="John"
$ [ "$name" = "John" ] && echo "Name is John" || echo "Name is not John"
Name is John
```

### 数値比較

```console
$ age=25
$ [ $age -eq 25 ] && echo "Age is 25" || echo "Age is not 25"
Age is 25
```

### 論理演算子による条件の組み合わせ

```console
$ [ -d /etc ] && [ -r /etc/passwd ] && echo "Both conditions are true"
Both conditions are true
```

### if文での使用

```console
$ if [ -f /etc/hosts ]; then
>   echo "The hosts file exists"
> else
>   echo "The hosts file does not exist"
> fi
The hosts file exists
```

## ヒント:

### 変数は常に引用符で囲む

`[` の中では変数を常に引用符で囲み、空の変数やスペースを含む変数によるエラーを防ぎます：

```console
$ [ "$variable" = "value" ]  # 正しい
$ [ $variable = value ]      # 潜在的に問題あり
```

### Bashでは二重角括弧を使用する

Bashでは、より高度な機能と引用符の問題が少ない `[[` を `[` の代わりに使用することを検討してください：

```console
$ [[ $string == *txt ]] && echo "String ends with txt"
```

### 閉じ括弧を忘れない

`[` コマンドは最後の引数として閉じ括弧 `]` が必要です。これを忘れると構文エラーが発生します。

### スペースは重要

括弧と演算子の周りにはスペースが必要です：

```console
$ [ -f file.txt ]    # 正しい
$ [-f file.txt]      # 間違い
$ [ $a = $b ]        # 正しい
$ [ $a=$b ]          # 間違い
```

## よくある質問

#### Q1. `[` と `[[` の違いは何ですか？
A. `[` はすべてのPOSIXシェルで利用可能なコマンド（`test` としても知られる）であるのに対し、`[[` はBash/Zshシェルのキーワードで、パターンマッチングやエスケープなしの論理演算子などの拡張機能があります。

#### Q2. 変数が空かどうかを確認するにはどうすればよいですか？
A. 変数が空かどうかを確認するには `[ -z "$variable" ]` を、空でないかを確認するには `[ -n "$variable" ]` を使用します。

#### Q3. 数値を比較するにはどうすればよいですか？
A. `-eq`（等しい）、`-ne`（等しくない）、`-lt`（より小さい）、`-le`（以下）、`-gt`（より大きい）、または `-ge`（以上）を使用します：`[ "$num1" -eq "$num2" ]`。

#### Q4. 文字列を比較するにはどうすればよいですか？
A. `=`（等しい）または `!=`（等しくない）を使用します：`[ "$string1" = "$string2" ]`。

## 参考文献

https://pubs.opengroup.org/onlinepubs/9699919799/utilities/test.html

## 改訂履歴

- 2025/05/05 初版