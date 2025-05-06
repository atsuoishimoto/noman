# dpkg コマンド

Debian ベースのシステム向けのパッケージ管理ツールで、.deb パッケージのインストール、削除、情報表示などを扱います。

## 概要

`dpkg`（Debian Package）は、Ubuntu などの Debian ベースの Linux ディストリビューションにおける中核的なパッケージ管理ユーティリティです。.deb パッケージファイルを直接扱い、ユーザーがパッケージのインストール、削除、設定、情報照会を行うことができます。`apt` のような高レベルツールとは異なり、`dpkg` はパッケージファイルを直接操作し、依存関係を自動的に処理しません。

## オプション

### **-i, --install**

.deb ファイルからパッケージをインストールします

```console
$ sudo dpkg -i package.deb
(Reading database ... 200000 files and directories currently installed.)
Preparing to unpack package.deb ...
Unpacking package (1.0-1) ...
Setting up package (1.0-1) ...
```

### **-r, --remove**

設定ファイルを残してインストール済みパッケージを削除します

```console
$ sudo dpkg -r package
(Reading database ... 200000 files and directories currently installed.)
Removing package (1.0-1) ...
```

### **-P, --purge**

設定ファイルを含めてインストール済みパッケージを削除します

```console
$ sudo dpkg -P package
(Reading database ... 200000 files and directories currently installed.)
Purging configuration files for package (1.0-1) ...
```

### **-l, --list**

パターンに一致するすべてのインストール済みパッケージを一覧表示します

```console
$ dpkg -l firefox*
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name           Version      Architecture Description
+++-==============-============-============-=================================
ii  firefox        115.0.2      amd64        Safe and easy web browser from Mozilla
```

### **-L, --listfiles**

パッケージによってインストールされたファイルを一覧表示します

```console
$ dpkg -L firefox
/usr/lib/firefox
/usr/lib/firefox/browser
/usr/lib/firefox/browser/chrome
/usr/lib/firefox/browser/chrome.manifest
...
```

### **-s, --status**

パッケージのステータス詳細を表示します

```console
$ dpkg -s firefox
Package: firefox
Status: install ok installed
Priority: optional
Section: web
Installed-Size: 256000
Maintainer: Ubuntu Mozilla Team <ubuntu-mozillateam@lists.ubuntu.com>
Architecture: amd64
Version: 115.0.2
...
```

### **-S, --search**

ファイルを所有するパッケージを検索します

```console
$ dpkg -S /usr/bin/firefox
firefox: /usr/bin/firefox
```

### **--configure**

展開済みのパッケージを設定します

```console
$ sudo dpkg --configure package
Setting up package (1.0-1) ...
```

### **--unpack**

パッケージを設定せずに展開します

```console
$ sudo dpkg --unpack package.deb
(Reading database ... 200000 files and directories currently installed.)
Preparing to unpack package.deb ...
Unpacking package (1.0-1) over (1.0-0) ...
```

## 使用例

### 複数のパッケージを一度にインストールする

```console
$ sudo dpkg -i package1.deb package2.deb package3.deb
(Reading database ... 200000 files and directories currently installed.)
Preparing to unpack package1.deb ...
Unpacking package1 (1.0-1) ...
Preparing to unpack package2.deb ...
Unpacking package2 (2.0-1) ...
Preparing to unpack package3.deb ...
Unpacking package3 (3.0-1) ...
Setting up package1 (1.0-1) ...
Setting up package2 (2.0-1) ...
Setting up package3 (3.0-1) ...
```

### インストール済みのすべてのパッケージを一覧表示する

```console
$ dpkg -l
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name           Version      Architecture Description
+++-==============-============-============-=================================
ii  accountsservice 0.6.55-0ubuntu12 amd64    query and manipulate user account information
ii  acl            2.2.53-6      amd64        access control list - utilities
ii  adduser        3.118ubuntu2  all          add and remove users and groups
...
```

### 壊れたパッケージのインストールを修復する

```console
$ sudo dpkg --configure -a
Setting up package1 (1.0-1) ...
Setting up package2 (2.0-1) ...
```

## ヒント

### 依存関係の処理

`dpkg` は依存関係を自動的に解決しません。依存関係エラーが発生した場合は、次のコマンドを使用します：
```console
$ sudo apt-get -f install
```
これにより、`dpkg` インストール後の壊れた依存関係を修復しようとします。

### インストール中の設定を防ぐ

パッケージを設定せずに展開するには、`-i` の代わりに `--unpack` を使用します。これは、設定前にファイルを変更する必要がある場合に便利です：
```console
$ sudo dpkg --unpack package.deb
$ # ファイルに変更を加える
$ sudo dpkg --configure package
```

### コマンドを提供するパッケージを見つける

特定のコマンドを提供するパッケージを知りたい場合：
```console
$ which command
/usr/bin/command
$ dpkg -S /usr/bin/command
package: /usr/bin/command
```

### パッケージステータスコードを理解する

`dpkg -l` 出力の最初の2文字はパッケージのステータスを示します：
- `ii`: パッケージがインストールされ設定済み
- `rc`: パッケージは削除されたが設定ファイルは残っている
- `un`: パッケージは不明/インストールされていない

## よくある質問

#### Q1. dpkg と apt の違いは何ですか？
A. `dpkg` は .deb ファイルを直接扱い、依存関係を自動的に処理しない低レベルのパッケージマネージャです。`apt` は依存関係を解決し、リポジトリからパッケージをダウンロードできる高レベルのツールです。

#### Q2. 「依存関係の問題」エラーを修正するにはどうすればよいですか？
A. `dpkg` インストール後に依存関係の問題を解決するには、`sudo apt-get -f install` を実行してください。

#### Q3. インストール前にパッケージがインストールするファイルを確認するにはどうすればよいですか？
A. パッケージをインストールせずに含まれるファイルを一覧表示するには、`dpkg-deb --contents package.deb` を使用します。

#### Q4. dpkg でパッケージを再インストールするにはどうすればよいですか？
A. すでにインストールされているパッケージを再インストールするには、`sudo dpkg -i --force-reinstall package.deb` を使用します。

#### Q5. パッケージが自動的にアップグレードされないようにするにはどうすればよいですか？
A. パッケージが自動的にアップグレードされないようにするには、`sudo apt-mark hold package` を使用します。

## 参考文献

https://man7.org/linux/man-pages/man1/dpkg.1.html

## 改訂履歴

- 2025/05/05 初版