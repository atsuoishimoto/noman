# sftp command

Securely transfer files between hosts over an encrypted SSH connection.

## Overview

SFTP (Secure File Transfer Protocol) is a network protocol that provides file access, file transfer, and file management over a secure connection. The `sftp` command is an interactive file transfer program similar to FTP, but it performs all operations over an encrypted SSH transport.

## Options

### **-b** *batchfile*

Process batch file of sftp commands.

```console
$ sftp -b commands.txt user@remote.server
Connecting to remote.server...
sftp> get file.txt
Fetching /home/user/file.txt to file.txt
sftp> exit
```

### **-F** *ssh_config*

Specifies an alternative per-user configuration file for ssh.

```console
$ sftp -F ~/.ssh/custom_config user@remote.server
Connecting to remote.server...
```

### **-i** *identity_file*

Selects the file from which the identity (private key) for public key authentication is read.

```console
$ sftp -i ~/.ssh/private_key user@remote.server
Connecting to remote.server...
```

### **-l** *limit*

Limits the used bandwidth, specified in Kbit/s.

```console
$ sftp -l 100 user@remote.server
Connecting to remote.server...
```

### **-P** *port*

Specifies the port to connect to on the remote host.

```console
$ sftp -P 2222 user@remote.server
Connecting to remote.server...
```

### **-r**

Recursively copy entire directories.

```console
$ sftp user@remote.server
sftp> get -r remote_directory
```

### **-v**

Raises the logging level, causing sftp to print debugging messages about its progress.

```console
$ sftp -v user@remote.server
OpenSSH_8.1p1, LibreSSL 2.7.3
debug1: Reading configuration data /etc/ssh/ssh_config
...
```

## Usage Examples

### Connecting to a Remote Server

```console
$ sftp user@remote.server
Connected to remote.server.
sftp>
```

### Downloading Files

```console
$ sftp user@remote.server
sftp> get remote_file.txt local_file.txt
Fetching /home/user/remote_file.txt to local_file.txt
sftp>
```

### Uploading Files

```console
$ sftp user@remote.server
sftp> put local_file.txt remote_file.txt
Uploading local_file.txt to /home/user/remote_file.txt
sftp>
```

### Navigating Directories

```console
$ sftp user@remote.server
sftp> pwd
Remote working directory: /home/user
sftp> cd documents
sftp> pwd
Remote working directory: /home/user/documents
sftp> lcd ~/downloads
sftp> lpwd
Local working directory: /Users/localuser/downloads
```

### Listing Files

```console
$ sftp user@remote.server
sftp> ls
file1.txt  file2.txt  documents/  images/
sftp> lls
local_file1.txt  local_file2.txt  downloads/
```

## Tips:

### Use Tab Completion

SFTP supports tab completion for both local and remote files, making it easier to navigate and transfer files without typing full paths.

### Create Aliases for Common Connections

Add aliases to your shell configuration file for frequently used SFTP connections:
```bash
alias work-sftp='sftp user@work-server.com'
```

### Use Wildcards for Multiple File Transfers

Transfer multiple files at once using wildcards:
```
sftp> get *.txt
```

### Enable Compression for Slow Connections

Use the `-C` option to enable compression, which can speed up transfers on slow connections:
```
$ sftp -C user@remote.server
```

## Frequently Asked Questions

#### Q1. What's the difference between SFTP and FTP?
A. SFTP uses SSH for secure, encrypted file transfers, while traditional FTP sends data (including passwords) in plaintext, making it vulnerable to interception.

#### Q2. How do I transfer an entire directory?
A. Use the recursive option with get or put: `get -r remote_directory` or `put -r local_directory`.

#### Q3. Can I automate SFTP transfers?
A. Yes, use the `-b` option with a batch file containing SFTP commands, or consider using `scp` for simple transfers in scripts.

#### Q4. How do I exit the SFTP session?
A. Type `exit` or `quit` at the sftp prompt, or press Ctrl+D.

#### Q5. How can I see what commands are available in SFTP?
A. Type `help` or `?` at the sftp prompt to see a list of available commands.

## References

https://man.openbsd.org/sftp.1

## Revisions

- 2025/05/05 First revision