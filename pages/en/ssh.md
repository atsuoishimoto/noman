# ssh command

Securely connect to remote systems over an encrypted network connection.

## Overview

SSH (Secure Shell) is a protocol for securely accessing remote computers and executing commands remotely. It provides encrypted communications between two untrusted hosts over an insecure network, replacing older protocols like telnet and rsh. SSH is commonly used for remote login, command execution, file transfers, and tunneling other applications.

## Options

### **-p port**

Specifies the port to connect to on the remote host (default is 22)

```console
$ ssh -p 2222 user@example.com
user@example.com's password: 
Last login: Mon May 5 10:23:45 2025 from 192.168.1.100
user@example.com:~$ 
```

### **-i identity_file**

Selects a file from which the identity (private key) for public key authentication is read

```console
$ ssh -i ~/.ssh/my_private_key user@example.com
Last login: Mon May 5 09:15:30 2025 from 192.168.1.100
user@example.com:~$ 
```

### **-v**

Verbose mode, useful for debugging connection issues

```console
$ ssh -v user@example.com
OpenSSH_8.9p1, LibreSSL 3.3.6
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: Connecting to example.com port 22.
debug1: Connection established.
...
```

### **-L local_port:remote_host:remote_port**

Forwards a local port to a port on the remote host

```console
$ ssh -L 8080:localhost:80 user@example.com
user@example.com's password: 
Last login: Mon May 5 11:30:22 2025 from 192.168.1.100
```

### **-X**

Enables X11 forwarding, allowing graphical applications to be displayed locally

```console
$ ssh -X user@example.com
user@example.com's password: 
Last login: Mon May 5 14:45:10 2025 from 192.168.1.100
user@example.com:~$ firefox
```

### **-t**

Force pseudo-terminal allocation, useful for executing interactive programs on the remote system

```console
$ ssh -t user@example.com "sudo apt update"
user@example.com's password: 
[sudo] password for user: 
Get:1 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
...
```

## Usage Examples

### Basic SSH Connection

```console
$ ssh user@example.com
user@example.com's password: 
Last login: Mon May 5 08:30:15 2025 from 192.168.1.100
user@example.com:~$ 
```

### Running a Command on Remote Host

```console
$ ssh user@example.com "ls -la"
total 32
drwxr-xr-x 5 user user 4096 May  5 08:30 .
drwxr-xr-x 3 root root 4096 Jan  1 00:00 ..
-rw-r--r-- 1 user user  220 Jan  1 00:00 .bash_logout
-rw-r--r-- 1 user user 3771 Jan  1 00:00 .bashrc
drwx------ 2 user user 4096 May  5 08:30 .ssh
```

### SSH with Key-Based Authentication

```console
$ ssh -i ~/.ssh/id_rsa user@example.com
Last login: Mon May 5 12:15:30 2025 from 192.168.1.100
user@example.com:~$ 
```

### Port Forwarding (Local to Remote)

```console
$ ssh -L 8080:localhost:80 user@example.com
user@example.com's password: 
Last login: Mon May 5 15:20:45 2025 from 192.168.1.100
```

## Tips:

### Set Up SSH Keys for Password-less Login

Generate an SSH key pair with `ssh-keygen` and copy the public key to the remote server with `ssh-copy-id user@example.com`. This eliminates the need to enter passwords for each connection.

### Use SSH Config File

Create a `~/.ssh/config` file to store connection settings for frequently accessed servers:

```
Host myserver
    HostName example.com
    User username
    Port 2222
    IdentityFile ~/.ssh/special_key
```

Then simply use `ssh myserver` to connect.

### Keep SSH Connections Alive

Add these lines to your `~/.ssh/config` file to prevent timeouts:

```
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

### Use SSH Agent for Key Management

Start `ssh-agent` and add your keys with `ssh-add` to avoid typing passphrases repeatedly during a session.

## Frequently Asked Questions

#### Q1. How do I generate SSH keys?
A. Use the `ssh-keygen` command. The default is `ssh-keygen -t rsa -b 4096`, which creates a 4096-bit RSA key pair.

#### Q2. How can I copy my SSH public key to a server?
A. Use `ssh-copy-id user@example.com` to copy your public key to the remote server's authorized_keys file.

#### Q3. How do I transfer files using SSH?
A. Use the related `scp` (secure copy) or `sftp` (secure file transfer protocol) commands, which use the SSH protocol.

#### Q4. How can I keep my SSH connection from timing out?
A. Configure `ServerAliveInterval` and `ServerAliveCountMax` in your SSH config file, or use the `-o` option: `ssh -o ServerAliveInterval=60 user@example.com`.

#### Q5. How do I troubleshoot SSH connection issues?
A. Use the `-v` (verbose) option, with additional v's for more detail (`-vv` or `-vvv`).

## References

https://man.openbsd.org/ssh.1

## Revisions

- 2025/05/05 First revision