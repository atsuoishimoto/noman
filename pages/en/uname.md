# uname command

Print system information about the operating system.

## Overview

The `uname` command displays system information about the operating system running on your computer. It can show the kernel name, network node hostname, kernel release, kernel version, machine hardware name, processor type, hardware platform, and operating system.

## Options

### **-a, --all**

Print all information, in the following order: kernel name, network node hostname, kernel release, kernel version, machine hardware name, processor type, hardware platform, operating system.

```console
$ uname -a
Linux hostname 5.15.0-76-generic #83-Ubuntu SMP Thu Jun 15 19:16:32 UTC 2023 x86_64 x86_64 GNU/Linux
```

### **-s, --kernel-name**

Print the kernel name. This is the default if no option is specified.

```console
$ uname -s
Linux
```

### **-n, --nodename**

Print the network node hostname.

```console
$ uname -n
hostname
```

### **-r, --kernel-release**

Print the kernel release.

```console
$ uname -r
5.15.0-76-generic
```

### **-v, --kernel-version**

Print the kernel version.

```console
$ uname -v
#83-Ubuntu SMP Thu Jun 15 19:16:32 UTC 2023
```

### **-m, --machine**

Print the machine hardware name.

```console
$ uname -m
x86_64
```

### **-p, --processor**

Print the processor type (or "unknown" if not known).

```console
$ uname -p
x86_64
```

### **-i, --hardware-platform**

Print the hardware platform (or "unknown" if not known).

```console
$ uname -i
x86_64
```

### **-o, --operating-system**

Print the operating system.

```console
$ uname -o
GNU/Linux
```

## Usage Examples

### Getting kernel information

```console
$ uname -sr
Linux 5.15.0-76-generic
```

### Checking architecture for compatibility

```console
$ uname -m
x86_64
```

### Displaying complete system information

```console
$ uname -a
Linux hostname 5.15.0-76-generic #83-Ubuntu SMP Thu Jun 15 19:16:32 UTC 2023 x86_64 x86_64 GNU/Linux
```

## Tips:

### Identify System Architecture

Use `uname -m` to quickly identify if your system is 32-bit (i686) or 64-bit (x86_64), which is essential when downloading software or compiling from source.

### Check Kernel Version

Use `uname -r` to check your kernel version before installing kernel-dependent software or drivers.

### Combine Options

You can combine multiple options like `uname -sr` to get specific information without displaying everything.

## Frequently Asked Questions

#### Q1. How do I check if my system is 32-bit or 64-bit?
A. Use `uname -m`. If it returns "x86_64", you have a 64-bit system. If it returns "i686" or "i386", you have a 32-bit system.

#### Q2. How can I find my Linux kernel version?
A. Use `uname -r` to display the kernel release version.

#### Q3. What's the difference between `uname -v` and `uname -r`?
A. `uname -r` shows the kernel release (like "5.15.0-76-generic"), while `uname -v` shows the kernel version, which typically includes build information (like "#83-Ubuntu SMP Thu Jun 15 19:16:32 UTC 2023").

#### Q4. How do I check what Linux distribution I'm using?
A. `uname` only shows kernel information. To check your distribution, use `cat /etc/os-release` or `lsb_release -a` instead.

## macOS Considerations

On macOS, `uname` works similarly but with some differences:
- The `-o` option is not available on macOS
- The output of `uname -a` will show "Darwin" as the kernel name instead of "Linux"
- To get macOS version information, use `sw_vers` instead

## References

https://www.gnu.org/software/coreutils/manual/html_node/uname-invocation.html

## Revisions

- 2025/05/05 First revision