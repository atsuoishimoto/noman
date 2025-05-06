# getopt command

Parse command-line options in shell scripts.

## Overview

`getopt` is a command-line utility that parses command-line arguments according to a specified format, making it easier to handle options in shell scripts. It standardizes option processing by rearranging the arguments into a canonical form that can be processed more easily.

## Options

### **-o, --options**

Specifies the short options to be recognized

```console
$ getopt -o ab:c:: -- -a -b value -c
 -a -b 'value' -c -- 
```

### **-l, --longoptions**

Specifies the long options to be recognized

```console
$ getopt -o a -l alpha,beta: -- --alpha --beta=value
 -a --beta 'value' -- 
```

### **-n, --name**

Sets the name used in error messages

```console
$ getopt -n myscript -o a -- -x
myscript: invalid option -- 'x'
```

### **-q, --quiet**

Suppresses error messages

```console
$ getopt -q -o a -- -x
 -- 'x'
```

### **-Q, --quiet-output**

Suppresses normal output (useful when checking for valid options)

```console
$ getopt -Q -o a -- -a
```

### **-u, --unquoted**

Produces unquoted output (not recommended)

```console
$ getopt -u -o a:b: -- -a foo -b bar
 -a foo -b bar -- 
```

### **-T, --test**

Test mode: outputs the parsed parameters and exits

```console
$ getopt -T -o a:b: -- -a foo -b bar
getopt -o 'a:b:' -- '-a' 'foo' '-b' 'bar'
```

## Usage Examples

### Basic Option Parsing in a Shell Script

```console
$ cat example.sh
#!/bin/bash
OPTS=$(getopt -o ab:c: --long alpha,beta:,gamma: -n 'example.sh' -- "$@")
eval set -- "$OPTS"

while true; do
  case "$1" in
    -a | --alpha ) ALPHA=1; shift ;;
    -b | --beta ) BETA="$2"; shift 2 ;;
    -c | --gamma ) GAMMA="$2"; shift 2 ;;
    -- ) shift; break ;;
    * ) break ;;
  esac
done

echo "Alpha: $ALPHA"
echo "Beta: $BETA"
echo "Gamma: $GAMMA"
echo "Remaining arguments: $@"

$ ./example.sh -a --beta=value arg1 arg2
Alpha: 1
Beta: value
Gamma: 
Remaining arguments: arg1 arg2
```

### Handling Required Options

```console
$ cat required.sh
#!/bin/bash
OPTS=$(getopt -o f: --long file: -n 'required.sh' -- "$@")
eval set -- "$OPTS"

FILE=""
while true; do
  case "$1" in
    -f | --file ) FILE="$2"; shift 2 ;;
    -- ) shift; break ;;
    * ) break ;;
  esac
done

if [ -z "$FILE" ]; then
  echo "Error: -f/--file option is required"
  exit 1
fi

echo "Processing file: $FILE"

$ ./required.sh -f data.txt
Processing file: data.txt

$ ./required.sh
Error: -f/--file option is required
```

## Tips:

### Use Enhanced getopt

Modern Linux systems use enhanced getopt which supports long options. The traditional getopt on some systems (like macOS) may not support all features.

### Always Quote Variables

When passing arguments to getopt, always quote the variables to handle spaces correctly:
```bash
getopt -o a:b: -- "$@"
```

### Handle Errors Properly

Use the `-n` option to provide a script name for error messages, and check getopt's exit status to handle invalid options:
```bash
OPTS=$(getopt -o a:b: -n 'myscript' -- "$@") || exit 1
```

### Understand Option Syntax

In the option string:
- A single letter means a flag option (e.g., `-a`)
- A letter followed by a colon means an option with a required argument (e.g., `-b value`)
- A letter followed by two colons means an option with an optional argument (e.g., `-c[value]`)

## Frequently Asked Questions

#### Q1. What's the difference between `getopt` and `getopts`?
A. `getopt` is an external command that supports both short and long options, while `getopts` is a shell builtin that only supports short options but is more portable across different Unix-like systems.

#### Q2. Why does my script fail with "getopt: invalid option" errors?
A. You might be using the traditional getopt (common on macOS) which doesn't support long options or other enhanced features. Try using the enhanced getopt available on most Linux distributions.

#### Q3. How do I handle options with optional arguments?
A. Use double colons in the option specification: `-o a::` for short options or `--longoptions=alpha::` for long options.

#### Q4. How do I separate options from non-option arguments?
A. Use `--` to mark the end of options. Any arguments after `--` will be treated as non-option arguments.

## References

https://man7.org/linux/man-pages/man1/getopt.1.html

## Revisions

- 2025/05/05 First revision