# teeコマンド

標準入力から読み取り、標準出力とファイルの両方に書き込みます。

## 概要

`tee`コマンドは標準入力から読み取り、標準出力と1つ以上のファイルに同時に書き込みます。これにより、コマンドの出力をターミナルで表示しながら同時にファイルに保存することができ、ログ記録やデバッグに役立ちます。

## オプション

### **-a, --append**

指定されたファイルに追記し、上書きしません。

```console
$ echo "Additional line" | tee -a logfile.txt
Additional line
```

### **-i, --ignore-interrupts**

割り込み信号（SIGINT）を無視します。

```console
$ long_running_command | tee -i output.log
```

### **--help**

ヘルプ情報を表示して終了します。

```console
$ tee --help
Usage: tee [OPTION]... [FILE]...
Copy standard input to each FILE, and also to standard output.

  -a, --append              append to the given FILEs, do not overwrite
  -i, --ignore-interrupts   ignore interrupt signals
      --help     display this help and exit
      --version  output version information and exit

If a FILE is -, copy again to standard output.
```

### **--version**

バージョン情報を出力して終了します。

```console
$ tee --version
tee (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by Mike Parker, Richard M. Stallman, and David MacKenzie.
```

## 使用例

### コマンド出力を表示しながら保存する

```console
$ ls -la | tee directory_listing.txt
total 32
drwxr-xr-x  5 user  staff   160 May  5 10:15 .
drwxr-xr-x  3 user  staff    96 May  4 09:30 ..
-rw-r--r--  1 user  staff  2048 May  5 10:10 file1.txt
-rw-r--r--  1 user  staff  4096 May  5 10:12 file2.txt
```

### 複数のファイルに一度に書き込む

```console
$ echo "Hello, world!" | tee file1.txt file2.txt file3.txt
Hello, world!
```

### パイプラインでteeを使用する

```console
$ cat input.txt | grep "error" | tee errors.log | wc -l
5
```

### 特権が必要なファイルに書き込む

```console
$ echo "127.0.0.1 example.com" | sudo tee -a /etc/hosts
127.0.0.1 example.com
```

## ヒント:

### ファイルに対するsudo操作にteeを使用する

root権限が必要なファイルに出力をリダイレクトする場合、`sudo command > file`は機能しません。これはリダイレクトがsudoの前に行われるためです。代わりに、`command | sudo tee file`を使用して権限を適切に処理します。

### 出力を監視しながらログを作成する

トラブルシューティング時には、teeを使用してリアルタイムで出力を確認しながらログを作成できます：`command | tee logfile.txt`

### ファイルと別のコマンドの両方に書き込む

teeを使用してパイプラインを分岐できます：`command | tee file.txt | another_command`

### /dev/ttyを使用して強制的に端末に出力する

リダイレクトされている場合でも出力を確実に端末に送信する必要がある場合：`command | tee /dev/tty | another_command`

## よくある質問

#### Q1. "tee"という名前の由来は何ですか？
A. 配管で使用されるT字型分岐器に由来しています。このコマンドは入力を複数の出力に分割し、"T"の形に似ているためです。

#### Q2. ファイルを上書きせずに追記するにはどうすればよいですか？
A. `-a`または`--append`オプションを使用します：`command | tee -a file.txt`

#### Q3. teeは標準出力ではなく標準エラー出力に書き込むことができますか？
A. いいえ、teeは常に標準出力に書き込みます。標準エラー出力にリダイレクトするには、追加のシェルリダイレクトが必要です：`command | tee file.txt >&2`

#### Q4. root権限が必要なファイルにteeで書き込むにはどうすればよいですか？
A. sudoとteeを組み合わせて使用します：`command | sudo tee /path/to/restricted/file`

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/tee-invocation.html

## 改訂履歴

- 2025/05/05 初版