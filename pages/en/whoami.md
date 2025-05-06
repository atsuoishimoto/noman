# whoami command

Display the effective user ID of the current user.

## Overview

The `whoami` command prints the username associated with the current effective user ID. It's a simple utility that helps identify which user account is currently being used in the terminal session, which is particularly useful in scripts or when switching between different user accounts.

## Options

The `whoami` command has very few options as it performs a single, straightforward function.

### **--help**

Display help information and exit.

```console
$ whoami --help
Usage: whoami [OPTION]...
Print the user name associated with the current effective user ID.
Same as id -un.

      --help     display this help and exit
      --version  output version information and exit

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Report whoami translation bugs to <https://translationproject.org/team/>
```

### **--version**

Output version information and exit.

```console
$ whoami --version
whoami (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by Richard Mlynarik.
```

## Usage Examples

### Basic usage

```console
$ whoami
john
```

### Using in a script to check current user

```console
$ echo "Current user is $(whoami)"
Current user is john
```

### Using after switching users with sudo

```console
$ whoami
john
$ sudo whoami
root
```

## Tips

### Difference from `id` command

The `whoami` command is equivalent to `id -un`. The `id` command provides more comprehensive user identity information, while `whoami` focuses only on the username.

### Use in shell scripts

`whoami` is particularly useful in shell scripts to check which user is running the script, allowing for conditional execution based on user identity.

### Root user verification

Use `whoami` to verify if you're currently operating with root privileges after using commands like `sudo` or `su`.

## Frequently Asked Questions

#### Q1. What's the difference between `whoami` and `who am i`?
A. `whoami` shows the effective username (who you are currently running as), while `who am i` (or `who -m`) shows the original login name, which might be different if you've used `su` or `sudo`.

#### Q2. Can `whoami` show information about other users?
A. No, `whoami` only displays information about the current effective user. To get information about other users, use commands like `id username` or `finger username`.

#### Q3. Does `whoami` work the same on all Unix/Linux systems?
A. Yes, `whoami` is a standard command with consistent behavior across Unix-like operating systems, including Linux and macOS.

#### Q4. Why would I use `whoami` instead of `echo $USER`?
A. `whoami` shows the effective user (who you're running as), while `$USER` shows the login user. They differ when you use `sudo` or `su` to change users.

## References

https://www.gnu.org/software/coreutils/manual/html_node/whoami-invocation.html

## Revisions

- 2025/05/05 First revision