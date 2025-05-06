# sudo command

Execute a command as another user, typically with elevated privileges.

## Overview

`sudo` (superuser do) allows users to run programs with the security privileges of another user, by default the superuser (root). It provides a way to grant limited root privileges to users listed in the `/etc/sudoers` file without sharing the root password.

## Options

### **-b, --background**

Run the command in the background.

```console
$ sudo -b apt update
[1] 12345
```

### **-u, --user**

Run the command as a user other than the default target user (root).

```console
$ sudo -u postgres psql
psql (14.5)
Type "help" for help.

postgres=#
```

### **-s, --shell**

Run the shell specified in the user's password database entry as a login shell.

```console
$ sudo -s
root@hostname:~#
```

### **-i, --login**

Run the shell specified in the target user's password database entry as a login shell.

```console
$ sudo -i
root@hostname:~#
```

### **-k, --reset-timestamp**

Invalidate the user's cached credentials.

```console
$ sudo -k
[sudo] password for user:
```

### **-v, --validate**

Update the user's cached credentials, extending the timeout.

```console
$ sudo -v
[sudo] password for user:
```

### **-l, --list**

List the allowed (and forbidden) commands for the current user.

```console
$ sudo -l
User user may run the following commands on hostname:
    (ALL : ALL) ALL
```

## Usage Examples

### Installing software with elevated privileges

```console
$ sudo apt install nginx
[sudo] password for user: 
Reading package lists... Done
Building dependency tree... Done
...
```

### Editing a system configuration file

```console
$ sudo nano /etc/hosts
[sudo] password for user:
```

### Running a command as a different user

```console
$ sudo -u www-data php /var/www/html/script.php
[sudo] password for user:
Script output...
```

### Getting a root shell

```console
$ sudo -i
[sudo] password for user:
root@hostname:~#
```

## Tips:

### Use `sudo !!` to Repeat the Previous Command with sudo

If you forget to use sudo for a command that requires it, type `sudo !!` to repeat the previous command with sudo privileges.

### Configure sudo Without Password

Edit the sudoers file with `sudo visudo` and add a line like `username ALL=(ALL) NOPASSWD: ALL` to allow a user to run sudo commands without entering a password.

### Use `sudo -E` to Preserve Environment Variables

When you need to run a command with sudo but keep your current environment variables, use the `-E` flag.

### Understand the Security Implications

Only grant sudo access to trusted users, and be careful about which commands they're allowed to run. A user with unrestricted sudo access effectively has full control of the system.

## Frequently Asked Questions

#### Q1. What's the difference between `sudo -s` and `sudo -i`?
A. `sudo -s` starts a shell with root privileges but keeps your current environment. `sudo -i` simulates a full login as root, with root's environment.

#### Q2. How long does sudo authentication last?
A. By default, sudo caches your credentials for 15 minutes. After that, you'll need to enter your password again.

#### Q3. How can I edit the sudo configuration safely?
A. Always use `sudo visudo` to edit the sudoers file. This command checks for syntax errors before saving, preventing you from locking yourself out.

#### Q4. Can I see what commands other users have run with sudo?
A. Yes, sudo logs all commands to the system log, typically in `/var/log/auth.log` or `/var/log/secure`.

#### Q5. How do I run a command as root without being prompted for a password?
A. You need to configure the sudoers file with NOPASSWD option for specific commands or all commands.

## References

https://www.sudo.ws/docs/man/sudo.man/

## Revisions

- 2025/05/05 First revision