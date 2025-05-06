# groupadd command

Create a new group on the system.

## Overview

The `groupadd` command creates a new group account on the system by adding an entry to the group database. It's primarily used by system administrators to manage user groups for access control and permission management.

## Options

### **-f, --force**

Exit successfully if the group already exists, and cancel -g if the GID is already used.

```console
$ sudo groupadd -f developers
```

### **-g, --gid GID**

Specify the numerical value of the group's ID (GID). This value must be unique unless the -o option is used.

```console
$ sudo groupadd -g 1500 developers
```

### **-K, --key KEY=VALUE**

Override /etc/login.defs defaults (GID_MIN, GID_MAX, etc).

```console
$ sudo groupadd -K GID_MIN=5000 newgroup
```

### **-o, --non-unique**

Allow creating a group with a non-unique GID.

```console
$ sudo groupadd -o -g 1500 another_group
```

### **-p, --password PASSWORD**

Set the encrypted password for the new group.

```console
$ sudo groupadd -p encrypted_password finance
```

### **-r, --system**

Create a system group with a GID in the system GID range.

```console
$ sudo groupadd -r sysgroup
```

## Usage Examples

### Creating a basic group

```console
$ sudo groupadd developers
```

### Creating a system group

```console
$ sudo groupadd -r docker
```

### Creating a group with a specific GID

```console
$ sudo groupadd -g 2000 finance
```

### Creating a group that may already exist

```console
$ sudo groupadd -f marketing
```

## Tips:

### Check Group Creation

After creating a group, verify it was added correctly using the `getent group` command:

```console
$ getent group developers
developers:x:1500:
```

### Group ID Ranges

System groups typically use lower GIDs (usually below 1000), while regular user groups use higher GIDs. Check your system's `/etc/login.defs` file for the specific ranges.

### Group Management

Remember that `groupadd` only creates groups. Use `groupmod` to modify existing groups and `groupdel` to remove them.

### Group Membership

After creating a group, use `usermod -aG groupname username` to add users to the group.

## Frequently Asked Questions

#### Q1. How do I create a new group?
A. Use `sudo groupadd groupname` to create a new group.

#### Q2. How can I specify a particular GID for a new group?
A. Use `sudo groupadd -g GID groupname` where GID is the desired group ID number.

#### Q3. What's the difference between system and regular groups?
A. System groups (created with `-r`) are typically used for system services and have lower GIDs. Regular groups are for organizing users.

#### Q4. How do I add a user to a newly created group?
A. After creating the group, use `sudo usermod -aG groupname username` to add a user to the group.

#### Q5. How can I check if a group already exists?
A. Use `getent group groupname` or `grep groupname /etc/group` to check if a group exists.

## References

https://www.man7.org/linux/man-pages/man8/groupadd.8.html

## Revisions

- 2025/05/05 First revision