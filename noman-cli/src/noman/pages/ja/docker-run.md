# docker run コマンド

イメージから新しいコンテナを作成して起動します。

## 概要

`docker run` は、指定されたDockerイメージから新しいコンテナを作成して実行します。このコマンドは `docker create` と `docker start` の機能を1つのコマンドに統合したものです。このコマンドは、様々な設定、ネットワーク設定、ボリュームマウント、ランタイムパラメータを持つコンテナを起動するための基本的なコマンドです。

## オプション

### **--name**

コンテナに名前を割り当てます

```console
$ docker run --name my-nginx nginx
```

### **-d, --detach**

コンテナをバックグラウンドで実行し、コンテナIDを表示します

```console
$ docker run -d nginx
7cb5d2b9a7eab87f07182b5bf58936c9947890995b1b94f412912fa822a9ecb5
```

### **-p, --publish**

コンテナのポートをホストに公開します

```console
$ docker run -p 8080:80 nginx
```

### **-v, --volume**

ボリュームをバインドマウントします

```console
$ docker run -v /host/path:/container/path nginx
```

### **-e, --env**

環境変数を設定します

```console
$ docker run -e MYSQL_ROOT_PASSWORD=my-secret-pw mysql
```

### **--rm**

コンテナが終了したときに自動的に削除します

```console
$ docker run --rm alpine echo "Hello, World!"
Hello, World!
```

### **-i, --interactive**

アタッチされていなくても標準入力を開いたままにします

```console
$ docker run -i ubuntu
```

### **-t, --tty**

疑似TTYを割り当てます

```console
$ docker run -it ubuntu bash
root@7cb5d2b9a7ea:/#
```

### **--network**

コンテナをネットワークに接続します

```console
$ docker run --network=my-network nginx
```

### **--restart**

コンテナが終了したときに適用する再起動ポリシーを設定します

```console
$ docker run --restart=always nginx
```

## 使用例

### ポートマッピングを使用したWebサーバーの実行

```console
$ docker run -d --name my-website -p 8080:80 nginx
7cb5d2b9a7eab87f07182b5bf58936c9947890995b1b94f412912fa822a9ecb5
```

### コンテナ内でインタラクティブシェルを実行

```console
$ docker run -it --rm ubuntu bash
root@7cb5d2b9a7ea:/# ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@7cb5d2b9a7ea:/# exit
```

### 環境変数とボリュームマウントを使用したコンテナの実行

```console
$ docker run -d \
  --name my-database \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -v pgdata:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:13
```

## ヒント:

### 一時的なコンテナには --rm を使用する

一回限りのタスクやテスト用にコンテナを実行する場合は、`--rm` フラグを使用して、終了後に自動的にコンテナをクリーンアップし、コンテナの散らかりを防ぎます。

### インタラクティブセッションには -i と -t を組み合わせる

シェルを実行するなど、コンテナとのインタラクティブなターミナルセッションが必要な場合は、`-it` の組み合わせがよく使用されます。

### 永続データには名前付きボリュームを使用する

ホストディレクトリにバインドする代わりに、名前付きボリューム（`-v myvolume:/container/path`）を使用することで、永続データの可搬性と管理が向上します。

### コンテナリソースを制限する

`--memory` と `--cpus` フラグを使用してコンテナが使用できるリソースを制限し、単一のコンテナがホストのすべてのリソースを消費するのを防ぎます。

```console
$ docker run --memory=512m --cpus=0.5 nginx
```

## よくある質問

#### Q1. `docker run` と `docker start` の違いは何ですか？
A. `docker run` はイメージから新しいコンテナを作成して起動しますが、`docker start` は既に存在する停止中のコンテナを再起動します。

#### Q2. コンテナをバックグラウンドで実行するにはどうすればよいですか？
A. `-d` または `--detach` フラグを使用してコンテナをバックグラウンドで実行します。

#### Q3. コンテナで実行されているサービスにアクセスするにはどうすればよいですか？
A. `-p` または `--publish` フラグを使用してコンテナポートをホストポートにマッピングします。例えば、`-p 8080:80` はコンテナのポート80をホストのポート8080にマッピングします。

#### Q4. コンテナに環境変数を渡すにはどうすればよいですか？
A. `-e` または `--env` フラグの後に変数名と値を指定します。例：`-e VARIABLE=value`

#### Q5. ホストとコンテナ間でファイルを共有するにはどうすればよいですか？
A. `-v` または `--volume` フラグを使用してホストディレクトリやボリュームをコンテナにマウントします。例：`-v /host/path:/container/path`

## 参考資料

https://docs.docker.com/engine/reference/commandline/run/

## 改訂履歴

- 2025/05/05 初版