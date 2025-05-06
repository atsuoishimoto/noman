# seq command

Print a sequence of numbers.

## Overview

The `seq` command generates a sequence of numbers from a starting point to an ending point, with an optional increment. It's commonly used in shell scripts for creating loops, generating test data, or creating numbered lists.

## Options

### **-f, --format=FORMAT**

Use printf style floating-point FORMAT

```console
$ seq -f "Number: %.2f" 1 3
Number: 1.00
Number: 2.00
Number: 3.00
```

### **-s, --separator=STRING**

Use STRING to separate numbers (default is newline)

```console
$ seq -s ", " 1 5
1, 2, 3, 4, 5
```

### **-w, --equal-width**

Equalize width by padding with leading zeros

```console
$ seq -w 8 12
08
09
10
11
12
```

### **-t, --format-separator=SEPARATOR**

Use SEPARATOR as output separator (default: \n)

```console
$ seq -t "," 1 3
1,2,3,
```

## Usage Examples

### Basic sequence generation

```console
$ seq 5
1
2
3
4
5
```

### Specifying start, increment, and end

```console
$ seq 2 2 10
2
4
6
8
10
```

### Creating a comma-separated list

```console
$ seq -s, 1 5
1,2,3,4,5
```

### Using seq in a for loop

```console
$ for i in $(seq 1 3); do echo "Processing item $i"; done
Processing item 1
Processing item 2
Processing item 3
```

## Tips:

### Use seq for Counting Down

To generate a descending sequence, specify a negative increment:

```console
$ seq 5 -1 1
5
4
3
2
1
```

### Combine with xargs for Parallel Processing

Use seq with xargs to run multiple parallel processes:

```console
$ seq 1 10 | xargs -P4 -I{} echo "Processing job {}"
```

### Create Formatted Sequences

For more complex formatting, combine with printf:

```console
$ seq 1 3 | xargs -I{} printf "Item %03d\n" {}
Item 001
Item 002
Item 003
```

## Frequently Asked Questions

#### Q1. How do I generate a sequence with decimal numbers?
A. Use the `-f` option with a floating-point format: `seq -f "%.1f" 1 0.5 3` will generate 1.0, 1.5, 2.0, 2.5, 3.0.

#### Q2. How can I create a sequence with leading zeros?
A. Use the `-w` option: `seq -w 1 10` will pad numbers with leading zeros to make them equal width.

#### Q3. How do I use seq to create a range of IP addresses?
A. You can combine seq with other commands: `for i in $(seq 1 5); do echo "192.168.1.$i"; done`

#### Q4. Can seq handle large numbers?
A. Yes, seq can handle large integers within your system's numerical limits.

## References

https://www.gnu.org/software/coreutils/manual/html_node/seq-invocation.html

## Revisions

- 2025/05/05 First revision