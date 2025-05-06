# sleep command

Suspends execution for a specified amount of time.

## Overview

The `sleep` command pauses execution for a specified time interval. It's commonly used in shell scripts to introduce delays between commands, wait for resources to become available, or implement simple timing mechanisms. The command accepts a numeric value followed by an optional suffix indicating the time unit.

## Options

### **--help**

Display help information and exit.

```console
$ sleep --help
Usage: sleep NUMBER[SUFFIX]...
  or:  sleep OPTION
Pause for NUMBER seconds.  SUFFIX may be 's' for seconds (the default),
'm' for minutes, 'h' for hours or 'd' for days.  NUMBER need not be an
integer.  Given two or more arguments, pause for the amount of time
specified by the sum of their values.

      --help     display this help and exit
      --version  output version information and exit
```

### **--version**

Output version information and exit.

```console
$ sleep --version
sleep (GNU coreutils) 8.32
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by Jim Meyering and Paul Eggert.
```

## Usage Examples

### Basic sleep for seconds

```console
$ sleep 5
# Command pauses for 5 seconds, then returns to prompt
```

### Sleep with time units

```console
$ sleep 1m
# Command pauses for 1 minute
```

### Using sleep in a script

```console
$ echo "Starting task..."
Starting task...
$ sleep 2
$ echo "Task completed after 2 seconds"
Task completed after 2 seconds
```

### Multiple time values

```console
$ sleep 1m 30s
# Command pauses for 1 minute and 30 seconds
```

## Tips:

### Available Time Units

- `s`: seconds (default if no unit is specified)
- `m`: minutes
- `h`: hours
- `d`: days

### Decimal Values

Sleep accepts decimal values for more precise timing:

```console
$ sleep 0.5
# Pauses for half a second
```

### Combining with Other Commands

Use sleep with the `&` operator to run it in the background while continuing with other tasks:

```console
$ sleep 10 & echo "This prints immediately"
[1] 12345
This prints immediately
```

### Interrupting Sleep

Press Ctrl+C to interrupt a sleep command that's running in the foreground.

## Frequently Asked Questions

#### Q1. Can I use sleep for milliseconds?
A. The standard sleep command doesn't directly support milliseconds, but you can use decimal values like `sleep 0.001` for 1 millisecond on systems that support it.

#### Q2. How do I combine different time units?
A. You can provide multiple arguments to sleep: `sleep 1h 30m 45s` will sleep for 1 hour, 30 minutes, and 45 seconds.

#### Q3. Why does my script continue before sleep finishes?
A. If you used `sleep 10 &`, the ampersand runs sleep in the background. Remove the `&` to make your script wait for sleep to complete.

#### Q4. Is sleep CPU-intensive?
A. No, sleep is very efficient. It uses system timers and doesn't consume CPU resources while waiting.

## References

https://www.gnu.org/software/coreutils/manual/html_node/sleep-invocation.html

## Revisions

- 2025/05/05 First revision