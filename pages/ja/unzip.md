# unzipコマンド

ZIPアーカイブからファイルを展開します。

## 概要

`unzip`はZIPアーカイブからファイルとディレクトリを展開します。様々な圧縮方式をサポートし、パスワード保護されたアーカイブも処理できます。このコマンドはZIPファイルの内容の一覧表示、テスト、展開ができるため、圧縮データを扱う上で不可欠です。

## オプション

### **-l**

展開せずにアーカイブの内容を一覧表示します

```console
$ unzip -l archive.zip
Archive:  archive.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
     1024  2025-01-01 12:34   file1.txt
      512  2025-01-02 15:45   file2.txt
---------                     -------
     1536                     2 files
```

### **-t**

展開せずにアーカイブの整合性をテストします

```console
$ unzip -t archive.zip
Archive:  archive.zip
    testing: file1.txt               OK
    testing: file2.txt               OK
No errors detected in compressed data of archive.zip.
```

### **-o**

確認なしに既存のファイルを上書きします

```console
$ unzip -o archive.zip
Archive:  archive.zip
  inflating: file1.txt
  inflating: file2.txt
```

### **-d, --directory**

指定したディレクトリにファイルを展開します

```console
$ unzip archive.zip -d extracted_files
Archive:  archive.zip
   creating: extracted_files/
  inflating: extracted_files/file1.txt
  inflating: extracted_files/file2.txt
```

### **-P**

暗号化されたアーカイブにパスワードを使用します

```console
$ unzip -P secretpassword protected.zip
Archive:  protected.zip
  inflating: confidential.txt
```

### **-q**

静かモード（通常の出力を抑制します）

```console
$ unzip -q archive.zip
```

### **-j**

パスを無視（ディレクトリを作成しません）

```console
$ unzip -j archive.zip
Archive:  archive.zip
  inflating: file1.txt
  inflating: file2.txt
```

## 使用例

### アーカイブから特定のファイルを展開する

```console
$ unzip archive.zip file1.txt
Archive:  archive.zip
  inflating: file1.txt
```

### 詳細情報付きで内容を一覧表示する

```console
$ unzip -v archive.zip
Archive:  archive.zip
 Length   Method    Size  Cmpr    Date    Time   CRC-32   Name
--------  ------  ------- ---- ---------- ----- --------  ----
    1024  Defl:N      512  50% 2025-01-01 12:34 a1b2c3d4  file1.txt
     512  Defl:N      256  50% 2025-01-02 15:45 e5f6g7h8  file2.txt
--------          -------  ---                            -------
    1536              768  50%                            2 files
```

### 特定のファイルを除くすべてのファイルを展開する

```console
$ unzip archive.zip -x file2.txt
Archive:  archive.zip
  inflating: file1.txt
```

## ヒント:

### 展開前にアーカイブの内容をプレビューする

展開前に常に`unzip -l archive.zip`を使用して内容をプレビューしましょう。これにより、既存のファイルを誤って上書きする可能性のあるファイルを展開することを避けられます。

### パスワード保護されたアーカイブを扱う

暗号化されたアーカイブには、`unzip -P password archive.zip`を使用します。コマンド履歴にパスワードを残したくない場合は、-Pオプションを省略するとunzipがパスワードを要求します。

### 特定のディレクトリに展開する

`unzip archive.zip -d target_directory`を使用して、現在のディレクトリではなく特定の場所にファイルを展開します。これによりワークスペースを整理できます。

### パスの問題に対処する

ZIPファイルに絶対パスや`../`を含むパスがある場合は、`unzip -j`を使用してディレクトリ構造なしでファイルのみを展開し、潜在的なセキュリティ問題を防ぎます。

## よくある質問

#### Q1. ZIPアーカイブから特定のファイルだけを展開するにはどうすればよいですか？
A. `unzip archive.zip filename1 filename2`を使用して、指定したファイルのみを展開します。

#### Q2. 既存のファイルを上書きせずにZIPファイルを展開するにはどうすればよいですか？
A. デフォルトでは、unzipは上書き前に確認を求めます。`unzip -n archive.zip`を使用すると、既存のファイルを上書きしません。

#### Q3. 非英語のファイル名を持つZIPファイルをどう扱えばよいですか？
A. 中国語のファイル名には`unzip -O CP936 archive.zip`を使用するか、異なる言語に適切な文字エンコーディングを使用します。

#### Q4. unzipはパスワード保護されたZIPファイルを扱えますか？
A. はい、`unzip -P password archive.zip`を使用するか、パスワードを省略して安全にプロンプトを表示させることができます。

#### Q5. ディレクトリ構造を作成せずにZIPファイルを展開するにはどうすればよいですか？
A. `unzip -j archive.zip`を使用してパスを「無視」し、すべてのファイルを単一のディレクトリに展開します。

## 参考文献

https://linux.die.net/man/1/unzip

## 改訂履歴

- 2025/05/05 初版