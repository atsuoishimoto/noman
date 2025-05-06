# passwd command

Change user password.

## Overview

The `passwd` command allows users to change their own password or, for system administrators, to change or administer other users' passwords. It modifies the `/etc/passwd` and `/etc/shadow` files that store user account information and encrypted passwords.

## Options

### **-d**

Delete a user's password (make it empty). This option is restricted to root.

```console
$ sudo passwd -d username
passwd: password expiry information changed.
```

### **-l**

Lock the specified account by prefixing the encrypted password with an exclamation mark. This prevents the user from logging in.

```console
$ sudo passwd -l username
passwd: password expiry information changed.
```

### **-u**

Unlock a locked password by removing the exclamation mark prefix.

```console
$ sudo passwd -u username
passwd: password expiry information changed.
```

### **-e**

Expire a user's password, forcing them to change it at next login.

```console
$ sudo passwd -e username
passwd: password expiry information changed.
```

### **-S**

Display password status information for an account.

```console
$ passwd -S username
username PS 2025-04-01 0 99999 7 -1
```

## Usage Examples

### Changing your own password

```console
$ passwd
Changing password for user.
Current password: 
New password: 
Retype new password: 
passwd: all authentication tokens updated successfully.
```

### Changing another user's password (as root)

```console
$ sudo passwd username
New password: 
Retype new password: 
passwd: all authentication tokens updated successfully.
```

### Locking and unlocking an account

```console
$ sudo passwd -l username
passwd: password expiry information changed.
$ sudo passwd -u username
passwd: password expiry information changed.
```

## Tips:

### Password Complexity Requirements

Most systems enforce password complexity rules. A strong password typically needs to:
- Be at least 8 characters long
- Include uppercase and lowercase letters
- Include numbers and special characters
- Not be based on dictionary words or personal information

### Check Password Status

Use `passwd -S username` to check if a password is locked, expired, or when it was last changed.

### Password Files

The actual encrypted passwords are stored in `/etc/shadow`, not in `/etc/passwd`. The shadow file is only readable by root for security reasons.

## Frequently Asked Questions

#### Q1. How do I change my own password?
A. Simply type `passwd` and follow the prompts to enter your current password and then your new password twice.

#### Q2. How can I force a user to change their password at next login?
A. Use `sudo passwd -e username` to expire a user's password.

#### Q3. What does "authentication token manipulation error" mean?
A. This usually indicates a system problem with the password files or insufficient permissions. Only root can change other users' passwords.

#### Q4. How do I create a user without a password?
A. First create the user with a normal password, then use `sudo passwd -d username` to delete the password.

## References

https://man7.org/linux/man-pages/man1/passwd.1.html

## Revisions

- 2025/05/05 First revision