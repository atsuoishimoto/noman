# groupadd コマンド

システムに新しいグループを作成します。

## 概要

`groupadd` コマンドは、グループデータベースにエントリを追加することで、システム上に新しいグループアカウントを作成します。主にシステム管理者がアクセス制御とパーミッション管理のためにユーザーグループを管理するために使用されます。

## オプション

### **-f, --force**

グループがすでに存在する場合でも正常終了し、GIDがすでに使用されている場合は -g オプションをキャンセルします。

```console
$ sudo groupadd -f developers
```

### **-g, --gid GID**

グループIDの数値（GID）を指定します。-o オプションを使用しない限り、この値は一意である必要があります。

```console
$ sudo groupadd -g 1500 developers
```

### **-K, --key KEY=VALUE**

/etc/login.defs のデフォルト値（GID_MIN、GID_MAXなど）を上書きします。

```console
$ sudo groupadd -K GID_MIN=5000 newgroup
```

### **-o, --non-unique**

一意でないGIDを持つグループの作成を許可します。

```console
$ sudo groupadd -o -g 1500 another_group
```

### **-p, --password PASSWORD**

新しいグループの暗号化されたパスワードを設定します。

```console
$ sudo groupadd -p encrypted_password finance
```

### **-r, --system**

システムGID範囲内のGIDを持つシステムグループを作成します。

```console
$ sudo groupadd -r sysgroup
```

## 使用例

### 基本的なグループの作成

```console
$ sudo groupadd developers
```

### システムグループの作成

```console
$ sudo groupadd -r docker
```

### 特定のGIDを持つグループの作成

```console
$ sudo groupadd -g 2000 finance
```

### すでに存在する可能性のあるグループの作成

```console
$ sudo groupadd -f marketing
```

## ヒント:

### グループ作成の確認

グループを作成した後、`getent group` コマンドを使用して正しく追加されたことを確認します：

```console
$ getent group developers
developers:x:1500:
```

### グループIDの範囲

システムグループは通常、低いGID（通常は1000未満）を使用し、通常のユーザーグループはより高いGIDを使用します。特定の範囲については、システムの `/etc/login.defs` ファイルを確認してください。

### グループ管理

`groupadd` はグループの作成のみを行うことを覚えておいてください。既存のグループを変更するには `groupmod` を使用し、グループを削除するには `groupdel` を使用します。

### グループメンバーシップ

グループを作成した後、`usermod -aG グループ名 ユーザー名` を使用してユーザーをグループに追加します。

## よくある質問

#### Q1. 新しいグループを作成するにはどうすればよいですか？
A. `sudo groupadd グループ名` を使用して新しいグループを作成します。

#### Q2. 新しいグループに特定のGIDを指定するにはどうすればよいですか？
A. `sudo groupadd -g GID グループ名` を使用します。GIDは希望するグループID番号です。

#### Q3. システムグループと通常のグループの違いは何ですか？
A. システムグループ（`-r` で作成）は通常、システムサービス用に使用され、低いGIDを持ちます。通常のグループはユーザーを整理するためのものです。

#### Q4. 新しく作成したグループにユーザーを追加するにはどうすればよいですか？
A. グループを作成した後、`sudo usermod -aG グループ名 ユーザー名` を使用してユーザーをグループに追加します。

#### Q5. グループがすでに存在するかどうかを確認するにはどうすればよいですか？
A. `getent group グループ名` または `grep グループ名 /etc/group` を使用してグループが存在するかどうかを確認します。

## 参考文献

https://www.man7.org/linux/man-pages/man8/groupadd.8.html

## 改訂履歴

- 2025/05/05 初版