# jq command

Process and transform JSON data with a lightweight command-line processor.

## Overview

`jq` is a flexible command-line JSON processor that allows you to slice, filter, map, and transform structured data. It works like `sed` for JSON data - you can use it to extract specific fields, transform values, filter arrays, and format output, all from the command line or scripts.

## Options

### **-r, --raw-output**

Outputs raw strings rather than JSON encoded strings (removes quotes).

```console
$ echo '{"name": "John"}' | jq -r '.name'
John
```

### **-c, --compact-output**

Produces compact output instead of pretty-printed.

```console
$ echo '{"name": "John", "age": 30}' | jq -c '.'
{"name":"John","age":30}
```

### **-s, --slurp**

Reads all inputs into an array and applies the filter to it.

```console
$ echo '{"id": 1}' > file1.json
$ echo '{"id": 2}' > file2.json
$ jq -s '.' file1.json file2.json
[
  {
    "id": 1
  },
  {
    "id": 2
  }
]
```

### **-f, --from-file FILENAME**

Reads filter from a file.

```console
$ echo '.name' > filter.jq
$ echo '{"name": "John", "age": 30}' | jq -f filter.jq
"John"
```

### **-n, --null-input**

Doesn't read any input, and jq constructs its own.

```console
$ jq -n '{"created_at": now | todate}'
{
  "created_at": "2025-05-05T00:00:00Z"
}
```

## Usage Examples

### Extract a specific field

```console
$ echo '{"user": {"name": "John", "age": 30}}' | jq '.user.name'
"John"
```

### Filter an array

```console
$ echo '{"users": [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]}' | jq '.users[] | select(.age > 28)'
{
  "name": "John",
  "age": 30
}
```

### Transform data structure

```console
$ echo '{"users": [{"name": "John"}, {"name": "Jane"}]}' | jq '.users | map({username: .name})'
[
  {
    "username": "John"
  },
  {
    "username": "Jane"
  }
]
```

### Combine with curl to process API responses

```console
$ curl -s 'https://api.example.com/users' | jq '.[] | {id, name}'
{
  "id": 1,
  "name": "John Doe"
}
{
  "id": 2,
  "name": "Jane Smith"
}
```

## Tips

### Use Pipes for Complex Transformations

Chain multiple filters with pipes to perform complex transformations step by step:

```console
$ echo '{"users": [{"name": "John", "roles": ["admin", "user"]}, {"name": "Jane", "roles": ["user"]}]}' | jq '.users[] | select(.roles | contains(["admin"])) | .name'
"John"
```

### Create New JSON Objects

Use object construction syntax to create new JSON structures:

```console
$ echo '{"first": "John", "last": "Doe"}' | jq '{full_name: "\(.first) \(.last)", username: .first | ascii_downcase}'
{
  "full_name": "John Doe",
  "username": "john"
}
```

### Use Built-in Functions

`jq` has many built-in functions for string manipulation, array operations, and more:

```console
$ echo '[1, 2, 3, 4, 5]' | jq 'map(. * 2) | add'
30
```

## Frequently Asked Questions

#### Q1. How do I extract a specific field from JSON?
A. Use the dot notation: `jq '.fieldname'` or for nested fields: `jq '.parent.child'`.

#### Q2. How do I remove quotes from the output?
A. Use the `-r` or `--raw-output` option: `jq -r '.field'`.

#### Q3. How do I filter an array based on a condition?
A. Use `select()`: `jq '.items[] | select(.price > 10)'`.

#### Q4. How do I format dates in jq?
A. Use the `strftime` function: `jq '.timestamp | fromdate | strftime("%Y-%m-%d")'`.

#### Q5. How do I iterate through an array?
A. Use the array iterator: `jq '.items[]'` to process each element.

## References

https://stedolan.github.io/jq/manual/

## Revisions

- 2025/05/05 First revision