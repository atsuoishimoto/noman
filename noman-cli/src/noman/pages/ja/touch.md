# touchコマンド

ファイルのタイムスタンプを作成または更新します。

## 概要

`touch`コマンドは、存在しないファイルを空のファイルとして作成したり、既存のファイルのアクセスタイムスタンプと変更タイムスタンプを現在の時刻に更新したりします。一般的に、空のファイルを作成したり、ファイルの内容を変更せずにタイムスタンプを更新したりするために使用されます。

## オプション

### **-a**

アクセス時間のみを変更します。

```console
$ touch -a file.txt
```

### **-c, --no-create**

存在しないファイルを作成しません。

```console
$ touch -c nonexistent.txt
```

### **-m**

変更時間のみを変更します。

```console
$ touch -m file.txt
```

### **-r, --reference=FILE**

現在の時刻の代わりに、参照ファイルのタイムスタンプを使用します。

```console
$ touch -r reference.txt target.txt
```

### **-t STAMP**

現在の時刻の代わりに指定した時刻を使用します。形式: [[CC]YY]MMDDhhmm[.ss]

```console
$ touch -t 202505051200 file.txt
```

### **-d, --date=STRING**

STRINGを解析し、現在の時刻の代わりに使用します。

```console
$ touch -d "2025-05-05 12:00:00" file.txt
```

## 使用例

### 複数の空ファイルを作成する

```console
$ touch file1.txt file2.txt file3.txt
```

### タイムスタンプを現在の時刻に更新する

```console
$ touch existing_file.txt
$ ls -l existing_file.txt
-rw-r--r-- 1 user group 0 May  5 10:30 existing_file.txt
```

### 特定のタイムスタンプを設定する

```console
$ touch -d "yesterday" file.txt
$ ls -l file.txt
-rw-r--r-- 1 user group 0 May  4 10:30 file.txt
```

### 別のファイルのタイムスタンプを使用する

```console
$ touch -r source.txt destination.txt
$ ls -l source.txt destination.txt
-rw-r--r-- 1 user group 0 May  5 09:15 source.txt
-rw-r--r-- 1 user group 0 May  5 09:15 destination.txt
```

## ヒント:

### ディレクトリパスでファイルを作成する

まだ存在しないディレクトリにファイルを作成する必要がある場合は、まず`mkdir -p`を使用します：

```console
$ mkdir -p path/to/directory
$ touch path/to/directory/file.txt
```

### パターンを使って一括でファイルを作成する

ブレース展開を使用して、パターンに従った複数のファイルを作成できます：

```console
$ touch file{1..5}.txt
$ ls
file1.txt file2.txt file3.txt file4.txt file5.txt
```

### 新しいファイルを作成せずにタイムスタンプを更新する

既存のファイルのタイムスタンプのみを更新したい場合は、`-c`オプションを使用して新しいファイルの作成を防ぎます：

```console
$ touch -c *.txt
```

## よくある質問

#### Q1. 存在しないファイルをtouchするとどうなりますか？
A. デフォルトでは、`touch`はその名前の空のファイルを作成します。

#### Q2. アクセス時間を変更せずに変更時間だけを更新するにはどうすればよいですか？
A. `touch -m ファイル名`を使用して、変更時間のみを更新します。

#### Q3. ファイルのタイムスタンプを特定の日時に設定できますか？
A. はい、`touch -d "YYYY-MM-DD HH:MM:SS" ファイル名`または`touch -t YYYYMMDDhhmm.ss ファイル名`を使用します。

#### Q4. touchはファイルの内容を変更しますか？
A. いいえ、`touch`は空のファイルを作成するか、タイムスタンプを更新するだけで、既存のファイルの内容を変更することはありません。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/touch-invocation.html

## 改訂履歴

- 2025/05/05 初版