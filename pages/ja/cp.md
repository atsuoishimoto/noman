# cp コマンド

ファイルとディレクトリをソースから宛先へコピーします。

## 概要

`cp` コマンドはファイルとディレクトリをコピーします。単一のファイルを別のファイルへ、複数のファイルをディレクトリへ、またはディレクトリ構造全体をコピーすることができます。デフォルトでは、`cp` はオプションで強制されない限り既存のファイルを上書きせず、元のファイルのタイムスタンプと権限を保持します。

## オプション

### **-r, -R, --recursive**

ディレクトリを再帰的にコピーし、すべてのサブディレクトリとその内容を含めます。

```console
$ cp -r Documents/ Backup/
```

### **-i, --interactive**

既存のファイルを上書きする前に確認を求めます。

```console
$ cp -i file.txt destination/
cp: overwrite 'destination/file.txt'? y
```

### **-f, --force**

必要に応じて宛先ファイルを削除して、確認なしでコピーを強制します。

```console
$ cp -f important.txt destination/
```

### **-p, --preserve**

モード、所有権、タイムスタンプなどのファイル属性を保持します。

```console
$ cp -p config.ini backup/
```

### **-v, --verbose**

コピーされる各ファイルの名前を表示します。

```console
$ cp -v *.txt Documents/
'file1.txt' -> 'Documents/file1.txt'
'file2.txt' -> 'Documents/file2.txt'
```

### **-u, --update**

ソースファイルが宛先ファイルより新しい場合、または宛先ファイルが存在しない場合にのみコピーします。

```console
$ cp -u *.log archive/
```

### **-a, --archive**

すべてのファイル属性を保持し、ディレクトリを再帰的にコピーします（-dR --preserve=all と同等）。

```console
$ cp -a source_dir/ destination_dir/
```

## 使用例

### 単一ファイルのコピー

```console
$ cp report.pdf ~/Documents/
```

### 複数ファイルをディレクトリにコピー

```console
$ cp file1.txt file2.txt file3.txt ~/Backup/
```

### ディレクトリをすべての内容と共にコピー

```console
$ cp -r Projects/ ~/Backup/Projects/
```

### 詳細出力と属性保持を伴うコピー

```console
$ cp -vp important.conf /etc/
'important.conf' -> '/etc/important.conf'
```

## ヒント:

### ワイルドカードを使用して複数ファイルをコピー

パターンに一致する複数のファイルをコピーするにはワイルドカードを使用します：
```console
$ cp *.jpg ~/Pictures/
```

### 上書き前にバックアップを作成

`-b` オプションを使用して既存ファイルのバックアップを作成します：
```console
$ cp -b config.ini /etc/
```
これにより上書き前に `config.ini~` という名前のバックアップファイルが作成されます。

### 新しい場合のみコピー

`-u` を使用して、ソースが宛先より新しい場合にのみファイルを更新します：
```console
$ cp -u -r source_dir/ destination_dir/
```
これはディレクトリの同期に便利です。

### シンボリックリンクを保持

`-d` または `--no-dereference` を使用して、シンボリックリンクが指すファイルをコピーするのではなく、リンクとして保持します：
```console
$ cp -d link.txt destination/
```

## よくある質問

#### Q1. 既存のファイルを上書きせずにファイルをコピーするにはどうすればよいですか？
A. `cp -n ソース 宛先` を使用します。`-n` オプションは既存ファイルの上書きを防ぎます。

#### Q2. 隠しファイルをコピーするにはどうすればよいですか？
A. 隠しファイル（`.` で始まるもの）は通常通りコピーされます。隠しファイルを含むすべてのファイルをコピーするには、`cp -r source/. destination/` のようなワイルドカードを使用します。

#### Q3. ファイルをコピーして権限を維持するにはどうすればよいですか？
A. `cp -p ソース 宛先` を使用して、モード、所有権、タイムスタンプを保持します。

#### Q4. ディレクトリをすべての内容と共にコピーするにはどうすればよいですか？
A. `cp -r ソースディレクトリ 宛先ディレクトリ` を使用して、ディレクトリとそのすべての内容を再帰的にコピーします。

#### Q5. ディレクトリから特定のファイルタイプのみをコピーするにはどうすればよいですか？
A. ワイルドカードを使用します：`cp ソースディレクトリ/*.txt 宛先ディレクトリ/` でテキストファイルのみをコピーします。

## 参考資料

https://www.gnu.org/software/coreutils/manual/html_node/cp-invocation.html

## 改訂履歴

- 2025/05/05 初版