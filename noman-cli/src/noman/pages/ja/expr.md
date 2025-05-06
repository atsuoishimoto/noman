# expr コマンド

式を評価して結果を出力します。

## 概要

`expr` はコマンドライン・ユーティリティで、式を評価して結果を出力します。算術演算、文字列操作、論理比較を実行します。このコマンドは主にシェルスクリプト内での計算や文字列操作に使用されます。

## オプション

### **--help**

ヘルプメッセージを表示して終了します。

```
$ expr --help
Usage: expr EXPRESSION
  or:  expr OPTION
```

### **--version**

バージョン情報を出力して終了します。

```
$ expr --version
expr (GNU coreutils) 9.0
Copyright (C) 2021 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

## 使用例

### 基本的な算術演算

```
$ expr 5 + 3
8
$ expr 10 - 4
6
$ expr 3 \* 4
12
$ expr 20 / 5
4
$ expr 20 % 3
2
```

### 文字列操作

```
$ expr length "Hello World"
11
$ expr substr "Hello World" 1 5
Hello
$ expr index "Hello World" "o"
5
```

### 論理比較

```
$ expr 5 \> 3
1
$ expr 5 \< 3
0
$ expr 5 = 5
1
$ expr 5 != 3
1
```

### シェルスクリプトでの使用

```
$ a=5
$ b=3
$ c=$(expr $a + $b)
$ echo $c
8
```

## ヒント:

### 特殊文字のエスケープ

乗算(*)、除算(/)、その他の特殊文字は、シェルによる解釈を防ぐためにバックスラッシュでエスケープしてください。

```
$ expr 5 \* 3
15
```

### スペースが重要

`expr` は演算子とオペランドの間にスペースが必要です。スペースがないと、コマンドは正しく動作しません。

```
$ expr 5+3     # 間違い
5+3
$ expr 5 + 3   # 正しい
8
```

### 戻り値

`expr` は、式がゼロ以外かつ空でない値に評価される場合は0を、式がゼロまたは空の場合は1を、式が無効な場合は2を返します。

### 変数のインクリメントに使用

`expr` はシェルスクリプトでカウンターをインクリメントするためによく使用されます：

```
$ i=1
$ i=$(expr $i + 1)
$ echo $i
2
```

## よくある質問

#### Q1. `expr` と bash の `$(())` の違いは何ですか？
A. `expr` はすべてのPOSIXシェルで動作する外部コマンドですが、`$(())` はbashの組み込み算術展開で、より高速ですが移植性が低いです。

#### Q2. `expr` で浮動小数点計算を行うにはどうすればよいですか？
A. `expr` は整数演算のみを扱います。浮動小数点計算には、代わりに `bc` や `awk` を使用してください。

#### Q3. なぜ `expr` での乗算が失敗するのですか？
A. アスタリスク(*) は、シェルがワイルドカードとして解釈するのを防ぐためにバックスラッシュ (`\*`) でエスケープする必要があります。

#### Q4. `expr` は正規表現を扱えますか？
A. いいえ、`expr` は完全な正規表現をサポートしていません。パターンマッチングには、`grep`、`sed`、`awk` などのツールを使用してください。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/expr-invocation.html

## 改訂履歴

- 2025/05/05 初版