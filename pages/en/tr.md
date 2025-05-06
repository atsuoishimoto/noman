# tr command

Translate or delete characters from standard input, writing to standard output.

## Overview

The `tr` command is a text transformation utility that operates on a character-by-character basis. It reads from standard input, performs character substitution, deletion, or compression according to specified parameters, and writes the result to standard output. It's commonly used in shell scripts for tasks like case conversion, character removal, and basic text transformations.

## Options

### **-d**

Delete characters in SET1, do not translate.

```console
$ echo "Hello, World!" | tr -d 'aeiou'
Hll, Wrld!
```

### **-s**

Replace each sequence of a repeated character in SET1 with a single occurrence.

```console
$ echo "Hello    World!" | tr -s ' '
Hello World!
```

### **-c, --complement**

Use the complement of SET1.

```console
$ echo "Hello, World!" | tr -cd 'a-zA-Z\n'
HelloWorld
```

### **-t, --truncate-set1**

First truncate SET1 to length of SET2.

```console
$ echo "Hello, World!" | tr -t 'a-z' 'A-Z'
HELLO, WORLD!
```

## Usage Examples

### Converting lowercase to uppercase

```console
$ echo "hello world" | tr 'a-z' 'A-Z'
HELLO WORLD
```

### Removing all digits from text

```console
$ echo "Phone: 123-456-7890" | tr -d '0-9'
Phone: --
```

### Translating spaces to newlines

```console
$ echo "one two three" | tr ' ' '\n'
one
two
three
```

### Removing all non-printable characters

```console
$ cat binary_file | tr -cd '[:print:]\n' > cleaned_file
```

### Squeezing multiple newlines into one

```console
$ cat file.txt | tr -s '\n'
```

## Tips:

### Use Character Classes

`tr` supports POSIX character classes like `[:alnum:]`, `[:alpha:]`, `[:digit:]`, which make it easier to work with groups of characters.

```console
$ echo "Hello123" | tr '[:digit:]' 'x'
Helloxxx
```

### Combine Options for Complex Transformations

Combine options like `-d` and `-c` to perform more complex operations, such as keeping only specific characters.

```console
$ echo "user@example.com" | tr -cd '[:alnum:]@.\n'
user@example.com
```

### Escape Special Characters

Remember to escape special characters like newlines (`\n`), tabs (`\t`), or backslashes (`\\`) when using them in translation sets.

### Pipe with Other Commands

`tr` works best in pipelines with other commands like `grep`, `sed`, or `awk` for more complex text processing.

## Frequently Asked Questions

#### Q1. How do I convert a file to uppercase?
A. Use `cat file.txt | tr 'a-z' 'A-Z'` or `tr 'a-z' 'A-Z' < file.txt`.

#### Q2. How can I remove all whitespace from a file?
A. Use `tr -d '[:space:]'` to remove all whitespace characters.

#### Q3. Can tr replace strings or just single characters?
A. `tr` only works on single characters, not strings. For string replacement, use `sed` instead.

#### Q4. How do I translate multiple characters to a single character?
A. Use `tr 'abc' 'x'` to translate a, b, and c all to x.

#### Q5. How can I count unique characters in a file?
A. Use `tr -d '\n' < file.txt | fold -w1 | sort | uniq -c`.

## References

https://www.gnu.org/software/coreutils/manual/html_node/tr-invocation.html

## Revisions

- 2025/05/05 First revision