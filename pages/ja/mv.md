# mvコマンド

ファイルとディレクトリの移動（名前変更）を行います。

## 概要

`mv`コマンドはファイルやディレクトリをある場所から別の場所へ移動します。また、ファイルやディレクトリの名前を変更するためにも使用できます。ファイルシステムをまたいでファイルを移動する場合、`mv`はファイルをコピーして元のファイルを削除します。

## オプション

### **-f, --force**

確認を求めずに既存のファイルを上書きします。

```console
$ mv -f oldfile.txt newfile.txt
```

### **-i, --interactive**

既存のファイルを上書きする前に確認を求めます。

```console
$ mv -i oldfile.txt newfile.txt
mv: overwrite 'newfile.txt'? y
```

### **-n, --no-clobber**

既存のファイルを上書きしません。

```console
$ mv -n oldfile.txt newfile.txt
```

### **-v, --verbose**

実行内容を説明します。

```console
$ mv -v oldfile.txt newfile.txt
'oldfile.txt' -> 'newfile.txt'
```

### **-b, --backup**

既存の宛先ファイルごとにバックアップを作成します。

```console
$ mv -b oldfile.txt newfile.txt
```

## 使用例

### ファイルの名前変更

```console
$ mv oldname.txt newname.txt
```

### ファイルを別のディレクトリに移動

```console
$ mv file.txt /path/to/directory/
```

### 複数のファイルをディレクトリに移動

```console
$ mv file1.txt file2.txt file3.txt /path/to/directory/
```

### ディレクトリの移動と名前変更

```console
$ mv old_directory/ new_directory/
```

## ヒント:

### 誤った上書きを防止する

`mv -i`を使用して対話モードを有効にすると、既存のファイルを上書きする前に確認を求めます。これはスクリプトや複数のファイルを移動する際に特に便利です。

### 自動的にバックアップを作成する

重要なファイルを上書きする場合は、`mv -b`を使用して元のファイルのバックアップを作成します。これによりファイル名にチルダ(~)が付いたバックアップが作成されます。

### 隠しファイルの移動

隠しファイル（ドットで始まるファイル）を移動する場合は、混乱を避けるためにファイル名を明示的に指定してください：
```console
$ mv .hidden_file /new/location/
```

### ワイルドカードを慎重に使用する

ワイルドカードを使用する場合は、まず同じパターンで`ls`を使用して、どのファイルが移動されるかを確認してください：
```console
$ ls *.txt
$ mv *.txt /destination/
```

## よくある質問

#### Q1. `mv`と`cp`の違いは何ですか？
A. `mv`はファイルを移動（元の場所から削除）しますが、`cp`はファイルをコピー（元のファイルはそのまま）します。

#### Q2. 既存のファイルを上書きせずにファイルを移動するにはどうすればよいですか？
A. `mv -n source destination`を使用して、既存のファイルの上書きを防止します。

#### Q3. 複数のファイルを一度に移動できますか？
A. はい、複数のソースファイルを指定し、その後に宛先ディレクトリを指定します：`mv file1 file2 file3 /destination/`。

#### Q4. ファイルの名前を変更するにはどうすればよいですか？
A. `mv oldname newname`を使用してファイルの名前を変更します。

#### Q5. 異なるファイルシステム間でファイルを移動するとどうなりますか？
A. ファイルシステム間で移動する場合、`mv`は新しい場所にファイルをコピーしてから元のファイルを削除します。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/mv-invocation.html

## 改訂履歴

- 2025/05/05 初版