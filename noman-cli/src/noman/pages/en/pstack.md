# pstack command

Print a stack trace of running processes.

## Overview

`pstack` is a utility that attaches to a running process and prints a stack trace of all threads in that process. It's particularly useful for debugging hung or misbehaving processes without having to restart them or set up a debugger in advance.

## Options

`pstack` is a simple command that doesn't have many options. It primarily takes a process ID (PID) as its argument.

## Usage Examples

### Basic Usage

```console
$ pstack 1234
Thread 1 (process 1234):
#0  0x00007f8e2d72dea3 in poll () from /lib64/libc.so.6
#1  0x00007f8e2c8b11d8 in ?? () from /lib64/libpulse.so.0
#2  0x00007f8e2c8a9e3c in pa_mainloop_poll () from /lib64/libpulse.so.0
#3  0x00007f8e2c8aa41c in pa_mainloop_iterate () from /lib64/libpulse.so.0
#4  0x00007f8e2c8aa49c in pa_mainloop_run () from /lib64/libpulse.so.0
#5  0x00007f8e2c8b1228 in ?? () from /lib64/libpulse.so.0
#6  0x00007f8e2c8a4259 in ?? () from /lib64/libpulse.so.0
#7  0x00007f8e2d6c1609 in start_thread () from /lib64/libpthread.so.0
#8  0x00007f8e2d7e7163 in clone () from /lib64/libc.so.6
```

### Multiple Processes

```console
$ pstack 1234 5678
==> 1234 <==
Thread 1 (process 1234):
#0  0x00007f8e2d72dea3 in poll () from /lib64/libc.so.6
#1  0x00007f8e2c8b11d8 in ?? () from /lib64/libpulse.so.0
...

==> 5678 <==
Thread 1 (process 5678):
#0  0x00007f9a3c45ea35 in nanosleep () from /lib64/libc.so.6
#1  0x000055d7e44f5b1a in main ()
```

## Tips

### Finding Process IDs

Before using `pstack`, you'll need to know the process ID. Use `ps` or `pidof` to find it:

```console
$ ps aux | grep firefox
user     1234  2.5  1.8 2589452 298796 ?      Sl   09:15   0:45 /usr/lib/firefox/firefox

$ pidof firefox
1234
```

### Debugging Hung Processes

When a process appears to be frozen, use `pstack` to see what it's doing:

```console
$ pstack $(pidof frozen_app)
```

### Root Privileges

For processes you don't own, you'll need to use `sudo`:

```console
$ sudo pstack 1234
```

### Alternative Commands

On some systems, `pstack` might not be available. You can use these alternatives:
- `gdb -p PID -ex "thread apply all bt" -batch`
- `jstack` for Java processes

## Frequently Asked Questions

#### Q1. What does `pstack` actually do?
A. `pstack` attaches to a running process using debugging facilities and extracts the current call stack of all threads in that process, then prints them in a readable format.

#### Q2. Is `pstack` available on all Unix systems?
A. No, `pstack` is not a standard Unix command. It's commonly available on Linux systems, particularly those derived from Red Hat. On other systems, you might need to use alternatives like `gdb`.

#### Q3. Can `pstack` affect the running process?
A. `pstack` temporarily stops the process while extracting the stack trace, but this pause is typically very brief and shouldn't affect normal operation.

#### Q4. Why do some stack frames show "??" instead of function names?
A. This typically happens when debugging symbols aren't available for that particular library or executable. The process is still running normally, but `pstack` can't determine the exact function names.

## References

https://man7.org/linux/man-pages/man1/pstack.1.html

## Revisions

- 2025/05/05 First revision