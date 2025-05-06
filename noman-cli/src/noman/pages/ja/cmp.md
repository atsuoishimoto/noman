# cmp コマンド

2つのファイルをバイト単位で比較します。

## 概要

`cmp` コマンドは任意の種類の2つのファイルを比較し、最初の相違点の位置を報告します。テキストファイル間のすべての違いを表示する `diff` とは異なり、`cmp` は単にファイルが異なる最初のバイトまたは行を識別するだけなので、バイナリファイルの迅速な比較に役立ちます。

## オプション

### **-b, --print-bytes**

異なるバイトを8進数の値として表示します。

```console
$ cmp -b file1.txt file2.txt
file1.txt file2.txt differ: byte 5, line 1 is 141 a 142 b
```

### **-i, --ignore-initial=SKIP**

比較する前に両方の入力ファイルの最初のSKIPバイトをスキップします。

```console
$ cmp -i 10 file1.bin file2.bin
file1.bin file2.bin differ: byte 11, line 1
```

### **-l, --verbose**

各相違点についてバイト番号と異なるバイト値を表示します。

```console
$ cmp -l file1.txt file2.txt
5 141 142
8 144 145
12 150 151
```

### **-n, --bytes=LIMIT**

最大でLIMITバイトまで比較します。

```console
$ cmp -n 100 largefile1.bin largefile2.bin
largefile1.bin largefile2.bin differ: byte 64, line 1
```

### **-s, --quiet, --silent**

通常の出力をすべて抑制し、終了ステータスのみを返します。

```console
$ cmp -s file1.txt file2.txt
$ echo $?
1
```

## 使用例

### 基本的な比較

```console
$ cmp file1.txt file2.txt
file1.txt file2.txt differ: byte 5, line 1
```

### ファイルの特定部分の比較

```console
$ cmp -i 100 -n 1000 bigfile1.dat bigfile2.dat
bigfile1.dat bigfile2.dat differ: byte 340, line 3
```

### スクリプトでの無音比較

```console
$ if cmp -s file1.txt file2.txt; then
>   echo "Files are identical"
> else
>   echo "Files are different"
> fi
Files are different
```

## ヒント:

### スクリプトで終了ステータスを使用する

`cmp` コマンドは、ファイルが同一の場合は0、異なる場合は1、エラーが発生した場合は2を返します。これにより、シェルスクリプトの条件論理に最適です。

### 他のコマンドと組み合わせる

プロセス置換を使用してコマンドの出力を `cmp` にパイプし、コマンド出力を比較します：
```bash
cmp <(command1) <(command2)
```

### バイナリファイルの比較

`diff` はテキストファイルに適していますが、`cmp` はファイルが異なるかどうか、どこが異なるかを知る必要があるバイナリファイルの比較に優れています。

## よくある質問

#### Q1. `cmp` と `diff` の違いは何ですか？
A. `cmp` はファイル間の最初の違いのみを報告し、バイナリファイルでもうまく機能します。`diff` はすべての違いを表示し、主にテキストファイル用に設計されています。

#### Q2. 出力を表示せずに2つのファイルが同一かどうかを確認するにはどうすればよいですか？
A. `cmp -s file1 file2` を使用し、`echo $?` で終了ステータスを確認します。戻り値が0の場合、ファイルは同一です。

#### Q3. `cmp` はディレクトリを比較できますか？
A. いいえ、`cmp` はファイルのみを比較します。ディレクトリ比較には、代わりに `diff -r` を使用してください。

#### Q4. 大きなファイルを効率的に比較するにはどうすればよいですか？
A. ファイルが異なるかどうかを素早く確認するには `-s` オプション付きの `cmp` を使用するか、大きなファイルの特定部分を比較するには `-i` と `-n` を使用します。

## 参考文献

https://www.gnu.org/software/diffutils/manual/html_node/Invoking-cmp.html

## 改訂履歴

- 2025/05/05 初版