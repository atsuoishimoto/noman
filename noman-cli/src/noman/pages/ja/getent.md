# getent コマンド

管理データベースからエントリを取得します。

## 概要

`getent` は、アプリケーションが使用するのと同じライブラリ関数を使用して、管理データベース（`/etc/passwd`、`/etc/group` など）からエントリを表示する Unix コマンドです。情報がローカルファイル、NIS、LDAP、その他のソースから来るかどうかに関わらず、標準化された方法でシステムデータベースを照会するのに役立ちます。

## オプション

### **database**

照会するデータベース（passwd、group、hosts、services、protocols、networks など）を指定します

```console
$ getent passwd root
root:x:0:0:root:/root:/bin/bash
```

### **-s, --service=CONFIG**

使用するサービス設定を指定します

```console
$ getent -s files passwd root
root:x:0:0:root:/root:/bin/bash
```

### **-h, --help**

ヘルプ情報を表示します

```console
$ getent --help
Usage: getent [OPTION...] database [key ...]
Get entries from administrative database.

  -i, --no-idn               disable IDN encoding
  -s, --service=CONFIG       Service configuration to be used
  -?, --help                 Give this help list
      --usage                Give a short usage message
  -V, --version              Print program version

Mandatory or optional arguments to long options are also mandatory or optional
for any corresponding short options.

Supported databases:
ahosts ahostsv4 ahostsv6 aliases ethers group gshadow hosts netgroup networks
passwd protocols rpc services shadow
```

### **-V, --version**

バージョン情報を表示します

```console
$ getent --version
getent (GNU libc) 2.31
```

### **-i, --no-idn**

IDN（国際化ドメイン名）エンコーディングを無効にします

```console
$ getent -i hosts example.com
93.184.216.34   example.com
```

## 使用例

### ユーザー名でユーザーを検索する

```console
$ getent passwd username
username:x:1000:1000:Full Name:/home/username:/bin/bash
```

### ホスト名でホストを検索する

```console
$ getent hosts google.com
142.250.190.78  google.com
```

### すべてのグループを一覧表示する

```console
$ getent group
root:x:0:
daemon:x:1:
bin:x:2:
sys:x:3:
[additional groups...]
```

### サービスポートを検索する

```console
$ getent services ssh
ssh                  22/tcp
```

## ヒント:

### grepと組み合わせてフィルタリングする

`getent` と `grep` を組み合わせて、大きなデータベースから結果をフィルタリングします：

```console
$ getent passwd | grep username
```

### ユーザーが存在するかチェックする

終了コードを使用して、ユーザーがシステムに存在するかどうかを確認します：

```console
$ getent passwd username > /dev/null && echo "User exists" || echo "User does not exist"
```

### グループのすべてのメンバーを見つける

グループデータベースを使用して、特定のグループのすべてのメンバーを確認します：

```console
$ getent group sudo
sudo:x:27:user1,user2,user3
```

## よくある質問

#### Q1. getentで照会できるデータベースは何ですか？
A. 一般的なデータベースには、passwd、group、hosts、services、protocols、networks、shadow、aliasesなどがあります。利用可能なデータベースはシステムによって異なる場合があります。

#### Q2. ホスト名が解決されるかどうかを確認するにはどうすればよいですか？
A. `getent hosts ホスト名` を使用します。ホスト名が解決される場合、IPアドレスとホスト名が返されます。

#### Q3. getentはLDAPやその他のディレクトリサービスを照会できますか？
A. はい、getentはネームサービススイッチ（NSS）設定を使用するため、システムの `/etc/nsswitch.conf` ファイルで設定されているLDAP、NIS、DNS、ローカルファイルなど、あらゆるソースを照会できます。

#### Q4. getentと/etc/passwdなどのファイルを直接読み込むことの違いは何ですか？
A. getentはシステムのNSS設定を尊重するため、ローカルファイルだけでなく、設定されたすべてのソース（ローカルファイル、LDAP、NISなど）から情報を取得します。

## 参考資料

https://man7.org/linux/man-pages/man1/getent.1.html

## 改訂履歴

- 2025/05/05 初版