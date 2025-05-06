# killall command

Terminates processes by name rather than by process ID.

## Overview

The `killall` command sends a signal to all processes running any of the specified commands. By default, it sends the TERM signal, which requests the process to terminate. Unlike the `kill` command which requires process IDs, `killall` allows you to specify process names, making it easier to terminate multiple related processes at once.

## Options

### **-e, --exact**

Require an exact match for very long names. If a command name is longer than 15 characters, the full name might be unavailable, and `killall` normally kills everything that matches within the first 15 characters. With this option, such entries are skipped.

```console
$ killall -e long_running_process_name
```

### **-I, --ignore-case**

Do case insensitive process name match.

```console
$ killall -I firefox
```

### **-i, --interactive**

Ask for confirmation before killing each process.

```console
$ killall -i chrome
Kill chrome(1234) ? (y/N) y
Kill chrome(5678) ? (y/N) n
```

### **-l, --list**

List all known signal names.

```console
$ killall -l
HUP INT QUIT ILL TRAP ABRT BUS FPE KILL USR1 SEGV USR2 PIPE ALRM TERM STKFLT CHLD CONT STOP TSTP TTIN TTOU URG XCPU XFSZ VTALRM PROF WINCH POLL PWR SYS
```

### **-q, --quiet**

Do not complain if no processes were killed.

```console
$ killall -q nonexistent_process
```

### **-r, --regexp**

Interpret process names as extended regular expressions.

```console
$ killall -r 'fire.*'
```

### **-s, --signal SIGNAL, -SIGNAL**

Send a specific signal instead of TERM. The signal can be specified by name or number.

```console
$ killall -s KILL firefox
$ killall -9 firefox    # Same as above, using signal number
```

### **-u, --user USER**

Kill only processes owned by the specified user.

```console
$ killall -u username firefox
```

### **-v, --verbose**

Report if the signal was successfully sent.

```console
$ killall -v firefox
Killed firefox(1234) with signal 15
```

### **-w, --wait**

Wait for all killed processes to die. Killall checks once per second if any of the killed processes still exist and only returns if none are left.

```console
$ killall -w firefox
```

## Usage Examples

### Killing all instances of a specific application

```console
$ killall firefox
```

### Forcefully terminating a process

```console
$ killall -9 chrome
```

### Killing processes owned by a specific user

```console
$ killall -u john java
```

### Killing processes with confirmation

```console
$ killall -i node
Kill node(1234) ? (y/N) y
Kill node(5678) ? (y/N) n
```

## Tips:

### Use Confirmation for Important Systems

When terminating processes on production systems, use the `-i` (interactive) flag to confirm each termination, preventing accidental shutdowns of critical services.

### Force Kill with Caution

The `-9` (KILL) signal should be used as a last resort since it doesn't allow processes to clean up resources, potentially causing data corruption or orphaned temporary files.

### Verify Before Killing

Use `ps aux | grep [process_name]` before running killall to verify which processes will be affected, especially when using pattern matching.

### Wait for Completion

Use the `-w` flag when you need to ensure processes are fully terminated before starting new ones, particularly useful in scripts.

## Frequently Asked Questions

#### Q1. What's the difference between `kill` and `killall`?
A. `kill` terminates processes by their process ID (PID), while `killall` terminates processes by their name, allowing you to kill multiple instances at once.

#### Q2. How do I forcefully terminate a process?
A. Use `killall -9 process_name` or `killall -s KILL process_name` to send the SIGKILL signal, which cannot be caught or ignored by the process.

#### Q3. Why didn't `killall` terminate my process?
A. This could happen if you don't have permission to kill the process (try using sudo), if the process name is misspelled, or if the process is in an uninterruptible state.

#### Q4. Is `killall` safe to use?
A. Generally yes, but be careful on some Unix systems (like Solaris) where `killall` might kill ALL processes, potentially shutting down the system. On Linux and macOS, it only kills processes matching the specified name.

## macOS Considerations

On macOS, `killall` behaves similarly to Linux but has fewer options. The `-e`, `-r`, and some other options may not be available. Also, macOS's `killall` doesn't support the `-w` (wait) option. Always check the available options with `man killall` on your specific system.

## References

https://man7.org/linux/man-pages/man1/killall.1.html

## Revisions

- 2025/05/05 First revision