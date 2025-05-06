# vmstatコマンド

仮想メモリの統計情報を報告します。

## 概要

`vmstat`はシステムメモリ、プロセス、ページング、ブロックI/O、トラップ、CPUアクティビティに関する情報を表示します。システムリソースの使用状況のスナップショットを提供し、特にメモリ、CPU、またはI/Oに関連するパフォーマンスのボトルネックを特定するのに役立ちます。

## オプション

### **-a**

アクティブおよび非アクティブメモリを表示します

```console
$ vmstat -a
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free  inact active   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 7123456 2345678 1234567    0    0     0     2   51   92  1  1 98  0  0
```

### **-d**

ディスク統計情報を表示します

```console
$ vmstat -d
disk- ------------reads------------ ------------writes----------- -----IO------
       total merged sectors      ms  total merged sectors      ms    cur    sec
sda    12687   2713  972258   13364  10347   9944 1766952   23694      0     11
```

### **-s**

様々なイベントカウンターとメモリ統計情報のテーブルを表示します

```console
$ vmstat -s
      8169348 K total memory
       986168 K used memory
      1247848 K active memory
      2345678 K inactive memory
      7183180 K free memory
        16384 K buffer memory
      1983616 K swap cache
      8388604 K total swap
            0 K used swap
      8388604 K free swap
       123456 non-nice user cpu ticks
          234 nice user cpu ticks
        56789 system cpu ticks
     12345678 idle cpu ticks
         1234 IO-wait cpu ticks
            0 IRQ cpu ticks
          123 softirq cpu ticks
            0 stolen cpu ticks
       567890 pages paged in
      1234567 pages paged out
            0 pages swapped in
            0 pages swapped out
      5678901 interrupts
     12345678 CPU context switches
   1234567890 boot time
        12345 forks
```

### **-S**

メモリ値を表示する単位サイズ（k、K、m、M）を指定します

```console
$ vmstat -S M
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0   6953      0   1937    0    0     0     2   51   92  1  1 98  0  0
```

### **interval [count]**

指定した間隔（秒単位）で統計情報を継続的に表示します

```console
$ vmstat 2 5
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 7123456  16384 1983616    0    0     0     2   51   92  1  1 98  0  0
 0  0      0 7123456  16384 1983616    0    0     0     0   45   89  0  0 100  0  0
 0  0      0 7123456  16384 1983616    0    0     0     0   46   88  0  0 100  0  0
 0  0      0 7123456  16384 1983616    0    0     0     0   45   87  0  0 100  0  0
 0  0      0 7123456  16384 1983616    0    0     0    12   48   90  0  0 99  1  0
```

## 使用例

### 基本的なメモリとCPU統計情報

```console
$ vmstat
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 7123456  16384 1983616    0    0     0     2   51   92  1  1 98  0  0
```

### 5秒ごとに10回繰り返してシステムパフォーマンスを監視

```console
$ vmstat 5 10
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 7123456  16384 1983616    0    0     0     2   51   92  1  1 98  0  0
 0  0      0 7123456  16384 1983616    0    0     0     0   45   89  0  0 100  0  0
[さらに8回の出力が続きます]
```

### タイムスタンプ付きでディスク統計情報を表示

```console
$ vmstat -d -t
disk- ------------reads------------ ------------writes----------- -----IO------   ----timestamp----
       total merged sectors      ms  total merged sectors      ms    cur    sec
sda    12687   2713  972258   13364  10347   9944 1766952   23694      0     11   2025-05-05 10:15:30
```

## ヒント

### 出力列の理解

- **procs**: `r`は実行可能なプロセス、`b`はブロックされたプロセスを示します
- **memory**: `swpd`は使用された仮想メモリ、`free`はアイドル状態のメモリです
- **swap**: `si`はスワップインされたメモリ、`so`はスワップアウトされたメモリです
- **io**: `bi`はブロックデバイスから受信したブロック、`bo`は送信したブロックです
- **system**: `in`は1秒あたりの割り込み、`cs`はコンテキストスイッチです
- **cpu**: CPUタイムの割合（ユーザーモード`us`、システムモード`sy`、アイドル`id`、I/O待ち`wa`、ハイパーバイザーに奪われた`st`）

### 最初の行と後続の行の違い

`vmstat`出力の最初の行は前回の再起動からの平均値を示し、後続の行は指定された間隔中のアクティビティを示します。リアルタイム分析では、最初の行の後の行に注目してください。

### メモリ圧迫の識別

`si`と`so`列の高い値は、システムがメモリをディスクにスワップしていることを示し、パフォーマンスに深刻な影響を与える可能性があります。これは、より多くのRAMが必要か、メモリ使用量を最適化する必要があることを示唆しています。

### I/Oボトルネックの検出

CPU統計の`wa`列の高い値は、プロセスがI/O操作の完了を待っていることを示します。これはディスクのボトルネックを示している可能性があります。

## よくある質問

#### Q1. 'r'列の高い値は何を示しますか？
A. 'r'列の高い数値は、多くのプロセスがCPU時間を待っていることを示し、CPUの競合または不十分なCPUリソースを示唆しています。

#### Q2. vmstatでのスワップアクティビティをどのように解釈すればよいですか？
A. 'si'と'so'列はスワップインとスワップアウトのアクティビティを示します。ゼロ以外の値はシステムがスワップスペースを使用していることを示し、パフォーマンスが低下する可能性があります。一貫して高い値はメモリ不足を示唆しています。

#### Q3. メモリセクションの'buff'と'cache'の違いは何ですか？
A. 'buff'（バッファ）はファイルシステムのメタデータに使用されるメモリで、'cache'はファイルの内容に使用されるメモリです。どちらもファイルシステムのパフォーマンスを向上させるために使用され、アプリケーションがメモリを必要とするときに再利用できます。

#### Q4. vmstatでディスクI/Oを監視するにはどうすればよいですか？
A. `vmstat -d`を使用して、読み取り、書き込み、I/O時間を含む詳細なディスク統計情報を表示します。

## 参考文献

https://man7.org/linux/man-pages/man8/vmstat.8.html

## 改訂履歴

- 2025/05/05 初版