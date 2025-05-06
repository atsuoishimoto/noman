# date コマンド

システムの日付と時刻を表示または設定します。

## 概要

`date` コマンドは、現在の日付と時刻をさまざまな形式で表示します。スーパーユーザー権限で実行すると、システムの日付と時刻を設定することもできます。このコマンドは高度にカスタマイズ可能で、フォーマット指定子を通じてさまざまな形式での出力が可能です。

## オプション

### **-d, --date=STRING**

'now'ではなく、STRINGで指定された時刻を表示します

```console
$ date -d "next Thursday"
Thu May 12 00:00:00 EDT 2025
```

### **-f, --file=DATEFILE**

--dateと同様；DATEFILEの各行に対して一度ずつ実行します

```console
$ echo "2025-01-01" > dates.txt
$ echo "2025-12-25" >> dates.txt
$ date -f dates.txt
Wed Jan  1 00:00:00 EST 2025
Thu Dec 25 00:00:00 EST 2025
```

### **-I[TIMESPEC], --iso-8601[=TIMESPEC]**

ISO 8601形式で日付/時刻を出力します。TIMESPECは'date'（日付のみ）、'hours'、'minutes'、'seconds'、または'ns'を指定できます

```console
$ date -I
2025-05-05
$ date -Iseconds
2025-05-05T10:30:45-04:00
```

### **-R, --rfc-email**

RFC 5322形式で日付と時刻を出力します（例：Mon, 14 Aug 2006 02:34:56 -0600）

```console
$ date -R
Mon, 05 May 2025 10:30:45 -0400
```

### **-r, --reference=FILE**

FILEの最終更新時刻を表示します

```console
$ date -r /etc/passwd
Mon May  5 08:15:30 EDT 2025
```

### **-u, --utc, --universal**

協定世界時（UTC）で表示または設定します

```console
$ date -u
Mon May  5 14:30:45 UTC 2025
```

### **+FORMAT**

指定したFORMAT文字列を使用して出力をフォーマットします

```console
$ date +"%Y-%m-%d %H:%M:%S"
2025-05-05 10:30:45
```

## 使用例

### カスタムフォーマットで日付を表示する

```console
$ date "+Today is %A, %B %d, %Y"
Today is Monday, May 05, 2025
```

### 未来の日付を計算する

```console
$ date -d "30 days"
Wed Jun  4 10:30:45 EDT 2025
```

### Unixタイムスタンプ（エポックからの秒数）を表示する

```console
$ date +%s
1746724245
```

### Unixタイムスタンプを人間が読める日付に変換する

```console
$ date -d @1609459200
Fri Jan  1 00:00:00 EST 2021
```

## ヒント:

### 一般的なフォーマット指定子

- `%Y`: 年（例：2025）
- `%m`: 月（01-12）
- `%d`: 月の日（01-31）
- `%H`: 時（00-23）
- `%M`: 分（00-59）
- `%S`: 秒（00-60）
- `%A`: 曜日の完全名（例：Monday）
- `%B`: 月の完全名（例：January）

### システム日付の設定

システム日付を設定するには（root権限が必要）：

```console
$ sudo date MMDDhhmm[[CC]YY][.ss]
```

例えば、2025年5月5日10時30分45秒に設定するには：

```console
$ sudo date 050510302025.45
```

### バックアップのタイムスタンプ

バックアップファイルを作成する際に、ファイル名にタイムスタンプを含めます：

```console
$ cp important.txt important.txt.$(date +%Y%m%d_%H%M%S)
```

## よくある質問

#### Q1. 現在の時刻だけを表示するにはどうすればよいですか？
A. `date +%T` または `date +"%H:%M:%S"` を使用します。

#### Q2. 昨日の日付を取得するにはどうすればよいですか？
A. `date -d "yesterday"` または `date -d "1 day ago"` を使用します。

#### Q3. UTC/GMTで日付を表示するにはどうすればよいですか？
A. `date -u` を使用して現在の時刻をUTCで表示します。

#### Q4. 今から X 日後の日付を計算するにはどうすればよいですか？
A. `date -d "+X days"` を使用します。Xは日数です。

#### Q5. Unixタイムスタンプ（エポック時間）を取得するにはどうすればよいですか？
A. `date +%s` を使用して1970年1月1日からの秒数を表示します。

## 参考文献

https://www.gnu.org/software/coreutils/manual/html_node/date-invocation.html

## 改訂履歴

- 2025/05/05 初版