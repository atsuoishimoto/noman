# until command

Execute a command repeatedly until a condition is met.

## Overview

The `until` command is a shell construct that repeatedly executes a command block until a specified condition becomes true. Unlike `while`, which runs while a condition is true, `until` runs until a condition becomes true. It's useful for creating loops that need to continue until a specific state is reached.

## Options

The `until` command doesn't have traditional command-line options as it's a shell built-in construct rather than a standalone program.

## Usage Examples

### Basic until loop

```console
$ until [ $counter -ge 5 ]; do
>   echo "Counter: $counter"
>   ((counter++))
> done
Counter: 0
Counter: 1
Counter: 2
Counter: 3
Counter: 4
```

### Waiting for a file to exist

```console
$ until [ -f /tmp/signal_file ]; do
>   echo "Waiting for signal file..."
>   sleep 5
> done
> echo "Signal file found!"
Waiting for signal file...
Waiting for signal file...
Signal file found!
```

### Waiting for a process to complete

```console
$ process_id=$!
$ until ! ps -p $process_id > /dev/null; do
>   echo "Process is still running..."
>   sleep 2
> done
> echo "Process has completed."
Process is still running...
Process is still running...
Process has completed.
```

### Retrying a command until it succeeds

```console
$ until ping -c 1 example.com > /dev/null; do
>   echo "Network not available, retrying in 5 seconds..."
>   sleep 5
> done
> echo "Network is up!"
Network not available, retrying in 5 seconds...
Network is up!
```

## Tips:

### Always Include an Exit Condition

Make sure your `until` loop has a way to eventually satisfy its condition, or it will run indefinitely. Consider adding a maximum number of attempts or a timeout.

### Use with Command Exit Status

The `until` loop works well with command exit statuses (0 for success, non-zero for failure). For example, `until command; do something; done` will keep running until `command` succeeds.

### Combine with Sleep for Polling

When waiting for a condition to change, use `sleep` inside the loop to prevent excessive CPU usage. This is especially useful when checking for external events.

### Break Out of Loops When Needed

You can use the `break` command inside an `until` loop to exit early if a different condition is met before the main condition.

## Frequently Asked Questions

#### Q1. What's the difference between `until` and `while`?
A. `while` executes commands as long as a condition is true, whereas `until` executes commands as long as a condition is false (until it becomes true).

#### Q2. Can I use `until` in all shells?
A. `until` is available in most modern shells including bash, zsh, and ksh, but may not be available in more minimal shells like dash or ash.

#### Q3. How do I prevent an infinite loop with `until`?
A. Ensure your condition will eventually become true, or include a counter with a maximum value and use `break` to exit the loop when the counter is reached.

#### Q4. Can I nest `until` loops?
A. Yes, you can nest `until` loops inside other loops, including other `until` loops, `while` loops, or `for` loops.

## References

https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html

## Revisions

- 2025/05/05 First revision