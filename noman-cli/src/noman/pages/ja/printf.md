# printf コマンド

指定されたフォーマット文字列に従ってデータをフォーマットして表示します。

## 概要

`printf` コマンドは、フォーマット指定に従ってデータをフォーマットし、標準出力に表示します。C プログラミング言語の printf 関数と同様に動作し、テキストの配置、数値のフォーマット、文字列操作など、出力フォーマットを細かく制御できます。

## オプション

### **-v VAR**

出力を標準出力に表示する代わりに、シェル変数 VAR に割り当てます。

```console
$ printf -v myvar "Hello, %s" "World"
$ echo $myvar
Hello, World
```

### **--help**

ヘルプメッセージを表示して終了します。

```console
$ printf --help
Usage: printf FORMAT [ARGUMENT]...
   or: printf OPTION
Print ARGUMENT(s) according to FORMAT, or execute according to OPTION:

      --help     display this help and exit
      --version  output version information and exit
...
```

### **--version**

バージョン情報を出力して終了します。

```console
$ printf --version
printf (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by David MacKenzie.
```

## フォーマット指定子

### **%s** - 文字列

```console
$ printf "Hello, %s!\n" "World"
Hello, World!
```

### **%d** - 10進整数

```console
$ printf "Number: %d\n" 42
Number: 42
```

### **%f** - 浮動小数点数

```console
$ printf "Pi is approximately %.2f\n" 3.14159
Pi is approximately 3.14
```

### **%c** - 文字

```console
$ printf "First letter: %c\n" "A"
First letter: A
```

### **%x** - 16進数

```console
$ printf "Hex: %x\n" 255
Hex: ff
```

### **%%** - パーセント記号そのもの

```console
$ printf "100%% complete\n"
100% complete
```

## 使用例

### 基本的なテキストフォーマット

```console
$ printf "Name: %s, Age: %d\n" "Alice" 30
Name: Alice, Age: 30
```

### 複数の引数

```console
$ printf "%s %s %s\n" "one" "two" "three"
one two three
```

### 幅と配置

```console
$ printf "|%-10s|%10s|\n" "left" "right"
|left      |     right|
```

### 浮動小数点数の精度

```console
$ printf "%.2f %.4f %.0f\n" 3.14159 2.71828 5.999
3.14 2.7183 6
```

### 表のフォーマット

```console
$ printf "%-10s %-8s %s\n" "Name" "Age" "City"
$ printf "%-10s %-8d %s\n" "Alice" 30 "New York"
$ printf "%-10s %-8d %s\n" "Bob" 25 "Chicago"
Name       Age      City
Alice      30       New York
Bob        25       Chicago
```

## ヒント:

### エスケープシーケンスを使用する

一般的なエスケープシーケンスには `\n`（改行）、`\t`（タブ）、`\\`（バックスラッシュ）があります。

```console
$ printf "Line 1\nLine 2\tTabbed\n"
Line 1
Line 2	Tabbed
```

### 先頭にゼロを付けた数値フォーマット

`%0Nd` という形式を使用します。N は合計幅です：

```console
$ printf "ID: %04d\n" 42
ID: 0042
```

### フォーマット引数の再利用

出力位置が引数よりも多い場合、最後の引数が再利用されます：

```console
$ printf "A: %d, B: %d, C: %d\n" 1 2
A: 1, B: 2, C: 2
```

### 改行なしで表示

`echo` と異なり、`printf` は自動的に改行を追加しません：

```console
$ printf "No newline"
No newline$
```

## よくある質問

#### Q1. `printf` と `echo` の違いは何ですか？
A. `printf` はより正確なフォーマット制御を提供しますが、デフォルトでは改行を追加しません。`echo` はよりシンプルですが、フォーマットオプションが少なく、自動的に改行を追加します。

#### Q2. `printf` で日付をフォーマットするにはどうすればよいですか？
A. `printf` で直接日付をフォーマットすることはできません。`date` コマンドを使用してフォーマットされた日付文字列を生成し、それを `printf` に渡します：
```console
$ printf "Today is %s\n" "$(date +"%Y-%m-%d")"
Today is 2025-05-05
```

#### Q3. タブや改行などの特殊文字を表示するにはどうすればよいですか？
A. エスケープシーケンスを使用します：`\t` はタブ、`\n` は改行、`\r` はキャリッジリターン、`\\` はバックスラッシュそのものを表します。

#### Q4. 数値の小数点以下の桁数をフォーマットするにはどうすればよいですか？
A. 精度指定子を使用します。例えば `%.2f` は小数点以下2桁を表示します：
```console
$ printf "Price: $%.2f\n" 9.99
Price: $9.99
```

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/printf-invocation.html

## 改訂履歴

- 2025/05/05 初版