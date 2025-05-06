# update-alternatives command

Manages symbolic links determining default commands in the alternatives system.

## Overview

`update-alternatives` creates, removes, maintains, and displays information about symbolic links that determine which commands are run when a user enters a particular command name. It's part of the Debian alternatives system that allows multiple versions of the same program to coexist on a system, with one version designated as the default.

## Options

### **--install**

Creates a new alternative link group

```console
$ sudo update-alternatives --install /usr/bin/editor editor /usr/bin/vim 50
update-alternatives: using /usr/bin/vim to provide /usr/bin/editor (editor) in auto mode
```

### **--config**

Configures which alternative to use for a link group

```console
$ sudo update-alternatives --config editor
There are 3 choices for the alternative editor (providing /usr/bin/editor).

  Selection    Path                Priority   Status
------------------------------------------------------------
* 0            /usr/bin/vim         50        auto mode
  1            /usr/bin/emacs       40        manual mode
  2            /usr/bin/nano        30        manual mode
  3            /usr/bin/vim         50        manual mode

Press <enter> to keep the current choice[*], or type selection number:
```

### **--display**

Displays information about a link group

```console
$ update-alternatives --display editor
editor - auto mode
  link best version is /usr/bin/vim
  link currently points to /usr/bin/vim
  link editor is /usr/bin/editor
  slave editor.1.gz is /usr/share/man/man1/editor.1.gz
  slave editor.fr.1.gz is /usr/share/man/fr/man1/editor.1.gz
  /usr/bin/emacs - priority 40
  /usr/bin/nano - priority 30
  /usr/bin/vim - priority 50
```

### **--remove**

Removes an alternative from a link group

```console
$ sudo update-alternatives --remove editor /usr/bin/emacs
update-alternatives: removing editor (/usr/bin/emacs) from auto mode
```

### **--set**

Sets a specific alternative as the selected one for a link group

```console
$ sudo update-alternatives --set editor /usr/bin/nano
update-alternatives: using /usr/bin/nano to provide /usr/bin/editor (editor) in manual mode
```

### **--auto**

Sets a link group to automatic mode (highest priority alternative is used)

```console
$ sudo update-alternatives --auto editor
update-alternatives: using /usr/bin/vim to provide /usr/bin/editor (editor) in auto mode
```

## Usage Examples

### Setting up Java alternatives

```console
$ sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-11-openjdk/bin/java 1100
update-alternatives: using /usr/lib/jvm/java-11-openjdk/bin/java to provide /usr/bin/java (java) in auto mode

$ sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-8-openjdk/bin/java 1000
update-alternatives: using /usr/lib/jvm/java-11-openjdk/bin/java to provide /usr/bin/java (java) in auto mode

$ sudo update-alternatives --config java
There are 2 choices for the alternative java (providing /usr/bin/java).

  Selection    Path                                      Priority   Status
------------------------------------------------------------
* 0            /usr/lib/jvm/java-11-openjdk/bin/java     1100      auto mode
  1            /usr/lib/jvm/java-8-openjdk/bin/java      1000      manual mode
  2            /usr/lib/jvm/java-11-openjdk/bin/java     1100      manual mode

Press <enter> to keep the current choice[*], or type selection number:
```

### Checking which alternatives are available for a command

```console
$ update-alternatives --list editor
/usr/bin/emacs
/usr/bin/nano
/usr/bin/vim
```

## Tips

### Understanding Priority Values

Higher priority values (like 100 vs 50) make an alternative more likely to be chosen in automatic mode. When setting up alternatives, assign higher numbers to preferred versions.

### Managing Groups of Related Commands

For programs with multiple commands (like Java's java, javac, jar), create alternatives for each command to ensure consistent versioning across all tools.

### Automatic vs Manual Mode

In automatic mode, the system selects the alternative with the highest priority. In manual mode, the system keeps your selected choice even if a higher priority alternative is installed later.

### Slave Links

Use slave links (with `--slave` option) to manage related files like man pages that should change together with the main alternative.

## Frequently Asked Questions

#### Q1. What's the difference between automatic and manual mode?
A. In automatic mode, the system selects the alternative with the highest priority. In manual mode, your selected choice remains until you explicitly change it.

#### Q2. How do I see all available alternatives for a command?
A. Use `update-alternatives --list command_name` to see all alternatives, or `update-alternatives --display command_name` for more detailed information.

#### Q3. How do I completely remove an alternative?
A. Use `update-alternatives --remove link_name path` to remove a specific alternative from a group.

#### Q4. What priority number should I use when installing alternatives?
A. Priority can be any integer. Higher numbers (like 100) have higher priority than lower numbers (like 10). Choose values that reflect your preference order.

## References

https://manpages.debian.org/bullseye/dpkg/update-alternatives.1.en.html

## Revisions

- 2025/05/05 First revision