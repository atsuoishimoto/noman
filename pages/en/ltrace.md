# ltrace command

Trace library calls of a program.

## Overview

`ltrace` is a debugging utility that displays dynamic library calls made by a program during execution. It can also show system calls and signals received. This tool is valuable for understanding how a program interacts with libraries, diagnosing issues, and reverse engineering applications.

## Options

### **-c**

Count time, calls, and report a summary at the end.

```console
$ ltrace -c ls
% time     seconds  usecs/call     calls      function
------ ----------- ----------- --------- --------------------
 28.57    0.000040          8         5 strlen
 21.43    0.000030         15         2 readdir64
 14.29    0.000020         10         2 closedir
 14.29    0.000020         10         2 opendir
  7.14    0.000010         10         1 __errno_location
  7.14    0.000010         10         1 fclose
  7.14    0.000010         10         1 fopen
------ ----------- ----------- --------- --------------------
100.00    0.000140                    14 total
```

### **-f**

Trace child processes as they are created by currently traced processes.

```console
$ ltrace -f ./parent_program
[pid 12345] malloc(32)                                      = 0x55d45e9a12a0
[pid 12345] fork()                                          = 12346
[pid 12346] malloc(64)                                      = 0x55d45e9a1340
```

### **-e PATTERN**

Specify which library calls to trace or which not to trace.

```console
$ ltrace -e malloc+free ls
ls->malloc(24)                                             = 0x55d45e9a12a0
ls->malloc(13)                                             = 0x55d45e9a1340
ls->free(0x55d45e9a12a0)                                   = <void>
ls->free(0x55d45e9a1340)                                   = <void>
```

### **-p PID**

Attach to the process with the specified PID and begin tracing.

```console
$ ltrace -p 1234
[pid 1234] read(5, "Hello World", 1024)                    = 11
[pid 1234] write(1, "Hello World", 11)                     = 11
```

### **-S**

Display system calls as well as library calls.

```console
$ ltrace -S ls
SYS_brk(NULL)                                              = 0x55d45e9a1000
SYS_access("/etc/ld.so.preload", R_OK)                     = -2
malloc(256)                                                = 0x55d45e9a12a0
SYS_open("/etc/ld.so.cache", O_RDONLY)                     = 3
```

### **-o FILENAME**

Write the trace output to the file FILENAME rather than to stderr.

```console
$ ltrace -o trace.log ls
$ cat trace.log
malloc(256)                                                = 0x55d45e9a12a0
free(0x55d45e9a12a0)                                       = <void>
```

## Usage Examples

### Basic Usage

```console
$ ltrace ls
__libc_start_main(0x401670, 1, 0x7ffd74a3c648, 0x406750 <unfinished ...>
strrchr("ls", '/')                                         = NULL
setlocale(LC_ALL, "")                                      = "en_US.UTF-8"
bindtextdomain("coreutils", "/usr/share/locale")           = "/usr/share/locale"
textdomain("coreutils")                                    = "coreutils"
__cxa_atexit(0x402860, 0, 0, 0x736c6974)                   = 0
isatty(1)                                                  = 1
getenv("QUOTING_STYLE")                                    = NULL
getenv("COLUMNS")                                          = NULL
ioctl(1, 21523, 0x7ffd74a3c4e0)                            = 0
...
+++ exited (status 0) +++
```

### Tracing Specific Functions

```console
$ ltrace -e malloc+free+open ./program
program->malloc(1024)                                      = 0x55d45e9a12a0
program->open("/etc/passwd", 0, 0)                         = 3
program->free(0x55d45e9a12a0)                              = <void>
```

### Tracing with Time Information

```console
$ ltrace -tt ls
15:30:45.789012 __libc_start_main(0x401670, 1, 0x7ffd74a3c648, 0x406750 <unfinished ...>
15:30:45.789234 strrchr("ls", '/')                         = NULL
15:30:45.789456 setlocale(LC_ALL, "")                      = "en_US.UTF-8"
...
15:30:45.795678 +++ exited (status 0) +++
```

## Tips

### Filter Out Noise

Use the `-e` option to focus on specific function calls you're interested in, reducing output clutter:
```console
$ ltrace -e malloc+free+open ./program
```

### Combine with Other Tools

Pipe ltrace output to grep to find specific function calls:
```console
$ ltrace ./program 2>&1 | grep "open"
```

### Trace Child Processes

When debugging complex applications that spawn child processes, use `-f` to follow them:
```console
$ ltrace -f ./server
```

### Save Output for Later Analysis

For long-running programs, save the trace to a file with `-o`:
```console
$ ltrace -o debug.log ./program
```

## Frequently Asked Questions

#### Q1. What's the difference between ltrace and strace?
A. `ltrace` traces library calls (functions from shared libraries), while `strace` traces system calls (interactions with the kernel). Use `ltrace -S` to see both.

#### Q2. Why doesn't ltrace show all function calls?
A. `ltrace` only shows calls to external libraries, not internal function calls within the program itself. For that, you would need a profiler or debugger.

#### Q3. Can ltrace slow down the traced program?
A. Yes, tracing adds significant overhead. The program will run slower, especially with `-f` (follow forks) enabled.

#### Q4. How do I trace a program that's already running?
A. Use `ltrace -p PID` to attach to an already running process.

#### Q5. Can I use ltrace on statically linked binaries?
A. No, `ltrace` primarily works with dynamically linked executables since it intercepts calls to shared libraries.

## References

https://man7.org/linux/man-pages/man1/ltrace.1.html

## Revisions

- 2025/05/05 First revision