# tail command

Display the last part of files.

## Overview

The `tail` command outputs the last part (by default, 10 lines) of one or more files. It's commonly used to view recent entries in log files, monitor file changes in real-time, or check the end of any text file without opening the entire file.

## Options

### **-n, --lines=NUM**

Output the last NUM lines (default is 10)

```console
$ tail -n 5 /var/log/syslog
May  5 10:15:22 hostname service[1234]: Processing request
May  5 10:15:23 hostname service[1234]: Request completed
May  5 10:15:25 hostname service[1234]: New connection from 192.168.1.5
May  5 10:15:26 hostname service[1234]: Processing request
May  5 10:15:27 hostname service[1234]: Request completed
```

### **-f, --follow**

Output appended data as the file grows; useful for monitoring log files

```console
$ tail -f /var/log/apache2/access.log
192.168.1.5 - - [05/May/2025:10:15:22 +0000] "GET /index.html HTTP/1.1" 200 2326
192.168.1.6 - - [05/May/2025:10:15:25 +0000] "GET /images/logo.png HTTP/1.1" 200 4589
192.168.1.7 - - [05/May/2025:10:15:27 +0000] "POST /login HTTP/1.1" 302 -
```

### **-c, --bytes=NUM**

Output the last NUM bytes

```console
$ tail -c 20 file.txt
end of the file.
```

### **-q, --quiet, --silent**

Never output headers giving file names

```console
$ tail -q file1.txt file2.txt
Last line of file1
Last line of file2
```

### **--pid=PID**

With -f, terminate after process ID, PID dies

```console
$ tail -f --pid=1234 logfile.txt
```

## Usage Examples

### Monitoring multiple log files simultaneously

```console
$ tail -f /var/log/syslog /var/log/auth.log
==> /var/log/syslog <==
May  5 10:20:22 hostname service[1234]: Processing request

==> /var/log/auth.log <==
May  5 10:20:25 hostname sshd[5678]: Accepted publickey for user from 192.168.1.10
```

### Viewing the last 20 lines with line numbers

```console
$ tail -n 20 file.txt | nl
     1  Line content here
     2  More content here
     ...
     20 Last line here
```

### Following a log file but stopping when a process ends

```console
$ tail -f --pid=$(pgrep apache2) /var/log/apache2/access.log
```

## Tips:

### Combine with grep for filtering

Use `tail -f logfile.txt | grep ERROR` to monitor a log file in real-time but only show lines containing "ERROR".

### Use with head for middle sections

Extract the middle of a file with `head -n 20 file.txt | tail -n 10` to get lines 11-20.

### Follow multiple files efficiently

When following multiple log files with `tail -f`, use `--retry` to keep trying if a file becomes inaccessible and reappears later.

### Terminate follow mode gracefully

Press Ctrl+C to exit from tail's follow mode when you're done monitoring.

## Frequently Asked Questions

#### Q1. How do I view the last 10 lines of a file?
A. Simply use `tail filename` or `tail -n 10 filename`.

#### Q2. How can I continuously monitor a log file for changes?
A. Use `tail -f logfile.txt` to follow the file in real-time as new content is added.

#### Q3. Can I monitor multiple files at once?
A. Yes, use `tail -f file1.txt file2.txt` to monitor multiple files simultaneously.

#### Q4. How do I show a specific number of lines from the end?
A. Use `tail -n NUMBER filename` where NUMBER is the count of lines you want to see.

#### Q5. How can I exit from tail's follow mode?
A. Press Ctrl+C to terminate the tail command when in follow mode.

## References

https://www.gnu.org/software/coreutils/manual/html_node/tail-invocation.html

## Revisions

- 2025/05/05 First revision