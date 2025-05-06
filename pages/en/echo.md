# echo command

Display a line of text or variables to standard output.

## Overview

The `echo` command prints its arguments to the standard output, followed by a newline. It's commonly used in shell scripts to display text, show variable values, or generate output for other commands.

## Options

### **-n**

Suppresses the trailing newline that is normally added to the output.

```console
$ echo -n "Hello"
Hello$
```

### **-e**

Enables interpretation of backslash escape sequences.

```console
$ echo -e "Hello\nWorld"
Hello
World
```

### **-E**

Disables interpretation of backslash escape sequences (this is the default).

```console
$ echo -E "Hello\nWorld"
Hello\nWorld
```

## Usage Examples

### Displaying text

```console
$ echo Hello World
Hello World
```

### Displaying variable values

```console
$ name="John"
$ echo "My name is $name"
My name is John
```

### Using with command substitution

```console
$ echo "Today's date is $(date)"
Today's date is Mon May 5 10:15:23 EDT 2025
```

### Using escape sequences with -e

```console
$ echo -e "Tab:\t| Newline:\n| Backslash:\\"
Tab:	| Newline:
| Backslash:\
```

## Tips:

### Prevent variable expansion

Use single quotes to prevent variable expansion and interpretation:

```console
$ echo '$HOME contains your home directory path'
$HOME contains your home directory path
```

### Redirect output to a file

Combine echo with redirection to create or append to files:

```console
$ echo "This is a new file" > newfile.txt
$ echo "This is appended" >> newfile.txt
```

### Generate multiline content

Use multiple echo commands or escape sequences to create multiline content:

```console
$ echo -e "Line 1\nLine 2\nLine 3" > multiline.txt
```

## Frequently Asked Questions

#### Q1. What's the difference between single and double quotes with echo?
A. Double quotes (`"`) allow variable expansion and some escape sequences, while single quotes (`'`) treat everything literally without expansion.

#### Q2. How do I echo without a newline at the end?
A. Use the `-n` option: `echo -n "text"`.

#### Q3. How can I include special characters like tabs or newlines?
A. Use the `-e` option with escape sequences: `echo -e "Tab:\t Newline:\n"`.

#### Q4. Can echo display the contents of a file?
A. No, that's what the `cat` command is for. Echo only displays its arguments.

## References

https://www.gnu.org/software/coreutils/manual/html_node/echo-invocation.html

## Revisions

- 2025/05/05 First revision