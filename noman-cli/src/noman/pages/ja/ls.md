# ls コマンド

ディレクトリの内容を一覧表示します。

## 概要

`ls` コマンドは、指定した場所のファイルとディレクトリを表示します。デフォルトでは、現在の作業ディレクトリの内容をアルファベット順に表示し、隠しファイル（ドットで始まるファイル）は除外します。これはファイルシステムを操作・探索する際に最も頻繁に使用されるコマンドの一つです。

## オプション

### **-l**

詳細情報を長いリスト形式で表示し、ファイルのパーミッション、リンク数、所有者、グループ、サイズ、更新時刻を表示します。

```console
$ ls -l
total 16
-rw-r--r--  1 user  staff  1024 Apr 10 15:30 document.txt
drwxr-xr-x  3 user  staff   96  Apr 9  14:22 projects
```

### **-a, --all**

隠しファイル（ドットで始まるファイル）を含むすべてのファイルを表示します。

```console
$ ls -a
.  ..  .hidden  document.txt  projects
```

### **-d, --directory**

ディレクトリ自体をリスト表示し、その内容は表示しません。

```console
$ ls -d */
projects/  documents/  downloads/
```

### **-s, --size**

各ファイルに割り当てられたブロックサイズを表示します。

```console
$ ls -s
total 16
8 document.txt  8 projects
```

### **-t**

更新時刻順にソートし、最新のものを先に表示します。

```console
$ ls -lt
total 16
-rw-r--r--  1 user  staff  1024 Apr 10 15:30 document.txt
drwxr-xr-x  3 user  staff   96  Apr 9  14:22 projects
```

### **-r, --reverse**

ソート順を逆にします。

```console
$ ls -ltr
total 16
drwxr-xr-x  3 user  staff   96  Apr 9  14:22 projects
-rw-r--r--  1 user  staff  1024 Apr 10 15:30 document.txt
```

## 使用例

### 人間が読みやすいサイズでファイルを一覧表示

```console
$ ls -lh
total 16K
-rw-r--r--  1 user  staff  1.0K Apr 10 15:30 document.txt
drwxr-xr-x  3 user  staff   96B Apr 9  14:22 projects
```

### ディレクトリのみを一覧表示

```console
$ ls -ld */
drwxr-xr-x 3 user staff 96 Apr 9 14:22 projects/
drwxr-xr-x 5 user staff 160 Apr 8 10:15 documents/
```

### ファイルタイプ別に一覧表示

```console
$ ls -F
document.txt  projects/  script.sh*
```

### ディレクトリを再帰的に一覧表示

```console
$ ls -R
.:
document.txt  projects

./projects:
README.md  src

./projects/src:
main.c  utils.h
```

## ヒント:

### オプションを組み合わせて強力な一覧表示を実現

`ls -lha` のようにオプションを組み合わせることで、詳細情報と人間が読みやすいサイズで隠しファイルを含むすべてのファイルを表示できます。

### 色分けで視認性を向上

多くのシステムでは `ls` が `ls --color=auto` としてエイリアス設定されており、ファイルタイプごとに色分けされます。設定されていない場合は、シェル設定に追加できます。

### サイズでファイルをソート

`ls -lS` を使用してファイルをサイズ順（大きいものから）にソートすると、容量を多く消費しているファイルを特定するのに役立ちます。

### 出力形式をカスタマイズ

`ls -l --time-style=long-iso` を使用すると、より標準化されたタイムスタンプ形式（YYYY-MM-DD HH:MM）で表示できます。

## よくある質問

#### Q1. ディレクトリのみを一覧表示するにはどうすればよいですか？
A. 現在の場所のディレクトリのみを一覧表示するには `ls -d */` を使用します。

#### Q2. ファイルサイズをKB、MB等で表示するにはどうすればよいですか？
A. 人間が読みやすいサイズで表示するには `ls -lh` を使用します。

#### Q3. ファイルを更新時刻順にソートするにはどうすればよいですか？
A. 更新時刻順（最新のものから）にソートするには `ls -lt` を使用します。

#### Q4. ファイルを再帰的に一覧表示するにはどうすればよいですか？
A. すべてのファイルとサブディレクトリを再帰的に一覧表示するには `ls -R` を使用します。

#### Q5. 隠しファイルを表示するにはどうすればよいですか？
A. 隠しファイルを含むすべてのファイルを表示するには `ls -a` を使用します。

## 参考資料

https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html

## 改訂履歴

- 2025/05/05 初版