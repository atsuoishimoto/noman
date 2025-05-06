# passwd コマンド

ユーザーパスワードを変更します。

## 概要

`passwd` コマンドを使用すると、ユーザーは自分自身のパスワードを変更したり、システム管理者の場合は他のユーザーのパスワードを変更または管理したりすることができます。このコマンドは、ユーザーアカウント情報と暗号化されたパスワードを保存する `/etc/passwd` および `/etc/shadow` ファイルを変更します。

## オプション

### **-d**

ユーザーのパスワードを削除します（空にします）。このオプションはroot権限が必要です。

```console
$ sudo passwd -d username
passwd: password expiry information changed.
```

### **-l**

暗号化されたパスワードの先頭に感嘆符を付けることで、指定されたアカウントをロックします。これによりユーザーはログインできなくなります。

```console
$ sudo passwd -l username
passwd: password expiry information changed.
```

### **-u**

感嘆符のプレフィックスを削除して、ロックされたパスワードをロック解除します。

```console
$ sudo passwd -u username
passwd: password expiry information changed.
```

### **-e**

ユーザーのパスワードを期限切れにし、次回ログイン時にパスワード変更を強制します。

```console
$ sudo passwd -e username
passwd: password expiry information changed.
```

### **-S**

アカウントのパスワードステータス情報を表示します。

```console
$ passwd -S username
username PS 2025-04-01 0 99999 7 -1
```

## 使用例

### 自分自身のパスワードを変更する

```console
$ passwd
Changing password for user.
Current password: 
New password: 
Retype new password: 
passwd: all authentication tokens updated successfully.
```

### 他のユーザーのパスワードを変更する（root権限で）

```console
$ sudo passwd username
New password: 
Retype new password: 
passwd: all authentication tokens updated successfully.
```

### アカウントのロックとロック解除

```console
$ sudo passwd -l username
passwd: password expiry information changed.
$ sudo passwd -u username
passwd: password expiry information changed.
```

## ヒント:

### パスワードの複雑さの要件

ほとんどのシステムではパスワードの複雑さのルールが適用されています。強力なパスワードは通常、以下の条件を満たす必要があります：
- 少なくとも8文字以上の長さ
- 大文字と小文字を含む
- 数字と特殊文字を含む
- 辞書の単語や個人情報に基づいていない

### パスワードステータスの確認

`passwd -S username` を使用して、パスワードがロックされているか、期限切れになっているか、または最後に変更された日時を確認できます。

### パスワードファイル

実際の暗号化されたパスワードは `/etc/passwd` ではなく `/etc/shadow` に保存されています。セキュリティ上の理由から、shadowファイルはrootのみが読み取り可能です。

## よくある質問

#### Q1. 自分のパスワードを変更するにはどうすればよいですか？
A. 単に `passwd` と入力し、現在のパスワードを入力し、その後新しいパスワードを2回入力するプロンプトに従ってください。

#### Q2. ユーザーに次回ログイン時にパスワードを変更させるにはどうすればよいですか？
A. `sudo passwd -e username` を使用してユーザーのパスワードを期限切れにします。

#### Q3. 「authentication token manipulation error」とはどういう意味ですか？
A. これは通常、パスワードファイルのシステム問題または権限不足を示しています。他のユーザーのパスワードを変更できるのはrootのみです。

#### Q4. パスワードなしでユーザーを作成するにはどうすればよいですか？
A. まず通常のパスワードでユーザーを作成し、その後 `sudo passwd -d username` を使用してパスワードを削除します。

## 参考文献

https://man7.org/linux/man-pages/man1/passwd.1.html

## 改訂履歴

- 2025/05/05 初版