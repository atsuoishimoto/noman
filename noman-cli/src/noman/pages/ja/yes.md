# yes コマンド

文字列が終了されるまで繰り返し出力します。

## 概要

`yes` コマンドは、終了されるまで文字列（デフォルトでは "y"）を継続的に出力します。一般的に、確認が必要なスクリプトやコマンドに対して自動的に応答するために使用されます。

## オプション

### **--help**

ヘルプ情報を表示して終了します。

```console
$ yes --help
Usage: yes [STRING]...
  or:  yes OPTION
Repeatedly output a line with all specified STRING(s), or 'y'.

      --help     display this help and exit
      --version  output version information and exit
```

### **--version**

バージョン情報を出力して終了します。

```console
$ yes --version
yes (GNU coreutils) 9.0
Copyright (C) 2021 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by David MacKenzie.
```

## 使用例

### デフォルトの使用法（"y"を繰り返し出力）

```console
$ yes
y
y
y
y
y
^C
```

### カスタム文字列の出力

```console
$ yes "I agree"
I agree
I agree
I agree
I agree
^C
```

### 別のコマンドへのパイプ

```console
$ yes | rm -i *.txt
rm: remove regular file 'file1.txt'? rm: remove regular file 'file2.txt'? 
```

## ヒント:

### 複数のプロンプトを自動的に確認

手動介入なしで複数の操作を確認する必要がある場合は、`yes`をコマンドにパイプします：

```console
$ yes | apt-get install package1 package2 package3
```

### headで出力を制限

特定の回数の繰り返しが必要な場合は、`head`を使用します：

```console
$ yes "Hello" | head -n 5
Hello
Hello
Hello
Hello
Hello
```

### テストファイルの生成

出力をリダイレクトして特定のサイズのテストファイルを作成します：

```console
$ yes "data" | head -c 1M > testfile.txt
```

## よくある質問

#### Q1. `yes`コマンドを停止するにはどうすればよいですか？
A. Ctrl+Cを押してコマンドを終了します。

#### Q2. `yes`で複数の文字列を出力できますか？
A. はい、複数の引数を提供できます：`yes word1 word2`は「word1 word2」を繰り返し出力します。

#### Q3. `yes`コマンドの目的は何ですか？
A. 主にスクリプトやコマンドの確認プロンプトに自動的に「y」と答えるために使用されます。

#### Q4. `yes`はシステムリソースを大量に消費しますか？
A. 非常に速く出力を生成し、CPUリソースを消費する可能性があるため、フローを制御する別のコマンドにパイプする場合に最適です。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/yes-invocation.html

## 改訂履歴

- 2025/05/05 初版