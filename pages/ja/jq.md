# jqコマンド

軽量なコマンドラインプロセッサでJSONデータを処理・変換します。

## 概要

`jq`は柔軟なコマンドラインJSONプロセッサで、構造化データの切り出し、フィルタリング、マッピング、変換が可能です。JSONデータに対する`sed`のように機能し、特定のフィールドの抽出、値の変換、配列のフィルタリング、出力のフォーマットなどをコマンドラインやスクリプトから実行できます。

## オプション

### **-r, --raw-output**

JSON形式でエンコードされた文字列ではなく、生の文字列を出力します（引用符を削除）。

```console
$ echo '{"name": "John"}' | jq -r '.name'
John
```

### **-c, --compact-output**

整形された出力ではなく、コンパクトな出力を生成します。

```console
$ echo '{"name": "John", "age": 30}' | jq -c '.'
{"name":"John","age":30}
```

### **-s, --slurp**

すべての入力を配列として読み込み、フィルタを適用します。

```console
$ echo '{"id": 1}' > file1.json
$ echo '{"id": 2}' > file2.json
$ jq -s '.' file1.json file2.json
[
  {
    "id": 1
  },
  {
    "id": 2
  }
]
```

### **-f, --from-file FILENAME**

ファイルからフィルタを読み込みます。

```console
$ echo '.name' > filter.jq
$ echo '{"name": "John", "age": 30}' | jq -f filter.jq
"John"
```

### **-n, --null-input**

入力を読み込まず、jqが独自に構築します。

```console
$ jq -n '{"created_at": now | todate}'
{
  "created_at": "2025-05-05T00:00:00Z"
}
```

## 使用例

### 特定のフィールドを抽出する

```console
$ echo '{"user": {"name": "John", "age": 30}}' | jq '.user.name'
"John"
```

### 配列をフィルタリングする

```console
$ echo '{"users": [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]}' | jq '.users[] | select(.age > 28)'
{
  "name": "John",
  "age": 30
}
```

### データ構造を変換する

```console
$ echo '{"users": [{"name": "John"}, {"name": "Jane"}]}' | jq '.users | map({username: .name})'
[
  {
    "username": "John"
  },
  {
    "username": "Jane"
  }
]
```

### curlと組み合わせてAPIレスポンスを処理する

```console
$ curl -s 'https://api.example.com/users' | jq '.[] | {id, name}'
{
  "id": 1,
  "name": "John Doe"
}
{
  "id": 2,
  "name": "Jane Smith"
}
```

## ヒント

### 複雑な変換にパイプを使用する

複数のフィルタをパイプでつなげて、複雑な変換を段階的に実行できます：

```console
$ echo '{"users": [{"name": "John", "roles": ["admin", "user"]}, {"name": "Jane", "roles": ["user"]}]}' | jq '.users[] | select(.roles | contains(["admin"])) | .name'
"John"
```

### 新しいJSONオブジェクトを作成する

オブジェクト構築構文を使用して、新しいJSON構造を作成できます：

```console
$ echo '{"first": "John", "last": "Doe"}' | jq '{full_name: "\(.first) \(.last)", username: .first | ascii_downcase}'
{
  "full_name": "John Doe",
  "username": "john"
}
```

### 組み込み関数を使用する

`jq`には文字列操作、配列操作などのための多くの組み込み関数があります：

```console
$ echo '[1, 2, 3, 4, 5]' | jq 'map(. * 2) | add'
30
```

## よくある質問

#### Q1. JSONから特定のフィールドを抽出するにはどうすればよいですか？
A. ドット表記を使用します：`jq '.fieldname'`、またはネストしたフィールドの場合：`jq '.parent.child'`。

#### Q2. 出力から引用符を削除するにはどうすればよいですか？
A. `-r`または`--raw-output`オプションを使用します：`jq -r '.field'`。

#### Q3. 条件に基づいて配列をフィルタリングするにはどうすればよいですか？
A. `select()`を使用します：`jq '.items[] | select(.price > 10)'`。

#### Q4. jqで日付をフォーマットするにはどうすればよいですか？
A. `strftime`関数を使用します：`jq '.timestamp | fromdate | strftime("%Y-%m-%d")'`。

#### Q5. 配列を反復処理するにはどうすればよいですか？
A. 配列イテレータを使用します：`jq '.items[]'`で各要素を処理します。

## 参考文献

https://stedolan.github.io/jq/manual/

## 改訂履歴

- 2025/05/05 初版