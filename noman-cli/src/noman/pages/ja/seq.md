# seqコマンド

数値の連続を出力します。

## 概要

`seq`コマンドは、開始点から終了点までの数値の連続を生成します。オプションで増分を指定することもできます。シェルスクリプトでループの作成、テストデータの生成、番号付きリストの作成などによく使用されます。

## オプション

### **-f, --format=FORMAT**

printf形式の浮動小数点FORMATを使用します

```console
$ seq -f "Number: %.2f" 1 3
Number: 1.00
Number: 2.00
Number: 3.00
```

### **-s, --separator=STRING**

数値の区切りにSTRINGを使用します（デフォルトは改行）

```console
$ seq -s ", " 1 5
1, 2, 3, 4, 5
```

### **-w, --equal-width**

先頭にゼロを埋めて幅を均等にします

```console
$ seq -w 8 12
08
09
10
11
12
```

### **-t, --format-separator=SEPARATOR**

出力の区切り文字としてSEPARATORを使用します（デフォルト: \n）

```console
$ seq -t "," 1 3
1,2,3,
```

## 使用例

### 基本的な連続生成

```console
$ seq 5
1
2
3
4
5
```

### 開始、増分、終了の指定

```console
$ seq 2 2 10
2
4
6
8
10
```

### カンマ区切りリストの作成

```console
$ seq -s, 1 5
1,2,3,4,5
```

### forループでのseqの使用

```console
$ for i in $(seq 1 3); do echo "Processing item $i"; done
Processing item 1
Processing item 2
Processing item 3
```

## ヒント:

### カウントダウンにseqを使用する

降順の連続を生成するには、負の増分を指定します:

```console
$ seq 5 -1 1
5
4
3
2
1
```

### 並列処理のためにxargsと組み合わせる

seqとxargsを使用して複数の並列プロセスを実行します:

```console
$ seq 1 10 | xargs -P4 -I{} echo "Processing job {}"
```

### フォーマットされた連続を作成する

より複雑なフォーマットには、printfと組み合わせます:

```console
$ seq 1 3 | xargs -I{} printf "Item %03d\n" {}
Item 001
Item 002
Item 003
```

## よくある質問

#### Q1. 小数点を含む連続を生成するにはどうすればよいですか？
A. `-f`オプションを浮動小数点フォーマットで使用します: `seq -f "%.1f" 1 0.5 3`は1.0、1.5、2.0、2.5、3.0を生成します。

#### Q2. 先頭にゼロを付けた連続を作成するにはどうすればよいですか？
A. `-w`オプションを使用します: `seq -w 1 10`は数値に先頭ゼロを埋めて等幅にします。

#### Q3. IPアドレスの範囲を作成するためにseqを使用するにはどうすればよいですか？
A. seqを他のコマンドと組み合わせることができます: `for i in $(seq 1 5); do echo "192.168.1.$i"; done`

#### Q4. seqは大きな数値を扱えますか？
A. はい、seqはシステムの数値制限内で大きな整数を扱うことができます。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/seq-invocation.html

## 改訂履歴

- 2025/05/05 初版