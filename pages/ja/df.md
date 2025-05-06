# df コマンド

ファイルシステムのディスク容量使用状況を表示します。

## 概要

`df` コマンドはファイルシステムのディスク容量使用状況を報告し、マウントされたファイルシステムの合計サイズ、使用済み容量、利用可能な容量、マウントポイントなどの情報を表示します。ディスク容量を監視し、容量が不足しているファイルシステムを特定するために一般的に使用されます。

## オプション

### **-h, --human-readable**

サイズを人間が読みやすい形式で表示します（例：1K、234M、2G）

```console
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        20G   15G  4.0G  79% /
tmpfs           3.9G     0  3.9G   0% /dev/shm
/dev/sda2       50G   20G   28G  42% /home
```

### **-T, --print-type**

ファイルシステムの種類を表示します

```console
$ df -T
Filesystem     Type     1K-blocks    Used Available Use% Mounted on
/dev/sda1      ext4      20971520 15728640   4194304  79% /
tmpfs          tmpfs      4096000        0   4096000   0% /dev/shm
/dev/sda2      ext4      52428800 20971520  29360128  42% /home
```

### **-i, --inodes**

ブロック使用量の代わりにiノード情報を表示します

```console
$ df -i
Filesystem      Inodes  IUsed   IFree IUse% Mounted on
/dev/sda1      1310720 354026  956694   27% /
tmpfs           999037      1  999036    1% /dev/shm
/dev/sda2      3276800 125892 3150908    4% /home
```

### **-a, --all**

ダミー、重複、またはアクセスできないファイルシステムも含めます

```console
$ df -a
Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/sda1       20971520 15728640   4194304  79% /
proc                   0        0         0    - /proc
sysfs                  0        0         0    - /sys
tmpfs            4096000        0   4096000   0% /dev/shm
/dev/sda2       52428800 20971520  29360128  42% /home
```

### **-P, --portability**

POSIX出力形式を使用します

```console
$ df -P
Filesystem     1024-blocks      Used  Available Capacity Mounted on
/dev/sda1          20971520  15728640    4194304      79% /
tmpfs               4096000         0    4096000       0% /dev/shm
/dev/sda2          52428800  20971520   29360128      42% /home
```

## 使用例

### 特定のファイルシステムの容量を確認する

```console
$ df -h /home
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2        50G   20G   28G  42% /home
```

### オプションを組み合わせて詳細情報を表示する

```console
$ df -hT
Filesystem     Type   Size  Used Avail Use% Mounted on
/dev/sda1      ext4    20G   15G  4.0G  79% /
tmpfs          tmpfs  3.9G     0  3.9G   0% /dev/shm
/dev/sda2      ext4    50G   20G   28G  42% /home
```

### 特殊なものを含むすべてのファイルシステムの容量を確認する

```console
$ df -ha
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        20G   15G  4.0G  79% /
proc               0     0     0    - /proc
sysfs              0     0     0    - /sys
tmpfs            3.9G     0  3.9G   0% /dev/shm
/dev/sda2        50G   20G   28G  42% /home
```

## ヒント

### 重要なファイルシステムに焦点を当てる

`df -h | grep -v tmpfs` を使用して一時的なファイルシステムをフィルタリングし、物理ディスクに焦点を当てます。

### 大きなファイルシステムを特定する

ソートと組み合わせて最大のファイルシステムを特定します：`df -h | sort -rh -k2`

### 重要なしきい値を監視する

使用率が高い（90％以上）ファイルシステムは、すぐに対応が必要になる可能性があるため注意してください。

### 特定のマウントポイントを確認する

トラブルシューティング時には、特定のマウントポイントを直接確認します：`df -h /var` で特定のディレクトリの容量不足を確認できます。

## よくある質問

#### Q1. "Use%"列は何を意味していますか？
A. ファイルシステムの容量のうち、現在使用されている割合を示しています。

#### Q2. より読みやすい形式でディスク容量を確認するにはどうすればよいですか？
A. `df -h` を使用すると、人間が読みやすいサイズ（KB、MB、GB）で表示されます。

#### Q3. 一部のファイルシステムがサイズ0と表示されるのはなぜですか？
A. /procや/sysのような特殊なファイルシステムは仮想的なもので、実際のディスク容量を消費しません。

#### Q4. iノードの使用状況を確認するにはどうすればよいですか？
A. `df -i` を使用すると、ブロック使用量の代わりにiノード情報が表示されます。

#### Q5. dfとduの違いは何ですか？
A. `df` はファイルシステムレベルでディスク容量使用状況を報告し、`du` はファイルとディレクトリレベルでディスク使用量を報告します。

## 参考資料

https://www.gnu.org/software/coreutils/manual/html_node/df-invocation.html

## 改訂履歴

- 2025/05/05 初版