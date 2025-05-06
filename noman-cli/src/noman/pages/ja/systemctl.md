# systemctl コマンド

systemdシステムとサービスマネージャーを制御します。

## 概要

`systemctl` は、systemdシステムとサービスマネージャーを制御・管理するためのコマンドラインユーティリティです。システムサービスの起動、停止、再起動、有効化、無効化、状態確認などを行うことができます。これは、ほとんどの最新のLinuxディストリビューションで使用されているinitシステムおよびサービスマネージャーであるsystemdと対話するための主要なツールです。

## オプション

### **status**

1つ以上のユニットの実行時状態を表示します

```console
$ systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2025-05-05 10:15:30 UTC; 2h 30min ago
     Docs: man:nginx(8)
  Process: 1234 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
  Process: 1235 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
 Main PID: 1236 (nginx)
    Tasks: 2 (limit: 4915)
   Memory: 3.0M
   CGroup: /system.slice/nginx.service
           ├─1236 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─1237 nginx: worker process
```

### **start**

1つ以上のユニットを起動（アクティブ化）します

```console
$ sudo systemctl start nginx
```

### **stop**

1つ以上のユニットを停止（非アクティブ化）します

```console
$ sudo systemctl stop nginx
```

### **restart**

1つ以上のユニットを再起動します

```console
$ sudo systemctl restart nginx
```

### **reload**

1つ以上のユニットを再読み込みします

```console
$ sudo systemctl reload nginx
```

### **enable**

1つ以上のユニットをブート時に起動するよう有効化します

```console
$ sudo systemctl enable nginx
Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /lib/systemd/system/nginx.service.
```

### **disable**

1つ以上のユニットがブート時に起動しないよう無効化します

```console
$ sudo systemctl disable nginx
Removed /etc/systemd/system/multi-user.target.wants/nginx.service.
```

### **is-active**

ユニットがアクティブかどうかを確認します

```console
$ systemctl is-active nginx
active
```

### **is-enabled**

ユニットが有効かどうかを確認します

```console
$ systemctl is-enabled nginx
enabled
```

### **list-units**

読み込まれているユニットを一覧表示します

```console
$ systemctl list-units
UNIT                                      LOAD   ACTIVE SUB     DESCRIPTION
proc-sys-fs-binfmt_misc.automount         loaded active waiting Arbitrary Executable File Formats File System
sys-devices-pci0000:00-0000:00:02.0-drm-card0-card0\x2dDP\x2d1-intel_backlight.device loaded active plugged /sys/devices/pci0000:00/0000:00:02.0/drm/card0/card0-DP-1/intel_backlight
sys-devices-platform-serial8250-tty-ttyS0.device loaded active plugged /sys/devices/platform/serial8250/tty/ttyS0
...
```

### **--type=TYPE**

特定のタイプのユニットを一覧表示します

```console
$ systemctl --type=service
UNIT                               LOAD   ACTIVE SUB     DESCRIPTION
accounts-daemon.service            loaded active running Accounts Service
apparmor.service                   loaded active exited  AppArmor initialization
apport.service                     loaded active exited  LSB: automatic crash report generation
...
```

### **daemon-reload**

systemdマネージャーの設定を再読み込みします

```console
$ sudo systemctl daemon-reload
```

## 使用例

### 特定のサービスの状態を確認する

```console
$ systemctl status ssh
● ssh.service - OpenBSD Secure Shell server
   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2025-05-05 09:45:23 UTC; 3h 10min ago
  Process: 1122 ExecStartPre=/usr/sbin/sshd -t (code=exited, status=0/SUCCESS)
 Main PID: 1123 (sshd)
    Tasks: 1 (limit: 4915)
   Memory: 5.6M
   CGroup: /system.slice/ssh.service
           └─1123 /usr/sbin/sshd -D
```

### サービスを再起動してその状態を確認する

```console
$ sudo systemctl restart nginx && systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2025-05-05 13:05:45 UTC; 2s ago
     Docs: man:nginx(8)
  Process: 5678 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
  Process: 5679 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
 Main PID: 5680 (nginx)
    Tasks: 2 (limit: 4915)
   Memory: 2.8M
   CGroup: /system.slice/nginx.service
           ├─5680 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─5681 nginx: worker process
```

### 失敗したすべてのサービスを一覧表示する

```console
$ systemctl list-units --state=failed
UNIT                  LOAD   ACTIVE SUB    DESCRIPTION
mysql.service         loaded failed failed MySQL Database Server
openvpn.service       loaded failed failed OpenVPN service
```

## ヒント:

### タブ補完を使用する

Systemctlはサービス名のタブ補完をサポートしており、正確な名前を覚えていなくてもサービスを簡単に管理できます。

### サービスログを確認する

サービスのトラブルシューティングを行う場合は、`journalctl -u サービス名`を使用して、そのサービスに固有のログを表示します。

### サービスをマスクする

サービスが（手動でも）起動されないようにするには、`systemctl mask サービス名`を使用します。これにより/dev/nullへのシンボリックリンクが作成され、`systemctl unmask サービス名`でマスク解除されるまでサービスを起動できなくなります。

### サービスの依存関係を表示する

`systemctl list-dependencies サービス名`を使用して、特定のサービスが依存している他のサービスを確認します。

### システム状態を管理する

サービス以外にも、systemctlはシステムの再起動（`systemctl reboot`）、電源オフ（`systemctl poweroff`）、サスペンド（`systemctl suspend`）などのシステム状態を管理できます。

## よくある質問

#### Q1. `systemctl stop`と`systemctl disable`の違いは何ですか？
A. `systemctl stop`は実行中のサービスを即座に停止しますが、ブート時の動作は変更しません。`systemctl disable`はサービスがブート時に自動的に起動しないようにしますが、現在実行中のサービスには影響しません。

#### Q2. サービス設定の変更を反映するにはどうすればよいですか？
A. サービスファイルを変更した後、`sudo systemctl daemon-reload`を実行してsystemdマネージャーの設定を再読み込みし、その後`sudo systemctl restart サービス名`でサービスを再起動します。

#### Q3. 利用可能なすべてのサービスを確認するにはどうすればよいですか？
A. `systemctl list-unit-files --type=service`を使用して、利用可能なすべてのサービスユニットファイルとその状態を確認できます。

#### Q4. カスタムsystemdサービスを作成するにはどうすればよいですか？
A. /etc/systemd/system/に.serviceファイルを作成し、`systemctl daemon-reload`を実行して登録し、`systemctl enable`でブート時に有効化します。

#### Q5. サービスの「masked」ステータスとは何ですか？
A. マスクされたサービスは、手動でも自動でも完全に起動が防止されています。これは「無効化」よりも強力な形式であり、サービスファイルから/dev/nullへのシンボリックリンクを作成することで実現されます。

## 参考文献

https://www.freedesktop.org/software/systemd/man/systemctl.html

## 改訂履歴

- 2025/05/05 初版