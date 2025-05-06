# install コマンド

ファイルをコピーして属性を設定します。

## 概要

`install` コマンドは、ファイルを指定した宛先にコピーしながら、権限、所有権、タイムスタンプを設定します。ソフトウェアのインストール中にファイルを適切な場所に配置するために、スクリプトやMakefileでよく使用されます。`cp`、`chmod`、`chown`、`mkdir` の機能を1つのコマンドに統合しています。

## オプション

### **-d, --directory**

ファイルをコピーする代わりにディレクトリを作成します。

```console
$ install -d /tmp/new_directory
$ ls -ld /tmp/new_directory
drwxr-xr-x 2 user user 4096 May 5 10:00 /tmp/new_directory
```

### **-m, --mode=MODE**

デフォルトの rwxr-xr-x ではなく、指定した権限モード（chmod と同様）を設定します。

```console
$ install -m 644 source.txt /tmp/
$ ls -l /tmp/source.txt
-rw-r--r-- 1 user user 123 May 5 10:01 /tmp/source.txt
```

### **-o, --owner=OWNER**

所有者を設定します（スーパーユーザーのみ）。

```console
$ sudo install -o root source.txt /tmp/
$ ls -l /tmp/source.txt
-rwxr-xr-x 1 root user 123 May 5 10:02 /tmp/source.txt
```

### **-g, --group=GROUP**

グループ所有権を設定します（スーパーユーザーのみ）。

```console
$ sudo install -g wheel source.txt /tmp/
$ ls -l /tmp/source.txt
-rwxr-xr-x 1 user wheel 123 May 5 10:03 /tmp/source.txt
```

### **-s, --strip**

実行ファイルからシンボルテーブルを削除します。

```console
$ install -s executable /tmp/
```

### **-v, --verbose**

作成される各ディレクトリの名前を表示します。

```console
$ install -v source.txt /tmp/
'source.txt' -> '/tmp/source.txt'
```

### **-b, --backup[=CONTROL]**

既存の宛先ファイルごとにバックアップを作成します。

```console
$ install -b source.txt /tmp/
$ ls -l /tmp/
-rwxr-xr-x 1 user user 123 May 5 10:04 source.txt
-rwxr-xr-x 1 user user 123 May 5 10:03 source.txt~
```

### **-c, --compare**

ソースファイルと宛先ファイルが同じ場合はコピーしません。

```console
$ install -c source.txt /tmp/
```

## 使用例

### 特定の権限でファイルをインストールする

```console
$ install -m 755 myscript.sh /usr/local/bin/
```

### 複数のディレクトリを一度に作成する

```console
$ install -d /tmp/dir1 /tmp/dir2 /tmp/dir3
```

### 特定の所有者とグループでファイルをインストールする

```console
$ sudo install -o www-data -g www-data -m 644 config.php /var/www/html/
```

### 複数のファイルをディレクトリにインストールする

```console
$ install -m 644 *.txt /tmp/
```

## ヒント:

### デプロイメントスクリプトでの使用

`install` コマンドは、権限と所有権を一度に処理するため、デプロイメントスクリプトに最適です。個別の `cp` と `chmod` コマンドを使用するよりも効率的です。

### 親ディレクトリの作成

`mkdir -p` とは異なり、`install -d` は親ディレクトリを作成しません。ネストされたディレクトリ構造を作成する必要がある場合は、最初に親ディレクトリを作成するか、代わりに `mkdir -p` を使用してください。

### ファイル属性の保存

元のファイルの属性を保持したい場合は、`install -p` を使用します。これにより、ソースファイルの変更時間、アクセス時間、モードが保持されます。

### バックアップ戦略

バックアップに `-b` を使用する場合、`--suffix=SUFFIX` でバックアップの接尾辞を制御したり、`--backup=CONTROL` でバックアップ方法を設定したりできます（CONTROL は 'none'、'numbered'、'existing'、または 'simple' のいずれか）。

## よくある質問

#### Q1. `install` と `cp` の違いは何ですか？
A. `install` はコピーと権限・所有権の設定を1つのコマンドで組み合わせますが、`cp` はファイルのコピーのみを行います。`install` はソフトウェアのインストール用に設計されていますが、`cp` は汎用的なコピーコマンドです。

#### Q2. `install` は `mkdir` のようにディレクトリを作成できますか？
A. はい、`-d` オプションを使用すると、`install` は特定の権限を持つディレクトリを一度に作成できます。

#### Q3. `install` はファイルのタイムスタンプを保持しますか？
A. デフォルトでは、`install` はタイムスタンプを現在の時刻に更新します。元のタイムスタンプを保持するには、`-p` オプションを使用してください。

#### Q4. `install` を使用してディレクトリを再帰的にコピーできますか？
A. いいえ、`install` には `cp -r` のような再帰的オプションはありません。最初にディレクトリ構造を作成し、その後ファイルをインストールする必要があります。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/install-invocation.html

## 改訂履歴

- 2025/05/05 初版