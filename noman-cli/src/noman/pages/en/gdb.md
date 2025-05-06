# gdb command

Debug programs interactively with the GNU Debugger.

## Overview

GDB (GNU Debugger) is a powerful debugging tool that allows developers to monitor and control the execution of programs. It helps find and fix bugs by letting you pause execution, examine memory, set breakpoints, step through code, and inspect variables during runtime. GDB works with many programming languages including C, C++, Objective-C, and Fortran.

## Options

### **-q, --quiet, --silent**

Start GDB without printing the introductory and copyright messages

```console
$ gdb -q ./program
(gdb)
```

### **-c FILE**

Use FILE as a core dump to examine

```console
$ gdb -c core ./program
```

### **-p PID**

Attach to a running process with the specified process ID

```console
$ gdb -p 1234
```

### **-x FILE**

Execute GDB commands from FILE

```console
$ gdb -x commands.gdb ./program
```

### **--args**

Pass arguments after program name to the program being debugged

```console
$ gdb --args ./program arg1 arg2
```

### **-d DIRECTORY**

Add DIRECTORY to the path to search for source files

```console
$ gdb -d /path/to/source ./program
```

## Usage Examples

### Basic debugging session

```console
$ gdb ./program
(gdb) break main
Breakpoint 1 at 0x1149: file main.c, line 5.
(gdb) run
Starting program: /path/to/program 

Breakpoint 1, main () at main.c:5
5       int x = 10;
(gdb) next
6       printf("x = %d\n", x);
(gdb) print x
$1 = 10
(gdb) continue
Continuing.
x = 10
[Inferior 1 (process 12345) exited normally]
(gdb) quit
```

### Debugging a program with arguments

```console
$ gdb --args ./program input.txt output.txt
(gdb) run
Starting program: /path/to/program input.txt output.txt
[Program execution...]
```

### Examining a core dump

```console
$ gdb ./program core
(gdb) bt
#0  0x00007f8b4c5e32a3 in __GI_raise (sig=sig@entry=6) at ../sysdeps/unix/sysv/linux/raise.c:50
#1  0x00007f8b4c5e4921 in __GI_abort () at abort.c:79
#2  0x0000555555555160 in main () at crash.c:5
```

## Tips:

### Common GDB Commands

- `break` (or `b`): Set a breakpoint at a line or function
- `run` (or `r`): Start the program
- `continue` (or `c`): Continue execution after stopping
- `next` (or `n`): Execute next line without stepping into functions
- `step` (or `s`): Execute next line, stepping into functions
- `print` (or `p`): Print value of a variable or expression
- `backtrace` (or `bt`): Show call stack
- `info breakpoints`: List all breakpoints
- `watch`: Set a watchpoint to stop when a variable changes

### Using TUI Mode

Enable Text User Interface mode with `Ctrl+X+A` for a split view showing source code and GDB commands simultaneously.

### Saving Breakpoints

Use `save breakpoints file.txt` to save your breakpoints to a file, and load them in future sessions with `source file.txt`.

## Frequently Asked Questions

#### Q1. How do I start debugging a program?
A. Run `gdb ./program`, then use `break main` to set a breakpoint at the main function, and `run` to start execution.

#### Q2. How can I examine what caused a segmentation fault?
A. After the crash, use `backtrace` (or `bt`) to see the call stack and identify where the crash occurred. Then use `frame N` to select a specific frame and examine variables.

#### Q3. How do I debug a running process?
A. Use `gdb -p PID` to attach to a running process with the specified process ID.

#### Q4. How do I set conditional breakpoints?
A. Use `break location if condition`, for example: `break main.c:25 if x > 10`.

#### Q5. How do I print all elements of an array?
A. Use `print *array@length` where `length` is the number of elements to display.

## References

https://sourceware.org/gdb/current/onlinedocs/gdb/

## Revisions

- 2025/05/05 First revision