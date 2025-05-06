# update-locale コマンド

システムロケール設定を `/etc/default/locale` を更新して構成します。

## 概要

`update-locale` は、Debian ベースの Linux システムでシステム全体のロケール設定を変更するために使用されるコマンドです。このコマンドは `/etc/default/locale` という設定ファイルを更新し、システム全体の言語、文字エンコーディング、地域設定を定義します。このコマンドは通常、システム管理者がすべてのユーザーの言語設定や文字エンコーディングを変更する際に使用されます。

## オプション

### **--reset**

すべてのロケール変数をリセットします（設定ファイルから削除します）

```console
$ sudo update-locale --reset
```

### **LANG=**

すべてのカテゴリのデフォルトロケールを設定します

```console
$ sudo update-locale LANG=en_US.UTF-8
```

### **LC_ALL=**

他のすべての設定を上書きして、すべてのカテゴリのロケールを設定します

```console
$ sudo update-locale LC_ALL=en_US.UTF-8
```

### **--help**

ヘルプ情報を表示します

```console
$ update-locale --help
Usage: update-locale [OPTIONS] [VARIABLE=VALUE ...]
  or:  update-locale --reset
Options:
  --help         display this help and exit
  --reset        reset all locale variables
  --locale-file=FILE
                 use FILE as locale file instead of /etc/default/locale
```

## 使用例

### 複数のロケール変数を一度に設定する

```console
$ sudo update-locale LANG=en_GB.UTF-8 LC_TIME=en_GB.UTF-8 LC_PAPER=en_GB.UTF-8
```

### 特定のロケール変数を削除する

特定のロケール変数を削除するには、空の文字列に設定します：

```console
$ sudo update-locale LC_TIME=
```

### 現在のロケール設定を確認する

update-localeの一部ではありませんが、現在の設定は以下のように確認できます：

```console
$ locale
LANG=en_US.UTF-8
LANGUAGE=
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=
```

## ヒント:

### システム全体の設定とユーザー設定の違い

`update-locale` はシステム全体の設定を変更することを覚えておいてください。個々のユーザーは、自分のシェル起動ファイル（`.bashrc` など）で独自のロケール設定を上書きすることができます。

### 変更は次回ログイン時に有効になります

`update-locale` で行った変更は、通常、現在のセッションには影響しません。新しいロケール設定を有効にするには、ユーザーはログアウトして再度ログインする必要があります。

### 一般的なロケール変数

- `LANG`: すべてのカテゴリのデフォルトロケール
- `LC_CTYPE`: 文字分類と大文字小文字変換
- `LC_TIME`: 日付と時刻の形式
- `LC_NUMERIC`: 数値のフォーマット
- `LC_MONETARY`: 通貨のフォーマット
- `LC_MESSAGES`: システムメッセージの言語

### 利用可能なロケール

システムで利用可能なロケールを確認するには：

```console
$ locale -a
```

## よくある質問

#### Q1. システム言語を変更するにはどうすればよいですか？
A. `sudo update-locale LANG=your_language_code.UTF-8` を使用します（例：フランス語の場合は `LANG=fr_FR.UTF-8`）。

#### Q2. ロケールの変更が反映されないのはなぜですか？
A. 変更を有効にするには、ログアウトして再度ログインする必要があります。現在のシェルですぐに反映させるには、`export LANG=your_language_code.UTF-8` を使用してください。

#### Q3. 追加のロケールを生成するにはどうすればよいですか？
A. まず `sudo locale-gen your_language_code.UTF-8` でロケールを生成し、その後 `update-locale` で設定します。

#### Q4. LANG と LC_ALL の違いは何ですか？
A. `LANG` はすべてのロケールカテゴリのデフォルトであるのに対し、`LC_ALL` は他のすべてのロケール設定を上書きします。`LC_ALL` はトラブルシューティング用なので、控えめに使用してください。

## 参考資料

https://manpages.debian.org/bullseye/locales/update-locale.8.en.html

## 改訂履歴

- 2025/05/05 初版