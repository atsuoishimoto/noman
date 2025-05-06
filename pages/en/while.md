# while command

Execute commands repeatedly as long as a condition is true.

## Overview

The `while` command is a shell construct that creates a loop, executing a set of commands repeatedly as long as a specified condition evaluates to true. It's commonly used for iterating a fixed number of times, processing input line by line, or running commands until a specific condition changes.

## Options

The `while` command doesn't have traditional command-line options as it's a shell built-in construct rather than a standalone program.

## Usage Examples

### Basic while loop

```console
$ i=1
$ while [ $i -le 5 ]; do
>   echo "Count: $i"
>   i=$((i+1))
> done
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
```

### Reading file line by line

```console
$ while read line; do
>   echo "Line: $line"
> done < file.txt
Line: This is the first line
Line: This is the second line
Line: This is the third line
```

### Infinite loop with break condition

```console
$ while true; do
>   echo "Enter a number (0 to exit):"
>   read num
>   if [ "$num" -eq 0 ]; then
>     break
>   fi
>   echo "You entered: $num"
> done
Enter a number (0 to exit):
5
You entered: 5
Enter a number (0 to exit):
0
```

### Processing command output

```console
$ ls -1 *.txt | while read file; do
>   echo "Processing $file"
>   wc -l "$file"
> done
Processing document.txt
      10 document.txt
Processing notes.txt
       5 notes.txt
```

## Tips

### Use Control-C to Exit Infinite Loops

If you create an infinite loop (like `while true; do...`) and need to exit, press Control-C to terminate the loop.

### Combine with Sleep for Polling

Use `while` with the `sleep` command to periodically check conditions:

```console
$ while ! ping -c 1 server.example.com &>/dev/null; do
>   echo "Server not reachable, waiting..."
>   sleep 5
> done
```

### Avoid Common Pitfalls

Be careful with conditions that might never become false, which can create infinite loops. Always ensure there's a way for the condition to eventually evaluate to false.

### Use Continue to Skip Iterations

The `continue` statement can be used within a `while` loop to skip the rest of the current iteration and move to the next one.

## Frequently Asked Questions

#### Q1. What's the difference between `while` and `until`?
A. `while` executes commands as long as the condition is true, whereas `until` executes commands as long as the condition is false.

#### Q2. Can I use `while` to read from standard input?
A. Yes, `while read line; do ...; done` without a redirection will read from standard input.

#### Q3. How do I create a countdown timer with `while`?
A. Use a decreasing counter: `count=10; while [ $count -gt 0 ]; do echo $count; count=$((count-1)); sleep 1; done; echo "Done!"`

#### Q4. How can I process multiple values in each iteration?
A. Use multiple variables in the read command: `while read name age; do echo "$name is $age years old"; done < data.txt`

## References

https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html

## Revisions

- 2025/05/05 First revision