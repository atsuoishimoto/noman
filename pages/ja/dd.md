# ddコマンド

ブロックレベルの操作でファイルを変換・コピーします。

## 概要

`dd`コマンドは、指定されたブロックサイズを使用してファイル間でデータをコピーし、コピー中に変換を実行します。ディスクイメージの作成、パーティションのバックアップ、ディスクの消去、I/Oパフォーマンスのベンチマークなどのタスクによく使用されます。ほとんどのUnixコマンドとは異なり、`dd`は従来のフラグではなく、`オプション=値`のペアを使用する独自の構文を持っています。

## オプション

### **if=FILE**

読み込む入力ファイルを指定します。指定しない場合は標準入力が使用されます。

```console
$ dd if=/dev/sda
```

### **of=FILE**

書き込む出力ファイルを指定します。指定しない場合は標準出力が使用されます。

```console
$ dd if=/dev/sda of=/dev/sdb
```

### **bs=BYTES**

入力と出力の両方のブロックサイズをBYTESに設定します。これはパフォーマンスに大きく影響します。

```console
$ dd if=/dev/zero of=testfile bs=1M count=100
100+0 records in
100+0 records out
104857600 bytes (105 MB, 100 MiB) transferred in 0.083 seconds, 1.3 GB/s
```

### **count=N**

N個の入力ブロックのみをコピーします。コピーするデータ量を制限します。

```console
$ dd if=/dev/urandom of=random.dat bs=1M count=10
10+0 records in
10+0 records out
10485760 bytes (10 MB, 10 MiB) transferred in 0.035 seconds, 299 MB/s
```

### **status=LEVEL**

dd実行中に表示される情報を制御します：
- `none`：完了するまで出力なし
- `noxfer`：最終的な転送統計を抑制
- `progress`：定期的な転送統計を表示

```console
$ dd if=/dev/zero of=testfile bs=1G count=1 status=progress
536870912 bytes (537 MB, 512 MiB) copied, 0.5 s, 1.1 GB/s
1+0 records in
1+0 records out
1073741824 bytes (1.1 GB, 1.0 GiB) transferred in 0.969 seconds, 1.1 GB/s
```

### **conv=CONVS**

データに変換を実行します。複数の変換をカンマで区切って指定できます：
- `sync`：入力ブロックをゼロでパディング
- `noerror`：読み取りエラー後も継続
- `notrunc`：出力ファイルを切り詰めない

```console
$ dd if=/dev/sda of=disk.img conv=sync,noerror
```

## 使用例

### ブート可能なUSBドライブの作成

```console
$ sudo dd if=ubuntu.iso of=/dev/sdb bs=4M status=progress
1485881344 bytes (1.5 GB, 1.4 GiB) copied, 120 s, 12.4 MB/s
354+1 records in
354+1 records out
1485881344 bytes (1.5 GB, 1.4 GiB) transferred in 120.023 seconds, 12.4 MB/s
```

### ディスクイメージの作成

```console
$ sudo dd if=/dev/sda of=disk_backup.img bs=8M status=progress
20971520000 bytes (21 GB, 20 GiB) copied, 300 s, 70 MB/s
2500+0 records in
2500+0 records out
20971520000 bytes (21 GB, 20 GiB) transferred in 300.123 seconds, 69.9 MB/s
```

### ディスクをゼロで消去

```console
$ sudo dd if=/dev/zero of=/dev/sdb bs=8M status=progress
8589934592 bytes (8.6 GB, 8.0 GiB) copied, 120 s, 71.6 MB/s
1024+0 records in
1024+0 records out
8589934592 bytes (8.6 GB, 8.0 GiB) transferred in 120.001 seconds, 71.6 MB/s
```

## ヒント

### 適切なブロックサイズを使用する

`bs`パラメータはパフォーマンスに大きく影響します。ほとんどの操作では、1Mから8Mの値が良いパフォーマンスを提供します。デフォルトの512バイトのように小さすぎると非常に遅くなり、大きすぎるとメモリを無駄に消費する可能性があります。

### 常にstatus=progressを使用する

`status=progress`を追加すると、長時間実行される操作のリアルタイムフィードバックが提供されます。これは大量のデータをコピーする際に不可欠です。

### 進捗状況の更新にSIGUSR1シグナルを送信する

`status=progress`を使用し忘れた場合、USR1シグナルを送信して進捗状況の更新を取得できます：

```console
$ kill -USR1 $(pgrep dd)
```

### デバイス名には細心の注意を払う

ddを実行する前にデバイス名（`/dev/sda`など）を二重確認してください。間違った出力デバイスを使用するとデータが破壊される可能性があります。`lsblk`コマンドは正しいデバイスを識別するのに役立ちます。

## よくある質問

#### Q1. なぜddは「ディスクデストロイヤー」と呼ばれるのですか？
A. このニックネームは、確認なしにディスクを完全に上書きする能力に由来します。デバイス名の単純なタイプミスが壊滅的なデータ損失につながる可能性があります。

#### Q2. ddをより速く実行するにはどうすればよいですか？
A. より大きなブロックサイズ（bs=4Mまたはbs=8M）を使用し、I/Oのボトルネックに当たっていないことを確認し、特定の操作ではバッファキャッシュをバイパスするために`oflag=direct`の使用を検討してください。

#### Q3. ddの進捗状況を監視するにはどうすればよいですか？
A. `status=progress`オプションを使用するか、`kill -USR1 $(pgrep dd)`でddプロセスにUSR1シグナルを送信します。

#### Q4. なぜddは他のUnixコマンドとは異なる構文を使用するのですか？
A. ddの構文（オプション=値）はIBMのJCL（ジョブ制御言語）に由来し、Unixに実装された際に歴史的な理由で保存されました。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/dd-invocation.html

## 改訂履歴

- 2025/05/05 初版