# wget command

Download files from the web via HTTP, HTTPS, and FTP protocols.

## Overview

`wget` is a non-interactive command-line utility for downloading files from the web. It supports HTTP, HTTPS, and FTP protocols, and can work in the background, resume interrupted downloads, and follow links within websites. It's particularly useful for batch downloading, mirroring websites, or retrieving files in scripts.

## Options

### **-O, --output-document=FILE**

Write documents to FILE instead of creating files based on remote names.

```console
$ wget -O latest-linux.iso https://example.com/downloads/linux.iso
--2025-05-05 10:15:32--  https://example.com/downloads/linux.iso
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1073741824 (1.0G) [application/octet-stream]
Saving to: 'latest-linux.iso'

latest-linux.iso    100%[===================>]   1.00G  5.25MB/s    in 3m 15s  

2025-05-05 10:18:47 (5.25 MB/s) - 'latest-linux.iso' saved [1073741824/1073741824]
```

### **-c, --continue**

Resume getting a partially-downloaded file.

```console
$ wget -c https://example.com/large-file.zip
--2025-05-05 10:20:12--  https://example.com/large-file.zip
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 206 Partial Content
Length: 104857600 (100M), 52428800 (50M) remaining [application/zip]
Saving to: 'large-file.zip'

large-file.zip      50%[======>           ]  50.00M  3.15MB/s    in 16s     

2025-05-05 10:20:28 (3.15 MB/s) - 'large-file.zip' saved [104857600/104857600]
```

### **-b, --background**

Go to background immediately after startup.

```console
$ wget -b https://example.com/huge-archive.tar.gz
Continuing in background, pid 1234.
Output will be written to 'wget-log'.
```

### **-r, --recursive**

Turn on recursive retrieving (download entire website directories).

```console
$ wget -r -np https://example.com/docs/
--2025-05-05 10:25:45--  https://example.com/docs/
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 8192 (8.0K) [text/html]
Saving to: 'example.com/docs/index.html'

example.com/docs/index.html    100%[===================>]   8.00K  --.-KB/s    in 0.1s    

2025-05-05 10:25:46 (80.0 KB/s) - 'example.com/docs/index.html' saved [8192/8192]

... [more files downloaded] ...
```

### **-np, --no-parent**

Do not ascend to the parent directory when retrieving recursively.

```console
$ wget -r -np https://example.com/docs/
```

### **-m, --mirror**

Turn on options suitable for mirroring: recursive, time-stamping, infinite recursion depth, and preserve FTP directory listings.

```console
$ wget -m https://example.com/blog/
--2025-05-05 10:30:12--  https://example.com/blog/
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 16384 (16K) [text/html]
Saving to: 'example.com/blog/index.html'

example.com/blog/index.html    100%[===================>]  16.00K  --.-KB/s    in 0.1s    

2025-05-05 10:30:13 (160.0 KB/s) - 'example.com/blog/index.html' saved [16384/16384]

... [more files downloaded] ...
```

### **-q, --quiet**

Quiet mode (no output).

```console
$ wget -q https://example.com/file.txt
```

### **-P, --directory-prefix=PREFIX**

Save files to PREFIX/...

```console
$ wget -P downloads/ https://example.com/file.txt
--2025-05-05 10:35:22--  https://example.com/file.txt
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1024 (1.0K) [text/plain]
Saving to: 'downloads/file.txt'

downloads/file.txt   100%[===================>]   1.00K  --.-KB/s    in 0.1s    

2025-05-05 10:35:23 (10.0 KB/s) - 'downloads/file.txt' saved [1024/1024]
```

### **--limit-rate=RATE**

Limit download rate to RATE (e.g., 200k for 200 KB/s).

```console
$ wget --limit-rate=200k https://example.com/large-file.zip
--2025-05-05 10:40:15--  https://example.com/large-file.zip
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 104857600 (100M) [application/zip]
Saving to: 'large-file.zip'

large-file.zip      100%[===================>] 100.00M  200KB/s    in 8m 20s  

2025-05-05 10:48:35 (200 KB/s) - 'large-file.zip' saved [104857600/104857600]
```

## Usage Examples

### Downloading a file with a progress bar

```console
$ wget https://example.com/file.txt
--2025-05-05 10:50:12--  https://example.com/file.txt
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1024 (1.0K) [text/plain]
Saving to: 'file.txt'

file.txt             100%[===================>]   1.00K  --.-KB/s    in 0.1s    

2025-05-05 10:50:13 (10.0 KB/s) - 'file.txt' saved [1024/1024]
```

### Mirroring a website with depth limit

```console
$ wget -m -k -p -l 2 https://example.com/
```

This command mirrors the website, converts links for offline viewing (-k), downloads necessary page requisites (-p), and limits the recursion depth to 2 levels (-l 2).

### Downloading files from a password-protected site

```console
$ wget --user=username --password=password https://example.com/protected/file.pdf
```

### Downloading multiple files listed in a text file

```console
$ cat urls.txt
https://example.com/file1.txt
https://example.com/file2.txt
https://example.com/file3.txt

$ wget -i urls.txt
```

## Tips:

### Resume Interrupted Downloads

If your download gets interrupted, use `wget -c URL` to resume from where it left off instead of starting over.

### Download in the Background

For large downloads, use `wget -b URL` to run wget in the background. Output will be written to wget-log in the current directory.

### Limit Bandwidth Usage

Use `--limit-rate=RATE` (e.g., `--limit-rate=200k`) to avoid consuming all available bandwidth, especially useful on shared connections.

### Mirror a Website for Offline Viewing

Use `wget -m -k -p website-url` to create a complete offline copy with working links. The `-k` option converts links for local viewing.

### Use a Different User Agent

Some websites block wget. Use `--user-agent="Mozilla/5.0"` to identify as a browser instead.

## Frequently Asked Questions

#### Q1. How do I download a file and save it with a different name?
A. Use `wget -O filename URL` to save the downloaded file with a custom name.

#### Q2. How can I download files from a password-protected site?
A. Use `wget --user=username --password=password URL` to provide authentication credentials.

#### Q3. How do I download an entire website?
A. Use `wget -m -k -p website-url` to mirror the site with proper link conversion for offline viewing.

#### Q4. How can I limit the download speed?
A. Use `wget --limit-rate=RATE URL` (e.g., `--limit-rate=200k` for 200 KB/s).

#### Q5. How do I resume a partially downloaded file?
A. Use `wget -c URL` to continue downloading from where it was interrupted.

## References

https://www.gnu.org/software/wget/manual/wget.html

## Revisions

- 2025/05/05 First revision