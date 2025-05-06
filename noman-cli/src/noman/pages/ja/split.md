# split コマンド

ファイルを複数の部分に分割します。

## 概要

`split` コマンドはファイルを複数の小さなファイルに分割します。大きなファイルを扱いやすく分割したり、サイズ制限のあるメディアで転送したり、一部ずつ処理したりする場合に便利です。デフォルトでは、元のファイルから指定された行数またはバイト数を含む「xaa」、「xab」などの名前のファイルを作成します。

## オプション

### **-b, --bytes=SIZE**

行ではなくバイト単位で分割します。SIZEは数字の後に乗数を付けることができます：k (1024)、m (1024²)、g (1024³) など。

```console
$ split -b 1M largefile.dat chunk_
$ ls chunk_*
chunk_aa  chunk_ab  chunk_ac
```

### **-l, --lines=NUMBER**

ファイルをNUMBER行ごとに分割します（デフォルトは1000行）。

```console
$ split -l 100 data.csv part_
$ ls part_*
part_aa  part_ab  part_ac  part_ad
```

### **-d, --numeric-suffixes[=FROM]**

アルファベットの代わりに数字の接尾辞を使用し、FROM（デフォルトは0）から始めます。

```console
$ split -d -l 100 data.txt section_
$ ls section_*
section_00  section_01  section_02
```

### **-a, --suffix-length=N**

長さNの接尾辞を生成します（デフォルトは2）。

```console
$ split -a 3 -l 100 data.txt part_
$ ls part_*
part_aaa  part_aab  part_aac
```

### **--additional-suffix=SUFFIX**

ファイル名に追加の接尾辞SUFFIXを付加します。

```console
$ split -l 100 --additional-suffix=.txt data.csv part_
$ ls part_*
part_aa.txt  part_ab.txt  part_ac.txt
```

### **-n, --number=CHUNKS**

サイズまたは数に基づいてCHUNKS個のファイルに分割します。

```console
$ split -n 3 largefile.dat chunk_
$ ls chunk_*
chunk_aa  chunk_ab  chunk_ac
```

## 使用例

### 大きなログファイルを行数で分割する

```console
$ split -l 1000 server.log server_log_
$ ls server_log_*
server_log_aa  server_log_ab  server_log_ac  server_log_ad
```

### 大きなファイルを等サイズのチャンクに分割する

```console
$ split -n 5 backup.tar.gz backup_part_
$ ls backup_part_*
backup_part_aa  backup_part_ab  backup_part_ac  backup_part_ad  backup_part_ae
```

### 特定のバイトサイズで数字の接尾辞を使って分割する

```console
$ split -b 10M -d large_video.mp4 video_
$ ls video_*
video_00  video_01  video_02  video_03
```

## ヒント

### 分割ファイルの再結合

分割したファイルを再結合するには、正しい順序でファイルを指定して `cat` コマンドを使用します：
```console
$ cat chunk_* > original_file_restored
```

### ファイル拡張子の保持

拡張子のあるファイルを分割する場合、`--additional-suffix` を使用して識別しやすいように拡張子を維持します：
```console
$ split -b 5M --additional-suffix=.mp4 video.mp4 video_part_
```

### ヘッダー付きCSVファイルの分割

CSVファイルを分割する場合、各ファイルにヘッダーを保持したい場合があります：
```console
$ head -1 data.csv > header
$ tail -n +2 data.csv | split -l 1000 - part_
$ for f in part_*; do cat header "$f" > "${f}.csv"; rm "$f"; done
```

## よくある質問

#### Q1. ファイルを等サイズの部分に分割するにはどうすればよいですか？
A. `split -n NUMBER filename prefix` を使用します。NUMBERは必要な部分の数です。

#### Q2. ファイルをサイズで分割するにはどうすればよいですか？
A. `split -b SIZE filename prefix` を使用します。SIZEはバイト、KB (k)、MB (m)、GB (g) で指定できます。

#### Q3. 分割したファイルを元に戻すにはどうすればよいですか？
A. `cat prefix* > original_filename` を使用して、すべての分割部分を順番に連結します。

#### Q4. アルファベットの代わりに数字の接尾辞を使用できますか？
A. はい、`-d` オプションを使用すると、アルファベットの代わりに数字の接尾辞（00、01、02など）を使用できます。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/split-invocation.html

## 改訂履歴

- 2025/05/05 初版