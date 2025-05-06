# statコマンド

ファイルやファイルシステムのステータス情報を表示します。

## 概要

`stat`コマンドは、ファイル、ディレクトリ、またはファイルシステムに関する詳細情報を表示します。ファイルサイズ、パーミッション、アクセス時間、inode情報など、メタデータを表示します。このコマンドは、`ls`のような基本的なコマンドが提供する以上のファイル属性を調べる必要があるシステム管理者やユーザーにとって便利です。

## オプション

### **-c, --format=FORMAT**

指定したフォーマット文字列を使用して情報を出力します。

```console
$ stat -c "%n %s %U" file.txt
file.txt 1024 user
```

### **-f, --file-system**

ファイルのステータスではなく、ファイルシステムのステータスを表示します。

```console
$ stat -f /home
  File: "/home"
    ID: 2f5b04742a3bfad9 Namelen: 255     Type: ext4
Block size: 4096       Fundamental block size: 4096
Blocks: Total: 121211648  Free: 62303156   Available: 56073252
Inodes: Total: 30539776   Free: 29752540
```

### **-L, --dereference**

リンクをたどります（リンク自体ではなく、リンクが参照するファイルの情報を表示します）。

```console
$ stat -L symlink.txt
  File: 'symlink.txt'
  Size: 1024      	Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d	Inode: 1234567     Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/    user)   Gid: ( 1000/    user)
Access: 2025-05-01 10:15:30.000000000 +0000
Modify: 2025-05-01 10:15:30.000000000 +0000
Change: 2025-05-01 10:15:30.000000000 +0000
 Birth: 2025-05-01 10:15:30.000000000 +0000
```

### **-t, --terse**

情報を簡潔な形式で表示します。

```console
$ stat -t file.txt
file.txt 1024 8 81a4 1000 1000 801 1234567 1 0 0 1619875530 1619875530 1619875530 1619875530
```

### **--printf=FORMAT**

--formatと似ていますが、バックスラッシュエスケープを解釈し、必須の末尾の改行を出力しません。

```console
$ stat --printf="%n has %s bytes\n" file.txt
file.txt has 1024 bytes
```

## 使用例

### 基本的なファイル情報

```console
$ stat document.txt
  File: document.txt
  Size: 1024      	Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d	Inode: 1234567     Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/    user)   Gid: ( 1000/    user)
Access: 2025-05-01 10:15:30.000000000 +0000
Modify: 2025-05-01 10:15:30.000000000 +0000
Change: 2025-05-01 10:15:30.000000000 +0000
 Birth: 2025-05-01 10:15:30.000000000 +0000
```

### 複数ファイルのカスタムフォーマット

```console
$ stat -c "Name: %n, Size: %s bytes, Owner: %U" *.txt
Name: document.txt, Size: 1024 bytes, Owner: user
Name: notes.txt, Size: 512 bytes, Owner: user
Name: readme.txt, Size: 256 bytes, Owner: user
```

### ファイルシステム情報

```console
$ stat -f /
  File: "/"
    ID: 2f5b04742a3bfad9 Namelen: 255     Type: ext4
Block size: 4096       Fundamental block size: 4096
Blocks: Total: 121211648  Free: 62303156   Available: 56073252
Inodes: Total: 30539776   Free: 29752540
```

## ヒント:

### 特定の情報のみを取得する

フォーマット指定子を使用して`-c`オプションを使用し、必要な情報だけを抽出します。例えば、`stat -c "%s" file.txt`はファイルサイズのみを表示します。

### ファイルのタイムスタンプを比較する

ファイルが最後にアクセスされた時間、変更された時間、またはメタデータが変更された時間を確認するために`stat`を使用します。これはトラブルシューティングやファイル操作の検証に役立ちます。

### inode情報を確認する

`stat`で表示されるinode番号は、2つのファイルがハードリンクされているかどうかを識別するのに役立ちます（同じinode番号を共有します）。

### フォーマット指定子

`-c`オプションの一般的なフォーマット指定子を覚えましょう：
- `%n`: ファイル名
- `%s`: 合計サイズ（バイト単位）
- `%U`: 所有者のユーザー名
- `%G`: 所有者のグループ名
- `%a`: 8進数でのアクセス権
- `%x`: 最終アクセス時間
- `%y`: 最終変更時間
- `%z`: 最終ステータス変更時間

## よくある質問

#### Q1. 変更時間（Modify）とステータス変更時間（Change）の違いは何ですか？
A. 変更時間（`%y`）はファイルの内容が最後に変更された時間です。ステータス変更時間（`%z`）はファイルのメタデータ（パーミッション、所有権など）が最後に変更された時間です。

#### Q2. ファイルサイズだけを確認するにはどうすればよいですか？
A. `stat -c "%s" ファイル名`を使用して、バイト単位のファイルサイズのみを表示します。

#### Q3. statでディスク容量を確認するにはどうすればよいですか？
A. `stat -f /ファイルシステムのパス`を使用して、合計、空き、利用可能な容量を含むファイルシステム情報を確認します。

#### Q4. statとls -lの違いは何ですか？
A. `stat`はファイルに関するより詳細なメタデータ（正確なタイムスタンプやinode情報を含む）を提供しますが、`ls -l`はファイル属性のより簡潔な要約を提供します。

## macOSでの考慮事項

macOSでは、`stat`コマンドの構文とオプションがGNU/Linuxとは異なります。フォーマットオプションは`-c`の代わりに`-f`を使用し、フォーマット指定子も異なります：

```console
$ stat -f "Name: %N, Size: %z bytes, Owner: %Su" file.txt
Name: file.txt, Size: 1024 bytes, Owner: user
```

macOSの一般的なフォーマット指定子：
- `%N`: ファイル名
- `%z`: サイズ（バイト単位）
- `%Su`: 所有者のユーザー名
- `%Sg`: 所有者のグループ名
- `%Sp`: ファイルパーミッション
- `%a`: 最終アクセス時間
- `%m`: 最終変更時間
- `%c`: 最終ステータス変更時間

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/stat-invocation.html

## 改訂履歴

- 2025/05/05 初版