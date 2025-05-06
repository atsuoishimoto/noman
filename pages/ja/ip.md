# ip コマンド

ネットワークインターフェース、ルーティング、アドレスを管理するためのネットワーク設定ツールです。

## 概要

`ip` コマンドは、Linuxシステムでネットワークインターフェース、ルーティングテーブル、アドレスを設定・監視するための強力なユーティリティです。iproute2パッケージの一部であり、ifconfig、route、netstatなどの古いネットワークコマンドよりも多くの機能を提供します。このコマンドは、オブジェクト（link、address、routeなど）の後にコマンドとオプションが続く構造化された構文に従います。

## オプション

### **help**

特定のオブジェクトのヘルプ情報を表示します

```console
$ ip help
Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
       ip [ -force ] -batch filename
where  OBJECT := { link | address | addrlabel | route | rule | neigh | ntable |
                   tunnel | tuntap | maddress | mroute | mrule | monitor | xfrm |
                   netns | l2tp | fou | macsec | tcp_metrics | token | netconf | ila |
                   vrf | sr | nexthop | mptcp }
       OPTIONS := { -V[ersion] | -s[tatistics] | -d[etails] | -r[esolve] |
                    -h[uman-readable] | -iec | -j[son] | -p[retty] |
                    -f[amily] { inet | inet6 | mpls | bridge | link } |
                    -4 | -6 | -I | -D | -M | -B | -0 |
                    -l[oops] { maximum-addr-flush-attempts } | -br[ief] |
                    -o[neline] | -t[imestamp] | -ts[hort] | -b[atch] [filename] |
                    -rc[vbuf] [size] | -n[etns] name | -N[umeric] | -a[ll] |
                    -c[olor]}
```

### **-s, --stats, --statistics**

より多くの情報/統計を表示します

```console
$ ip -s link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    RX: bytes  packets  errors  dropped overrun mcast   
    3800       38       0       0       0       0       
    TX: bytes  packets  errors  dropped carrier collsns 
    3800       38       0       0       0       0       
```

### **-d, --details**

詳細情報を表示します

```console
$ ip -d link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00 promiscuity 0 minmtu 0 maxmtu 0 
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
```

### **-h, --human, --human-readable**

統計を人間が読みやすい形式で表示します

```console
$ ip -h -s link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    RX: bytes  packets  errors  dropped overrun mcast   
    3.8K       38       0       0       0       0       
    TX: bytes  packets  errors  dropped carrier collsns 
    3.8K       38       0       0       0       0       
```

### **-br, --brief**

簡潔な出力を表示します

```console
$ ip -br address show
lo               UNKNOWN        127.0.0.1/8 ::1/128 
eth0             UP             192.168.1.100/24 fe80::a00:27ff:fe74:ddaa/64
```

### **-c, --color**

カラー出力を使用します

```console
$ ip -c link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
```

## 使用例

### ネットワークインターフェースの表示

```console
$ ip link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:74:dd:aa brd ff:ff:ff:ff:ff:ff
```

### IPアドレスの表示

```console
$ ip address show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:74:dd:aa brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic eth0
       valid_lft 86389sec preferred_lft 86389sec
    inet6 fe80::a00:27ff:fe74:ddaa/64 scope link 
       valid_lft forever preferred_lft forever
```

### インターフェースにIPアドレスを追加する

```console
$ sudo ip address add 192.168.1.200/24 dev eth0
```

### インターフェースを有効化または無効化する

```console
$ sudo ip link set eth0 up
$ sudo ip link set eth0 down
```

### ルーティングテーブルの表示

```console
$ ip route show
default via 192.168.1.1 dev eth0 proto dhcp metric 100 
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100 metric 100 
```

### 静的ルートの追加

```console
$ sudo ip route add 10.0.0.0/24 via 192.168.1.254
```

## ヒント:

### 簡潔な出力で素早く概要を確認する

`-br` オプションを使用すると、ネットワーク情報が簡潔な表形式で表示され、複数のインターフェースを素早く確認できます。

```console
$ ip -br link
lo               UNKNOWN        00:00:00:00:00:00 <LOOPBACK,UP,LOWER_UP> 
eth0             UP             08:00:27:74:dd:aa <BROADCAST,MULTICAST,UP,LOWER_UP>
```

### IP設定の保存と復元

現在のIP設定をファイルに保存し、後で復元することができます：

```console
$ ip addr save > ip-config.txt
$ ip addr restore < ip-config.txt
```

### ネットワーク変更の監視

`ip monitor` コマンドを使用して、ネットワークの変更をリアルタイムで監視できます：

```console
$ ip monitor
```

### ネットワーク分離のための名前空間の使用

ネットワーク名前空間を使用すると、分離されたネットワーク環境を作成できます：

```console
$ sudo ip netns add mynetwork
$ sudo ip netns exec mynetwork ip link list
```

## よくある質問

#### Q1. `ip` と `ifconfig` の違いは何ですか？
A. `ip` はより新しく、強力で、`ifconfig` よりも多くの機能を提供します。一貫した構文でルーティングテーブル、ネットワークインターフェース、IPアドレスを管理できます。`ifconfig` は多くのLinuxディストリビューションで非推奨とされています。

#### Q2. 自分のIPアドレスを確認するにはどうすればよいですか？
A. `ip address show` または短縮形の `ip a` を使用して、すべてのIPアドレスを表示します。特定のインターフェースについては、`ip address show dev eth0` を使用します。

#### Q3. 一時的なIPアドレスを追加するにはどうすればよいですか？
A. `sudo ip address add 192.168.1.200/24 dev eth0` を使用して、eth0インターフェースにIPアドレスを追加します。このアドレスは、ネットワーク設定ファイルで設定されていない限り、再起動後に失われます。

#### Q4. インターフェースからすべてのIPアドレスを削除するにはどうすればよいですか？
A. `sudo ip address flush dev eth0` を使用して、eth0インターフェースからすべてのIPアドレスを削除します。

#### Q5. ルーティングテーブルを表示するにはどうすればよいですか？
A. `ip route show` または短縮形の `ip r` を使用して、ルーティングテーブルを表示します。

## 参考文献

https://man7.org/linux/man-pages/man8/ip.8.html

## 改訂履歴

- 2025/05/05 初版