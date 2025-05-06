# curl command

Transfer data from or to a server using various protocols.

## Overview

`curl` is a command-line tool for transferring data with URLs using various protocols (HTTP, HTTPS, FTP, SFTP, SCP, etc.). It's designed to work without user interaction and can be used for downloading files, API requests, testing endpoints, and more. `curl` supports numerous options for customizing requests, handling authentication, and controlling data transfer.

## Options

### **-o, --output \<file\>**

Write output to a file instead of stdout.

```console
$ curl -o example.html https://example.com
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1256  100  1256    0     0   7503      0 --:--:-- --:--:-- --:--:--  7503
```

### **-O, --remote-name**

Write output to a local file named like the remote file.

```console
$ curl -O https://example.com/file.zip
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 10.2M  100 10.2M    0     0  5.1M      0  0:00:02  0:00:02 --:--:-- 5.1M
```

### **-s, --silent**

Silent or quiet mode, don't show progress meter or error messages.

```console
$ curl -s https://example.com > example.html
```

### **-I, --head**

Fetch the HTTP headers only.

```console
$ curl -I https://example.com
HTTP/2 200 
content-type: text/html; charset=UTF-8
date: Mon, 05 May 2025 12:00:00 GMT
expires: Mon, 12 May 2025 12:00:00 GMT
cache-control: public, max-age=604800
server: ECS (dcb/7F84)
content-length: 1256
```

### **-L, --location**

Follow redirects if the server reports that the requested page has moved.

```console
$ curl -L http://github.com
```

### **-X, --request \<command\>**

Specify request method to use (GET, POST, PUT, DELETE, etc.).

```console
$ curl -X POST https://api.example.com/data
```

### **-H, --header \<header\>**

Pass custom header(s) to server.

```console
$ curl -H "Content-Type: application/json" -H "Authorization: Bearer token123" https://api.example.com
```

### **-d, --data \<data\>**

Send specified data in a POST request.

```console
$ curl -X POST -d "name=John&age=30" https://api.example.com/users
```

### **--data-binary \<data\>**

Send data exactly as specified with no extra processing.

```console
$ curl --data-binary @filename.json https://api.example.com/upload
```

### **-F, --form \<name=content\>**

For multipart/form-data uploading (e.g., file uploads).

```console
$ curl -F "profile=@photo.jpg" https://api.example.com/upload
```

### **-u, --user \<user:password\>**

Specify user and password for server authentication.

```console
$ curl -u username:password https://api.example.com/secure
```

### **-k, --insecure**

Allow insecure server connections when using SSL.

```console
$ curl -k https://self-signed-certificate.com
```

## Usage Examples

### Downloading a file

```console
$ curl -o output.html https://example.com
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1256  100  1256    0     0  12560      0 --:--:-- --:--:-- --:--:-- 12560
```

### Making a POST request with JSON data

```console
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"John","age":30}' https://api.example.com/users
{"id": 123, "status": "created"}
```

### Uploading a file

```console
$ curl -F "file=@document.pdf" https://api.example.com/upload
{"status": "success", "fileId": "abc123"}
```

### Following redirects and saving output

```console
$ curl -L -o result.html https://website-with-redirect.com
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   256  100   256    0     0   1024      0 --:--:-- --:--:-- --:--:--  1024
100  5120  100  5120    0     0  10240      0 --:--:-- --:--:-- --:--:-- 10240
```

## Tips

### Use Verbose Mode for Debugging

When troubleshooting, use `-v` (verbose) or `-vv` (more verbose) to see the complete request and response details:

```console
$ curl -v https://example.com
```

### Save Cookies and Use Them Later

For sessions that require cookies:

```console
$ curl -c cookies.txt https://example.com/login -d "user=name&password=secret"
$ curl -b cookies.txt https://example.com/protected-area
```

### Limit Transfer Rate

To avoid consuming all bandwidth:

```console
$ curl --limit-rate 100K -O https://example.com/large-file.zip
```

### Resume Interrupted Downloads

If a download gets interrupted, resume it with `-C -`:

```console
$ curl -C - -O https://example.com/large-file.zip
```

### Test API Endpoints Quickly

For quick API testing without writing scripts:

```console
$ curl -s https://api.example.com/data | jq
```

## Frequently Asked Questions

#### Q1. How do I download multiple files with curl?
A. Use multiple `-O` options or a bash loop:
```console
$ curl -O https://example.com/file1.txt -O https://example.com/file2.txt
```
Or:
```console
$ for url in https://example.com/file{1..5}.txt; do curl -O "$url"; done
```

#### Q2. How can I see the HTTP response code only?
A. Use the `-s` and `-o /dev/null` options with `-w` to format the output:
```console
$ curl -s -o /dev/null -w "%{http_code}" https://example.com
200
```

#### Q3. How do I send a request with a specific timeout?
A. Use the `--connect-timeout` and `--max-time` options:
```console
$ curl --connect-timeout 5 --max-time 10 https://example.com
```

#### Q4. How can I make curl ignore SSL certificate errors?
A. Use the `-k` or `--insecure` option, but be aware of security implications:
```console
$ curl -k https://self-signed-certificate.com
```

#### Q5. How do I use curl with a proxy?
A. Use the `-x` or `--proxy` option:
```console
$ curl -x http://proxy-server:8080 https://example.com
```

## References

https://curl.se/docs/manpage.html

## Revisions

- 2025/05/05 First revision