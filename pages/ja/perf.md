# perfコマンド

Linuxのパフォーマンス分析ツールで、ハードウェアカウンタの統計情報やトレース機能を提供します。

## 概要

`perf`は、CPUのパフォーマンスモニタリングハードウェアカウンタにアクセスしてプログラム実行に関する統計情報を収集する、強力なLinuxプロファイリングツールです。CPUパフォーマンスイベントのモニタリング、システムコールのトレース、アプリケーションのプロファイリング、ハードウェアおよびソフトウェアイベントの分析が可能です。Linuxカーネルツールの一部であり、アプリケーションやシステムのパフォーマンスボトルネックを特定するのに役立ちます。

## オプション

### **stat**

コマンドを実行し、パフォーマンスカウンタの統計情報を収集します

```console
$ perf stat ls
Documents  Downloads  Pictures  Videos

 Performance counter stats for 'ls':

              0.93 msec task-clock                #    0.781 CPUs utilized          
                 0      context-switches          #    0.000 K/sec                  
                 0      cpu-migrations            #    0.000 K/sec                  
                89      page-faults               #    0.096 M/sec                  
           1,597,086      cycles                  #    1.724 GHz                    
           1,221,363      instructions            #    0.76  insn per cycle         
             245,931      branches                #  265.518 M/sec                  
              10,764      branch-misses           #    4.38% of all branches        

       0.001189061 seconds time elapsed

       0.001090000 seconds user
       0.000000000 seconds sys
```

### **record**

後の分析のためにパフォーマンスデータを記録します

```console
$ perf record -g ./myprogram
[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 0.064 MB perf.data (1302 samples) ]
```

### **report**

以前の記録からパフォーマンスデータを表示します

```console
$ perf report
# Samples: 1302
#
# Overhead  Command      Shared Object        Symbol
# ........  .......  .................  ..............
#
    35.71%  myprogram  myprogram           [.] process_data
    24.58%  myprogram  libc-2.31.so        [.] malloc
    15.21%  myprogram  myprogram           [.] calculate_result
```

### **top**

Linuxのシステムプロファイリングツールで、topに似ていますがパフォーマンスカウンタ情報を含みます

```console
$ perf top
Samples: 42K of event 'cycles', 4000 Hz, Event count (approx.): 10456889073
Overhead  Shared Object                       Symbol
  12.67%  [kernel]                            [k] _raw_spin_unlock_irqrestore
   4.71%  [kernel]                            [k] finish_task_switch
   2.82%  [kernel]                            [k] __schedule
   2.40%  firefox                             [.] 0x00000000022e002d
```

### **list**

モニタリング可能なイベントを一覧表示します

```console
$ perf list
List of pre-defined events (to be used in -e):

  cpu-cycles OR cycles                               [Hardware event]
  instructions                                       [Hardware event]
  cache-references                                   [Hardware event]
  cache-misses                                       [Hardware event]
  branch-instructions OR branches                    [Hardware event]
  branch-misses                                      [Hardware event]
  ...
```

### **-e, --event**

モニタリングするイベントを指定します（他のコマンドと共に使用）

```console
$ perf stat -e cycles,instructions,cache-misses ./myprogram
 Performance counter stats for './myprogram':

     1,234,567,890      cycles
       987,654,321      instructions              #    0.80  insn per cycle
         5,432,109      cache-misses

       1.234567890 seconds time elapsed
```

### **-p, --pid**

PIDで特定のプロセスをモニタリングします

```console
$ perf record -p 1234
^C[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 0.452 MB perf.data (2371 samples) ]
```

### **-g, --call-graph**

コールグラフ（スタックチェーン/バックトレース）の記録を有効にします

```console
$ perf record -g ./myprogram
[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 0.128 MB perf.data (2567 samples) ]
```

## 使用例

### コマンドのCPU使用状況のプロファイリング

