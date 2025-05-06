# catコマンド

ファイルの内容を連結して標準出力に表示します。

## 概要

`cat`コマンドはファイルを読み込み、その内容を出力します。主にファイルの内容を表示したり、複数のファイルを結合したり、新しいファイルを作成したりするために使用されます。「cat」という名前は「concatenate（連結する）」に由来しており、ファイルを結合する能力を反映しています。

## オプション

### **-n, --number**

すべての出力行に1から始まる行番号を付けます。

```console
$ cat -n file.txt
     1  This is the first line
     2  This is the second line
     3  This is the third line
```

### **-b, --number-nonblank**

空でない出力行にのみ1から始まる行番号を付けます。

```console
$ cat -b file.txt
     1  This is the first line
     
     2  This is the third line
```

### **-s, --squeeze-blank**

連続する空の出力行を抑制し、複数の連続する空行の代わりに1つの空行のみを表示します。

```console
$ cat -s file_with_blanks.txt
This is text.

This has only one blank line between paragraphs instead of multiple.
```

### **-A, --show-all**

すべての制御文字と非表示文字を表示します。

```console
$ cat -A file.txt
This is a line with a tab^I and a newline$
```

### **-E, --show-ends**

各行の末尾に$を表示します。

```console
$ cat -E file.txt
This is line one.$
This is line two.$
```

### **-T, --show-tabs**

TAB文字を^Iとして表示します。

```console
$ cat -T file.txt
This is a^Itabbed line
```

## 使用例

### ファイルの内容を表示する

```console
$ cat document.txt
This is the content of document.txt
It has multiple lines
that will be displayed.
```

### 複数のファイルを連結する

```console
$ cat file1.txt file2.txt
Contents of file1.txt
Contents of file2.txt
```

### 新しいファイルを内容と共に作成する

```console
$ cat > newfile.txt
Type your content here
Press Ctrl+D when finished
$ cat newfile.txt
Type your content here
Press Ctrl+D when finished
```

### 既存のファイルに追加する

```console
$ cat >> existing.txt
This text will be added to the end of the file
Press Ctrl+D when finished
```

## ヒント:

### 大きなファイルではcatを慎重に使用する

非常に大きなファイルの場合は、ターミナルに大量の出力が表示されるのを避けるため、`cat`の代わりに`less`や`more`などのツールを使用しましょう。

### catとgrepを組み合わせて検索する

`cat`の出力を`grep`にパイプして特定のパターンを検索できます：`cat file.txt | grep "search term"`

### ヒアドキュメントでファイルを素早く作成する

複数行のファイルを作成するにはヒアドキュメントを使用します：
```console
$ cat > script.sh << 'EOF'
#!/bin/bash
echo "Hello World"
EOF
```

### 非表示文字を表示する

奇妙なフォーマットのファイルをトラブルシューティングする場合は、`cat -A`を使用してすべての制御文字を確認できます。

## よくある質問

#### Q1. 「cat」は何の略ですか？
A. 「cat」は「concatenate（連結する）」の略で、一連のものを連結することを意味します。

#### Q2. ファイルを変更せずに表示するにはどうすればよいですか？
A. リダイレクト演算子なしで単に`cat filename`を使用します。

#### Q3. catでファイルを作成するにはどうすればよいですか？
A. `cat > filename`を使用し、内容を入力して、終了したらCtrl+Dを押します。

#### Q4. ファイルを上書きせずに追加するにはどうすればよいですか？
A. `cat >> filename`を使用して、既存のファイルの末尾に内容を追加します。

#### Q5. catが時々奇妙な文字を表示するのはなぜですか？
A. バイナリファイルやテキスト以外の内容を含むファイルを表示すると、`cat`は表示できない文字を表示します。制御文字を確認するには`cat -A`を使用するか、バイナリファイル用の専用ツールを使用してください。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/cat-invocation.html

## 改訂履歴

- 2025/05/05 初版