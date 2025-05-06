# systemctl command

Control the systemd system and service manager.

## Overview

`systemctl` is a command-line utility used to control and manage the systemd system and service manager. It allows users to start, stop, restart, enable, disable, and check the status of system services. It's the primary tool for interacting with systemd, which is the init system and service manager for most modern Linux distributions.

## Options

### **status**

Show the runtime status of one or more units

```console
$ systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2025-05-05 10:15:30 UTC; 2h 30min ago
     Docs: man:nginx(8)
  Process: 1234 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
  Process: 1235 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
 Main PID: 1236 (nginx)
    Tasks: 2 (limit: 4915)
   Memory: 3.0M
   CGroup: /system.slice/nginx.service
           ├─1236 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─1237 nginx: worker process
```

### **start**

Start (activate) one or more units

```console
$ sudo systemctl start nginx
```

### **stop**

Stop (deactivate) one or more units

```console
$ sudo systemctl stop nginx
```

### **restart**

Restart one or more units

```console
$ sudo systemctl restart nginx
```

### **reload**

Reload one or more units

```console
$ sudo systemctl reload nginx
```

### **enable**

Enable one or more units to be started at boot

```console
$ sudo systemctl enable nginx
Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /lib/systemd/system/nginx.service.
```

### **disable**

Disable one or more units from starting at boot

```console
$ sudo systemctl disable nginx
Removed /etc/systemd/system/multi-user.target.wants/nginx.service.
```

### **is-active**

Check whether units are active

```console
$ systemctl is-active nginx
active
```

### **is-enabled**

Check whether units are enabled

```console
$ systemctl is-enabled nginx
enabled
```

### **list-units**

List loaded units

```console
$ systemctl list-units
UNIT                                      LOAD   ACTIVE SUB     DESCRIPTION
proc-sys-fs-binfmt_misc.automount         loaded active waiting Arbitrary Executable File Formats File System
sys-devices-pci0000:00-0000:00:02.0-drm-card0-card0\x2dDP\x2d1-intel_backlight.device loaded active plugged /sys/devices/pci0000:00/0000:00:02.0/drm/card0/card0-DP-1/intel_backlight
sys-devices-platform-serial8250-tty-ttyS0.device loaded active plugged /sys/devices/platform/serial8250/tty/ttyS0
...
```

### **--type=TYPE**

List units of a specific type

```console
$ systemctl --type=service
UNIT                               LOAD   ACTIVE SUB     DESCRIPTION
accounts-daemon.service            loaded active running Accounts Service
apparmor.service                   loaded active exited  AppArmor initialization
apport.service                     loaded active exited  LSB: automatic crash report generation
...
```

### **daemon-reload**

Reload systemd manager configuration

```console
$ sudo systemctl daemon-reload
```

## Usage Examples

### Checking the status of a specific service

```console
$ systemctl status ssh
● ssh.service - OpenBSD Secure Shell server
   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2025-05-05 09:45:23 UTC; 3h 10min ago
  Process: 1122 ExecStartPre=/usr/sbin/sshd -t (code=exited, status=0/SUCCESS)
 Main PID: 1123 (sshd)
    Tasks: 1 (limit: 4915)
   Memory: 5.6M
   CGroup: /system.slice/ssh.service
           └─1123 /usr/sbin/sshd -D
```

### Restarting a service and checking its status

```console
$ sudo systemctl restart nginx && systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2025-05-05 13:05:45 UTC; 2s ago
     Docs: man:nginx(8)
  Process: 5678 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
  Process: 5679 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
 Main PID: 5680 (nginx)
    Tasks: 2 (limit: 4915)
   Memory: 2.8M
   CGroup: /system.slice/nginx.service
           ├─5680 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─5681 nginx: worker process
```

### Listing all failed services

```console
$ systemctl list-units --state=failed
UNIT                  LOAD   ACTIVE SUB    DESCRIPTION
mysql.service         loaded failed failed MySQL Database Server
openvpn.service       loaded failed failed OpenVPN service
```

## Tips:

### Use Tab Completion

Systemctl supports tab completion for service names, making it easier to manage services without remembering exact names.

### Check Service Logs

When troubleshooting services, use `journalctl -u service-name` to view logs specific to that service.

### Mask Services

To completely prevent a service from being started (even manually), use `systemctl mask service-name`. This creates a symlink to /dev/null, making it impossible to start the service until it's unmasked with `systemctl unmask service-name`.

### View Service Dependencies

Use `systemctl list-dependencies service-name` to see what other services a particular service depends on.

### Manage System State

Beyond services, systemctl can manage system states like reboot (`systemctl reboot`), poweroff (`systemctl poweroff`), and suspend (`systemctl suspend`).

## Frequently Asked Questions

#### Q1. What's the difference between `systemctl stop` and `systemctl disable`?
A. `systemctl stop` immediately stops a running service but doesn't change its boot behavior. `systemctl disable` prevents a service from starting automatically at boot but doesn't affect currently running services.

#### Q2. How do I make changes to a service configuration take effect?
A. After modifying a service file, run `sudo systemctl daemon-reload` to reload the systemd manager configuration, then restart the service with `sudo systemctl restart service-name`.

#### Q3. How can I see all available services?
A. Use `systemctl list-unit-files --type=service` to see all available service unit files and their states.

#### Q4. How do I create a custom systemd service?
A. Create a .service file in /etc/systemd/system/, then run `systemctl daemon-reload` to register it, and `systemctl enable` to enable it at boot.

#### Q5. What does "masked" status mean for a service?
A. A masked service is completely prevented from starting, either manually or automatically. It's a stronger form of "disabled" and is done by creating a symlink from the service file to /dev/null.

## References

https://www.freedesktop.org/software/systemd/man/systemctl.html

## Revisions

- 2025/05/05 First revision