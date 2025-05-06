# openssl command

Manage cryptographic functions including certificate creation, encryption, and secure connections.

## Overview

OpenSSL is a robust command-line tool for working with SSL/TLS protocols and various cryptographic functions. It allows users to create certificates, generate keys, encrypt/decrypt files, hash data, and test secure connections. The command provides extensive functionality for implementing security in network communications and managing digital certificates.

## Options

### **req**

Create and process certificate requests

```console
$ openssl req -new -key private.key -out request.csr
You are about to be asked to enter information that will be incorporated
into your certificate request.
...
```

### **x509**

Certificate display and signing utility

```console
$ openssl x509 -in certificate.crt -text -noout
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number: 12345 (0x3039)
...
```

### **genrsa**

Generate RSA private key

```console
$ openssl genrsa -out private.key 2048
Generating RSA private key, 2048 bit long modulus
.....+++
.............+++
e is 65537 (0x10001)
```

### **rsa**

Process RSA keys

```console
$ openssl rsa -in private.key -pubout -out public.key
writing RSA key
```

### **s_client**

SSL/TLS client program for testing connections

```console
$ openssl s_client -connect example.com:443
CONNECTED(00000003)
depth=2 O = Digital Signature Trust Co., CN = DST Root CA X3
...
```

### **enc**

Encrypt or decrypt using various cipher algorithms

```console
$ openssl enc -aes-256-cbc -salt -in plaintext.txt -out encrypted.txt
enter aes-256-cbc encryption password:
Verifying - enter aes-256-cbc encryption password:
```

### **dgst**

Compute message digests (hashes)

```console
$ openssl dgst -sha256 file.txt
SHA256(file.txt)= 3a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b
```

## Usage Examples

### Creating a Self-Signed Certificate

```console
$ openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
Generating a 4096 bit RSA private key
.......................++
.......................++
writing new private key to 'key.pem'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
...
```

### Verifying a Certificate Chain

```console
$ openssl verify -CAfile ca-bundle.crt certificate.crt
certificate.crt: OK
```

### Converting Certificate Formats

```console
$ openssl x509 -in certificate.crt -inform PEM -out certificate.der -outform DER
```

### Checking SSL/TLS Connection Details

```console
$ openssl s_client -connect example.com:443 -showcerts
CONNECTED(00000003)
depth=2 O = Digital Signature Trust Co., CN = DST Root CA X3
...
```

## Tips:

### Check Certificate Expiration

Use `openssl x509 -enddate -noout -in certificate.crt` to quickly check when a certificate expires without displaying all certificate details.

### Generate Strong Random Passwords

Use `openssl rand -base64 16` to generate a secure random password of 16 bytes (displayed as base64).

### View Certificate Information in a Browser

To check certificate details for a website without connecting to it, use `openssl x509 -in certificate.crt -text -noout` after saving the certificate locally.

### Troubleshoot SSL/TLS Connections

When facing connection issues, use `openssl s_client -connect hostname:port -debug` to see detailed information about the handshake process.

## Frequently Asked Questions

#### Q1. How do I create a CSR (Certificate Signing Request)?
A. Use `openssl req -new -key private.key -out request.csr`. You'll be prompted for certificate information like organization name and common name.

#### Q2. How can I check the contents of a certificate?
A. Use `openssl x509 -in certificate.crt -text -noout` to display the certificate details in human-readable format.

#### Q3. How do I convert a certificate from PEM to PKCS#12 format?
A. Use `openssl pkcs12 -export -out certificate.pfx -inkey private.key -in certificate.crt` to create a PKCS#12 file containing both the certificate and private key.

#### Q4. How can I test an SSL/TLS connection to a server?
A. Use `openssl s_client -connect hostname:port` to establish a connection and view the certificate information.

#### Q5. How do I generate a random string for use as a key or password?
A. Use `openssl rand -base64 32` to generate a 32-byte random string encoded in base64.

## References

https://www.openssl.org/docs/man1.1.1/man1/

## Revisions

- 2025/05/05 First revision