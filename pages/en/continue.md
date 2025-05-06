# continue command

Resume a suspended job by bringing it to the foreground.

## Overview

The `continue` command is a shell built-in that resumes execution of a loop (for, while, until) at the beginning of the next iteration, skipping any remaining commands in the current iteration. It's used within shell scripts to control loop flow by immediately starting the next iteration when certain conditions are met.

## Options

The `continue` command doesn't have options in the traditional sense, but it can accept an optional numeric argument.

### **n** (numeric argument)

Specifies which enclosing loop to continue. By default (no argument), `continue` affects the innermost loop.

```console
$ for i in 1 2 3; do
>   for j in a b c; do
>     if [ $j = "b" ]; then
>       continue 2  # Skip to next iteration of outer loop
>     fi
>     echo "$i $j"
>   done
> done
1 a
2 a
3 a
```

## Usage Examples

### Basic Usage in a Loop

```console
$ for i in 1 2 3 4 5; do
>   if [ $i -eq 3 ]; then
>     continue
>   fi
>   echo "Processing item $i"
> done
Processing item 1
Processing item 2
Processing item 4
Processing item 5
```

### Skipping Iterations Based on Conditions

```console
$ i=0
$ while [ $i -lt 5 ]; do
>   i=$((i+1))
>   if [ $((i % 2)) -eq 0 ]; then
>     continue
>   fi
>   echo "Odd number: $i"
> done
Odd number: 1
Odd number: 3
Odd number: 5
```

## Tips:

### Use with Caution in Complex Loops

When using `continue` in nested loops, be careful about which loop you're affecting. Without a numeric argument, it only affects the innermost loop.

### Combine with Conditional Logic

`continue` is most useful when combined with conditional statements to skip iterations that meet specific criteria, making your scripts more efficient.

### Consider Readability

While `continue` can make scripts more efficient, excessive use can make code harder to follow. Use it judiciously to maintain readability.

## Frequently Asked Questions

#### Q1. What's the difference between `continue` and `break`?
A. `continue` skips to the next iteration of a loop, while `break` exits the loop entirely.

#### Q2. Can I use `continue` outside of a loop?
A. No, using `continue` outside a loop will result in an error as it only has meaning within loops.

#### Q3. How do I continue a specific outer loop in nested loops?
A. Use `continue n` where n is the level of the loop you want to continue (1 for the innermost loop, 2 for the next level out, etc.).

#### Q4. Does `continue` work the same in all shell types?
A. The basic functionality is consistent across bash, zsh, and other common shells, but there might be subtle differences in behavior with complex scripts.

## References

https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html

## Revisions

- 2025/05/05 First revision