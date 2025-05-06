# ssh-keygen command

Generate, manage, and convert authentication keys for SSH.

## Overview

`ssh-keygen` creates public/private key pairs for SSH authentication. These keys allow secure, password-less login to remote systems. The command can also manage existing keys, including changing passphrases and converting between key formats.

## Options

### **-t type**

Specifies the type of key to create (rsa, ed25519, dsa, ecdsa).

```console
$ ssh-keygen -t ed25519
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25519): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user/.ssh/id_ed25519
Your public key has been saved in /home/user/.ssh/id_ed25519.pub
```

### **-b bits**

Specifies the number of bits in the key (default depends on key type).

```console
$ ssh-keygen -t rsa -b 4096
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): 
```

### **-f filename**

Specifies the filename of the key file.

```console
$ ssh-keygen -t rsa -f ~/.ssh/github_key
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase): 
```

### **-C comment**

Provides a comment for the key, typically an email address or description.

```console
$ ssh-keygen -t ed25519 -C "user@example.com"
Generating public/private ed25519 key pair.
```

### **-p**

Changes the passphrase of an existing private key file.

```console
$ ssh-keygen -p -f ~/.ssh/id_rsa
Enter old passphrase: 
Enter new passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved with the new passphrase.
```

### **-l**

Shows the fingerprint of a specified public or private key file.

```console
$ ssh-keygen -l -f ~/.ssh/id_ed25519
256 SHA256:AbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcdef user@example.com (ED25519)
```

### **-y**

Reads a private key file and outputs the public key.

```console
$ ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub
Enter passphrase: 
```

## Usage Examples

### Creating a default RSA key pair

```console
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user/.ssh/id_rsa
Your public key has been saved in /home/user/.ssh/id_rsa.pub
```

### Creating a key with custom settings

```console
$ ssh-keygen -t ed25519 -C "work laptop" -f ~/.ssh/work_key
Generating public/private ed25519 key pair.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user/.ssh/work_key
Your public key has been saved in /home/user/.ssh/work_key.pub
```

### Converting a key to a different format

```console
$ ssh-keygen -e -f ~/.ssh/id_rsa.pub > ~/.ssh/id_rsa_openssh.pub
```

## Tips

### Choose the Right Key Type

Ed25519 keys are recommended for most users as they provide strong security with smaller key sizes. RSA keys with at least 3072 bits are also secure but larger.

### Use a Strong Passphrase

Adding a passphrase to your key provides an extra layer of security. If your private key is stolen, the passphrase prevents immediate use.

### Back Up Your Keys

Always keep backups of your private keys in a secure location. If you lose your private key, you'll need to generate a new key pair and update all servers.

### Key Location Matters

By default, SSH looks for keys in the ~/.ssh directory. Using non-standard locations requires specifying the key path with `-i` when using ssh.

## Frequently Asked Questions

#### Q1. How do I copy my public key to a server?
A. Use `ssh-copy-id user@hostname` to copy your public key to a remote server's authorized_keys file.

#### Q2. What's the difference between RSA and Ed25519 keys?
A. Ed25519 keys are newer, smaller, and generally faster than RSA keys while providing equivalent or better security.

#### Q3. How do I generate a key without a passphrase?
A. Simply press Enter when prompted for a passphrase during key generation.

#### Q4. How can I change my key's passphrase?
A. Use `ssh-keygen -p -f ~/.ssh/id_rsa` to change the passphrase of an existing key.

#### Q5. What should I do if I forgot my key's passphrase?
A. Unfortunately, there's no way to recover a lost passphrase. You'll need to generate a new key pair.

## References

https://man.openbsd.org/ssh-keygen.1

## Revisions

- 2025/05/05 First revision