# tcpdump command

Capture and analyze network traffic on a system.

## Overview

`tcpdump` is a powerful command-line packet analyzer that allows users to capture and display TCP/IP and other packets being transmitted or received over a network. It's commonly used for network troubleshooting, security analysis, and monitoring network activity.

## Options

### **-i interface**

Specify the network interface to listen on

```console
$ tcpdump -i eth0
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:45:22.357932 IP host1.ssh > host2.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

### **-n**

Don't convert addresses (i.e., host addresses, port numbers, etc.) to names

```console
$ tcpdump -n
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:46:12.357932 IP 192.168.1.10.22 > 192.168.1.20.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

### **-c count**

Exit after capturing count packets

```console
$ tcpdump -c 5
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
5 packets captured
5 packets received by filter
0 packets dropped by kernel
```

### **-w file**

Write the raw packets to file rather than parsing and printing them out

```console
$ tcpdump -w capture.pcap
tcpdump: listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
^C
45 packets captured
45 packets received by filter
0 packets dropped by kernel
```

### **-r file**

Read packets from a file (previously created with -w option)

```console
$ tcpdump -r capture.pcap
reading from file capture.pcap, link-type EN10MB (Ethernet)
13:45:22.357932 IP host1.ssh > host2.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

### **-v, -vv, -vvv**

Increase verbosity level (more packet information)

```console
$ tcpdump -v
tcpdump: listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:45:22.357932 IP (tos 0x10, ttl 64, id 12345, offset 0, flags [DF], proto TCP (6), length 104) host1.ssh > host2.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

## Usage Examples

### Capture packets on a specific interface

```console
$ tcpdump -i eth0
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:45:22.357932 IP host1.ssh > host2.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

### Filter traffic by host

```console
$ tcpdump host 192.168.1.10
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:45:22.357932 IP 192.168.1.10.ssh > host2.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

### Filter traffic by port

```console
$ tcpdump port 80
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
13:45:22.357932 IP host1.http > host2.52986: Flags [P.], seq 1:37, ack 1, win 501, options [nop,nop,TS val 1089067 ecr 1089067], length 36
```

### Capture and save packets to a file

```console
$ tcpdump -w capture.pcap -i eth0
tcpdump: listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
^C
45 packets captured
45 packets received by filter
0 packets dropped by kernel
```

## Tips:

### Run with sudo for full access

Most systems require root privileges to capture packets. Use `sudo tcpdump` to ensure you have proper permissions.

### Use expression filters for targeted capture

Combine filters to narrow down traffic: `tcpdump 'tcp port 80 and host 192.168.1.10'` captures only HTTP traffic to/from a specific host.

### Disable name resolution for faster capture

Use `-n` to prevent DNS lookups which can slow down packet capture, especially in busy networks.

### Capture full packet content

Use `-s 0` to capture full packets instead of just headers (default is 262144 bytes in modern versions).

### Use Wireshark for analysis

Save captures with `-w filename.pcap` and open them in Wireshark for detailed graphical analysis.

## Frequently Asked Questions

#### Q1. How do I capture packets on a specific interface?
A. Use `tcpdump -i interface_name` (e.g., `tcpdump -i eth0`).

#### Q2. How can I save captured packets to a file?
A. Use `tcpdump -w filename.pcap` to save raw packets to a file.

#### Q3. How do I filter traffic by IP address?
A. Use `tcpdump host 192.168.1.10` to capture traffic to/from that IP.

#### Q4. How do I filter by port number?
A. Use `tcpdump port 80` to capture HTTP traffic or any traffic on port 80.

#### Q5. How can I see more detailed packet information?
A. Use increasing verbosity with `-v`, `-vv`, or `-vvv` flags.

## References

https://www.tcpdump.org/manpages/tcpdump.1.html

## Revisions

- 2025/05/05 First revision