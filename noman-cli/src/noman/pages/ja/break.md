# break コマンド

シェルスクリプト内の for、while、until、または select ループから抜け出すためのコマンドです。

## 概要

`break` コマンドはシェルスクリプト内で、ループが通常の完了を迎える前に抜け出すために使用されます。実行されると、最も内側のループをすぐに終了し、終了したループの次のコマンドから実行を継続します。オプションの数値引数を使用すると、複数のネストされたループから抜け出すことができます。

## オプション

### **n** (数値引数)

n番目の囲まれたループから抜け出します。nが省略された場合、最も内側のループからのみ抜け出します。

```console
$ break 2  # 2レベルのネストされたループから抜け出す
```

## 使用例

### 単純なループからの脱出

```console
$ for i in 1 2 3 4 5; do
>   echo "Processing $i"
>   if [ $i -eq 3 ]; then
>     echo "Found 3, breaking out of loop"
>     break
>   fi
> done
> echo "Loop completed"
Processing 1
Processing 2
Processing 3
Found 3, breaking out of loop
Loop completed
```

### ネストされたループからの脱出

```console
$ for i in 1 2 3; do
>   echo "Outer loop: $i"
>   for j in a b c; do
>     echo "  Inner loop: $j"
>     if [ $j = "b" ] && [ $i -eq 2 ]; then
>       echo "  Breaking from inner loop"
>       break
>     fi
>   done
> done
Outer loop: 1
  Inner loop: a
  Inner loop: b
  Inner loop: c
Outer loop: 2
  Inner loop: a
  Inner loop: b
  Breaking from inner loop
Outer loop: 3
  Inner loop: a
  Inner loop: b
  Inner loop: c
```

### 数値引数を使用した複数レベルからの脱出

```console
$ for i in 1 2 3; do
>   echo "Outer loop: $i"
>   for j in a b c; do
>     echo "  Inner loop: $j"
>     if [ $j = "b" ] && [ $i -eq 2 ]; then
>       echo "  Breaking from both loops"
>       break 2
>     fi
>   done
> done
> echo "All loops completed"
Outer loop: 1
  Inner loop: a
  Inner loop: b
  Inner loop: c
Outer loop: 2
  Inner loop: a
  Inner loop: b
  Breaking from both loops
All loops completed
```

## ヒント:

### breakは控えめに使用する
`break`の過度な使用はコードの読みやすさとメンテナンス性を低下させる可能性があります。可能な場合はループロジックの再構築を検討しましょう。

### 条件文と組み合わせる
`break`は特定の条件に基づいてループを終了するために、`if`文と組み合わせると最も効果的です。

### breakとcontinueの違いを覚えておく
`break`はループ全体を終了しますが、`continue`は現在の反復の残りをスキップして次の反復に移ります。

### ネストされたループには数値引数を使用する
ネストされたループを扱う場合、複数の`break`文を使用する代わりに`break n`を使用して一度に複数のレベルを終了しましょう。

## よくある質問

#### Q1. `break`と`exit`の違いは何ですか？
A. `break`は現在のループからのみ抜け出しますが、`exit`はスクリプト全体を終了します。

#### Q2. ループの外で`break`を使用できますか？
A. いいえ、ループの外で`break`を使用すると「break: only meaningful in a 'for', 'while', or 'until' loop」（breakは'for'、'while'、または'until'ループ内でのみ意味があります）のようなエラーメッセージが表示されます。

#### Q3. 複数のネストされたループから抜け出すにはどうすればよいですか？
A. `break n`を使用します。nは抜け出したいネストされたループの数です。

#### Q4. `break`はすべてのシェルタイプで動作しますか？
A. はい、`break`はBash、Zsh、KshなどのすべてのPOSIX準拠シェルの標準機能です。

## 参考文献

https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html

## 改訂履歴

- 2025/05/06 初版