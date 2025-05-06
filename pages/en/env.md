# env command

Display the current environment variables or run a command in a modified environment.

## Overview

The `env` command displays all environment variables in the current shell session. It can also be used to run a program with a modified environment by setting or unsetting variables without affecting the current shell environment.

## Options

### **-i, --ignore-environment**

Start with an empty environment, ignoring inherited environment variables.

```console
$ env -i bash -c 'echo $PATH'

```

### **-u, --unset=NAME**

Remove variable NAME from the environment.

```console
$ env -u HOME bash -c 'echo $HOME'

```

### **-0, --null**

End each output line with a null character instead of a newline.

```console
$ env -0 | grep -z USER
USER=username
```

### **--**

Terminate option list. Useful when command to run has options that might be interpreted by env.

```console
$ env -- ls -la
total 32
drwxr-xr-x  5 user  staff   160 May  5 10:30 .
drwxr-xr-x  3 user  staff    96 May  4 09:15 ..
-rw-r--r--  1 user  staff  1024 May  5 10:25 file.txt
```

## Usage Examples

### Displaying all environment variables

```console
$ env
USER=username
HOME=/home/username
PATH=/usr/local/bin:/usr/bin:/bin
SHELL=/bin/bash
...
```

### Running a command with a modified environment

```console
$ env VAR1=value1 VAR2=value2 bash -c 'echo $VAR1 $VAR2'
value1 value2
```

### Running a command with a clean environment

```console
$ env -i PATH=/bin bash -c 'echo $PATH; env'
/bin
PATH=/bin
```

## Tips:

### Debugging Environment Issues

Use `env` to check if environment variables are set correctly when troubleshooting application startup problems.

### Isolating Environment Variables

When testing applications, use `env -i` with only the required variables to create a controlled environment for reproducible testing.

### Comparing Environments

Redirect the output of `env` to files to compare environment variables between different users or systems:
```console
$ env > env_user1.txt
```

## Frequently Asked Questions

#### Q1. What's the difference between `env` and `printenv`?
A. Both display environment variables, but `env` can also run commands with modified environments, while `printenv` is focused solely on displaying variables.

#### Q2. How do I set an environment variable only for a specific command?
A. Use `env VAR=value command`, which sets the variable only for that command's execution without affecting your current shell.

#### Q3. How can I run a command with no environment variables?
A. Use `env -i command`, which starts with an empty environment. You may need to add PATH to make the command executable.

#### Q4. Can I use `env` in shell scripts?
A. Yes, it's useful in shell scripts when you need to run commands with specific environment settings without changing the script's environment.

## References

https://www.gnu.org/software/coreutils/manual/html_node/env-invocation.html

## Revisions

- 2025/05/05 First revision