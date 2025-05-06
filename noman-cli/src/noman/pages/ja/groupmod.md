# groupmod コマンド

システム上のグループ定義を変更します。

## 概要

`groupmod` コマンドは、Unix/Linuxシステム上の既存のグループの属性を変更するために使用されます。グループ名（GID）や数値ID（GID）を変更でき、管理者がグループアカウントを効率的に管理できるようにします。

## オプション

### **-g, --gid GID**

グループIDを指定した値に変更します。

```console
$ sudo groupmod -g 1001 developers
```

### **-n, --new-name NEW_GROUP**

グループの名前をGROUPからNEW_GROUPに変更します。

```console
$ sudo groupmod -n engineering developers
```

### **-o, --non-unique**

一意でないGIDの使用を許可します（通常、GIDは一意である必要があります）。

```console
$ sudo groupmod -g 1001 -o marketing
```

### **-p, --password PASSWORD**

グループのパスワードを暗号化されたPASSWORDに変更します。

```console
$ sudo groupmod -p encrypted_password developers
```

### **-R, --root CHROOT_DIR**

CHROOT_DIRディレクトリ内で変更を適用し、CHROOT_DIRディレクトリから設定ファイルを使用します。

```console
$ sudo groupmod -R /mnt/system -n engineering developers
```

## 使用例

### グループ名の変更

```console
$ sudo groupmod -n developers programmers
```

### グループのGIDの変更

```console
$ sudo groupmod -g 2000 developers
```

### 名前とGIDの両方を変更

```console
$ sudo groupmod -g 2000 -n engineering developers
```

## ヒント:

### グループの変更を確認する

グループを変更した後、`getent group`コマンドを使用して変更を確認します：

```console
$ getent group engineering
```

### ファイルの所有権を考慮する

グループのGIDを変更する場合、古いGIDが所有するファイルは自動的に更新されません。`find`と`chgrp`を使用してファイルの所有権を更新します：

```console
$ find /path/to/directory -group old_gid -exec chgrp new_gid {} \;
```

### 実行中のプロセスを確認する

実行中のプロセスが使用しているグループを変更する前に、そのグループを使用しているプロセスがあるかどうかを確認します：

```console
$ ps -eo group | grep groupname
```

## よくある質問

#### Q1. グループの名前とGIDを同時に変更できますか？
A. はい、`-n`と`-g`オプションを1つのコマンドで一緒に使用できます。

#### Q2. GIDを変更した場合、そのグループが所有するファイルはどうなりますか？
A. ファイルは引き続き古いGID番号を参照します。`chgrp`などのコマンドを使用して、ファイルの所有権を手動で更新する必要があります。

#### Q3. グループのGIDを別のグループと同じにすることはできますか？
A. はい、`-o`（非一意）オプションを使用する場合のみ可能です。ただし、混乱を招く可能性があるため、一般的には推奨されません。

#### Q4. グループ名を変更すると、そのグループのメンバーであるユーザーに影響しますか？
A. いいえ、グループ名の変更はそのメンバーシップには影響しません。古いグループ名のメンバーだったユーザーは、自動的に新しいグループ名のメンバーになります。

## 参考文献

https://man7.org/linux/man-pages/man8/groupmod.8.html

## 改訂履歴

- 2025/05/05 初版