# sedコマンド

テキストのフィルタリングと変換のためのストリームエディタです。

## 概要

`sed`（ストリームエディタ）は、テキストを行ごとに解析して変換する強力なユーティリティです。ファイルや標準入力からデータを読み取り、指定された編集コマンドを適用し、結果を標準出力に出力します。元のファイルを変更せずに、検索と置換操作、テキスト抽出、その他のテキスト変換によく使用されます。

## オプション

### **-e スクリプト, --expression=スクリプト**

スクリプト内のコマンドを実行するコマンドセットに追加します。

```console
$ echo "hello world" | sed -e 's/hello/hi/' -e 's/world/there/'
hi there
```

### **-f スクリプトファイル, --file=スクリプトファイル**

スクリプトファイルからコマンドを実行するコマンドセットに追加します。

```console
$ cat script.sed
s/hello/hi/
s/world/there/
$ echo "hello world" | sed -f script.sed
hi there
```

### **-i[接尾辞], --in-place[=接尾辞]**

ファイルを直接編集します（接尾辞を指定するとバックアップを作成します）。

```console
$ echo "hello world" > file.txt
$ sed -i 's/hello/hi/' file.txt
$ cat file.txt
hi world
```

### **-n, --quiet, --silent**

パターンスペースの自動出力を抑制します。

```console
$ echo -e "line 1\nline 2\nline 3" | sed -n '2p'
line 2
```

### **-r, --regexp-extended**

スクリプトで拡張正規表現を使用します。

```console
$ echo "hello 123 world" | sed -r 's/[0-9]+/NUMBER/'
hello NUMBER world
```

## 使用例

### 基本的な置換

```console
$ echo "The quick brown fox" | sed 's/brown/red/'
The quick red fox
```

### グローバル置換

```console
$ echo "one two one three one" | sed 's/one/1/g'
1 two 1 three 1
```

### 行の削除

```console
$ echo -e "line 1\nline 2\nline 3" | sed '2d'
line 1
line 3
```

### 特定の行の表示

```console
$ echo -e "line 1\nline 2\nline 3" | sed -n '2,3p'
line 2
line 3
```

### 複数の編集コマンド

```console
$ echo "hello world" | sed 's/hello/hi/; s/world/there/'
hi there
```

## ヒント:

### '/'以外の区切り文字を使用する

スラッシュを含むパスやURLを扱う場合は、別の区切り文字を使用します：

```console
$ echo "/usr/local/bin" | sed 's:/usr:~:g'
~/local/bin
```

### インプレース編集前にバックアップを作成する

`-i`を使用してインプレース編集を行う場合は、常にバックアップを作成しましょう：

```console
$ sed -i.bak 's/old/new/g' file.txt
```

### アドレス範囲

アドレス範囲を使用して、特定の行にコマンドを適用します：
- `1,5s/old/new/` - 1〜5行目で置換
- `/start/,/end/s/old/new/` - パターン間で置換

### 複数行編集

複数行にまたがる複雑な編集には、`-z`オプションを使用してnull終端の行を扱うことを検討してください。

## よくある質問

#### Q1. ファイル内のパターンのすべての出現を置換するにはどうすればよいですか？
A. グローバルフラグを使用します：`sed 's/pattern/replacement/g' file.txt`

#### Q2. ファイルをインプレース編集するにはどうすればよいですか？
A. `-i`オプションを使用します：`sed -i 's/pattern/replacement/g' file.txt`

#### Q3. ファイルから特定の行を削除するにはどうすればよいですか？
A. 削除コマンドを使用します：`sed '5d' file.txt`（5行目を削除）または`sed '/pattern/d' file.txt`（パターンに一致する行を削除）

#### Q4. ファイルから特定の行を抽出するにはどうすればよいですか？
A. `-n`と印刷コマンドを使用します：`sed -n '10,20p' file.txt`（10〜20行目を表示）

#### Q5. 複数のsedコマンドを使用するにはどうすればよいですか？
A. 各コマンドに`-e`を使用するか：`sed -e 'cmd1' -e 'cmd2'`、またはセミコロンでコマンドを区切ります：`sed 'cmd1; cmd2'`

## 参考文献

https://www.gnu.org/software/sed/manual/sed.html

## 改訂履歴

- 2025/05/05 初版