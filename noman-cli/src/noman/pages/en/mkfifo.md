# mkfifo command

Create named pipes (FIFOs) with specified names.

## Overview

`mkfifo` creates special FIFO (First-In-First-Out) files, also known as named pipes, which allow communication between processes. Unlike regular pipes created with the `|` operator, named pipes persist in the filesystem until deleted, allowing unrelated processes to communicate through them.

## Options

### **-m, --mode=MODE**

Set the permission mode (as in chmod) for the created FIFO, instead of using the default mode of 0666 (readable and writable by all, modified by umask).

```console
$ mkfifo -m 0600 private_pipe
$ ls -l private_pipe
prw-------  1 user  group  0 May  5 10:00 private_pipe
```

### **-Z, --context=CTX**

Set the SELinux security context of each created FIFO to CTX.

```console
$ mkfifo -Z user_u:object_r:user_fifo_t private_pipe
```

### **--help**

Display help information and exit.

```console
$ mkfifo --help
Usage: mkfifo [OPTION]... NAME...
Create named pipes (FIFOs) with the given NAMEs.
...
```

### **--version**

Output version information and exit.

```console
$ mkfifo --version
mkfifo (GNU coreutils) 8.32
...
```

## Usage Examples

### Creating a basic named pipe

```console
$ mkfifo mypipe
$ ls -l mypipe
prw-r--r--  1 user  group  0 May  5 10:00 mypipe
```

### Using a named pipe for inter-process communication

Terminal 1:
```console
$ mkfifo mypipe
$ cat > mypipe
Hello, world!
```

Terminal 2:
```console
$ cat < mypipe
Hello, world!
```

### Creating multiple pipes at once

```console
$ mkfifo pipe1 pipe2 pipe3
$ ls -l pipe*
prw-r--r--  1 user  group  0 May  5 10:00 pipe1
prw-r--r--  1 user  group  0 May  5 10:00 pipe2
prw-r--r--  1 user  group  0 May  5 10:00 pipe3
```

## Tips:

### Understanding Named Pipes

Named pipes block when opened for reading until someone opens them for writing (and vice versa). This behavior is essential to understand when working with FIFOs.

### Cleaning Up

Named pipes persist in the filesystem until explicitly deleted with `rm`. Always clean up pipes when they're no longer needed to avoid confusion.

### Avoiding Deadlocks

Be careful when reading from and writing to the same pipe in a single process, as this can lead to deadlocks. Generally, use separate processes for reading and writing.

### Using with Redirection

Named pipes work well with standard input/output redirection, making them useful for connecting commands that wouldn't normally be connected in a pipeline.

## Frequently Asked Questions

#### Q1. What's the difference between a named pipe and a regular pipe?
A. Regular pipes (created with `|`) exist only while the connected processes are running and cannot be accessed by unrelated processes. Named pipes exist as filesystem objects and can be used by any process that has appropriate permissions.

#### Q2. Can I use named pipes for bidirectional communication?
A. No, named pipes are unidirectional. For bidirectional communication, you need to create two separate pipes.

#### Q3. What happens if I try to read from a pipe with no writer?
A. The read operation will block until a writer opens the pipe. If all writers close the pipe, readers will receive EOF (end-of-file).

#### Q4. How do I remove a named pipe?
A. Use the `rm` command, just as you would for a regular file: `rm mypipe`.

## References

https://www.gnu.org/software/coreutils/manual/html_node/mkfifo-invocation.html

## Revisions

- 2025/05/05 First revision