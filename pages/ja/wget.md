# wgetコマンド

HTTPやHTTPS、FTPプロトコルを介してウェブからファイルをダウンロードします。

## 概要

`wget`は、ウェブからファイルをダウンロードするための非対話型コマンドラインユーティリティです。HTTP、HTTPS、FTPプロトコルをサポートし、バックグラウンドで動作したり、中断されたダウンロードを再開したり、ウェブサイト内のリンクをたどったりすることができます。特に、バッチダウンロード、ウェブサイトのミラーリング、スクリプト内でのファイル取得に便利です。

## オプション

### **-O, --output-document=FILE**

リモート名に基づいてファイルを作成する代わりに、ドキュメントをFILEに書き込みます。

```console
$ wget -O latest-linux.iso https://example.com/downloads/linux.iso
--2025-05-05 10:15:32--  https://example.com/downloads/linux.iso
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1073741824 (1.0G) [application/octet-stream]
Saving to: 'latest-linux.iso'

latest-linux.iso    100%[===================>]   1.00G  5.25MB/s    in 3m 15s  

2025-05-05 10:18:47 (5.25 MB/s) - 'latest-linux.iso' saved [1073741824/1073741824]
```

### **-c, --continue**

部分的にダウンロードされたファイルの取得を再開します。

```console
$ wget -c https://example.com/large-file.zip
--2025-05-05 10:20:12--  https://example.com/large-file.zip
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 206 Partial Content
Length: 104857600 (100M), 52428800 (50M) remaining [application/zip]
Saving to: 'large-file.zip'

large-file.zip      50%[======>           ]  50.00M  3.15MB/s    in 16s     

2025-05-05 10:20:28 (3.15 MB/s) - 'large-file.zip' saved [104857600/104857600]
```

### **-b, --background**

起動後すぐにバックグラウンドに移行します。

```console
$ wget -b https://example.com/huge-archive.tar.gz
Continuing in background, pid 1234.
Output will be written to 'wget-log'.
```

### **-r, --recursive**

再帰的な取得（ウェブサイトのディレクトリ全体をダウンロード）を有効にします。

```console
$ wget -r -np https://example.com/docs/
--2025-05-05 10:25:45--  https://example.com/docs/
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 8192 (8.0K) [text/html]
Saving to: 'example.com/docs/index.html'

example.com/docs/index.html    100%[===================>]   8.00K  --.-KB/s    in 0.1s    

2025-05-05 10:25:46 (80.0 KB/s) - 'example.com/docs/index.html' saved [8192/8192]

... [more files downloaded] ...
```

### **-np, --no-parent**

再帰的に取得する際に親ディレクトリに上がらないようにします。

```console
$ wget -r -np https://example.com/docs/
```

### **-m, --mirror**

ミラーリングに適したオプションを有効にします：再帰的、タイムスタンプ付き、無限の再帰深度、FTPディレクトリリスティングの保存。

```console
$ wget -m https://example.com/blog/
--2025-05-05 10:30:12--  https://example.com/blog/
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 16384 (16K) [text/html]
Saving to: 'example.com/blog/index.html'

example.com/blog/index.html    100%[===================>]  16.00K  --.-KB/s    in 0.1s    

2025-05-05 10:30:13 (160.0 KB/s) - 'example.com/blog/index.html' saved [16384/16384]

... [more files downloaded] ...
```

### **-q, --quiet**

静かモード（出力なし）。

```console
$ wget -q https://example.com/file.txt
```

### **-P, --directory-prefix=PREFIX**

ファイルをPREFIX/...に保存します。

```console
$ wget -P downloads/ https://example.com/file.txt
--2025-05-05 10:35:22--  https://example.com/file.txt
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1024 (1.0K) [text/plain]
Saving to: 'downloads/file.txt'

downloads/file.txt   100%[===================>]   1.00K  --.-KB/s    in 0.1s    

2025-05-05 10:35:23 (10.0 KB/s) - 'downloads/file.txt' saved [1024/1024]
```

