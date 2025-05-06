# for command

Execute a command for each item in a list.

## Overview

The `for` command is a shell construct that allows you to iterate through a list of values and execute a command or set of commands for each item. It's commonly used in shell scripts for batch processing, automation, and repetitive tasks.

## Options

The `for` command is a shell built-in and doesn't have traditional command-line options. Instead, it follows specific syntax patterns:

### Basic Syntax

```console
$ for variable in list; do commands; done
```

### C-style Syntax (Bash)

```console
$ for ((initialization; condition; increment)); do commands; done
```

## Usage Examples

### Iterating Through a List of Values

```console
$ for name in Alice Bob Charlie; do
>   echo "Hello, $name!"
> done
Hello, Alice!
Hello, Bob!
Hello, Charlie!
```

### Processing Files in a Directory

```console
$ for file in *.txt; do
>   echo "Processing $file..."
>   wc -l "$file"
> done
Processing document.txt...
      45 document.txt
Processing notes.txt...
      12 notes.txt
```

### Using C-style Loop (Bash)

```console
$ for ((i=1; i<=5; i++)); do
>   echo "Number: $i"
> done
Number: 1
Number: 2
Number: 3
Number: 4
Number: 5
```

### Using Command Substitution

```console
$ for user in $(cat users.txt); do
>   echo "Creating home directory for $user"
>   mkdir -p /home/$user
> done
Creating home directory for john
Creating home directory for sarah
Creating home directory for mike
```

## Tips:

### Use Proper Quoting

Always quote variables inside the loop to handle filenames with spaces or special characters:

```console
$ for file in *.txt; do
>   cp "$file" "/backup/$(date +%Y%m%d)_$file"
> done
```

### Break and Continue

Use `break` to exit a loop early and `continue` to skip to the next iteration:

```console
$ for i in {1..10}; do
>   if [ $i -eq 5 ]; then continue; fi
>   if [ $i -eq 8 ]; then break; fi
>   echo $i
> done
1
2
3
4
6
7
```

### Sequence Generation

Use brace expansion for numeric sequences:

```console
$ for i in {1..5}; do echo $i; done
1
2
3
4
5
```

## Frequently Asked Questions

#### Q1. What's the difference between `for` and `while` loops?
A. `for` loops iterate over a predefined list of items, while `while` loops continue as long as a condition remains true.

#### Q2. How do I loop through numbers in a range?
A. Use brace expansion: `for i in {1..10}; do echo $i; done` or C-style syntax: `for ((i=1; i<=10; i++)); do echo $i; done`.

#### Q3. How can I loop through lines in a file?
A. Use a `while` loop with `read`: `while read line; do echo "$line"; done < file.txt` or `for` with command substitution: `for line in $(cat file.txt); do echo "$line"; done` (note that the latter doesn't preserve whitespace).

#### Q4. How do I iterate through array elements?
A. Use `for element in "${array[@]}"; do echo "$element"; done`.

## References

https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html

## Revisions

- 2025/05/05 First revision