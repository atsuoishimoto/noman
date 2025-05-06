# diff3 コマンド

3つのファイルを行ごとに比較します。

## 概要

`diff3` は3つのファイルを比較し、それらの間の違いを識別します。特に、共通の祖先から派生した2つの異なるバージョンのファイルからの変更をマージするのに役立ち、バージョン管理や共同編集において価値があります。

## オプション

### **-A, --show-all**

特殊なマーカーを使用して、競合を含むすべての変更を出力します。

```console
$ diff3 -A file1 file2 file3
<<<<<<< file1
Line from file1
||||||| file2
Line from file2
======= 
Line from file3
>>>>>>> file3
```

### **-e, --ed**

最初のファイルから3番目のファイルへの変更を2番目のファイルに組み込むedスクリプトを作成します。

```console
$ diff3 -e file1 file2 file3
w
q
```

### **-m, --merge**

競合がマークされたマージファイルを出力します。

```console
$ diff3 -m file1 file2 file3
<<<<<<< file1
Line from file1
||||||| file2
Line from file2
=======
Line from file3
>>>>>>> file3
```

### **-T, --initial-tab**

出力行の先頭にタブを付けることで、タブを揃えます。

```console
$ diff3 -T file1 file2 file3
	<<<<<<< file1
	Line from file1
	||||||| file2
	Line from file2
	=======
	Line from file3
	>>>>>>> file3
```

### **-x, --overlap-only**

重複する変更のみを表示します。

```console
$ diff3 -x file1 file2 file3
==== 1:1c 2:1c 3:1c
Line from file1
Line from file2
Line from file3
```

## 使用例

### 基本的な比較

```console
$ diff3 original.txt yours.txt theirs.txt
====
1:1c
This is the original line.
2:1c
This is your modified line.
3:1c
This is their modified line.
```

### マージファイルの作成

```console
$ diff3 -m original.txt yours.txt theirs.txt > merged.txt
$ cat merged.txt
<<<<<<< yours.txt
This is your modified line.
||||||| original.txt
This is the original line.
=======
This is their modified line.
>>>>>>> theirs.txt
```

### マージ用のEdスクリプトの作成

```console
$ diff3 -e original.txt yours.txt theirs.txt > merge.ed
$ ed - yours.txt < merge.ed > merged.txt
```

## ヒント:

### 出力フォーマットの理解

デフォルトの出力では、各変更は `====` の後に行番号と変更タイプでマークされます。例えば、`1:1c 2:1c 3:1c` は3つのファイルすべての1行目が変更されていることを意味します。

### バージョン管理でのdiff3の使用

異なるブランチからの変更をマージする場合、最初の引数として元のファイル、2番目に自分の修正バージョン、3番目に相手の修正バージョンを使用します。

### マージ競合の解決

`-m` オプションを使用する場合、出力ファイル内の競合マーカー（`<<<<<<<`、`|||||||`、`=======`、`>>>>>>>`）を探し、手動で編集して競合を解決します。

## よくある質問

#### Q1. diffとdiff3の違いは何ですか？
A. `diff` は2つのファイルを比較しますが、`diff3` は3つのファイルを比較します。これにより、共通の祖先から派生した2つの異なるバージョンからの変更をマージするのに役立ちます。

#### Q2. diff3の出力をどのように解釈すればよいですか？
A. 出力はファイルが異なる部分を示し、各ファイルからの行番号と内容を表示します。フォーマットは使用するオプションによって異なります。

#### Q3. diff3は自動的に競合を解決できますか？
A. いいえ、diff3は競合を識別できますが、自動的に解決することはできません。出力に競合をマークし、手動で解決する必要があります。

#### Q4. マージ出力をファイルに保存するにはどうすればよいですか？
A. リダイレクションを使用します：`diff3 -m file1 file2 file3 > merged_file`

## 参考文献

https://www.gnu.org/software/diffutils/manual/html_node/Invoking-diff3.html

## 改訂履歴

- 2025/05/05 初版