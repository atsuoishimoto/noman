# strace command

Trace system calls and signals for a process.

## Overview

`strace` is a diagnostic and debugging utility for Linux that traces the system calls and signals of a specified program. It intercepts and records the system calls made by a process and the signals received by it, making it an invaluable tool for troubleshooting, understanding program behavior, and diagnosing issues with applications.

## Options

### **-f**

Trace child processes as they are created by currently traced processes.

```console
$ strace -f ./my_program
execve("./my_program", ["./my_program"], 0x7ffc8e5bb4a0 /* 58 vars */) = 0
brk(NULL)                               = 0x55a8a9899000
[pid 12345] clone(child_stack=NULL, flags=CLONE_CHILD|SIGCHLD, ...) = 12346
[pid 12346] execve("/bin/ls", ["ls"], 0x7ffc8e5bb4a0 /* 58 vars */) = 0
```

### **-p PID**

Attach to the process with the specified PID and begin tracing.

```console
$ strace -p 1234
strace: Process 1234 attached
read(3, "Hello, world!\n", 4096)        = 14
write(1, "Hello, world!\n", 14)         = 14
```

### **-o FILENAME**

Write the trace output to a file instead of stderr.

```console
$ strace -o trace.log ls
$ cat trace.log
execve("/bin/ls", ["ls"], 0x7ffc8e5bb4a0 /* 58 vars */) = 0
brk(NULL)                               = 0x55a8a9899000
access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
```

### **-e EXPR**

A qualifying expression that modifies which events to trace or how to trace them.

```console
$ strace -e open,close ls
open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
close(3)                                = 0
open("/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
close(3)                                = 0
```

### **-c**

Count time, calls, and errors for each system call and report a summary.

```console
$ strace -c ls
% time     seconds  usecs/call     calls    errors syscall
------ ----------- ----------- --------- --------- ----------------
 25.00    0.000125          21         6           mmap
 20.00    0.000100          25         4           open
 15.00    0.000075          25         3           read
 10.00    0.000050          17         3           close
------ ----------- ----------- --------- --------- ----------------
100.00    0.000500                    45         5 total
```

### **-t**

Prefix each line of the trace with the time of day.

```console
$ strace -t ls
14:15:23 execve("/bin/ls", ["ls"], 0x7ffc8e5bb4a0 /* 58 vars */) = 0
14:15:23 brk(NULL)                      = 0x55a8a9899000
14:15:23 access("/etc/ld.so.preload", R_OK) = -1 ENOENT (No such file or directory)
```

## Usage Examples

### Tracing a program from start to finish

```console
$ strace ls -l
execve("/bin/ls", ["ls", "-l"], 0x7ffc8e5bb4a0 /* 58 vars */) = 0
brk(NULL)                               = 0x55a8a9899000
access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
...
```

### Tracing specific system calls

```console
$ strace -e trace=open,read,write ls
openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0\360\23\2\0\0\0\0\0"..., 832) = 832
write(1, "file1.txt  file2.txt  file3.txt\n", 32) = 32
```

### Attaching to a running process and saving output to a file

```console
$ strace -p 1234 -o process_trace.log
strace: Process 1234 attached
^C
$ cat process_trace.log
read(4, "data from socket", 1024)       = 16
write(1, "data from socket", 16)        = 16
```

## Tips:

### Filter System Calls

Use `-e trace=` to focus on specific system calls. For example, `-e trace=network` shows only network-related calls, making it easier to debug connection issues.

### Understand Performance Issues

Use `-c` to get a summary of time spent in each system call. This helps identify which system calls are taking the most time in your application.

### Trace Child Processes

Always use `-f` when tracing programs that fork child processes. Without it, you'll only see the parent process activity.

### Reduce Output Verbosity

For large files or buffers, use `-s` followed by a number to limit string output length. For example, `-s 100` limits strings to 100 characters.

### Timestamp Your Traces

Add `-t` or `-tt` (for microsecond precision) to include timestamps in your trace, which helps correlate events with other logs.

## Frequently Asked Questions

#### Q1. What's the difference between strace and ltrace?
A. `strace` traces system calls (interactions between programs and the kernel), while `ltrace` traces library calls (interactions between programs and libraries).

#### Q2. How do I trace a program that requires root privileges?
A. Run strace with sudo: `sudo strace command`. To attach to a running process owned by root, use `sudo strace -p PID`.

#### Q3. Why is my program running much slower when traced with strace?
A. Tracing adds significant overhead because it intercepts every system call. This is normal behavior and should be considered when interpreting timing results.

#### Q4. How can I see only file-related operations?
A. Use `strace -e trace=file command` to see only file-related system calls.

#### Q5. Can strace trace multithreaded applications?
A. Yes, use `strace -f` to follow threads (which are implemented as processes in Linux).

## References

https://man7.org/linux/man-pages/man1/strace.1.html

## Revisions

- 2025/05/05 First revision