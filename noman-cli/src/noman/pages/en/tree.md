# tree command

Display directory contents in a hierarchical tree structure.

## Overview

The `tree` command recursively lists the contents of directories in a tree-like format, showing the relationships between files and directories. It provides a visual representation of directory structures, making it easier to understand the organization of files and subdirectories.

## Options

### **-a**

Display all files, including hidden files (those starting with a dot)

```console
$ tree -a
.
├── .git
│   ├── HEAD
│   ├── config
│   └── hooks
├── .gitignore
├── README.md
└── src
    ├── .env
    └── main.js

3 directories, 6 files
```

### **-d**

List directories only, not files

```console
$ tree -d
.
├── docs
├── node_modules
│   ├── express
│   └── lodash
└── src
    └── components

5 directories
```

### **-L, --level**

Limit the depth of directory recursion

```console
$ tree -L 2
.
├── docs
│   ├── api.md
│   └── usage.md
├── node_modules
│   ├── express
│   └── lodash
├── package.json
└── src
    ├── components
    └── index.js

5 directories, 4 files
```

### **-C**

Add colorization to the output

```console
$ tree -C
# Output will be colorized with directories, files, and executables in different colors
```

### **-p**

Print file type and permissions for each file

```console
$ tree -p
.
├── [drwxr-xr-x]  docs
│   ├── [-rw-r--r--]  api.md
│   └── [-rw-r--r--]  usage.md
├── [-rw-r--r--]  package.json
└── [drwxr-xr-x]  src
    └── [-rwxr-xr-x]  index.js

2 directories, 4 files
```

### **-s**

Print the size of each file

```console
$ tree -s
.
├── [       4096]  docs
│   ├── [        450]  api.md
│   └── [        890]  usage.md
├── [        1240]  package.json
└── [       4096]  src
    └── [         320]  index.js

2 directories, 4 files
```

### **-h**

Print the size in a more human-readable format

```console
$ tree -sh
.
├── [4.0K]  docs
│   ├── [450]   api.md
│   └── [890]   usage.md
├── [1.2K]  package.json
└── [4.0K]  src
    └── [320]   index.js

2 directories, 4 files
```

### **--filelimit n**

Do not descend directories that contain more than n entries

```console
$ tree --filelimit 10
# Will not show contents of directories with more than 10 files
```

## Usage Examples

### Basic directory listing

```console
$ tree
.
├── docs
│   ├── api.md
│   └── usage.md
├── package.json
└── src
    ├── components
    │   ├── Button.js
    │   └── Input.js
    └── index.js

3 directories, 5 files
```

### Limiting depth and showing file sizes

```console
$ tree -L 1 -sh
.
├── [4.0K]  docs
├── [1.2K]  package.json
└── [4.0K]  src

2 directories, 1 file
```

### Filtering by pattern

```console
$ tree -P "*.js"
.
├── docs
├── package.json
└── src
    ├── components
    │   ├── Button.js
    │   └── Input.js
    └── index.js

3 directories, 3 files
```

### Output to a file

```console
$ tree > directory_structure.txt
$ cat directory_structure.txt
.
├── docs
│   ├── api.md
│   └── usage.md
├── package.json
└── src
    ├── components
    │   ├── Button.js
    │   └── Input.js
    └── index.js

3 directories, 5 files
```

## Tips

### Exclude Version Control Directories

Use `tree -I "node_modules|.git"` to exclude specific directories like node_modules and .git from the output, making the tree more readable for project directories.

### Create ASCII Output for Documentation

Use `tree -A` to ensure ASCII characters are used instead of graphic characters, which is useful when creating documentation that needs to be displayed in environments with limited character support.

### Count Files and Directories

Use `tree --noreport` to suppress the file/directory report at the end if you just want the tree structure without the summary.

### Customize Output Format

Combine options like `-pugh` to show permissions, usernames, group names, and human-readable sizes all at once for a comprehensive directory listing.

## Frequently Asked Questions

#### Q1. How do I install tree on macOS?
A. You can install tree using Homebrew with the command `brew install tree`.

#### Q2. How can I exclude certain directories from the output?
A. Use the `-I` option followed by a pattern, e.g., `tree -I "node_modules|.git"` to exclude node_modules and .git directories.

#### Q3. How do I limit the depth of directories shown?
A. Use the `-L` option followed by a number, e.g., `tree -L 2` to show only two levels of directories.

#### Q4. Can tree output to a file instead of the terminal?
A. Yes, use redirection: `tree > output.txt` to save the output to a file.

#### Q5. How do I show hidden files?
A. Use the `-a` option: `tree -a` to show all files including hidden ones.

## References

https://linux.die.net/man/1/tree

## Revisions

- 2025/05/05 First revision