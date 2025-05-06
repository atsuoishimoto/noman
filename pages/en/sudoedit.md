# sudoedit command

Edit files securely as another user, typically root.

## Overview

`sudoedit` (also accessible as `sudo -e`) allows users to edit files with elevated privileges while using their own editor preferences. Unlike directly using `sudo` with an editor, `sudoedit` creates a temporary copy of the file, lets you edit it with your preferred editor, then copies it back to the original location with proper permissions.

## Options

### **-u, --user=user**

Specify which user to edit the file as (defaults to root)

```console
$ sudoedit -u www-data /var/www/html/index.html
```

### **-H, --set-home**

Set HOME environment variable to target user's home directory

```console
$ sudoedit -H /etc/ssh/sshd_config
```

### **-C, --close-from=num**

Close all file descriptors greater than or equal to num

```console
$ sudoedit -C 3 /etc/hosts
```

### **-h, --help**

Display help message and exit

```console
$ sudoedit -h
```

## Usage Examples

### Editing a system configuration file

```console
$ sudoedit /etc/ssh/sshd_config
[Your default editor opens with the file]
```

### Editing multiple files at once

```console
$ sudoedit /etc/hosts /etc/resolv.conf
[Your default editor opens with each file in sequence]
```

### Editing as a specific user

```console
$ sudoedit -u postgres /etc/postgresql/13/main/postgresql.conf
[Your default editor opens with the file, changes will be owned by postgres]
```

## Tips:

### Setting Your Preferred Editor

`sudoedit` uses the EDITOR or VISUAL environment variable to determine which editor to use. Set these in your shell profile:

```console
$ echo 'export EDITOR=vim' >> ~/.bashrc
$ source ~/.bashrc
```

### Security Benefits

Always use `sudoedit` instead of `sudo vim` when editing system files. This prevents potential security issues with editor plugins or configurations that might execute code with elevated privileges.

### Temporary File Location

`sudoedit` creates temporary files in /tmp by default. If you need to edit very large files, ensure your /tmp partition has sufficient space.

## Frequently Asked Questions

#### Q1. What's the difference between `sudoedit` and `sudo vim`?
A. `sudoedit` creates a temporary copy of the file that you edit with your normal user privileges, then copies it back with elevated privileges. `sudo vim` runs the entire editor with root privileges, which can be a security risk if your editor has plugins or configurations that might execute code.

#### Q2. How do I specify which editor to use?
A. Set the EDITOR or VISUAL environment variable in your shell profile (e.g., `export EDITOR=nano` in ~/.bashrc).

#### Q3. Can I use `sudoedit` to edit multiple files at once?
A. Yes, simply list all files you want to edit: `sudoedit file1 file2 file3`.

#### Q4. What happens if I don't have permission to view the original file?
A. `sudoedit` will still work as long as you have sudo privileges to edit the file, even if your normal user can't read it.

## References

https://www.sudo.ws/docs/man/sudoedit.man/

## Revisions

- 2025/05/05 First revision