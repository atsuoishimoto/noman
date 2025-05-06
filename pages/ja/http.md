# http コマンド

任意のHTTPリクエストを送信し、レスポンスを表示します。

## 概要

`http`コマンドは、HTTPリクエストを行うためのユーザーフレンドリーなコマンドラインHTTPクライアントです。これはHTTPieツールの一部で、カラー出力、JSONサポート、よりシンプルな構文を備え、curlよりも直感的に設計されています。APIのテスト、Webサービスのデバッグ、最小限の入力でのコンテンツのダウンロードが可能です。

## オプション

### **-j, --json**

データをJSONとして送信します。Content-Typeヘッダーをapplication/jsonに設定します。

```console
$ http -j POST example.com name=John age:=30
```

### **-f, --form**

データをフォームエンコードとして送信します。Content-Typeヘッダーをapplication/x-www-form-urlencodedに設定します。

```console
$ http -f POST example.com name=John age=30
```

### **-a, --auth**

認証用のユーザー名とパスワードを指定します。

```console
$ http -a username:password example.com
```

### **-h, --headers**

レスポンスヘッダーのみを表示します。

```console
$ http -h example.com
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Date: Mon, 05 May 2025 12:00:00 GMT
Server: nginx
Content-Length: 1256
```

### **-v, --verbose**

HTTP通信全体（リクエストとレスポンス）を表示します。

```console
$ http -v example.com
```

### **-d, --download**

レスポンスボディをファイルにダウンロードします。

```console
$ http -d example.com/file.pdf
```

### **--offline**

リクエストを構築して表示しますが、送信はしません。

```console
$ http --offline POST example.com name=John
```

## 使用例

### 基本的なGETリクエスト

```console
$ http example.com
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
...

<!doctype html>
<html>
...
</html>
```

### JSONデータを使用したPOST

```console
$ http POST api.example.com/users name=John age:=30 is_active:=true
HTTP/1.1 201 Created
Content-Type: application/json

{
    "id": 123,
    "name": "John",
    "age": 30,
    "is_active": true
}
```

### リクエストヘッダーの使用

```console
$ http example.com User-Agent:MyApp X-API-Token:abc123
```

### ファイルアップロード

```console
$ http POST example.com/upload file@/path/to/file.jpg
```

## ヒント:

### 文字列以外のJSON値には`:=`を使用する

JSONデータを送信する際、数値、ブール値、nullには`:=`を使用します: `count:=42 active:=true data:=null`

### 出力をファイルにリダイレクトする

標準シェルのリダイレクトを使用してレスポンスを保存できます: `http example.com > response.html`

### セッションを使用して永続的なクッキーを維持する

`--session=name`を使用してリクエスト間でクッキーを維持します: `http --session=logged-in -a user:pass example.com`

### JSONは自動的に整形表示される

HTTPieは自動的にJSONレスポンスを読みやすく整形し、ターミナルでの構文ハイライトを提供します。

## よくある質問

#### Q1. `http`と`curl`の違いは何ですか？
A. `http`（HTTPie）は、より直感的な構文、自動カラー出力、デフォルトのJSONサポートを提供し、一般的な操作に必要な入力が少なくて済みます。

#### Q2. クエリパラメータを送信するにはどうすればよいですか？
A. URLに`?`と`&`を付けて追加します: `http example.com/search?q=term&page=2` または`==`構文を使用します: `http example.com q==term page==2`

#### Q3. カスタムHTTPメソッドを送信するにはどうすればよいですか？
A. URLの前にメソッドを指定するだけです: `http PUT example.com`

#### Q4. リダイレクトに従うにはどうすればよいですか？
A. `--follow`オプションを使用します: `http --follow example.com/redirecting-url`

## 参考文献

https://httpie.io/docs/cli

## 改訂履歴

- 2025/05/05 初版