# su command

Switch user identity or become another user.

## Overview

The `su` command allows users to temporarily become another user during a login session. By default, it switches to the superuser (root) when no username is specified. It creates a new shell with the target user's environment variables and permissions.

## Options

### **-**, **-l**, **--login**

Provide a login environment, simulating a direct login as the target user. This includes setting environment variables, changing to the target user's home directory, and running login scripts.

```console
$ su - john
Password: 
john@hostname:~$
```

### **-c**, **--command=COMMAND**

Execute a single command as the specified user and then exit.

```console
$ su -c "ls -la /root" root
Password: 
total 28
drwx------  4 root root 4096 May  5 10:15 .
drwxr-xr-x 20 root root 4096 May  5 10:15 ..
-rw-------  1 root root  571 May  5 10:15 .bash_history
-rw-r--r--  1 root root 3106 May  5 10:15 .bashrc
drwx------  2 root root 4096 May  5 10:15 .cache
-rw-r--r--  1 root root  161 May  5 10:15 .profile
drwx------  2 root root 4096 May  5 10:15 .ssh
```

### **-s**, **--shell=SHELL**

Run the specified shell instead of the default shell for the target user.

```console
$ su -s /bin/zsh john
Password: 
john@hostname:~$
```

### **-p**, **--preserve-environment**

Preserve the current environment variables instead of switching to the target user's environment.

```console
$ su -p john
Password: 
john@hostname:/current/directory$
```

## Usage Examples

### Becoming the root user

```console
$ su
Password: 
root@hostname:/home/user#
```

### Running a command as root and returning to normal user

```console
$ su -c "apt update && apt upgrade" root
Password: 
[apt update and upgrade output]
$
```

### Switching to another user with login environment

```console
$ su - john
Password: 
john@hostname:~$
```

## Tips:

### Use sudo instead when possible

Modern systems often prefer `sudo` over `su` for administrative tasks as it provides better logging and more granular permission control.

### Be careful with environment variables

When using `su` without the `-` option, you keep your current environment variables, which might cause unexpected behavior. Use `-` for a clean environment.

### Exit the su session properly

Type `exit` or press Ctrl+D to return to your original user session when finished with the elevated privileges.

### Check before running commands as root

Always double-check commands before executing them as root, as mistakes can damage your system.

## Frequently Asked Questions

#### Q1. What's the difference between `su` and `sudo`?
A. `su` switches your entire user session to another user (typically root), while `sudo` executes just one command with elevated privileges and then returns to your normal user.

#### Q2. Why does `su` ask for a password?
A. `su` requires the password of the target user you're switching to, not your own password (unlike `sudo` which asks for your password).

#### Q3. How do I exit from an `su` session?
A. Type `exit` or press Ctrl+D to return to your original user session.

#### Q4. Why use `su -` instead of just `su`?
A. `su -` provides a complete login environment of the target user, including their environment variables, working directory, and shell configuration. Plain `su` only changes the user ID but keeps your current environment.

## References

https://www.gnu.org/software/coreutils/manual/html_node/su-invocation.html

## Revisions

- 2025/05/05 First revision