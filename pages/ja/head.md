# headコマンド

ファイルの先頭部分を表示します。

## 概要

`head`コマンドはファイルの先頭部分を標準出力に出力します。デフォルトでは、指定された各ファイルの最初の10行を表示します。複数のファイルが指定された場合、各ファイルの前にファイル名を識別するヘッダーが付きます。

## オプション

### **-n, --lines=N**

デフォルトの10行ではなく、最初のN行を表示します

```console
$ head -n 5 file.txt
Line 1
Line 2
Line 3
Line 4
Line 5
```

### **-c, --bytes=N**

各ファイルの最初のNバイトを表示します

```console
$ head -c 20 file.txt
This is the first 20
```

### **-q, --quiet, --silent**

ファイル名を示すヘッダーを表示しません

```console
$ head -q file1.txt file2.txt
(file1.txtの内容)
(file2.txtの内容)
```

### **-v, --verbose**

常にファイル名を示すヘッダーを表示します

```console
$ head -v file.txt
==> file.txt <==
Line 1
Line 2
...
```

## 使用例

### ログファイルの先頭を表示する

```console
$ head /var/log/syslog
May  5 10:15:01 hostname CRON[12345]: (root) CMD (command -v debian-sa1 > /dev/null && debian-sa1 1 1)
May  5 10:17:01 hostname CRON[12346]: (root) CMD (/usr/local/bin/backup.sh)
...
```

### 複数ファイルの先頭数行を表示する

```console
$ head -n 3 *.conf
==> apache.conf <==
# Apache configuration
ServerName localhost
Listen 80

==> nginx.conf <==
# Nginx configuration
worker_processes auto;
events {
```

### パイプとheadを組み合わせる

```console
$ ps aux | head -5
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0 168940  9416 ?        Ss   May04   0:02 /sbin/init
root         2  0.0  0.0      0     0 ?        S    May04   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        I<   May04   0:00 [rcu_gp]
root         4  0.0  0.0      0     0 ?        I<   May04   0:00 [rcu_par_gp]
```

## ヒント:

### tailと組み合わせる

`head`と`tail`を組み合わせて特定の行範囲を抽出できます：

```console
$ head -n 20 file.txt | tail -n 10
```
これはファイルの11〜20行目を表示します。

### 負の数を使用する

GNU headでは、`-n -N`を使用して最後のN行を除くすべての行を表示できます：

```console
$ head -n -5 file.txt
```
これは最後の5行を除くすべての行を表示します。

### 成長するファイルの監視

`tail -f`とは異なり、`head`にはフォローモードがありません。アクティブに書き込まれているファイルを監視する必要がある場合は、`-f`オプション付きの`tail`を使用してください。

## よくある質問

#### Q1. headとtailの違いは何ですか？
A. `head`はファイルの先頭（デフォルトでは最初の10行）を表示し、`tail`はファイルの末尾（デフォルトでは最後の10行）を表示します。

#### Q2. 行数ではなく特定の文字数を表示するにはどうすればよいですか？
A. `-c`オプションを使用します：`head -c 100 file.txt`はファイルの最初の100バイトを表示します。

#### Q3. ファイル名のヘッダーなしで複数ファイルの先頭数行を表示するにはどうすればよいですか？
A. `-q`オプションを使用します：`head -q file1.txt file2.txt`

#### Q4. headはtail -fのようにファイルの成長に合わせて追跡できますか？
A. いいえ、`head`にはフォローモードがありません。成長するファイルを監視するには`tail -f`を使用してください。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/head-invocation.html

## 改訂履歴

- 2025/05/05 初版