# dig command

Query DNS name servers for domain information.

## Overview

`dig` (Domain Information Groper) is a flexible DNS lookup utility that queries DNS servers for information about host addresses, mail exchanges, nameservers, and related information. It's commonly used for troubleshooting DNS problems and verifying DNS records.

## Options

### **@server**

Specify the DNS server to query

```console
$ dig @8.8.8.8 example.com
```

### **-t**

Specify the type of DNS record to query (default is A)

```console
$ dig -t MX gmail.com
```

### **+short**

Display a terse answer, showing only the answer section's record data

```console
$ dig +short example.com
93.184.216.34
```

### **+noall, +answer**

Control which sections of the response to display

```console
$ dig +noall +answer example.com
example.com.		86400	IN	A	93.184.216.34
```

### **-x**

Perform a reverse DNS lookup (IP to hostname)

```console
$ dig -x 8.8.8.8
```

### **+trace**

Trace the delegation path from the root name servers

```console
$ dig +trace example.com
```

## Usage Examples

### Looking up A records (default)

```console
$ dig example.com
; <<>> DiG 9.16.1-Ubuntu <<>> example.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 31892
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 65494
;; QUESTION SECTION:
;example.com.			IN	A

;; ANSWER SECTION:
example.com.		86400	IN	A	93.184.216.34

;; Query time: 28 msec
;; SERVER: 127.0.0.53#53(127.0.0.53)
;; WHEN: Mon May 05 12:00:00 UTC 2025
;; MSG SIZE  rcvd: 56
```

### Looking up MX records

```console
$ dig -t MX gmail.com +short
10 alt1.gmail-smtp-in.l.google.com.
20 alt2.gmail-smtp-in.l.google.com.
30 alt3.gmail-smtp-in.l.google.com.
40 alt4.gmail-smtp-in.l.google.com.
5 gmail-smtp-in.l.google.com.
```

### Querying a specific nameserver

```console
$ dig @1.1.1.1 example.org
```

### Checking all DNS records for a domain

```console
$ dig example.com ANY
```

## Tips:

### Use +short for Quick Results

When you just need the IP address or record value without all the extra information, use `dig +short domain.com` to get a clean, minimal output.

### Combine Multiple Options

You can combine multiple options like `dig +noall +answer +authority example.com` to show only specific sections of the DNS response.

### Check DNS Propagation

To check if DNS changes have propagated, query multiple DNS servers: `dig @8.8.8.8 example.com` and `dig @1.1.1.1 example.com` to compare results.

### Troubleshoot Email Delivery

Use `dig -t MX domain.com` to verify mail exchanger records when troubleshooting email delivery issues.

## Frequently Asked Questions

#### Q1. What's the difference between dig and nslookup?
A. `dig` provides more detailed information and is more flexible for DNS troubleshooting, while `nslookup` is simpler but less powerful. `dig` is generally preferred by network administrators.

#### Q2. How do I check if my DNS changes have propagated?
A. Query multiple DNS servers using `dig @server domain.com` and compare the results. If they match your expected values, propagation is complete.

#### Q3. How can I find the authoritative nameservers for a domain?
A. Use `dig -t NS domain.com` to find the nameservers responsible for a domain.

#### Q4. How do I perform a reverse DNS lookup?
A. Use `dig -x IP_ADDRESS` to find the hostname associated with an IP address.

## References

https://linux.die.net/man/1/dig

## Revisions

- 2025/05/05 First revision