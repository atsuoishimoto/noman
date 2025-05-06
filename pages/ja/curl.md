# curlコマンド

様々なプロトコルを使用してサーバーとの間でデータを転送するコマンドです。

## 概要

`curl`は、様々なプロトコル（HTTP、HTTPS、FTP、SFTP、SCPなど）を使用してURLでデータを転送するためのコマンドラインツールです。ユーザーの対話なしで動作するように設計されており、ファイルのダウンロード、APIリクエスト、エンドポイントのテストなどに使用できます。`curl`はリクエストのカスタマイズ、認証の処理、データ転送の制御のための多数のオプションをサポートしています。

## オプション

### **-o, --output \<file\>**

出力を標準出力ではなくファイルに書き込みます。

```console
$ curl -o example.html https://example.com
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1256  100  1256    0     0   7503      0 --:--:-- --:--:-- --:--:--  7503
```

### **-O, --remote-name**

リモートファイルと同じ名前のローカルファイルに出力を書き込みます。

```console
$ curl -O https://example.com/file.zip
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 10.2M  100 10.2M    0     0  5.1M      0  0:00:02  0:00:02 --:--:-- 5.1M
```

### **-s, --silent**

サイレントまたは静かなモードで、進行状況メーターやエラーメッセージを表示しません。

```console
$ curl -s https://example.com > example.html
```

### **-I, --head**

HTTPヘッダーのみを取得します。

```console
$ curl -I https://example.com
HTTP/2 200 
content-type: text/html; charset=UTF-8
date: Mon, 05 May 2025 12:00:00 GMT
expires: Mon, 12 May 2025 12:00:00 GMT
cache-control: public, max-age=604800
server: ECS (dcb/7F84)
content-length: 1256
```

### **-L, --location**

サーバーが要求されたページが移動したと報告した場合、リダイレクトに従います。

```console
$ curl -L http://github.com
```

### **-X, --request \<command\>**

使用するリクエストメソッドを指定します（GET、POST、PUT、DELETEなど）。

```console
$ curl -X POST https://api.example.com/data
```

### **-H, --header \<header\>**

カスタムヘッダーをサーバーに渡します。

```console
$ curl -H "Content-Type: application/json" -H "Authorization: Bearer token123" https://api.example.com
```

### **-d, --data \<data\>**

POSTリクエストで指定されたデータを送信します。

```console
$ curl -X POST -d "name=John&age=30" https://api.example.com/users
```

### **--data-binary \<data\>**

追加処理なしで指定されたデータをそのまま送信します。

```console
$ curl --data-binary @filename.json https://api.example.com/upload
```

### **-F, --form \<name=content\>**

multipart/form-dataアップロード（ファイルアップロードなど）用です。

```console
$ curl -F "profile=@photo.jpg" https://api.example.com/upload
```

### **-u, --user \<user:password\>**

サーバー認証のためのユーザーとパスワードを指定します。

```console
$ curl -u username:password https://api.example.com/secure
```

### **-k, --insecure**

SSL使用時に安全でないサーバー接続を許可します。

```console
$ curl -k https://self-signed-certificate.com
```

## 使用例

### ファイルのダウンロード

```console
$ curl -o output.html https://example.com
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1256  100  1256    0     0  12560      0 --:--:-- --:--:-- --:--:-- 12560
```

### JSONデータを使用したPOSTリクエストの作成

```console
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"John","age":30}' https://api.example.com/users
{"id": 123, "status": "created"}
```

### ファイルのアップロード

```console
$ curl -F "file=@document.pdf" https://api.example.com/upload
{"status": "success", "fileId": "abc123"}
```

### リダイレクトに従い、出力を保存

```console
$ curl -L -o result.html https://website-with-redirect.com
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   256  100   256    0     0   1024      0 --:--:-- --:--:-- --:--:--  1024
100  5120  100  5120    0     0  10240      0 --:--:-- --:--:-- --:--:-- 10240
```

## ヒント

### デバッグには詳細モードを使用する

トラブルシューティング時には、`-v`（詳細）または`-vv`（より詳細）を使用して、リクエストとレスポンスの完全な詳細を確認できます：

```console
$ curl -v https://example.com
```

### Cookieを保存して後で使用する

Cookieが必要なセッションの場合：

```console
$ curl -c cookies.txt https://example.com/login -d "user=name&password=secret"
$ curl -b cookies.txt https://example.com/protected-area
```

### 転送速度を制限する

すべての帯域幅を消費しないようにするには：

```console
$ curl --limit-rate 100K -O https://example.com/large-file.zip
```

### 中断されたダウンロードを再開する

ダウンロードが中断された場合、`-C -`で再開できます：

```console
$ curl -C - -O https://example.com/large-file.zip
```

### APIエンドポイントを素早くテストする

スクリプトを書かずに素早くAPIをテストするには：

```console
$ curl -s https://api.example.com/data | jq
```

## よくある質問

#### Q1. curlで複数のファイルをダウンロードするにはどうすればよいですか？
A. 複数の`-O`オプションを使用するか、bashループを使用します：
```console
$ curl -O https://example.com/file1.txt -O https://example.com/file2.txt
```
または：
```console
$ for url in https://example.com/file{1..5}.txt; do curl -O "$url"; done
```

#### Q2. HTTPレスポンスコードのみを確認するにはどうすればよいですか？
A. `-s`と`-o /dev/null`オプションを`-w`と組み合わせて出力をフォーマットします：
```console
$ curl -s -o /dev/null -w "%{http_code}" https://example.com
200
```

#### Q3. 特定のタイムアウトでリクエストを送信するにはどうすればよいですか？
A. `--connect-timeout`と`--max-time`オプションを使用します：
```console
$ curl --connect-timeout 5 --max-time 10 https://example.com
```

#### Q4. curlでSSL証明書エラーを無視するにはどうすればよいですか？
A. `-k`または`--insecure`オプションを使用しますが、セキュリティへの影響に注意してください：
```console
$ curl -k https://self-signed-certificate.com
```

#### Q5. curlをプロキシで使用するにはどうすればよいですか？
A. `-x`または`--proxy`オプションを使用します：
```console
$ curl -x http://proxy-server:8080 https://example.com
```

## 参考文献

https://curl.se/docs/manpage.html

## 改訂履歴

- 2025/05/05 初版