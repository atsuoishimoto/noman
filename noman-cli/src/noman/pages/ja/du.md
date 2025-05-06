# du コマンド

ディレクトリとファイルのディスク使用量を推定します。

## 概要

`du`（disk usage）コマンドは、ファイルとディレクトリが使用するディスク容量を推定して表示します。システム上で最も多くの容量を消費しているディレクトリを見つけるのに特に役立ち、クリーンアップが必要な領域を特定するのに役立ちます。

## オプション

### **-h, --human-readable**

サイズを人間が読みやすい形式で表示します（例：1K, 234M, 2G）

```console
$ du -h Documents
4.0K    Documents/notes
16K     Documents/projects/code
24K     Documents/projects
28K     Documents
```

### **-s, --summarize**

各引数の合計のみを表示します

```console
$ du -s Documents
28      Documents
```

### **-c, --total**

すべての引数の総合計を生成します

```console
$ du -c Documents Downloads
28      Documents
156     Downloads
184     total
```

### **-a, --all**

ディレクトリだけでなくファイルのサイズも表示します

```console
$ du -a Documents
4       Documents/notes/todo.txt
4       Documents/notes
8       Documents/projects/code/script.py
16      Documents/projects/code
24      Documents/projects
28      Documents
```

### **--max-depth=N**

ディレクトリの合計を、コマンドライン引数よりN以下のレベルにある場合のみ表示します

```console
$ du --max-depth=1 Documents
4       Documents/notes
24      Documents/projects
28      Documents
```

### **-x, --one-file-system**

異なるファイルシステム上のディレクトリをスキップします

```console
$ du -x /home
```

## 使用例

### 最大のディレクトリを見つける

```console
$ du -h --max-depth=1 /home/user | sort -hr
1.2G    /home/user
650M    /home/user/Downloads
320M    /home/user/Videos
200M    /home/user/Documents
45M     /home/user/.cache
```

### 特定のディレクトリのサイズを人間が読みやすい形式で確認する

```console
$ du -sh /var/log
156M    /var/log
```

### 現在のディレクトリ内の大きなファイルを見つける

```console
$ du -ah . | sort -hr | head -n 10
1.2G    .
650M    ./Downloads
320M    ./Videos
200M    ./Documents
150M    ./Downloads/ubuntu.iso
100M    ./Videos/lecture.mp4
45M     ./.cache
25M     ./Documents/thesis.pdf
20M     ./Pictures
15M     ./Music
```

## ヒント:

### より良い洞察を得るためにsortと組み合わせる

`du`の出力を`sort -hr`にパイプして、サイズの降順でディレクトリを一覧表示します：
```console
$ du -h | sort -hr
```

### 特定のファイルタイプを対象にするためにfindと使用する

特定のファイルタイプが使用する容量を分析するために`find`と組み合わせます：
```console
$ find . -name "*.log" -exec du -ch {} \; | grep total$
```

### 特定のディレクトリを除外する

`grep -v`と一緒に使用して、分析から特定のディレクトリを除外します：
```console
$ du -h | grep -v "node_modules"
```

### macOSでの使用

macOSのBSDバージョンの`du`は、オプションが若干異なります。`brew install coreutils`を使用してから`gdu`を使うと、GNU互換の動作が得られます。

## よくある質問

#### Q1. `du`と`df`の違いは何ですか？
A. `du`はファイルとディレクトリのディスク使用量を表示しますが、`df`はマウントされたファイルシステム上の利用可能および使用済みディスク容量を表示します。

#### Q2. なぜ`du`がファイルマネージャで見るサイズと異なるサイズを報告するのですか？
A. `du`はディスク使用量（ファイルシステムのオーバーヘッドを含む）を測定しますが、ファイルマネージャは論理的なファイルサイズを表示することが多いです。

#### Q3. 計算から特定のディレクトリを除外するにはどうすればよいですか？
A. `--exclude=PATTERN`オプションを使用します：`du --exclude=node_modules`

#### Q4. なぜ大きなディレクトリで`du`が遅いのですか？
A. `du`はサイズを計算するためにディレクトリ構造全体をトラバースする必要があります。大きなディレクトリの場合は、要約のみを表示する`du -s`の使用を検討してください。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/du-invocation.html

## 改訂履歴

- 2025/05/05 初版