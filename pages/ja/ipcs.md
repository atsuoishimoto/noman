# ipcs コマンド

アクティブなIPCファシリティ（共有メモリセグメント、メッセージキュー、セマフォ）に関する情報を表示します。

## 概要

`ipcs`コマンドは、システム上で現在アクティブなSystem V間プロセス通信（IPC）リソースに関する情報を表示します。共有メモリセグメント、メッセージキュー、セマフォ配列のID、所有者、権限、使用統計などの詳細を表示します。

## オプション

### **-a**

3つのリソースすべてについてすべての情報を表示します（デフォルトの動作）。

```console
$ ipcs -a
------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages    
0x00000000 0          root       644        0            0           

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status      
0x00000000 0          root       644        80         2          dest         

------ Semaphore Arrays --------
key        semid      owner      perms      nsems     
0x00000000 0          root       644        1
```

### **-q**

アクティブなメッセージキューに関する情報を表示します。

```console
$ ipcs -q
------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages    
0x00000000 0          root       644        0            0
```

### **-m**

アクティブな共有メモリセグメントに関する情報を表示します。

```console
$ ipcs -m
------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status      
0x00000000 0          root       644        80         2          dest
```

### **-s**

アクティブなセマフォ配列に関する情報を表示します。

```console
$ ipcs -s
------ Semaphore Arrays --------
key        semid      owner      perms      nsems     
0x00000000 0          root       644        1
```

### **-t**

IPCファシリティの時間情報を表示します。

```console
$ ipcs -t -m
------ Shared Memory Operation/Change Times --------
shmid      last-op                    last-changed              
0          Wed May  5 10:15:35 2025   Wed May  5 10:15:35 2025
```

### **-p**

IPCファシリティを使用または作成しているプロセスIDを表示します。

```console
$ ipcs -p -m
------ Shared Memory Creator/Last-op PIDs --------
shmid      owner      cpid       lpid      
0          root       1234       5678
```

### **-c**

作成者と所有者の情報を表示します。

```console
$ ipcs -c -m
------ Shared Memory Segment Creators/Owners --------
shmid      perms      cuid       cgid       uid        gid       
0          644        0          0          0          0
```

## 使用例

### 詳細情報を含むすべてのIPCリソースを表示

```console
$ ipcs -a
------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages    
0x00000000 0          root       644        0            0           

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status      
0x00000000 0          root       644        80         2          dest         

------ Semaphore Arrays --------
key        semid      owner      perms      nsems     
0x00000000 0          root       644        1
```

### IPCリソースの制限を表示

```console
$ ipcs -l
------ Messages Limits --------
max queues system wide = 32000
max size of message (bytes) = 8192
default max size of queue (bytes) = 16384

------ Shared Memory Limits --------
max number of segments = 4096
max seg size (kbytes) = 18014398509465599
max total shared memory (kbytes) = 18014398509481980
min seg size (bytes) = 1

------ Semaphore Limits --------
max number of arrays = 32000
max semaphores per array = 32000
max semaphores system wide = 1024000000
max ops per semop call = 500
semaphore max value = 32767
```

## ヒント:

### リソースリークの特定

`ipcs`を定期的に使用してIPCリソースを監視しましょう。アプリケーションが終了した後も残っているリソースがある場合、クリーンアップが必要なリソースリークを示している可能性があります。

### 古いIPCリソースのクリーンアップ

`ipcrm`コマンドを使用して、`ipcs`で特定された未使用のIPCリソースを削除します。例えば、`ipcrm -m <shmid>`は共有メモリセグメントを削除します。

### リソース制限の確認

`ipcs -l`を使用して、IPCリソースのシステム全体の制限を確認します。これは、リソース制約に達している可能性のあるアプリケーションのトラブルシューティングに役立ちます。

## よくある質問

#### Q1. 3つのIPCファシリティの違いは何ですか？
A. 共有メモリセグメントはプロセスが直接メモリを共有することを可能にし、メッセージキューはプロセスがメッセージを交換できるようにし、セマフォはプロセス間の同期メカニズムを提供します。

#### Q2. IPCリソースを削除するにはどうすればよいですか？
A. 適切なオプションとIDを指定して`ipcrm`コマンドを使用します。例えば、`ipcrm -m <shmid>`は共有メモリセグメントを削除し、`ipcrm -q <msqid>`はメッセージキューを削除し、`ipcrm -s <semid>`はセマフォ配列を削除します。

#### Q3. 実行中のプロセスに属さないIPCリソースが表示されるのはなぜですか？
A. これらは、適切にクリーンアップせずに終了したプロセスから残された孤立リソースである可能性が高いです。もう必要ない場合は`ipcrm`を使用して削除してください。

#### Q4. 特定のIPCリソースを使用しているプロセスを確認するにはどうすればよいですか？
A. `ipcs -p`を使用して、IPCリソースの作成者と最後の操作者のプロセスID（PID）を表示します。

## 参考資料

https://man7.org/linux/man-pages/man1/ipcs.1.html

## 改訂履歴

- 2025/05/05 初版