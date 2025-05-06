# printf command

Format and print data according to a specified format string.

## Overview

The `printf` command formats and prints data to standard output according to a format specification. It works similarly to the C programming language's printf function, allowing precise control over output formatting including text alignment, number formatting, and string manipulation.

## Options

### **-v VAR**

Assign the output to shell variable VAR rather than displaying it on standard output.

```console
$ printf -v myvar "Hello, %s" "World"
$ echo $myvar
Hello, World
```

### **--help**

Display a help message and exit.

```console
$ printf --help
Usage: printf FORMAT [ARGUMENT]...
   or: printf OPTION
Print ARGUMENT(s) according to FORMAT, or execute according to OPTION:

      --help     display this help and exit
      --version  output version information and exit
...
```

### **--version**

Output version information and exit.

```console
$ printf --version
printf (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by David MacKenzie.
```

## Format Specifiers

### **%s** - String

```console
$ printf "Hello, %s!\n" "World"
Hello, World!
```

### **%d** - Decimal integer

```console
$ printf "Number: %d\n" 42
Number: 42
```

### **%f** - Floating-point number

```console
$ printf "Pi is approximately %.2f\n" 3.14159
Pi is approximately 3.14
```

### **%c** - Character

```console
$ printf "First letter: %c\n" "A"
First letter: A
```

### **%x** - Hexadecimal

```console
$ printf "Hex: %x\n" 255
Hex: ff
```

### **%%** - Literal percent sign

```console
$ printf "100%% complete\n"
100% complete
```

## Usage Examples

### Basic text formatting

```console
$ printf "Name: %s, Age: %d\n" "Alice" 30
Name: Alice, Age: 30
```

### Multiple arguments

```console
$ printf "%s %s %s\n" "one" "two" "three"
one two three
```

### Width and alignment

```console
$ printf "|%-10s|%10s|\n" "left" "right"
|left      |     right|
```

### Precision for floating-point numbers

```console
$ printf "%.2f %.4f %.0f\n" 3.14159 2.71828 5.999
3.14 2.7183 6
```

### Formatting a table

```console
$ printf "%-10s %-8s %s\n" "Name" "Age" "City"
$ printf "%-10s %-8d %s\n" "Alice" 30 "New York"
$ printf "%-10s %-8d %s\n" "Bob" 25 "Chicago"
Name       Age      City
Alice      30       New York
Bob        25       Chicago
```

## Tips

### Use Escape Sequences

Common escape sequences include `\n` (newline), `\t` (tab), and `\\` (backslash).

```console
$ printf "Line 1\nLine 2\tTabbed\n"
Line 1
Line 2	Tabbed
```

### Format Numbers with Leading Zeros

Use the format `%0Nd` where N is the total width:

```console
$ printf "ID: %04d\n" 42
ID: 0042
```

### Reuse Format Arguments

If you provide more output positions than arguments, the last arguments will be reused:

```console
$ printf "A: %d, B: %d, C: %d\n" 1 2
A: 1, B: 2, C: 2
```

### Print Without Newline

Unlike `echo`, `printf` doesn't automatically add a newline:

```console
$ printf "No newline"
No newline$
```

## Frequently Asked Questions

#### Q1. What's the difference between `printf` and `echo`?
A. `printf` offers more precise formatting control but doesn't add a newline by default. `echo` is simpler but has fewer formatting options and automatically adds a newline.

#### Q2. How do I format a date with `printf`?
A. You can't directly format dates with `printf`. Use the `date` command to generate a formatted date string, then pass it to `printf`:
```console
$ printf "Today is %s\n" "$(date +"%Y-%m-%d")"
Today is 2025-05-05
```

#### Q3. How do I print special characters like tabs or newlines?
A. Use escape sequences: `\t` for tab, `\n` for newline, `\r` for carriage return, and `\\` for a literal backslash.

#### Q4. How do I format decimal places in numbers?
A. Use the precision specifier, like `%.2f` for 2 decimal places:
```console
$ printf "Price: $%.2f\n" 9.99
Price: $9.99
```

## References

https://www.gnu.org/software/coreutils/manual/html_node/printf-invocation.html

## Revisions

- 2025/05/05 First revision