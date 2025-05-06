# df command

Display disk space usage for file systems.

## Overview

The `df` command reports file system disk space usage, showing information about mounted file systems including their total size, used space, available space, and mount points. It's commonly used to monitor disk space and identify file systems that are running low on space.

## Options

### **-h, --human-readable**

Display sizes in human-readable format (e.g., 1K, 234M, 2G)

```console
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        20G   15G  4.0G  79% /
tmpfs           3.9G     0  3.9G   0% /dev/shm
/dev/sda2       50G   20G   28G  42% /home
```

### **-T, --print-type**

Print file system type

```console
$ df -T
Filesystem     Type     1K-blocks    Used Available Use% Mounted on
/dev/sda1      ext4      20971520 15728640   4194304  79% /
tmpfs          tmpfs      4096000        0   4096000   0% /dev/shm
/dev/sda2      ext4      52428800 20971520  29360128  42% /home
```

### **-i, --inodes**

List inode information instead of block usage

```console
$ df -i
Filesystem      Inodes  IUsed   IFree IUse% Mounted on
/dev/sda1      1310720 354026  956694   27% /
tmpfs           999037      1  999036    1% /dev/shm
/dev/sda2      3276800 125892 3150908    4% /home
```

### **-a, --all**

Include dummy, duplicate, or inaccessible file systems

```console
$ df -a
Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/sda1       20971520 15728640   4194304  79% /
proc                   0        0         0    - /proc
sysfs                  0        0         0    - /sys
tmpfs            4096000        0   4096000   0% /dev/shm
/dev/sda2       52428800 20971520  29360128  42% /home
```

### **-P, --portability**

Use the POSIX output format

```console
$ df -P
Filesystem     1024-blocks      Used  Available Capacity Mounted on
/dev/sda1          20971520  15728640    4194304      79% /
tmpfs               4096000         0    4096000       0% /dev/shm
/dev/sda2          52428800  20971520   29360128      42% /home
```

## Usage Examples

### Checking space on a specific file system

```console
$ df -h /home
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2        50G   20G   28G  42% /home
```

### Combining options for detailed information

```console
$ df -hT
Filesystem     Type   Size  Used Avail Use% Mounted on
/dev/sda1      ext4    20G   15G  4.0G  79% /
tmpfs          tmpfs  3.9G     0  3.9G   0% /dev/shm
/dev/sda2      ext4    50G   20G   28G  42% /home
```

### Checking space on all file systems including special ones

```console
$ df -ha
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        20G   15G  4.0G  79% /
proc               0     0     0    - /proc
sysfs              0     0     0    - /sys
tmpfs            3.9G     0  3.9G   0% /dev/shm
/dev/sda2        50G   20G   28G  42% /home
```

## Tips

### Focus on Important File Systems

Use `df -h | grep -v tmpfs` to filter out temporary file systems and focus on physical disks.

### Identify Large File Systems

Combine with sort to identify the largest file systems: `df -h | sort -rh -k2`.

### Monitor Critical Thresholds

Watch for file systems with high usage percentages (over 90%) as they may need attention soon.

### Check Specific Mount Points

When troubleshooting, check specific mount points directly: `df -h /var` to see if a particular directory is running out of space.

## Frequently Asked Questions

#### Q1. What does the "Use%" column mean?
A. It shows the percentage of the file system's capacity that is currently in use.

#### Q2. How can I check disk space in a more readable format?
A. Use `df -h` for human-readable sizes (KB, MB, GB).

#### Q3. Why do some file systems show 0 size?
A. Special file systems like /proc and /sys are virtual and don't consume actual disk space.

#### Q4. How do I check inode usage?
A. Use `df -i` to display inode information instead of block usage.

#### Q5. What's the difference between df and du?
A. `df` reports disk space usage at the file system level, while `du` reports disk usage at the file and directory level.

## References

https://www.gnu.org/software/coreutils/manual/html_node/df-invocation.html

## Revisions

- 2025/05/05 First revision