# function command

Define shell functions for later execution.

## Overview

The `function` command creates a shell function that can be called like a regular command. Functions are useful for encapsulating a series of commands into a single named unit, allowing code reuse and organization in shell scripts. Functions can accept arguments and return exit status codes.

## Options

The `function` command itself doesn't have traditional command-line options. Instead, it uses a specific syntax to define functions.

## Usage Examples

### Basic Function Definition

```console
$ function hello() {
>   echo "Hello, World!"
> }
$ hello
Hello, World!
```

### Function with Arguments

```console
$ function greet() {
>   echo "Hello, $1!"
> }
$ greet Alice
Hello, Alice!
```

### Function with Return Value

```console
$ function is_even() {
>   if (( $1 % 2 == 0 )); then
>     return 0  # Success (true in shell)
>   else
>     return 1  # Failure (false in shell)
>   fi
> }
$ is_even 4 && echo "Even" || echo "Odd"
Even
$ is_even 5 && echo "Even" || echo "Odd"
Odd
```

### Alternative Syntax

```console
$ hello() {
>   echo "Hello, World!"
> }
$ hello
Hello, World!
```

### Function with Local Variables

```console
$ function calculate() {
>   local result=$(( $1 + $2 ))
>   echo "The sum of $1 and $2 is $result"
> }
$ calculate 5 7
The sum of 5 and 7 is 12
```

## Tips:

### Use Local Variables

Always use `local` for variables inside functions to prevent them from affecting the global shell environment:

```console
$ function bad_example() {
>   x=10  # Global variable
> }
$ function good_example() {
>   local x=10  # Local variable
> }
```

### Return Values

Functions can only return numeric exit codes (0-255). Use `echo` or similar commands to output strings or complex data:

```console
$ function get_sum() {
>   echo $(( $1 + $2 ))
> }
$ result=$(get_sum 5 7)
$ echo $result
12
```

### Function Visibility

Functions are only available in the current shell session. To make them available in subshells, export them:

```console
$ function hello() { echo "Hello!"; }
$ export -f hello
```

## Frequently Asked Questions

#### Q1. What's the difference between `function name() {}` and `name() {}`?
A. Both syntaxes work in bash, but `name() {}` is more portable across different shells. The `function` keyword is specific to bash and ksh.

#### Q2. How do I access function arguments?
A. Use positional parameters: `$1`, `$2`, etc. for individual arguments, `$@` for all arguments, and `$#` for the number of arguments.

#### Q3. How do I unset a function?
A. Use the `unset -f function_name` command to remove a function definition.

#### Q4. Can I define functions inside other functions?
A. Yes, bash supports nested function definitions, but they're only visible within the parent function's scope.

#### Q5. How do I see all defined functions?
A. Use the `declare -f` command to list all function definitions, or `declare -F` to see just the function names.

## References

https://www.gnu.org/software/bash/manual/html_node/Shell-Functions.html

## Revisions

- 2025/05/06 First revision