```console
$ perf stat -d ls -la
total 56
drwxr-xr-x  9 user user 4096 May  5 10:00 .
drwxr-xr-x 28 user user 4096 May  4 15:30 ..
-rw-r--r--  1 user user 8980 May  5 09:45 file.txt

 Performance counter stats for 'ls -la':

              1.52 msec task-clock                #    0.812 CPUs utilized          
                 0      context-switches          #    0.000 K/sec                  
                 0      cpu-migrations            #    0.000 K/sec                  
               102      page-faults               #    0.067 M/sec                  
         3,842,901      cycles                    #    2.530 GHz                    
         5,779,212      instructions              #    1.50  insn per cycle         
         1,059,631      branches                  #  697.128 M/sec                  
            36,789      branch-misses             #    3.47% of all branches        
         1,254,898      L1-dcache-loads           #  825.590 M/sec                  
            45,632      L1-dcache-load-misses     #    3.64% of all L1-dcache accesses

       0.001871938 seconds time elapsed

       0.001871000 seconds user
       0.000000000 seconds sys
```

### アプリケーションパフォーマンスの記録と分析

```console
$ perf record -g ./myapplication
[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 0.253 MB perf.data (3842 samples) ]

$ perf report
# To display the perf.data header info, please use --header/--header-only options.
#
# Samples: 3K of event 'cycles'
# Event count (approx.): 3842000000
#
# Overhead  Command        Shared Object        Symbol
# ........  .......  .................  ..............
#
    35.42%  myapplication  myapplication        [.] process_data
    21.67%  myapplication  libc-2.31.so         [.] malloc
    15.89%  myapplication  myapplication        [.] calculate_result
```

### 特定のハードウェアイベントのモニタリング

```console
$ perf stat -e L1-dcache-loads,L1-dcache-load-misses,L1-dcache-stores ./myprogram
 Performance counter stats for './myprogram':

       123,456,789      L1-dcache-loads
         2,345,678      L1-dcache-load-misses     #    1.90% of all L1-dcache accesses
        98,765,432      L1-dcache-stores

       2.345678901 seconds time elapsed
```

## ヒント:

### 完全なアクセスのためにrootとして実行

多くのperf機能はroot権限を必要とします。すべてのハードウェアカウンタとシステム全体のプロファイリング機能にアクセスするには、`sudo perf`を使用してください。

### 視覚化のためにフレームグラフを使用

分析を容易にするために、perfデータをフレームグラフに変換します：
```console
$ perf record -g ./myprogram
$ perf script | FlameGraph/stackcollapse-perf.pl | FlameGraph/flamegraph.pl > flamegraph.svg
```

### ホットスポットに集中

パフォーマンスデータを分析する際は、オーバーヘッドの割合が最も高い関数に最初に集中してください。これらは最適化の機会が最も大きい部分です。

### 記録中のオーバーヘッドを削減

本番環境でのプロファイリングでは、`-F`を使用して低い頻度でサンプリングし、パフォーマンスへの影響を減らします：
```console
$ perf record -F 99 -g -p 1234
```

### ソースコードの注釈付け

`perf annotate`を使用して、パフォーマンスの問題を引き起こしている特定のコード行を確認します：
```console
$ perf annotate -d ./myprogram
```

## よくある質問

#### Q1. perf statとperf recordの違いは何ですか？
A. `perf stat`はコマンド完了後にパフォーマンスメトリクスの要約を提供するのに対し、`perf record`は後で`perf report`で分析できる詳細なパフォーマンスデータを取得します。

#### Q2. 実行中のプロセスをプロファイリングするにはどうすればよいですか？
A. `perf record -p PID`を使用して、プロセスIDで実行中のプロセスにアタッチします。

#### Q3. perf reportの出力をどのように解釈すればよいですか？
A. 「Overhead」列は各関数に起因するサンプルの割合を示し、パフォーマンスのボトルネックを特定するのに役立ちます。割合が高いほど、その関数がより多くのCPU時間を消費していることを示します。

#### Q4. perfはGPUパフォーマンスをプロファイリングできますか？
A. 標準のperfは主にCPUとシステムパフォーマンスに焦点を当てています。GPUプロファイリングには、NVIDIAのnvprofやAMDのROCmプロファイラなどの専用ツールがより適しています。

#### Q5. perf.dataファイルのサイズを小さくするにはどうすればよいですか？
A. `--freq`または`-F`オプションを使用してサンプリングレートを下げるか、`-a`オプションと時間指定を使用してデータ収集期間を制限します。

## 参考文献

https://perf.wiki.kernel.org/index.php/Main_Page

## 改訂履歴

- 2025/05/05 初版