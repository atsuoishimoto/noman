# sleepコマンド

指定された時間だけ実行を一時停止します。

## 概要

`sleep`コマンドは、指定された時間間隔だけ実行を一時停止します。シェルスクリプトでコマンド間に遅延を導入したり、リソースが利用可能になるのを待ったり、簡単なタイミングメカニズムを実装したりするために一般的に使用されます。このコマンドは数値と、時間単位を示すオプションのサフィックスを受け付けます。

## オプション

### **--help**

ヘルプ情報を表示して終了します。

```console
$ sleep --help
Usage: sleep NUMBER[SUFFIX]...
  or:  sleep OPTION
Pause for NUMBER seconds.  SUFFIX may be 's' for seconds (the default),
'm' for minutes, 'h' for hours or 'd' for days.  NUMBER need not be an
integer.  Given two or more arguments, pause for the amount of time
specified by the sum of their values.

      --help     display this help and exit
      --version  output version information and exit
```

### **--version**

バージョン情報を出力して終了します。

```console
$ sleep --version
sleep (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by Jim Meyering and Paul Eggert.
```

## 使用例

### 基本的な秒単位のスリープ

```console
$ sleep 5
# コマンドは5秒間一時停止し、その後プロンプトに戻る
```

### 時間単位を指定したスリープ

```console
$ sleep 1m
# コマンドは1分間一時停止する
```

### スクリプト内でのsleepの使用

```console
$ echo "Starting task..."
Starting task...
$ sleep 2
$ echo "Task completed after 2 seconds"
Task completed after 2 seconds
```

### 複数の時間値

```console
$ sleep 1m 30s
# コマンドは1分30秒間一時停止する
```

## ヒント:

### 利用可能な時間単位

- `s`: 秒（単位が指定されない場合のデフォルト）
- `m`: 分
- `h`: 時間
- `d`: 日

### 小数値

より正確なタイミングのために、sleepは小数値を受け付けます：

```console
$ sleep 0.5
# 0.5秒間一時停止する
```

### 他のコマンドとの組み合わせ

`&`演算子を使用してsleepをバックグラウンドで実行し、他のタスクを続行できます：

```console
$ sleep 10 & echo "This prints immediately"
[1] 12345
This prints immediately
```

### sleepの中断

フォアグラウンドで実行中のsleepコマンドを中断するには、Ctrl+Cを押します。

## よくある質問

#### Q1. sleepをミリ秒単位で使用できますか？
A. 標準のsleepコマンドはミリ秒を直接サポートしていませんが、対応システムでは`sleep 0.001`のような小数値を使用して1ミリ秒を表現できます。

#### Q2. 異なる時間単位を組み合わせるにはどうすればよいですか？
A. sleepに複数の引数を提供できます：`sleep 1h 30m 45s`は1時間30分45秒間スリープします。

#### Q3. なぜスクリプトがsleepが終了する前に続行するのですか？
A. `sleep 10 &`を使用した場合、アンパサンド（&）はsleepをバックグラウンドで実行します。スクリプトがsleepの完了を待つようにするには、`&`を削除してください。

#### Q4. sleepはCPUを多く使用しますか？
A. いいえ、sleepは非常に効率的です。システムタイマーを使用し、待機中にCPUリソースを消費しません。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/sleep-invocation.html

## 改訂履歴

- 2025/05/05 初版