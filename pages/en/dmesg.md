# dmesg command

Display or control the kernel ring buffer, showing system messages and hardware information.

## Overview

The `dmesg` command examines or controls the kernel ring buffer, which contains messages from the kernel about hardware devices, driver initializations, and system events. It's particularly useful for troubleshooting hardware issues, checking boot messages, and monitoring system events.

## Options

### **-c, --clear**

Clear the ring buffer after printing its contents.

```console
$ sudo dmesg -c
[    0.000000] Linux version 5.15.0-76-generic (buildd@lcy02-amd64-017) (gcc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #83-Ubuntu SMP
[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-76-generic root=UUID=1234abcd-1234-1234-1234-1234abcd5678 ro quiet splash
[... more kernel messages ...]
```

### **-H, --human**

Enable human-readable output with timestamps in a readable format.

```console
$ dmesg -H
[May  5 09:15:32] Linux version 5.15.0-76-generic (buildd@lcy02-amd64-017) (gcc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #83-Ubuntu SMP
[May  5 09:15:32] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-76-generic root=UUID=1234abcd-1234-1234-1234-1234abcd5678 ro quiet splash
[... more kernel messages ...]
```

### **-l, --level**

Restrict output to the specified priority levels (comma-separated list).

```console
$ dmesg --level=err,warn
[    5.123456] CPU: 0 PID: 123 Comm: systemd-udevd Not tainted 5.15.0-76-generic #83-Ubuntu
[    7.234567] usb 1-2: device descriptor read/64, error -110
[... more error and warning messages ...]
```

### **-f, --facility**

Restrict output to the specified facilities (comma-separated list).

```console
$ dmesg --facility=kern
[    0.000000] Linux version 5.15.0-76-generic (buildd@lcy02-amd64-017) (gcc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #83-Ubuntu SMP
[... more kernel messages ...]
```

### **-T, --ctime**

Display human-readable timestamps (using ctime format).

```console
$ dmesg -T
[Mon May  5 09:15:32 2025] Linux version 5.15.0-76-generic (buildd@lcy02-amd64-017) (gcc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #83-Ubuntu SMP
[Mon May  5 09:15:32 2025] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-76-generic root=UUID=1234abcd-1234-1234-1234-1234abcd5678 ro quiet splash
```

### **-w, --follow**

Wait for new messages (similar to `tail -f`).

```console
$ dmesg -w
[    0.000000] Linux version 5.15.0-76-generic
[... existing messages ...]
[  123.456789] usb 1-1: new high-speed USB device number 2 using xhci_hcd
[... new messages appear as they occur ...]
```

## Usage Examples

### Filtering for USB-related messages

```console
$ dmesg | grep -i usb
[    2.123456] usb 1-1: new high-speed USB device number 2 using xhci_hcd
[    2.234567] usb 1-1: New USB device found, idVendor=abcd, idProduct=1234, bcdDevice= 1.00
[    2.345678] usb 1-1: New USB device strings: Mfr=1, Product=2, SerialNumber=3
```

### Checking for disk or filesystem errors

```console
$ dmesg | grep -i 'error\|fail\|warn' | grep -i 'disk\|sda\|ext4\|fs'
[   15.123456] EXT4-fs (sda1): mounted filesystem with ordered data mode
[  234.567890] Buffer I/O error on dev sda2, logical block 12345, async page read
```

### Monitoring kernel messages in real-time

```console
$ sudo dmesg -wH
[May  5 09:20:15] Linux version 5.15.0-76-generic
[... existing messages ...]
[May  5 09:25:32] usb 1-1: new high-speed USB device number 2 using xhci_hcd
[... new messages appear as they occur with human-readable timestamps ...]
```

## Tips

### Use sudo for Full Access

On many systems, regular users may have limited access to kernel messages. Use `sudo dmesg` to see all messages, especially when troubleshooting hardware issues.

### Combine with grep for Targeted Troubleshooting

When troubleshooting specific hardware, pipe `dmesg` output to `grep` with relevant keywords like `dmesg | grep -i wifi` for wireless issues or `dmesg | grep -i sda` for disk problems.

### Check Boot Messages After System Updates

After kernel updates or system changes, review `dmesg` output to ensure all hardware is properly detected and no errors occurred during initialization.

### Clear the Buffer for Fresh Monitoring

Use `sudo dmesg -c` to clear the buffer after reviewing messages, then monitor for new issues without the clutter of old messages.

## Frequently Asked Questions

#### Q1. Why do I need sudo to run dmesg on some systems?
A. On many modern Linux distributions, access to kernel messages is restricted for security reasons. Using `sudo` provides the necessary privileges to view all messages.

#### Q2. How can I see timestamps in a readable format?
A. Use `dmesg -T` for human-readable timestamps in ctime format, or `dmesg -H` for a more concise human-readable output with relative timestamps.

#### Q3. How do I monitor dmesg output continuously?
A. Use `dmesg -w` or `dmesg --follow` to watch for new messages in real-time, similar to `tail -f`.

#### Q4. How can I save dmesg output to a file?
A. Use redirection: `dmesg > dmesg_output.txt` or `dmesg | tee dmesg_output.txt` to both display and save the output.

## References

https://man7.org/linux/man-pages/man1/dmesg.1.html

## Revisions

- 2025/05/05 First revision