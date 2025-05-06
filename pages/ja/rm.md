# rm コマンド

ファイルシステムからファイルやディレクトリを削除します。

## 概要

`rm` コマンドはファイルシステムからファイルやディレクトリを削除します。デフォルトでは、ディレクトリは削除せず、ファイルを削除する前に確認を求めません。`rm` で削除されたファイルは簡単に復元できないため、このコマンドは注意して使用してください。

## オプション

### **-f, --force**

存在しないファイルや引数を無視し、確認を求めません

```console
$ rm -f nonexistent_file.txt
$
```

### **-i, --interactive**

削除の前に毎回確認を求めます

```console
$ rm -i important.txt
rm: remove regular file 'important.txt'? y
$
```

### **-r, -R, --recursive**

ディレクトリとその内容を再帰的に削除します

```console
$ rm -r project_folder/
$
```

### **-d, --dir**

空のディレクトリを削除します

```console
$ rm -d empty_directory/
$
```

### **-v, --verbose**

実行内容を説明します

```console
$ rm -v file.txt
removed 'file.txt'
$
```

## 使用例

### 複数のファイルを削除する

```console
$ rm file1.txt file2.txt file3.txt
$
```

### 確認付きでファイルを削除する

```console
$ rm -i *.txt
rm: remove regular file 'document.txt'? y
rm: remove regular file 'notes.txt'? n
$
```

### ディレクトリとその内容を削除する

```console
$ rm -rf old_project/
$
```

### 詳細出力付きでファイルを削除する

```console
$ rm -v *.log
removed 'error.log'
removed 'access.log'
removed 'system.log'
$
```

## ヒント:

### 注意して使用する

`rm` コマンドはファイルをゴミ箱やリサイクルビンに移動せずに完全に削除します。特にワイルドカードを使用する場合は、削除対象を常に確認してください。

### インタラクティブモードでより安全に削除する

複数のファイルを削除する場合は、`rm -i` を使用して各削除を確認しましょう。これにより重要なファイルの誤削除を防ぐことができます。

### `rm -rf /` は避ける

`rm -rf /` や `rm -rf /*` は絶対に実行しないでください。これらのコマンドはシステム上のすべてを削除しようとし、システムが使用不能になる可能性があります。

### 安全のためのエイリアスを使用する

シェル設定で `alias rm='rm -i'` のようなエイリアスを作成して、デフォルトで常にインタラクティブモードを使用することを検討してください。

## よくある質問

#### Q1. `rm` で削除したファイルを復元できますか？
A. 一般的にはできません。グラフィカルなファイルマネージャとは異なり、`rm` はファイルをゴミ箱フォルダに移動しません。復元には特殊なツールが必要で、保証はされていません。

#### Q2. 特殊文字を含むファイル名のファイルを削除するにはどうすればよいですか？
A. ファイル名を引用符で囲むか、特殊文字をバックスラッシュでエスケープします。例：`rm "file with spaces.txt"` または `rm file\ with\ spaces.txt`

#### Q3. ディレクトリとその内容を安全に削除するにはどうすればよいですか？
A. `rm -r directory/` を使用してディレクトリとその内容を再帰的に削除します。確認プロンプトを表示するには `-i` を追加します。

#### Q4. `rm -r` と `rmdir` の違いは何ですか？
A. `rmdir` は空のディレクトリのみを削除しますが、`rm -r` はディレクトリとその内容をすべて再帰的に削除します。

## macOSに関する考慮事項

macOSでは、デフォルトの `rm` コマンドはGNU rmで利用可能な `--one-file-system` オプションをサポートしていません。また、外部ドライブからファイルを削除する際にmacOSのゴミ箱を完全に回避するには、Finderの削除機能ではなく `rm` を使用する必要があります。

## 参考資料

https://www.gnu.org/software/coreutils/manual/html_node/rm-invocation.html

## 改訂履歴

- 2025/05/05 初版