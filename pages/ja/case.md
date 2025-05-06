# case コマンド

シェルスクリプトでパターンマッチングに基づく条件分岐を実行します。

## 概要

`case`文はシェルの構文で、パターンマッチングに基づいて複数の条件分岐を可能にします。単一の値を複数のパターンと比較する場合、複数の`if-else`文よりも読みやすく効率的です。`case`文は、コマンドライン引数の処理、メニュー選択、または複数の条件チェックが必要な状況でシェルスクリプトでよく使用されます。

## 構文

```bash
case 単語 in
  パターン1)
    コマンド1
    ;;
  パターン2)
    コマンド2
    ;;
  *)
    デフォルトコマンド
    ;;
esac
```

## 使用例

### 基本的なパターンマッチング

```console
$ cat example.sh
#!/bin/bash
fruit="apple"

case "$fruit" in
  "apple")
    echo "これはリンゴです。"
    ;;
  "banana")
    echo "これはバナナです。"
    ;;
  *)
    echo "これは他のものです。"
    ;;
esac

$ ./example.sh
これはリンゴです。
```

### 一つのアクションに対する複数のパターン

```console
$ cat example2.sh
#!/bin/bash
fruit="pear"

case "$fruit" in
  "apple"|"pear"|"peach")
    echo "これは仁果類または核果類です。"
    ;;
  "banana"|"pineapple")
    echo "これは熱帯果実です。"
    ;;
  *)
    echo "不明な果物タイプです。"
    ;;
esac

$ ./example2.sh
これは仁果類または核果類です。
```

### コマンドライン引数の処理

```console
$ cat options.sh
#!/bin/bash

case "$1" in
  -h|--help)
    echo "使用法: $0 [オプション]"
    echo "オプション:"
    echo "  -h, --help     このヘルプメッセージを表示"
    echo "  -v, --version  バージョン情報を表示"
    ;;
  -v|--version)
    echo "バージョン 1.0"
    ;;
  *)
    echo "不明なオプション: $1"
    echo "詳細は --help を使用してください。"
    ;;
esac

$ ./options.sh --help
使用法: ./options.sh [オプション]
オプション:
  -h, --help     このヘルプメッセージを表示
  -v, --version  バージョン情報を表示
```

### ワイルドカードを使用したパターンマッチング

```console
$ cat wildcard.sh
#!/bin/bash
filename="document.txt"

case "$filename" in
  *.txt)
    echo "テキストファイル"
    ;;
  *.jpg|*.png|*.gif)
    echo "画像ファイル"
    ;;
  *.sh)
    echo "シェルスクリプト"
    ;;
  *)
    echo "不明なファイルタイプ"
    ;;
esac

$ ./wildcard.sh
テキストファイル
```

## ヒント

### フォールスルーに ;& または ;&& を使用する（Bash 4以降）

Bash 4以降では、`;& `を使用して次のパターンをテストせずに続行するか、`;&& `を使用して次のパターンをテストできます：

```bash
case "$var" in
  pattern1)
    echo "pattern1に一致"
    ;& # 次のパターンにフォールスルー
  pattern2)
    echo "pattern1が一致した場合、これも実行される"
    ;;
esac
```

### パイプ記号でパターンを組み合わせる

パイプ記号 `|` を使用して、同じアクションに対して複数のパターンを一致させます：

```bash
case "$var" in
  yes|y|Y)
    echo "肯定的"
    ;;
esac
```

### 常にデフォルトケースを含める

予期しない入力を処理するために、`*` を使用してデフォルトケースを含めます：

```bash
case "$var" in
  # 他のパターン
  *)
    echo "一致するものが見つかりません"
    ;;
esac
```

### 変数の周りに引用符を使用する

単語分割とグロブを防ぐために、常に変数を引用符で囲みます：

```bash
case "$variable" in
  # パターン
esac
```

## よくある質問

#### Q1. `case`は`if-else`文とどう違いますか？
A. `case`は単一の値を複数のパターンと比較する場合、より読みやすく効率的です。一般的な条件論理ではなく、特にパターンマッチング用に設計されています。

#### Q2. `case`パターンで正規表現を使用できますか？
A. `case`は正規表現ではなく、シェルのパターンマッチング（グロビング）を使用します。`*`、`?`などのワイルドカードや`[a-z]`などの文字クラスは使用できますが、`+`や`\d`などの正規表現構文は使用できません。

#### Q3. `case`文で任意のパターンに一致させるにはどうすればよいですか？
A. パターンとして`*`を使用すると、何にでも一致します。これは通常、デフォルトケースとして使用されます。

#### Q4. 数値比較で`case`を使用できますか？
A. はい、ただし構文に注意する必要があります。例えば：
```bash
case $number in
  [0-9]) echo "1桁" ;;
  [0-9][0-9]) echo "2桁" ;;
  *) echo "2桁以上または数字ではない" ;;
esac
```

## 参考文献

https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html

## 改訂履歴

- 2025/05/06 初版