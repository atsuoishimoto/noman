# docker build コマンド

Dockerfileからイメージをビルドします。

## 概要

`docker build`コマンドは、DockerfileとコンテキストからDockerイメージをビルドします。コンテキストとは、指定されたPATHまたはURLにある一連のファイルのことです。ビルドプロセスはコンテキスト内のどのファイルも参照できます。Dockerfileには、Dockerが新しいイメージを作成するために使用する命令が含まれています。

## オプション

### **-t, --tag**

ビルドしたイメージに名前を付け、オプションでタグを「name:tag」形式で指定します。

```console
$ docker build -t myapp:1.0 .
[+] Building 10.5s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                       0.1s
 => => transferring dockerfile: 215B                                       0.0s
 => [internal] load .dockerignore                                          0.0s
 => => transferring context: 2B                                            0.0s
 => [internal] load metadata for docker.io/library/node:14                 1.2s
 => [1/5] FROM docker.io/library/node:14@sha256:fcb6...                    0.0s
 => [internal] load build context                                          0.0s
 => => transferring context: 32B                                           0.0s
 => CACHED [2/5] WORKDIR /app                                              0.0s
 => [3/5] COPY package*.json ./                                            0.1s
 => [4/5] RUN npm install                                                  8.5s
 => [5/5] COPY . .                                                         0.1s
 => exporting to image                                                     0.5s
 => => exporting layers                                                    0.4s
 => => writing image sha256:a72d...                                        0.0s
 => => naming to docker.io/library/myapp:1.0                               0.0s
```

### **-f, --file**

Dockerfileの名前を指定します（デフォルトは「PATH/Dockerfile」）。

```console
$ docker build -f Dockerfile.prod -t myapp:prod .
[+] Building 12.3s (10/10) FINISHED
 => [internal] load build definition from Dockerfile.prod                  0.1s
 => => transferring dockerfile: 256B                                       0.0s
...
```

### **--no-cache**

イメージのビルド時にキャッシュを使用しません。

```console
$ docker build --no-cache -t myapp .
[+] Building 25.7s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                       0.1s
...
```

### **--pull**

常に新しいバージョンのイメージを取得しようとします。

```console
$ docker build --pull -t myapp .
[+] Building 15.2s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                       0.1s
 => [internal] load .dockerignore                                          0.0s
 => [internal] load metadata for docker.io/library/node:14                 1.5s
 => [1/5] FROM docker.io/library/node:14@sha256:fcb6... DONE              10.2s
...
```

### **--build-arg**

DockerfileのARG命令で定義されたビルド時変数を設定します。

```console
$ docker build --build-arg NODE_ENV=production -t myapp .
[+] Building 11.8s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                       0.1s
...
```

### **--target**

マルチステージビルドを使用する場合に、ビルドするターゲットビルドステージを設定します。

```console
$ docker build --target development -t myapp:dev .
[+] Building 8.3s (8/8) FINISHED
 => [internal] load build definition from Dockerfile                       0.1s
 => [internal] load .dockerignore                                          0.0s
 => [internal] load metadata for docker.io/library/node:14                 1.2s
 => [1/5] FROM docker.io/library/node:14@sha256:fcb6...                    0.0s
 => [2/5] WORKDIR /app                                                     0.1s
 => [3/5] COPY package*.json ./                                            0.1s
 => [4/5] RUN npm install                                                  6.5s
 => exporting to image                                                     0.3s
...
```

## 使用例

### タグ付きでイメージをビルドする

```console
$ docker build -t myapp:latest .
[+] Building 15.2s (10/10) FINISHED
...
```

### 複数のタグでビルドする

```console
$ docker build -t myapp:latest -t myapp:1.0 -t registry.example.com/myapp:1.0 .
[+] Building 14.7s (10/10) FINISHED
...
=> => naming to docker.io/library/myapp:latest                             0.0s
=> => naming to docker.io/library/myapp:1.0                                0.0s
=> => naming to registry.example.com/myapp:1.0                             0.0s
```

### 特定のDockerfileとコンテキストからビルドする

```console
$ docker build -f ./docker/Dockerfile.prod -t myapp:prod ./app
[+] Building 18.3s (10/10) FINISHED
...
```

### ビルド引数を使用してビルドする

```console
$ docker build --build-arg VERSION=1.0.0 --build-arg ENV=staging -t myapp:staging .
[+] Building 16.5s (10/10) FINISHED
...
```

## ヒント

### .dockerignoreファイルを使用する

`.dockerignore`ファイルを作成して、ビルドコンテキストからファイルやディレクトリを除外しましょう。これにより、不要なファイルがDockerデーモンに送信されるのを防ぎ、ビルド時間とサイズを削減できます。

### ビルドキャッシュを活用する

Dockerは中間レイヤーをキャッシュします。キャッシュの使用を最大化するためにDockerfileの命令を順序付けしましょう - 頻繁に変更される命令（ソースコードのコピーなど）は、あまり変更されない命令（依存関係のインストールなど）の後に配置します。

### マルチステージビルド

マルチステージビルドを使用して、より小さな本番イメージを作成しましょう。最初のステージにはビルドツールと依存関係を含め、最終ステージにはアプリケーションの実行に必要なものだけを含めることができます。

```dockerfile
FROM node:14 AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

### レイヤー数を最小限に抑える

関連するコマンドを`&&`を使用して単一のRUN命令にまとめることで、イメージのレイヤー数を減らしましょう。

## よくある質問

#### Q1. `docker build`と`docker image build`の違いは何ですか？
A. 同じコマンドです。`docker image build`はより明示的な形式ですが、`docker build`の方がより一般的に使用されています。

#### Q2. リモートのGitリポジトリからイメージをビルドするにはどうすればよいですか？
A. GitのURLを使って`docker build`を使用します：`docker build https://github.com/username/repo.git#branch:folder`

#### Q3. Dockerイメージのサイズを減らすにはどうすればよいですか？
A. マルチステージビルドの使用、より小さなベースイメージ（Alpineなど）の使用、パッケージをインストールしたのと同じレイヤーでクリーンアップする、`.dockerignore`を使用して不要なファイルを除外するなどの方法があります。

#### Q4. マルチステージDockerfileで特定のステージをビルドするにはどうすればよいですか？
A. `--target`フラグを使用します：`docker build --target stage-name -t myimage .`

#### Q5. x86マシン上でARMイメージをビルドできますか？
A. はい、`--platform`フラグを使用します：`docker build --platform linux/arm64 -t myimage .`（Docker BuildKitが必要です）

## 参考資料

https://docs.docker.com/engine/reference/commandline/build/

## 改訂履歴

- 2025/05/05 初版