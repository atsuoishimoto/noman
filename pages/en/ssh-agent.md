# ssh-agent command

Authentication agent for SSH private keys that holds keys in memory to avoid repeated passphrase entry.

## Overview

ssh-agent is a program that holds private keys used for SSH public key authentication. It runs in the background, eliminating the need to enter passphrases each time you use SSH to connect to servers. When you add keys to the agent, you enter the passphrase once, and the agent keeps the decrypted key in memory for future use.

## Options

### **-c**

Generates C-shell commands on stdout. This is the default if SHELL looks like it's a csh style shell.

```console
$ ssh-agent -c
setenv SSH_AUTH_SOCK /tmp/ssh-XXXXXXXX/agent.12345;
setenv SSH_AGENT_PID 12345;
echo Agent pid 12345;
```

### **-s**

Generates Bourne shell commands on stdout. This is the default if SHELL does not look like it's a csh style shell.

```console
$ ssh-agent -s
SSH_AUTH_SOCK=/tmp/ssh-XXXXXXXX/agent.12345; export SSH_AUTH_SOCK;
SSH_AGENT_PID=12345; export SSH_AGENT_PID;
echo Agent pid 12345;
```

### **-d**

Debug mode. When this option is specified, ssh-agent will not fork and will write debug information to standard error.

```console
$ ssh-agent -d
```

### **-a** *bind_address*

Bind the agent to the Unix-domain socket bind_address.

```console
$ ssh-agent -a /tmp/custom-ssh-agent.socket
```

### **-t** *life*

Sets a default value for the maximum lifetime of identities added to the agent. The lifetime may be specified in seconds or in a time format specified in sshd_config(5).

```console
$ ssh-agent -t 1h
```

### **-k**

Kill the current agent (given by the SSH_AGENT_PID environment variable).

```console
$ ssh-agent -k
```

## Usage Examples

### Starting ssh-agent and loading your keys

```console
$ eval $(ssh-agent)
Agent pid 12345
$ ssh-add
Enter passphrase for /home/user/.ssh/id_rsa: 
Identity added: /home/user/.ssh/id_rsa
```

### Starting ssh-agent with a specific lifetime

```console
$ eval $(ssh-agent -t 4h)
Agent pid 12345
$ ssh-add
Enter passphrase for /home/user/.ssh/id_rsa: 
Identity added: /home/user/.ssh/id_rsa (will expire in 4 hours)
```

### Killing the ssh-agent process

```console
$ eval $(ssh-agent -k)
Agent pid 12345 killed
```

## Tips:

### Add ssh-agent to Your Shell Startup

Add `eval $(ssh-agent)` to your shell's startup file (like ~/.bashrc or ~/.zshrc) to automatically start ssh-agent when you open a terminal.

### Use ssh-add -l to List Keys

Run `ssh-add -l` to see which keys are currently loaded in the agent.

### Forward Your SSH Agent

When connecting to remote servers, use `ssh -A user@host` to forward your local SSH agent to the remote server, allowing you to use your local keys for authentication on that server.

### Security Considerations

Be cautious with agent forwarding (`ssh -A`), especially on untrusted servers, as it could potentially allow someone with root access on the remote server to use your keys.

## Frequently Asked Questions

#### Q1. What's the difference between ssh-agent and ssh-add?
A. ssh-agent is the background service that holds your decrypted keys, while ssh-add is the command used to add keys to the running agent.

#### Q2. How do I check if ssh-agent is running?
A. Run `echo $SSH_AGENT_PID` - if it returns a number, the agent is running.

#### Q3. How can I make my keys automatically load when I start ssh-agent?
A. Use `ssh-add -c ~/.ssh/id_rsa` to add keys with confirmation, or create a ~/.ssh/config file with an IdentityFile directive.

#### Q4. How do I stop ssh-agent from running?
A. Run `eval $(ssh-agent -k)` to kill the current agent process.

## References

https://man.openbsd.org/ssh-agent.1

## Revisions

- 2025/05/05 First revision