# readlink コマンド

シンボリックリンクの解決先やファイルの正規名を表示します。

## 概要

`readlink` コマンドは、シンボリックリンクの対象または、ファイルの正規パスを表示します。シンボリックリンクを解決し、実際の宛先パスを返します。これは、シンボリックリンクの指す先を判断したり、ファイルの絶対パスを取得したりする必要があるスクリプトに役立ちます。

## オプション

### **-f, --canonicalize**

与えられた名前の各コンポーネントのすべてのシンボリックリンクを再帰的に辿って正規化します。最後のコンポーネント以外は存在する必要があります

```console
$ ln -s /etc/hosts mylink
$ readlink -f mylink
/etc/hosts
```

### **-e, --canonicalize-existing**

与えられた名前の各コンポーネントのすべてのシンボリックリンクを再帰的に辿って正規化します。すべてのコンポーネントが存在する必要があります

```console
$ readlink -e mylink
/etc/hosts
```

### **-m, --canonicalize-missing**

与えられた名前の各コンポーネントのすべてのシンボリックリンクを再帰的に辿って正規化します。コンポーネントの存在に関する要件はありません

```console
$ readlink -m /nonexistent/path
/nonexistent/path
```

### **-n, --no-newline**

末尾の区切り文字（改行）を出力しません

```console
$ readlink -n mylink && echo " (this is the target)"
/etc/hosts (this is the target)
```

### **-z, --zero**

各出力行を改行ではなくNUL文字で終了します

```console
$ readlink -z mylink | hexdump -C
00000000  2f 65 74 63 2f 68 6f 73  74 73 00                 |/etc/hosts.|
0000000b
```

### **-v, --verbose**

エラーを報告します

```console
$ readlink -v nonexistent
readlink: nonexistent: No such file or directory
```

## 使用例

### シンボリックリンクを読み取る基本的な使用法

```console
$ ln -s /usr/bin bin_link
$ readlink bin_link
/usr/bin
```

### ファイルの絶対パスを取得する

```console
$ readlink -f ../relative/path/to/file.txt
/absolute/path/to/file.txt
```

### スクリプト内でreadlinkを使用する

```console
$ SCRIPT_PATH=$(readlink -f "$0")
$ SCRIPT_DIR=$(dirname "$SCRIPT_PATH")
$ echo "This script is located in: $SCRIPT_DIR"
This script is located in: /home/user/scripts
```

## ヒント:

### -f、-e、-mの違い

- `-f` はすべてのシンボリックリンクを辿りますが、最終コンポーネントのみが存在する必要があります
- `-e` はすべてのシンボリックリンクを辿りますが、すべてのコンポーネントが存在する必要があります
- `-m` は存在要件なしですべてのシンボリックリンクを辿ります（存在しないパスに便利です）

### シェルスクリプトでの使用

シェルスクリプトを書く際、`readlink -f "$0"`を使用して、呼び出し元に関係なくスクリプト自体の絶対パスを取得できます。

### ファイル名のスペース処理

readlinkを使用する際は、スペースを含むファイル名を処理するために常に変数を引用符で囲みます：

```console
$ readlink -f "$my_file"  # 正しい
$ readlink -f $my_file    # スペースがある場合は不正確
```

## よくある質問

#### Q1. `readlink`と`realpath`の違いは何ですか？
A. どちらのコマンドもシンボリックリンクを解決しますが、`realpath`は常に絶対パスを提供するのに対し、オプションなしの`readlink`は単にシンボリックリンクの対象を表示します。`-f`オプションを使用すると、`readlink`は`realpath`と同様に動作します。

#### Q2. スクリプトを含むディレクトリを取得するにはどうすればよいですか？
A. `dirname "$(readlink -f "$0")"`を使用して、呼び出し元に関係なくスクリプトを含むディレクトリを取得できます。

#### Q3. オプションなしの`readlink`が通常のファイルで失敗するのはなぜですか？
A. オプションなしの`readlink`はシンボリックリンクでのみ機能します。通常のファイルでも機能させるには`-f`を使用してください。

#### Q4. ファイルがシンボリックリンクかどうかを確認するために`readlink`を使用するにはどうすればよいですか？
A. オプションなしの`readlink`が出力を返す場合、そのファイルはシンボリックリンクです。エラーを返す場合、シンボリックリンクではありません。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/readlink-invocation.html

## 改訂履歴

- 2025/05/05 初版