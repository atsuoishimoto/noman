# apt コマンド

Debian系Linuxディストリビューション用のパッケージ管理ツールです。

## 概要

`apt` (Advanced Package Tool) は、UbuntuなどのDebian系Linuxディストリビューションでソフトウェアパッケージのインストール、更新、削除、管理を行うためのコマンドラインユーティリティです。依存関係の処理、設定、インストールプロセスを自動的に処理することで、パッケージ管理を簡素化します。

## オプション

### **update**

リポジトリからパッケージリストを更新します

```console
$ sudo apt update
Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
All packages are up to date.
```

### **upgrade**

インストール済みのパッケージを最新バージョンにアップグレードします

```console
$ sudo apt upgrade
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Calculating upgrade... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```

### **install**

新しいパッケージをインストールします

```console
$ sudo apt install nginx
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  nginx-common nginx-core
Suggested packages:
  fcgiwrap nginx-doc
The following NEW packages will be installed:
  nginx nginx-common nginx-core
0 upgraded, 3 newly installed, 0 to remove and 0 not upgraded.
```

### **remove**

パッケージを削除しますが、設定ファイルは保持します

```console
$ sudo apt remove nginx
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following packages will be REMOVED:
  nginx nginx-core
0 upgraded, 0 newly installed, 2 to remove and 0 not upgraded.
```

### **purge**

パッケージとその設定ファイルを削除します

```console
$ sudo apt purge nginx
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following packages will be REMOVED:
  nginx* nginx-common* nginx-core*
0 upgraded, 0 newly installed, 3 to remove and 0 not upgraded.
```

### **autoremove**

依存関係を満たすために自動的にインストールされ、もはや必要なくなったパッケージを削除します

```console
$ sudo apt autoremove
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```

### **search**

名前や説明でパッケージを検索します

```console
$ apt search nginx
Sorting... Done
Full Text Search... Done
nginx/jammy-updates,jammy-security 1.18.0-6ubuntu14.4 all
  small, powerful, scalable web/proxy server
```

### **show**

パッケージに関する詳細情報を表示します

```console
$ apt show nginx
Package: nginx
Version: 1.18.0-6ubuntu14.4
Priority: optional
Section: web
Origin: Ubuntu
...
```

### **list --installed**

インストール済みのすべてのパッケージを一覧表示します

```console
$ apt list --installed
Listing... Done
accountsservice/jammy,now 22.07.5-2ubuntu1.4 amd64 [installed]
acl/jammy,now 2.3.1-1 amd64 [installed]
acpi-support/jammy,now 0.144 amd64 [installed]
...
```

## 使用例

### 複数のパッケージを一度にインストールする

```console
$ sudo apt install git curl wget
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
curl is already the newest version (7.81.0-1ubuntu1.14).
The following NEW packages will be installed:
  git wget
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
```

### システム全体をアップグレードする

```console
$ sudo apt update && sudo apt upgrade -y
Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Reading package lists... Done
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Calculating upgrade... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```

### パッケージの特定バージョンをインストールする

```console
$ sudo apt install nginx=1.18.0-6ubuntu14.3
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  nginx-common nginx-core
The following NEW packages will be installed:
  nginx nginx-common nginx-core
0 upgraded, 3 newly installed, 0 to remove and 0 not upgraded.
```

## ヒント

### apt-getの代わりにaptを使用する

`apt`は、古い`apt-get`コマンドと比較して、プログレスバーやカラー出力を備えたよりユーザーフレンドリーなインターフェースを提供します。

### 定期的にシステムをクリーンアップする

不要なパッケージを削除し、取得したパッケージファイルのローカルリポジトリをクリアすることでディスク容量を解放するために、定期的に`sudo apt autoremove`と`sudo apt clean`を実行しましょう。

### パッケージバージョンを固定する

パッケージがアップグレードされないようにするには、`sudo apt-mark hold パッケージ名`を使用します。再びアップグレードを許可するには、`sudo apt-mark unhold パッケージ名`を使用します。

### 壊れた依存関係を確認する

インストールに失敗した後に発生する可能性のある壊れた依存関係を修正するには、`sudo apt --fix-broken install`を使用します。

## よくある質問

#### Q1. aptとapt-getの違いは何ですか？
A. `apt`は、`apt-get`と`apt-cache`の最も一般的に使用される機能を組み合わせた、より使いやすい新しいコマンドで、出力フォーマットとプログレス情報が改善されています。

#### Q2. 「Could not get lock」エラーを修正するにはどうすればよいですか？
A. これは通常、別のパッケージマネージャーが実行中であることを意味します。それが終了するのを待つか、`ps aux | grep apt`で停止したプロセスを確認し、必要に応じて`sudo kill <プロセスID>`で終了させてください。

#### Q3. プロンプトなしでパッケージをインストールするにはどうすればよいですか？
A. `-y`フラグを使用します：`sudo apt install -y パッケージ名`でプロンプトに自動的に「はい」と答えます。

#### Q4. セキュリティパッケージのみを更新するにはどうすればよいですか？
A. `sudo apt update && sudo apt upgrade -s`を使用してアップグレードをシミュレートし、その後、更新したい特定のセキュリティパッケージに対して`sudo apt install パッケージ名`を使用します。

#### Q5. パッケージをダウングレードするにはどうすればよいですか？
A. `sudo apt install パッケージ名=バージョン番号`を使用して、特定の古いバージョンをインストールします。

## 参考資料

https://manpages.ubuntu.com/manpages/jammy/man8/apt.8.html

## 改訂履歴

- 2025/05/05 初版