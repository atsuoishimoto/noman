# stdbuf command

Modify buffering operations for standard streams.

## Overview

`stdbuf` runs a command with modified buffering operations for its standard input, output, and error streams. It allows you to control how data is buffered when a program writes to stdout or stderr, which is particularly useful when piping output between programs or when you need real-time output from a command that would otherwise buffer its output.

## Options

### **-i, --input=MODE**

Adjust the input stream buffering.

```console
$ stdbuf -i0 command
```

### **-o, --output=MODE**

Adjust the output stream buffering.

```console
$ stdbuf -o0 tail -f log.txt | grep "error"
```

### **-e, --error=MODE**

Adjust the error stream buffering.

```console
$ stdbuf -e0 command 2> errors.log
```

### **MODE values**

- **L**: Line buffered (output sent after each newline)
- **0**: Unbuffered (output sent immediately)
- **SIZE**: Fully buffered with specified buffer size (e.g., 4K, 8K)

## Usage Examples

### Unbuffered Output for Real-time Logs

```console
$ stdbuf -oL grep "error" large_log.txt | tee error_log.txt
[output appears line by line as matches are found]
```

### Combining Multiple Buffer Modifications

```console
$ stdbuf -o0 -e0 long_running_process | another_process
[output and error streams appear immediately without buffering]
```

### Monitoring Log Files in Real-time

```console
$ stdbuf -oL tail -f logfile.txt | grep --line-buffered "ERROR"
[ERROR] Connection failed at 14:32:15
[ERROR] Database timeout at 14:35:22
```

## Tips:

### When to Use Unbuffered Output

Use `-o0` when you need immediate output from a program, especially when piping to another command or when monitoring logs in real-time. This ensures that output appears as soon as it's generated rather than being held in a buffer.

### Line Buffering for Log Processing

Use `-oL` for commands that process logs line by line. This ensures each complete line is output immediately after processing, which is useful for real-time monitoring while maintaining line integrity.

### Performance Considerations

Be aware that unbuffered operation can reduce performance for commands that produce large amounts of output. Only use unbuffered mode when real-time output is necessary.

## Frequently Asked Questions

#### Q1. What's the difference between the different buffering modes?
A. Unbuffered (0) sends output immediately, line-buffered (L) sends output after each newline, and fully buffered sends output when the buffer fills up to a specified size.

#### Q2. Why doesn't stdbuf work with all commands?
A. `stdbuf` works by using the LD_PRELOAD mechanism to replace standard I/O functions, which doesn't work with statically linked programs or those that don't use standard I/O functions.

#### Q3. How can I tell if a command is buffering its output?
A. If output appears in chunks rather than continuously, it's likely being buffered. Try running the command with `stdbuf -o0` to see if the behavior changes.

#### Q4. What's the default buffering behavior for most commands?
A. By default, most commands use line buffering when output goes to a terminal, and full buffering when output is redirected to a file or pipe.

## References

https://www.gnu.org/software/coreutils/manual/html_node/stdbuf-invocation.html

## Revisions

- 2025/05/06 First revision