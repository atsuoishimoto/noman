# visudo コマンド

sudoersファイルを構文チェック付きで安全に編集します。

## 概要

`visudo`は、sudoアクセス権限を制御するsudoers設定ファイルを安全に編集するためのコマンドラインユーティリティです。編集中にsudoersファイルをロックし、変更を保存する前に構文チェックを実行し、ファイルを破損する可能性のある複数の同時編集を防止します。

## オプション

### **-c**

変更を加えずにsudoersファイルの構文エラーをチェックします。

```console
$ sudo visudo -c
/etc/sudoers: parsed OK
/etc/sudoers.d/custom: parsed OK
```

### **-f file**

デフォルトの代わりに編集する代替sudoersファイルの場所を指定します。

```console
$ sudo visudo -f /etc/sudoers.d/custom
```

### **-s**

sudoersファイルの厳格なチェックを有効にします。このオプションを使用すると、visudoは未知のデフォルト値やエイリアスを含むsudoersファイルを拒否します。

```console
$ sudo visudo -s
```

### **-q**

静かモードを有効にし、デフォルトの情報メッセージを抑制します。

```console
$ sudo visudo -q
```

### **-V**

バージョン情報を表示して終了します。

```console
$ sudo visudo -V
visudo version 1.9.5p2
```

## 使用例

### 基本的な使用法

```console
$ sudo visudo
```

### カスタムSudoersファイルの構文チェック

```console
$ sudo visudo -cf /etc/sudoers.d/myconfig
/etc/sudoers.d/myconfig: parsed OK
```

### 異なるエディタの使用

```console
$ sudo EDITOR=nano visudo
```

## ヒント:

### Sudoers構文の理解

sudoersファイルには特定の構文があります。一般的なエントリには以下が含まれます：
- `user ALL=(ALL) ALL` - ユーザーが任意のユーザーとして任意のコマンドを実行できるようにします
- `%group ALL=(ALL) ALL` - グループが任意のユーザーとして任意のコマンドを実行できるようにします
- `user ALL=(ALL) NOPASSWD: ALL` - ユーザーがパスワードなしでコマンドを実行できるようにします

### カスタム設定ファイルの作成

メインのsudoersファイルを編集する代わりに、`/etc/sudoers.d/`ディレクトリに別々のファイルを作成します。これにより、設定がよりモジュール化され、管理が容易になります。

```console
$ sudo visudo -f /etc/sudoers.d/custom_rules
```

### 常にvisudoを使用する

テキストエディタで直接sudoersファイルを編集しないでください。常にvisudoを使用して、sudoの権限からロックアウトする可能性のある構文エラーを防止します。

## よくある質問

#### Q1. sudoersファイルで構文エラーを作ってしまった場合はどうなりますか？
A. visudoは変更を保存する前に構文チェックを実行します。エラーが見つかった場合、ファイルを再編集するか、それでも書き込むか、変更を破棄するかのオプションが表示されます。

#### Q2. visudoで使用されるデフォルトのエディタを変更するにはどうすればよいですか？
A. visudoを実行する前にEDITORまたはVISUAL環境変数を設定します：`EDITOR=nano sudo visudo`

#### Q3. 実際に編集せずにsudoersファイルをチェックできますか？
A. はい、`sudo visudo -c`を使用して現在のsudoersファイルの構文をチェックするか、`sudo visudo -cf /path/to/file`を使用して特定のファイルをチェックできます。

#### Q4. /etc/sudoersを直接編集することとvisudoを使用することの違いは何ですか？
A. visudoは編集中にsudoersファイルをロックし、構文検証を実行し、ファイルを破損する可能性のある複数の同時編集を防止します。

## 参考文献

https://www.sudo.ws/docs/man/1.8.27/visudo.man/

## 改訂履歴

- 2025/05/05 初版