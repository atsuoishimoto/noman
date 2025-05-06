# pstreeコマンド

実行中のプロセスをツリー形式で表示します。

## 概要

`pstree`コマンドは、システム上で実行中のプロセスをツリー状の図で表示し、プロセス間の親子関係を示します。この視覚化によって、プロセスの階層構造や、どのプロセスが他のプロセスを生成したかを簡単に理解できます。

## オプション

### **-a**

コマンドライン引数を表示します。

```console
$ pstree -a
systemd
  ├─NetworkManager --no-daemon
  ├─accounts-daemon
  ├─avahi-daemon
  │   └─avahi-daemon
  └─sshd
      └─sshd
          └─sshd
              └─bash
```

### **-p**

PID（プロセスID）を表示します。

```console
$ pstree -p
systemd(1)
  ├─NetworkManager(623)
  ├─accounts-daemon(645)
  ├─avahi-daemon(647)
  │   └─avahi-daemon(648)
  └─sshd(1025)
      └─sshd(2156)
          └─sshd(2158)
              └─bash(2159)
```

### **-n**

プロセスを名前ではなくPIDでソートします。

```console
$ pstree -n
systemd
  ├─systemd-journald
  ├─systemd-udevd
  ├─systemd-resolved
  ├─NetworkManager
  ├─accounts-daemon
  └─sshd
```

### **-u**

uid（ユーザーID）の変更を表示します。

```console
$ pstree -u
systemd
  ├─NetworkManager
  ├─accounts-daemon(root)
  ├─avahi-daemon(avahi)
  │   └─avahi-daemon(avahi)
  └─sshd
      └─sshd(john)
          └─bash(john)
```

### **-h**

現在のプロセスとその祖先を強調表示します。

```console
$ pstree -h
systemd
  ├─NetworkManager
  ├─accounts-daemon
  └─sshd
      └─sshd
          └─sshd
              └─bash───pstree
```

### **-g**

PGID（プロセスグループID）を表示します。

```console
$ pstree -g
systemd(1)
  ├─NetworkManager(623,623)
  ├─accounts-daemon(645,645)
  └─sshd(1025,1025)
      └─sshd(2156,2156)
          └─bash(2159,2159)
```

## 使用例

### 特定ユーザーのプロセスを表示する

```console
$ pstree username
sshd───bash───vim
```

### オプションを組み合わせて詳細な出力を得る

```console
$ pstree -apu
systemd(1)
  ├─NetworkManager(623) --no-daemon
  ├─accounts-daemon(645)
  ├─avahi-daemon(647)(avahi)
  │   └─avahi-daemon(648)(avahi)
  └─sshd(1025)
      └─sshd(2156)(john)
          └─bash(2159)(john)
```

### 特定のプロセスとその子プロセスを見つける

```console
$ pstree -p | grep firefox
        │           ├─firefox(2345)───{firefox}(2346)
        │           │                 ├─{firefox}(2347)
        │           │                 ├─{firefox}(2348)
        │           │                 └─{firefox}(2349)
```

## ヒント:

### コンパクト表示
デフォルトでは、同一のツリーブランチはスペースを節約するために圧縮されます。`-c`オプションを使用すると、この動作を無効にして、すべてのプロセスを個別に表示できます。

### ASCII文字
ツリー構造がターミナルで正しく表示されない場合は、`-A`オプションを使用して、デフォルトのUTF-8文字の代わりにASCII文字を使用します。

### プロセスの系統をたどる
デバッグ時には、`pstree -p`を使用してプロセスの親子関係をすばやく特定できます。これはアプリケーションの構造を理解するのに役立ちます。

### grepと組み合わせる
出力をgrepにパイプして特定のプロセスを見つけます: `pstree -p | grep firefox`

## よくある質問

#### Q1. pstreeはpsとどう違いますか？
A. `ps`はプロセスをフラットなリストで表示しますが、`pstree`はプロセスを親子関係を示す階層的なツリー構造で表示します。

#### Q2. pstreeでプロセスIDを見ることはできますか？
A. はい、`-p`オプションを使用すると、プロセス名と一緒にプロセスIDを表示できます。

#### Q3. コマンドライン引数を表示するにはどうすればよいですか？
A. `-a`オプションを使用すると、各プロセスのコマンドライン引数を表示できます。

#### Q4. 特定のユーザーのプロセスだけを表示できますか？
A. はい、ユーザー名を引数として指定します: `pstree username`

#### Q5. テキストのみのターミナルで出力を読みやすくするにはどうすればよいですか？
A. `-A`オプションを使用して、ツリー構造にUTF-8の代わりにASCII文字を使用します。

## 参考資料

https://man7.org/linux/man-pages/man1/pstree.1.html

## 改訂履歴

- 2025/05/05 初版