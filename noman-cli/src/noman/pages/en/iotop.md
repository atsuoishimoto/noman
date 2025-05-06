# iotop command

Monitor I/O usage by processes on the system.

## Overview

`iotop` is a top-like utility for monitoring I/O usage by processes or threads. It displays real-time disk I/O statistics, showing which processes are using the most disk read/write bandwidth. This tool is particularly useful for identifying I/O-intensive processes that might be causing system slowdowns.

## Options

### **-o, --only**

Only show processes or threads that are actually doing I/O

```console
$ sudo iotop -o
Total DISK READ:         0.00 B/s | Total DISK WRITE:         7.63 K/s
Current DISK READ:       0.00 B/s | Current DISK WRITE:       0.00 B/s
    TID  PRIO  USER     DISK READ  DISK WRITE  SWAPIN     IO>    COMMAND
   1234 be/4 root        0.00 B/s    7.63 K/s  0.00 %  0.00 % systemd-journald
```

### **-b, --batch**

Run in non-interactive mode, useful for logging

```console
$ sudo iotop -b -n 5
Total DISK READ:         0.00 B/s | Total DISK WRITE:        15.27 K/s
Current DISK READ:       0.00 B/s | Current DISK WRITE:       0.00 B/s
    TID  PRIO  USER     DISK READ  DISK WRITE  SWAPIN     IO>    COMMAND
      1 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % systemd
   1234 be/4 root        0.00 B/s   15.27 K/s  0.00 %  0.00 % systemd-journald
[...]
```

### **-n NUM, --iter=NUM**

Set the number of iterations before exiting (for non-interactive mode)

```console
$ sudo iotop -b -n 2
Total DISK READ:         0.00 B/s | Total DISK WRITE:        15.27 K/s
[...output for 2 iterations...]
```

### **-d SEC, --delay=SEC**

Set the delay between iterations in seconds (default 1.0)

```console
$ sudo iotop -d 5
# Updates every 5 seconds instead of the default 1 second
```

### **-p PID, --pid=PID**

Monitor only processes with specified PID

```console
$ sudo iotop -p 1234
# Shows I/O statistics only for process with PID 1234
```

### **-u USER, --user=USER**

Monitor only processes of specified user

```console
$ sudo iotop -u apache
# Shows I/O statistics only for processes owned by user 'apache'
```

### **-a, --accumulated**

Show accumulated I/O instead of bandwidth

```console
$ sudo iotop -a
# Shows total I/O done since process start rather than current rate
```

## Usage Examples

### Basic monitoring

```console
$ sudo iotop
Total DISK READ:         0.00 B/s | Total DISK WRITE:        23.47 K/s
Current DISK READ:       0.00 B/s | Current DISK WRITE:       0.00 B/s
    TID  PRIO  USER     DISK READ  DISK WRITE  SWAPIN     IO>    COMMAND
      1 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % systemd
   1234 be/4 root        0.00 B/s   15.27 K/s  0.00 %  0.00 % systemd-journald
   2345 be/4 mysql       0.00 B/s    8.20 K/s  0.00 %  0.00 % mysqld
```

### Logging I/O activity to a file

```console
$ sudo iotop -botq -n 10 > io_log.txt
# Logs 10 iterations of I/O activity in batch mode, showing only processes doing I/O,
# with timestamps, and without header information
```

### Monitoring specific user's processes

```console
$ sudo iotop -o -u www-data
# Shows only I/O-active processes owned by www-data user
```

## Tips:

### Interactive Commands

While running iotop interactively, you can use these keyboard shortcuts:
- `o`: Toggle --only mode (show only processes doing I/O)
- `p`: Toggle showing processes (vs threads)
- `a`: Toggle accumulated I/O mode
- `q`: Quit the program

### Run with Sudo

`iotop` requires root privileges to access I/O statistics. Always run it with `sudo` or as the root user.

### Identify I/O Bottlenecks

Use `iotop -o` to quickly identify which processes are currently causing I/O load, which is useful for troubleshooting system slowdowns.

### Combine with Logging

For long-term monitoring, use `iotop -b -o -n [count] > logfile` to capture I/O statistics over time.

## Frequently Asked Questions

#### Q1. Why do I get "iotop: command not found"?
A. You need to install iotop first. On Debian/Ubuntu: `sudo apt install iotop`, on RHEL/CentOS: `sudo yum install iotop`.

#### Q2. Why do I get "Permission denied" when running iotop?
A. iotop requires root privileges. Run it with `sudo iotop` or as the root user.

#### Q3. How can I see only processes that are actively using disk I/O?
A. Use `sudo iotop -o` to show only processes that are actually performing I/O operations.

#### Q4. Can I log iotop output to a file?
A. Yes, use batch mode: `sudo iotop -b -n [iterations] > filename.log`

#### Q5. How do I monitor I/O for a specific process?
A. Use `sudo iotop -p PID` where PID is the process ID you want to monitor.

## References

https://man7.org/linux/man-pages/man8/iotop.8.html

## Revisions

- 2025/05/05 First revision