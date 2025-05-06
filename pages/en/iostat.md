# iostat command

Display CPU and I/O statistics for devices and partitions.

## Overview

`iostat` reports CPU statistics and input/output statistics for devices, partitions, and network filesystems. It's primarily used for monitoring system input/output device loading by observing the time devices are active in relation to their average transfer rates.

## Options

### **-c**

Display only CPU statistics.

```console
$ iostat -c
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98
```

### **-d**

Display only device statistics.

```console
$ iostat -d
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               5.73       141.61        45.28         0.00    1250432     399764          0
sdb               0.02         0.63         0.00         0.00       5548          0          0
```

### **-x**

Display extended statistics for devices.

```console
$ iostat -x
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
sda              4.21    1.52    141.61     45.28     0.10     0.57   2.33  27.29    0.63    2.38   0.01    33.63    29.72   0.28   0.16
sdb              0.02    0.00      0.63      0.00     0.00     0.00   0.00   0.00    0.71    0.00   0.00    31.53     0.00   0.57   0.00
```

### **-k**

Display statistics in kilobytes per second.

```console
$ iostat -k
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               5.73       141.61        45.28         0.00    1250432     399764          0
sdb               0.02         0.63         0.00         0.00       5548          0          0
```

### **-m**

Display statistics in megabytes per second.

```console
$ iostat -m
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device             tps    MB_read/s    MB_wrtn/s    MB_dscd/s    MB_read    MB_wrtn    MB_dscd
sda               5.73         0.14         0.04         0.00       1221        390          0
sdb               0.02         0.00         0.00         0.00          5          0          0
```

### **-p [device]**

Display statistics for block devices and all their partitions.

```console
$ iostat -p sda
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               5.73       141.61        45.28         0.00    1250432     399764          0
sda1              0.01         0.32         0.00         0.00       2832          0          0
sda2              5.71       141.29        45.28         0.00    1247600     399764          0
```

### **-t**

Print the time for each report displayed.

```console
$ iostat -t
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

05/05/2025 10:15:30 AM
avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               5.73       141.61        45.28         0.00    1250432     399764          0
sdb               0.02         0.63         0.00         0.00       5548          0          0
```

### **interval [count]**

Specify the reporting interval in seconds and the number of reports.

```console
$ iostat 2 3
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               5.73       141.61        45.28         0.00    1250432     399764          0
sdb               0.02         0.63         0.00         0.00       5548          0          0

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.50    0.00    1.75    0.25    0.00   94.50

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda              10.50       320.00       112.00         0.00        640        224          0
sdb               0.00         0.00         0.00         0.00          0          0          0

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.38    0.00    1.50    0.12    0.00   95.00

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               8.00       256.00        64.00         0.00        512        128          0
sdb               0.00         0.00         0.00         0.00          0          0          0
```

## Usage Examples

### Monitoring disk I/O with extended statistics

```console
$ iostat -xd 5
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
sda              4.21    1.52    141.61     45.28     0.10     0.57   2.33  27.29    0.63    2.38   0.01    33.63    29.72   0.28   0.16
sdb              0.02    0.00      0.63      0.00     0.00     0.00   0.00   0.00    0.71    0.00   0.00    31.53     0.00   0.57   0.00

[Output repeats every 5 seconds]
```

### Monitoring specific partitions

```console
$ iostat -p sda 2
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
sda               5.73       141.61        45.28         0.00    1250432     399764          0
sda1              0.01         0.32         0.00         0.00       2832          0          0
sda2              5.71       141.29        45.28         0.00    1247600     399764          0

[Output repeats every 2 seconds]
```

### Displaying CPU and disk statistics in megabytes

```console
$ iostat -cm 1 3
Linux 5.15.0-91-generic (hostname)  05/05/2025  _x86_64_  (8 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           3.25    0.00    1.42    0.35    0.00   94.98

[Output repeats 3 times at 1-second intervals]
```

## Tips

### Understanding %util

The %util metric shows the percentage of CPU time during which I/O requests were issued to the device. A value close to 100% indicates saturation, meaning the device is working at its maximum capacity.

### Identifying I/O Bottlenecks

Look for high values in the await column (average time for I/O requests to be served). High await times combined with high %util values indicate potential I/O bottlenecks.

### Continuous Monitoring

For real-time monitoring, use `iostat` with an interval (e.g., `iostat -x 2`). This will continuously update the statistics every 2 seconds until interrupted with Ctrl+C.

### Combining with Other Tools

Use `iostat` in conjunction with tools like `top`, `vmstat`, and `sar` for a comprehensive system performance analysis.

## Frequently Asked Questions

#### Q1. What does the %iowait value in CPU statistics mean?
A. %iowait represents the percentage of time that the CPU was idle during which the system had pending disk I/O requests. High iowait values indicate that the system is bottlenecked by disk operations.

#### Q2. How do I interpret the r_await and w_await columns?
A. r_await and w_await show the average time (in milliseconds) for read and write requests to be served, including the time spent in the queue and the service time. Higher values indicate slower I/O operations.

#### Q3. What's the difference between tps and IOPS?
A. tps (transfers per second) represents the number of I/O requests completed per second, regardless of the size. IOPS (I/O operations per second) is essentially the same metric but is often used in storage performance discussions.

#### Q4. How can I see statistics for a specific device only?
A. Use `iostat -d device_name` to show statistics only for the specified device.

## References

https://man7.org/linux/man-pages/man1/iostat.1.html

## Revisions

- 2025/05/05 First revision