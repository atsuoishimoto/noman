# getoptコマンド

シェルスクリプトでコマンドラインオプションを解析します。

## 概要

`getopt`は、指定された形式に従ってコマンドライン引数を解析するコマンドラインユーティリティで、シェルスクリプトでオプションを扱いやすくします。引数を標準的な形式に並べ替えることで、オプション処理を標準化し、より簡単に処理できるようにします。

## オプション

### **-o, --options**

認識する短いオプションを指定します

```console
$ getopt -o ab:c:: -- -a -b value -c
 -a -b 'value' -c -- 
```

### **-l, --longoptions**

認識する長いオプションを指定します

```console
$ getopt -o a -l alpha,beta: -- --alpha --beta=value
 -a --beta 'value' -- 
```

### **-n, --name**

エラーメッセージで使用される名前を設定します

```console
$ getopt -n myscript -o a -- -x
myscript: invalid option -- 'x'
```

### **-q, --quiet**

エラーメッセージを抑制します

```console
$ getopt -q -o a -- -x
 -- 'x'
```

### **-Q, --quiet-output**

通常の出力を抑制します（有効なオプションの確認時に便利）

```console
$ getopt -Q -o a -- -a
```

### **-u, --unquoted**

引用符なしの出力を生成します（推奨されません）

```console
$ getopt -u -o a:b: -- -a foo -b bar
 -a foo -b bar -- 
```

### **-T, --test**

テストモード：解析されたパラメータを出力して終了します

```console
$ getopt -T -o a:b: -- -a foo -b bar
getopt -o 'a:b:' -- '-a' 'foo' '-b' 'bar'
```

## 使用例

### シェルスクリプトでの基本的なオプション解析

```console
$ cat example.sh
#!/bin/bash
OPTS=$(getopt -o ab:c: --long alpha,beta:,gamma: -n 'example.sh' -- "$@")
eval set -- "$OPTS"

while true; do
  case "$1" in
    -a | --alpha ) ALPHA=1; shift ;;
    -b | --beta ) BETA="$2"; shift 2 ;;
    -c | --gamma ) GAMMA="$2"; shift 2 ;;
    -- ) shift; break ;;
    * ) break ;;
  esac
done

echo "Alpha: $ALPHA"
echo "Beta: $BETA"
echo "Gamma: $GAMMA"
echo "Remaining arguments: $@"

$ ./example.sh -a --beta=value arg1 arg2
Alpha: 1
Beta: value
Gamma: 
Remaining arguments: arg1 arg2
```

### 必須オプションの処理

```console
$ cat required.sh
#!/bin/bash
OPTS=$(getopt -o f: --long file: -n 'required.sh' -- "$@")
eval set -- "$OPTS"

FILE=""
while true; do
  case "$1" in
    -f | --file ) FILE="$2"; shift 2 ;;
    -- ) shift; break ;;
    * ) break ;;
  esac
done

if [ -z "$FILE" ]; then
  echo "Error: -f/--file option is required"
  exit 1
fi

echo "Processing file: $FILE"

$ ./required.sh -f data.txt
Processing file: data.txt

$ ./required.sh
Error: -f/--file option is required
```

## ヒント:

### 拡張getoptを使用する

最新のLinuxシステムでは長いオプションをサポートする拡張getoptが使用されています。一部のシステム（macOSなど）の従来のgetoptでは、すべての機能がサポートされていない場合があります。

### 常に変数を引用符で囲む

getoptに引数を渡す際は、スペースを正しく処理するために常に変数を引用符で囲みます：
```bash
getopt -o a:b: -- "$@"
```

### エラーを適切に処理する

エラーメッセージ用にスクリプト名を提供するために`-n`オプションを使用し、無効なオプションを処理するためにgetoptの終了ステータスをチェックします：
```bash
OPTS=$(getopt -o a:b: -n 'myscript' -- "$@") || exit 1
```

### オプション構文を理解する

オプション文字列では：
- 単一の文字はフラグオプションを意味します（例：`-a`）
- 文字の後にコロンが続く場合は、必須引数を持つオプションを意味します（例：`-b value`）
- 文字の後に2つのコロンが続く場合は、オプションの引数を持つオプションを意味します（例：`-c[value]`）

## よくある質問

#### Q1. `getopt`と`getopts`の違いは何ですか？
A. `getopt`は短いオプションと長いオプションの両方をサポートする外部コマンドであるのに対し、`getopts`は短いオプションのみをサポートするシェル組み込みコマンドですが、異なるUnix系システム間での移植性が高いです。

#### Q2. スクリプトが「getopt: invalid option」エラーで失敗するのはなぜですか？
A. 長いオプションやその他の拡張機能をサポートしていない従来のgetopt（macOSで一般的）を使用している可能性があります。ほとんどのLinuxディストリビューションで利用可能な拡張getoptを使用してみてください。

#### Q3. オプションの引数を持つオプションをどのように処理しますか？
A. オプション指定でダブルコロンを使用します：短いオプションの場合は`-o a::`、長いオプションの場合は`--longoptions=alpha::`。

#### Q4. オプションと非オプション引数をどのように区別しますか？
A. `--`を使用してオプションの終わりをマークします。`--`の後の引数はすべて非オプション引数として扱われます。

## 参考文献

https://man7.org/linux/man-pages/man1/getopt.1.html

## 改訂履歴

- 2025/05/05 初版