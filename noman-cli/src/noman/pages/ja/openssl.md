# opensslコマンド

暗号化機能の管理（証明書の作成、暗号化、安全な接続など）を行います。

## 概要

OpenSSLは、SSL/TLSプロトコルとさまざまな暗号化機能を扱うための堅牢なコマンドラインツールです。証明書の作成、鍵の生成、ファイルの暗号化/復号化、データのハッシュ化、安全な接続のテストなどが可能です。このコマンドは、ネットワーク通信のセキュリティ実装やデジタル証明書の管理のための幅広い機能を提供します。

## オプション

### **req**

証明書リクエストの作成と処理

```console
$ openssl req -new -key private.key -out request.csr
You are about to be asked to enter information that will be incorporated
into your certificate request.
...
```

### **x509**

証明書の表示と署名ユーティリティ

```console
$ openssl x509 -in certificate.crt -text -noout
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number: 12345 (0x3039)
...
```

### **genrsa**

RSA秘密鍵の生成

```console
$ openssl genrsa -out private.key 2048
Generating RSA private key, 2048 bit long modulus
.....+++
.............+++
e is 65537 (0x10001)
```

### **rsa**

RSA鍵の処理

```console
$ openssl rsa -in private.key -pubout -out public.key
writing RSA key
```

### **s_client**

接続テスト用のSSL/TLSクライアントプログラム

```console
$ openssl s_client -connect example.com:443
CONNECTED(00000003)
depth=2 O = Digital Signature Trust Co., CN = DST Root CA X3
...
```

### **enc**

さまざまな暗号アルゴリズムを使用した暗号化または復号化

```console
$ openssl enc -aes-256-cbc -salt -in plaintext.txt -out encrypted.txt
enter aes-256-cbc encryption password:
Verifying - enter aes-256-cbc encryption password:
```

### **dgst**

メッセージダイジェスト（ハッシュ）の計算

```console
$ openssl dgst -sha256 file.txt
SHA256(file.txt)= 3a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b
```

## 使用例

### 自己署名証明書の作成

```console
$ openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
Generating a 4096 bit RSA private key
.......................++
.......................++
writing new private key to 'key.pem'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
...
```

### 証明書チェーンの検証

```console
$ openssl verify -CAfile ca-bundle.crt certificate.crt
certificate.crt: OK
```

### 証明書フォーマットの変換

```console
$ openssl x509 -in certificate.crt -inform PEM -out certificate.der -outform DER
```

### SSL/TLS接続の詳細確認

```console
$ openssl s_client -connect example.com:443 -showcerts
CONNECTED(00000003)
depth=2 O = Digital Signature Trust Co., CN = DST Root CA X3
...
```

## ヒント:

### 証明書の有効期限の確認

`openssl x509 -enddate -noout -in certificate.crt`を使用すると、証明書の詳細をすべて表示せずに、証明書の有効期限をすぐに確認できます。

### 強力なランダムパスワードの生成

`openssl rand -base64 16`を使用して、16バイトの安全なランダムパスワード（base64でエンコードされて表示）を生成できます。

### ブラウザでの証明書情報の表示

ウェブサイトに接続せずに証明書の詳細を確認するには、証明書をローカルに保存した後、`openssl x509 -in certificate.crt -text -noout`を使用します。

### SSL/TLS接続のトラブルシューティング

接続の問題が発生した場合は、`openssl s_client -connect hostname:port -debug`を使用して、ハンドシェイクプロセスに関する詳細情報を確認できます。

## よくある質問

#### Q1. CSR（証明書署名リクエスト）を作成するにはどうすればよいですか？
A. `openssl req -new -key private.key -out request.csr`を使用します。組織名や共通名などの証明書情報の入力を求められます。

#### Q2. 証明書の内容を確認するにはどうすればよいですか？
A. `openssl x509 -in certificate.crt -text -noout`を使用すると、人間が読める形式で証明書の詳細が表示されます。

#### Q3. 証明書をPEM形式からPKCS#12形式に変換するにはどうすればよいですか？
A. `openssl pkcs12 -export -out certificate.pfx -inkey private.key -in certificate.crt`を使用して、証明書と秘密鍵の両方を含むPKCS#12ファイルを作成します。

#### Q4. サーバーへのSSL/TLS接続をテストするにはどうすればよいですか？
A. `openssl s_client -connect hostname:port`を使用して接続を確立し、証明書情報を表示します。

#### Q5. 鍵やパスワードとして使用するランダムな文字列を生成するにはどうすればよいですか？
A. `openssl rand -base64 32`を使用して、base64でエンコードされた32バイトのランダムな文字列を生成します。

## 参考資料

https://www.openssl.org/docs/man1.1.1/man1/

## 改訂履歴

- 2025/05/05 初版