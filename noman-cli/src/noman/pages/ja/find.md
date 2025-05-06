# findコマンド

ディレクトリ階層内でファイルを検索します。

## 概要

`find`コマンドは、名前、タイプ、サイズ、更新時刻などのさまざまな条件に基づいて、ディレクトリ階層内のファイルを検索します。これは、ファイルを見つけて、一致した結果に対して操作を実行するための強力なツールです。

## オプション

### **-iname**

指定したパターンに一致するファイルを大文字小文字を区別せずに検索します。`-name`に似ていますが、大文字小文字の違いを無視します。

```console
$ find . -iname "*.txt"
./notes.txt
./Documents/README.txt
./projects/readme.TXT
```

### **-name**

指定したパターンに一致するファイルを検索します（大文字小文字を区別）。

```console
$ find . -name "*.txt"
./notes.txt
./Documents/README.txt
```

### **-type**

特定のタイプのファイルを検索します。一般的なタイプには以下があります：
- `f`（通常ファイル）
- `d`（ディレクトリ）
- `l`（シンボリックリンク）

```console
$ find . -type f -name "*.jpg"
./photos/vacation.jpg
./profile.jpg
```

### **-size**

ファイルサイズに基づいて検索します。
- `+n`（nより大きい）
- `-n`（nより小さい）
- `n`（ちょうどn）

単位：`c`（バイト）、`k`（キロバイト）、`M`（メガバイト）、`G`（ギガバイト）

```console
$ find . -size +10M
./videos/tutorial.mp4
./backups/archive.zip
```

### **-mtime**

ファイルの更新時刻（日数）に基づいて検索します。
- `+n`（n日より前）
- `-n`（n日以内）
- `n`（ちょうどn日前）

```console
$ find . -mtime -7
./documents/recent_report.pdf
./notes.txt
```

### **-exec**

一致した各ファイルに対してコマンドを実行します。

```console
$ find . -name "*.log" -exec rm {} \;
```

## 使用例

### 大文字小文字を区別せず特定の拡張子を持つファイルを検索

```console
$ find /home/user -iname "*.jpg"
/home/user/Pictures/vacation.jpg
/home/user/Downloads/photo.JPG
/home/user/Documents/scan.Jpg
```

### 一時ファイルを検索して削除

```console
$ find /tmp -name "temp*" -type f -exec rm {} \;
```

### 過去1週間に更新された大きなファイルを検索

```console
$ find /home -type f -size +100M -mtime -7
/home/user/Downloads/movie.mp4
/home/user/Documents/presentation.pptx
```

### 空のディレクトリを検索

```console
$ find /var/log -type d -empty
/var/log/old
/var/log/archive/2024
```

## ヒント:

### ワイルドカードを慎重に使用する

`-name`や`-iname`でパターンを使用する場合、シェル展開を防ぐためにパターンを引用符で囲むことを忘れないでください：`find . -name "*.txt"`であり、`find . -name *.txt`ではありません。

### ディレクトリの深さを制限する

`-maxdepth`を使用して`find`が検索する深さを制限すると、パフォーマンスが大幅に向上します：`find . -maxdepth 2 -name "*.log"`。

### 複数の条件を組み合わせる

`-a`（AND、デフォルト）、`-o`（OR）、`!`または`-not`（NOT）を使用して、複雑な検索条件を作成します：`find . -name "*.jpg" -a -size +1M`。

### 「Permission denied」メッセージを回避する

エラーメッセージを`/dev/null`にリダイレクトして「Permission denied」エラーを抑制します：`find / -name "file.txt" 2>/dev/null`。

## よくある質問

#### Q1. 大文字小文字を区別せずにファイル名で検索するにはどうすればよいですか？
A. `-iname`オプションを使用します：`find . -iname "パターン"`。

#### Q2. 過去24時間以内に更新されたファイルを検索するにはどうすればよいですか？
A. `-mtime -1`を使用します：`find . -mtime -1`。

#### Q3. ファイルを検索して一つのコマンドで削除するにはどうすればよいですか？
A. `-exec`オプションを使用します：`find . -name "パターン" -exec rm {} \;`。

#### Q4. `-iname`と`-name`の違いは何ですか？
A. `-iname`は大文字小文字を区別しない検索を行い、`-name`は大文字小文字を区別します。

#### Q5. サブディレクトリなしで現在のディレクトリのみを検索するにはどうすればよいですか？
A. `-maxdepth 1`を使用します：`find . -maxdepth 1 -name "パターン"`。

## 参考文献

https://www.gnu.org/software/findutils/manual/html_node/find_html/index.html

## 改訂履歴

- 2025/05/05 初版