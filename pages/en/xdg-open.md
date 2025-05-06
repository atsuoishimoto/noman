# xdg-open command

Opens a file or URL in the user's preferred application.

## Overview

`xdg-open` is a desktop-independent tool that opens files or URLs using the default application registered for that file type or URL scheme. It's part of the XDG (X Desktop Group) utilities and works across various Linux desktop environments to provide a consistent way to open files with their associated applications.

## Options

### **file**

The file or URL to open with the default application

```console
$ xdg-open document.pdf
```

### **--help**

Display help information

```console
$ xdg-open --help
```

### **--manual**

Display the manual page

```console
$ xdg-open --manual
```

### **--version**

Display version information

```console
$ xdg-open --version
```

## Usage Examples

### Opening a file with its default application

```console
$ xdg-open document.pdf
[Opens the PDF file with the default PDF viewer]
```

### Opening a URL in the default web browser

```console
$ xdg-open https://www.example.com
[Opens the URL in the default web browser]
```

### Opening a directory in the file manager

```console
$ xdg-open ~/Documents
[Opens the Documents directory in the default file manager]
```

### Opening an email client with a new message

```console
$ xdg-open mailto:user@example.com
[Opens the default email client with a new message to user@example.com]
```

## Tips:

### Use in Scripts for Cross-Desktop Compatibility

`xdg-open` is ideal for shell scripts that need to open files or URLs in a desktop-environment-agnostic way. It works across GNOME, KDE, Xfce, and other Linux desktop environments.

### Silent Operation

`xdg-open` runs silently by default. To suppress any potential error messages, redirect stderr: `xdg-open file.pdf 2>/dev/null`.

### Check Exit Status

The command returns 0 on success, 1 if an error occurred, 2 if the specified command is invalid, 3 if a required tool is missing, and 4 if the action failed.

### Alternative Commands

On macOS, use `open` instead. On Windows, use `start`. These commands serve similar purposes on their respective operating systems.

## Frequently Asked Questions

#### Q1. What is the difference between `xdg-open` and directly using an application?
A. `xdg-open` automatically selects the appropriate application based on the file type or URL, while directly using an application requires you to know which application to use.

#### Q2. How does `xdg-open` determine which application to use?
A. It uses the MIME type of the file and the desktop environment's application associations to determine the default application.

#### Q3. Can I change which application `xdg-open` uses for a specific file type?
A. Yes, you can change the default application for a file type using your desktop environment's settings (e.g., "Default Applications" in GNOME) or using `xdg-mime`.

#### Q4. Does `xdg-open` work on all Linux distributions?
A. It works on most modern Linux distributions that follow the XDG specifications, particularly those with GNOME, KDE, or Xfce desktop environments.

## References

https://www.freedesktop.org/wiki/Software/xdg-utils/

## Revisions

- 2025/05/05 First revision