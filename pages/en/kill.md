# kill command

Terminate or send signals to processes.

## Overview

The `kill` command sends signals to processes, most commonly used to terminate running processes. By default, it sends the TERM (terminate) signal, but it can send any specified signal to a process identified by its process ID (PID) or job specification.

## Options

### **-s, --signal [signal]**

Specify the signal to send (by name or number)

```console
$ kill -s SIGTERM 1234
```

### **-l, --list [signal]**

List available signal names or convert signal names to/from numbers

```console
$ kill -l
 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP
 6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1
11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM
...
```

### **-9**

Send the SIGKILL signal, which forces process termination and cannot be caught or ignored

```console
$ kill -9 1234
```

### **-15**

Send the SIGTERM signal (default), which requests graceful termination

```console
$ kill -15 1234
```

## Usage Examples

### Terminating a process by PID

```console
$ kill 1234
```

### Forcefully terminating a process

```console
$ kill -9 1234
```

### Sending a specific signal by name

```console
$ kill -s SIGHUP 1234
```

### Sending a signal to multiple processes

```console
$ kill -TERM 1234 5678 9012
```

## Tips:

### Find Process IDs First

Use `ps` or `pgrep` to find the PID before using kill:

```console
$ pgrep firefox
1234
$ kill 1234
```

### Use pkill for Name-Based Killing

Instead of finding PIDs first, use `pkill` to kill processes by name:

```console
$ pkill firefox
```

### Understand Signal Differences

- SIGTERM (15): Default signal, allows process to clean up before exiting
- SIGKILL (9): Forceful termination, use only when necessary
- SIGHUP (1): Often used to make processes reload configuration

## Frequently Asked Questions

#### Q1. What's the difference between kill -9 and kill -15?
A. `kill -15` (SIGTERM) requests graceful termination, allowing the process to clean up. `kill -9` (SIGKILL) forces immediate termination and cannot be caught or ignored by the process.

#### Q2. How do I kill a process if I don't know its PID?
A. Use `pkill` followed by the process name: `pkill firefox`. Alternatively, find the PID first with `ps aux | grep process_name`.

#### Q3. Why doesn't kill -9 work sometimes?
A. Processes in uninterruptible sleep states (usually waiting for I/O) or zombie processes cannot be killed even with SIGKILL. Also, only processes you own or root can kill can be terminated.

#### Q4. How do I kill all processes of a specific user?
A. Use `pkill -u username` to kill all processes owned by a specific user.

## References

https://www.gnu.org/software/coreutils/manual/html_node/kill-invocation.html

## Revisions

- 2025/05/05 First revision