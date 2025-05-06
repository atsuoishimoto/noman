# env コマンド

現在の環境変数を表示したり、変更された環境で命令を実行したりします。

## 概要

`env` コマンドは、現在のシェルセッションのすべての環境変数を表示します。また、現在のシェル環境に影響を与えずに変数を設定または解除して、変更された環境でプログラムを実行するためにも使用できます。

## オプション

### **-i, --ignore-environment**

空の環境から開始し、継承された環境変数を無視します。

```console
$ env -i bash -c 'echo $PATH'

```

### **-u, --unset=NAME**

環境から変数 NAME を削除します。

```console
$ env -u HOME bash -c 'echo $HOME'

```

### **-0, --null**

各出力行を改行ではなくヌル文字で終了します。

```console
$ env -0 | grep -z USER
USER=username
```

### **--**

オプションリストを終了します。実行するコマンドに env によって解釈される可能性のあるオプションがある場合に便利です。

```console
$ env -- ls -la
total 32
drwxr-xr-x  5 user  staff   160 May  5 10:30 .
drwxr-xr-x  3 user  staff    96 May  4 09:15 ..
-rw-r--r--  1 user  staff  1024 May  5 10:25 file.txt
```

## 使用例

### すべての環境変数を表示する

```console
$ env
USER=username
HOME=/home/username
PATH=/usr/local/bin:/usr/bin:/bin
SHELL=/bin/bash
...
```

### 変更された環境でコマンドを実行する

```console
$ env VAR1=value1 VAR2=value2 bash -c 'echo $VAR1 $VAR2'
value1 value2
```

### クリーンな環境でコマンドを実行する

```console
$ env -i PATH=/bin bash -c 'echo $PATH; env'
/bin
PATH=/bin
```

## ヒント:

### 環境の問題をデバッグする

アプリケーションの起動問題をトラブルシューティングする際に、環境変数が正しく設定されているかを確認するために `env` を使用します。

### 環境変数を分離する

アプリケーションをテストする際、必要な変数のみを持つ `env -i` を使用して、再現可能なテスト用の制御された環境を作成します。

### 環境を比較する

`env` の出力をファイルにリダイレクトして、異なるユーザーやシステム間の環境変数を比較します：
```console
$ env > env_user1.txt
```

## よくある質問

#### Q1. `env` と `printenv` の違いは何ですか？
A. どちらも環境変数を表示しますが、`env` は変更された環境でコマンドを実行することもできるのに対し、`printenv` は変数の表示のみに焦点を当てています。

#### Q2. 特定のコマンドに対してのみ環境変数を設定するにはどうすればよいですか？
A. `env VAR=value command` を使用します。これにより、現在のシェルに影響を与えずに、そのコマンドの実行に対してのみ変数が設定されます。

#### Q3. 環境変数なしでコマンドを実行するにはどうすればよいですか？
A. `env -i command` を使用します。これは空の環境から開始します。コマンドを実行可能にするために PATH を追加する必要があるかもしれません。

#### Q4. シェルスクリプトで `env` を使用できますか？
A. はい、スクリプトの環境を変更せずに特定の環境設定でコマンドを実行する必要がある場合、シェルスクリプトで役立ちます。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/env-invocation.html

## 改訂履歴

- 2025/05/05 初版