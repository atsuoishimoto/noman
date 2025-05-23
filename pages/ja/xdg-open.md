# xdg-open コマンド

ユーザーの優先アプリケーションでファイルまたはURLを開きます。

## 概要

`xdg-open`は、ファイルタイプやURLスキームに登録されているデフォルトアプリケーションを使用してファイルやURLを開くデスクトップ非依存のツールです。XDG（X Desktop Group）ユーティリティの一部であり、様々なLinuxデスクトップ環境で動作し、ファイルを関連付けられたアプリケーションで開くための一貫した方法を提供します。

## オプション

### **file**

デフォルトアプリケーションで開くファイルまたはURL

```console
$ xdg-open document.pdf
```

### **--help**

ヘルプ情報を表示する

```console
$ xdg-open --help
```

### **--manual**

マニュアルページを表示する

```console
$ xdg-open --manual
```

### **--version**

バージョン情報を表示する

```console
$ xdg-open --version
```

## 使用例

### デフォルトアプリケーションでファイルを開く

```console
$ xdg-open document.pdf
[デフォルトのPDFビューアでPDFファイルが開かれる]
```

### デフォルトウェブブラウザでURLを開く

```console
$ xdg-open https://www.example.com
[デフォルトのウェブブラウザでURLが開かれる]
```

### ファイルマネージャでディレクトリを開く

```console
$ xdg-open ~/Documents
[デフォルトのファイルマネージャでDocumentsディレクトリが開かれる]
```

### 新しいメッセージでメールクライアントを開く

```console
$ xdg-open mailto:user@example.com
[デフォルトのメールクライアントでuser@example.comへの新しいメッセージが開かれる]
```

## ヒント:

### クロスデスクトップ互換性のためにスクリプトで使用する

`xdg-open`は、ファイルやURLを開く必要があるシェルスクリプトにおいて、デスクトップ環境に依存しない方法として理想的です。GNOME、KDE、Xfceなど、様々なLinuxデスクトップ環境で動作します。

### サイレント操作

`xdg-open`はデフォルトでサイレントに実行されます。エラーメッセージを抑制するには、stderrをリダイレクトします：`xdg-open file.pdf 2>/dev/null`。

### 終了ステータスの確認

このコマンドは成功時に0、エラー発生時に1、指定されたコマンドが無効な場合に2、必要なツールが見つからない場合に3、アクションが失敗した場合に4を返します。

### 代替コマンド

macOSでは代わりに`open`を使用します。Windowsでは`start`を使用します。これらのコマンドはそれぞれのオペレーティングシステムで同様の目的を果たします。

## よくある質問

#### Q1. `xdg-open`と直接アプリケーションを使用することの違いは何ですか？
A. `xdg-open`はファイルタイプやURLに基づいて適切なアプリケーションを自動的に選択しますが、直接アプリケーションを使用する場合は、どのアプリケーションを使用するかを知っている必要があります。

#### Q2. `xdg-open`はどのようにして使用するアプリケーションを決定しますか？
A. ファイルのMIMEタイプとデスクトップ環境のアプリケーション関連付けを使用して、デフォルトアプリケーションを決定します。

#### Q3. 特定のファイルタイプに対して`xdg-open`が使用するアプリケーションを変更できますか？
A. はい、デスクトップ環境の設定（例：GNOMEの「デフォルトアプリケーション」）または`xdg-mime`を使用して、ファイルタイプのデフォルトアプリケーションを変更できます。

#### Q4. `xdg-open`はすべてのLinuxディストリビューションで動作しますか？
A. XDG仕様に従った最新のLinuxディストリビューション、特にGNOME、KDE、Xfceデスクトップ環境を持つものでは動作します。

## 参考文献

https://www.freedesktop.org/wiki/Software/xdg-utils/

## 改訂履歴

- 2025/05/05 初版