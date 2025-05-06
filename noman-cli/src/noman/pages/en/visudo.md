# visudo command

Edit the sudoers file safely with syntax checking.

## Overview

`visudo` is a command-line utility that provides a safe way to edit the sudoers configuration file, which controls sudo access permissions. It locks the sudoers file during editing, performs syntax checking before saving changes, and prevents multiple simultaneous edits that could corrupt the file.

## Options

### **-c**

Check the sudoers file for syntax errors without making any changes.

```console
$ sudo visudo -c
/etc/sudoers: parsed OK
/etc/sudoers.d/custom: parsed OK
```

### **-f file**

Specify an alternate sudoers file location to edit instead of the default.

```console
$ sudo visudo -f /etc/sudoers.d/custom
```

### **-s**

Enable strict checking of the sudoers file. With this option, visudo will reject sudoers files that contain unknown defaults or aliases.

```console
$ sudo visudo -s
```

### **-q**

Enable quiet mode, suppressing the default informational messages.

```console
$ sudo visudo -q
```

### **-V**

Display version information and exit.

```console
$ sudo visudo -V
visudo version 1.9.5p2
```

## Usage Examples

### Basic Usage

```console
$ sudo visudo
```

### Checking Syntax of a Custom Sudoers File

```console
$ sudo visudo -cf /etc/sudoers.d/myconfig
/etc/sudoers.d/myconfig: parsed OK
```

### Using a Different Editor

```console
$ sudo EDITOR=nano visudo
```

## Tips:

### Understanding Sudoers Syntax

The sudoers file has a specific syntax. Common entries include:
- `user ALL=(ALL) ALL` - Allows a user to run any command as any user
- `%group ALL=(ALL) ALL` - Allows a group to run any command as any user
- `user ALL=(ALL) NOPASSWD: ALL` - Allows a user to run commands without password

### Create Custom Configuration Files

Instead of editing the main sudoers file, create separate files in `/etc/sudoers.d/` directory. This makes configuration more modular and easier to manage.

```console
$ sudo visudo -f /etc/sudoers.d/custom_rules
```

### Always Use visudo

Never edit the sudoers file directly with a text editor. Always use visudo to prevent syntax errors that could lock you out of sudo privileges.

## Frequently Asked Questions

#### Q1. What happens if I make a syntax error in the sudoers file?
A. visudo performs syntax checking before saving changes. If errors are found, it will warn you and give you options to re-edit the file, write it anyway, or abandon changes.

#### Q2. How do I change the default editor used by visudo?
A. Set the EDITOR or VISUAL environment variable before running visudo: `EDITOR=nano sudo visudo`

#### Q3. Can I check a sudoers file without actually editing it?
A. Yes, use `sudo visudo -c` to check the syntax of the current sudoers file, or `sudo visudo -cf /path/to/file` to check a specific file.

#### Q4. What's the difference between editing /etc/sudoers directly and using visudo?
A. visudo locks the sudoers file during editing, performs syntax validation, and prevents multiple simultaneous edits that could corrupt the file.

## References

https://www.sudo.ws/docs/man/1.8.27/visudo.man/

## Revisions

- 2025/05/05 First revision