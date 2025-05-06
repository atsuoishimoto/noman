# iostatコマンド

CPUとデバイスおよびパーティションのI/O統計情報を表示します。

## 概要

`iostat`はCPU統計情報とデバイス、パーティション、ネットワークファイルシステムの入出力統計情報を報告します。主にシステムの入出力デバイスの負荷を、デバイスがアクティブな時間と平均転送速度の関係を観察することによって監視するために使用されます。

## オプション

### **-c**

CPU統計情報のみを表示します。

```console
$ iostat -c
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98
```

### **-d**

デバイス統計情報のみを表示します。

```console
$ iostat -d
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               5.73       141.61        45.28         0.00    1250432     399764          0
sdb               0.02         0.63         0.00         0.00       5548          0          0
```

### **-x**

デバイスの拡張統計情報を表示します。

```console
$ iostat -x
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
sda              4.21    1.52    141.61     45.28     0.10     0.57   2.33  27.29    0.63    2.38   0.01    33.63    29.72   0.28   0.16
sdb              0.02    0.00      0.63      0.00     0.00     0.00   0.00   0.00    0.71    0.00   0.00    31.53     0.00   0.57   0.00
```

### **-k**

統計情報を1秒あたりのキロバイト単位で表示します。

```console
$ iostat -k
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               5.73       141.61        45.28         0.00    1250432     399764          0
sdb               0.02         0.63         0.00         0.00       5548          0          0
```

### **-m**

統計情報を1秒あたりのメガバイト単位で表示します。

```console
$ iostat -m
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device             tps    MB_read/s    MB_wrtn/s    MB_dscd/s    MB_read    MB_wrtn    MB_dscd
sda               5.73         0.14         0.04         0.00       1221        390          0
sdb               0.02         0.00         0.00         0.00          5          0          0
```

### **-p [device]**

ブロックデバイスとそのすべてのパーティションの統計情報を表示します。

```console
$ iostat -p sda
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               5.73       141.61        45.28         0.00    1250432     399764          0
sda1              0.01         0.32         0.00         0.00       2832          0          0
sda2              5.71       141.29        45.28         0.00    1247600     399764          0
```

### **-t**

各レポートの時間を表示します。

```console
$ iostat -t
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

05/05/2025 10:15:30 AM
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               5.73       141.61        45.28         0.00    1250432     399764          0
sdb               0.02         0.63         0.00         0.00       5548          0          0
```

### **interval [count]**

レポートの間隔（秒単位）とレポート数を指定します。

```console
$ iostat 2 3
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               5.73       141.61        45.28         0.00    1250432     399764          0
sdb               0.02         0.63         0.00         0.00       5548          0          0

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.50    0.00    1.75    0.25    0.00   94.50

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda              10.50       320.00       112.00         0.00        640        224          0
sdb               0.00         0.00         0.00         0.00          0          0          0

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.38    0.00    1.50    0.12    0.00   95.00

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               8.00       256.00        64.00         0.00        512        128          0
sdb               0.00         0.00         0.00         0.00          0          0          0
```

## 使用例

### 拡張統計情報によるディスクI/Oの監視

```console
$ iostat -xd 5
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
sda              4.21    1.52    141.61     45.28     0.10     0.57   2.33  27.29    0.63    2.38   0.01    33.63    29.72   0.28   0.16
sdb              0.02    0.00      0.63      0.00     0.00     0.00   0.00   0.00    0.71    0.00   0.00    31.53     0.00   0.57   0.00

[5秒ごとに出力が繰り返されます]
```

### 特定のパーティションの監視

```console
$ iostat -p sda 2
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               5.73       141.61        45.28         0.00    1250432     399764          0
sda1              0.01         0.32         0.00         0.00       2832          0          0
sda2              5.71       141.29        45.28         0.00    1247600     399764          0

[2秒ごとに出力が繰り返されます]
```

### CPUとディスク統計情報をメガバイト単位で表示

```console
$ iostat -cm 1 3
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

[1秒間隔で3回出力が繰り返されます]
```

## ヒント

### %utilの理解

%utilメトリックは、デバイスにI/Oリクエストが発行されている間のCPU時間の割合を示します。100%に近い値は飽和状態を示し、デバイスが最大容量で動作していることを意味します。

### I/Oボトルネックの特定

awaitカラム（I/Oリクエストが処理されるまでの平均時間）の高い値に注目してください。高いawait時間と高い%util値の組み合わせは、潜在的なI/Oボトルネックを示しています。

### 継続的な監視

リアルタイム監視には、間隔を指定して`iostat`を使用します（例：`iostat -x 2`）。これにより、Ctrl+Cで中断されるまで、2秒ごとに統計情報が継続的に更新されます。

### 他のツールとの組み合わせ

包括的なシステムパフォーマンス分析のために、`iostat`を`top`、`vmstat`、`sar`などのツールと組み合わせて使用してください。

## よくある質問

#### Q1. CPU統計情報の%iowait値は何を意味しますか？
A. %iowaitは、システムがディスクI/Oリクエストを保留している間にCPUがアイドル状態だった時間の割合を表します。高いiowait値は、システムがディスク操作によってボトルネックになっていることを示します。

#### Q2. r_awaitとw_awaitカラムはどのように解釈すればよいですか？
A. r_awaitとw_awaitは、読み取りおよび書き込みリクエストが処理されるまでの平均時間（ミリ秒単位）を示し、キュー内の待機時間とサービス時間が含まれます。値が高いほど、I/O操作が遅いことを示します。

#### Q3. tpsとIOPSの違いは何ですか？
A. tps（1秒あたりの転送数）は、サイズに関係なく1秒あたりに完了したI/Oリクエストの数を表します。IOPS（1秒あたりのI/O操作数）は本質的に同じメトリックですが、ストレージパフォーマンスの議論でよく使用されます。

#### Q4. 特定のデバイスの統計情報だけを見るにはどうすればよいですか？
A. `iostat -d デバイス名`を使用して、指定したデバイスの統計情報のみを表示します。

## 参考文献

https://man7.org/linux/man-pages/man1/iostat.1.html

## 改訂履歴

- 2025/05/05 初版