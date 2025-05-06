# perf command

Performance analysis tool for Linux, providing hardware counter statistics and tracing capabilities.

## Overview

`perf` is a powerful Linux profiling tool that accesses the performance monitoring hardware counters of the CPU to gather statistics about program execution. It can monitor CPU performance events, trace system calls, profile applications, and analyze hardware and software events. Part of the Linux kernel tools, it helps identify performance bottlenecks in applications and the system.

## Options

### **stat**

Runs a command and gathers performance counter statistics

```console
$ perf stat ls
Documents  Downloads  Pictures  Videos

 Performance counter stats for 'ls':

              0.93 msec task-clock                #    0.781 CPUs utilized          
                 0      context-switches          #    0.000 K/sec                  
                 0      cpu-migrations            #    0.000 K/sec                  
                89      page-faults               #    0.096 M/sec                  
           1,597,086      cycles                  #    1.724 GHz                    
           1,221,363      instructions            #    0.76  insn per cycle         
             245,931      branches                #  265.518 M/sec                  
              10,764      branch-misses           #    4.38% of all branches        

       0.001189061 seconds time elapsed

       0.001090000 seconds user
       0.000000000 seconds sys
```

### **record**

Records performance data for later analysis

```console
$ perf record -g ./myprogram
[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 0.064 MB perf.data (1302 samples) ]
```

### **report**

Displays performance data from a previous recording

```console
$ perf report
# Samples: 1302
#
# Overhead  Command      Shared Object        Symbol
# ........  .......  .................  ..............
#
    35.71%  myprogram  myprogram           [.] process_data
    24.58%  myprogram  libc-2.31.so        [.] malloc
    15.21%  myprogram  myprogram           [.] calculate_result
```

### **top**

System profiling tool for Linux, similar to top but with performance counter information

```console
$ perf top
Samples: 42K of event 'cycles', 4000 Hz, Event count (approx.): 10456889073
Overhead  Shared Object                       Symbol
  12.67%  [kernel]                            [k] _raw_spin_unlock_irqrestore
   4.71%  [kernel]                            [k] finish_task_switch
   2.82%  [kernel]                            [k] __schedule
   2.40%  firefox                             [.] 0x00000000022e002d
```

### **list**

Lists available events for monitoring

```console
$ perf list
List of pre-defined events (to be used in -e):

  cpu-cycles OR cycles                               [Hardware event]
  instructions                                       [Hardware event]
  cache-references                                   [Hardware event]
  cache-misses                                       [Hardware event]
  branch-instructions OR branches                    [Hardware event]
  branch-misses                                      [Hardware event]
  ...
```

### **-e, --event**

Specifies which events to monitor (used with other commands)

```console
$ perf stat -e cycles,instructions,cache-misses ./myprogram
 Performance counter stats for './myprogram':

     1,234,567,890      cycles
       987,654,321      instructions              #    0.80  insn per cycle
         5,432,109      cache-misses

       1.234567890 seconds time elapsed
```

### **-p, --pid**

Monitors a specific process by its PID

```console
$ perf record -p 1234
^C[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 0.452 MB perf.data (2371 samples) ]
```

### **-g, --call-graph**

Enables call-graph (stack chain/backtrace) recording

```console
$ perf record -g ./myprogram
[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 0.128 MB perf.data (2567 samples) ]
```

## Usage Examples

### Profiling CPU usage of a command

```console
$ perf stat -d ls -la
total 56
drwxr-xr-x  9 user user 4096 May  5 10:00 .
drwxr-xr-x 28 user user 4096 May  4 15:30 ..
-rw-r--r--  1 user user 8980 May  5 09:45 file.txt

 Performance counter stats for 'ls -la':

              1.52 msec task-clock                #    0.812 CPUs utilized          
                 0      context-switches          #    0.000 K/sec                  
                 0      cpu-migrations            #    0.000 K/sec                  
               102      page-faults               #    0.067 M/sec                  
         3,842,901      cycles                    #    2.530 GHz                    
         5,779,212      instructions              #    1.50  insn per cycle         
         1,059,631      branches                  #  697.128 M/sec                  
            36,789      branch-misses             #    3.47% of all branches        
         1,254,898      L1-dcache-loads           #  825.590 M/sec                  
            45,632      L1-dcache-load-misses     #    3.64% of all L1-dcache accesses

       0.001871938 seconds time elapsed

       0.001871000 seconds user
       0.000000000 seconds sys
```

### Recording and analyzing application performance

```console
$ perf record -g ./myapplication
[ perf record: Woken up 1 times to write data ]
[ perf record: Captured and wrote 0.253 MB perf.data (3842 samples) ]

$ perf report
# To display the perf.data header info, please use --header/--header-only options.
#
# Samples: 3K of event 'cycles'
# Event count (approx.): 3842000000
#
# Overhead  Command        Shared Object        Symbol
# ........  .......  .................  ..............
#
    35.42%  myapplication  myapplication        [.] process_data
    21.67%  myapplication  libc-2.31.so         [.] malloc
    15.89%  myapplication  myapplication        [.] calculate_result
```

### Monitoring specific hardware events

```console
$ perf stat -e L1-dcache-loads,L1-dcache-load-misses,L1-dcache-stores ./myprogram
 Performance counter stats for './myprogram':

       123,456,789      L1-dcache-loads
         2,345,678      L1-dcache-load-misses     #    1.90% of all L1-dcache accesses
        98,765,432      L1-dcache-stores

       2.345678901 seconds time elapsed
```

## Tips:

### Run as Root for Full Access

Many perf features require root privileges. Use `sudo perf` to access all hardware counters and system-wide profiling capabilities.

### Use Flame Graphs for Visualization

Convert perf data to flame graphs for easier analysis:
```console
$ perf record -g ./myprogram
$ perf script | FlameGraph/stackcollapse-perf.pl | FlameGraph/flamegraph.pl > flamegraph.svg
```

### Focus on Hotspots

When analyzing performance data, concentrate on functions with the highest overhead percentages first, as these represent the best optimization opportunities.

### Reduce Overhead During Recording

For production profiling, use sampling at a lower frequency with `-F` to reduce the performance impact:
```console
$ perf record -F 99 -g -p 1234
```

### Annotate Source Code

Use `perf annotate` to see which specific lines of code are causing performance issues:
```console
$ perf annotate -d ./myprogram
```

## Frequently Asked Questions

#### Q1. What's the difference between perf stat and perf record?
A. `perf stat` provides a summary of performance metrics after a command completes, while `perf record` captures detailed performance data that can be analyzed later with `perf report`.

#### Q2. How can I profile a running process?
A. Use `perf record -p PID` to attach to a running process by its process ID.

#### Q3. How do I interpret the output of perf report?
A. The "Overhead" column shows the percentage of samples attributed to each function, helping identify performance bottlenecks. Higher percentages indicate functions consuming more CPU time.

#### Q4. Can perf profile GPU performance?
A. Standard perf primarily focuses on CPU and system performance. For GPU profiling, specialized tools like NVIDIA's nvprof or AMD's ROCm profiler are more appropriate.

#### Q5. How can I reduce the size of perf.data files?
A. Use the `--freq` or `-F` option with a lower sampling rate, or limit the data collection duration with the `-a` option and a time specification.

## References

https://perf.wiki.kernel.org/index.php/Main_Page

## Revisions

- 2025/05/05 First revision