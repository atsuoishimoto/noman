# nc command

Create and manage network connections for data transfer, port scanning, and network debugging.

## Overview

`nc` (netcat) is a versatile networking utility that reads and writes data across network connections using TCP or UDP protocols. It functions as a "Swiss Army knife" for network operations, allowing users to create servers, connect to services, transfer files, scan ports, and debug network issues.

## Options

### **-l**

Listen for incoming connections rather than initiating a connection to a remote host.

```console
$ nc -l 8080
```

### **-p**

Specify the source port nc should use.

```console
$ nc -p 12345 example.com 80
```

### **-v**

Enable verbose output, showing more connection details.

```console
$ nc -v example.com 80
Connection to example.com port 80 [tcp/http] succeeded!
```

### **-z**

Scan for listening daemons without sending any data (port scanning mode).

```console
$ nc -z -v example.com 20-30
Connection to example.com 22 port [tcp/ssh] succeeded!
```

### **-u**

Use UDP instead of the default TCP protocol.

```console
$ nc -u 192.168.1.1 53
```

### **-w**

Specify timeout for connections and port scans in seconds.

```console
$ nc -w 5 example.com 80
```

### **-n**

Skip DNS lookup, use numeric IP addresses only.

```console
$ nc -n 192.168.1.1 80
```

## Usage Examples

### Simple Chat Server and Client

```console
# On server
$ nc -l 1234
Hello from client!
Hello from server!

# On client
$ nc 192.168.1.100 1234
Hello from client!
Hello from server!
```

### File Transfer

```console
# On receiving end
$ nc -l 1234 > received_file.txt

# On sending end
$ nc 192.168.1.100 1234 < file_to_send.txt
```

### Port Scanning

```console
$ nc -z -v 192.168.1.1 20-30
Connection to 192.168.1.1 22 port [tcp/ssh] succeeded!
Connection to 192.168.1.1 25 port [tcp/smtp] succeeded!
```

### HTTP Request

```console
$ echo -e "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n" | nc example.com 80
HTTP/1.1 200 OK
Content-Type: text/html
...
```

## Tips

### Persistent Listening Server

Use the `-k` option (on systems that support it) to keep the server running after client disconnection:
```console
$ nc -k -l 8080
```

### Banner Grabbing

Quickly identify services running on specific ports:
```console
$ nc -v example.com 22
SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.5
```

### Proxy Connections

Use nc to create a simple proxy between two endpoints:
```console
$ nc -l 8080 | nc example.com 80
```

### Debugging Network Issues

When troubleshooting connectivity problems, use nc to test if specific ports are reachable before diving into application-specific debugging.

## Frequently Asked Questions

#### Q1. How do I create a simple chat server with nc?
A. Run `nc -l PORT` on the server and `nc SERVER_IP PORT` on the client. Type messages and press Enter to send them.

#### Q2. Can I use nc to transfer files?
A. Yes. On the receiving end, run `nc -l PORT > filename` and on the sending end, run `nc DESTINATION_IP PORT < filename`.

#### Q3. How do I scan for open ports with nc?
A. Use `nc -z -v TARGET_IP PORT_RANGE` (e.g., `nc -z -v example.com 20-100`).

#### Q4. Is nc secure for transferring sensitive data?
A. No, nc transmits data in plaintext. For sensitive data, use secure alternatives like scp, sftp, or encrypt the data before transmission.

#### Q5. What's the difference between nc and ncat?
A. ncat is part of the Nmap project and offers additional features like SSL support, proxy connections, and more advanced options while maintaining compatibility with traditional nc.

## References

https://man.openbsd.org/nc.1

## Revisions

- 2025/05/05 First revision