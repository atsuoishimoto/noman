# ss command

Display socket statistics, providing information about network connections.

## Overview

The `ss` command is a utility for investigating sockets, showing information about network connections, routing tables, and network interfaces. It's a more powerful and faster alternative to the older `netstat` command, offering detailed insights into TCP, UDP, and other socket types on a Linux system.

## Options

### **-a, --all**

Show both listening and non-listening sockets

```console
$ ss -a
Netid  State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port  Process
u_str  ESTAB   0       0       * 19350               * 19351
u_str  ESTAB   0       0       * 19351               * 19350
tcp    LISTEN  0       128     0.0.0.0:22            0.0.0.0:*
tcp    ESTAB   0       0       192.168.1.5:22        192.168.1.10:52914
```

### **-l, --listening**

Display only listening sockets

```console
$ ss -l
Netid  State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port  Process
tcp    LISTEN  0       128     0.0.0.0:22            0.0.0.0:*
tcp    LISTEN  0       128     127.0.0.1:631         0.0.0.0:*
tcp    LISTEN  0       128     127.0.0.1:25          0.0.0.0:*
```

### **-t, --tcp**

Display only TCP sockets

```console
$ ss -t
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port
ESTAB   0       0       192.168.1.5:22        192.168.1.10:52914
```

### **-u, --udp**

Display only UDP sockets

```console
$ ss -u
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port
UNCONN  0       0       0.0.0.0:68            0.0.0.0:*
UNCONN  0       0       0.0.0.0:5353          0.0.0.0:*
```

### **-p, --processes**

Show process using socket

```console
$ ss -p
Netid  State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port  Process
tcp    ESTAB   0       0       192.168.1.5:22        192.168.1.10:52914 users:(("sshd",pid=1234,fd=3))
```

### **-n, --numeric**

Don't resolve service names (show port numbers instead)

```console
$ ss -n
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port
ESTAB   0       0       192.168.1.5:22        192.168.1.10:52914
```

### **-r, --resolve**

Resolve numeric address/ports

```console
$ ss -r
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port
ESTAB   0       0       server:ssh            client:52914
```

## Usage Examples

### Show all TCP connections

```console
$ ss -ta
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port
LISTEN  0       128     0.0.0.0:ssh           0.0.0.0:*
LISTEN  0       128     127.0.0.1:ipp         0.0.0.0:*
ESTAB   0       0       192.168.1.5:ssh       192.168.1.10:52914
```

### Show listening TCP sockets with process information

```console
$ ss -tlp
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port   Process
LISTEN  0       128     0.0.0.0:ssh           0.0.0.0:*           users:(("sshd",pid=1234,fd=3))
LISTEN  0       128     127.0.0.1:ipp         0.0.0.0:*           users:(("cupsd",pid=5678,fd=12))
```

### Filter connections by port

```console
$ ss -t '( dport = :ssh or sport = :ssh )'
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port
ESTAB   0       0       192.168.1.5:ssh       192.168.1.10:52914
```

## Tips:

### Combine Options for Detailed Output

Combine options like `ss -tuln` to show TCP and UDP listening sockets with numeric addresses. This is useful for quickly checking which ports are open on your system.

### Filter by Connection State

Use `ss state established` to show only established connections, or `ss state time-wait` to see connections in TIME-WAIT state. This helps troubleshoot connection issues.

### Monitor Connections in Real-time

Use `watch -n1 'ss -t'` to monitor TCP connections in real-time with updates every second. This is helpful when tracking connection changes during troubleshooting.

## Frequently Asked Questions

#### Q1. What's the difference between `ss` and `netstat`?
A. `ss` is faster and provides more information than `netstat`. It directly queries kernel space for socket information rather than parsing `/proc` files.

#### Q2. How can I see which process is using a specific port?
A. Use `ss -ltp` to see listening TCP sockets with process information. You can filter by port: `ss -ltp sport = :80`.

#### Q3. How do I check for established connections to a specific IP address?
A. Use `ss -t dst 192.168.1.10` to see all TCP connections to that IP address.

#### Q4. How can I see socket memory usage?
A. Use `ss -m` to display socket memory usage information.

## References

https://man7.org/linux/man-pages/man8/ss.8.html

## Revisions

- 2025/05/05 First revision