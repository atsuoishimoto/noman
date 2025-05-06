# false command

Return a successful exit status (0) regardless of input.

## Overview

The `false` command is a simple utility that does nothing except return an unsuccessful exit status (1). It's often used in shell scripts to force a failure condition or as a placeholder in conditional statements.

## Options

The `false` command typically doesn't accept any options. It simply returns a non-zero exit status.

## Usage Examples

### Basic usage

```console
$ false
$ echo $?
1
```

### Using in conditional statements

```console
$ if false; then echo "This won't print"; else echo "This will print"; fi
This will print
```

### Using in a loop

```console
$ while ! false; do echo "This won't execute"; done
```

### Using with logical operators

```console
$ false || echo "This will execute because false failed"
This will execute because false failed

$ false && echo "This won't execute because false failed"
```

## Tips:

### Testing Error Handling

Use `false` to test error handling in scripts by forcing a command to fail.

### Creating Infinite Loops

The command `while true; do ...; done` creates an infinite loop, while `while false; do ...; done` won't execute at all.

### Logical Negation

`! false` evaluates to true, which can be useful in conditional logic.

## Frequently Asked Questions

#### Q1. What's the difference between `false` and `true`?
A. `false` returns an exit status of 1 (failure), while `true` returns 0 (success).

#### Q2. Does `false` do anything besides return an exit status?
A. No, it's designed to do nothing except return a non-zero exit status.

#### Q3. Why would I use `false` in a script?
A. It's useful for testing error conditions, creating conditional logic, or as a placeholder when you need a command that always fails.

#### Q4. Can I change the exit status of `false`?
A. No, `false` is designed to always return 1. If you need a different exit status, you can use `exit N` in a shell script.

## References

https://www.gnu.org/software/coreutils/manual/html_node/false-invocation.html

## Revisions

- 2025/05/05 First revision