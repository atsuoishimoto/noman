# script コマンド

ターミナルセッションのタイプスクリプトを作成します。

## 概要

`script` コマンドは、ターミナルセッションで表示されるすべての内容の記録（タイプスクリプト）を作成します。すべての入力と出力をキャプチャし、ターミナルでのやり取りをファイルに保存して、ドキュメント作成、共有、または後で確認するために使用できます。

## オプション

### **-a, --append**

指定したファイルまたはタイプスクリプトに出力を上書きではなく追加します。

```console
$ script -a session.log
Script started, file is session.log
$ echo "This will be appended to the existing file"
This will be appended to the existing file
$ exit
Script done, file is session.log
```

### **-f, --flush**

各書き込み後に出力をフラッシュして、リアルタイムの記録を確保します。セッションがアクティブな間にタイプスクリプトファイルを監視する場合に便利です。

```console
$ script -f realtime.log
Script started, file is realtime.log
$ echo "This output is flushed immediately"
This output is flushed immediately
$ exit
Script done, file is realtime.log
```

### **-q, --quiet**

静かなモードで実行し、開始および終了メッセージを表示しません。

```console
$ script -q quiet.log
$ echo "No start/end messages displayed"
No start/end messages displayed
$ exit
```

### **-t, --timing=FILE**

タイミングデータをFILEに出力します。これは後で scriptreplay コマンドを使用して、元のスピードでセッションを再生するために使用できます。

```console
$ script -t timing.log typescript.log
Script started, file is typescript.log
$ echo "This session can be replayed later"
This session can be replayed later
$ exit
Script done, file is typescript.log
```

## 使用例

### 基本的な使い方

```console
$ script my_session.log
Script started, file is my_session.log
$ ls
Documents  Downloads  Pictures
$ echo "Hello, world!"
Hello, world!
$ exit
Script done, file is my_session.log
```

### 後で再生するためのセッション記録

```console
$ script --timing=timing.log typescript.log
Script started, file is typescript.log
$ echo "This is a demonstration"
This is a demonstration
$ ls -la
total 20
drwxr-xr-x  2 user user 4096 May  5 10:00 .
drwxr-xr-x 20 user user 4096 May  5 09:55 ..
-rw-r--r--  1 user user  220 May  5 09:55 .bash_logout
$ exit
Script done, file is typescript.log
$ scriptreplay timing.log typescript.log
```

## ヒント:

### 記録したセッションの再生

`scriptreplay` をタイミングファイルと共に使用して、記録したセッションを元のスピードで再生します：
```console
$ scriptreplay timing.log typescript.log
```

### 機密情報のキャプチャを避ける

パスワードなどの機密情報が入力される可能性のあるセッションで `script` を使用する際は注意してください。タイプスクリプトには端末に表示されるすべての情報が含まれます。

### SSHセッションでの使用

接続前に `script` を開始することで、リモートSSHセッションを記録できます：
```console
$ script ssh_session.log
$ ssh user@remote-server
```

### 適切に終了する

タイプスクリプトファイルが適切に閉じられて保存されるように、常に `exit` または Ctrl+D でスクリプトセッションを終了してください。

## よくある質問

#### Q1. ファイル名を指定しない場合のデフォルトファイル名は何ですか？
A. ファイル名を指定しない場合、`script` はデフォルトの出力ファイルとして "typescript" を使用します。

#### Q2. セッションを記録して他の人と共有することはできますか？
A. はい、タイプスクリプトファイルにはすべての端末出力が含まれており、共有できます。よりインタラクティブな体験のためには、`-t` オプションを使用してタイミングファイルを作成し、両方のファイルを `scriptreplay` で再生するために共有してください。

#### Q3. タイプスクリプトファイルの内容を表示するにはどうすればよいですか？
A. テキストエディタや `less` や `more` などの端末ページャーで表示できます：
```console
$ less typescript
```

#### Q4. scriptは表示されないコマンドも記録しますか？
A. いいえ、`script` は端末に表示されるものだけを記録します。エコーなしで入力されたコマンド（パスワードなど）はタイプスクリプトには表示されません。

## 参考資料

https://www.man7.org/linux/man-pages/man1/script.1.html

## 改訂履歴

- 2025/05/05 初版