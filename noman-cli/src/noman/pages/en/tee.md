# tee command

Read from standard input and write to both standard output and files.

## Overview

The `tee` command reads from standard input and writes to both standard output and one or more files simultaneously. This allows you to view command output in the terminal while also saving it to a file, making it useful for logging and debugging.

## Options

### **-a, --append**

Append to the given files, do not overwrite them.

```console
$ echo "Additional line" | tee -a logfile.txt
Additional line
```

### **-i, --ignore-interrupts**

Ignore interrupt signals (SIGINT).

```console
$ long_running_command | tee -i output.log
```

### **--help**

Display help information and exit.

```console
$ tee --help
Usage: tee [OPTION]... [FILE]...
Copy standard input to each FILE, and also to standard output.

  -a, --append              append to the given FILEs, do not overwrite
  -i, --ignore-interrupts   ignore interrupt signals
      --help     display this help and exit
      --version  output version information and exit

If a FILE is -, copy again to standard output.
```

### **--version**

Output version information and exit.

```console
$ tee --version
tee (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by Mike Parker, Richard M. Stallman, and David MacKenzie.
```

## Usage Examples

### Saving command output while viewing it

```console
$ ls -la | tee directory_listing.txt
total 32
drwxr-xr-x  5 user  staff   160 May  5 10:15 .
drwxr-xr-x  3 user  staff    96 May  4 09:30 ..
-rw-r--r--  1 user  staff  2048 May  5 10:10 file1.txt
-rw-r--r--  1 user  staff  4096 May  5 10:12 file2.txt
```

### Writing to multiple files at once

```console
$ echo "Hello, world!" | tee file1.txt file2.txt file3.txt
Hello, world!
```

### Using tee in a pipeline

```console
$ cat input.txt | grep "error" | tee errors.log | wc -l
5
```

### Writing to a file that requires elevated privileges

```console
$ echo "127.0.0.1 example.com" | sudo tee -a /etc/hosts
127.0.0.1 example.com
```

## Tips:

### Use tee for sudo operations on files

When you need to redirect output to a file that requires root privileges, using `sudo command > file` won't work because the redirection happens before sudo. Instead, use `command | sudo tee file` to properly handle permissions.

### Create logs while monitoring output

When troubleshooting, use tee to create logs while still seeing the output in real-time: `command | tee logfile.txt`.

### Write to both a file and another command

You can use tee to branch a pipeline: `command | tee file.txt | another_command`.

### Use /dev/tty to force output to terminal

If you need to ensure output goes to the terminal even when redirected: `command | tee /dev/tty | another_command`.

## Frequently Asked Questions

#### Q1. What does the name "tee" come from?
A. The name comes from the T-splitter used in plumbing, as the command splits the input into multiple outputs, resembling a "T" shape.

#### Q2. How do I append to a file instead of overwriting it?
A. Use the `-a` or `--append` option: `command | tee -a file.txt`.

#### Q3. Can tee write to standard error instead of standard output?
A. No, tee always writes to standard output. To redirect to standard error, you would need additional shell redirection: `command | tee file.txt >&2`.

#### Q4. How can I use tee to write to a file that requires root permissions?
A. Use sudo with tee: `command | sudo tee /path/to/restricted/file`.

## References

https://www.gnu.org/software/coreutils/manual/html_node/tee-invocation.html

## Revisions

- 2025/05/05 First revision