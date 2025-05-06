# vmstat command

Report virtual memory statistics.

## Overview

`vmstat` displays information about system memory, processes, paging, block I/O, traps, and CPU activity. It provides a snapshot of system resource usage and is particularly useful for identifying performance bottlenecks related to memory, CPU, or I/O.

## Options

### **-a**

Display active and inactive memory

```console
$ vmstat -a
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free  inact active   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 7123456 2345678 1234567    0    0     0     2   51   92  1  1 98  0  0
```

### **-d**

Display disk statistics

```console
$ vmstat -d
disk- ------------reads------------ ------------writes----------- -----IO------
       total merged sectors      ms  total merged sectors      ms    cur    sec
sda    12687   2713  972258   13364  10347   9944 1766952   23694      0     11
```

### **-s**

Display table of various event counters and memory statistics

```console
$ vmstat -s
      8169348 K total memory
       986168 K used memory
      1247848 K active memory
      2345678 K inactive memory
      7183180 K free memory
        16384 K buffer memory
      1983616 K swap cache
      8388604 K total swap
            0 K used swap
      8388604 K free swap
       123456 non-nice user cpu ticks
          234 nice user cpu ticks
        56789 system cpu ticks
     12345678 idle cpu ticks
         1234 IO-wait cpu ticks
            0 IRQ cpu ticks
          123 softirq cpu ticks
            0 stolen cpu ticks
       567890 pages paged in
      1234567 pages paged out
            0 pages swapped in
            0 pages swapped out
      5678901 interrupts
     12345678 CPU context switches
   1234567890 boot time
        12345 forks
```

### **-S**

Specify unit size (k, K, m, M) for displaying memory values

```console
$ vmstat -S M
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0   6953      0   1937    0    0     0     2   51   92  1  1 98  0  0
```

### **interval [count]**

Continuously display statistics at specified intervals (in seconds)

```console
$ vmstat 2 5
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 7123456  16384 1983616    0    0     0     2   51   92  1  1 98  0  0
 0  0      0 7123456  16384 1983616    0    0     0     0   45   89  0  0 100  0  0
 0  0      0 7123456  16384 1983616    0    0     0     0   46   88  0  0 100  0  0
 0  0      0 7123456  16384 1983616    0    0     0     0   45   87  0  0 100  0  0
 0  0      0 7123456  16384 1983616    0    0     0    12   48   90  0  0 99  1  0
```

## Usage Examples

### Basic memory and CPU statistics

```console
$ vmstat
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 7123456  16384 1983616    0    0     0     2   51   92  1  1 98  0  0
```

### Monitoring system performance every 5 seconds for 10 iterations

```console
$ vmstat 5 10
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 7123456  16384 1983616    0    0     0     2   51   92  1  1 98  0  0
 0  0      0 7123456  16384 1983616    0    0     0     0   45   89  0  0 100  0  0
[output continues for 8 more iterations]
```

### Displaying disk statistics with timestamps

```console
$ vmstat -d -t
disk- ------------reads------------ ------------writes----------- -----IO------   ----timestamp----
       total merged sectors      ms  total merged sectors      ms    cur    sec
sda    12687   2713  972258   13364  10347   9944 1766952   23694      0     11   2025-05-05 10:15:30
```

## Tips

### Understanding the Output Columns

- **procs**: `r` shows runnable processes, `b` shows blocked processes
- **memory**: `swpd` is virtual memory used, `free` is idle memory
- **swap**: `si` is memory swapped in, `so` is memory swapped out
- **io**: `bi` is blocks received from block devices, `bo` is blocks sent
- **system**: `in` is interrupts per second, `cs` is context switches
- **cpu**: percentages of CPU time in user mode (`us`), system mode (`sy`), idle (`id`), waiting for I/O (`wa`), and stolen by hypervisor (`st`)

### First Line vs. Subsequent Lines

The first line of `vmstat` output shows averages since the last reboot, while subsequent lines show activity during the specified interval. For real-time analysis, focus on the lines after the first one.

### Identifying Memory Pressure

High values in the `si` and `so` columns indicate the system is swapping memory to disk, which can severely impact performance. This suggests you may need more RAM or need to optimize memory usage.

### Detecting I/O Bottlenecks

High values in the `wa` column of CPU statistics indicate processes are waiting for I/O operations to complete. This could point to disk bottlenecks.

## Frequently Asked Questions

#### Q1. What does a high value in the 'r' column indicate?
A. A high number in the 'r' column indicates many processes are waiting for CPU time, suggesting CPU contention or insufficient CPU resources.

#### Q2. How can I interpret swap activity in vmstat?
A. The 'si' and 'so' columns show swap-in and swap-out activity. Any non-zero values indicate the system is using swap space, which may slow performance. Consistent high values suggest memory shortage.

#### Q3. What's the difference between 'buff' and 'cache' in the memory section?
A. 'buff' (buffer) is memory used for file system metadata and 'cache' is memory used for file contents. Both are used to improve file system performance and can be reclaimed when applications need memory.

#### Q4. How do I monitor disk I/O with vmstat?
A. Use `vmstat -d` to display detailed disk statistics including reads, writes, and I/O times.

## References

https://man7.org/linux/man-pages/man8/vmstat.8.html

## Revisions

- 2025/05/05 First revision