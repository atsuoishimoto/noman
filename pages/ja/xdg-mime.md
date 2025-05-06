# xdg-mime コマンド

デスクトップ環境でファイルタイプの関連付けを照会または設定します。

## 概要

`xdg-mime` は、Linux デスクトップ環境でファイルタイプの関連付けを管理するためのコマンドラインツールです。特定のファイルタイプ（MIME タイプ）に関連付けられたアプリケーションの照会、ファイルタイプのデフォルトアプリケーションの設定、システムへの新しい MIME タイプ情報の追加などが可能です。

## オプション

### **query default**

MIME タイプのデフォルトアプリケーションを照会します

```console
$ xdg-mime query default text/plain
gedit.desktop
```

### **query filetype**

ファイルの MIME タイプを判定します

```console
$ xdg-mime query filetype document.pdf
application/pdf
```

### **default**

MIME タイプのデフォルトアプリケーションを設定します

```console
$ xdg-mime default firefox.desktop text/html
```

### **install**

XML ファイルから新しい MIME 情報をインストールします

```console
$ xdg-mime install --mode user myapplication-mime.xml
```

### **uninstall**

MIME 情報を削除します

```console
$ xdg-mime uninstall --mode user myapplication-mime.xml
```

## 使用例

### Firefox をデフォルトブラウザとして設定する

```console
$ xdg-mime default firefox.desktop x-scheme-handler/http
$ xdg-mime default firefox.desktop x-scheme-handler/https
```

### PDF ファイルを開くアプリケーションを確認する

```console
$ xdg-mime query default application/pdf
okular.desktop
```

### ファイルの MIME タイプを確認する

```console
$ xdg-mime query filetype ~/Downloads/presentation.pptx
application/vnd.openxmlformats-officedocument.presentationml.presentation
```

## ヒント:

### デスクトップファイルの場所

デスクトップファイルは通常 `/usr/share/applications/` または `~/.local/share/applications/` にあります。デフォルトアプリケーションを設定する際にはこれらのファイルを参照する必要があります。

### カスタム MIME タイプの作成

XML ファイルを作成し、`xdg-mime install` でインストールすることでカスタム MIME タイプを作成できます。これは特殊なファイル形式を扱うアプリケーションに役立ちます。

### システム設定とユーザー設定

`--mode user` を使用すると現在のユーザーのみに変更が適用され、`--mode system` を使用するとシステム全体に変更が適用されます（root 権限が必要です）。

## よくある質問

#### Q1. ファイルの MIME タイプを調べるにはどうすればよいですか？
A. `xdg-mime query filetype ファイル名` を使用して MIME タイプを判定できます。

#### Q2. ファイルタイプのデフォルトアプリケーションを設定するにはどうすればよいですか？
A. `xdg-mime default アプリケーション.desktop MIMEタイプ` を使用します。アプリケーション.desktop はデスクトップファイル、MIMEタイプは MIME タイプです。

#### Q3. MIME タイプの関連付けはどこに保存されますか？
A. ユーザー固有の関連付けは `~/.config/mimeapps.list` に、システム全体の関連付けは `/usr/share/applications/mimeapps.list` に保存されます。

#### Q4. ファイルの関連付けをシステムのデフォルトにリセットするにはどうすればよいですか？
A. `~/.config/mimeapps.list` ファイルから関連するエントリを削除します。

## 参考文献

https://portland.freedesktop.org/doc/xdg-mime.html

## 改訂履歴

- 2025/05/05 初版