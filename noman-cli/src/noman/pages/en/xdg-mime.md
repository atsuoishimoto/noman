# xdg-mime command

Query or set file type associations in desktop environments.

## Overview

`xdg-mime` is a command-line tool for managing file type associations in Linux desktop environments. It allows users to query which application is associated with a specific file type (MIME type), set default applications for file types, and add new MIME type information to the system.

## Options

### **query default**

Query the default application for a MIME type

```console
$ xdg-mime query default text/plain
gedit.desktop
```

### **query filetype**

Determine the MIME type of a file

```console
$ xdg-mime query filetype document.pdf
application/pdf
```

### **default**

Set the default application for a MIME type

```console
$ xdg-mime default firefox.desktop text/html
```

### **install**

Install new MIME information from an XML file

```console
$ xdg-mime install --mode user myapplication-mime.xml
```

### **uninstall**

Remove MIME information

```console
$ xdg-mime uninstall --mode user myapplication-mime.xml
```

## Usage Examples

### Setting Firefox as default browser

```console
$ xdg-mime default firefox.desktop x-scheme-handler/http
$ xdg-mime default firefox.desktop x-scheme-handler/https
```

### Finding which application opens PDF files

```console
$ xdg-mime query default application/pdf
okular.desktop
```

### Checking a file's MIME type

```console
$ xdg-mime query filetype ~/Downloads/presentation.pptx
application/vnd.openxmlformats-officedocument.presentationml.presentation
```

## Tips:

### Finding Desktop Files

Desktop files are typically located in `/usr/share/applications/` or `~/.local/share/applications/`. You need to reference these files when setting default applications.

### Creating Custom MIME Types

You can create custom MIME types by writing XML files and installing them with `xdg-mime install`. This is useful for applications that handle specialized file formats.

### System vs. User Configuration

Use `--mode user` to make changes only for the current user, or `--mode system` for system-wide changes (requires root privileges).

## Frequently Asked Questions

#### Q1. How do I find the MIME type of a file?
A. Use `xdg-mime query filetype filename` to determine the MIME type.

#### Q2. How do I set the default application for a file type?
A. Use `xdg-mime default application.desktop mimetype` where application.desktop is the desktop file and mimetype is the MIME type.

#### Q3. Where are MIME type associations stored?
A. User-specific associations are stored in `~/.config/mimeapps.list` and system-wide associations in `/usr/share/applications/mimeapps.list`.

#### Q4. How can I reset file associations to system defaults?
A. Remove the relevant entries from your `~/.config/mimeapps.list` file.

## References

https://portland.freedesktop.org/doc/xdg-mime.html

## Revisions

- 2025/05/05 First revision