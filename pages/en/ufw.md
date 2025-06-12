# ufw command

Manage the Uncomplicated Firewall, a user-friendly interface for managing iptables firewall rules.

## Overview

UFW (Uncomplicated Firewall) provides a simplified interface for managing netfilter firewall rules on Linux systems. It's designed to be easy to use while still providing robust firewall capabilities. UFW allows users to allow or deny traffic based on ports, services, and IP addresses without needing to understand complex iptables syntax.

## Options

### **enable**

Enables the firewall and applies the configured rules

```console
$ sudo ufw enable
Firewall is active and enabled on system startup
```

### **disable**

Disables the firewall and stops applying rules

```console
$ sudo ufw disable
Firewall stopped and disabled on system startup
```

### **status**

Shows the current status of the firewall, including enabled/disabled state and active rules

```console
$ sudo ufw status
Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
22/tcp (v6)                ALLOW       Anywhere (v6)
80/tcp (v6)                ALLOW       Anywhere (v6)
443/tcp (v6)               ALLOW       Anywhere (v6)
```

### **status verbose**

Shows detailed status information including default policies

```console
$ sudo ufw status verbose
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW IN    Anywhere
80/tcp                     ALLOW IN    Anywhere
```

### **allow**

Allows traffic on specified ports or from specific addresses

```console
$ sudo ufw allow 22/tcp
Rule added
Rule added (v6)
```

### **deny**

Blocks traffic on specified ports or from specific addresses

```console
$ sudo ufw deny 23/tcp
Rule added
Rule added (v6)
```

### **reject**

Blocks traffic but sends a rejection response, unlike deny which drops silently

```console
$ sudo ufw reject 25/tcp
Rule added
Rule added (v6)
```

### **delete**

Removes a specified rule

```console
$ sudo ufw delete deny 23/tcp
Rule deleted
Rule deleted (v6)
```

### **reset**

Disables and resets the firewall to default settings, removing all rules

```console
$ sudo ufw reset
Resetting all rules to installed defaults. This may disrupt existing ssh connections. Proceed with operation (y|n)? y
Backing up 'user.rules' to '/etc/ufw/user.rules.20250508_123456'
Backing up 'user6.rules' to '/etc/ufw/user6.rules.20250508_123456'
```

## Usage Examples

### Allow traffic by service name

```console
$ sudo ufw allow ssh
Rule added
Rule added (v6)
```

### Allow traffic from specific IP address

```console
$ sudo ufw allow from 192.168.1.100
Rule added
```

### Allow traffic to specific port on specific interface

```console
$ sudo ufw allow in on eth0 to any port 80
Rule added
```

### Allow traffic from subnet to specific port

```console
$ sudo ufw allow from 192.168.1.0/24 to any port 3306
Rule added
```

### Deny outgoing traffic to specific domain

```console
$ sudo ufw deny out to example.com
Rule added
Rule added (v6)
```

## Tips:

### Use Application Profiles

UFW includes predefined application profiles in `/etc/ufw/applications.d/`. View available profiles with `sudo ufw app list` and allow by name with `sudo ufw allow "Apache Full"`.

### Enable Logging

Enable logging with `sudo ufw logging on` to track blocked connections. Use `sudo ufw logging low|medium|high|full` to control verbosity.

### Check Rule Numbers

Use `sudo ufw status numbered` to see rule numbers, which makes it easier to delete specific rules by number rather than recreating the entire rule syntax.

### Default Policies

Set default policies before enabling the firewall with `sudo ufw default deny incoming` and `sudo ufw default allow outgoing` to block all incoming connections but allow all outgoing connections by default.

## Frequently Asked Questions

#### Q1. How do I allow SSH connections through UFW?
A. Use `sudo ufw allow ssh` or `sudo ufw allow 22/tcp` to allow SSH connections.

#### Q2. How do I check if UFW is running?
A. Run `sudo ufw status` to see if the firewall is active and what rules are configured.

#### Q3. How do I delete a rule?
A. Use `sudo ufw delete [rule]` or first run `sudo ufw status numbered` and then delete by number with `sudo ufw delete [number]`.

#### Q4. Will enabling UFW disconnect my current SSH session?
A. If you haven't added a rule to allow SSH (port 22) before enabling UFW, it might disconnect your session. Always add SSH rules before enabling the firewall.

#### Q5. How do I allow traffic on multiple ports?
A. Use `sudo ufw allow 80,443/tcp` to allow traffic on multiple TCP ports in a single command.

## References

https://manpages.ubuntu.com/manpages/jammy/man8/ufw.8.html

## Revisions

- 2025/05/08 First revision