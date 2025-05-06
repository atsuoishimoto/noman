# realpath コマンド

解決された絶対ファイルパスを表示します。

## 概要

`realpath` コマンドはシンボリックリンクと相対パスの要素を解決して、ファイルやディレクトリの絶対的な正規パスを表示します。すべてのシンボリックリンクをたどり、/./ や /../ への参照を解決し、余分な '/' 文字を削除して標準化されたパスを生成します。

## オプション

### **-e, --canonicalize-existing**

パスのすべての要素が存在する必要があります

```console
$ realpath -e /etc/hosts
/etc/hosts

$ realpath -e /nonexistent/file
realpath: /nonexistent/file: No such file or directory
```

### **-m, --canonicalize-missing**

パスの要素が存在する必要はなく、ディレクトリである必要もありません

```console
$ realpath -m /nonexistent/file
/nonexistent/file
```

### **-L, --logical**

シンボリックリンクの前に '..' 要素を解決します

```console
$ realpath -L /etc/alternatives/../hosts
/etc/hosts
```

### **-P, --physical**

遭遇したシンボリックリンクを解決します（デフォルト）

```console
$ realpath -P /etc/alternatives/../hosts
/etc/hosts
```

### **-q, --quiet**

ほとんどのエラーメッセージを抑制します

```console
$ realpath -q /nonexistent/file
```

### **-s, --strip, --no-symlinks**

シンボリックリンクを展開しません

```console
$ ln -s /etc/hosts symlink_to_hosts
$ realpath -s symlink_to_hosts
/path/to/current/directory/symlink_to_hosts
```

### **-z, --zero**

各出力行を改行ではなくNUL文字で終了します

```console
$ realpath -z /etc/hosts | hexdump -C
00000000  2f 65 74 63 2f 68 6f 73  74 73 00              |/etc/hosts.|
0000000b
```

## 使用例

### 相対パスの解決

```console
$ cd /usr/local
$ realpath bin/../share
/usr/local/share
```

### シンボリックリンクの解決

```console
$ ln -s /etc/hosts my_hosts
$ realpath my_hosts
/etc/hosts
```

### 複数のパスの処理

```console
$ realpath /etc/hosts /etc/passwd /etc/group
/etc/hosts
/etc/passwd
/etc/group
```

## ヒント:

### スクリプトで信頼性の高いファイルパスに使用する

シェルスクリプトを書く際に、`realpath` を使用して絶対パスで作業していることを確認すると、スクリプトがディレクトリを変更したときに相対パスで問題が発生するのを防ぐのに役立ちます。

### 他のコマンドと組み合わせる

絶対パスが必要な場合は、`realpath` の出力を他のコマンドにパイプします：
```console
$ cd $(realpath ~/Documents)
```

### パスが存在するかチェックする

操作を試みる前にパスが存在することを確認するには `-e` を使用します。

## よくある質問

#### Q1. `realpath` と `readlink -f` の違いは何ですか？
A. 似ていますが、`realpath` は GNU coreutils の一部であり、より多くのオプションがあります。`readlink -f` は様々なUnixシステムでより一般的に利用可能です。

#### Q2. シンボリックリンクを解決せずに絶対パスを取得するにはどうすればよいですか？
A. シンボリックリンクを解決せずに絶対パスを取得するには、`realpath -s` または `realpath --no-symlinks` を使用します。

#### Q3. `realpath` はファイル名の空白を処理できますか？
A. はい、`realpath` はファイル名の空白や特殊文字を適切に処理します。

#### Q4. ファイルを含むディレクトリを取得するために `realpath` を使用するにはどうすればよいですか？
A. `dirname` と `realpath` を組み合わせて使用します：`dirname $(realpath filename)`

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/realpath-invocation.html

## 改訂履歴

- 2025/05/05 初版