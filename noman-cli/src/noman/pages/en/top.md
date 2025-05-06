# top command

Display and update sorted information about processes.

## Overview

`top` provides a dynamic real-time view of running system processes. It displays a continuously updated list of processes, showing CPU usage, memory consumption, running time, and other system statistics. The display refreshes at regular intervals, allowing users to monitor system performance and identify resource-intensive processes.

## Options

### **-d, --delay**

Specify the delay between screen updates in seconds (can include decimal points)

```console
$ top -d 5
[Updates the display every 5 seconds instead of the default]
```

### **-n, --iterations**

Specify the maximum number of iterations before exiting

```console
$ top -n 3
[Displays 3 updates then exits]
```

### **-p, --pid**

Monitor only the processes with specified process IDs

```console
$ top -p 1234,5678
[Shows only processes with PIDs 1234 and 5678]
```

### **-u, --user**

Show only processes owned by specified user

```console
$ top -u username
[Shows only processes owned by 'username']
```

### **-b, --batch**

Run in batch mode (useful for sending output to other programs or files)

```console
$ top -b -n 1 > top_output.txt
[Captures one iteration of top output to a file]
```

### **-H, --threads**

Show individual threads instead of summarizing by process

```console
$ top -H
[Displays threads instead of processes]
```

## Interactive Commands

While top is running, you can use these keyboard commands:

### Process Control

```
k - Kill a process (prompts for PID and signal)
r - Renice a process (change priority)
q - Quit the top command
```

### Display Options

```
h or ? - Help screen
f - Field management (add/remove columns)
o - Change sort field
1 - Toggle display of individual CPU cores
m - Toggle memory display mode
t - Toggle task/CPU display mode
c - Toggle command line/program name
```

## Usage Examples

### Basic System Monitoring

```console
$ top
top - 14:23:45 up 3 days, 2:34, 2 users, load average: 0.15, 0.10, 0.09
Tasks: 213 total,   1 running, 212 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  0.7 sy,  0.0 ni, 96.9 id,  0.1 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :  15895.1 total,   7431.0 free,   3820.2 used,   4643.9 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.  11389.0 avail Mem 

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1234 user      20   0 3256712 198232  89456 S   2.0   1.2   5:23.45 firefox
 5678 user      20   0 2345678 123456  65432 S   1.5   0.8   3:45.67 chrome
```

### Monitoring Specific User's Processes

```console
$ top -u root
[Shows only processes owned by root user]
```

### Saving Top Output to a File

```console
$ top -b -n 1 | grep firefox > firefox_processes.txt
[Captures information about Firefox processes to a file]
```

## Tips:

### Sorting the Process List

Press `P` to sort by CPU usage, `M` to sort by memory usage, or `T` to sort by time. This helps quickly identify resource-intensive processes.

### Changing Update Interval

Press `d` or `s` while top is running to change the refresh interval. Useful for monitoring rapidly changing systems or conserving resources.

### Filtering Processes

Use `o` or `O` to filter processes based on specific criteria. For example, filtering by memory usage above a certain threshold.

### Memory Display Units

Press `E` to cycle through different memory display units (KiB, MiB, GiB, etc.) for easier reading of memory statistics.

## Frequently Asked Questions

#### Q1. How do I exit top?
A. Press `q` to quit the top command.

#### Q2. How can I kill a process from within top?
A. Press `k`, enter the PID of the process you want to kill, then specify the signal number (9 for SIGKILL).

#### Q3. How do I change the refresh rate?
A. Use the `-d` option when starting top (e.g., `top -d 5` for 5 seconds) or press `d` while top is running.

#### Q4. Why does top show different CPU usage than other tools?
A. top calculates CPU usage based on the time between refreshes, while other tools may use different calculation methods or time intervals.

#### Q5. How can I see memory usage in a more readable format?
A. Press `E` while top is running to cycle through different memory display units.

## References

https://man7.org/linux/man-pages/man1/top.1.html

## Revisions

- 2025/05/05 First revision