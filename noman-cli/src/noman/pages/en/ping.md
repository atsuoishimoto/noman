# ping command

Send ICMP ECHO_REQUEST packets to network hosts to verify connectivity.

## Overview

The `ping` command tests network connectivity by sending Internet Control Message Protocol (ICMP) echo request packets to a specified host and waiting for replies. It's commonly used to check if a host is reachable, measure round-trip time, and diagnose network issues.

## Options

### **-c count**

Stop after sending (and receiving) count ECHO_RESPONSE packets.

```console
$ ping -c 4 google.com
PING google.com (142.250.190.78): 56 data bytes
64 bytes from 142.250.190.78: icmp_seq=0 ttl=116 time=14.252 ms
64 bytes from 142.250.190.78: icmp_seq=1 ttl=116 time=14.618 ms
64 bytes from 142.250.190.78: icmp_seq=2 ttl=116 time=14.465 ms
64 bytes from 142.250.190.78: icmp_seq=3 ttl=116 time=14.361 ms

--- google.com ping statistics ---
4 packets transmitted, 4 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 14.252/14.424/14.618/0.135 ms
```

### **-i interval**

Wait interval seconds between sending each packet. The default is to wait for one second between each packet.

```console
$ ping -i 2 -c 3 example.com
PING example.com (93.184.216.34): 56 data bytes
64 bytes from 93.184.216.34: icmp_seq=0 ttl=56 time=11.632 ms
64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=11.726 ms
64 bytes from 93.184.216.34: icmp_seq=2 ttl=56 time=11.978 ms

--- example.com ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 11.632/11.779/11.978/0.146 ms
```

### **-t ttl**

Set the IP Time to Live (TTL) for outgoing packets.

```console
$ ping -t 64 -c 2 github.com
PING github.com (140.82.121.3): 56 data bytes
64 bytes from 140.82.121.3: icmp_seq=0 ttl=64 time=15.361 ms
64 bytes from 140.82.121.3: icmp_seq=1 ttl=64 time=15.244 ms

--- github.com ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 15.244/15.303/15.361/0.059 ms
```

### **-s packetsize**

Specify the number of data bytes to be sent. The default is 56, which translates into 64 ICMP data bytes when combined with the 8 bytes of ICMP header data.

```console
$ ping -s 100 -c 2 example.com
PING example.com (93.184.216.34): 100 data bytes
108 bytes from 93.184.216.34: icmp_seq=0 ttl=56 time=11.632 ms
108 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=11.726 ms

--- example.com ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 11.632/11.679/11.726/0.047 ms
```

## Usage Examples

### Basic connectivity test

```console
$ ping google.com
PING google.com (142.250.190.78): 56 data bytes
64 bytes from 142.250.190.78: icmp_seq=0 ttl=116 time=14.252 ms
64 bytes from 142.250.190.78: icmp_seq=1 ttl=116 time=14.618 ms
^C
--- google.com ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 14.252/14.435/14.618/0.183 ms
```

### Pinging with IP address

```console
$ ping -c 3 8.8.8.8
PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=116 time=12.252 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=12.618 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=116 time=12.465 ms

--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 12.252/12.445/12.618/0.150 ms
```

### Continuous ping with timestamp

```console
$ ping -D example.com
PING example.com (93.184.216.34): 56 data bytes
[1715011234.123456] 64 bytes from 93.184.216.34: icmp_seq=0 ttl=56 time=11.632 ms
[1715011235.125678] 64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=11.726 ms
^C
--- example.com ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 11.632/11.679/11.726/0.047 ms
```

## Tips

### Terminate Ping Gracefully

Press Ctrl+C to stop a running ping command. This will display a summary of the ping statistics.

### Check Network Latency

Pay attention to the "time" value in ping responses. Higher values indicate greater latency, which can affect real-time applications like video calls or online gaming.

### Interpret Packet Loss

Any packet loss (shown in the statistics) indicates network issues. Occasional packet loss (1-2%) may be normal, but consistent or high packet loss suggests network problems.

### Use Ping for Troubleshooting

If you can't ping a host, try pinging intermediate devices or known working hosts to isolate where the connectivity issue might be occurring.

## Frequently Asked Questions

#### Q1. What does "Request timeout" mean?
A. It means the target host didn't respond within the expected time. This could indicate network congestion, firewall blocks, or that the host is offline.

#### Q2. Why does ping sometimes work with IP addresses but not with domain names?
A. This usually indicates a DNS resolution problem. Your network can reach the IP address directly, but can't translate the domain name to an IP address.

#### Q3. Can ping tell me if a specific port is open?
A. No, ping only tests basic IP connectivity using ICMP. To test if a specific port is open, use tools like `telnet` or `nc` (netcat).

#### Q4. Why might ping be blocked?
A. Many networks and servers block ICMP packets for security reasons. A failed ping doesn't necessarily mean the host is down.

## macOS Considerations

On macOS, you may need to run ping with sudo to use certain options like changing the interval to less than 1 second. Also, some options available in Linux versions of ping may not be available or may have different syntax in macOS.

## References

https://man.openbsd.org/ping.8

## Revisions

- 2025/05/05 First revision