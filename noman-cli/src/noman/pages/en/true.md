# true command

Return a successful exit status (0).

## Overview

The `true` command does nothing except return a successful exit status (0). It's primarily used in shell scripts for creating infinite loops, as a placeholder, or for testing conditional logic.

## Options

The `true` command doesn't have any options as its sole purpose is to exit with a success status code.

## Usage Examples

### Basic usage

```console
$ true
$ echo $?
0
```

### Creating an infinite loop in a shell script

```console
$ while true; do echo "Press Ctrl+C to exit"; sleep 1; done
Press Ctrl+C to exit
Press Ctrl+C to exit
Press Ctrl+C to exit
^C
```

### Using as a placeholder in conditional statements

```console
$ if [ "$DEBUG" = "yes" ]; then echo "Debugging info"; else true; fi
```

### Using in a logical OR operation

```console
$ true || echo "This won't be printed"
$ false || echo "This will be printed"
This will be printed
```

## Tips:

### Difference Between `true` and `:`

Both `true` and `:` (colon) commands do essentially the same thing - they return a successful exit status. The colon is a shell builtin that's slightly more efficient, but `true` is more readable and explicit.

### Use in Conditional Execution

`true` is useful in conditional execution with `&&` and `||` operators. For example, `command && true` ensures the overall command succeeds regardless of whether the first command succeeds.

### Creating Empty Files

While not its primary purpose, `true > filename` can be used to create an empty file (similar to `touch`).

## Frequently Asked Questions

#### Q1. What's the difference between `true` and `false` commands?
A. `true` always exits with status code 0 (success), while `false` always exits with status code 1 (failure).

#### Q2. Is `true` a shell builtin or an external command?
A. Most shells implement `true` as a builtin for efficiency, but there's also an external `/bin/true` command that does the same thing.

#### Q3. Why would I use `true` instead of just a comment?
A. Unlike comments, `true` is an actual command that executes, making it useful in places where syntax requires a command, like in loop constructs or as a placeholder in conditional branches.

#### Q4. Can `true` be used to suppress errors?
A. Yes, `command || true` will ensure the overall command returns success even if the first command fails.

## References

https://www.gnu.org/software/coreutils/manual/html_node/true-invocation.html

## Revisions

- 2025/05/05 First revision