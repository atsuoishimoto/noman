# ffmpegコマンド

オーディオ、ビデオ、その他のメディアファイルのためのマルチメディアファイルコンバーターおよびプロセッサです。

## 概要

FFmpegは、マルチメディアファイルを処理するための強力なコマンドラインツールです。異なるファイル形式間の変換、圧縮、抽出、オーディオやビデオストリームの操作が可能です。FFmpegはほぼすべてのオーディオおよびビデオ形式をサポートし、数百のエンコーダー、デコーダー、フィルター、その他の処理機能を含んでいます。

## オプション

### **-i [入力]**

入力ファイルまたはストリームを指定します

```console
$ ffmpeg -i input.mp4 output.avi
```

### **-c:v [コーデック]**

エンコードに使用するビデオコーデックを設定します

```console
$ ffmpeg -i input.mp4 -c:v libx264 output.mp4
```

### **-c:a [コーデック]**

エンコードに使用するオーディオコーデックを設定します

```console
$ ffmpeg -i input.mp4 -c:a aac output.mp4
```

### **-b:v [ビットレート]**

ビデオのビットレートを設定します

```console
$ ffmpeg -i input.mp4 -b:v 1M output.mp4
```

### **-b:a [ビットレート]**

オーディオのビットレートを設定します

```console
$ ffmpeg -i input.mp4 -b:a 128k output.mp4
```

### **-r [fps]**

フレームレート（1秒あたりのフレーム数）を設定します

```console
$ ffmpeg -i input.mp4 -r 30 output.mp4
```

### **-s [サイズ]**

フレームサイズ（解像度）を設定します

```console
$ ffmpeg -i input.mp4 -s 1280x720 output.mp4
```

### **-t [時間]**

出力の時間を制限します

```console
$ ffmpeg -i input.mp4 -t 60 output.mp4
```

### **-ss [時間]**

処理の開始時間を設定します

```console
$ ffmpeg -i input.mp4 -ss 00:01:30 -t 60 clip.mp4
```

### **-vf [フィルター]**

ビデオフィルターを適用します

```console
$ ffmpeg -i input.mp4 -vf "scale=640:480" output.mp4
```

### **-af [フィルター]**

オーディオフィルターを適用します

```console
$ ffmpeg -i input.mp4 -af "volume=2.0" output.mp4
```

## 使用例

### ビデオ形式の変換

```console
$ ffmpeg -i input.mp4 -c:v libx264 -c:a aac output.mkv
```

### ビデオからオーディオを抽出

```console
$ ffmpeg -i video.mp4 -vn -c:a mp3 audio.mp3
```

### ビデオの圧縮

```console
$ ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k compressed.mp4
```

### ビデオのサムネイル作成

```console
$ ffmpeg -i input.mp4 -ss 00:00:15 -frames:v 1 thumbnail.jpg
```

### ビデオのトリミング

```console
$ ffmpeg -i input.mp4 -ss 00:01:00 -to 00:02:00 -c copy trimmed.mp4
```

### 複数のビデオの連結

```console
$ ffmpeg -i "concat:input1.mp4|input2.mp4|input3.mp4" -c copy output.mp4
```

## ヒント:

### ストリームコピーには -c copy を使用する

再エンコードせずに抽出やトリミングを行いたい場合は、`-c copy`を使用してストリームを直接コピーすることで、品質の損失なく処理を大幅に高速化できます。

### 品質制御のためのCRFを理解する

H.264エンコーディングでは、固定レート係数（CRF）が品質を制御します。値は0（ロスレス）から51（最悪）の範囲で、18〜28が良好な品質の一般的な値です。値が低いほど品質は高くなりますが、ファイルサイズも大きくなります。

### -t でコマンドをプレビューする

大きなファイルを処理する場合、まず`-t 10`を使用して10秒間だけ処理するようにコマンドをテストしてから、完全な変換を実行するとよいでしょう。

### 進行状況を監視する

FFmpegはデフォルトで進行状況を表示します。`-v quiet -stats`を追加すると、他のメッセージなしで進行状況情報のみを表示できます。

### ハードウェアアクセラレーションを使用する

サポートされているシステムでは、ハードウェアアクセラレーションによりエンコーディングを大幅に高速化できます。`-c:v h264_nvenc`（NVIDIA）や`-c:v h264_qsv`（Intel）などのコーデックを使用して、処理を高速化しましょう。

## よくある質問

#### Q1. ビデオを別の形式に変換するにはどうすればよいですか？
A. `ffmpeg -i 入力.ビデオ -c:v [ビデオコーデック] -c:a [オーディオコーデック] 出力.形式`を使用します。例：`ffmpeg -i input.mp4 -c:v libx264 -c:a aac output.mkv`

#### Q2. ビデオからオーディオを抽出するにはどうすればよいですか？
A. `ffmpeg -i ビデオ.mp4 -vn -c:a [オーディオコーデック] オーディオ.形式`を使用します。例：`ffmpeg -i video.mp4 -vn -c:a mp3 audio.mp3`

#### Q3. ビデオのサイズを変更するにはどうすればよいですか？
A. スケールフィルターを使用します：`ffmpeg -i input.mp4 -vf "scale=幅:高さ" output.mp4`。例：`ffmpeg -i input.mp4 -vf "scale=1280:720" output.mp4`

#### Q4. ビデオの一部を切り取るにはどうすればよいですか？
A. 開始時間には`-ss`、時間には`-t`を使用します：`ffmpeg -i input.mp4 -ss 00:01:30 -t 60 output.mp4`（1分30秒から60秒間切り取ります）

#### Q5. メディアファイルの情報を確認するにはどうすればよいですか？
A. `ffprobe input.mp4`を使用して、ファイルに関する詳細情報を表示します。

## 参考文献

https://ffmpeg.org/ffmpeg.html

## 改訂履歴

- 2025/05/06 初版