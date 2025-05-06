# set command

Display or set shell options and positional parameters.

## Overview

The `set` command is used to display or modify shell options and positional parameters. Without arguments, it displays all shell variables. With options, it changes shell behavior by enabling or disabling various features. It can also be used to set positional parameters ($1, $2, etc.) for the current shell.

## Options

### **-e**

Exit immediately if a command exits with a non-zero status.

```console
$ set -e
$ non_existent_command
bash: non_existent_command: command not found
$ echo "This won't be executed"
[Shell has already exited due to the previous error]
```

### **-x**

Print commands and their arguments as they are executed (trace mode).

```console
$ set -x
$ echo "Hello World"
+ echo 'Hello World'
Hello World
```

### **-u**

Treat unset variables as an error when substituting.

```console
$ set -u
$ echo $UNDEFINED_VARIABLE
bash: UNDEFINED_VARIABLE: unbound variable
```

### **-o pipefail**

Return value of a pipeline is the status of the last command to exit with a non-zero status, or zero if no command exited with a non-zero status.

```console
$ set -o pipefail
$ false | true
$ echo $?
1
```

### **-**

Turn off the -x and -v options.

```console
$ set -x  # Enable tracing
$ echo "With tracing"
+ echo 'With tracing'
With tracing
$ set -    # Disable tracing
$ echo "Without tracing"
Without tracing
```

### **--**

End option processing. Remaining arguments become positional parameters.

```console
$ set -- arg1 arg2 arg3
$ echo $1 $2 $3
arg1 arg2 arg3
```

## Usage Examples

### Setting positional parameters

```console
$ set -- "first argument" "second argument" "third argument"
$ echo $1
first argument
$ echo $2
second argument
$ echo $3
third argument
```

### Enabling multiple options at once

```console
$ set -exu
$ echo "This command is traced and the script will exit on errors or unset variables"
+ echo 'This command is traced and the script will exit on errors or unset variables'
This command is traced and the script will exit on errors or unset variables
```

### Displaying all shell variables

```console
$ set | head -5
BASH=/bin/bash
BASHOPTS=checkwinsize:cmdhist:complete_fullquote:expand_aliases:extglob:extquote:force_fignore:histappend:interactive_comments:progcomp:promptvars:sourcepath
BASH_ALIASES=()
BASH_ARGC=()
BASH_ARGV=()
```

## Tips:

### Use in Shell Scripts

Adding `set -e` at the beginning of shell scripts is a good practice to make scripts fail fast when errors occur rather than continuing with potentially incorrect execution.

### Debugging Scripts

When troubleshooting shell scripts, `set -x` is invaluable for seeing exactly what commands are being executed and with what values.

### Safer Scripts

The combination `set -euo pipefail` is commonly used to create more robust shell scripts by failing on errors, unset variables, and pipeline failures.

### Resetting Options

Use `set +x` to turn off tracing that was enabled with `set -x`. The plus sign disables options that were enabled with the minus sign.

## Frequently Asked Questions

#### Q1. What's the difference between `set` and `export`?
A. `set` displays/modifies shell options and positional parameters, while `export` makes variables available to child processes.

#### Q2. How do I turn off an option that I've set?
A. Use the `+` symbol instead of `-`. For example, `set +x` turns off tracing that was enabled with `set -x`.

#### Q3. How can I see all current shell variables?
A. Simply run `set` without any arguments to display all shell variables.

#### Q4. What does `set -e` do?
A. It makes the shell exit immediately if any command exits with a non-zero status (indicating an error).

## References

https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html

## Revisions

- 2025/05/05 First revision