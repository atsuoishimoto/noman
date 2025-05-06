# sort command

Sort lines of text files.

## Overview

The `sort` command arranges lines of text files or standard input in alphabetical, numerical, or reverse order. It can merge multiple sorted files, remove duplicate lines, and perform various other sorting operations based on specific fields or characters within each line.

## Options

### **-n, --numeric-sort**

Sort numerically (by numeric value) instead of alphabetically

```console
$ sort -n numbers.txt
1
2
10
20
100
```

### **-r, --reverse**

Reverse the result of comparisons

```console
$ sort -r names.txt
Zack
Victor
Susan
Alice
```

### **-f, --ignore-case**

Ignore case when sorting

```console
$ sort -f mixed_case.txt
Alice
apple
Banana
cat
Dog
```

### **-k, --key=POS1[,POS2]**

Sort via a key starting at POS1 and ending at POS2

```console
$ sort -k 2 employees.txt
101 Adams 5000
103 Brown 4500
102 Clark 5500
```

### **-t, --field-separator=SEP**

Use SEP as the field separator instead of non-blank to blank transition

```console
$ sort -t: -k3,3n /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
```

### **-u, --unique**

Output only the first of an equal run (remove duplicates)

```console
$ sort -u duplicates.txt
apple
banana
orange
```

### **-M, --month-sort**

Compare as months (JAN < FEB < ... < DEC)

```console
$ sort -M months.txt
Jan
Feb
Mar
Apr
Dec
```

### **-h, --human-numeric-sort**

Compare human readable numbers (e.g., 2K, 1G)

```console
$ sort -h sizes.txt
10K
1M
2M
1G
```

### **-R, --random-sort**

Sort by random hash of keys

```console
$ sort -R names.txt
Victor
Alice
Susan
Zack
```

## Usage Examples

### Sorting a file numerically

```console
$ cat numbers.txt
10
2
100
1
20
$ sort -n numbers.txt
1
2
10
20
100
```

### Sorting by specific column with custom delimiter

```console
$ cat data.csv
John,25,Engineer
Alice,30,Doctor
Bob,22,Student
$ sort -t, -k2,2n data.csv
Bob,22,Student
John,25,Engineer
Alice,30,Doctor
```

### Merging multiple sorted files

```console
$ sort -m file1.txt file2.txt > merged.txt
```

### Removing duplicates and saving to a new file

```console
$ sort -u input.txt > output.txt
```

## Tips

### Sort and Remove Duplicates in One Step
Use `sort -u` to sort a file and remove duplicate lines in a single operation, which is more efficient than using `sort | uniq`.

### Check if a File is Already Sorted
Use `sort -c filename` to check if a file is already sorted without actually outputting anything. It will return an error message if the file is not sorted.

### Memory Considerations for Large Files
For very large files, use `sort -T /tmp` to specify a temporary directory with sufficient space, or `sort -S 1G` to allocate more memory for sorting.

### Stable Sort
Use `sort -s` for a stable sort, which preserves the original order of lines with equal keys. This is useful when you want to maintain the original ordering of equivalent items.

## Frequently Asked Questions

#### Q1. How do I sort a file in reverse order?
A. Use `sort -r filename` to sort in reverse (descending) order.

#### Q2. How can I sort a CSV file by a specific column?
A. Use `sort -t, -k2,2 filename.csv` to sort by the second column, where `-t,` specifies the comma as the field separator.

#### Q3. How do I sort IP addresses correctly?
A. Use `sort -V` for version sorting, which works well for IP addresses: `sort -V ip_addresses.txt`.

#### Q4. How can I sort by multiple fields?
A. Specify multiple keys: `sort -k1,1 -k2,2n filename` sorts first by field 1 alphabetically, then by field 2 numerically.

#### Q5. How do I sort a file with a header and keep the header at the top?
A. Use: `(head -1 file.txt; tail -n +2 file.txt | sort) > sorted_file.txt`

## References

https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html

## Revisions

- 2025/05/05 First revision