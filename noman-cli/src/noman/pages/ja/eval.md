# evalコマンド

引数をシェルコマンドとして評価し実行します。

## 概要

`eval`コマンドは、その引数を連結してコマンドを構築し、結果として得られるコマンドを現在のシェル環境で実行します。変数に格納されたコマンドや動的に生成されたコマンドを実行するのに役立ち、動的なコマンド構築と実行を可能にします。

## オプション

`eval`には特定のコマンドラインオプションはありません。単に引数の文字列を受け取り、それをシェルコマンドとして実行します。

## 使用例

### 基本的な使い方

```console
$ eval "echo Hello, World!"
Hello, World!
```

### コマンドでの変数の使用

```console
$ command="ls -la"
$ eval $command
total 32
drwxr-xr-x  5 user  staff   160 May  5 10:30 .
drwxr-xr-x  3 user  staff    96 May  4 09:15 ..
-rw-r--r--  1 user  staff  2048 May  5 10:25 file1.txt
-rw-r--r--  1 user  staff  1024 May  4 15:30 file2.txt
```

### 動的なコマンド構築

```console
$ action="echo"
$ target="Current date:"
$ value="$(date)"
$ eval "$action $target $value"
Current date: Mon May 5 10:35:22 EDT 2025
```

### 変数の動的な設定

```console
$ var_name="my_variable"
$ var_value="Hello from eval"
$ eval "$var_name='$var_value'"
$ echo $my_variable
Hello from eval
```

## ヒント:

### 引用符を慎重に使用する

`eval`への引数は常に引用符で囲み、予期しない単語分割やグロブを防ぐようにしましょう。これは、コマンドに変数や特殊文字が含まれている場合に特に重要です。

```console
$ filename="my file.txt"
$ eval "touch \"$filename\""  # 正しい方法: "my file.txt"という名前のファイルを作成する
```

### セキュリティに関する考慮事項

ユーザー入力や信頼できないデータで`eval`を使用する場合は、任意のコマンドを実行する可能性があるため、細心の注意を払ってください。`eval`に渡す前に、必ず入力を検証およびサニタイズしてください。

### evalコマンドのデバッグ

`eval`が実際に実行せずにどのようなコマンドを実行するかを確認するには、まず`echo`を使用します：

```console
$ cmd="ls -la /tmp"
$ echo "$cmd"  # 実行されるコマンドをプレビュー
ls -la /tmp
```

## よくある質問

#### Q1. いつ`eval`を使用すべきですか？
A. コマンド構造が変数に格納されている場合や実行時に生成される場合など、動的にコマンドを構築して実行する必要がある場合に`eval`を使用します。

#### Q2. `eval`の使用は危険ですか？
A. はい、`eval`は信頼できない入力と共に使用すると危険です。渡されたコマンドを何でも実行するためです。`eval`で使用する前に、常に入力を検証してください。

#### Q3. `eval`と単純にコマンドを実行することの違いは何ですか？
A. `eval`は実行前にシェル展開の追加ラウンドを実行し、変数内の変数を展開したり、複雑なコマンド構造を動的に構築したりすることができます。

#### Q4. ユーザー入力で`eval`を安全に使用するにはどうすればよいですか？
A. 一般的に、ユーザー入力で`eval`を使用することは避けるのが最善です。必要な場合は、入力を厳密に検証およびサニタイズし、事前に定義された安全な操作のセットに制限してください。

## 参考文献

https://pubs.opengroup.org/onlinepubs/9699919799/utilities/eval.html

## 改訂履歴

- 2025/05/05 初版