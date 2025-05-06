# hostname command

Display or set the system's hostname.

## Overview

The `hostname` command displays or sets the current host, domain, or node name of the system. Without arguments, it prints the current hostname. With appropriate privileges, it can be used to set a new hostname.

## Options

### **-s, --short**

Display the short hostname (the portion before the first dot) without the domain information.

```console
$ hostname -s
mycomputer
```

### **-f, --fqdn, --long**

Display the Fully Qualified Domain Name (FQDN).

```console
$ hostname -f
mycomputer.example.com
```

### **-d, --domain**

Display the domain name the system belongs to.

```console
$ hostname -d
example.com
```

### **-i, --ip-address**

Display the IP address(es) of the host.

```console
$ hostname -i
192.168.1.100
```

## Usage Examples

### Displaying the current hostname

```console
$ hostname
mycomputer.example.com
```

### Setting a new hostname (requires root privileges)

```console
$ sudo hostname newname
$ hostname
newname
```

### Displaying all network addresses of the host

```console
$ hostname --all-ip-addresses
192.168.1.100 10.0.0.1 127.0.0.1
```

## Tips:

### Permanent Hostname Changes

The `hostname` command only changes the hostname temporarily until the next reboot. To make permanent changes:
- On Linux: Edit `/etc/hostname` or use `hostnamectl set-hostname newname`
- On macOS: Use System Preferences > Sharing > Computer Name or `scutil --set HostName newname`

### Hostname vs. FQDN

The hostname is just the computer name (e.g., "mycomputer"), while the FQDN includes the domain (e.g., "mycomputer.example.com"). Use `-f` when you need the complete network identity.

### Hostname Resolution

The hostname command doesn't update DNS or `/etc/hosts`. After changing a hostname, you may need to update these separately for proper network resolution.

## Frequently Asked Questions

#### Q1. What's the difference between hostname and hostnamectl?
A. `hostname` is a simple utility to display or temporarily set the system hostname, while `hostnamectl` (on systemd-based Linux systems) can permanently set various hostname parameters and is the preferred method on modern Linux distributions.

#### Q2. Why does hostname -i sometimes return 127.0.1.1 instead of my actual IP?
A. This happens when the hostname is mapped to 127.0.1.1 in `/etc/hosts`, which is common in some distributions. Use `hostname --all-ip-addresses` or `ip addr` for more accurate network information.

#### Q3. How can I make hostname changes permanent?
A. Edit `/etc/hostname` on Linux or use `hostnamectl set-hostname newname`. On macOS, use `scutil --set HostName newname`.

## macOS Considerations

On macOS, there are three different hostname settings that can be configured:

- HostName: The network hostname (FQDN)
- LocalHostName: The Bonjour hostname (used for local network discovery)
- ComputerName: The user-friendly name shown in the UI

To set these values, use:

```console
$ sudo scutil --set HostName "hostname.domain.com"
$ sudo scutil --set LocalHostName "hostname"
$ sudo scutil --set ComputerName "My Computer"
```

## References

https://man7.org/linux/man-pages/man1/hostname.1.html

## Revisions

- 2025/05/05 First revision