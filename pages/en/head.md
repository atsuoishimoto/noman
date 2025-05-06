# head command

Display the first part of files.

## Overview

The `head` command outputs the first part of files to standard output. By default, it prints the first 10 lines of each specified file. If multiple files are specified, it precedes each with a header identifying the file name.

## Options

### **-n, --lines=N**

Print the first N lines instead of the default 10

```console
$ head -n 5 file.txt
Line 1
Line 2
Line 3
Line 4
Line 5
```

### **-c, --bytes=N**

Print the first N bytes of each file

```console
$ head -c 20 file.txt
This is the first 20
```

### **-q, --quiet, --silent**

Never print headers giving file names

```console
$ head -q file1.txt file2.txt
(content of file1.txt)
(content of file2.txt)
```

### **-v, --verbose**

Always print headers giving file names

```console
$ head -v file.txt
==> file.txt <==
Line 1
Line 2
...
```

## Usage Examples

### View the beginning of a log file

```console
$ head /var/log/syslog
May  5 10:15:01 hostname CRON[12345]: (root) CMD (command -v debian-sa1 > /dev/null && debian-sa1 1 1)
May  5 10:17:01 hostname CRON[12346]: (root) CMD (/usr/local/bin/backup.sh)
...
```

### View the first few lines of multiple files

```console
$ head -n 3 *.conf
==> apache.conf <==
# Apache configuration
ServerName localhost
Listen 80

==> nginx.conf <==
# Nginx configuration
worker_processes auto;
events {
```

### Using head with pipes

```console
$ ps aux | head -5
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0 168940  9416 ?        Ss   May04   0:02 /sbin/init
root         2  0.0  0.0      0     0 ?        S    May04   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        I<   May04   0:00 [rcu_gp]
root         4  0.0  0.0      0     0 ?        I<   May04   0:00 [rcu_par_gp]
```

## Tips

### Combining with tail

Use `head` and `tail` together to extract specific line ranges:

```console
$ head -n 20 file.txt | tail -n 10
```
This shows lines 11-20 of the file.

### Using negative numbers

With GNU head, you can use `-n -N` to print all lines except the last N:

```console
$ head -n -5 file.txt
```
This shows all lines except the last 5.

### Monitoring growing files

Unlike `tail -f`, `head` doesn't have a follow mode. Use `tail` with the `-f` option when you need to monitor files that are actively being written to.

## Frequently Asked Questions

#### Q1. What's the difference between head and tail?
A. `head` shows the beginning of a file (first 10 lines by default), while `tail` shows the end of a file (last 10 lines by default).

#### Q2. How can I view a specific number of characters instead of lines?
A. Use the `-c` option: `head -c 100 file.txt` will show the first 100 bytes of the file.

#### Q3. How do I view the first few lines of multiple files without the filename headers?
A. Use the `-q` option: `head -q file1.txt file2.txt`

#### Q4. Can head follow a file as it grows like tail -f?
A. No, `head` doesn't have a follow mode. Use `tail -f` for monitoring growing files.

## References

https://www.gnu.org/software/coreutils/manual/html_node/head-invocation.html

## Revisions

- 2025/05/05 First revision