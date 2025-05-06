# dd command

Convert and copy files with block-level operations.

## Overview

The `dd` command copies data between files using specified block sizes, performing conversions during the copy. It's commonly used for tasks like creating disk images, backing up partitions, wiping disks, and benchmarking I/O performance. Unlike most Unix commands, `dd` uses a unique syntax with `option=value` pairs rather than traditional flags.

## Options

### **if=FILE**

Specifies the input file to read from. If not specified, stdin is used.

```console
$ dd if=/dev/sda
```

### **of=FILE**

Specifies the output file to write to. If not specified, stdout is used.

```console
$ dd if=/dev/sda of=/dev/sdb
```

### **bs=BYTES**

Sets both input and output block size to BYTES. This can significantly affect performance.

```console
$ dd if=/dev/zero of=testfile bs=1M count=100
100+0 records in
100+0 records out
104857600 bytes (105 MB, 100 MiB) transferred in 0.083 seconds, 1.3 GB/s
```

### **count=N**

Copy only N input blocks. Limits the amount of data copied.

```console
$ dd if=/dev/urandom of=random.dat bs=1M count=10
10+0 records in
10+0 records out
10485760 bytes (10 MB, 10 MiB) transferred in 0.035 seconds, 299 MB/s
```

### **status=LEVEL**

Controls the information displayed while dd is running:
- `none`: No output until completion
- `noxfer`: Suppress the final transfer statistics
- `progress`: Show periodic transfer statistics

```console
$ dd if=/dev/zero of=testfile bs=1G count=1 status=progress
536870912 bytes (537 MB, 512 MiB) copied, 0.5 s, 1.1 GB/s
1+0 records in
1+0 records out
1073741824 bytes (1.1 GB, 1.0 GiB) transferred in 0.969 seconds, 1.1 GB/s
```

### **conv=CONVS**

Perform conversions on the data. Multiple conversions can be specified, separated by commas:
- `sync`: Pad input blocks with zeros
- `noerror`: Continue after read errors
- `notrunc`: Don't truncate the output file

```console
$ dd if=/dev/sda of=disk.img conv=sync,noerror
```

## Usage Examples

### Creating a bootable USB drive

```console
$ sudo dd if=ubuntu.iso of=/dev/sdb bs=4M status=progress
1485881344 bytes (1.5 GB, 1.4 GiB) copied, 120 s, 12.4 MB/s
354+1 records in
354+1 records out
1485881344 bytes (1.5 GB, 1.4 GiB) transferred in 120.023 seconds, 12.4 MB/s
```

### Creating a disk image

```console
$ sudo dd if=/dev/sda of=disk_backup.img bs=8M status=progress
20971520000 bytes (21 GB, 20 GiB) copied, 300 s, 70 MB/s
2500+0 records in
2500+0 records out
20971520000 bytes (21 GB, 20 GiB) transferred in 300.123 seconds, 69.9 MB/s
```

### Wiping a disk with zeros

```console
$ sudo dd if=/dev/zero of=/dev/sdb bs=8M status=progress
8589934592 bytes (8.6 GB, 8.0 GiB) copied, 120 s, 71.6 MB/s
1024+0 records in
1024+0 records out
8589934592 bytes (8.6 GB, 8.0 GiB) transferred in 120.001 seconds, 71.6 MB/s
```

## Tips

### Use Appropriate Block Size

The `bs` parameter significantly affects performance. For most operations, values between 1M and 8M provide good performance. Too small (like the default 512 bytes) can be very slow, while too large may waste memory.

### Always Use Status=progress

Adding `status=progress` provides real-time feedback on long-running operations, which is essential when copying large amounts of data.

### Send SIGUSR1 Signal for Progress Updates

If you forgot to use `status=progress`, you can send the USR1 signal to get a progress update:

```console
$ kill -USR1 $(pgrep dd)
```

### Be Extremely Careful with Device Names

Double-check device names (like `/dev/sda`) before running dd. Using the wrong output device can destroy data. The command `lsblk` can help identify the correct devices.

## Frequently Asked Questions

#### Q1. Why is dd called "disk destroyer"?
A. This nickname comes from its power to completely overwrite disks without confirmation. A simple typo in device names can lead to catastrophic data loss.

#### Q2. How can I make dd run faster?
A. Use larger block sizes (bs=4M or bs=8M), ensure you're not hitting I/O bottlenecks, and consider using `oflag=direct` to bypass the buffer cache for certain operations.

#### Q3. How do I monitor dd progress?
A. Use `status=progress` option or send the USR1 signal to the dd process with `kill -USR1 $(pgrep dd)`.

#### Q4. Why does dd use different syntax from other Unix commands?
A. dd's syntax (option=value) comes from IBM's JCL (Job Control Language) and was preserved for historical reasons when it was implemented in Unix.

## References

https://www.gnu.org/software/coreutils/manual/html_node/dd-invocation.html

## Revisions

- 2025/05/05 First revision