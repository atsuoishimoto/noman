# date command

Display or set the system date and time.

## Overview

The `date` command displays the current date and time in various formats. It can also be used to set the system date and time when run with superuser privileges. The command is highly customizable, allowing output in different formats through format specifiers.

## Options

### **-d, --date=STRING**

Display time described by STRING, not 'now'

```console
$ date -d "next Thursday"
Thu May 12 00:00:00 EDT 2025
```

### **-f, --file=DATEFILE**

Like --date; once for each line of DATEFILE

```console
$ echo "2025-01-01" > dates.txt
$ echo "2025-12-25" >> dates.txt
$ date -f dates.txt
Wed Jan  1 00:00:00 EST 2025
Thu Dec 25 00:00:00 EST 2025
```

### **-I[TIMESPEC], --iso-8601[=TIMESPEC]**

Output date/time in ISO 8601 format. TIMESPEC='date' for date only, 'hours', 'minutes', 'seconds', or 'ns'

```console
$ date -I
2025-05-05
$ date -Iseconds
2025-05-05T10:30:45-04:00
```

### **-R, --rfc-email**

Output date and time in RFC 5322 format (e.g., Mon, 14 Aug 2006 02:34:56 -0600)

```console
$ date -R
Mon, 05 May 2025 10:30:45 -0400
```

### **-r, --reference=FILE**

Display the last modification time of FILE

```console
$ date -r /etc/passwd
Mon May  5 08:15:30 EDT 2025
```

### **-u, --utc, --universal**

Print or set Coordinated Universal Time (UTC)

```console
$ date -u
Mon May  5 14:30:45 UTC 2025
```

### **+FORMAT**

Format the output using the specified FORMAT string

```console
$ date +"%Y-%m-%d %H:%M:%S"
2025-05-05 10:30:45
```

## Usage Examples

### Display date in a custom format

```console
$ date "+Today is %A, %B %d, %Y"
Today is Monday, May 05, 2025
```

### Calculate a date in the future

```console
$ date -d "30 days"
Wed Jun  4 10:30:45 EDT 2025
```

### Display Unix timestamp (seconds since epoch)

```console
$ date +%s
1746724245
```

### Convert Unix timestamp to human-readable date

```console
$ date -d @1609459200
Fri Jan  1 00:00:00 EST 2021
```

## Tips

### Common Format Specifiers

- `%Y`: Year (e.g., 2025)
- `%m`: Month (01-12)
- `%d`: Day of month (01-31)
- `%H`: Hour (00-23)
- `%M`: Minute (00-59)
- `%S`: Second (00-60)
- `%A`: Full weekday name (e.g., Monday)
- `%B`: Full month name (e.g., January)

### Setting the System Date

To set the system date (requires root privileges):

```console
$ sudo date MMDDhhmm[[CC]YY][.ss]
```

For example, to set May 5, 2025, 10:30:45:

```console
$ sudo date 050510302025.45
```

### Backup Timestamps

When creating backup files, include a timestamp in the filename:

```console
$ cp important.txt important.txt.$(date +%Y%m%d_%H%M%S)
```

## Frequently Asked Questions

#### Q1. How do I display just the current time?
A. Use `date +%T` or `date +"%H:%M:%S"`.

#### Q2. How can I get yesterday's date?
A. Use `date -d "yesterday"` or `date -d "1 day ago"`.

#### Q3. How do I display the date in UTC/GMT?
A. Use `date -u` to display the current time in UTC.

#### Q4. How can I calculate a date that's X days from now?
A. Use `date -d "+X days"` where X is the number of days.

#### Q5. How do I get the Unix timestamp (epoch time)?
A. Use `date +%s` to display seconds since January 1, 1970.

## References

https://www.gnu.org/software/coreutils/manual/html_node/date-invocation.html

## Revisions

- 2025/05/05 First revision