# w command

Display information about users currently logged in and their processes.

## Overview

The `w` command shows who is logged on and what they are doing. It displays a summary of the current activity on the system, including the user name, terminal name, remote host, login time, idle time, CPU usage, and the command line of their current process.

## Options

### **-h, --no-header**

Don't print the header

```console
$ w -h
user     tty      from             login@   idle   JCPU   PCPU  what
john     tty1     -                09:15    0.00s  0.05s  0.01s  w -h
jane     pts/0    192.168.1.5      08:30    2:35   0.10s  0.05s  vim document.txt
```

### **-s, --short**

Use the short format (don't print login time, JCPU or PCPU times)

```console
$ w -s
 10:15:03 up  1:33,  3 users,  load average: 0.01, 0.03, 0.05
USER     TTY      FROM             IDLE   WHAT
john     tty1     -                0.00s  w -s
jane     pts/0    192.168.1.5      2:35   vim document.txt
bob      pts/1    10.0.0.25        0.00s  top
```

### **-f, --from**

Toggle printing the FROM (remote hostname) field

```console
$ w -f
 10:15:03 up  1:33,  3 users,  load average: 0.01, 0.03, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
john     tty1     -                09:15    0.00s  0.05s  0.01s w -f
jane     pts/0    192.168.1.5      08:30    2:35   0.10s  0.05s vim document.txt
bob      pts/1    10.0.0.25        10:05    0.00s  0.15s  0.10s top
```

### **-i, --ip-addr**

Display IP address instead of hostname in the FROM field

```console
$ w -i
 10:15:03 up  1:33,  3 users,  load average: 0.01, 0.03, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
john     tty1     -                09:15    0.00s  0.05s  0.01s w -i
jane     pts/0    192.168.1.5      08:30    2:35   0.10s  0.05s vim document.txt
bob      pts/1    10.0.0.25        10:05    0.00s  0.15s  0.10s top
```

## Usage Examples

### Basic usage

```console
$ w
 10:15:03 up  1:33,  3 users,  load average: 0.01, 0.03, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
john     tty1     -                09:15    0.00s  0.05s  0.01s w
jane     pts/0    192.168.1.5      08:30    2:35   0.10s  0.05s vim document.txt
bob      pts/1    10.0.0.25        10:05    0.00s  0.15s  0.10s top
```

### Showing information for a specific user

```console
$ w jane
 10:15:03 up  1:33,  3 users,  load average: 0.01, 0.03, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
jane     pts/0    192.168.1.5      08:30    2:35   0.10s  0.05s vim document.txt
```

## Tips:

### Understanding the Output Columns

- **USER**: Username of the logged-in user
- **TTY**: Terminal name the user is logged in on
- **FROM**: Remote hostname or IP address
- **LOGIN@**: Time when the user logged in
- **IDLE**: Time since the user's last activity
- **JCPU**: Time used by all processes attached to the tty
- **PCPU**: Time used by the current process (shown in WHAT)
- **WHAT**: Command line of the user's current process

### Combine with grep for Filtering

Use `w | grep username` to quickly find information about a specific user without having to use the username parameter.

### Check System Load

The first line of `w` output shows system uptime and load averages, which is useful for quick system health checks.

## Frequently Asked Questions

#### Q1. What's the difference between `w` and `who`?
A. `w` provides more detailed information than `who`, including what each user is doing and system load averages. `who` simply lists who is logged in.

#### Q2. What does the IDLE time represent?
A. IDLE time shows how long it's been since the user performed any activity on their terminal. A high idle time indicates the user is logged in but not actively using the system.

#### Q3. How do I interpret the load averages?
A. Load averages show the system demand over the last 1, 5, and 15 minutes. Numbers below your CPU core count generally indicate the system isn't overloaded.

#### Q4. What do the JCPU and PCPU columns mean?
A. JCPU shows the time used by all processes attached to the user's terminal. PCPU shows the time used by the current process listed in the WHAT column.

## References

https://www.man7.org/linux/man-pages/man1/w.1.html

## Revisions

- 2025/05/05 First revision