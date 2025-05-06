# while コマンド

条件が真である限り、コマンドを繰り返し実行します。

## 概要

`while` コマンドはシェルの構文で、指定された条件が真と評価される限り、一連のコマンドを繰り返し実行するループを作成します。固定回数の繰り返し、入力を1行ずつ処理する、または特定の条件が変わるまでコマンドを実行するなどの用途によく使われます。

## オプション

`while` コマンドは独立したプログラムではなくシェル組み込みの構文であるため、従来のコマンドラインオプションはありません。

## 使用例

### 基本的な while ループ

```console
$ i=1
$ while [ $i -le 5 ]; do
>   echo "Count: $i"
>   i=$((i+1))
> done
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
```

### ファイルを1行ずつ読み込む

```console
$ while read line; do
>   echo "Line: $line"
> done < file.txt
Line: This is the first line
Line: This is the second line
Line: This is the third line
```

### break 条件付きの無限ループ

```console
$ while true; do
>   echo "Enter a number (0 to exit):"
>   read num
>   if [ "$num" -eq 0 ]; then
>     break
>   fi
>   echo "You entered: $num"
> done
Enter a number (0 to exit):
5
You entered: 5
Enter a number (0 to exit):
0
```

### コマンド出力の処理

```console
$ ls -1 *.txt | while read file; do
>   echo "Processing $file"
>   wc -l "$file"
> done
Processing document.txt
      10 document.txt
Processing notes.txt
       5 notes.txt
```

## ヒント:

### Control-C で無限ループを終了する

無限ループ（`while true; do...`など）を作成し、終了する必要がある場合は、Control-C を押してループを終了します。

### ポーリングのために sleep と組み合わせる

`while` を `sleep` コマンドと一緒に使用して、定期的に条件をチェックします：

```console
$ while ! ping -c 1 server.example.com &>/dev/null; do
>   echo "Server not reachable, waiting..."
>   sleep 5
> done
```

### 一般的な落とし穴を避ける

決して偽にならない可能性のある条件には注意してください。無限ループが発生する可能性があります。常に条件が最終的に偽と評価される方法があることを確認してください。

### continue を使用して反復をスキップする

`continue` ステートメントは `while` ループ内で使用して、現在の反復の残りをスキップし、次の反復に移動することができます。

## よくある質問

#### Q1. `while` と `until` の違いは何ですか？
A. `while` は条件が真である限りコマンドを実行しますが、`until` は条件が偽である限りコマンドを実行します。

#### Q2. `while` を使って標準入力から読み込むことはできますか？
A. はい、リダイレクションなしで `while read line; do ...; done` を使用すると、標準入力から読み込みます。

#### Q3. `while` でカウントダウンタイマーを作るにはどうすればよいですか？
A. 減少するカウンターを使用します：`count=10; while [ $count -gt 0 ]; do echo $count; count=$((count-1)); sleep 1; done; echo "Done!"`

#### Q4. 各反復で複数の値を処理するにはどうすればよいですか？
A. read コマンドで複数の変数を使用します：`while read name age; do echo "$name is $age years old"; done < data.txt`

## 参考文献

https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html

## 改訂履歴

- 2025/05/05 初版