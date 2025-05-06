# shift command

Shifts positional parameters in shell scripts, removing the first parameter and renumbering the remaining ones.

## Overview

The `shift` command is a shell built-in that removes the first positional parameter ($1) and shifts all other parameters down by one position ($2 becomes $1, $3 becomes $2, etc.). This is particularly useful in shell scripts when processing command-line arguments sequentially or when you need to work through a list of parameters.

## Options

### **n**

Shifts parameters by n positions (where n is a positive integer). If n is greater than the number of positional parameters, all parameters are removed.

```console
$ set -- a b c d e
$ echo $1 $2 $3
a b c
$ shift 2
$ echo $1 $2 $3
c d e
```

## Usage Examples

### Basic Usage

```console
$ set -- apple banana cherry
$ echo $1
apple
$ shift
$ echo $1
banana
$ shift
$ echo $1
cherry
```

### Processing Command-Line Arguments in a Script

```console
#!/bin/bash
# process_args.sh

while [ $# -gt 0 ]; do
    echo "Processing: $1"
    shift
done
```

When executed:

```console
$ ./process_args.sh arg1 arg2 arg3
Processing: arg1
Processing: arg2
Processing: arg3
```

### Processing Flags and Options

```console
#!/bin/bash
# process_options.sh

verbose=0
while [ $# -gt 0 ]; do
    case "$1" in
        -v|--verbose)
            verbose=1
            shift
            ;;
        -f|--file)
            filename="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            shift
            ;;
    esac
done

echo "Verbose mode: $verbose"
[ -n "$filename" ] && echo "Filename: $filename"
```

## Tips:

### Check Remaining Parameters

Use `$#` to check how many parameters remain. This is useful for validating that enough arguments were provided.

```console
if [ $# -lt 2 ]; then
    echo "Error: Not enough arguments"
    exit 1
fi
```

### Preserve Original Arguments

If you need to access the original arguments later, save them before shifting:

```console
all_args=("$@")
while [ $# -gt 0 ]; do
    # Process arguments
    shift
done
# Later access original args with ${all_args[@]}
```

### Shift with Error Checking

When shifting by more than 1, check that enough parameters exist:

```console
if [ $# -ge 2 ]; then
    shift 2
else
    echo "Not enough parameters to shift"
    exit 1
fi
```

## Frequently Asked Questions

#### Q1. What happens if I use `shift` when there are no parameters left?
A. In most shells, nothing happens - it's not an error. However, it's good practice to check `$#` before shifting.

#### Q2. Can I use `shift` outside of a shell script?
A. Yes, you can use it in interactive shell sessions, but it's primarily useful in scripts.

#### Q3. Does `shift` affect environment variables?
A. No, it only affects positional parameters ($1, $2, etc.), not environment variables.

#### Q4. How do I shift by more than one position?
A. Use `shift n` where n is the number of positions to shift (e.g., `shift 2`).

## References

https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-shift

## Revisions

- 2025/05/05 First revision