# free command

Display amount of free and used memory in the system.

## Overview

The `free` command displays the total amount of free and used physical and swap memory in the system, as well as the buffers and caches used by the kernel. It provides a snapshot of memory usage, helping users monitor system resources and diagnose memory-related issues.

## Options

### **-b**

Display the amount of memory in bytes.

```console
$ free -b
              total        used        free      shared  buff/cache   available
Mem:    8273514496  3868327936  1535881216   602931200  2869305344  3459538944
Swap:   2147479552           0  2147479552
```

### **-k**

Display the amount of memory in kilobytes (default).

```console
$ free -k
              total        used        free      shared  buff/cache   available
Mem:        8079604     3777664     1500860      588800     2801080     3378456
Swap:       2097148           0     2097148
```

### **-m**

Display the amount of memory in megabytes.

```console
$ free -m
              total        used        free      shared  buff/cache   available
Mem:           7889        3689        1465         574        2735        3299
Swap:          2047           0        2047
```

### **-g**

Display the amount of memory in gigabytes.

```console
$ free -g
              total        used        free      shared  buff/cache   available
Mem:              7           3           1           0           2           3
Swap:             1           0           1
```

### **-h, --human**

Show all output fields automatically scaled to shortest three-digit unit and display units.

```console
$ free -h
              total        used        free      shared  buff/cache   available
Mem:          7.7Gi       3.6Gi       1.4Gi       574Mi       2.7Gi       3.2Gi
Swap:         2.0Gi          0B       2.0Gi
```

### **-s, --seconds N**

Continuously display the result with N second delay between updates.

```console
$ free -s 2
              total        used        free      shared  buff/cache   available
Mem:        8079604     3777664     1500860      588800     2801080     3378456
Swap:       2097148           0     2097148

              total        used        free      shared  buff/cache   available
Mem:        8079604     3778112     1500412      588800     2801080     3378008
Swap:       2097148           0     2097148
```

### **-t, --total**

Display a line showing the column totals.

```console
$ free -t
              total        used        free      shared  buff/cache   available
Mem:        8079604     3777664     1500860      588800     2801080     3378456
Swap:       2097148           0     2097148
Total:     10176752     3777664     3598008
```

### **-w, --wide**

Switch to the wide mode. The wide mode produces lines longer than 80 characters. In this mode buffers and cache are reported in two separate columns.

```console
$ free -w
              total        used        free      shared     buffers       cache   available
Mem:        8079604     3777664     1500860      588800      245760     2555320     3378456
Swap:       2097148           0     2097148
```

## Usage Examples

### Basic memory information

```console
$ free
              total        used        free      shared  buff/cache   available
Mem:        8079604     3777664     1500860      588800     2801080     3378456
Swap:       2097148           0     2097148
```

### Human-readable output with totals

```console
$ free -ht
              total        used        free      shared  buff/cache   available
Mem:          7.7Gi       3.6Gi       1.4Gi       574Mi       2.7Gi       3.2Gi
Swap:         2.0Gi          0B       2.0Gi
Total:        9.7Gi       3.6Gi       3.4Gi
```

### Continuous monitoring with 5-second intervals

```console
$ free -h -s 5
              total        used        free      shared  buff/cache   available
Mem:          7.7Gi       3.6Gi       1.4Gi       574Mi       2.7Gi       3.2Gi
Swap:         2.0Gi          0B       2.0Gi
```

## Tips

### Understanding Memory Output

- **total**: Total installed memory
- **used**: Memory currently in use
- **free**: Unused memory
- **shared**: Memory shared by multiple processes
- **buff/cache**: Memory used by kernel buffers and page cache
- **available**: Estimate of memory available for starting new applications without swapping

### Interpreting "Available" vs "Free"

The "available" column is more important than "free" when assessing if your system has enough memory. It includes memory that can be freed and used by applications.

### Monitoring Memory Over Time

Use `free -s N` to monitor memory usage over time, which helps identify memory leaks or usage patterns.

### Clearing Cache Memory

System administrators can free pagecache, dentries, and inodes with:
```console
$ sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```
(Note: This should be done carefully and is rarely necessary in normal operation)

## Frequently Asked Questions

#### Q1. What does it mean if my "free" memory is very low?
A. Low free memory isn't necessarily a problem. Linux uses available memory for disk caching to improve performance. Look at the "available" column for a better indication of memory that can be allocated to applications.

#### Q2. Why is my swap memory not being used?
A. Swap is only used when physical memory is nearly exhausted or for inactive memory pages. If your system has plenty of RAM, swap might remain unused.

#### Q3. How can I monitor memory usage continuously?
A. Use `free -s N` where N is the number of seconds between updates. For example, `free -s 5` will update every 5 seconds.

#### Q4. What's the difference between buffers and cache?
A. Buffers are used for block device I/O, while cache is used for file system pages. In the standard output, they're combined as "buff/cache", but can be viewed separately with the `-w` option.

## References

https://www.man7.org/linux/man-pages/man1/free.1.html

## Revisions

- 2025/05/05 First revision