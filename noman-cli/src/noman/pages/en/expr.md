# expr command

Evaluate expressions and output the result.

## Overview

`expr` is a command-line utility that evaluates expressions and outputs the result. It performs arithmetic operations, string operations, and logical comparisons. The command is primarily used in shell scripts for calculations and string manipulation.

## Options

### **--help**

Display a help message and exit.

```console
$ expr --help
Usage: expr EXPRESSION
  or:  expr OPTION
```

### **--version**

Output version information and exit.

```console
$ expr --version
expr (GNU coreutils) 9.0
Copyright (C) 2021 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

## Usage Examples

### Basic Arithmetic

```console
$ expr 5 + 3
8
$ expr 10 - 4
6
$ expr 3 \* 4
12
$ expr 20 / 5
4
$ expr 20 % 3
2
```

### String Operations

```console
$ expr length "Hello World"
11
$ expr substr "Hello World" 1 5
Hello
$ expr index "Hello World" "o"
5
```

### Logical Comparisons

```console
$ expr 5 \> 3
1
$ expr 5 \< 3
0
$ expr 5 = 5
1
$ expr 5 != 3
1
```

### Using in Shell Scripts

```console
$ a=5
$ b=3
$ c=$(expr $a + $b)
$ echo $c
8
```

## Tips:

### Escape Special Characters

Always escape multiplication (*), division (/), and other special characters with a backslash to prevent shell interpretation.

```console
$ expr 5 \* 3
15
```

### Spaces Matter

`expr` requires spaces between operators and operands. Without spaces, the command will not work correctly.

```console
$ expr 5+3     # Wrong
5+3
$ expr 5 + 3   # Correct
8
```

### Return Values

`expr` returns 0 if the expression evaluates to a non-zero and non-empty value, 1 if the expression is zero or empty, and 2 if the expression is invalid.

### Use for Incrementing Variables

`expr` is commonly used in shell scripts to increment counters:

```console
$ i=1
$ i=$(expr $i + 1)
$ echo $i
2
```

## Frequently Asked Questions

#### Q1. What is the difference between `expr` and using `$(())` in bash?
A. `expr` is an external command that works in all POSIX shells, while `$(())` is a bash built-in arithmetic expansion that's faster but less portable.

#### Q2. How do I perform floating-point calculations with `expr`?
A. `expr` only handles integer arithmetic. For floating-point calculations, use `bc` or `awk` instead.

#### Q3. Why does my multiplication with `expr` fail?
A. The asterisk (*) needs to be escaped with a backslash (`\*`) to prevent the shell from interpreting it as a wildcard.

#### Q4. Can `expr` handle regular expressions?
A. No, `expr` doesn't support full regular expressions. For pattern matching, use tools like `grep`, `sed`, or `awk`.

## References

https://www.gnu.org/software/coreutils/manual/html_node/expr-invocation.html

## Revisions

- 2025/05/05 First revision