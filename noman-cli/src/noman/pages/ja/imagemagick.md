# ImageMagick

デジタル画像を作成、編集、合成、変換するための包括的なコマンドラインツール群です。

## 概要

ImageMagickは、様々な形式の画像を操作するための強力なソフトウェアスイートです。PNG、JPEG、GIF、HEIC、TIFF、DPX、EXR、WebP、PDFなど200以上の形式で画像の読み込み、変換、書き込みが可能です。ImageMagickでは、画像のリサイズ、反転、ミラーリング、回転、歪み、せん断、変形、色調整、特殊効果の適用、テキスト・線・多角形の描画などができます。

## オプション

ImageMagickはいくつかのコマンドラインユーティリティで構成されており、主なものは以下の通りです：

### **convert**

画像形式間の変換や画像操作を行います

```console
$ convert input.jpg -resize 50% output.png
```

### **identify**

画像ファイルの形式や特性を説明します

```console
$ identify image.jpg
image.jpg JPEG 1920x1080 1920x1080+0+0 8-bit sRGB 2.5MB 0.000u 0:00.000
```

### **mogrify**

画像をその場で変換します

```console
$ mogrify -resize 800x600 *.jpg
```

### **composite**

ある画像を別の画像の上に重ねます

```console
$ composite overlay.png background.jpg output.jpg
```

### **montage**

複数の個別画像を組み合わせて合成画像を作成します

```console
$ montage image1.jpg image2.jpg image3.jpg -geometry +5+5 montage.jpg
```

### **display**

任意のXサーバー上で画像を表示します

```console
$ display image.jpg
```

## 使用例

### 画像のリサイズ

```console
$ convert large_image.jpg -resize 800x600 resized_image.jpg
```

### 形式間の変換

```console
$ convert document.pdf document.jpg
```

### 画像へのテキスト追加

```console
$ convert image.jpg -fill white -pointsize 24 -annotate +50+50 'Hello World!' text_image.jpg
```

### サムネイルの作成

```console
$ convert image.jpg -thumbnail 100x100 thumbnail.jpg
```

### エフェクトの適用

```console
$ convert photo.jpg -charcoal 2 charcoal_effect.jpg
```

### 複数画像の一括処理

```console
$ mogrify -format png -quality 90 *.jpg
```

## ヒント

### 複雑なコマンドには適切な引用符を使用する

複数のオプションを持つ複雑なコマンドを使用する場合は、シェルの解釈問題を防ぐために引用符を使用しましょう：

```console
$ convert input.jpg -resize "800x600>" -quality 85 output.jpg
```

### メモリ管理

ImageMagickはメモリを大量に消費することがあります。大きな画像の場合は、`-limit memory`と`-limit map`オプションの使用を検討してください：

```console
$ convert -limit memory 256MB -limit map 512MB large_image.tif output.jpg
```

### メタデータの保持

処理時にファイルのタイムスタンプを維持するには、`-preserve-timestamp`オプションを使用します：

```console
$ mogrify -preserve-timestamp -resize 50% image.jpg
```

### 操作の適切な順序を使用する

ImageMagickでは操作の順序が重要です。例えば、パフォーマンス向上のためにエフェクトを適用する前にリサイズを行います：

```console
$ convert input.jpg -resize 800x600 -sharpen 0x1.0 output.jpg
```

## よくある質問

#### Q1. ImageMagickをインストールするにはどうすればよいですか？
A. Ubuntu/Debianでは：`sudo apt-get install imagemagick`。macOSでHomebrewを使用する場合：`brew install imagemagick`。Windowsでは、公式ウェブサイトからインストーラーをダウンロードしてください。

#### Q2. 複数の画像を一度に変換するにはどうすればよいですか？
A. `mogrify`コマンドを使用します：`mogrify -format png *.jpg`はすべてのJPGファイルをPNGに変換します。

#### Q3. アスペクト比を維持しながら画像をリサイズするにはどうすればよいですか？
A. パーセンテージでリサイズオプションを使用します：`convert image.jpg -resize 50% resized.jpg`または一方の寸法のみを指定します：`convert image.jpg -resize 800x output.jpg`。

#### Q4. 画像ファイルサイズを縮小するにはどうすればよいですか？
A. 品質オプションを使用します：`convert input.jpg -quality 80 output.jpg`（品質値が低いほど、ファイルサイズが小さくなります）。

#### Q5. 複数の画像からアニメーションGIFを作成するにはどうすればよいですか？
A. 次のように使用します：`convert -delay 100 frame*.jpg animated.gif`（delayは100分の1秒単位です）。

## macOSに関する考慮事項

macOSでは、デフォルトのImageMagickインストールはセキュリティ上の理由から一部の機能が無効になっている場合があります。完全な機能を有効にするには、特定のオプションで再コンパイルするか、より完全なビルドを提供するHomebrewなどのパッケージマネージャーを使用する必要があるかもしれません。

また、macOSはImageMagickのバージョンではなく、組み込みの`convert`ユーティリティを使用する場合があります。ImageMagickのコマンドを確実に使用するには、フルパスを使用するか、シェル設定でエイリアスを作成してください。

## 参考文献

https://imagemagick.org/script/command-line-processing.php

## 改訂履歴

- 2025/05/06 初版