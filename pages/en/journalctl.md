# journalctl command

Query and display messages from the systemd journal.

## Overview

`journalctl` is a command-line utility for querying and displaying logs collected by the systemd journal system. It allows users to view system logs, filter entries by various criteria, and follow logs in real-time. The systemd journal stores log data in a structured, indexed format that makes it efficient to search and retrieve specific information.

## Options

### **-f, --follow**

Follow the journal, displaying new entries as they are added.

```console
$ journalctl -f
May 06 14:32:10 hostname systemd[1]: Started Daily apt download activities.
May 06 14:32:15 hostname CRON[12345]: (root) CMD (command_from_crontab)
-- Logs begin at Mon 2025-05-06 14:32:10 UTC. --
```

### **-n, --lines=**

Show the specified number of most recent journal entries.

```console
$ journalctl -n 5
May 06 14:30:10 hostname systemd[1]: Started Session 42 of user username.
May 06 14:30:15 hostname sshd[12345]: Accepted publickey for username from 192.168.1.10
May 06 14:31:20 hostname sudo[12346]: username : TTY=pts/0 ; PWD=/home/username ; USER=root ; COMMAND=/usr/bin/apt update
May 06 14:31:45 hostname systemd[1]: Starting Daily apt upgrade and clean activities...
May 06 14:32:10 hostname systemd[1]: Started Daily apt download activities.
```

### **-u, --unit=**

Show logs from the specified systemd unit.

```console
$ journalctl -u ssh
May 06 08:15:20 hostname sshd[1234]: Server listening on 0.0.0.0 port 22.
May 06 08:15:20 hostname sshd[1234]: Server listening on :: port 22.
May 06 14:30:15 hostname sshd[12345]: Accepted publickey for username from 192.168.1.10
```

### **-b, --boot**

Show logs from the current boot. Use -b -1 for previous boot, -b -2 for the boot before that, etc.

```console
$ journalctl -b
May 06 08:00:01 hostname kernel: Linux version 5.15.0-generic
May 06 08:00:05 hostname systemd[1]: System Initialization.
May 06 08:00:10 hostname systemd[1]: Started Journal Service.
...
```

### **--since=, --until=**

Show entries newer or older than the specified date/time.

```console
$ journalctl --since="2025-05-06 10:00:00" --until="2025-05-06 11:00:00"
May 06 10:00:05 hostname systemd[1]: Started Scheduled task.
May 06 10:15:30 hostname nginx[1234]: 192.168.1.100 - - [06/May/2025:10:15:30 +0000] "GET / HTTP/1.1" 200 612
May 06 10:45:22 hostname kernel: [UFW BLOCK] IN=eth0 OUT= MAC=00:11:22:33:44:55 SRC=203.0.113.1
```

Time specifications can be flexible:

```console
$ journalctl --since="1 hour ago"
$ journalctl --since="yesterday" --until="today"
$ journalctl --since="2025-05-06" --until="2025-05-06 12:00:00"
$ journalctl --since="09:00" --until="10:00"
```

### **-p, --priority=**

Filter output by message priority (0-7 or debug, info, notice, warning, err, crit, alert, emerg).

```console
$ journalctl -p err
May 06 09:12:34 hostname application[1234]: Failed to connect to database: Connection refused
May 06 11:23:45 hostname kernel: CPU: 2 PID: 1234 Comm: process Tainted: G        W  O 5.15.0-generic
```

### **-k, --dmesg**

Show only kernel messages, similar to the output of the `dmesg` command.

```console
$ journalctl -k
May 06 08:00:01 hostname kernel: Linux version 5.15.0-generic
May 06 08:00:02 hostname kernel: Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-generic
May 06 08:00:03 hostname kernel: Memory: 16384MB available
```

### **-o, --output=**

Control the format of the output (short, short-precise, verbose, json, json-pretty, etc.).

