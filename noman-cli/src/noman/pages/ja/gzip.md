# gzipコマンド

gzipアルゴリズムを使用してファイルを圧縮または展開します。

## 概要

`gzip`はファイルを圧縮してサイズを縮小し、`.gz`拡張子のファイルを作成します。デフォルトでは、元のファイルを圧縮版に置き換えます。このコマンドは、以前にgzipで圧縮されたファイルを解凍することもできます。

## オプション

### **-c, --stdout, --to-stdout**

出力を標準出力に書き込み、元のファイルを変更せずに保持します。

```console
$ gzip -c file.txt > file.txt.gz
```

### **-d, --decompress, --uncompress**

圧縮されたファイルを解凍します。

```console
$ gzip -d file.txt.gz
```

### **-f, --force**

ファイルに複数のリンクがある場合や、対応するファイルがすでに存在する場合でも、強制的に圧縮または解凍します。

```console
$ gzip -f already_exists.txt
```

### **-k, --keep**

圧縮または解凍中に入力ファイルを保持（削除しない）します。

```console
$ gzip -k important_file.txt
```

### **-l, --list**

各圧縮ファイルの圧縮サイズ、非圧縮サイズ、圧縮率、ファイル名を一覧表示します。

```console
$ gzip -l *.gz
         compressed        uncompressed  ratio uncompressed_name
                 220                 631  65.1% file1.txt
                 143                 341  58.1% file2.txt
```

### **-r, --recursive**

ディレクトリ内のファイルを再帰的に圧縮します。

```console
$ gzip -r directory/
```

### **-v, --verbose**

圧縮または解凍された各ファイルの名前と削減率を表示します。

```console
$ gzip -v file.txt
file.txt:       63.4% -- replaced with file.txt.gz
```

### **-[1-9], --fast, --best**

指定された数字を使用して圧縮速度を調整します。-1（または--fast）は最速の圧縮方法（圧縮率は低い）を示し、-9（または--best）は最も遅い圧縮方法（最適な圧縮）を示します。デフォルトの圧縮レベルは-6です。

```console
$ gzip -9 file.txt
```

## 使用例

### 基本的な圧縮

```console
$ gzip large_file.txt
$ ls
large_file.txt.gz
```

### 複数ファイルの圧縮

```console
$ gzip file1.txt file2.txt file3.txt
$ ls
file1.txt.gz file2.txt.gz file3.txt.gz
```

### ファイルの解凍

```console
$ gzip -d archive.gz
$ ls
archive
```

### 解凍せずに圧縮ファイルを表示

```console
$ zcat compressed_file.gz
[解凍せずにファイルの内容が表示される]
```

### 元のファイルを保持しながら圧縮

```console
$ gzip -k important_document.txt
$ ls
important_document.txt important_document.txt.gz
```

## ヒント:

### 圧縮ファイル用にzcat、zless、zgrepを使用する

ファイルを解凍して内容を表示または検索する代わりに、`zcat`、`zless`、または`zgrep`を使用して圧縮ファイルを直接操作できます。

```console
$ zgrep "search term" file.gz
```

### ディレクトリ圧縮にはtarと組み合わせる

ディレクトリ全体を圧縮するには、`tar`と組み合わせます：

```console
$ tar -czf archive.tar.gz directory/
```

### gzip -dの代わりにgunzipを使用する

`gunzip`コマンドは解凍のための`gzip -d`と同等です：

```console
$ gunzip file.gz
```

### 元のファイルを保存する

元のファイルを保持したい場合は常に`-k`を使用してください。gzipはデフォルトで元ファイルを削除します。

## よくある質問

#### Q1. gzipでファイルを圧縮するにはどうすればよいですか？
A. 単に`gzip ファイル名`を実行してファイルを圧縮します。元のファイルは`.gz`拡張子を持つ圧縮版に置き換えられます。

#### Q2. gzipファイルを解凍するにはどうすればよいですか？
A. `gzip -d ファイル名.gz`または`gunzip ファイル名.gz`を使用してファイルを解凍します。

#### Q3. 元のファイルを削除せずにファイルを圧縮するにはどうすればよいですか？
A. `gzip -k ファイル名`を使用して、圧縮版を作成しながら元のファイルを保持します。

#### Q4. どの圧縮レベルを使用すべきですか？
A. 最速の圧縮（容量節約は少ない）には`-1`を、最高の圧縮（より遅い）には`-9`を使用します。デフォルトレベルの`-6`はバランスの良い選択です。

#### Q5. ディレクトリ全体を圧縮するにはどうすればよいですか？
A. `gzip`自体はディレクトリを圧縮しません。`tar`と`gzip`を組み合わせて使用します：`tar -czf アーカイブ.tar.gz ディレクトリ/`

## 参考文献

https://www.gnu.org/software/gzip/manual/gzip.html

## 改訂履歴

- 2025/05/05 初版