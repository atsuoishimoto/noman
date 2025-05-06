# eval command

Evaluate and execute arguments as shell commands.

## Overview

The `eval` command constructs a command by concatenating its arguments, then executes the resulting command in the current shell environment. It's useful for executing commands stored in variables or generated dynamically, allowing for dynamic command construction and execution.

## Options

`eval` does not have specific command-line options. It simply takes a string of arguments and executes them as a shell command.

## Usage Examples

### Basic Usage

```console
$ eval "echo Hello, World!"
Hello, World!
```

### Using Variables in Commands

```console
$ command="ls -la"
$ eval $command
total 32
drwxr-xr-x  5 user  staff   160 May  5 10:30 .
drwxr-xr-x  3 user  staff    96 May  4 09:15 ..
-rw-r--r--  1 user  staff  2048 May  5 10:25 file1.txt
-rw-r--r--  1 user  staff  1024 May  4 15:30 file2.txt
```

### Dynamic Command Construction

```console
$ action="echo"
$ target="Current date:"
$ value="$(date)"
$ eval "$action $target $value"
Current date: Mon May 5 10:35:22 EDT 2025
```

### Setting Variables Dynamically

```console
$ var_name="my_variable"
$ var_value="Hello from eval"
$ eval "$var_name='$var_value'"
$ echo $my_variable
Hello from eval
```

## Tips:

### Use Quotes Carefully

Always quote the arguments to `eval` to prevent unexpected word splitting or globbing. This is especially important when the command contains variables or special characters.

```console
$ filename="my file.txt"
$ eval "touch \"$filename\""  # Correct: creates a file named "my file.txt"
```

### Security Considerations

Be extremely cautious when using `eval` with user input or untrusted data, as it can execute arbitrary commands. Always validate and sanitize any input before passing it to `eval`.

### Debugging Eval Commands

To see what command `eval` will execute without actually running it, use `echo` first:

```console
$ cmd="ls -la /tmp"
$ echo "$cmd"  # Preview what will be executed
ls -la /tmp
```

## Frequently Asked Questions

#### Q1. When should I use `eval`?
A. Use `eval` when you need to construct and execute commands dynamically, such as when the command structure is stored in variables or generated at runtime.

#### Q2. Is `eval` dangerous to use?
A. Yes, `eval` can be dangerous if used with untrusted input as it executes whatever commands are passed to it. Always validate input before using with `eval`.

#### Q3. What's the difference between `eval` and simply executing a command?
A. `eval` performs an additional round of shell expansion before execution, allowing variables within variables to be expanded and complex command structures to be built dynamically.

#### Q4. How can I safely use `eval` with user input?
A. It's generally best to avoid using `eval` with user input. If necessary, strictly validate and sanitize the input, limiting it to a predefined set of safe operations.

## References

https://pubs.opengroup.org/onlinepubs/9699919799/utilities/eval.html

## Revisions

- 2025/05/05 First revision