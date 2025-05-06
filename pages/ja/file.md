# file コマンド

ファイルの内容を調べてファイルタイプを判定します。

## 概要

`file` コマンドは、ファイル名の拡張子に依存せず、ファイルの内容を調査してそのタイプを識別します。ファイルがテキスト、実行可能バイナリ、データファイル、またはその他のタイプであるかを判断するために、さまざまなテストを実行します。これは、拡張子が欠けていたり誤解を招くようなファイルを扱う場合に特に役立ちます。

## オプション

### **-b, --brief**

ファイル名の接頭辞なしで結果を表示します。

```console
$ file -b document.txt
ASCII text
```

### **-i, --mime**

従来のファイルタイプの説明の代わりにMIMEタイプを表示します。

```console
$ file -i document.txt
document.txt: text/plain; charset=us-ascii
```

### **-z, --uncompress**

圧縮ファイルの中身を調べようとします。

```console
$ file -z archive.gz
archive.gz: ASCII text (gzip compressed data, was "notes.txt", last modified: Wed Apr 28 15:30:45 2021, from Unix)
```

### **-L, --dereference**

シンボリックリンクをたどります。

```console
$ file -L symlink
symlink: ASCII text
```

### **-s, --special-files**

ブロックまたはキャラクタ特殊ファイルを読み込みます。

```console
$ file -s /dev/sda1
/dev/sda1: Linux rev 1.0 ext4 filesystem data (extents) (large files)
```

## 使用例

### 複数のファイルを一度にチェックする

```console
$ file document.txt image.png script.sh
document.txt: ASCII text
image.png:    PNG image data, 1920 x 1080, 8-bit/color RGB, non-interlaced
script.sh:    Bourne-Again shell script, ASCII text executable
```

### バイナリファイルの調査

```console
$ file /bin/ls
/bin/ls: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=2f15ad836be3339dec0e2e6a3c637e08e48aacbd, for GNU/Linux 3.2.0, stripped
```

### ファイルエンコーディングの確認

```console
$ file --mime-encoding document.txt
document.txt: us-ascii
```

## ヒント:

### findコマンドとの併用

`find`と組み合わせてディレクトリ構造内のファイルタイプを識別します：

```console
$ find . -type f -exec file {} \;
```

### ディスクパーティションの調査

`file -s`を使用してディスクパーティションとファイルシステムを調査します：

```console
$ sudo file -s /dev/sd*
```

### ファイルエンコーディングの確認

国際的なテキストを扱う場合、`file --mime-encoding`を使用して文字エンコーディングを判断します：

```console
$ file --mime-encoding international_text.txt
international_text.txt: utf-8
```

## よくある質問

#### Q1. fileコマンドはどれくらい正確ですか？
A. `file`コマンドは一般的に正確ですが、完璧ではありません。パターンを調べるための「マジック」テストを使用しますが、特にカスタムや珍しいフォーマットのファイルタイプは誤認識される場合があります。

#### Q2. fileは暗号化されたファイルを検出できますか？
A. はい、`file`は暗号化されたファイルを検出できることが多いですが、暗号化方法を特定せずに「データ」または「暗号化データ」としてのみ識別する場合があります。

#### Q3. fileはファイル拡張子の使用とどう違いますか？
A. ファイル拡張子（変更されたり誤解を招く可能性がある）に依存する代わりに、`file`はファイルの実際の内容を調査してタイプを判断するため、より信頼性の高い識別が可能です。

#### Q4. fileはプログラミング言語のソースコードを識別できますか？
A. はい、`file`は多くのプログラミング言語のソースファイルを識別できますが、時には単に「ASCIIテキスト」などと一般的に識別するだけの場合もあります。

## 参考文献

https://man7.org/linux/man-pages/man1/file.1.html

## 改訂履歴

- 2025/05/05 初版