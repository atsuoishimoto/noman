# host command

DNS lookup utility for querying domain name servers.

## Overview

The `host` command is a simple utility for performing DNS lookups. It translates domain names to IP addresses and vice versa, and can also be used to query DNS record types like MX (mail exchange), NS (name server), and others. It's commonly used for network troubleshooting and DNS verification.

## Options

### **-t, --type**

Specify the query type (e.g., A, AAAA, MX, NS, SOA, TXT)

```console
$ host -t MX gmail.com
gmail.com mail is handled by 10 alt1.gmail-smtp-in.l.google.com.
gmail.com mail is handled by 20 alt2.gmail-smtp-in.l.google.com.
gmail.com mail is handled by 30 alt3.gmail-smtp-in.l.google.com.
gmail.com mail is handled by 40 alt4.gmail-smtp-in.l.google.com.
gmail.com mail is handled by 5 gmail-smtp-in.l.google.com.
```

### **-a, --all**

Equivalent to using -v and setting the query type to ANY

```console
$ host -a example.com
Trying "example.com"
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;example.com.                   IN      ANY

;; ANSWER SECTION:
example.com.            86400   IN      A       93.184.216.34
```

### **-v, --verbose**

Enable verbose output with more detailed information

```console
$ host -v google.com
Trying "google.com"
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;google.com.                    IN      A

;; ANSWER SECTION:
google.com.             300     IN      A       142.250.190.78
```

### **-4, --ipv4**

Use IPv4 query transport only

```console
$ host -4 example.com
example.com has address 93.184.216.34
example.com has IPv6 address 2606:2800:220:1:248:1893:25c8:1946
example.com mail is handled by 0 .
```

### **-6, --ipv6**

Use IPv6 query transport only

```console
$ host -6 example.com
example.com has address 93.184.216.34
example.com has IPv6 address 2606:2800:220:1:248:1893:25c8:1946
example.com mail is handled by 0 .
```

## Usage Examples

### Basic Domain Lookup

```console
$ host google.com
google.com has address 142.250.190.78
google.com has IPv6 address 2a00:1450:4001:830::200e
google.com mail is handled by 10 smtp.google.com.
```

### Reverse DNS Lookup

```console
$ host 8.8.8.8
8.8.8.8.in-addr.arpa domain name pointer dns.google.
```

### Query Specific DNS Server

```console
$ host example.com 1.1.1.1
Using domain server:
Name: 1.1.1.1
Address: 1.1.1.1#53
Aliases: 

example.com has address 93.184.216.34
example.com has IPv6 address 2606:2800:220:1:248:1893:25c8:1946
example.com mail is handled by 0 .
```

## Tips:

### Use Short Form for Quick Lookups

For routine DNS lookups, the simplest form `host domain.com` is usually sufficient and provides the most common information (A, AAAA, and MX records).

### Troubleshoot Email Delivery Issues

When diagnosing email delivery problems, use `host -t MX domain.com` to verify the mail exchange records for a domain.

### Verify DNS Propagation

After making DNS changes, use `host` with different DNS servers to check if changes have propagated: `host domain.com 8.8.8.8` and `host domain.com 1.1.1.1`.

## Frequently Asked Questions

#### Q1. What's the difference between `host` and `dig`?
A. `host` provides simpler, more human-readable output focused on common lookups, while `dig` offers more detailed DNS information in a format useful for DNS administrators and debugging.

#### Q2. How do I check all DNS records for a domain?
A. Use `host -a domain.com` to query all record types for a domain.

#### Q3. Can I use `host` to check if a DNS server is responding?
A. Yes, specify the DNS server after the domain: `host domain.com dns-server-ip`.

#### Q4. How do I look up the name server records?
A. Use `host -t NS domain.com` to query the name servers for a domain.

## References

https://linux.die.net/man/1/host

## Revisions

- 2025/05/05 First revision