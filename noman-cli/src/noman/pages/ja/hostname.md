# hostname コマンド

システムのホスト名を表示または設定します。

## 概要

`hostname` コマンドは、システムの現在のホスト名、ドメイン名、またはノード名を表示または設定します。引数なしで実行すると、現在のホスト名を表示します。適切な権限があれば、新しいホスト名を設定することもできます。

## オプション

### **-s, --short**

ドメイン情報なしの短いホスト名（最初のドットより前の部分）を表示します。

```console
$ hostname -s
mycomputer
```

### **-f, --fqdn, --long**

完全修飾ドメイン名（FQDN）を表示します。

```console
$ hostname -f
mycomputer.example.com
```

### **-d, --domain**

システムが所属するドメイン名を表示します。

```console
$ hostname -d
example.com
```

### **-i, --ip-address**

ホストのIPアドレスを表示します。

```console
$ hostname -i
192.168.1.100
```

## 使用例

### 現在のホスト名を表示する

```console
$ hostname
mycomputer.example.com
```

### 新しいホスト名を設定する（root権限が必要）

```console
$ sudo hostname newname
$ hostname
newname
```

### ホストのすべてのネットワークアドレスを表示する

```console
$ hostname --all-ip-addresses
192.168.1.100 10.0.0.1 127.0.0.1
```

## ヒント:

### ホスト名の永続的な変更

`hostname` コマンドは次の再起動までホスト名を一時的に変更するだけです。永続的な変更を行うには：
- Linux の場合：`/etc/hostname` を編集するか、`hostnamectl set-hostname newname` を使用します
- macOS の場合：システム環境設定 > 共有 > コンピュータ名を使用するか、`scutil --set HostName newname` を使用します

### ホスト名 vs. FQDN

ホスト名はコンピュータ名のみ（例：「mycomputer」）であるのに対し、FQDNはドメインを含みます（例：「mycomputer.example.com」）。完全なネットワーク識別子が必要な場合は `-f` を使用してください。

### ホスト名の解決

hostname コマンドは DNS や `/etc/hosts` を更新しません。ホスト名を変更した後、適切なネットワーク解決のためにこれらを別途更新する必要があるかもしれません。

## よくある質問

#### Q1. hostname と hostnamectl の違いは何ですか？
A. `hostname` はシステムのホスト名を表示または一時的に設定するシンプルなユーティリティであるのに対し、`hostnamectl`（systemdベースのLinuxシステムで）は様々なホスト名パラメータを永続的に設定でき、最新のLinuxディストリビューションでは推奨される方法です。

#### Q2. なぜ hostname -i が実際のIPではなく 127.0.1.1 を返すことがあるのですか？
A. これは、ホスト名が `/etc/hosts` で 127.0.1.1 にマッピングされている場合に発生します。これは一部のディストリビューションでは一般的です。より正確なネットワーク情報を得るには、`hostname --all-ip-addresses` または `ip addr` を使用してください。

#### Q3. ホスト名の変更を永続的にするにはどうすればよいですか？
A. Linux では `/etc/hostname` を編集するか、`hostnamectl set-hostname newname` を使用します。macOS では、`scutil --set HostName newname` を使用します。

## macOSに関する考慮事項

macOSでは、設定可能な3つの異なるホスト名設定があります：

- HostName：ネットワークホスト名（FQDN）
- LocalHostName：Bonjourホスト名（ローカルネットワーク検出に使用）
- ComputerName：UIに表示されるユーザーフレンドリーな名前

これらの値を設定するには：

```console
$ sudo scutil --set HostName "hostname.domain.com"
$ sudo scutil --set LocalHostName "hostname"
$ sudo scutil --set ComputerName "My Computer"
```

## 参考文献

https://man7.org/linux/man-pages/man1/hostname.1.html

## 改訂履歴

- 2025/05/05 初版