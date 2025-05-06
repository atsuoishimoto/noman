# diffコマンド

ファイルを行ごとに比較します。

## 概要

`diff`コマンドは2つのファイルやディレクトリを比較し、その違いを表示します。ファイルのバージョン間の変更を特定したり、パッチを作成したり、ファイルで何が変更されたかを確認したりするのによく使用されます。

## オプション

### **-u, --unified**

統合フォーマットで差分を出力し、変更箇所の周囲のコンテキストを表示します。

```console
$ diff -u file1.txt file2.txt
--- file1.txt	2025-05-05 10:00:00.000000000 -0400
+++ file2.txt	2025-05-05 10:30:00.000000000 -0400
@@ -1,3 +1,4 @@
 This is a test file.
-It has some content.
+It has some modified content.
 The end of the file.
+A new line added.
```

### **-b, --ignore-space-change**

空白の量の変更を無視します。

```console
$ diff -b file1.txt file2.txt
2c2
< It has some content.
---
> It has some   modified content.
```

### **-i, --ignore-case**

ファイル内容の大文字小文字の違いを無視します。

```console
$ diff -i uppercase.txt lowercase.txt
[大文字小文字のみが異なる場合は出力なし]
```

### **-r, --recursive**

見つかったサブディレクトリを再帰的に比較します。

```console
$ diff -r dir1 dir2
diff -r dir1/file.txt dir2/file.txt
2c2
< This is in dir1
---
> This is in dir2
Only in dir2: newfile.txt
```

### **-N, --new-file**

存在しないファイルを空のファイルとして扱います。

```console
$ diff -N file1.txt nonexistent.txt
1,3d0
< This is a test file.
< It has some content.
< The end of the file.
```

### **-c, --context**

コンテキストフォーマットで差分を出力し、3行のコンテキストを表示します。

```console
$ diff -c file1.txt file2.txt
*** file1.txt	2025-05-05 10:00:00.000000000 -0400
--- file2.txt	2025-05-05 10:30:00.000000000 -0400
***************
*** 1,3 ****
  This is a test file.
- It has some content.
  The end of the file.
--- 1,4 ----
  This is a test file.
+ It has some modified content.
  The end of the file.
+ A new line added.
```

## 使用例

### 2つのファイルの比較

```console
$ diff original.txt modified.txt
2c2
< This is the original line.
---
> This is the modified line.
4d3
< This line will be deleted.
```

### パッチファイルの作成

```console
$ diff -u original.txt modified.txt > changes.patch
$ cat changes.patch
--- original.txt	2025-05-05 10:00:00.000000000 -0400
+++ modified.txt	2025-05-05 10:30:00.000000000 -0400
@@ -1,4 +1,3 @@
 First line is unchanged.
-This is the original line.
+This is the modified line.
 Third line is unchanged.
-This line will be deleted.
```

### ディレクトリの比較

```console
$ diff -r dir1 dir2
Only in dir1: uniquefile1.txt
Only in dir2: uniquefile2.txt
diff -r dir1/common.txt dir2/common.txt
1c1
< This is in dir1
---
> This is in dir2
```

## ヒント:

### diff出力の理解

標準のdiff出力フォーマットは行番号とコマンドを使用します:
- `a` (add): 2番目のファイルに追加された行
- `d` (delete): 1番目のファイルから削除された行
- `c` (change): ファイル間で変更された行

### 読みやすさのためにカラー表示を使用する

多くのシステムでは `diff --color=auto` でカラー表示をサポートしており、変更箇所を見つけやすくなります。

### grepと組み合わせて特定の変更を見つける

`diff file1 file2 | grep pattern` を使用して、特定のテキストを含む差分のみを見つけることができます。

### 横並び比較

`diff -y` または `diff --side-by-side` を使用して、2列形式で差分を表示できます。これにより、一部の変更が読みやすくなります。

## よくある質問

#### Q1. diffの出力にある記号は何を意味していますか？
A. 標準出力では、`<` は最初のファイルからの行、`>` は2番目のファイルからの行を示し、`---` は変更されたセクションを区切ります。

#### Q2. パッチファイルを作成するにはどうすればよいですか？
A. `diff -u original.txt modified.txt > changes.patch` を使用して、統合フォーマットのパッチファイルを作成します。

#### Q3. 空白の違いを無視するにはどうすればよいですか？
A. `diff -b` を使用して空白の変更を無視するか、`diff -w` ですべての空白を無視します。

#### Q4. diffパッチを適用するにはどうすればよいですか？
A. `patch`コマンドを使用します: `patch original.txt < changes.patch`

## 参考文献

https://www.gnu.org/software/diffutils/manual/html_node/diff-Options.html

## 改訂履歴

- 2025/05/05 初版