```console
$ journalctl -n 1 -o json-pretty
{
    "__CURSOR" : "s=6c081a8b9c4b4f91a4a5f5c9d8e7f6a5;i=1234;b=5a4b3c2d1e0f;m=9876543210;t=5e4d3c2b1a09;x=abcdef0123456789",
    "__REALTIME_TIMESTAMP" : "1714924330000000",
    "__MONOTONIC_TIMESTAMP" : "9876543210",
    "_BOOT_ID" : "5a4b3c2d1e0f",
    "PRIORITY" : "6",
    "_MACHINE_ID" : "0123456789abcdef0123456789abcdef",
    "_HOSTNAME" : "hostname",
    "MESSAGE" : "Started Daily apt download activities.",
    "_PID" : "1",
    "_COMM" : "systemd",
    "_EXE" : "/usr/lib/systemd/systemd",
    "_SYSTEMD_CGROUP" : "/init.scope",
    "_SYSTEMD_UNIT" : "init.scope"
}
```

## Usage Examples

### Viewing logs for a specific service

```console
$ journalctl -u nginx.service
May 06 08:10:15 hostname systemd[1]: Started A high performance web server and a reverse proxy server.
May 06 08:10:16 hostname nginx[1234]: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
May 06 08:10:16 hostname nginx[1234]: nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### Filtering logs by time range

```console
$ journalctl --since yesterday --until today
May 05 00:00:10 hostname systemd[1]: Starting Daily Cleanup of Temporary Directories...
May 05 00:01:15 hostname systemd[1]: Finished Daily Cleanup of Temporary Directories.
...
May 05 23:59:45 hostname systemd[1]: Starting Daily apt upgrade and clean activities...
```

### Viewing logs from a specific executable

```console
$ journalctl /usr/bin/sshd
May 06 08:15:20 hostname sshd[1234]: Server listening on 0.0.0.0 port 22.
May 06 08:15:20 hostname sshd[1234]: Server listening on :: port 22.
May 06 14:30:15 hostname sshd[12345]: Accepted publickey for username from 192.168.1.10
```

### Combining multiple filters

```console
$ journalctl -u apache2.service --since today -p err
May 06 09:45:12 hostname apache2[2345]: [error] [client 192.168.1.50] File does not exist: /var/www/html/favicon.ico
May 06 13:22:30 hostname apache2[2345]: [error] [client 192.168.1.60] PHP Fatal error: Uncaught Error: Call to undefined function in /var/www/html/index.php:42
```

## Tips:

### Use Persistent Storage

By default, journal logs may be lost after reboot. To make logs persistent across reboots, create the directory `/var/log/journal`:

```console
$ sudo mkdir -p /var/log/journal
$ sudo systemd-tmpfiles --create --prefix /var/log/journal
```

### Limit Journal Size

Control journal size with `journalctl --vacuum-size=1G` to limit storage to 1GB, or `journalctl --vacuum-time=1month` to remove entries older than one month.

### Faster Searches with Field Filtering

Use field-specific searches for better performance:
```console
$ journalctl _SYSTEMD_UNIT=ssh.service _PID=1234
```

### Export Logs for Analysis

Export logs to a file for further analysis or sharing:
```console
$ journalctl -u nginx --since today > nginx-logs.txt
```

### Use Pagers Effectively

By default, journalctl pipes output through a pager like `less`. Press `/` to search, `n` for next match, and `q` to quit. Use `--no-pager` to disable the pager:

```console
$ journalctl --no-pager -n 20 > recent-logs.txt
```

## Frequently Asked Questions

#### Q1. How do I see logs from the current boot only?
A. Use `journalctl -b` to see logs from the current boot.

#### Q2. How can I see logs in real-time (like tail -f)?
A. Use `journalctl -f` to follow the journal and see new entries as they arrive.

#### Q3. How do I clear old journal entries?
A. Use `journalctl --vacuum-time=2d` to remove entries older than 2 days, or `journalctl --vacuum-size=500M` to limit the journal size to 500MB.

#### Q4. How can I see logs from a specific application?
A. Use `journalctl -u service-name.service` for systemd services or `journalctl /path/to/executable` for specific binaries.

#### Q5. How do I view kernel messages only?
A. Use `journalctl -k` or `journalctl --dmesg` to view only kernel messages.

#### Q6. How can I filter logs by a specific time period?
A. Use `journalctl --since="YYYY-MM-DD HH:MM:SS" --until="YYYY-MM-DD HH:MM:SS"` or more human-readable formats like `--since="1 hour ago"` or `--since="yesterday"`.

## References

https://www.freedesktop.org/software/systemd/man/journalctl.html

## Revisions

- 2025/05/06 Added more time specification examples and pager usage tip.
- 2025/05/05 First revision