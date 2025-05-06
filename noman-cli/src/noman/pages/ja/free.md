# free コマンド

システム内の空きメモリと使用中メモリの量を表示します。

## 概要

`free` コマンドは、システム内の物理メモリとスワップメモリの合計、使用中、空き容量を表示します。また、カーネルが使用しているバッファとキャッシュも表示します。メモリ使用状況のスナップショットを提供し、ユーザーがシステムリソースを監視し、メモリ関連の問題を診断するのに役立ちます。

## オプション

### **-b**

メモリ量をバイト単位で表示します。

```console
$ free -b
              total        used        free      shared  buff/cache   available
Mem:    8273514496  3868327936  1535881216   602931200  2869305344  3459538944
Swap:   2147479552           0  2147479552
```

### **-k**

メモリ量をキロバイト単位で表示します（デフォルト）。

```console
$ free -k
              total        used        free      shared  buff/cache   available
Mem:        8079604     3777664     1500860      588800     2801080     3378456
Swap:       2097148           0     2097148
```

### **-m**

メモリ量をメガバイト単位で表示します。

```console
$ free -m
              total        used        free      shared  buff/cache   available
Mem:           7889        3689        1465         574        2735        3299
Swap:          2047           0        2047
```

### **-g**

メモリ量をギガバイト単位で表示します。

```console
$ free -g
              total        used        free      shared  buff/cache   available
Mem:              7           3           1           0           2           3
Swap:             1           0           1
```

### **-h, --human**

すべての出力フィールドを自動的に最短の3桁単位にスケーリングし、単位を表示します。

```console
$ free -h
              total        used        free      shared  buff/cache   available
Mem:          7.7Gi       3.6Gi       1.4Gi       574Mi       2.7Gi       3.2Gi
Swap:         2.0Gi          0B       2.0Gi
```

### **-s, --seconds N**

N秒間隔で更新しながら結果を継続的に表示します。

```console
$ free -s 2
              total        used        free      shared  buff/cache   available
Mem:        8079604     3777664     1500860      588800     2801080     3378456
Swap:       2097148           0     2097148

              total        used        free      shared  buff/cache   available
Mem:        8079604     3778112     1500412      588800     2801080     3378008
Swap:       2097148           0     2097148
```

### **-t, --total**

列の合計を示す行を表示します。

```console
$ free -t
              total        used        free      shared  buff/cache   available
Mem:        8079604     3777664     1500860      588800     2801080     3378456
Swap:       2097148           0     2097148
Total:     10176752     3777664     3598008
```

### **-w, --wide**

ワイドモードに切り替えます。ワイドモードでは80文字より長い行が生成されます。このモードではバッファとキャッシュが別々の列で報告されます。

```console
$ free -w
              total        used        free      shared     buffers       cache   available
Mem:        8079604     3777664     1500860      588800      245760     2555320     3378456
Swap:       2097148           0     2097148
```

## 使用例

### 基本的なメモリ情報

```console
$ free
              total        used        free      shared  buff/cache   available
Mem:        8079604     3777664     1500860      588800     2801080     3378456
Swap:       2097148           0     2097148
```

### 人間が読みやすい形式で合計を表示

```console
$ free -ht
              total        used        free      shared  buff/cache   available
Mem:          7.7Gi       3.6Gi       1.4Gi       574Mi       2.7Gi       3.2Gi
Swap:         2.0Gi          0B       2.0Gi
Total:        9.7Gi       3.6Gi       3.4Gi
```

### 5秒間隔での継続的なモニタリング

```console
$ free -h -s 5
              total        used        free      shared  buff/cache   available
Mem:          7.7Gi       3.6Gi       1.4Gi       574Mi       2.7Gi       3.2Gi
Swap:         2.0Gi          0B       2.0Gi
```

## ヒント

### メモリ出力の理解

- **total**: インストールされた総メモリ
- **used**: 現在使用中のメモリ
- **free**: 未使用のメモリ
- **shared**: 複数のプロセスで共有されているメモリ
- **buff/cache**: カーネルバッファとページキャッシュで使用されているメモリ
- **available**: スワップなしで新しいアプリケーションを起動できる利用可能なメモリの推定値

### 「available」と「free」の解釈

システムに十分なメモリがあるかを評価する際は、「free」よりも「available」列の方が重要です。これには、解放して使用できるメモリが含まれています。

### 時間経過に伴うメモリのモニタリング

`free -s N`を使用して時間の経過とともにメモリ使用量をモニタリングすると、メモリリークや使用パターンを特定するのに役立ちます。

### キャッシュメモリのクリア

システム管理者は以下のコマンドでページキャッシュ、dentriesおよびinodesを解放できます：
```console
$ sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```
（注意：これは慎重に行うべきであり、通常の操作ではほとんど必要ありません）

## よくある質問

#### Q1. 「free」メモリが非常に少ないとはどういう意味ですか？
A. 空きメモリが少ないことは必ずしも問題ではありません。Linuxはパフォーマンス向上のためにディスクキャッシュとして利用可能なメモリを使用します。アプリケーションに割り当て可能なメモリの良い指標として「available」列を見てください。

#### Q2. なぜスワップメモリが使用されていないのですか？
A. スワップは物理メモリがほぼ使い果たされた場合や、非アクティブなメモリページに対してのみ使用されます。システムに十分なRAMがある場合、スワップは使用されないままかもしれません。

#### Q3. メモリ使用量を継続的に監視するにはどうすればよいですか？
A. `free -s N`を使用します。Nは更新間隔の秒数です。例えば、`free -s 5`は5秒ごとに更新されます。

#### Q4. バッファとキャッシュの違いは何ですか？
A. バッファはブロックデバイスI/Oに使用され、キャッシュはファイルシステムページに使用されます。標準出力では「buff/cache」として結合されていますが、`-w`オプションで別々に表示できます。

## 参考文献

https://www.man7.org/linux/man-pages/man1/free.1.html

## 改訂履歴

- 2025/05/05 初版