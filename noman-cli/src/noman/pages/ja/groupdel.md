# groupdel コマンド

システムからグループを削除します。

## 概要

`groupdel` は、システムから指定されたグループを削除するためのコマンドラインユーティリティです。システムのグループデータベース（/etc/group および /etc/gshadow）からグループエントリを削除します。このコマンドを実行するには、root 権限または sudo アクセスが必要です。

## オプション

### **-f, --force**

ユーザーのプライマリグループであっても、グループの削除を強制します。

```console
$ sudo groupdel -f developers
```

### **-h, --help**

ヘルプメッセージを表示して終了します。

```console
$ groupdel --help
Usage: groupdel [options] GROUP

Options:
  -h, --help                    display this help message and exit
  -R, --root CHROOT_DIR         directory to chroot into
  -P, --prefix PREFIX_DIR       prefix directory where are located the /etc/* files
  -f, --force                   delete group even if it is the primary group of a user
```

### **-R, --root CHROOT_DIR**

CHROOT_DIR ディレクトリ内で変更を適用し、CHROOT_DIR ディレクトリから設定ファイルを使用します。

```console
$ sudo groupdel --root /mnt/system developers
```

### **-P, --prefix PREFIX_DIR**

/etc/* ファイルが配置されているプレフィックスディレクトリを指定します。

```console
$ sudo groupdel --prefix /mnt/etc developers
```

## 使用例

### グループの削除

```console
$ sudo groupdel developers
```

### 一部のユーザーのプライマリグループであるグループを強制的に削除

```console
$ sudo groupdel -f developers
```

## ヒント:

### 削除前にグループの依存関係を確認する

グループを削除する前に、`grep "^groupname:" /etc/passwd` を使用して、そのグループをプライマリグループとしているユーザーがいないか確認しましょう。ユーザーがそのグループに依存している場合は、先にプライマリグループを変更することを検討してください。

### グループ情報のバックアップ

変更を加える前にグループ情報をバックアップすることをお勧めします：

```console
$ sudo cp /etc/group /etc/group.bak
$ sudo cp /etc/gshadow /etc/gshadow.bak
```

### グループ削除の確認

グループを削除した後、グループデータベースを確認して削除されたことを確認します：

```console
$ getent group groupname
```

出力がない場合、グループは正常に削除されています。

## よくある質問

#### Q1. ユーザーのプライマリグループであるグループを削除できますか？
A. はい、`-f` または `--force` オプションを使用する必要があります。ただし、これによりそれらのユーザーに問題が発生する可能性があります。

#### Q2. 削除されたグループが所有していたファイルはどうなりますか？
A. 以前に削除されたグループが所有していたファイルは引き続き存在しますが、`ls -l` でリストすると、グループ名の代わりにグループ ID 番号が表示されます。

#### Q3. グループを削除するには特別な権限が必要ですか？
A. はい、システムからグループを削除するには、root 権限または sudo アクセスが必要です。

#### Q4. 削除後にグループを復元できますか？
A. いいえ、一度削除すると、復元したい場合は同じ GID で手動でグループを再作成する必要があります。

## 参考文献

https://man7.org/linux/man-pages/man8/groupdel.8.html

## 改訂履歴

- 2025/05/05 初版