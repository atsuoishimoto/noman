# shift コマンド

シェルスクリプト内の位置パラメータをシフトし、最初のパラメータを削除して残りのパラメータの番号を振り直します。

## 概要

`shift`コマンドはシェル組み込みコマンドで、最初の位置パラメータ($1)を削除し、他のすべてのパラメータを1つ下の位置にシフトします（$2が$1に、$3が$2になるなど）。これは特に、コマンドライン引数を順番に処理する場合や、パラメータのリストを処理する必要がある場合のシェルスクリプトで非常に便利です。

## オプション

### **n**

パラメータをn個の位置だけシフトします（nは正の整数）。nが位置パラメータの数より大きい場合、すべてのパラメータが削除されます。

```console
$ set -- a b c d e
$ echo $1 $2 $3
a b c
$ shift 2
$ echo $1 $2 $3
c d e
```

## 使用例

### 基本的な使い方

```console
$ set -- apple banana cherry
$ echo $1
apple
$ shift
$ echo $1
banana
$ shift
$ echo $1
cherry
```

### スクリプト内でのコマンドライン引数の処理

```console
#!/bin/bash
# process_args.sh

while [ $# -gt 0 ]; do
    echo "Processing: $1"
    shift
done
```

実行すると：

```console
$ ./process_args.sh arg1 arg2 arg3
Processing: arg1
Processing: arg2
Processing: arg3
```

### フラグとオプションの処理

```console
#!/bin/bash
# process_options.sh

verbose=0
while [ $# -gt 0 ]; do
    case "$1" in
        -v|--verbose)
            verbose=1
            shift
            ;;
        -f|--file)
            filename="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            shift
            ;;
    esac
done

echo "Verbose mode: $verbose"
[ -n "$filename" ] && echo "Filename: $filename"
```

## ヒント:

### 残りのパラメータを確認する

`$#`を使用して、残りのパラメータの数を確認します。これは十分な引数が提供されたことを検証するのに役立ちます。

```console
if [ $# -lt 2 ]; then
    echo "Error: Not enough arguments"
    exit 1
fi
```

### 元の引数を保存する

後で元の引数にアクセスする必要がある場合は、シフトする前に保存します：

```console
all_args=("$@")
while [ $# -gt 0 ]; do
    # 引数を処理
    shift
done
# 後で元の引数に ${all_args[@]} でアクセス
```

### エラーチェック付きのシフト

1つ以上シフトする場合は、十分なパラメータが存在することを確認します：

```console
if [ $# -ge 2 ]; then
    shift 2
else
    echo "Not enough parameters to shift"
    exit 1
fi
```

## よくある質問

#### Q1. パラメータが残っていない時に`shift`を使うとどうなりますか？
A. ほとんどのシェルでは、何も起こりません - エラーにはなりません。ただし、シフトする前に`$#`をチェックするのが良い習慣です。

#### Q2. シェルスクリプト以外で`shift`を使用できますか？
A. はい、対話型シェルセッションでも使用できますが、主にスクリプトで役立ちます。

#### Q3. `shift`は環境変数に影響しますか？
A. いいえ、位置パラメータ（$1、$2など）にのみ影響し、環境変数には影響しません。

#### Q4. 1つ以上の位置をシフトするにはどうすればよいですか？
A. `shift n`を使用します。nはシフトする位置の数です（例：`shift 2`）。

## 参考文献

https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-shift

## 改訂履歴

- 2025/05/05 初版