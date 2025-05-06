# zip コマンド

ファイルやディレクトリを圧縮してZIPアーカイブを作成または更新します。

## 概要

`zip`コマンドは、ZIP形式の圧縮アーカイブを作成します。この形式はファイル圧縮やパッケージングに広く使用されています。既存のアーカイブにファイルを追加したり、アーカイブ内のファイルを更新したり、自己解凍型アーカイブを作成したりすることができます。ZIPファイルはファイル属性とディレクトリ構造を維持するため、クロスプラットフォームでのファイル共有に便利です。

## オプション

### **-r**

ディレクトリとそのサブディレクトリ内のファイルを再帰的に含める

```console
$ zip -r archive.zip documents/
  adding: documents/ (stored 0%)
  adding: documents/report.txt (deflated 35%)
  adding: documents/images/ (stored 0%)
  adding: documents/images/photo.jpg (deflated 2%)
```

### **-u**

アーカイブ内のバージョンよりも新しい場合、zipアーカイブ内の既存エントリを更新する

```console
$ zip -u archive.zip documents/report.txt
updating: documents/report.txt (deflated 35%)
```

### **-d**

zipアーカイブからエントリを削除する

```console
$ zip -d archive.zip documents/report.txt
deleting: documents/report.txt
```

### **-e**

パスワードでzipファイルの内容を暗号化する

```console
$ zip -e secure.zip confidential.txt
Enter password: 
Verify password: 
  adding: confidential.txt (deflated 42%)
```

### **-j**

ファイル名のみを保存する（パスを破棄する）

```console
$ zip -j archive.zip documents/report.txt documents/images/photo.jpg
  adding: report.txt (deflated 35%)
  adding: photo.jpg (deflated 2%)
```

### **-m**

指定したファイルをzipアーカイブに移動する（元のファイルを削除する）

```console
$ zip -m archive.zip temp.txt
  adding: temp.txt (deflated 30%)
```

### **-9**

最大圧縮を使用する（最も遅い）

```console
$ zip -9 archive.zip largefile.dat
  adding: largefile.dat (deflated 65%)
```

### **-0**

圧縮せずにファイルを保存する

```console
$ zip -0 archive.zip already-compressed.jpg
  adding: already-compressed.jpg (stored 0%)
```

### **-v**

zip操作に関する詳細情報を表示する

```console
$ zip -v archive.zip document.txt
  adding: document.txt (deflated 35%)
zip diagnostic: adding document.txt
Total bytes read: 1024 (1.0k)
Total bytes written: 665 (665b)
Compression ratio: 35.1%
```

## 使用例

### 基本的なzipアーカイブの作成

```console
$ zip backup.zip file1.txt file2.txt
  adding: file1.txt (deflated 42%)
  adding: file2.txt (deflated 38%)
```

### サブディレクトリを含むディレクトリ全体をzip化する

```console
$ zip -r project.zip project/
  adding: project/ (stored 0%)
  adding: project/src/ (stored 0%)
  adding: project/src/main.c (deflated 45%)
  adding: project/docs/ (stored 0%)
  adding: project/docs/readme.md (deflated 40%)
```

### パスワード保護されたzipファイルの作成

```console
$ zip -e -r confidential.zip sensitive_data/
Enter password: 
Verify password: 
  adding: sensitive_data/ (stored 0%)
  adding: sensitive_data/accounts.xlsx (deflated 52%)
  adding: sensitive_data/passwords.txt (deflated 35%)
```

### 既存のアーカイブ内のファイルを更新する

```console
$ zip -u archive.zip updated_file.txt
updating: updated_file.txt (deflated 40%)
```

## ヒント:

### 異なる圧縮レベルを使用する

大きなアーカイブの場合、異なる圧縮レベルの使用を検討してください。すでに圧縮されているファイル（JPEGなど）には`-0`を、最大圧縮が有益なテキストファイルには`-9`を使用します。

### 不要なファイルを除外する

パターンを使用してファイルを除外できます：`zip -r archive.zip directory -x "*.git*" "*.DS_Store"`はGitファイルとmacOSシステムファイルを除外します。

### 自己解凍型アーカイブの作成

一部のシステムでは、`zip -A archive.zip`で自己解凍型アーカイブを作成できます。これによりZIPファイルに解凍コードが追加され、実行可能になります。

### 大きなアーカイブの分割

制限されたメディアを介して転送する必要がある非常に大きなアーカイブの場合、`-s`オプションを使用してアーカイブを小さな部分に分割します：`zip -s 100m -r archive.zip large_directory/`

## よくある質問

#### Q1. ZIPファイルを解凍するにはどうすればよいですか？
A. `unzip`コマンドを使用します：`unzip archive.zip`。`zip`コマンドはアーカイブの作成または変更のみを行います。

#### Q2. ZIPファイルを解凍せずに内容を確認するにはどうすればよいですか？
A. `unzip -l archive.zip`を使用して、解凍せずに内容を一覧表示します。

#### Q3. Unixパーミッションを保持するZIPファイルを作成するにはどうすればよいですか？
A. `-X`オプションを使用します：`zip -X archive.zip files`でUnixパーミッションを含むファイル属性を保持します。

#### Q4. ZIPファイルにコメントを追加できますか？
A. はい、`-z`オプションを使用します：`zip -z archive.zip`を実行すると、コメントの入力を求められます。

#### Q5. ファイル名のエンコーディングの問題を処理するにはどうすればよいですか？
A. `-UN=encoding`を使用してファイル名のエンコーディングを指定します。例：`zip -UN=UTF8 archive.zip files`。

## macOSに関する考慮事項

macOSでは、デフォルトの`zip`コマンドがアーカイブに`.DS_Store`や`__MACOSX`ディレクトリなどの追加の隠しファイルを作成することがあります。これを避けるには、拡張属性を除外する`-X`オプションを使用するか、`-x "*.DS_Store" "__MACOSX/*"`のような除外パターンを追加します。

## 参考文献

https://linux.die.net/man/1/zip

## 改訂履歴

- 2025/05/05 初版