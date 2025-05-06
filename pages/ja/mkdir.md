# mkdir コマンド

指定した名前のディレクトリを作成します。

## 概要

`mkdir` コマンドはファイルシステム内に新しいディレクトリを作成します。一度に単一または複数のディレクトリを作成でき、必要に応じて親ディレクトリを自動的に作成することもできます。デフォルトでは、ディレクトリはユーザーのumask設定に基づいた権限で作成されます。

## オプション

### **-p, --parents**

必要に応じて親ディレクトリを作成します。既に存在する場合はエラーになりません。

```console
$ mkdir -p projects/website/css
```

### **-m, --mode=MODE**

作成するディレクトリのファイルモード（権限）を設定します。

```console
$ mkdir -m 755 secure_folder
```

### **-v, --verbose**

作成した各ディレクトリについてメッセージを表示します。

```console
$ mkdir -v new_folder
mkdir: created directory 'new_folder'
```

### **-Z, --context=CTX**

作成した各ディレクトリのSELinuxセキュリティコンテキストをCTXに設定します。

```console
$ mkdir -Z new_folder
```

## 使用例

### 一度に複数のディレクトリを作成する

```console
$ mkdir docs images videos
$ ls
docs  images  videos
```

### 親ディレクトリの作成を伴うネストしたディレクトリの作成

```console
$ mkdir -p projects/webapp/src/components
$ ls -R projects
projects:
webapp

projects/webapp:
src

projects/webapp/src:
components
```

### 特定の権限を持つディレクトリの作成

```console
$ mkdir -m 700 private_data
$ ls -l
total 4
drwx------  2 user  user  4096 May  5 10:30 private_data
```

## ヒント:

### ネストしたディレクトリには -p を使用する

`-p` オプションはディレクトリ構造を作成する際に非常に便利です。必要な親ディレクトリをすべて作成し、ディレクトリが既に存在する場合もエラーになりません。

### 作成時に権限を設定する

ディレクトリを作成してから `chmod` で権限を変更するのではなく、`-m` オプションを使用して作成時に権限を設定しましょう。

### 複数のディレクトリを効率的に作成する

一つのコマンドで複数のディレクトリを作成できます: `mkdir dir1 dir2 dir3`

### 関連ディレクトリにはブレース展開を使用する

bashのブレース展開と組み合わせて関連ディレクトリを作成できます: `mkdir -p project/{src,docs,tests}`

## よくある質問

#### Q1. 特定の権限を持つディレクトリを作成するにはどうすればよいですか？
A. `mkdir -m MODE ディレクトリ名` を使用します。例えば、`mkdir -m 755 my_dir` は、所有者に読み取り、書き込み、実行権限を、グループとその他のユーザーには読み取りと実行権限を持つディレクトリを作成します。

#### Q2. 複数のネストしたディレクトリを一度に作成するにはどうすればよいですか？
A. `mkdir -p 親/子/孫` を使用します。`-p` オプションは必要なすべての親ディレクトリを作成します。

#### Q3. 既に存在するディレクトリを作成しようとするとどうなりますか？
A. `-p` オプションなしでは、`mkdir` はエラーを返します。`-p` オプションを付けると、エラーなく静かに続行します。

#### Q4. 作成されているディレクトリを確認することはできますか？
A. はい、`-v`（verbose）オプションを使用すると、作成された各ディレクトリについてのメッセージが表示されます。

## 参考資料

https://www.gnu.org/software/coreutils/manual/html_node/mkdir-invocation.html

## 改訂履歴

- 2025/05/05 初版