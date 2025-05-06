# for コマンド

リスト内の各項目に対してコマンドを実行します。

## 概要

`for` コマンドは、値のリストを反復処理し、各項目に対してコマンドまたは一連のコマンドを実行できるシェル構文です。シェルスクリプトでのバッチ処理、自動化、繰り返しタスクによく使用されます。

## オプション

`for` コマンドはシェル組み込みコマンドであり、従来のコマンドラインオプションはありません。代わりに、特定の構文パターンに従います：

### 基本構文

```console
$ for 変数 in リスト; do コマンド; done
```

### C言語スタイルの構文（Bash）

```console
$ for ((初期化; 条件; 増分)); do コマンド; done
```

## 使用例

### 値のリストを反復処理する

```console
$ for name in Alice Bob Charlie; do
>   echo "Hello, $name!"
> done
Hello, Alice!
Hello, Bob!
Hello, Charlie!
```

### ディレクトリ内のファイルを処理する

```console
$ for file in *.txt; do
>   echo "Processing $file..."
>   wc -l "$file"
> done
Processing document.txt...
      45 document.txt
Processing notes.txt...
      12 notes.txt
```

### C言語スタイルのループを使用する（Bash）

```console
$ for ((i=1; i<=5; i++)); do
>   echo "Number: $i"
> done
Number: 1
Number: 2
Number: 3
Number: 4
Number: 5
```

### コマンド置換を使用する

```console
$ for user in $(cat users.txt); do
>   echo "Creating home directory for $user"
>   mkdir -p /home/$user
> done
Creating home directory for john
Creating home directory for sarah
Creating home directory for mike
```

## ヒント:

### 適切な引用符の使用

ループ内の変数は常に引用符で囲み、スペースや特殊文字を含むファイル名を適切に処理します：

```console
$ for file in *.txt; do
>   cp "$file" "/backup/$(date +%Y%m%d)_$file"
> done
```

### break と continue

`break` を使用してループを早期に終了し、`continue` を使用して次の反復にスキップします：

```console
$ for i in {1..10}; do
>   if [ $i -eq 5 ]; then continue; fi
>   if [ $i -eq 8 ]; then break; fi
>   echo $i
> done
1
2
3
4
6
7
```

### シーケンス生成

数値シーケンスには波括弧展開を使用します：

```console
$ for i in {1..5}; do echo $i; done
1
2
3
4
5
```

## よくある質問

#### Q1. `for` ループと `while` ループの違いは何ですか？
A. `for` ループは事前定義されたアイテムのリストを反復処理しますが、`while` ループは条件が真である限り継続します。

#### Q2. 数値範囲をループするにはどうすればよいですか？
A. 波括弧展開を使用します：`for i in {1..10}; do echo $i; done` または C言語スタイルの構文：`for ((i=1; i<=10; i++)); do echo $i; done`。

#### Q3. ファイル内の行をループするにはどうすればよいですか？
A. `read` を使った `while` ループを使用します：`while read line; do echo "$line"; done < file.txt` または、コマンド置換を使った `for` ループ：`for line in $(cat file.txt); do echo "$line"; done`（後者は空白を保持しないことに注意）。

#### Q4. 配列要素を反復処理するにはどうすればよいですか？
A. `for element in "${array[@]}"; do echo "$element"; done` を使用します。

## 参考文献

https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html

## 改訂履歴

- 2025/05/05 初版