### **--limit-rate=RATE**

ダウンロードレートをRATEに制限します（例：200kは200KB/s）。

```console
$ wget --limit-rate=200k https://example.com/large-file.zip
--2025-05-05 10:40:15--  https://example.com/large-file.zip
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 104857600 (100M) [application/zip]
Saving to: 'large-file.zip'

large-file.zip      100%[===================>] 100.00M  200KB/s    in 8m 20s  

2025-05-05 10:48:35 (200 KB/s) - 'large-file.zip' saved [104857600/104857600]
```

## 使用例

### プログレスバー付きでファイルをダウンロードする

```console
$ wget https://example.com/file.txt
--2025-05-05 10:50:12--  https://example.com/file.txt
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1024 (1.0K) [text/plain]
Saving to: 'file.txt'

file.txt             100%[===================>]   1.00K  --.-KB/s    in 0.1s    

2025-05-05 10:50:13 (10.0 KB/s) - 'file.txt' saved [1024/1024]
```

### 深さ制限付きでウェブサイトをミラーリングする

```console
$ wget -m -k -p -l 2 https://example.com/
```

このコマンドはウェブサイトをミラーリングし、オフライン表示用にリンクを変換し（-k）、必要なページ要素をダウンロードし（-p）、再帰の深さを2レベルに制限します（-l 2）。

### パスワード保護されたサイトからファイルをダウンロードする

```console
$ wget --user=username --password=password https://example.com/protected/file.pdf
```

### テキストファイルに記載された複数のファイルをダウンロードする

```console
$ cat urls.txt
https://example.com/file1.txt
https://example.com/file2.txt
https://example.com/file3.txt

$ wget -i urls.txt
```

## ヒント:

### 中断されたダウンロードを再開する

ダウンロードが中断された場合、最初からやり直す代わりに `wget -c URL` を使用して中断された箇所から再開できます。

### バックグラウンドでダウンロードする

大きなダウンロードの場合、`wget -b URL` を使用してwgetをバックグラウンドで実行できます。出力は現在のディレクトリのwget-logに書き込まれます。

### 帯域幅使用量を制限する

`--limit-rate=RATE`（例：`--limit-rate=200k`）を使用して、利用可能な帯域幅をすべて消費しないようにします。特に共有接続で役立ちます。

### オフライン表示用にウェブサイトをミラーリングする

`wget -m -k -p website-url` を使用して、リンクが機能する完全なオフラインコピーを作成します。`-k` オプションはローカル表示用にリンクを変換します。

### 異なるユーザーエージェントを使用する

一部のウェブサイトはwgetをブロックします。`--user-agent="Mozilla/5.0"` を使用して、ブラウザとして識別されるようにします。

## よくある質問

#### Q1. ファイルをダウンロードして別の名前で保存するにはどうすればよいですか？
A. `wget -O ファイル名 URL` を使用して、ダウンロードしたファイルをカスタム名で保存します。

#### Q2. パスワード保護されたサイトからファイルをダウンロードするにはどうすればよいですか？
A. `wget --user=ユーザー名 --password=パスワード URL` を使用して認証情報を提供します。

#### Q3. ウェブサイト全体をダウンロードするにはどうすればよいですか？
A. `wget -m -k -p ウェブサイトURL` を使用して、オフライン表示用に適切にリンク変換されたサイトをミラーリングします。

#### Q4. ダウンロード速度を制限するにはどうすればよいですか？
A. `wget --limit-rate=RATE URL`（例：`--limit-rate=200k` で200KB/s）を使用します。

#### Q5. 部分的にダウンロードされたファイルを再開するにはどうすればよいですか？
A. `wget -c URL` を使用して、中断された箇所からダウンロードを続行します。

## 参考文献

https://www.gnu.org/software/wget/manual/wget.html

## 改訂履歴

- 2025/05/05 初版