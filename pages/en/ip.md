# ip command

Network configuration tool for managing interfaces, routing, and addresses.

## Overview

The `ip` command is a powerful utility for configuring and monitoring network interfaces, routing tables, and addresses in Linux systems. It's part of the iproute2 package and provides more functionality than older networking commands like ifconfig, route, and netstat. The command follows a structured syntax where objects (link, address, route, etc.) are followed by commands and options.

## Options

### **help**

Display help information for a specific object

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

Display more information/statistics

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

Display detailed information

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

Display statistics in human-readable format

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

Display brief output

```console
$ ip -br address show
lo               UNKNOWN        127.0.0.1/8 ::1/128 
eth0             UP             192.168.1.100/24 fe80::a00:27ff:fe74:ddaa/64
```

### **-c, --color**

Use color output

```console
$ ip -c link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
```

## Usage Examples

### Displaying network interfaces

```console
$ ip link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
    link/ether 08:00:27:74:dd:aa brd ff:ff:ff:ff:ff:ff
```

### Displaying IP addresses

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

### Adding an IP address to an interface

```console
$ sudo ip address add 192.168.1.200/24 dev eth0
```

### Bringing an interface up or down

```console
$ sudo ip link set eth0 up
$ sudo ip link set eth0 down
```

### Displaying routing table

```console
$ ip route show
default via 192.168.1.1 dev eth0 proto dhcp metric 100 
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100 metric 100 
```

### Adding a static route

```console
$ sudo ip route add 10.0.0.0/24 via 192.168.1.254
```

## Tips:

### Use Brief Output for Quick Overview

The `-br` option provides a concise, tabular view of network information, making it easier to scan multiple interfaces quickly.

```console
$ ip -br link
lo               UNKNOWN        00:00:00:00:00:00 <LOOPBACK,UP,LOWER_UP> 
eth0             UP             08:00:27:74:dd:aa <BROADCAST,MULTICAST,UP,LOWER_UP>
```

### Save and Restore IP Configuration

You can save your current IP configuration to a file and restore it later:

```console
$ ip addr save > ip-config.txt
$ ip addr restore < ip-config.txt
```

### Monitor Network Changes

Use the `ip monitor` command to watch for network changes in real-time:

```console
$ ip monitor
```

### Use Namespaces for Network Isolation

Network namespaces allow you to create isolated network environments:

```console
$ sudo ip netns add mynetwork
$ sudo ip netns exec mynetwork ip link list
```

## Frequently Asked Questions

#### Q1. What's the difference between `ip` and `ifconfig`?
A. `ip` is newer, more powerful, and provides more functionality than `ifconfig`. It can manage routing tables, network interfaces, and IP addresses with a consistent syntax. `ifconfig` is considered deprecated in many Linux distributions.

#### Q2. How do I check my IP address?
A. Use `ip address show` or the shorter `ip a` to display all IP addresses. For a specific interface, use `ip address show dev eth0`.

#### Q3. How do I add a temporary IP address?
A. Use `sudo ip address add 192.168.1.200/24 dev eth0` to add an IP address to interface eth0. This address will be lost after reboot unless configured in network configuration files.

#### Q4. How do I flush all IP addresses from an interface?
A. Use `sudo ip address flush dev eth0` to remove all IP addresses from the eth0 interface.

#### Q5. How do I view my routing table?
A. Use `ip route show` or the shorter `ip r` to display the routing table.

## References

https://man7.org/linux/man-pages/man8/ip.8.html

## Revisions

- 2025/05/05 First revision