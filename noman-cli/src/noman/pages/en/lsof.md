# lsof command

Lists open files and the processes that opened them.

## Overview

`lsof` (list open files) displays information about files that are currently open by processes running on the system. It can show which processes have a particular file open, which files a specific process has open, network connections, and more. This command is invaluable for system troubleshooting, security monitoring, and understanding system resource usage.

## Options

### **-p PID**

Lists all files opened by the specified process ID.

```console
$ lsof -p 1234
COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
bash     1234   user  cwd    DIR    8,1     4096 123456 /home/user
bash     1234   user  txt    REG    8,1   940336 789012 /usr/bin/bash
```

### **-i**

Lists files associated with Internet connections (network files).

```console
$ lsof -i
COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
chrome   1234   user   52u  IPv4  12345      0t0  TCP localhost:49152->localhost:http (ESTABLISHED)
sshd     5678   root    3u  IPv4  23456      0t0  TCP *:ssh (LISTEN)
```

### **-i:[port]**

Lists files associated with the specified port.

```console
$ lsof -i:22
COMMAND  PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
sshd    1234 root    3u  IPv4  12345      0t0  TCP *:ssh (LISTEN)
```

### **-u username**

Lists files opened by a specific user.

```console
$ lsof -u john
COMMAND  PID   USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
bash    1234   john  cwd    DIR    8,1     4096 123456 /home/john
chrome  2345   john   10r   REG    8,1    12345 234567 /home/john/Downloads/file.pdf
```

### **-c command**

Lists files opened by processes with the specified command name.

```console
$ lsof -c chrome
COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
chrome   1234   user  cwd    DIR    8,1     4096 123456 /home/user
chrome   1234   user  txt    REG    8,1 12345678 234567 /opt/google/chrome/chrome
```

### **-t**

Displays only process IDs, useful for scripting.

```console
$ lsof -t -i:80
1234
5678
```

### **+D directory**

Lists all open files in the specified directory and its subdirectories.

```console
$ lsof +D /var/log
COMMAND  PID USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
rsyslogd 123 root    5w   REG    8,1    12345 123456 /var/log/syslog
nginx   1234 www     3w   REG    8,1     5678 234567 /var/log/nginx/access.log
```

## Usage Examples

### Finding which process is using a specific file

```console
$ lsof /var/log/syslog
COMMAND  PID USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME
rsyslogd 123 root    5w   REG    8,1    12345 123456 /var/log/syslog
```

### Finding which process is listening on a specific port

```console
$ lsof -i TCP:80
COMMAND  PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
nginx   1234 root    6u  IPv4  12345      0t0  TCP *:http (LISTEN)
```

### Combining multiple options

```console
$ lsof -u john -c chrome -i TCP
COMMAND  PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
chrome  1234  john   52u  IPv4  12345      0t0  TCP localhost:49152->server:https (ESTABLISHED)
chrome  1234  john   60u  IPv4  23456      0t0  TCP localhost:49153->cdn:https (ESTABLISHED)
```

## Tips

### Finding Processes Using Deleted Files

When a process has a file open that has been deleted, you can find it with `lsof | grep deleted`. This is useful for reclaiming disk space by restarting processes holding onto deleted files.

### Monitoring Network Connections

Use `lsof -i -P -n` to show all network connections with numeric ports and IP addresses. The `-P` prevents port number to service name conversion, and `-n` prevents hostname lookups.

### Finding Memory-Mapped Files

Use `lsof -a -p PID -d mem` to see memory-mapped files for a specific process, which can help understand memory usage patterns.

### Continuous Monitoring

Use `lsof -r 2` to repeat the listing every 2 seconds, which is useful for monitoring changing file usage patterns.

## Frequently Asked Questions

#### Q1. How do I find which process is using a specific port?
A. Use `lsof -i:PORT_NUMBER` (e.g., `lsof -i:80` for HTTP port).

#### Q2. How can I see all network connections?
A. Use `lsof -i` to see all network connections, or `lsof -i TCP` for TCP connections only.

#### Q3. How do I find all files opened by a specific user?
A. Use `lsof -u USERNAME` to list all files opened by a specific user.

#### Q4. How can I find which processes are accessing a specific directory?
A. Use `lsof +D /path/to/directory` to list all processes accessing files in that directory.

#### Q5. How do I find which process is using a specific file?
A. Simply run `lsof /path/to/file` to see which process has that file open.

## macOS Considerations

On macOS, `lsof` behavior may differ slightly from Linux versions:
- The output format might have minor differences
- Some options like `+D` might be slower on macOS due to filesystem differences
- For network connections, consider using `lsof -i -P` as macOS tends to resolve service names by default

## References

https://www.freebsd.org/cgi/man.cgi?query=lsof

## Revisions

- 2025/05/05 First revision