# update-locale command

Configure system locale settings by updating /etc/default/locale.

## Overview

`update-locale` is a command used to modify the system-wide locale settings on Debian-based Linux systems. It updates the configuration file at `/etc/default/locale`, which defines language, character encoding, and regional settings for the entire system. This command is typically used by system administrators to change language settings or character encoding for all users.

## Options

### **--reset**

Reset all locale variables (remove them from the configuration file)

```console
$ sudo update-locale --reset
```

### **LANG=**

Set the default locale for all categories

```console
$ sudo update-locale LANG=en_US.UTF-8
```

### **LC_ALL=**

Set the locale for all categories, overriding all other settings

```console
$ sudo update-locale LC_ALL=en_US.UTF-8
```

### **--help**

Display help information

```console
$ update-locale --help
Usage: update-locale [OPTIONS] [VARIABLE=VALUE ...]
  or:  update-locale --reset
Options:
  --help         display this help and exit
  --reset        reset all locale variables
  --locale-file=FILE
                 use FILE as locale file instead of /etc/default/locale
```

## Usage Examples

### Setting multiple locale variables at once

```console
$ sudo update-locale LANG=en_GB.UTF-8 LC_TIME=en_GB.UTF-8 LC_PAPER=en_GB.UTF-8
```

### Removing a specific locale variable

To remove a specific locale variable, set it to an empty string:

```console
$ sudo update-locale LC_TIME=
```

### Checking current locale settings

While not part of update-locale, you can view current settings with:

```console
$ locale
LANG=en_US.UTF-8
LANGUAGE=
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=
```

## Tips:

### System-wide vs. User Settings

Remember that `update-locale` changes system-wide settings. Individual users can override these in their shell startup files (like `.bashrc`) with their own locale preferences.

### Changes Take Effect on Next Login

Changes made with `update-locale` typically don't affect current sessions. Users need to log out and log back in for the new locale settings to take effect.

### Common Locale Variables

- `LANG`: Default locale for all categories
- `LC_CTYPE`: Character classification and case conversion
- `LC_TIME`: Date and time formats
- `LC_NUMERIC`: Number formatting
- `LC_MONETARY`: Currency formatting
- `LC_MESSAGES`: Language for system messages

### Available Locales

To see what locales are available on your system:

```console
$ locale -a
```

## Frequently Asked Questions

#### Q1. How do I change the system language?
A. Use `sudo update-locale LANG=your_language_code.UTF-8` (e.g., `LANG=fr_FR.UTF-8` for French).

#### Q2. Why aren't my locale changes taking effect?
A. You need to log out and log back in for changes to take effect. For immediate effect in the current shell, use `export LANG=your_language_code.UTF-8`.

#### Q3. How do I generate additional locales?
A. First generate the locale with `sudo locale-gen your_language_code.UTF-8`, then set it with `update-locale`.

#### Q4. What's the difference between LANG and LC_ALL?
A. `LANG` is the default for all locale categories, while `LC_ALL` overrides all other locale settings. Use `LC_ALL` sparingly as it's meant for troubleshooting.

## References

https://manpages.debian.org/bullseye/locales/update-locale.8.en.html

## Revisions

- 2025/05/05 First revision