# ssh-add command

Adds private key identities to the OpenSSH authentication agent.

## Overview

`ssh-add` manages the private keys used for SSH authentication. It adds keys to the SSH agent, which holds private keys in memory so you don't need to type passphrases repeatedly when connecting to remote servers. The SSH agent must be running before using ssh-add.

## Options

### **-l**

Lists fingerprints of all identities currently represented by the agent.

```console
$ ssh-add -l
2048 SHA256:abcdefghijklmnopqrstuvwxyz1234567890ABCD user@hostname (RSA)
```

### **-L**

Lists public key parameters of all identities currently represented by the agent.

```console
$ ssh-add -L
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC... user@hostname
```

### **-d**

Removes the specified private key identity from the agent.

```console
$ ssh-add -d ~/.ssh/id_rsa
Identity removed: /home/user/.ssh/id_rsa (user@hostname)
```

### **-D**

Deletes all identities from the agent.

```console
$ ssh-add -D
All identities removed.
```

### **-t life**

Sets a maximum lifetime when adding identities to an agent. The lifetime may be specified in seconds or in a time format specified in sshd_config(5).

```console
$ ssh-add -t 3600 ~/.ssh/id_rsa
Identity added: /home/user/.ssh/id_rsa (user@hostname)
Lifetime set to 3600 seconds
```

### **-x**

Locks the agent with a password.

```console
$ ssh-add -x
Enter lock password: 
Again: 
Agent locked.
```

### **-X**

Unlocks the agent.

```console
$ ssh-add -X
Enter unlock password: 
Agent unlocked.
```

## Usage Examples

### Adding a key to the agent

```console
$ ssh-add ~/.ssh/id_rsa
Enter passphrase for /home/user/.ssh/id_rsa: 
Identity added: /home/user/.ssh/id_rsa (user@hostname)
```

### Adding multiple keys at once

```console
$ ssh-add ~/.ssh/id_rsa ~/.ssh/id_ed25519
Enter passphrase for /home/user/.ssh/id_rsa: 
Identity added: /home/user/.ssh/id_rsa (user@hostname)
Enter passphrase for /home/user/.ssh/id_ed25519: 
Identity added: /home/user/.ssh/id_ed25519 (user@hostname)
```

### Adding all default keys

```console
$ ssh-add
Identity added: /home/user/.ssh/id_rsa (user@hostname)
Identity added: /home/user/.ssh/id_ed25519 (user@hostname)
```

## Tips:

### Start SSH Agent Automatically

On most systems, you can ensure the SSH agent starts automatically by adding these lines to your `~/.bashrc` or `~/.bash_profile`:
```bash
if [ -z "$SSH_AUTH_SOCK" ]; then
   eval $(ssh-agent -s)
fi
```

### Use SSH Config for Key Management

Instead of manually adding keys, you can specify which key to use for specific hosts in your `~/.ssh/config` file:
```
Host example.com
    IdentityFile ~/.ssh/special_key
```

### Check If Keys Are Already Added

Before adding keys, check if they're already loaded with `ssh-add -l` to avoid duplicate entries.

## Frequently Asked Questions

#### Q1. Why do I need to use ssh-add?
A. `ssh-add` lets you store your private key passphrases in the SSH agent, so you don't need to type them each time you connect to a server.

#### Q2. How do I make ssh-add remember my keys after reboot?
A. SSH agent doesn't persist across reboots by default. You can use tools like `keychain` or configure your login manager to start the SSH agent and add keys automatically.

#### Q3. What's the difference between ssh-add -l and ssh-add -L?
A. `-l` shows fingerprints of loaded keys (shorter output), while `-L` shows the complete public key data (longer, more detailed output).

#### Q4. How can I limit how long a key stays in the agent?
A. Use `ssh-add -t <seconds>` to set a time limit, after which the key will be automatically removed.

## macOS Specifics

On macOS, the SSH agent is integrated with Keychain, so keys added with `ssh-add -K` are stored persistently across reboots. In newer macOS versions (Monterey and later), use `ssh-add --apple-use-keychain` instead of the deprecated `-K` option.

## References

https://man.openbsd.org/ssh-add.1

## Revisions

- 2025/05/05 First revision