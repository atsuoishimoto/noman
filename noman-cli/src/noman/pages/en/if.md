# if command

Evaluates conditional expressions and executes commands based on the result.

## Overview

The `if` command is a shell construct that allows conditional execution of commands. It tests whether a condition is true and executes a block of code accordingly. It can include optional `elif` (else if) and `else` clauses to handle multiple conditions.

## Options

The `if` command doesn't have traditional command-line options as it's a shell built-in construct rather than a standalone executable.

## Usage Examples

### Basic if statement

```console
$ if [ -f /etc/passwd ]; then
>   echo "The passwd file exists."
> fi
The passwd file exists.
```

### if-else statement

```console
$ if [ $USER = "root" ]; then
>   echo "You are root."
> else
>   echo "You are not root."
> fi
You are not root.
```

### if-elif-else statement

```console
$ count=15
$ if [ $count -lt 10 ]; then
>   echo "Count is less than 10."
> elif [ $count -lt 20 ]; then
>   echo "Count is between 10 and 19."
> else
>   echo "Count is 20 or greater."
> fi
Count is between 10 and 19.
```

### Using test operators

```console
$ file="example.txt"
$ if [ -e "$file" ] && [ -w "$file" ]; then
>   echo "File exists and is writable."
> else
>   echo "File doesn't exist or isn't writable."
> fi
File doesn't exist or isn't writable.
```

### Using command exit status

```console
$ if grep "root" /etc/passwd > /dev/null; then
>   echo "User root exists."
> fi
User root exists.
```

## Tips:

### Always Quote Variables

Always quote variables in test conditions to prevent word splitting and globbing issues:

```console
$ filename="my file.txt"
$ if [ -f "$filename" ]; then  # Quotes prevent issues with spaces
>   echo "File exists"
> fi
```

### Use Double Brackets in Bash

In Bash, `[[ ]]` provides more features than the traditional `[ ]` test command:

```console
$ if [[ "$string" == *txt ]]; then  # Pattern matching works in [[ ]]
>   echo "String ends with txt"
> fi
```

### Check Command Success

You can test if a command succeeded without using `[ ]`:

```console
$ if ping -c1 -W1 google.com &>/dev/null; then
>   echo "Network is up"
> else
>   echo "Network is down"
> fi
```

## Frequently Asked Questions

#### Q1. What's the difference between `[ ]` and `[[ ]]`?
A. `[ ]` is the traditional test command available in most shells. `[[ ]]` is a Bash extension with additional features like pattern matching and logical operators. Use `[[ ]]` in Bash scripts when possible.

#### Q2. How do I test if a file exists?
A. Use `if [ -e filename ]` to check if a file exists, `if [ -f filename ]` to check if it's a regular file, or `if [ -d filename ]` to check if it's a directory.

#### Q3. How do I compare strings?
A. Use `if [ "$string1" = "$string2" ]` for equality or `if [ "$string1" != "$string2" ]` for inequality. Note the single `=` for string comparison.

#### Q4. How do I compare numbers?
A. Use `-eq` (equal), `-ne` (not equal), `-lt` (less than), `-le` (less than or equal), `-gt` (greater than), or `-ge` (greater than or equal): `if [ "$num1" -eq "$num2" ]`.

## References

https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html

## Revisions

- 2025/05/06 First revision