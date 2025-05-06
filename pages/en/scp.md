# scp command

Securely copy files between hosts on a network using SSH for data transfer.

## Overview

`scp` (secure copy) transfers files between hosts over an encrypted SSH connection. It works similarly to the `cp` command but can copy files to or from remote systems. The command handles authentication, encryption, and file transfers in a single operation, making it a convenient tool for secure file transfers.

## Options

### **-r**

Recursively copy entire directories.

```console
$ scp -r documents/ user@remote:/home/user/backup/
user@remote's password: 
file1.txt                                 100%  123     1.2KB/s   00:00    
file2.txt                                 100%  456     4.5KB/s   00:00
```

### **-P**

Specify a different port for the SSH connection (note: uppercase P, unlike ssh which uses lowercase p).

```console
$ scp -P 2222 file.txt user@remote:/home/user/
user@remote's password: 
file.txt                                  100%  789     7.8KB/s   00:00
```

### **-p**

Preserve modification times, access times, and modes from the original file.

```console
$ scp -p important.conf user@remote:/etc/
user@remote's password: 
important.conf                            100%  321     3.2KB/s   00:00
```

### **-C**

Enable compression during the transfer.

```console
$ scp -C largefile.zip user@remote:/home/user/
user@remote's password: 
largefile.zip                             100%  10MB    5.0MB/s   00:02
```

### **-q**

Quiet mode - disables the progress meter and warning/diagnostic messages.

```console
$ scp -q confidential.pdf user@remote:/home/user/
user@remote's password: 
```

### **-i**

Specify an identity file (private key) for public key authentication.

```console
$ scp -i ~/.ssh/mykey.pem file.txt user@remote:/home/user/
file.txt                                  100%  789     7.8KB/s   00:00
```

## Usage Examples

### Copying a file to a remote server

```console
$ scp document.txt user@remote.server.com:/home/user/documents/
user@remote.server.com's password: 
document.txt                              100%  1234     12.3KB/s   00:00
```

### Copying a file from a remote server

```console
$ scp user@remote.server.com:/home/user/report.pdf ./
user@remote.server.com's password: 
report.pdf                                100%  5678     56.7KB/s   00:01
```

### Copying between two remote hosts

```console
$ scp user1@source.com:/files/data.txt user2@destination.com:/backup/
user1@source.com's password: 
user2@destination.com's password: 
data.txt                                  100%  2345     23.4KB/s   00:00
```

### Copying multiple files at once

```console
$ scp file1.txt file2.txt user@remote:/destination/
user@remote's password: 
file1.txt                                 100%  123     1.2KB/s   00:00
file2.txt                                 100%  456     4.5KB/s   00:00
```

## Tips:

### Use SSH Config to Simplify Commands

If you have hosts defined in your `~/.ssh/config` file, you can use the host aliases instead of typing full hostnames and usernames.

### Escape Special Characters in Filenames

When specifying filenames with spaces or special characters, use quotes or escape them with backslashes.

### Use Public Key Authentication

Set up SSH keys to avoid typing passwords for each transfer. This is both more secure and more convenient.

### Bandwidth Limiting

Use the `-l` option to limit bandwidth usage (in Kbit/s) when transferring large files over slow connections.

## Frequently Asked Questions

#### Q1. How does scp differ from regular cp?
A. `scp` works over SSH to copy files between different hosts securely, while `cp` only copies files locally on the same system.

#### Q2. Can I resume an interrupted transfer?
A. No, `scp` doesn't support resuming interrupted transfers. For that functionality, consider using `rsync` instead.

#### Q3. How can I copy an entire directory?
A. Use the `-r` (recursive) option: `scp -r /source/directory user@remote:/destination/`

#### Q4. Is scp secure?
A. Yes, `scp` uses SSH for authentication and encryption, making it secure for transferring files over untrusted networks.

#### Q5. Why is my scp transfer slow?
A. Try using the `-C` option to enable compression, or check network conditions. For large directories with many small files, consider using `tar` to create an archive first.

## References

https://man.openbsd.org/scp.1

## Revisions

- 2025/05/05 First revision