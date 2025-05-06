# rsync command

Synchronize files and directories between local and remote systems or between local directories.

## Overview

`rsync` is a fast, versatile file copying and synchronization tool that efficiently transfers and synchronizes files between locations. It only copies the differences between source and destination, making it much faster than regular copy commands for subsequent transfers. It can work over SSH for secure remote transfers or locally between directories.

## Options

### **-a, --archive**

Archive mode; preserves permissions, ownership, timestamps, and recursively copies directories.

```console
$ rsync -a /source/directory/ /destination/directory/
```

### **-v, --verbose**

Increases verbosity, showing files being transferred and a summary at the end.

```console
$ rsync -av /source/directory/ /destination/directory/
sending incremental file list
file1.txt
file2.txt
directory/
directory/file3.txt

sent 1,234 bytes  received 42 bytes  2,552.00 bytes/sec
total size is 10,240  speedup is 8.04
```

### **-z, --compress**

Compresses file data during transfer to reduce bandwidth usage.

```console
$ rsync -az /source/directory/ user@remote:/destination/directory/
```

### **-P, --partial --progress**

Shows progress during transfer and keeps partially transferred files.

```console
$ rsync -avP large_file.iso user@remote:/destination/
sending incremental file list
large_file.iso
    153,092,096  14%   15.23MB/s    0:01:12
```

### **--delete**

Deletes files in the destination that don't exist in the source, making destination an exact mirror.

```console
$ rsync -av --delete /source/directory/ /destination/directory/
```

### **-n, --dry-run**

Performs a trial run without making any changes.

```console
$ rsync -avn --delete /source/directory/ /destination/directory/
```

### **-e, --rsh=COMMAND**

Specifies the remote shell to use (typically ssh with options).

```console
$ rsync -av -e "ssh -p 2222" /source/directory/ user@remote:/destination/
```

### **-u, --update**

Skip files that are newer on the destination.

```console
$ rsync -avu /source/directory/ /destination/directory/
```

### **--exclude=PATTERN**

Excludes files matching the specified pattern.

```console
$ rsync -av --exclude="*.log" /source/directory/ /destination/directory/
```

## Usage Examples

### Synchronize local directories

```console
$ rsync -av /home/user/documents/ /media/backup/documents/
sending incremental file list
report.docx
presentation.pptx
notes.txt

sent 15,234 bytes  received 85 bytes  30,638.00 bytes/sec
total size is 45,678  speedup is 2.98
```

### Backup to a remote server

```console
$ rsync -avz --delete ~/documents/ user@remote.server:/backup/documents/
sending incremental file list
./
report.docx
presentation.pptx
notes.txt

sent 45,678 bytes  received 612 bytes  9,258.00 bytes/sec
total size is 45,678  speedup is 0.99
```

### Download from a remote server

```console
$ rsync -avz user@remote.server:/remote/directory/ /local/directory/
receiving incremental file list
./
file1.txt
file2.txt
directory/
directory/file3.txt

received 10,240 bytes  received 214 bytes  6,969.33 bytes/sec
total size is 10,240  speedup is 0.98
```

### Mirror a website (excluding certain files)

```console
$ rsync -avz --delete --exclude="*.tmp" --exclude=".git/" /local/website/ user@server:/var/www/html/
```

## Tips:

### Use Trailing Slashes Carefully

A trailing slash on the source means "copy the contents of this directory" while no trailing slash means "copy this directory and its contents." This subtle difference can significantly change what gets copied.

### Preserve Hard Links

Use the `-H` or `--hard-links` option when you need to preserve hard links between files in the transferred set.

### Use Bandwidth Limiting for Large Transfers

For large transfers over networks, use `--bwlimit=KBPS` to limit bandwidth usage (e.g., `--bwlimit=1000` limits to 1000 KB/s).

### Create Backup Snapshots

Combine rsync with the `--link-dest` option to create efficient backup snapshots that use hard links for unchanged files, saving disk space.

```console
$ rsync -av --link-dest=/backups/daily.1 /source/ /backups/daily.0/
```

## Frequently Asked Questions

#### Q1. How does rsync differ from scp?
A. rsync only transfers the differences between files, making subsequent transfers much faster. It also offers more options for synchronization, preservation of attributes, and can resume interrupted transfers.

#### Q2. How can I test what rsync will do before actually doing it?
A. Use the `-n` or `--dry-run` option to see what would be transferred without making any changes.

#### Q3. How do I synchronize files while preserving all attributes?
A. Use the `-a` (archive) option, which is equivalent to `-rlptgoD` (recursive, preserve links, permissions, times, group, owner, and special files).

#### Q4. Can rsync delete files at the destination that don't exist in the source?
A. Yes, use the `--delete` option to make the destination an exact mirror of the source.

#### Q5. How can I exclude certain files or directories?
A. Use `--exclude=PATTERN` for individual patterns or `--exclude-from=FILE` to read patterns from a file.

## References

https://download.samba.org/pub/rsync/rsync.html

## Revisions

- 2025/05/05 First revision