# docker-compose コマンド

複数コンテナのDockerアプリケーションを定義して実行します。

## 概要

Docker Composeは、複数コンテナのDockerアプリケーションを定義・実行するためのツールです。YAMLファイルを使用してアプリケーションのサービス、ネットワーク、ボリュームを設定し、単一のコマンドですべてのサービスを作成・起動できます。複数の相互接続されたコンテナを必要とする複雑なアプリケーションの管理プロセスを簡素化します。

## オプション

### **up**

Composeファイルで定義されたコンテナを作成して起動します

```console
$ docker-compose up
Creating network "myapp_default" with the default driver
Creating myapp_db_1    ... done
Creating myapp_redis_1 ... done
Creating myapp_web_1   ... done
Attaching to myapp_db_1, myapp_redis_1, myapp_web_1
```

### **-d, --detach**

コンテナをバックグラウンドで実行します

```console
$ docker-compose up -d
Creating network "myapp_default" with the default driver
Creating myapp_db_1    ... done
Creating myapp_redis_1 ... done
Creating myapp_web_1   ... done
```

### **down**

コンテナ、ネットワーク、イメージ、ボリュームを停止して削除します

```console
$ docker-compose down
Stopping myapp_web_1   ... done
Stopping myapp_redis_1 ... done
Stopping myapp_db_1    ... done
Removing myapp_web_1   ... done
Removing myapp_redis_1 ... done
Removing myapp_db_1    ... done
Removing network myapp_default
```

### **ps**

コンテナを一覧表示します

```console
$ docker-compose ps
     Name                    Command               State           Ports         
--------------------------------------------------------------------------------
myapp_db_1      docker-entrypoint.sh mysqld      Up      3306/tcp, 33060/tcp
myapp_redis_1   docker-entrypoint.sh redis ...   Up      6379/tcp              
myapp_web_1     docker-entrypoint.sh npm start   Up      0.0.0.0:3000->3000/tcp
```

### **logs**

コンテナからの出力を表示します

```console
$ docker-compose logs
Attaching to myapp_web_1, myapp_redis_1, myapp_db_1
web_1    | > myapp@1.0.0 start
web_1    | > node server.js
web_1    | Server listening on port 3000
db_1     | 2023-05-05T12:34:56.789Z 0 [Note] mysqld: ready for connections.
```

### **-f, --follow**

ログ出力をフォローします（logsコマンドと共に使用）

```console
$ docker-compose logs -f
Attaching to myapp_web_1, myapp_redis_1, myapp_db_1
web_1    | > myapp@1.0.0 start
web_1    | > node server.js
web_1    | Server listening on port 3000
```

### **build**

サービスをビルドまたは再ビルドします

```console
$ docker-compose build
Building web
Step 1/10 : FROM node:14
 ---> 1234567890ab
Step 2/10 : WORKDIR /app
 ---> Using cache
 ---> abcdef123456
...
Successfully built 0123456789ab
Successfully tagged myapp_web:latest
```

### **exec**

実行中のコンテナでコマンドを実行します

```console
$ docker-compose exec web npm test
> myapp@1.0.0 test
> jest

PASS  ./app.test.js
  ✓ should return 200 (32ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

### **-f, --file**

別のComposeファイルを指定します

```console
$ docker-compose -f docker-compose.prod.yml up -d
Creating network "myapp_default" with the default driver
Creating myapp_db_1    ... done
Creating myapp_redis_1 ... done
Creating myapp_web_1   ... done
```

## 使用例

### 開発環境の起動

```console
$ docker-compose up
Creating network "myapp_default" with the default driver
Creating myapp_db_1    ... done
Creating myapp_redis_1 ... done
Creating myapp_web_1   ... done
Attaching to myapp_db_1, myapp_redis_1, myapp_web_1
```

### サービスの再ビルドと起動

```console
$ docker-compose up --build
Building web
Step 1/10 : FROM node:14
...
Successfully built 0123456789ab
Successfully tagged myapp_web:latest
Creating network "myapp_default" with the default driver
Creating myapp_db_1    ... done
Creating myapp_redis_1 ... done
Creating myapp_web_1   ... done
```

### サービスコンテナでの一回限りのコマンド実行

```console
$ docker-compose run web npm install express
Creating myapp_web_run ... done
+ express@4.18.2
added 57 packages in 2.5s
```

### サービスのスケーリング

```console
$ docker-compose up -d --scale web=3
Creating myapp_web_1 ... done
Creating myapp_web_2 ... done
Creating myapp_web_3 ... done
```

## ヒント:

### 環境変数を使用する

パスワードやAPIキーなどの機密情報は、Composeファイルにハードコーディングする代わりに`.env`ファイルに保存しましょう。

```console
$ cat .env
DB_PASSWORD=secretpassword
API_KEY=1234567890abcdef
```

### デフォルトのComposeファイルをオーバーライドする

開発固有の設定のために`docker-compose.override.yml`ファイルを作成すると、基本の`docker-compose.yml`ファイルと一緒に自動的に使用されます。

### 永続化のために名前付きボリュームを使用する

名前付きボリュームはコンテナの再起動や再ビルド間でデータを保持します：

```yaml
volumes:
  db_data:

services:
  db:
    image: postgres
    volumes:
      - db_data:/var/lib/postgresql/data
```

### Composeファイルにバージョン管理を使用する

変更を追跡し、チームメンバーとコラボレーションするために、Composeファイルをバージョン管理下に置きましょう。

## よくある質問

#### Q1. `docker-compose up`と`docker-compose run`の違いは何ですか？
A. `up`はComposeファイルで定義されたすべてのサービスを起動しますが、`run`は特定のサービスを起動して一回限りのコマンドを実行します。

#### Q2. 単一のサービスを更新するにはどうすればよいですか？
A. `docker-compose up --build <サービス名>`を使用して、特定のサービスを再ビルドして更新します。

#### Q3. 特定のサービスのログを表示するにはどうすればよいですか？
A. `docker-compose logs <サービス名>`を使用して、特定のサービスのログを表示します。

#### Q4. コンテナを削除せずにサービスを停止するにはどうすればよいですか？
A. `docker-compose stop`を使用して、コンテナ、ネットワーク、ボリュームを削除せずにサービスを停止します。

#### Q5. 本番環境でdocker-composeを実行するにはどうすればよいですか？
A. docker-composeは本番環境でも使用できますが、本番デプロイメントにはDocker SwarmやKubernetesがより適している場合が多いです。Composeを使用する場合は、適切な設定を持つ本番環境専用のComposeファイルを作成してください。

## 参考文献

https://docs.docker.com/compose/reference/

## 改訂履歴

- 2025/05/05 初版