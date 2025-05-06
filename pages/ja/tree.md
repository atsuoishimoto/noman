# tree コマンド

ディレクトリの内容を階層的なツリー構造で表示します。

## 概要

`tree` コマンドは、ディレクトリの内容を再帰的にツリー状のフォーマットで一覧表示し、ファイルとディレクトリの関係を示します。ディレクトリ構造を視覚的に表現することで、ファイルやサブディレクトリの構成を理解しやすくします。

## オプション

### **-a**

隠しファイル（ドットで始まるファイル）を含むすべてのファイルを表示します

```console
$ tree -a
.
├── .git
│   ├── HEAD
│   ├── config
│   └── hooks
├── .gitignore
├── README.md
└── src
    ├── .env
    └── main.js

3 directories, 6 files
```

### **-d**

ファイルを除き、ディレクトリのみを一覧表示します

```console
$ tree -d
.
├── docs
├── node_modules
│   ├── express
│   └── lodash
└── src
    └── components

5 directories
```

### **-L, --level**

ディレクトリの再帰の深さを制限します

```console
$ tree -L 2
.
├── docs
│   ├── api.md
│   └── usage.md
├── node_modules
│   ├── express
│   └── lodash
├── package.json
└── src
    ├── components
    └── index.js

5 directories, 4 files
```

### **-C**

出力に色付けを追加します

```console
$ tree -C
# 出力はディレクトリ、ファイル、実行可能ファイルが異なる色で表示される
```

### **-p**

各ファイルのファイルタイプとパーミッションを表示します

```console
$ tree -p
.
├── [drwxr-xr-x]  docs
│   ├── [-rw-r--r--]  api.md
│   └── [-rw-r--r--]  usage.md
├── [-rw-r--r--]  package.json
└── [drwxr-xr-x]  src
    └── [-rwxr-xr-x]  index.js

2 directories, 4 files
```

### **-s**

各ファイルのサイズを表示します

```console
$ tree -s
.
├── [       4096]  docs
│   ├── [        450]  api.md
│   └── [        890]  usage.md
├── [        1240]  package.json
└── [       4096]  src
    └── [         320]  index.js

2 directories, 4 files
```

### **-h**

サイズをより読みやすい形式で表示します

```console
$ tree -sh
.
├── [4.0K]  docs
│   ├── [450]   api.md
│   └── [890]   usage.md
├── [1.2K]  package.json
└── [4.0K]  src
    └── [320]   index.js

2 directories, 4 files
```

### **--filelimit n**

n個以上のエントリを含むディレクトリの内容を表示しません

```console
$ tree --filelimit 10
# 10個以上のファイルを持つディレクトリの内容は表示されない
```

## 使用例

### 基本的なディレクトリ一覧

```console
$ tree
.
├── docs
│   ├── api.md
│   └── usage.md
├── package.json
└── src
    ├── components
    │   ├── Button.js
    │   └── Input.js
    └── index.js

3 directories, 5 files
```

### 深さを制限してファイルサイズを表示

```console
$ tree -L 1 -sh
.
├── [4.0K]  docs
├── [1.2K]  package.json
└── [4.0K]  src

2 directories, 1 file
```

### パターンによるフィルタリング

```console
$ tree -P "*.js"
.
├── docs
├── package.json
└── src
    ├── components
    │   ├── Button.js
    │   └── Input.js
    └── index.js

3 directories, 3 files
```

### ファイルへの出力

```console
$ tree > directory_structure.txt
$ cat directory_structure.txt
.
├── docs
│   ├── api.md
│   └── usage.md
├── package.json
└── src
    ├── components
    │   ├── Button.js
    │   └── Input.js
    └── index.js

3 directories, 5 files
```

## ヒント

### バージョン管理ディレクトリを除外する

`tree -I "node_modules|.git"` を使用して、node_modulesや.gitなどの特定のディレクトリを出力から除外すると、プロジェクトディレクトリのツリーがより読みやすくなります。

### ドキュメント用のASCII出力を作成する

`tree -A` を使用すると、グラフィック文字の代わりにASCII文字が使用されます。これは、文字サポートが限られた環境で表示する必要があるドキュメントを作成する際に便利です。

### ファイルとディレクトリをカウントする

`tree --noreport` を使用すると、最後のファイル/ディレクトリレポートが抑制され、要約なしでツリー構造だけを表示できます。

### 出力形式をカスタマイズする

`-pugh` のようなオプションを組み合わせると、パーミッション、ユーザー名、グループ名、人間が読みやすいサイズをすべて一度に表示して、包括的なディレクトリリストを作成できます。

## よくある質問

#### Q1. macOSにtreeをインストールするにはどうすればよいですか？
A. Homebrewを使用して `brew install tree` コマンドでインストールできます。

#### Q2. 特定のディレクトリを出力から除外するにはどうすればよいですか？
A. `-I` オプションの後にパターンを指定します。例えば、`tree -I "node_modules|.git"` でnode_modulesと.gitディレクトリを除外できます。

#### Q3. 表示されるディレクトリの深さを制限するにはどうすればよいですか？
A. `-L` オプションの後に数字を指定します。例えば、`tree -L 2` で2レベルのディレクトリのみを表示します。

#### Q4. treeの出力をターミナルではなくファイルに保存できますか？
A. はい、リダイレクトを使用します：`tree > output.txt` で出力をファイルに保存できます。

#### Q5. 隠しファイルを表示するにはどうすればよいですか？
A. `-a` オプションを使用します：`tree -a` で隠しファイルを含むすべてのファイルを表示します。

## 参考文献

https://linux.die.net/man/1/tree

## 改訂履歴

- 2025/05/05 初版