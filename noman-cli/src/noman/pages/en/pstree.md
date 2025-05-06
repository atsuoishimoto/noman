# pstree command

Display running processes as a tree.

## Overview

The `pstree` command shows the running processes on a system in a tree-like diagram, illustrating the parent-child relationships between processes. This visualization makes it easy to understand process hierarchies and see which processes spawned others.

## Options

### **-a**

Show command line arguments.

```console
$ pstree -a
systemd
  ├─NetworkManager --no-daemon
  ├─accounts-daemon
  ├─avahi-daemon
  │   └─avahi-daemon
  └─sshd
      └─sshd
          └─sshd
              └─bash
```

### **-p**

Show PIDs (process IDs).

```console
$ pstree -p
systemd(1)
  ├─NetworkManager(623)
  ├─accounts-daemon(645)
  ├─avahi-daemon(647)
  │   └─avahi-daemon(648)
  └─sshd(1025)
      └─sshd(2156)
          └─sshd(2158)
              └─bash(2159)
```

### **-n**

Sort processes by PID instead of by name.

```console
$ pstree -n
systemd
  ├─systemd-journald
  ├─systemd-udevd
  ├─systemd-resolved
  ├─NetworkManager
  ├─accounts-daemon
  └─sshd
```

### **-u**

Show uid transitions (user IDs).

```console
$ pstree -u
systemd
  ├─NetworkManager
  ├─accounts-daemon(root)
  ├─avahi-daemon(avahi)
  │   └─avahi-daemon(avahi)
  └─sshd
      └─sshd(john)
          └─bash(john)
```

### **-h**

Highlight the current process and its ancestors.

```console
$ pstree -h
systemd
  ├─NetworkManager
  ├─accounts-daemon
  └─sshd
      └─sshd
          └─sshd
              └─bash───pstree
```

### **-g**

Show PGID (process group IDs).

```console
$ pstree -g
systemd(1)
  ├─NetworkManager(623,623)
  ├─accounts-daemon(645,645)
  └─sshd(1025,1025)
      └─sshd(2156,2156)
          └─bash(2159,2159)
```

## Usage Examples

### Displaying a specific user's processes

```console
$ pstree username
sshd───bash───vim
```

### Combining options for detailed output

```console
$ pstree -apu
systemd(1)
  ├─NetworkManager(623) --no-daemon
  ├─accounts-daemon(645)
  ├─avahi-daemon(647)(avahi)
  │   └─avahi-daemon(648)(avahi)
  └─sshd(1025)
      └─sshd(2156)(john)
          └─bash(2159)(john)
```

### Finding a specific process and its children

```console
$ pstree -p | grep firefox
        │           ├─firefox(2345)───{firefox}(2346)
        │           │                 ├─{firefox}(2347)
        │           │                 ├─{firefox}(2348)
        │           │                 └─{firefox}(2349)
```

## Tips

### Compact Display
By default, identical branches of the tree are compacted to save space. Use `-c` to disable this behavior and see all processes individually.

### ASCII Characters
If the tree structure displays incorrectly in your terminal, use the `-A` option to use ASCII characters instead of the default UTF-8 characters.

### Tracing Process Ancestry
When debugging, use `pstree -p` to quickly identify the parent-child relationships of processes, which can help understand how applications are structured.

### Combine with grep
Pipe the output to grep to find specific processes: `pstree -p | grep firefox`

## Frequently Asked Questions

#### Q1. How is pstree different from ps?
A. While `ps` shows a flat list of processes, `pstree` displays processes in a hierarchical tree structure that shows parent-child relationships.

#### Q2. Can I see process IDs with pstree?
A. Yes, use the `-p` option to display process IDs alongside the process names.

#### Q3. How do I see command line arguments?
A. Use the `-a` option to display the command line arguments for each process.

#### Q4. Can I see only processes for a specific user?
A. Yes, specify the username as an argument: `pstree username`

#### Q5. How do I make the output more readable in text-only terminals?
A. Use the `-A` option to use ASCII characters instead of UTF-8 for the tree structure.

## References

https://man7.org/linux/man-pages/man1/pstree.1.html

## Revisions

- 2025/05/05 First revision