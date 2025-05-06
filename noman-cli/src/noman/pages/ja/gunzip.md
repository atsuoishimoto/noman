# gunzipコマンド

gzipで圧縮されたファイルを展開します。

## 概要

`gunzip`はgzip圧縮で圧縮されたファイルを展開するユーティリティです。`.gz`拡張子を削除して元のファイルを復元します。デフォルトでは、`-k`オプションを使用しない限り、gunzipは元の圧縮ファイルを保持しません。

## オプション

### **-c, --stdout, --to-stdout**

出力を標準出力に書き込み、元のファイルを変更しません。

```console
$ gunzip -c archive.gz > extracted_file
```

### **-f, --force**

ファイルに複数のリンクがある場合や、対応するファイルがすでに存在する場合でも、強制的に展開します。

```console
$ gunzip -f already_exists.gz
```

### **-k, --keep**

展開中に入力ファイルを保持します（削除しません）。

```console
$ gunzip -k data.gz
$ ls
data  data.gz
```

### **-l, --list**

展開せずに圧縮ファイルの内容を一覧表示します。

```console
$ gunzip -l archive.gz
         compressed        uncompressed  ratio uncompressed_name
                 220                 356  38.2% archive
```

### **-q, --quiet**

すべての警告を抑制します。

```console
$ gunzip -q noisy.gz
```

### **-r, --recursive**

ディレクトリ内のファイルを再帰的に展開します。

```console
$ gunzip -r ./compressed_directory/
```

### **-t, --test**

展開せずに圧縮ファイルの整合性をテストします。

```console
$ gunzip -t archive.gz
```

### **-v, --verbose**

展開された各ファイルの名前と圧縮率を表示します。

```console
$ gunzip -v data.gz
data.gz:	 65.3% -- replaced with data
```

## 使用例

### 基本的な展開

```console
$ gunzip archive.gz
$ ls
archive
```

### 複数ファイルの展開

```console
$ gunzip file1.gz file2.gz file3.gz
$ ls
file1 file2 file3
```

### 標準出力への展開

```console
$ gunzip -c config.gz | grep "setting"
default_setting=true
advanced_setting=false
```

### 展開せずに圧縮ファイルをテスト

```console
$ gunzip -tv *.gz
archive1.gz: OK
archive2.gz: OK
data.gz: OK
```

## ヒント:

### tarファイルとの使用

多くのtarアーカイブはgzipで圧縮されています（.tar.gzまたは.tgz拡張子）。最初にgunzipを使用する代わりに、`tar -xzf`を使用して一度に展開できます。

### 複数の圧縮形式の処理

圧縮形式が不明な場合は、様々な圧縮形式で動作する`zcat`の使用を検討するか、zipファイル用のより汎用性の高い`unzip`を試してみてください。

### タイムスタンプの保持

gunzipはデフォルトで元のファイルのタイムスタンプを保持します。これによりファイル履歴情報を維持できます。

### パイプの使用

大きなファイルを扱う場合は、`-c`オプションを使用して中間ファイルを作成せずに出力を別のコマンドに直接パイプすることができます。

## よくある質問

#### Q1. gunzipとgzip -dの違いは何ですか？
A. 機能的に同等です。`gunzip file.gz`は`gzip -d file.gz`と同じです。

#### Q2. 元のファイルを削除せずにファイルを展開するにはどうすればよいですか？
A. `-k`または`--keep`オプションを使用します：`gunzip -k file.gz`

#### Q3. gunzipは.zipファイルを処理できますか？
A. いいえ、gunzipはgzip圧縮ファイル（.gz）のみを処理します。.zipファイルの場合は、`unzip`コマンドを使用してください。

#### Q4. 複数のファイルを一度に展開するにはどうすればよいですか？
A. すべてのファイルをリストするだけです：`gunzip file1.gz file2.gz file3.gz`またはワイルドカードを使用します：`gunzip *.gz`

#### Q5. 展開せずに.gzファイルの内容を確認するにはどうすればよいですか？
A. `gunzip -l file.gz`を使用して内容を一覧表示するか、`zcat file.gz | less`を使用して内容を表示します。

## 参考文献

https://www.gnu.org/software/gzip/manual/gzip.html

## 改訂履歴

- 2025/05/05 初版