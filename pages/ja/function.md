# function コマンド

シェル関数を後で実行するために定義します。

## 概要

`function` コマンドは、通常のコマンドのように呼び出せるシェル関数を作成します。関数は一連のコマンドを単一の名前付きユニットにカプセル化するのに役立ち、シェルスクリプトでのコードの再利用と整理を可能にします。関数は引数を受け取り、終了ステータスコードを返すことができます。

## オプション

`function` コマンド自体には従来のコマンドラインオプションはありません。代わりに、関数を定義するための特定の構文を使用します。

## 使用例

### 基本的な関数定義

```console
$ function hello() {
>   echo "Hello, World!"
> }
$ hello
Hello, World!
```

### 引数を持つ関数

```console
$ function greet() {
>   echo "Hello, $1!"
> }
$ greet Alice
Hello, Alice!
```

### 戻り値を持つ関数

```console
$ function is_even() {
>   if (( $1 % 2 == 0 )); then
>     return 0  # 成功（シェルではtrue）
>   else
>     return 1  # 失敗（シェルではfalse）
>   fi
> }
$ is_even 4 && echo "Even" || echo "Odd"
Even
$ is_even 5 && echo "Even" || echo "Odd"
Odd
```

### 代替構文

```console
$ hello() {
>   echo "Hello, World!"
> }
$ hello
Hello, World!
```

### ローカル変数を持つ関数

```console
$ function calculate() {
>   local result=$(( $1 + $2 ))
>   echo "The sum of $1 and $2 is $result"
> }
$ calculate 5 7
The sum of 5 and 7 is 12
```

## ヒント:

### ローカル変数を使用する

関数内の変数には常に `local` を使用して、グローバルなシェル環境に影響を与えないようにしましょう：

```console
$ function bad_example() {
>   x=10  # グローバル変数
> }
$ function good_example() {
>   local x=10  # ローカル変数
> }
```

### 戻り値

関数は数値の終了コード（0-255）のみを返すことができます。文字列や複雑なデータを出力するには `echo` などのコマンドを使用します：

```console
$ function get_sum() {
>   echo $(( $1 + $2 ))
> }
$ result=$(get_sum 5 7)
$ echo $result
12
```

### 関数の可視性

関数は現在のシェルセッションでのみ利用可能です。サブシェルで利用できるようにするには、エクスポートします：

```console
$ function hello() { echo "Hello!"; }
$ export -f hello
```

## よくある質問

#### Q1. `function name() {}` と `name() {}` の違いは何ですか？
A. どちらの構文もbashでは機能しますが、`name() {}` はさまざまなシェル間でより移植性があります。`function` キーワードはbashとkshに特有のものです。

#### Q2. 関数の引数にアクセスするにはどうすればよいですか？
A. 位置パラメータを使用します：個々の引数には `$1`、`$2` など、すべての引数には `$@`、引数の数には `$#` を使用します。

#### Q3. 関数を解除するにはどうすればよいですか？
A. `unset -f 関数名` コマンドを使用して関数定義を削除します。

#### Q4. 他の関数内に関数を定義できますか？
A. はい、bashはネストされた関数定義をサポートしていますが、それらは親関数のスコープ内でのみ可視です。

#### Q5. 定義されたすべての関数を確認するにはどうすればよいですか？
A. `declare -f` コマンドを使用してすべての関数定義を一覧表示するか、`declare -F` を使用して関数名のみを表示します。

## 参考文献

https://www.gnu.org/software/bash/manual/html_node/Shell-Functions.html

## 改訂履歴

- 2025/05/06 初版