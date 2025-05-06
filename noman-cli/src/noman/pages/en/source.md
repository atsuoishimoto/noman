# source command

Execute commands from a file or script in the current shell environment.

## Overview

The `source` command (also accessible via the `.` alias) reads and executes commands from a specified file in the current shell context. Unlike executing a script directly, which runs in a subshell, `source` runs commands in the current shell, allowing variables and functions defined in the sourced file to persist in the current session.

## Options

The `source` command has minimal options as it's a shell builtin:

### **-h**

Display help information (in some shells)

```console
$ source -h
.: usage: . filename [arguments]
```

## Usage Examples

### Sourcing a configuration file

```console
$ source ~/.bashrc
```

### Using the dot (.) alias

```console
$ . ~/.bash_profile
```

### Sourcing with arguments

```console
$ source script.sh arg1 arg2
```

### Sourcing environment variables

```console
$ cat env.sh
export PROJECT_ROOT="/path/to/project"
export API_KEY="abc123"

$ source env.sh
$ echo $PROJECT_ROOT
/path/to/project
```

## Tips

### Use source for environment setup

Source is ideal for loading environment variables, functions, and aliases that you want available in your current shell session.

### Debugging scripts

You can use `source` with the `-x` option in bash to debug scripts by showing each command as it executes:

```console
$ source -x script.sh
```

### Reload configuration without logging out

When you modify shell configuration files like `.bashrc` or `.zshrc`, use `source` to apply changes without restarting your terminal.

### Script path considerations

When using `source`, the script path is relative to your current directory, not the location of the calling script.

## Frequently Asked Questions

#### Q1. What's the difference between `source` and executing a script directly?
A. When you execute a script directly (e.g., `./script.sh`), it runs in a subshell. Any variables or functions defined in that script are lost when the script finishes. Using `source` executes the commands in your current shell, so variables and functions persist after the script completes.

#### Q2. Can I use `source` with any type of file?
A. You can source any text file containing valid shell commands. Typically, it's used with shell scripts (`.sh`), configuration files, and environment setup files.

#### Q3. Is there a difference between `source` and the dot (`.`) command?
A. No functional difference. The dot (`.`) is the POSIX standard command, while `source` is a more readable alias available in bash and some other shells. Both do the same thing.

#### Q4. What happens if the sourced file doesn't exist?
A. You'll get an error message like "No such file or directory" and the command will return a non-zero exit status.

## References

- Bash Reference Manual: https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html
- POSIX specification: https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html#dot

## Revisions

- 2025/05/05 First revision