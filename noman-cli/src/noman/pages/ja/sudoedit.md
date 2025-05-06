# sudoeditコマンド

別のユーザー（通常はroot）として安全にファイルを編集します。

## 概要

`sudoedit`（`sudo -e`としても使用可能）は、ユーザーが自分のエディタ設定を使いながら、昇格した権限でファイルを編集することを可能にします。エディタに直接`sudo`を使用する場合と異なり、`sudoedit`はファイルの一時的なコピーを作成し、お好みのエディタで編集させた後、適切な権限で元の場所にコピーし直します。

## オプション

### **-u, --user=user**

ファイルを編集するユーザーを指定します（デフォルトはroot）

```console
$ sudoedit -u www-data /var/www/html/index.html
```

### **-H, --set-home**

HOME環境変数を対象ユーザーのホームディレクトリに設定します

```console
$ sudoedit -H /etc/ssh/sshd_config
```

### **-C, --close-from=num**

num以上のすべてのファイルディスクリプタを閉じます

```console
$ sudoedit -C 3 /etc/hosts
```

### **-h, --help**

ヘルプメッセージを表示して終了します

```console
$ sudoedit -h
```

## 使用例

### システム設定ファイルの編集

```console
$ sudoedit /etc/ssh/sshd_config
[デフォルトのエディタがファイルを開きます]
```

### 複数のファイルを一度に編集

```console
$ sudoedit /etc/hosts /etc/resolv.conf
[デフォルトのエディタが各ファイルを順番に開きます]
```

### 特定のユーザーとして編集

```console
$ sudoedit -u postgres /etc/postgresql/13/main/postgresql.conf
[デフォルトのエディタがファイルを開き、変更はpostgresの所有となります]
```

## ヒント:

### お好みのエディタの設定

`sudoedit`はEDITORまたはVISUAL環境変数を使用して、どのエディタを使用するかを決定します。シェルプロファイルでこれらを設定してください：

```console
$ echo 'export EDITOR=vim' >> ~/.bashrc
$ source ~/.bashrc
```

### セキュリティ上の利点

システムファイルを編集する際は、`sudo vim`ではなく常に`sudoedit`を使用してください。これにより、エディタのプラグインや設定が昇格した権限でコードを実行する可能性があるセキュリティ問題を防ぎます。

### 一時ファイルの場所

`sudoedit`はデフォルトで/tmpに一時ファイルを作成します。非常に大きなファイルを編集する必要がある場合は、/tmpパーティションに十分な空き容量があることを確認してください。

## よくある質問

#### Q1. `sudoedit`と`sudo vim`の違いは何ですか？
A. `sudoedit`はファイルの一時的なコピーを作成し、通常のユーザー権限で編集した後、昇格した権限でコピーし直します。`sudo vim`はエディタ全体をroot権限で実行するため、エディタにコードを実行する可能性のあるプラグインや設定がある場合、セキュリティリスクとなる可能性があります。

#### Q2. どのエディタを使用するかを指定するにはどうすればよいですか？
A. シェルプロファイル（例：~/.bashrcの中の`export EDITOR=nano`）でEDITORまたはVISUAL環境変数を設定します。

#### Q3. `sudoedit`で複数のファイルを一度に編集できますか？
A. はい、編集したいすべてのファイルをリストするだけです：`sudoedit file1 file2 file3`

#### Q4. 元のファイルを表示する権限がない場合はどうなりますか？
A. 通常のユーザーがファイルを読めなくても、そのファイルを編集するためのsudo権限があれば、`sudoedit`は正常に動作します。

## 参考資料

https://www.sudo.ws/docs/man/sudoedit.man/

## 改訂履歴

- 2025/05/05 初版