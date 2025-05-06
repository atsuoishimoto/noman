# gpasswd コマンド

グループのメンバーシップとプロパティを変更することで、`/etc/group` と `/etc/gshadow` を管理します。

## 概要

`gpasswd` は Linux グループアカウントを管理するためのユーティリティです。システム管理者がユーザーをグループに追加・削除したり、グループ管理者を設定したり、グループパスワードを管理したりすることができます。このコマンドは Linux システム上でグループ情報を保存する `/etc/group` と `/etc/gshadow` ファイルを変更します。

## オプション

### **-a, --add** *ユーザー*

指定したユーザーを指定したグループに追加します。

```console
$ sudo gpasswd -a john developers
Adding user john to group developers
```

### **-d, --delete** *ユーザー*

指定したユーザーを指定したグループから削除します。

```console
$ sudo gpasswd -d john developers
Removing user john from group developers
```

### **-A, --administrators** *ユーザー1,ユーザー2,...*

グループの管理者リストを設定します。これらのユーザーのみがグループにメンバーを追加または削除できます。

```console
$ sudo gpasswd -A jane,mike developers
```

### **-M, --members** *ユーザー1,ユーザー2,...*

グループのメンバーリストを設定し、現在のメンバーリストを置き換えます。

```console
$ sudo gpasswd -M alice,bob,charlie developers
```

### **-r, --remove-password**

グループからパスワードを削除します。

```console
$ sudo gpasswd -r developers
```

## 使用例

### ユーザーを複数のグループに追加する

```console
$ sudo gpasswd -a user1 developers
Adding user user1 to group developers
$ sudo gpasswd -a user1 admins
Adding user user1 to group admins
```

### グループ管理者とメンバーを一度に設定する

```console
$ sudo gpasswd -A admin1,admin2 -M user1,user2,user3 projectteam
```

### グループにパスワードを設定する

```console
$ sudo gpasswd developers
Changing the password for group developers
New Password: 
Re-enter new password: 
```

## ヒント:

### 変更を確認するには groups コマンドを使用する

`gpasswd` でグループメンバーシップを変更した後、`groups` コマンドを使用して変更が反映されたことを確認できます：

```console
$ groups username
```

### 可能な限りグループパスワードを避ける

グループパスワードは一般的にユーザーベースのアクセス制御よりも安全性が低いと考えられています。最新のシステムでは通常、グループパスワードではなくユーザー権限と sudo に依存しています。

### gpasswd と sudo を使用する

ほとんどの `gpasswd` 操作にはroot権限が必要です。すでにrootとしてログインしていない限り、`gpasswd` コマンドを実行する際は常に `sudo` を使用してください。

## よくある質問

#### Q1. `gpasswd` と `usermod -G` の違いは何ですか？
A. `gpasswd` は特にグループ管理用に設計されており、他のグループメンバーに影響を与えずに単一ユーザーを追加/削除できます。`usermod -G` はユーザーの補助グループをすべて一度に置き換えるため、注意して使用しないと誤ってユーザーを他のグループから削除してしまう可能性があります。

#### Q2. グループに所属するユーザーを確認するにはどうすればよいですか？
A. `getent group グループ名` を使用して、特定のグループのすべてのメンバーを確認できます。

#### Q3. 一般ユーザーは `gpasswd` を使用できますか？
A. 一般ユーザーは、`-A` オプションを使用してグループの管理者に指定された場合のみ `gpasswd` を使用できますが、その場合でもroot と比較して機能が制限されています。

#### Q4. グループパスワードを設定するとどうなりますか？
A. グループパスワードを設定すると、ユーザーはパスワードを知っている場合に `newgrp` コマンドを使用して一時的にグループに参加できます。これは最新のシステムではほとんど使用されていません。

## 参考文献

https://linux.die.net/man/1/gpasswd

## 改訂履歴

- 2025/05/05 初版