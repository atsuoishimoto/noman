# case command

Performs conditional branching based on pattern matching in shell scripts.

## Overview

The `case` statement is a shell construct that allows for multiple conditional branches based on pattern matching. It's more readable and efficient than multiple `if-else` statements when comparing a single value against multiple patterns. The `case` statement is commonly used in shell scripts to handle command-line arguments, menu selections, or any situation requiring multiple condition checks.

## Syntax

```bash
case WORD in
  PATTERN1)
    COMMANDS1
    ;;
  PATTERN2)
    COMMANDS2
    ;;
  *)
    DEFAULT_COMMANDS
    ;;
esac
```

## Usage Examples

### Basic Pattern Matching

```console
$ cat example.sh
#!/bin/bash
fruit="apple"

case "$fruit" in
  "apple")
    echo "It's an apple."
    ;;
  "banana")
    echo "It's a banana."
    ;;
  *)
    echo "It's something else."
    ;;
esac

$ ./example.sh
It's an apple.
```

### Multiple Patterns for One Action

```console
$ cat example2.sh
#!/bin/bash
fruit="pear"

case "$fruit" in
  "apple"|"pear"|"peach")
    echo "It's a pome or stone fruit."
    ;;
  "banana"|"pineapple")
    echo "It's a tropical fruit."
    ;;
  *)
    echo "Unknown fruit type."
    ;;
esac

$ ./example2.sh
It's a pome or stone fruit.
```

### Command-Line Argument Handling

```console
$ cat options.sh
#!/bin/bash

case "$1" in
  -h|--help)
    echo "Usage: $0 [OPTION]"
    echo "Options:"
    echo "  -h, --help     Display this help message"
    echo "  -v, --version  Display version information"
    ;;
  -v|--version)
    echo "Version 1.0"
    ;;
  *)
    echo "Unknown option: $1"
    echo "Use --help for more information."
    ;;
esac

$ ./options.sh --help
Usage: ./options.sh [OPTION]
Options:
  -h, --help     Display this help message
  -v, --version  Display version information
```

### Pattern Matching with Wildcards

```console
$ cat wildcard.sh
#!/bin/bash
filename="document.txt"

case "$filename" in
  *.txt)
    echo "Text file"
    ;;
  *.jpg|*.png|*.gif)
    echo "Image file"
    ;;
  *.sh)
    echo "Shell script"
    ;;
  *)
    echo "Unknown file type"
    ;;
esac

$ ./wildcard.sh
Text file
```

## Tips

### Use Fall-Through with ;& or ;&& (Bash 4+)

In Bash 4 and later, you can use `;& ` to continue to the next pattern without testing it, or `;&& ` to test the next pattern:

```bash
case "$var" in
  pattern1)
    echo "Matches pattern1"
    ;& # Fall through to next pattern
  pattern2)
    echo "This will execute if pattern1 matches"
    ;;
esac
```

### Combine Patterns with Pipe Symbol

Use the pipe symbol `|` to match multiple patterns for the same action:

```bash
case "$var" in
  yes|y|Y)
    echo "Affirmative"
    ;;
esac
```

### Always Include a Default Case

Include a default case using `*` to handle unexpected inputs:

```bash
case "$var" in
  # other patterns
  *)
    echo "No match found"
    ;;
esac
```

### Use Quotes Around Variables

Always quote your variables to prevent word splitting and globbing:

```bash
case "$variable" in
  # patterns
esac
```

## Frequently Asked Questions

#### Q1. How does `case` differ from `if-else` statements?
A. `case` is more readable and efficient when comparing a single value against multiple patterns. It's designed specifically for pattern matching rather than general conditional logic.

#### Q2. Can I use regular expressions in `case` patterns?
A. `case` uses shell pattern matching (globbing), not regular expressions. You can use wildcards like `*`, `?`, and character classes like `[a-z]`, but not regex syntax like `+` or `\d`.

#### Q3. How do I match any pattern in a `case` statement?
A. Use `*` as the pattern to match anything. This is commonly used as the default case.

#### Q4. Can I use `case` with numeric comparisons?
A. Yes, but you need to be careful with the syntax. For example:
```bash
case $number in
  [0-9]) echo "Single digit" ;;
  [0-9][0-9]) echo "Two digits" ;;
  *) echo "More than two digits or not a number" ;;
esac
```

## References

https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html

## Revisions

- 2025/05/06 First revision