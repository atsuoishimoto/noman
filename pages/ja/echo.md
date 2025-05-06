# echo コマンド

テキストや変数を標準出力に表示します。

## 概要

`echo` コマンドは、引数を標準出力に表示し、最後に改行を追加します。シェルスクリプトでテキストを表示したり、変数の値を表示したり、他のコマンドへの出力を生成したりするために一般的に使用されます。

## オプション

### **-n**

通常出力の最後に追加される改行を抑制します。

```console
$ echo -n "Hello"
Hello$
```

### **-e**

バックスラッシュエスケープシーケンスの解釈を有効にします。

```console
$ echo -e "Hello\nWorld"
Hello
World
```

### **-E**

バックスラッシュエスケープシーケンスの解釈を無効にします（これがデフォルトです）。

```console
$ echo -E "Hello\nWorld"
Hello\nWorld
```

## 使用例

### テキストの表示

```console
$ echo Hello World
Hello World
```

### 変数値の表示

```console
$ name="John"
$ echo "My name is $name"
My name is John
```

### コマンド置換との併用

```console
$ echo "Today's date is $(date)"
Today's date is Mon May 5 10:15:23 EDT 2025
```

### -e オプションでエスケープシーケンスを使用

```console
$ echo -e "Tab:\t| Newline:\n| Backslash:\\"
Tab:	| Newline:
| Backslash:\
```

## ヒント:

### 変数展開を防ぐ

シングルクォートを使用して変数展開と解釈を防ぎます：

```console
$ echo '$HOME contains your home directory path'
$HOME contains your home directory path
```

### 出力をファイルにリダイレクト

echo とリダイレクションを組み合わせて、ファイルを作成または追加します：

```console
$ echo "This is a new file" > newfile.txt
$ echo "This is appended" >> newfile.txt
```

### 複数行のコンテンツを生成

複数の echo コマンドまたはエスケープシーケンスを使用して、複数行のコンテンツを作成します：

```console
$ echo -e "Line 1\nLine 2\nLine 3" > multiline.txt
```

## よくある質問

#### Q1. echo でシングルクォートとダブルクォートの違いは何ですか？
A. ダブルクォート（`"`）は変数展開と一部のエスケープシーケンスを許可しますが、シングルクォート（`'`）は展開せずにすべてを文字通りに扱います。

#### Q2. 最後に改行なしで echo するにはどうすればよいですか？
A. `-n` オプションを使用します：`echo -n "text"`。

#### Q3. タブや改行などの特殊文字を含めるにはどうすればよいですか？
A. `-e` オプションとエスケープシーケンスを使用します：`echo -e "Tab:\t Newline:\n"`。

#### Q4. echo でファイルの内容を表示できますか？
A. いいえ、それは `cat` コマンドの役割です。Echo は引数のみを表示します。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/echo-invocation.html

## 改訂履歴

- 2025/05/05 初版