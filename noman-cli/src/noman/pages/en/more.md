# more command

Display file contents one screen at a time.

## Overview

`more` is a filter for paging through text one screenful at a time. It's used to view the contents of text files in a controlled manner, allowing users to navigate forward through the file. Unlike its more advanced counterpart `less`, `more` primarily allows forward navigation.

## Options

### **-d**

Display helpful prompts and provide more user-friendly error messages.

```console
$ more -d large_file.txt
--More--(50%) [Press space to continue, 'q' to quit.]
```

### **-f**

Count logical lines rather than screen lines (useful with long lines that wrap).

```console
$ more -f wrapped_text.txt
```

### **-p**

Clear the screen before displaying each page.

```console
$ more -p document.txt
```

### **-c**

Clear screen before displaying, but do so by drawing from the top line down.

```console
$ more -c large_file.txt
```

### **-s**

Squeeze multiple blank lines into one.

```console
$ more -s file_with_blanks.txt
```

### **-u**

Suppress underlining (useful for some terminal types).

```console
$ more -u formatted_text.txt
```

### **-number**

Set the number of lines per screenful.

```console
$ more -10 short_file.txt
```

### **+number**

Start displaying the file at line number.

```console
$ more +100 large_file.txt
```

### **+/pattern**

Start displaying at the first line containing the pattern.

```console
$ more +/ERROR log_file.txt
```

## Usage Examples

### Basic Usage

```console
$ more /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
--More--(28%)
```

### Viewing Multiple Files

```console
$ more file1.txt file2.txt
::::::::::::::
file1.txt
::::::::::::::
Contents of file1...
--More--(75%)
```

### Piping Command Output to more

```console
$ ls -la /usr/bin | more
total 123456
drwxr-xr-x  2 root root   69632 Apr 18 09:23 .
drwxr-xr-x 14 root root    4096 Jan 15 12:34 ..
-rwxr-xr-x  1 root root   35344 Feb  7  2022 [
--More--(2%)
```

### Starting at a Specific Pattern

```console
$ more +/function script.js
function calculateTotal() {
  // Function implementation
}
--More--(45%)
```

## Tips

### Navigation Commands

While viewing a file with `more`, you can use these commands:
- `Space` - Move forward one screenful
- `Enter` - Move forward one line
- `b` - Move backward one screenful (may not work in all implementations)
- `q` - Quit
- `/pattern` - Search for pattern
- `n` - Repeat previous search

### Using more with Large Files

For very large files, `more` loads the file as you read it, making it more memory-efficient than loading the entire file at once.

### When to Use less Instead

If you need to navigate both forward and backward through a file with more flexibility, consider using `less` instead, which offers more features.

### Customizing the Prompt

Set the `MORE` environment variable to customize the prompt and behavior:
```console
$ export MORE="-d"
```

## Frequently Asked Questions

#### Q1. What's the difference between `more` and `less`?
A. `more` is an older utility that primarily allows forward navigation through a file. `less` is more feature-rich, allowing both forward and backward navigation, and has additional search capabilities.

#### Q2. How do I exit `more`?
A. Press the `q` key to quit.

#### Q3. Can I search for text in `more`?
A. Yes, press `/` followed by your search pattern, then press Enter. Use `n` to find the next occurrence.

#### Q4. How can I display line numbers in `more`?
A. `more` doesn't have a built-in line numbering feature. For line numbers, consider using `less -N` or `cat -n file.txt | more`.

#### Q5. How do I make `more` display a specific number of lines at a time?
A. Use the `-number` option, e.g., `more -20 file.txt` to display 20 lines at a time.

## References

https://man7.org/linux/man-pages/man1/more.1.html

## Revisions

- 2025/05/05 First revision