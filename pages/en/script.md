# script command

Make a typescript of a terminal session.

## Overview

The `script` command creates a record (typescript) of everything displayed in your terminal session. It captures all input and output, allowing you to save terminal interactions to a file for documentation, sharing, or review purposes.

## Options

### **-a, --append**

Append the output to the specified file or typescript, rather than overwriting it.

```console
$ script -a session.log
Script started, file is session.log
$ echo "This will be appended to the existing file"
This will be appended to the existing file
$ exit
Script done, file is session.log
```

### **-f, --flush**

Flush output after each write to ensure real-time recording, useful when monitoring the typescript file while the session is active.

```console
$ script -f realtime.log
Script started, file is realtime.log
$ echo "This output is flushed immediately"
This output is flushed immediately
$ exit
Script done, file is realtime.log
```

### **-q, --quiet**

Run in quiet mode, suppressing the start and done messages.

```console
$ script -q quiet.log
$ echo "No start/end messages displayed"
No start/end messages displayed
$ exit
```

### **-t, --timing=FILE**

Output timing data to FILE, which can be used with the scriptreplay command to replay the session at the original speed.

```console
$ script -t timing.log typescript.log
Script started, file is typescript.log
$ echo "This session can be replayed later"
This session can be replayed later
$ exit
Script done, file is typescript.log
```

## Usage Examples

### Basic Usage

```console
$ script my_session.log
Script started, file is my_session.log
$ ls
Documents  Downloads  Pictures
$ echo "Hello, world!"
Hello, world!
$ exit
Script done, file is my_session.log
```

### Recording a Session for Later Replay

```console
$ script --timing=timing.log typescript.log
Script started, file is typescript.log
$ echo "This is a demonstration"
This is a demonstration
$ ls -la
total 20
drwxr-xr-x  2 user user 4096 May  5 10:00 .
drwxr-xr-x 20 user user 4096 May  5 09:55 ..
-rw-r--r--  1 user user  220 May  5 09:55 .bash_logout
$ exit
Script done, file is typescript.log
$ scriptreplay timing.log typescript.log
```

## Tips

### Replay a Recorded Session

Use `scriptreplay` with the timing file to replay a recorded session at its original speed:
```console
$ scriptreplay timing.log typescript.log
```

### Avoid Capturing Sensitive Information

Be cautious when using `script` for sessions where sensitive information (like passwords) might be entered. The typescript will contain everything displayed on the terminal.

### Use with SSH Sessions

Record remote SSH sessions by starting `script` before connecting:
```console
$ script ssh_session.log
$ ssh user@remote-server
```

### Terminate Properly

Always end your script session with `exit` or Ctrl+D to ensure the typescript file is properly closed and saved.

## Frequently Asked Questions

#### Q1. What is the default filename if none is specified?
A. If no filename is specified, `script` uses "typescript" as the default output file.

#### Q2. Can I record a session and share it with others?
A. Yes, the typescript file contains all terminal output and can be shared. For a more interactive experience, use the `-t` option to create a timing file and share both files for replay with `scriptreplay`.

#### Q3. How do I view the contents of a typescript file?
A. You can view it with any text editor or terminal pager like `less` or `more`:
```console
$ less typescript
```

#### Q4. Does script record commands that aren't displayed?
A. No, `script` only records what is displayed on the terminal. Commands entered with no echo (like passwords) won't appear in the typescript.

## References

https://www.man7.org/linux/man-pages/man1/script.1.html

## Revisions

- 2025/05/05 First revision