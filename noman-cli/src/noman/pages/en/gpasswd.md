# gpasswd command

Administers /etc/group and /etc/gshadow by modifying group memberships and properties.

## Overview

`gpasswd` is a utility for administering Linux group accounts. It allows system administrators to add and remove users from groups, set group administrators, and manage group passwords. The command modifies the `/etc/group` and `/etc/gshadow` files, which store group information on Linux systems.

## Options

### **-a, --add** *USER*

Adds the specified user to the named group.

```console
$ sudo gpasswd -a john developers
Adding user john to group developers
```

### **-d, --delete** *USER*

Removes the specified user from the named group.

```console
$ sudo gpasswd -d john developers
Removing user john from group developers
```

### **-A, --administrators** *USER1,USER2,...*

Sets the list of administrative users for the group. Only these users can add or remove members from the group.

```console
$ sudo gpasswd -A jane,mike developers
```

### **-M, --members** *USER1,USER2,...*

Sets the list of members for the group, replacing the current member list.

```console
$ sudo gpasswd -M alice,bob,charlie developers
```

### **-r, --remove-password**

Removes the password from the group.

```console
$ sudo gpasswd -r developers
```

## Usage Examples

### Adding a user to multiple groups

```console
$ sudo gpasswd -a user1 developers
Adding user user1 to group developers
$ sudo gpasswd -a user1 admins
Adding user user1 to group admins
```

### Setting group administrators and members in one command

```console
$ sudo gpasswd -A admin1,admin2 -M user1,user2,user3 projectteam
```

### Setting a password for a group

```console
$ sudo gpasswd developers
Changing the password for group developers
New Password: 
Re-enter new password: 
```

## Tips:

### Use Groups Command to Verify Changes

After modifying group memberships with `gpasswd`, use the `groups` command to verify that the changes took effect:

```console
$ groups username
```

### Avoid Group Passwords When Possible

Group passwords are generally considered less secure than user-based access control. Modern systems typically rely on user permissions and sudo rather than group passwords.

### Use Sudo with gpasswd

Most `gpasswd` operations require root privileges. Always use `sudo` when executing `gpasswd` commands unless you're already logged in as root.

## Frequently Asked Questions

#### Q1. What's the difference between `gpasswd` and `usermod -G`?
A. `gpasswd` is specifically designed for group management and can add/remove single users without affecting other group members. `usermod -G` replaces all of a user's supplementary groups at once, which can accidentally remove the user from other groups if not used carefully.

#### Q2. How do I check which users are in a group?
A. Use `getent group groupname` to see all members of a specific group.

#### Q3. Can regular users use `gpasswd`?
A. Regular users can only use `gpasswd` if they've been designated as administrators of the group using the `-A` option, and even then, they have limited capabilities compared to root.

#### Q4. What happens if I set a group password?
A. Setting a group password allows users to temporarily join the group using the `newgrp` command if they know the password. This is rarely used in modern systems.

## References

https://linux.die.net/man/1/gpasswd

## Revisions

- 2025/05/05 First revision