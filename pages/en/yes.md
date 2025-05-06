# yes command

Output a string repeatedly until killed.

## Overview

The `yes` command continuously outputs a string (by default "y") until it is terminated. It's commonly used to automatically respond to prompts in scripts or commands that require confirmation.

## Options

### **--help**

Display help information and exit.

```console
$ yes --help
Usage: yes [STRING]...
  or:  yes OPTION
Repeatedly output a line with all specified STRING(s), or 'y'.

      --help     display this help and exit
      --version  output version information and exit
```

### **--version**

Output version information and exit.

```console
$ yes --version
yes (GNU coreutils) 9.0
Copyright (C) 2021 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by David MacKenzie.
```

## Usage Examples

### Default Usage (Output "y" Repeatedly)

```console
$ yes
y
y
y
y
y
^C
```

### Custom String Output

```console
$ yes "I agree"
I agree
I agree
I agree
I agree
^C
```

### Piping to Another Command

```console
$ yes | rm -i *.txt
rm: remove regular file 'file1.txt'? rm: remove regular file 'file2.txt'? 
```

## Tips:

### Automatically Confirm Multiple Prompts

When you need to confirm multiple operations without manual intervention, pipe `yes` to the command:

```console
$ yes | apt-get install package1 package2 package3
```

### Limit Output with head

If you need a specific number of repetitions, use `head`:

```console
$ yes "Hello" | head -n 5
Hello
Hello
Hello
Hello
Hello
```

### Generate Test Files

Create test files of specific sizes by redirecting output:

```console
$ yes "data" | head -c 1M > testfile.txt
```

## Frequently Asked Questions

#### Q1. How do I stop the `yes` command?
A. Press Ctrl+C to terminate the command.

#### Q2. Can I output multiple strings with `yes`?
A. Yes, you can provide multiple arguments: `yes word1 word2` will output "word1 word2" repeatedly.

#### Q3. What's the purpose of the `yes` command?
A. It's primarily used to automatically answer "y" to confirmation prompts in scripts or commands.

#### Q4. Does `yes` consume a lot of system resources?
A. It can generate output very quickly and might consume CPU resources, so it's best used when piped to another command that controls the flow.

## References

https://www.gnu.org/software/coreutils/manual/html_node/yes-invocation.html

## Revisions

- 2025/05/05 First revision