# rg command

Search for patterns in files using regular expressions, with support for recursive directory traversal.

## Overview

`rg` (ripgrep) is a line-oriented search tool that recursively searches the current directory for a regex pattern. It respects gitignore rules by default and is designed to be faster than other search tools like grep, ag, or ack. Ripgrep automatically skips hidden files, binary files, and files listed in .gitignore unless explicitly told not to.

## Options

### **-i, --ignore-case**

Makes the search case insensitive.

```console
$ rg -i "function"
src/main.js:10:function calculateTotal(items) {
src/utils.js:5:Function to handle API responses
```

### **-v, --invert-match**

Show lines that don't match the given pattern.

```console
$ rg -v "TODO" todo.txt
These items are completed
Remember to check email
```

### **-w, --word-regexp**

Only show matches surrounded by word boundaries.

```console
$ rg -w "log"
logger.js:15:  log("User logged in");
logger.js:20:  log("Error occurred");
```

### **-c, --count**

Only show the count of matching lines per file.

```console
$ rg -c "error" *.log
app.log:15
system.log:3
```

### **-l, --files-with-matches**

Only show the paths with at least one match.

```console
$ rg -l "TODO"
src/main.js
docs/roadmap.md
```

### **-n, --line-number**

Show line numbers (enabled by default).

```console
$ rg -n "function"
src/main.js:10:function calculateTotal(items) {
src/utils.js:15:function formatDate(date) {
```

### **--no-ignore**

Don't respect ignore files (.gitignore, .ignore, etc.). This option tells ripgrep to search in files and directories that would normally be ignored, such as those specified in .gitignore files.

```console
$ rg --no-ignore "password"
node_modules/config.js:5:  password: "dummy_password",
.git/config:10:  password = hunter2
```

### **-A, --after-context NUM**

Show NUM lines after each match.

```console
$ rg -A 2 "class User"
src/models.js:10:class User {
src/models.js:11:  constructor(name, email) {
src/models.js:12:    this.name = name;
```

### **-B, --before-context NUM**

Show NUM lines before each match.

```console
$ rg -B 1 "throw new Error"
src/api.js:24:  if (!response.ok) {
src/api.js:25:    throw new Error('API request failed');
```

### **-C, --context NUM**

Show NUM lines before and after each match.

```console
$ rg -C 1 "TODO"
src/main.js:19:function processData(data) {
src/main.js:20:  // TODO: Implement validation
src/main.js:21:  return transform(data);
```

### **-o, --only-matching**

Print only the matched parts of a line.

```console
$ rg -o "TODO.*"
src/main.js:TODO: Implement validation
docs/roadmap.md:TODO: Add authentication
```

### **-m, --max-count NUM**

Only show up to NUM matches for each file.

```console
$ rg -m 2 "error" log.txt
log.txt:15:error: connection failed
log.txt:23:error: timeout occurred
```

### **--max-depth NUM**

Limit the depth of directory traversal to NUM levels.

```console
$ rg --max-depth 1 "TODO"
./main.js:20:  // TODO: Implement validation
```

## Usage Examples

### Search in specific file types

```console
$ rg -t js "useState"
src/components/Form.js:3:import { useState } from 'react';
src/components/Counter.js:5:  const [count, setCount] = useState(0);
```

### Search and replace with ripgrep and sed

```console
$ rg -l "oldFunction" | xargs sed -i 's/oldFunction/newFunction/g'
```

### Search with glob patterns

```console
$ rg "error" --glob "*.{js,ts}"
src/utils.js:25:  console.error("Connection failed");
src/api.ts:42:  throw new Error("Invalid response");
```

### Exclude directories from search

```console
$ rg "TODO" --glob "!node_modules"
src/main.js:20:  // TODO: Implement validation
docs/roadmap.md:15:TODO: Add authentication
```

### Show only filenames with matching patterns

```console
$ rg -l "password"
config.js
auth.js
```

### Search only in current directory (no recursion)

```console
$ rg --max-depth 0 "function"
main.js:10:function calculateTotal(items) {
```

## Tips:

### Use Fixed Strings for Faster Searches

When searching for literal text rather than regex patterns, use `-F` or `--fixed-strings` for better performance:

```console
$ rg -F "React.useState" src/
```

### Combine with Other Tools

Pipe ripgrep results to other commands for additional processing:

```console
$ rg -n "TODO" | sort -k1,1 | less
```

### Search Hidden Files

By default, ripgrep ignores hidden files and directories. Use `-. or --hidden` to include them:

```console
$ rg --hidden "password" ~/
```

### Use Smart Case

The `-S` or `--smart-case` option makes searches case-insensitive if the pattern is all lowercase, but case-sensitive otherwise:

```console
$ rg -S "function" # Case-insensitive
$ rg -S "Function" # Case-sensitive
```

## Frequently Asked Questions

#### Q1. How is ripgrep different from grep?
A. Ripgrep is generally faster than grep, respects .gitignore files by default, automatically skips binary files, and has better Unicode support.

#### Q2. How do I search for a pattern that includes special regex characters?
A. Use `-F` or `--fixed-strings` to search for literal text, or escape the special characters with backslashes.

#### Q3. How can I search for files that don't contain a pattern?
A. Use `-L` or `--files-without-match` to find files that don't contain the pattern.

#### Q4. How do I make ripgrep follow symbolic links?
A. Use `-L` or `--follow` to follow symbolic links when searching.

#### Q5. What does the --no-ignore option do?
A. The `--no-ignore` option tells ripgrep to search files and directories that would normally be ignored due to .gitignore, .ignore, or similar files. This is useful when you need to search in directories like node_modules or other typically ignored locations.

#### Q6. How can I search only in the current directory without recursing into subdirectories?
A. Use `--max-depth 0` to limit the search to only the current directory without recursing into subdirectories.

#### Q7. How do I show only the matching filenames?
A. Use `-l` or `--files-with-matches` to show only the paths of files containing matches.

## References

https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md

## Revisions

- 2025/05/06 Added --max-depth and -m options, expanded usage examples to include non-recursive search, added new FAQs about limiting directory depth and showing only filenames.
- 2025/05/06 Added -o, --only-matching option.
- 2025/05/05 Added explanation for --no-ignore option and expanded FAQs.