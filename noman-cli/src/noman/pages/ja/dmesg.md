# dmesgコマンド

カーネルリングバッファを表示または制御し、システムメッセージやハードウェア情報を表示します。

## 概要

`dmesg`コマンドは、カーネルリングバッファを調査または制御します。このバッファには、ハードウェアデバイス、ドライバの初期化、システムイベントに関するカーネルからのメッセージが含まれています。特にハードウェアの問題のトラブルシューティング、起動メッセージの確認、システムイベントの監視に役立ちます。

## オプション

### **-c, --clear**

内容を表示した後にリングバッファをクリアします。

```console
$ sudo dmesg -c
[    0.000000] Linux version 5.15.0-76-generic (buildd@lcy02-amd64-017) (gcc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #83-Ubuntu SMP
[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-76-generic root=UUID=1234abcd-1234-1234-1234-1234abcd5678 ro quiet splash
[... その他のカーネルメッセージ ...]
```

### **-H, --human**

読みやすい形式のタイムスタンプを含む人間が読みやすい出力を有効にします。

```console
$ dmesg -H
[May  5 09:15:32] Linux version 5.15.0-76-generic (buildd@lcy02-amd64-017) (gcc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #83-Ubuntu SMP
[May  5 09:15:32] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-76-generic root=UUID=1234abcd-1234-1234-1234-1234abcd5678 ro quiet splash
[... その他のカーネルメッセージ ...]
```

### **-l, --level**

指定された優先度レベル（カンマ区切りリスト）に出力を制限します。

```console
$ dmesg --level=err,warn
[    5.123456] CPU: 0 PID: 123 Comm: systemd-udevd Not tainted 5.15.0-76-generic #83-Ubuntu
[    7.234567] usb 1-2: device descriptor read/64, error -110
[... その他のエラーと警告メッセージ ...]
```

### **-f, --facility**

指定されたファシリティ（カンマ区切りリスト）に出力を制限します。

```console
$ dmesg --facility=kern
[    0.000000] Linux version 5.15.0-76-generic (buildd@lcy02-amd64-017) (gcc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #83-Ubuntu SMP
[... その他のカーネルメッセージ ...]
```

### **-T, --ctime**

人間が読みやすいタイムスタンプを表示します（ctime形式を使用）。

```console
$ dmesg -T
[Mon May  5 09:15:32 2025] Linux version 5.15.0-76-generic (buildd@lcy02-amd64-017) (gcc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #83-Ubuntu SMP
[Mon May  5 09:15:32 2025] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-76-generic root=UUID=1234abcd-1234-1234-1234-1234abcd5678 ro quiet splash
```

### **-w, --follow**

新しいメッセージを待ちます（`tail -f`と同様）。

```console
$ dmesg -w
[    0.000000] Linux version 5.15.0-76-generic
[... 既存のメッセージ ...]
[  123.456789] usb 1-1: new high-speed USB device number 2 using xhci_hcd
[... 新しいメッセージが発生時に表示されます ...]
```

## 使用例

### USB関連のメッセージをフィルタリングする

```console
$ dmesg | grep -i usb
[    2.123456] usb 1-1: new high-speed USB device number 2 using xhci_hcd
[    2.234567] usb 1-1: New USB device found, idVendor=abcd, idProduct=1234, bcdDevice= 1.00
[    2.345678] usb 1-1: New USB device strings: Mfr=1, Product=2, SerialNumber=3
```

### ディスクやファイルシステムのエラーを確認する

```console
$ dmesg | grep -i 'error\|fail\|warn' | grep -i 'disk\|sda\|ext4\|fs'
[   15.123456] EXT4-fs (sda1): mounted filesystem with ordered data mode
[  234.567890] Buffer I/O error on dev sda2, logical block 12345, async page read
```

### カーネルメッセージをリアルタイムで監視する

```console
$ sudo dmesg -wH
[May  5 09:20:15] Linux version 5.15.0-76-generic
[... 既存のメッセージ ...]
[May  5 09:25:32] usb 1-1: new high-speed USB device number 2 using xhci_hcd
[... 人間が読みやすいタイムスタンプ付きで新しいメッセージが発生時に表示されます ...]
```

## ヒント

### 完全なアクセスにはsudoを使用する

多くのシステムでは、一般ユーザーはカーネルメッセージへのアクセスが制限されている場合があります。すべてのメッセージを見るには、特にハードウェアの問題をトラブルシューティングする際に`sudo dmesg`を使用してください。

### 対象を絞ったトラブルシューティングにはgrepと組み合わせる

特定のハードウェアをトラブルシューティングする場合は、`dmesg`の出力を関連キーワードで`grep`にパイプします。例えば、無線の問題には`dmesg | grep -i wifi`、ディスクの問題には`dmesg | grep -i sda`などを使用します。

### システム更新後に起動メッセージを確認する

カーネル更新やシステム変更の後は、`dmesg`の出力を確認して、すべてのハードウェアが適切に検出され、初期化中にエラーが発生していないことを確認してください。

### 新しい監視のためにバッファをクリアする

メッセージを確認した後、`sudo dmesg -c`を使用してバッファをクリアし、古いメッセージの混乱なしに新しい問題を監視します。

## よくある質問

#### Q1. 一部のシステムでdmesgを実行するのになぜsudoが必要なのですか？
A. 多くの最新のLinuxディストリビューションでは、セキュリティ上の理由からカーネルメッセージへのアクセスが制限されています。`sudo`を使用することで、すべてのメッセージを表示するために必要な権限が提供されます。

#### Q2. 読みやすい形式でタイムスタンプを表示するにはどうすればよいですか？
A. ctime形式の人間が読みやすいタイムスタンプには`dmesg -T`を使用するか、相対タイムスタンプを含むよりコンパクトな人間が読みやすい出力には`dmesg -H`を使用します。

#### Q3. dmesgの出力を継続的に監視するにはどうすればよいですか？
A. `dmesg -w`または`dmesg --follow`を使用して、`tail -f`と同様にリアルタイムで新しいメッセージを監視します。

#### Q4. dmesgの出力をファイルに保存するにはどうすればよいですか？
A. リダイレクションを使用します：`dmesg > dmesg_output.txt`または出力を表示して保存するには`dmesg | tee dmesg_output.txt`を使用します。

## 参考文献

https://man7.org/linux/man-pages/man1/dmesg.1.html

## 改訂履歴

- 2025/05/05 初版