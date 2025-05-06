# groupmod command

Modify a group definition on the system.

## Overview

The `groupmod` command is used to modify the attributes of an existing group on a Unix/Linux system. It can change a group's name (GID) or numeric ID (GID), allowing administrators to manage group accounts efficiently.

## Options

### **-g, --gid GID**

Change the group ID to the specified value.

```console
$ sudo groupmod -g 1001 developers
```

### **-n, --new-name NEW_GROUP**

Change the name of the group from GROUP to NEW_GROUP.

```console
$ sudo groupmod -n engineering developers
```

### **-o, --non-unique**

Allow using a non-unique GID (normally GIDs must be unique).

```console
$ sudo groupmod -g 1001 -o marketing
```

### **-p, --password PASSWORD**

Change the password for the group to the encrypted PASSWORD.

```console
$ sudo groupmod -p encrypted_password developers
```

### **-R, --root CHROOT_DIR**

Apply changes in the CHROOT_DIR directory and use the configuration files from the CHROOT_DIR directory.

```console
$ sudo groupmod -R /mnt/system -n engineering developers
```

## Usage Examples

### Changing a group's name

```console
$ sudo groupmod -n developers programmers
```

### Changing a group's GID

```console
$ sudo groupmod -g 2000 developers
```

### Changing both name and GID

```console
$ sudo groupmod -g 2000 -n engineering developers
```

## Tips:

### Verify Group Changes

After modifying a group, use the `getent group` command to verify the changes:

```console
$ getent group engineering
```

### Consider File Ownership

When changing a group's GID, files owned by the old GID won't automatically be updated. Use `find` and `chgrp` to update file ownerships:

```console
$ find /path/to/directory -group old_gid -exec chgrp new_gid {} \;
```

### Check for Running Processes

Before modifying a group that's used by running processes, check if any processes are using it:

```console
$ ps -eo group | grep groupname
```

## Frequently Asked Questions

#### Q1. Can I change a group's name and GID at the same time?
A. Yes, you can use both the `-n` and `-g` options together in a single command.

#### Q2. What happens to files owned by a group if I change its GID?
A. Files will still reference the old GID number. You'll need to manually update file ownerships using `chgrp` or similar commands.

#### Q3. Can I make a group's GID the same as another group's?
A. Yes, but only if you use the `-o` (non-unique) option. However, this is generally not recommended as it can cause confusion.

#### Q4. Will changing a group's name affect users who are members of that group?
A. No, changing a group's name doesn't affect its membership. Users who were members of the old group name will automatically be members of the new group name.

## References

https://man7.org/linux/man-pages/man8/groupmod.8.html

## Revisions

- 2025/05/05 First revision