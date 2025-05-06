# tar コマンド

テープアーカイブを操作し、アーカイブ形式でファイルの作成、抽出、一覧表示、または更新を行います。

## 概要

`tar` コマンドは、tarball として知られるアーカイブファイルの作成、管理、抽出を行います。配布やバックアップのためにファイルをまとめてパッケージ化するのによく使用され、ファイルのパーミッション、所有権、ディレクトリ構造を保持します。元々はテープアーカイブ（名前の由来）用に設計されましたが、現在は主にディスク上のファイルアーカイブに使用されています。

## オプション

### **-c, --create**

新しいアーカイブを作成します

```console
$ tar -c -f archive.tar file1.txt file2.txt
```

### **-x, --extract**

アーカイブからファイルを抽出します

```console
$ tar -x -f archive.tar
```

### **-t, --list**

アーカイブの内容を一覧表示します

```console
$ tar -t -f archive.tar
file1.txt
file2.txt
```

### **-f, --file=ARCHIVE**

アーカイブファイルまたはデバイス ARCHIVE を使用します（ほとんどの操作に必要）

```console
$ tar -c -f backup.tar documents/
```

### **-v, --verbose**

処理されたファイルを詳細に一覧表示します

```console
$ tar -cvf archive.tar file1.txt file2.txt
file1.txt
file2.txt
```

### **-z, --gzip**

アーカイブを gzip でフィルタリングします（.tar.gz ファイルの作成/抽出）

```console
$ tar -czf archive.tar.gz directory/
```

### **-j, --bzip2**

アーカイブを bzip2 でフィルタリングします（.tar.bz2 ファイルの作成/抽出）

```console
$ tar -cjf archive.tar.bz2 directory/
```

### **-C, --directory=DIR**

操作を実行する前にディレクトリ DIR に変更します

```console
$ tar -xf archive.tar -C /tmp/extract/
```

### **--exclude=PATTERN**

PATTERN に一致するファイルを除外します

```console
$ tar -cf backup.tar --exclude="*.log" directory/
```

## 使用例

### 圧縮アーカイブの作成

```console
$ tar -czf project-backup.tar.gz project/
```

### 圧縮アーカイブの抽出

```console
$ tar -xzf project-backup.tar.gz
```

### 圧縮アーカイブの内容一覧表示

```console
$ tar -tzf project-backup.tar.gz
project/
project/file1.txt
project/file2.txt
project/subdirectory/
project/subdirectory/file3.txt
```

### アーカイブから特定のファイルを抽出

```console
$ tar -xf archive.tar file1.txt
```

### 詳細出力付きでアーカイブを作成

```console
$ tar -cvf documents.tar Documents/
Documents/
Documents/report.pdf
Documents/presentation.pptx
Documents/notes.txt
```

## ヒント:

### オプションを簡潔に組み合わせる

ハイフンなしでオプションを組み合わせることができます。例えば `tar -c -z -f` の代わりに `tar czf` のように使えます。これは経験豊富なユーザーがよく使う省略形です。

### パーミッションと所有権を保持する

デフォルトでは、`tar` はファイルのパーミッションと所有権を保持します。root として抽出する場合は、制限されたパーミッションでファイルが作成される可能性があるため注意してください。

### 大きなアーカイブには進行状況インジケーターを使用する

大きなアーカイブの場合、`--checkpoint=1000 --checkpoint-action=dot` を追加して操作中に進行状況のドットを表示します。

### アーカイブの整合性を確認する

`tar -tf archive.tar` を使用して、アーカイブの内容を抽出せずに確認できます。これはアーカイブが破損していないことを確認するのに役立ちます。

### 抽出時に圧縮タイプを覚えておく

アーカイブを作成したときと同じ圧縮オプションを抽出時に指定する必要があります（例：gzip には `-z`、bzip2 には `-j`）。

## よくある質問

#### Q1. .tar、.tar.gz、.tar.bz2 の違いは何ですか？
A. `.tar` は非圧縮アーカイブ、`.tar.gz` は gzip で圧縮（速いが圧縮率は低い）、`.tar.bz2` は bzip2 で圧縮（遅いが圧縮率は高い）です。

#### Q2. tar アーカイブから単一のファイルを抽出するにはどうすればよいですか？
A. `tar -xf archive.tar path/to/specific/file` を使用して、そのファイルだけを抽出します。

#### Q3. 抽出せずに tar ファイルの中身を確認するにはどうすればよいですか？
A. `tar -tf archive.tar` を使用して、抽出せずにすべてのファイルを一覧表示します。

#### Q4. 特定のファイルを除外した tar アーカイブを作成するにはどうすればよいですか？
A. `--exclude` オプションを使用します：`tar -cf archive.tar directory/ --exclude="*.tmp"`

#### Q5. 既存の tar アーカイブ内のファイルを更新するにはどうすればよいですか？
A. `-u` または `--update` オプションを使用します：`tar -uf archive.tar newfile.txt`

## 参考文献

https://www.gnu.org/software/tar/manual/tar.html

## 改訂履歴

- 2025/05/05 初版