# groups command

Display the groups a user belongs to.

## Overview

The `groups` command shows all the groups that a specified user is a member of. If no user is specified, it displays the groups for the current user. This command is useful for checking group memberships for permission-related issues.

## Options

The `groups` command has minimal options as it's designed for a simple purpose.

### No options (default usage)

Shows the groups for the current user.

```console
$ groups
staff wheel admin
```

### Specify username

Shows the groups for the specified user.

```console
$ groups username
username : staff wheel admin
```

## Usage Examples

### Checking your own group memberships

```console
$ groups
user wheel admin staff
```

### Checking another user's group memberships

```console
$ groups root
root : wheel admin system
```

### Checking multiple users' group memberships

```console
$ groups user1 user2
user1 : staff wheel
user2 : staff admin
```

## Tips

### Understanding Group Membership Importance

Group memberships determine what files and resources a user can access. For example, users in the "wheel" group often have sudo privileges, while those in "admin" can perform administrative tasks.

### Combining with Other Commands

Use `groups` with `id` for more comprehensive user information:

```console
$ id
uid=501(user) gid=20(staff) groups=20(staff),12(everyone),61(localaccounts)
```

### Checking Primary Group

The first group listed is usually the user's primary group, which is used by default when creating new files.

## Frequently Asked Questions

#### Q1. What is the difference between primary and secondary groups?
A. The primary group (also called the login group) is the default group assigned to files created by the user. Secondary groups provide additional permissions.

#### Q2. How do I add a user to a group?
A. Use `sudo usermod -aG groupname username` on Linux or `sudo dseditgroup -o edit -a username -t user groupname` on macOS.

#### Q3. Why do I need to know my group memberships?
A. Group memberships determine what files and resources you can access. Troubleshooting permission issues often involves checking group memberships.

#### Q4. Can I see all groups on the system?
A. Yes, use the `getent group` command on Linux or `dscl . list /Groups` on macOS to see all groups.

## References

https://www.gnu.org/software/coreutils/manual/html_node/groups-invocation.html

## Revisions

- 2025/05/05 First revision