# chsh command

Change the login shell for a user.

## Overview

The `chsh` command allows users to change their login shell - the command interpreter that starts when they log in. It modifies the user's entry in the password file to set which shell program runs when they log in to the system.

## Options

### **-s, --shell**

Specify the login shell to use. The shell must be listed in the /etc/shells file, unless the invoking user is the superuser.

```console
$ chsh -s /bin/zsh
Password: 
Shell changed.
```

### **-l, --list-shells**

Display the list of shells listed in the /etc/shells file.

```console
$ chsh -l
/bin/sh
/bin/bash
/bin/zsh
/bin/fish
```

### **-h, --help**

Display help information and exit.

```console
$ chsh --help
Usage: chsh [options] [LOGIN]

Options:
  -s, --shell SHELL         specify login shell
  -l, --list-shells         list shells and exit
  -h, --help                display this help and exit
  -v, --version             display version information and exit
```

### **-v, --version**

Display version information and exit.

```console
$ chsh --version
chsh from util-linux 2.38.1
```

## Usage Examples

### Changing your own shell

```console
$ chsh -s /bin/zsh
Password: 
Shell changed.
```

### Viewing your current shell

```console
$ grep "^$(whoami):" /etc/passwd
username:x:1000:1000:User Name:/home/username:/bin/zsh
```

### Changing another user's shell (requires root privileges)

```console
$ sudo chsh -s /bin/bash otheruser
Shell changed.
```

## Tips:

### Check Available Shells First

Always use `chsh -l` or check `/etc/shells` to see what shells are available on your system before changing your shell.

### Logout Required

Changes to your login shell won't take effect until you log out and log back in.

### Shell Must Be in /etc/shells

The shell you choose must be listed in the `/etc/shells` file, unless you're the superuser. This is a security measure to prevent users from setting arbitrary programs as their login shell.

### Reverting Changes

If you change to a shell that doesn't work for you, you can always change back using the same command with your previous shell.

## Frequently Asked Questions

#### Q1. What is the difference between login shell and current shell?
A. The login shell is the shell that starts when you log in to the system. The current shell is the shell you're currently using, which might be different if you've started another shell from your login shell.

#### Q2. How do I know what my current shell is?
A. Run `echo $SHELL` to see your login shell, or `ps -p $$` to see what shell you're currently using.

#### Q3. Can I use any program as my shell?
A. No, for security reasons, regular users can only use shells listed in `/etc/shells`. Only the superuser can set arbitrary programs as shells.

#### Q4. What happens if I set an invalid shell?
A. If you set a shell that doesn't exist or doesn't work properly, you might be unable to log in normally. In such cases, you would need to use recovery methods or ask a system administrator to fix it.

## References

https://man7.org/linux/man-pages/man1/chsh.1.html

## Revisions

- 2025/05/05 First revision