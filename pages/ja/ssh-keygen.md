# ssh-keygen コマンド

SSH認証用の鍵を生成、管理、変換するコマンドです。

## 概要

`ssh-keygen`はSSH認証のための公開鍵/秘密鍵のペアを作成します。これらの鍵により、リモートシステムへのセキュアなパスワードレスログインが可能になります。このコマンドは既存の鍵の管理もでき、パスフレーズの変更や鍵フォーマット間の変換なども行えます。

## オプション

### **-t type**

作成する鍵のタイプを指定します（rsa、ed25519、dsa、ecdsa）。

```console
$ ssh-keygen -t ed25519
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25519): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user/.ssh/id_ed25519
Your public key has been saved in /home/user/.ssh/id_ed25519.pub
```

### **-b bits**

鍵のビット数を指定します（デフォルトは鍵のタイプによって異なる）。

```console
$ ssh-keygen -t rsa -b 4096
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): 
```

### **-f filename**

鍵ファイルのファイル名を指定します。

```console
$ ssh-keygen -t rsa -f ~/.ssh/github_key
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase): 
```

### **-C comment**

鍵にコメントを付けます。通常はメールアドレスや説明文を入れます。

```console
$ ssh-keygen -t ed25519 -C "user@example.com"
Generating public/private ed25519 key pair.
```

### **-p**

既存の秘密鍵ファイルのパスフレーズを変更します。

```console
$ ssh-keygen -p -f ~/.ssh/id_rsa
Enter old passphrase: 
Enter new passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved with the new passphrase.
```

### **-l**

指定された公開鍵または秘密鍵ファイルのフィンガープリントを表示します。

```console
$ ssh-keygen -l -f ~/.ssh/id_ed25519
256 SHA256:AbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcdef user@example.com (ED25519)
```

### **-y**

秘密鍵ファイルを読み込み、公開鍵を出力します。

```console
$ ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub
Enter passphrase: 
```

## 使用例

### デフォルトのRSA鍵ペアを作成する

```console
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user/.ssh/id_rsa
Your public key has been saved in /home/user/.ssh/id_rsa.pub
```

### カスタム設定で鍵を作成する

```console
$ ssh-keygen -t ed25519 -C "work laptop" -f ~/.ssh/work_key
Generating public/private ed25519 key pair.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/user/.ssh/work_key
Your public key has been saved in /home/user/.ssh/work_key.pub
```

### 鍵を別のフォーマットに変換する

```console
$ ssh-keygen -e -f ~/.ssh/id_rsa.pub > ~/.ssh/id_rsa_openssh.pub
```

## ヒント

### 適切な鍵タイプを選ぶ

Ed25519鍵は小さいサイズで強力なセキュリティを提供するため、ほとんどのユーザーにおすすめです。RSA鍵も少なくとも3072ビット以上であれば安全ですが、サイズは大きくなります。

### 強力なパスフレーズを使用する

鍵にパスフレーズを追加すると、セキュリティの追加層が提供されます。秘密鍵が盗まれた場合でも、パスフレーズがあれば即座に使用されることを防ぎます。

### 鍵をバックアップする

秘密鍵は常に安全な場所にバックアップを保管してください。秘密鍵を紛失した場合、新しい鍵ペアを生成し、すべてのサーバーを更新する必要があります。

### 鍵の保存場所は重要

デフォルトでは、SSHは~/.sshディレクトリ内の鍵を探します。標準以外の場所を使用する場合は、sshを使用する際に`-i`オプションで鍵のパスを指定する必要があります。

## よくある質問

#### Q1. 公開鍵をサーバーにコピーするにはどうすればよいですか？
A. `ssh-copy-id user@hostname`を使用して、公開鍵をリモートサーバーのauthorized_keysファイルにコピーできます。

#### Q2. RSA鍵とEd25519鍵の違いは何ですか？
A. Ed25519鍵は新しく、小さく、一般的にRSA鍵より高速で、同等以上のセキュリティを提供します。

#### Q3. パスフレーズなしで鍵を生成するにはどうすればよいですか？
A. 鍵生成時にパスフレーズを求められたら、単にEnterキーを押すだけです。

#### Q4. 鍵のパスフレーズを変更するにはどうすればよいですか？
A. `ssh-keygen -p -f ~/.ssh/id_rsa`を使用して、既存の鍵のパスフレーズを変更できます。

#### Q5. 鍵のパスフレーズを忘れた場合はどうすればよいですか？
A. 残念ながら、失われたパスフレーズを回復する方法はありません。新しい鍵ペアを生成する必要があります。

## 参考資料

https://man.openbsd.org/ssh-keygen.1

## 改訂履歴

- 2025/05/05 初版