# apt-fileコマンド

APTパッケージ管理システム内のパッケージ内のファイルを検索します。

## 概要

apt-fileは、Debianベースのシステム向けのコマンドラインユーティリティで、インストールされていないパッケージ内のファイルも検索できます。特定のファイルを提供するパッケージを見つけたり、インストール前にパッケージの内容を調べたりするのに特に役立ちます。

## オプション

### **search**

パターンに一致するファイルを含むパッケージを検索します

```console
$ apt-file search /usr/bin/python3
python3-minimal: /usr/bin/python3
```

### **list**

指定したパッケージ内のファイルを一覧表示します

```console
$ apt-file list python3-minimal
python3-minimal: /usr/bin/python3
python3-minimal: /usr/share/doc/python3-minimal/README.Debian
python3-minimal: /usr/share/doc/python3-minimal/changelog.Debian.gz
python3-minimal: /usr/share/doc/python3-minimal/copyright
```

### **-a, --architecture**

検索するアーキテクチャを指定します

```console
$ apt-file -a amd64 search libssl.so
libssl-dev: /usr/lib/x86_64-linux-gnu/libssl.so
```

### **-F, --fixed-string**

パターンを正規表現として解釈しません

```console
$ apt-file -F search "libssl.so.1.1"
libssl1.1: /usr/lib/x86_64-linux-gnu/libssl.so.1.1
```

### **-l, --package-only**

ファイルパスではなく、パッケージ名のみを表示します

```console
$ apt-file -l search /usr/bin/python3
python3-minimal
```

### **-x, --regexp**

パターンを正規表現として解釈します（デフォルト）

```console
$ apt-file -x search "^/usr/bin/py.*3$"
python3-minimal: /usr/bin/python3
```

### **-v, --verbose**

操作中により多くの情報を表示します

```console
$ apt-file -v search /usr/bin/python3
Reading package lists... Done
Building dependency tree... Done
python3-minimal: /usr/bin/python3
```

### **update**

コンテンツデータベースを更新します

```console
$ sudo apt-file update
Downloading complete file https://deb.debian.org/debian/dists/bookworm/Contents-amd64.gz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 45.2M  100 45.2M    0     0  5215k      0  0:00:08  0:00:08 --:--:-- 6123k
```

## 使用例

### 特定のファイルを提供するパッケージを見つける

```console
$ apt-file search /usr/bin/convert
imagemagick-6.q16: /usr/bin/convert
```

### パッケージ内のすべてのファイルを一覧表示する

```console
$ apt-file list wget
wget: /etc/wgetrc
wget: /usr/bin/wget
wget: /usr/share/doc/wget/AUTHORS
wget: /usr/share/doc/wget/COPYING
wget: /usr/share/doc/wget/NEWS.gz
wget: /usr/share/doc/wget/README
wget: /usr/share/info/wget.info.gz
wget: /usr/share/man/man1/wget.1.gz
```

### 開発用のヘッダーファイルを見つける

```console
$ apt-file search "include/openssl/ssl.h"
libssl-dev: /usr/include/openssl/ssl.h
```

## ヒント:

### 最初にデータベースを更新する

apt-fileを使用する前、特にシステム更新後や最近使用していない場合は、常に`sudo apt-file update`を実行してください。これにより、最新のパッケージ情報が確保されます。

### 複雑なフィルタリングにはgrepと組み合わせる

より複雑なフィルタリングには、apt-fileとgrepを組み合わせてください：
```console
$ apt-file list python3 | grep "bin/"
```

### コンパイル用の依存関係を見つける

不足しているヘッダーファイルを報告するソフトウェアをコンパイルする場合、apt-fileを使用してインストールが必要な開発パッケージを見つけます：
```console
$ apt-file search missing_header.h
```

## よくある質問

#### Q1. apt-fileとdpkg -Sの違いは何ですか？
A. dpkg -Sはインストール済みのパッケージのみを検索しますが、apt-fileはインストールされていないものも含め、利用可能なすべてのパッケージを検索できます。

#### Q2. apt-fileをインストールするにはどうすればよいですか？
A. `sudo apt install apt-file`を実行し、その後`sudo apt-file update`を実行してデータベースを初期化します。

#### Q3. なぜapt-file searchは遅いのですか？
A. apt-fileは大量のファイルデータベースを検索します。より具体的な検索パターンや-Fオプションを使用すると検索が速くなります。

#### Q4. apt-fileデータベースはどのくらいの頻度で更新すべきですか？
A. apt updateでパッケージリストを更新するたび、または少なくとも月に1回は更新してください。

## 参考文献

https://manpages.debian.org/bookworm/apt-file/apt-file.1.en.html

## 改訂履歴

- 2025/05/05 初版