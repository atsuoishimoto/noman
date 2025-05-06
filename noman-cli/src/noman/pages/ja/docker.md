# docker コマンド

Dockerコンテナ、イメージ、ネットワーク、ボリュームを管理します。

## 概要

Dockerは、コンテナ化を使用してアプリケーションとその依存関係を分離されたユニットにパッケージ化するプラットフォームです。`docker`コマンドは、コンテナ、イメージ、ネットワーク、ボリュームを構築、実行、管理するためのCLIを提供します。これにより、開発者は異なるマシン間で一貫した環境を作成できます。

## オプション

### **--help**

Dockerコマンドのヘルプ情報を表示します。

```console
$ docker --help
Usage:  docker [OPTIONS] COMMAND

コンテナのための自己完結型ランタイム

一般的なコマンド:
  run         イメージから新しいコンテナを作成して実行する
  exec        実行中のコンテナでコマンドを実行する
  ps          コンテナを一覧表示する
  build       Dockerfileからイメージをビルドする
  pull        レジストリからイメージをダウンロードする
  push        イメージをレジストリにアップロードする
  images      イメージを一覧表示する
  login       レジストリにログインする
  logout      レジストリからログアウトする
  search      Docker Hubでイメージを検索する
  version     Dockerのバージョン情報を表示する
  info        システム全体の情報を表示する

管理コマンド:
  builder     ビルドを管理する
  buildx*     Docker Buildx (Docker Inc., v0.10.4)
  compose*    Docker Compose (Docker Inc., v2.17.2)
  container   コンテナを管理する
  context     コンテキストを管理する
  image       イメージを管理する
  manifest    Dockerイメージマニフェストとマニフェストリストを管理する
  network     ネットワークを管理する
  plugin      プラグインを管理する
  system      Dockerを管理する
  trust       Dockerイメージの信頼を管理する
  volume      ボリュームを管理する

[...]
```

## 使用例

### コンテナの実行

```console
$ docker run -d -p 80:80 --name webserver nginx
e5d40ecd5de98d0bff8f57c4d7f1e2f132b95b5bd4c42d8f4e9f659d3e3950cd
```

### 実行中のコンテナの一覧表示

```console
$ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                               NAMES
e5d40ecd5de9   nginx     "/docker-entrypoint.…"   10 seconds ago   Up 9 seconds    0.0.0.0:80->80/tcp, :::80->80/tcp   webserver
```

### Dockerfileからイメージをビルドする

```console
$ docker build -t myapp:1.0 .
[+] Building 10.5s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                                                 0.1s
 => => transferring dockerfile: 215B                                                                0.0s
 => [internal] load .dockerignore                                                                    0.0s
 => => transferring context: 2B                                                                      0.0s
 => [internal] load metadata for docker.io/library/node:14                                           1.2s
 => [1/5] FROM docker.io/library/node:14@sha256:a158d3b9b4e3fa813fa6c8c590b8f0a860e015ad4e59bbce5744d5dc65798060  0.0s
 => [internal] load build context                                                                    0.0s
 => => transferring context: 32B                                                                     0.0s
 => CACHED [2/5] WORKDIR /app                                                                        0.0s
 => [3/5] COPY package*.json ./                                                                      0.1s
 => [4/5] RUN npm install                                                                            8.5s
 => [5/5] COPY . .                                                                                   0.1s
 => exporting to image                                                                               0.4s
 => => exporting layers                                                                              0.4s
 => => writing image sha256:d64d6b95f5b7e8c3e92a6c2f5f154610e2aa0163d3c1a9c832b80ed4d5a0e21e       0.0s
 => => naming to docker.io/library/myapp:1.0                                                         0.0s
```

### コンテナの停止

```console
$ docker stop webserver
webserver
```

### コンテナの削除

```console
$ docker rm webserver
webserver
```

## ヒント

### マルチコンテナアプリケーションにはDocker Composeを使用する

複数のサービスを持つアプリケーションでは、`docker run`コマンドで各コンテナを個別に管理するのではなく、`docker-compose.yml`ファイルを使用したDocker Composeを使用しましょう。

### 未使用のリソースをクリーンアップする

`docker system prune`を使用して、停止したすべてのコンテナ、未使用のネットワーク、ダングリングイメージ、ビルドキャッシュを削除します。`-a`フラグを追加すると、未使用のイメージもすべて削除されます。

### 永続データには名前付きボリュームを使用する

バインドマウントを使用する代わりに、コンテナの再起動間で永続化する必要があるデータには名前付きボリュームを使用します：`docker run -v mydata:/app/data myapp`

### マルチステージビルドを使用する

より小さな本番用イメージを作成するには、Dockerfileでマルチステージビルドを使用して、ビルド依存関係とランタイム依存関係を分離します。

## よくある質問

#### Q1. `docker run`と`docker start`の違いは何ですか？
A. `docker run`はイメージから新しいコンテナを作成して起動しますが、`docker start`は既に存在する停止中のコンテナを再起動します。

#### Q2. 実行中のコンテナのシェルにアクセスするにはどうすればよいですか？
A. `docker exec -it コンテナ名 /bin/bash`または`/bin/sh`を使用して、実行中のコンテナ内でインタラクティブなシェルを取得します。

#### Q3. コンテナのログを表示するにはどうすればよいですか？
A. `docker logs コンテナ名`を使用してコンテナのログを表示します。リアルタイムでログ出力を追跡するには`-f`を追加します。

#### Q4. ホストとコンテナ間でファイルをコピーするにはどうすればよいですか？
A. ホストからコンテナにコピーするには`docker cp /ホスト/パス コンテナ名:/コンテナ/パス`を使用し、コンテナからホストにコピーするには`docker cp コンテナ名:/コンテナ/パス /ホスト/パス`を使用します。

#### Q5. 実行中のコンテナの設定を更新するにはどうすればよいですか？
A. 実行中のコンテナのほとんどの設定オプションは更新できません。代わりに、コンテナを停止し、削除して、更新された設定で新しいコンテナを作成します。

## 参考文献

https://docs.docker.com/engine/reference/commandline/docker/

## 改訂履歴

- 2025/05/05 初版