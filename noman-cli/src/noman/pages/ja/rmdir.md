# rmdir コマンド

ファイルシステムから空のディレクトリを削除します。

## 概要

`rmdir` コマンドはファイルシステムから空のディレクトリを削除します。ディレクトリとその内容を削除できる `rm -r` とは異なり、`rmdir` は指定されたディレクトリが完全に空である場合にのみ成功します。

## オプション

### **-p, --parents**

ディレクトリとその祖先を削除します。例えば、`rmdir -p a/b/c` は `rmdir a/b/c a/b a` と同様です。

```console
$ mkdir -p test/nested/dir
$ rmdir -p test/nested/dir
$ ls test
ls: cannot access 'test': No such file or directory
```

### **-v, --verbose**

処理されるすべてのディレクトリに対して診断メッセージを出力します。

```console
$ mkdir empty_dir
$ rmdir -v empty_dir
rmdir: removing directory, 'empty_dir'
```

### **--ignore-fail-on-non-empty**

ディレクトリが空でないことだけが原因で発生する失敗を無視します。

```console
$ mkdir dir_with_file
$ touch dir_with_file/file.txt
$ rmdir --ignore-fail-on-non-empty dir_with_file
$ ls
dir_with_file
```

## 使用例

### 単一の空ディレクトリの削除

```console
$ mkdir empty_dir
$ rmdir empty_dir
$ ls
[empty_dirはリストに表示されなくなる]
```

### 入れ子になった空ディレクトリの削除

```console
$ mkdir -p parent/child/grandchild
$ rmdir -p parent/child/grandchild
$ ls
[parentディレクトリとそのサブディレクトリが削除される]
```

### 空でないディレクトリの削除を試みる

```console
$ mkdir non_empty
$ touch non_empty/file.txt
$ rmdir non_empty
rmdir: failed to remove 'non_empty': Directory not empty
```

## ヒント:

### 空でないディレクトリには rm -r を使用する

ファイルを含むディレクトリを削除する必要がある場合は、`rmdir` の代わりに `rm -r directory_name` を使用します。このコマンドはディレクトリ内のすべてを再帰的に削除するため、注意して使用してください。

### find と組み合わせて複数の空ディレクトリを削除する

`find` と `rmdir` を使用して、一度に複数の空ディレクトリを削除できます：
```console
$ find . -type d -empty -exec rmdir {} \;
```

### 削除前に確認する

ディレクトリが空かどうか不明な場合は、削除を試みる前に `ls -la directory_name` を使用して内容を確認してください。

## よくある質問

#### Q1. `rmdir` と `rm -r` の違いは何ですか？
A. `rmdir` は空のディレクトリのみを削除しますが、`rm -r` はディレクトリとその内容をすべて再帰的に削除します。

#### Q2. ファイルを含むディレクトリを削除するにはどうすればよいですか？
A. この目的には `rmdir` を使用できません。代わりに `rm -r directory_name` を使用してください。

#### Q3. `rmdir` で複数のディレクトリを一度に削除できますか？
A. はい、引数として複数のディレクトリ名を指定できます：`rmdir dir1 dir2 dir3`。

#### Q4. 存在しないディレクトリを削除しようとするとどうなりますか？
A. `rmdir` はディレクトリが存在しないことを示すエラーメッセージを表示します。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/rmdir-invocation.html

## 改訂履歴

- 2025/05/05 初版