# ps command

Display information about active processes.

## Overview

The `ps` command shows a snapshot of current processes running on the system. It provides details about process IDs (PIDs), CPU usage, memory consumption, and other process-related information. By default, `ps` shows only processes owned by the current user and associated with the current terminal.

## Options

### **-e**

Display information about all processes (equivalent to -A).

```console
$ ps -e
  PID TTY          TIME CMD
    1 ?        00:00:03 systemd
  546 ?        00:00:00 systemd-journal
  578 ?        00:00:00 systemd-udevd
  933 ?        00:00:00 sshd
 1028 tty1     00:00:00 bash
 1892 tty1     00:00:00 ps
```

### **-f**

Display full-format listing, showing UID, PID, PPID, CPU usage, and more.

```console
$ ps -f
UID        PID  PPID  C STIME TTY          TIME CMD
user      1028  1027  0 10:30 tty1     00:00:00 bash
user      1893  1028  0 10:35 tty1     00:00:00 ps -f
```

### **-l**

Display long format with detailed information including priority, state codes, and memory usage.

```console
$ ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 S  1000  1028  1027  0  80   0 -  2546 wait   tty1     00:00:00 bash
0 R  1000  1894  1028  0  80   0 -  2715 -      tty1     00:00:00 ps
```

### **-u username**

Display processes belonging to the specified user.

```console
$ ps -u john
  PID TTY          TIME CMD
 1028 tty1     00:00:00 bash
 1895 tty1     00:00:00 ps
 2156 ?        00:00:01 firefox
```

### **-aux**

Display detailed information about all processes (BSD style).

```console
$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 168940  9128 ?        Ss   May04   0:03 /sbin/init
root       546  0.0  0.1  55492  8456 ?        Ss   May04   0:00 /lib/systemd/systemd-journald
user      1028  0.0  0.0  21712  5312 tty1     Ss   10:30   0:00 bash
user      1896  0.0  0.0  37364  3328 tty1     R+   10:36   0:00 ps aux
```

## Usage Examples

### Finding processes by name

```console
$ ps -ef | grep firefox
user      2156  1028  2 10:15 ?        00:01:23 /usr/lib/firefox/firefox
user      1897  1028  0 10:36 tty1     00:00:00 grep --color=auto firefox
```

### Displaying process tree

```console
$ ps -ejH
  PID  PGID   SID TTY          TIME CMD
    1     1     1 ?        00:00:03 systemd
  546   546   546 ?        00:00:00   systemd-journal
  578   578   578 ?        00:00:00   systemd-udevd
  933   933   933 ?        00:00:00   sshd
 1027  1027  1027 tty1     00:00:00   login
 1028  1028  1028 tty1     00:00:00     bash
 1898  1898  1028 tty1     00:00:00       ps
```

### Sorting processes by memory usage

```console
$ ps aux --sort=-%mem
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
user      2156  2.0  8.5 1854036 348216 ?      Sl   10:15   1:23 /usr/lib/firefox/firefox
user      2201  0.5  2.3 1123460 95684 ?       Sl   10:18   0:15 /usr/lib/thunderbird/thunderbird
root       546  0.0  0.1  55492  8456 ?        Ss   May04   0:00 /lib/systemd/systemd-journald
```

## Tips:

### Customize Output Fields

Use the `-o` option to specify which fields to display:

```console
$ ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu
  PID  PPID CMD                         %MEM %CPU
 2156  1028 /usr/lib/firefox/firefox     8.5  2.0
 2201  1028 /usr/lib/thunderbird/thun    2.3  0.5
    1     0 /sbin/init                   0.1  0.0
```

### Monitor Processes in Real-time

Combine `ps` with `watch` to monitor processes in real-time:

```console
$ watch -n 1 'ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head -10'
```

### Find Parent-Child Process Relationships

Use `ps -f` to see the PPID (parent process ID) column, which helps understand process relationships.

## Frequently Asked Questions

#### Q1. What's the difference between `ps aux` and `ps -ef`?
A. Both show all processes, but `ps aux` is BSD-style output while `ps -ef` is UNIX-style output. `ps aux` shows %CPU and %MEM usage, while `ps -ef` shows PPID (parent process ID).

#### Q2. How do I find processes consuming the most CPU?
A. Use `ps aux --sort=-%cpu` to sort processes by CPU usage in descending order.

#### Q3. How do I find processes consuming the most memory?
A. Use `ps aux --sort=-%mem` to sort processes by memory usage in descending order.

#### Q4. How can I see only processes for a specific user?
A. Use `ps -u username` to display only processes owned by a specific user.

## macOS Considerations

On macOS, some BSD-style options differ from Linux. For example, `-e` is not available, but you can use `ps -A` to show all processes. Also, the memory reporting columns may show different values than on Linux systems.

## References

https://man7.org/linux/man-pages/man1/ps.1.html

## Revisions

- 2025/05/05 First revision