# rsyncコマンド

ローカルシステムとリモートシステム間、またはローカルディレクトリ間でファイルとディレクトリを同期します。

## 概要

`rsync`は、場所間でファイルを効率的に転送・同期する高速で多機能なファイルコピー・同期ツールです。ソースと宛先の間の差分のみをコピーするため、後続の転送では通常のコピーコマンドよりもはるかに高速です。セキュアなリモート転送のためにSSH経由で動作することも、ローカルディレクトリ間で動作することもできます。

## オプション

### **-a, --archive**

アーカイブモード。権限、所有権、タイムスタンプを保持し、ディレクトリを再帰的にコピーします。

```console
$ rsync -a /source/directory/ /destination/directory/
```

### **-v, --verbose**

詳細表示を増やし、転送されるファイルと最後に要約を表示します。

```console
$ rsync -av /source/directory/ /destination/directory/
sending incremental file list
file1.txt
file2.txt
directory/
directory/file3.txt

sent 1,234 bytes  received 42 bytes  2,552.00 bytes/sec
total size is 10,240  speedup is 8.04
```

### **-z, --compress**

転送中にファイルデータを圧縮して、帯域幅の使用量を削減します。

```console
$ rsync -az /source/directory/ user@remote:/destination/directory/
```

### **-P, --partial --progress**

転送中の進捗状況を表示し、部分的に転送されたファイルを保持します。

```console
$ rsync -avP large_file.iso user@remote:/destination/
sending incremental file list
large_file.iso
    153,092,096  14%   15.23MB/s    0:01:12
```

### **--delete**

ソースに存在しない宛先のファイルを削除し、宛先を正確なミラーにします。

```console
$ rsync -av --delete /source/directory/ /destination/directory/
```

### **-n, --dry-run**

変更を加えずに試験実行を行います。

```console
$ rsync -avn --delete /source/directory/ /destination/directory/
```

### **-e, --rsh=COMMAND**

使用するリモートシェルを指定します（通常はオプション付きのssh）。

```console
$ rsync -av -e "ssh -p 2222" /source/directory/ user@remote:/destination/
```

### **-u, --update**

宛先の方が新しいファイルをスキップします。

```console
$ rsync -avu /source/directory/ /destination/directory/
```

### **--exclude=PATTERN**

指定したパターンに一致するファイルを除外します。

```console
$ rsync -av --exclude="*.log" /source/directory/ /destination/directory/
```

## 使用例

### ローカルディレクトリの同期

```console
$ rsync -av /home/user/documents/ /media/backup/documents/
sending incremental file list
report.docx
presentation.pptx
notes.txt

sent 15,234 bytes  received 85 bytes  30,638.00 bytes/sec
total size is 45,678  speedup is 2.98
```

### リモートサーバーへのバックアップ

```console
$ rsync -avz --delete ~/documents/ user@remote.server:/backup/documents/
sending incremental file list
./
report.docx
presentation.pptx
notes.txt

sent 45,678 bytes  received 612 bytes  9,258.00 bytes/sec
total size is 45,678  speedup is 0.99
```

### リモートサーバーからのダウンロード

```console
$ rsync -avz user@remote.server:/remote/directory/ /local/directory/
receiving incremental file list
./
file1.txt
file2.txt
directory/
directory/file3.txt

received 10,240 bytes  received 214 bytes  6,969.33 bytes/sec
total size is 10,240  speedup is 0.98
```

### ウェブサイトのミラーリング（特定のファイルを除外）

```console
$ rsync -avz --delete --exclude="*.tmp" --exclude=".git/" /local/website/ user@server:/var/www/html/
```

## ヒント:

### 末尾のスラッシュを慎重に使用する

ソースの末尾にスラッシュがあると「このディレクトリの内容をコピーする」という意味になり、スラッシュがないと「このディレクトリとその内容をコピーする」という意味になります。この微妙な違いによって、コピーされるものが大きく変わる可能性があります。

### ハードリンクを保持する

転送されるファイル間のハードリンクを保持する必要がある場合は、`-H`または`--hard-links`オプションを使用します。

### 大きな転送には帯域制限を使用する

ネットワーク経由の大きな転送には、`--bwlimit=KBPS`を使用して帯域幅の使用量を制限します（例：`--bwlimit=1000`で1000KB/秒に制限）。

### バックアップスナップショットの作成

rsyncと`--link-dest`オプションを組み合わせて、変更されていないファイルにハードリンクを使用する効率的なバックアップスナップショットを作成し、ディスク容量を節約します。

```console
$ rsync -av --link-dest=/backups/daily.1 /source/ /backups/daily.0/
```

## よくある質問

#### Q1. rsyncはscpとどう違いますか？
A. rsyncはファイル間の差分のみを転送するため、後続の転送がはるかに高速です。また、同期、属性の保持のためのオプションが多く、中断された転送を再開することもできます。

#### Q2. 実際に実行する前にrsyncが何をするかをテストするにはどうすればよいですか？
A. `-n`または`--dry-run`オプションを使用して、変更を加えずに何が転送されるかを確認できます。

#### Q3. すべての属性を保持しながらファイルを同期するにはどうすればよいですか？
A. `-a`（アーカイブ）オプションを使用します。これは`-rlptgoD`（再帰的、リンク保持、権限、時間、グループ、所有者、特殊ファイル）と同等です。

#### Q4. rsyncはソースに存在しない宛先のファイルを削除できますか？
A. はい、`--delete`オプションを使用して、宛先をソースの正確なミラーにすることができます。

#### Q5. 特定のファイルやディレクトリを除外するにはどうすればよいですか？
A. 個々のパターンには`--exclude=PATTERN`を使用し、ファイルからパターンを読み込むには`--exclude-from=FILE`を使用します。

## 参考文献

https://download.samba.org/pub/rsync/rsync.html

## 改訂履歴

- 2025/05/05 初版