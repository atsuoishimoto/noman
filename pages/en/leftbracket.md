# [ command

Evaluates conditional expressions and returns a status based on the evaluation.

## Overview

The `[` command (also known as `test`) is a shell builtin that evaluates conditional expressions and returns a status of 0 (true) or 1 (false). It's commonly used in shell scripts for conditional testing of file attributes, string comparisons, and arithmetic operations. The command requires a closing `]` to complete its syntax.

## Options

### **-e file**

Tests if file exists.

```console
$ [ -e /etc/passwd ] && echo "File exists" || echo "File does not exist"
File exists
```

### **-f file**

Tests if file exists and is a regular file.

```console
$ [ -f /etc/passwd ] && echo "Regular file" || echo "Not a regular file"
Regular file
```

### **-d file**

Tests if file exists and is a directory.

```console
$ [ -d /etc ] && echo "Directory exists" || echo "Not a directory"
Directory exists
```

### **-r file**

Tests if file exists and is readable.

```console
$ [ -r /etc/passwd ] && echo "File is readable" || echo "File is not readable"
File is readable
```

### **-w file**

Tests if file exists and is writable.

```console
$ [ -w /tmp ] && echo "Directory is writable" || echo "Directory is not writable"
Directory is writable
```

### **-x file**

Tests if file exists and is executable.

```console
$ [ -x /bin/ls ] && echo "File is executable" || echo "File is not executable"
File is executable
```

### **-z string**

Tests if the length of string is zero.

```console
$ [ -z "" ] && echo "String is empty" || echo "String is not empty"
String is empty
```

### **-n string**

Tests if the length of string is non-zero.

```console
$ [ -n "hello" ] && echo "String is not empty" || echo "String is empty"
String is not empty
```

## Usage Examples

### String comparison

```console
$ name="John"
$ [ "$name" = "John" ] && echo "Name is John" || echo "Name is not John"
Name is John
```

### Numeric comparison

```console
$ age=25
$ [ $age -eq 25 ] && echo "Age is 25" || echo "Age is not 25"
Age is 25
```

### Combining conditions with logical operators

```console
$ [ -d /etc ] && [ -r /etc/passwd ] && echo "Both conditions are true"
Both conditions are true
```

### Using in if statements

```console
$ if [ -f /etc/hosts ]; then
>   echo "The hosts file exists"
> else
>   echo "The hosts file does not exist"
> fi
The hosts file exists
```

## Tips:

### Always Quote Variables

Always quote variables inside `[` to prevent errors with empty variables or variables containing spaces:

```console
$ [ "$variable" = "value" ]  # Correct
$ [ $variable = value ]      # Potentially problematic
```

### Use Double Brackets in Bash

In Bash, consider using `[[` instead of `[` for more advanced features and fewer quoting issues:

```console
$ [[ $string == *txt ]] && echo "String ends with txt"
```

### Remember the Closing Bracket

The `[` command requires a closing `]` as its last argument. Forgetting it will cause syntax errors.

### Spacing is Critical

Spaces are required around brackets and operators:

```console
$ [ -f file.txt ]    # Correct
$ [-f file.txt]      # Incorrect
$ [ $a = $b ]        # Correct
$ [ $a=$b ]          # Incorrect
```

## Frequently Asked Questions

#### Q1. What's the difference between `[` and `[[`?
A. `[` is a command (also known as `test`) available in all POSIX shells, while `[[` is a Bash/Zsh shell keyword with extended functionality like pattern matching and logical operators without escaping.

#### Q2. How do I check if a variable is empty?
A. Use `[ -z "$variable" ]` to check if a variable is empty or `[ -n "$variable" ]` to check if it's not empty.

#### Q3. How do I compare numbers?
A. Use `-eq` (equal), `-ne` (not equal), `-lt` (less than), `-le` (less than or equal), `-gt` (greater than), or `-ge` (greater than or equal): `[ "$num1" -eq "$num2" ]`.

#### Q4. How do I compare strings?
A. Use `=` (equal) or `!=` (not equal): `[ "$string1" = "$string2" ]`.

## References

https://pubs.opengroup.org/onlinepubs/9699919799/utilities/test.html

## Revisions

- 2025/05/05 First revision