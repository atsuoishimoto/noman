# ssh-copy-id command

Installs your public key in a remote machine's authorized_keys file to enable passwordless SSH authentication.

## Overview

`ssh-copy-id` is a utility that copies your SSH public key to a remote server's `~/.ssh/authorized_keys` file. This enables passwordless SSH logins to the remote server, eliminating the need to enter your password each time you connect. It's a simple way to set up key-based authentication, which is both more convenient and more secure than password authentication.

## Options

### **-i [identity_file]**

Specifies the identity file (private key) to use. By default, it uses `~/.ssh/id_rsa.pub`.

```console
$ ssh-copy-id -i ~/.ssh/custom_key.pub user@remote-host
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@remote-host's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'user@remote-host'"
and check to make sure that only the key(s) you wanted were added.
```

### **-f**

Forces the installation, even if the key already exists on the remote server.

```console
$ ssh-copy-id -f user@remote-host
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@remote-host's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'user@remote-host'"
and check to make sure that only the key(s) you wanted were added.
```

### **-n**

Dry run mode - shows what keys would be installed without actually installing them.

```console
$ ssh-copy-id -n user@remote-host
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/user/.ssh/id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
Would have added the following key(s):
ssh-rsa AAAAB3NzaC1yc2EAAA...truncated...user@local-host
```

### **-p [port]**

Specifies the port to connect to on the remote host.

```console
$ ssh-copy-id -p 2222 user@remote-host
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@remote-host's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh -p 2222 'user@remote-host'"
and check to make sure that only the key(s) you wanted were added.
```

## Usage Examples

### Basic Usage

```console
$ ssh-copy-id user@remote-host
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@remote-host's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'user@remote-host'"
and check to make sure that only the key(s) you wanted were added.
```

### Using a Specific Identity File

```console
$ ssh-copy-id -i ~/.ssh/id_ed25519.pub user@remote-host
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@remote-host's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'user@remote-host'"
and check to make sure that only the key(s) you wanted were added.
```

### Connecting to a Non-Standard Port

```console
$ ssh-copy-id -p 2222 user@remote-host
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@remote-host's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh -p 2222 'user@remote-host'"
and check to make sure that only the key(s) you wanted were added.
```

## Tips

### Generate SSH Keys First

Before using `ssh-copy-id`, make sure you have SSH keys generated. If not, create them with:

```console
$ ssh-keygen -t rsa -b 4096
```

### Verify Key Installation

After running `ssh-copy-id`, verify that passwordless login works by attempting to SSH into the remote server:

```console
$ ssh user@remote-host
```

### Multiple Keys

If you have multiple SSH keys, specify which one to use with the `-i` option. This is useful when you use different keys for different servers.

### Remote Directory Structure

`ssh-copy-id` will create the `~/.ssh` directory and `authorized_keys` file on the remote server if they don't exist, with appropriate permissions.

## Frequently Asked Questions

#### Q1. What if I don't have an SSH key yet?
A. Generate an SSH key pair first using `ssh-keygen -t rsa -b 4096` or `ssh-keygen -t ed25519`, then use `ssh-copy-id`.

#### Q2. Can I use `ssh-copy-id` with a custom SSH port?
A. Yes, use the `-p` option: `ssh-copy-id -p 2222 user@remote-host`.

#### Q3. How do I know if my key was successfully installed?
A. After running `ssh-copy-id`, try logging in with `ssh user@remote-host`. If you're not prompted for a password, the key was successfully installed.

#### Q4. Can I copy multiple keys at once?
A. Yes, `ssh-copy-id` will copy all public keys found in your `~/.ssh` directory by default. To specify a particular key, use the `-i` option.

#### Q5. What if the remote server doesn't have the `.ssh` directory?
A. `ssh-copy-id` will create the directory and set appropriate permissions automatically.

## References

https://man.openbsd.org/ssh-copy-id

## Revisions

- 2025/05/05 First revision