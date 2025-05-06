# until コマンド

条件が満たされるまでコマンドを繰り返し実行します。

## 概要

`until` コマンドはシェルの構文で、指定された条件が真になるまでコマンドブロックを繰り返し実行します。条件が真である間実行される `while` とは異なり、`until` は条件が真になるまで実行されます。特定の状態に達するまで継続する必要があるループを作成するのに便利です。

## オプション

`until` コマンドは独立したプログラムではなくシェル組み込みの構文であるため、従来のコマンドラインオプションはありません。

## 使用例

### 基本的な until ループ

```console
$ until [ $counter -ge 5 ]; do
>   echo "Counter: $counter"
>   ((counter++))
> done
Counter: 0
Counter: 1
Counter: 2
Counter: 3
Counter: 4
```

### ファイルが存在するまで待機する

```console
$ until [ -f /tmp/signal_file ]; do
>   echo "Waiting for signal file..."
>   sleep 5
> done
> echo "Signal file found!"
Waiting for signal file...
Waiting for signal file...
Signal file found!
```

### プロセスが完了するまで待機する

```console
$ process_id=$!
$ until ! ps -p $process_id > /dev/null; do
>   echo "Process is still running..."
>   sleep 2
> done
> echo "Process has completed."
Process is still running...
Process is still running...
Process has completed.
```

### コマンドが成功するまで再試行する

```console
$ until ping -c 1 example.com > /dev/null; do
>   echo "Network not available, retrying in 5 seconds..."
>   sleep 5
> done
> echo "Network is up!"
Network not available, retrying in 5 seconds...
Network is up!
```

## ヒント:

### 必ず終了条件を含める

`until` ループには、最終的に条件を満たす方法があることを確認してください。そうしないと無限に実行されます。最大試行回数やタイムアウトを追加することを検討してください。

### コマンド終了ステータスとの併用

`until` ループはコマンド終了ステータス（成功は0、失敗は0以外）とうまく連携します。例えば、`until command; do something; done` は `command` が成功するまで実行し続けます。

### ポーリングには sleep と組み合わせる

条件の変化を待つ場合は、ループ内で `sleep` を使用して過剰なCPU使用を防ぎます。これは外部イベントを確認する際に特に役立ちます。

### 必要に応じてループから抜け出す

メインの条件が満たされる前に別の条件が満たされた場合に早期に終了するために、`until` ループ内で `break` コマンドを使用できます。

## よくある質問

#### Q1. `until` と `while` の違いは何ですか？
A. `while` は条件が真である限りコマンドを実行しますが、`until` は条件が偽である限り（真になるまで）コマンドを実行します。

#### Q2. すべてのシェルで `until` を使用できますか？
A. `until` は bash、zsh、kshなどの多くの現代的なシェルで利用可能ですが、dashやashのようなよりミニマルなシェルでは利用できない場合があります。

#### Q3. `until` での無限ループを防ぐにはどうすればよいですか？
A. 条件が最終的に真になることを確認するか、最大値を持つカウンターを含め、カウンターが上限に達したときに `break` を使用してループを終了させます。

#### Q4. `until` ループをネストできますか？
A. はい、`until` ループを他のループ内にネストできます。これには他の `until` ループ、`while` ループ、または `for` ループが含まれます。

## 参考文献

https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html

## 改訂履歴

- 2025/05/05 初版