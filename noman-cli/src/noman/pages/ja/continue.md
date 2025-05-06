# continue コマンド

一時停止したジョブをフォアグラウンドに戻して再開します。

## 概要

`continue` コマンドはシェル組み込みコマンドで、ループ（for、while、until）の実行を次の繰り返しの先頭から再開し、現在の繰り返しの残りのコマンドをスキップします。シェルスクリプト内で使用され、特定の条件が満たされた場合に即座に次の繰り返しを開始することでループの流れを制御します。

## オプション

`continue` コマンドは従来の意味でのオプションはありませんが、オプションの数値引数を受け付けることができます。

### **n**（数値引数）

どの囲まれたループを継続するかを指定します。デフォルト（引数なし）では、`continue` は最も内側のループに影響します。

```console
$ for i in 1 2 3; do
>   for j in a b c; do
>     if [ $j = "b" ]; then
>       continue 2  # 外側のループの次の繰り返しにスキップ
>     fi
>     echo "$i $j"
>   done
> done
1 a
2 a
3 a
```

## 使用例

### ループでの基本的な使い方

```console
$ for i in 1 2 3 4 5; do
>   if [ $i -eq 3 ]; then
>     continue
>   fi
>   echo "Processing item $i"
> done
Processing item 1
Processing item 2
Processing item 4
Processing item 5
```

### 条件に基づいた繰り返しのスキップ

```console
$ i=0
$ while [ $i -lt 5 ]; do
>   i=$((i+1))
>   if [ $((i % 2)) -eq 0 ]; then
>     continue
>   fi
>   echo "Odd number: $i"
> done
Odd number: 1
Odd number: 3
Odd number: 5
```

## ヒント:

### 複雑なループでは注意して使用する

ネストされたループで `continue` を使用する場合は、どのループに影響するかに注意してください。数値引数がない場合、最も内側のループにのみ影響します。

### 条件論理と組み合わせる

`continue` は条件文と組み合わせて特定の条件を満たす繰り返しをスキップするときに最も役立ち、スクリプトの効率を高めます。

### 読みやすさを考慮する

`continue` はスクリプトをより効率的にできますが、過度に使用するとコードの理解が難しくなる可能性があります。読みやすさを維持するために慎重に使用しましょう。

## よくある質問

#### Q1. `continue` と `break` の違いは何ですか？
A. `continue` はループの次の繰り返しにスキップしますが、`break` はループを完全に終了します。

#### Q2. ループの外で `continue` を使用できますか？
A. いいえ、ループの外で `continue` を使用するとエラーになります。これはループ内でのみ意味を持ちます。

#### Q3. ネストされたループで特定の外側のループを継続するにはどうすればよいですか？
A. `continue n` を使用します。ここで n は継続したいループのレベルです（最も内側のループは 1、その外側のレベルは 2、など）。

#### Q4. `continue` はすべてのシェルタイプで同じように機能しますか？
A. 基本的な機能は bash、zsh、その他の一般的なシェルで一貫していますが、複雑なスクリプトでは動作に微妙な違いがある場合があります。

## 参考文献

https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html

## 改訂履歴

- 2025/05/05 初版