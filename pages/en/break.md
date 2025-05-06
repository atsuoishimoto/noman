# break command

Exits from a for, while, until, or select loop in shell scripts.

## Overview

The `break` command is used within shell scripts to exit from a loop before its normal completion. When executed, it immediately terminates the innermost enclosing loop and continues execution at the command following the terminated loop. When used with an optional numeric argument, it can break out of multiple nested loops.

## Options

### **n** (numeric argument)

Exits from the nth enclosing loop. If n is omitted, only the innermost loop is exited.

```console
$ break 2  # Exits from two levels of nested loops
```

## Usage Examples

### Breaking from a simple loop

```console
$ for i in 1 2 3 4 5; do
>   echo "Processing $i"
>   if [ $i -eq 3 ]; then
>     echo "Found 3, breaking out of loop"
>     break
>   fi
> done
> echo "Loop completed"
Processing 1
Processing 2
Processing 3
Found 3, breaking out of loop
Loop completed
```

### Breaking from nested loops

```console
$ for i in 1 2 3; do
>   echo "Outer loop: $i"
>   for j in a b c; do
>     echo "  Inner loop: $j"
>     if [ $j = "b" ] && [ $i -eq 2 ]; then
>       echo "  Breaking from inner loop"
>       break
>     fi
>   done
> done
Outer loop: 1
  Inner loop: a
  Inner loop: b
  Inner loop: c
Outer loop: 2
  Inner loop: a
  Inner loop: b
  Breaking from inner loop
Outer loop: 3
  Inner loop: a
  Inner loop: b
  Inner loop: c
```

### Breaking from multiple levels with numeric argument

```console
$ for i in 1 2 3; do
>   echo "Outer loop: $i"
>   for j in a b c; do
>     echo "  Inner loop: $j"
>     if [ $j = "b" ] && [ $i -eq 2 ]; then
>       echo "  Breaking from both loops"
>       break 2
>     fi
>   done
> done
> echo "All loops completed"
Outer loop: 1
  Inner loop: a
  Inner loop: b
  Inner loop: c
Outer loop: 2
  Inner loop: a
  Inner loop: b
  Breaking from both loops
All loops completed
```

## Tips:

### Use break sparingly
Excessive use of `break` can make code harder to read and maintain. Consider restructuring your loop logic when possible.

### Combine with conditional statements
`break` is most effective when combined with `if` statements to exit loops based on specific conditions.

### Remember the difference between break and continue
While `break` exits the loop entirely, `continue` skips the rest of the current iteration and moves to the next one.

### Use numeric argument for nested loops
When working with nested loops, use `break n` to exit multiple levels at once instead of using multiple `break` statements.

## Frequently Asked Questions

#### Q1. What's the difference between `break` and `exit`?
A. `break` exits only from the current loop, while `exit` terminates the entire script.

#### Q2. Can I use `break` outside of a loop?
A. No, using `break` outside a loop will result in an error message like "break: only meaningful in a 'for', 'while', or 'until' loop".

#### Q3. How do I break out of multiple nested loops?
A. Use `break n` where n is the number of nested loops you want to exit from.

#### Q4. Does `break` work in all shell types?
A. Yes, `break` is a standard feature in Bash, Zsh, Ksh, and other POSIX-compliant shells.

## References

https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html

## Revisions

- 2025/05/06 First revision