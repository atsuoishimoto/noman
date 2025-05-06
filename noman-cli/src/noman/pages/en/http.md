# http command

Send arbitrary HTTP requests and display responses.

## Overview

The `http` command is a user-friendly command-line HTTP client for making HTTP requests. It's part of the HTTPie tool, designed to be more intuitive than curl with colorized output, JSON support, and simpler syntax. It allows testing APIs, debugging web services, and downloading content with minimal typing.

## Options

### **-j, --json**

Submit data as JSON. Sets the Content-Type header to application/json.

```console
$ http -j POST example.com name=John age:=30
```

### **-f, --form**

Submit data as form-encoded. Sets the Content-Type header to application/x-www-form-urlencoded.

```console
$ http -f POST example.com name=John age=30
```

### **-a, --auth**

Specify username and password for authentication.

```console
$ http -a username:password example.com
```

### **-h, --headers**

Print only the response headers.

```console
$ http -h example.com
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Date: Mon, 05 May 2025 12:00:00 GMT
Server: nginx
Content-Length: 1256
```

### **-v, --verbose**

Print the whole HTTP exchange (request and response).

```console
$ http -v example.com
```

### **-d, --download**

Download the response body to a file.

```console
$ http -d example.com/file.pdf
```

### **--offline**

Build the request and print it but don't send it.

```console
$ http --offline POST example.com name=John
```

## Usage Examples

### Basic GET request

```console
$ http example.com
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
...

<!doctype html>
<html>
...
</html>
```

### POST with JSON data

```console
$ http POST api.example.com/users name=John age:=30 is_active:=true
HTTP/1.1 201 Created
Content-Type: application/json

{
    "id": 123,
    "name": "John",
    "age": 30,
    "is_active": true
}
```

### Using request headers

```console
$ http example.com User-Agent:MyApp X-API-Token:abc123
```

### File upload

```console
$ http POST example.com/upload file@/path/to/file.jpg
```

## Tips:

### Use `:=` for Non-String JSON Values

When sending JSON data, use `:=` for numbers, booleans, and null: `count:=42 active:=true data:=null`

### Redirect Output to Files

Use standard shell redirection to save responses: `http example.com > response.html`

### Use Sessions for Persistent Cookies

Use `--session=name` to maintain cookies between requests: `http --session=logged-in -a user:pass example.com`

### Pretty-Print JSON by Default

HTTPie automatically formats JSON responses for readability with syntax highlighting in the terminal.

## Frequently Asked Questions

#### Q1. How is `http` different from `curl`?
A. `http` (HTTPie) offers a more intuitive syntax, automatic colorized output, JSON support by default, and generally requires less typing for common operations.

#### Q2. How do I send query parameters?
A. Add them to the URL with `?` and `&`: `http example.com/search?q=term&page=2` or use the `==` syntax: `http example.com q==term page==2`

#### Q3. How do I send a custom HTTP method?
A. Simply specify the method before the URL: `http PUT example.com`

#### Q4. How do I follow redirects?
A. Use the `--follow` option: `http --follow example.com/redirecting-url`

## References

https://httpie.io/docs/cli

## Revisions

- 2025/05/05 First revision