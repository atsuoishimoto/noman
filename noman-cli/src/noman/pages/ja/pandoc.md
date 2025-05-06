# pandocコマンド

マークアップ形式間でファイルを変換する汎用ドキュメントコンバーター。

## 概要

Pandocは、Markdown、HTML、LaTeX、Word、EPUBなど、多数のマークアップ形式間で変換できる強力なドキュメント変換ツールです。特に、フォーマット、引用、その他の要素を保持しながらドキュメントを変換する必要がある作家、学者、出版社にとって非常に便利です。

## オプション

### **-f, --from=FORMAT**

入力形式を指定します。指定しない場合、Pandocは形式を推測しようとします。

```console
$ pandoc -f markdown -t html document.md -o document.html
```

### **-t, --to=FORMAT**

出力形式を指定します。

```console
$ pandoc -t docx document.md -o document.docx
```

### **-o, --output=FILE**

標準出力ではなくFILEに出力を書き込みます。

```console
$ pandoc document.md -o document.html
```

### **--pdf-engine=PROGRAM**

PDF出力を作成する際に使用するプログラムを指定します。

```console
$ pandoc document.md --pdf-engine=xelatex -o document.pdf
```

### **--toc, --table-of-contents**

出力ドキュメントに自動生成された目次を含めます。

```console
$ pandoc --toc document.md -o document.html
```

### **-s, --standalone**

適切なヘッダーとフッターを含むスタンドアロンドキュメントを生成します。

```console
$ pandoc -s document.md -o document.html
```

### **-c, --css=URL**

HTML出力を作成する際にCSSファイルにリンクします。

```console
$ pandoc -c style.css document.md -o document.html
```

### **--bibliography=FILE**

引用処理のための参考文献ファイルを指定します。

```console
$ pandoc --bibliography=references.bib document.md -o document.pdf
```

### **--citeproc**

citeprocを使用して引用を処理します。

```console
$ pandoc --citeproc --bibliography=references.bib document.md -o document.pdf
```

### **-V, --variable=KEY[:VALUE]**

テンプレートで使用するテンプレート変数を設定します。

```console
$ pandoc -V title="My Document" document.md -o document.pdf
```

## 使用例

### MarkdownからHTMLへの変換

```console
$ pandoc document.md -o document.html
```

### カスタムテンプレートを使用したMarkdownからPDFへの変換

```console
$ pandoc document.md --template=template.tex -o document.pdf
```

### 複数のファイルを単一の出力に変換

```console
$ pandoc chapter1.md chapter2.md chapter3.md -o book.docx
```

### Markdownからプレゼンテーションを作成

```console
$ pandoc -t revealjs -s presentation.md -o presentation.html
```

### HTMLからMarkdownへの変換

```console
$ pandoc -f html -t markdown webpage.html -o webpage.md
```

## ヒント:

### 一貫した出力のためのテンプレートの使用

頻繁に使用する出力形式のカスタムテンプレートを作成して、ドキュメント間で一貫したスタイルを維持します：

```console
$ pandoc --template=mythesis.tex thesis.md -o thesis.pdf
```

### メタデータブロックの活用

Markdownファイルの先頭にYAMLメタデータブロックを含めて、ドキュメントのプロパティを制御します：

```markdown
---
title: "Document Title"
author: "Your Name"
date: "2025-05-05"
---
```

### 複数のファイルの一括変換

シェルループを使用して複数のファイルを一度に変換します：

```console
$ for file in *.md; do pandoc "$file" -o "${file%.md}.html"; done
```

### Markdownをリアルタイムでプレビュー

執筆中の素早いプレビューには、pandocとブラウザへのパイプを使用します：

```console
$ pandoc document.md | firefox -
```

## よくある質問

#### Q1. pandocはどのような形式間で変換できますか？
A. PandocはMarkdown、HTML、LaTeX、DOCX、ODT、EPUB、PDFなど、多数の形式をサポートしています。サポートされているすべての形式を確認するには、`pandoc --list-input-formats`または`pandoc --list-output-formats`を実行してください。

#### Q2. pandocでPDFを作成するにはどうすればよいですか？
A. `pandoc document.md -o document.pdf`を使用します。これにはシステムにLaTeXエンジンがインストールされている必要があることに注意してください。

#### Q3. ドキュメントに引用を含めるにはどうすればよいですか？
A. `--citeproc`と`--bibliography=references.bib`を使用します：`pandoc --citeproc --bibliography=references.bib document.md -o document.pdf`。

#### Q4. pandocは表を適切に変換できますか？
A. はい、pandocはほとんどの形式で表をうまく処理します。複雑な表については、Markdownのパイプテーブルまたはグリッドテーブル構文の使用を検討してください。

#### Q5. 出力ドキュメントの外観をカスタマイズするにはどうすればよいですか？
A. テンプレート（`--template`）、HTMLのCSS（`-c`）、または変数（`-V`）を使用して外観をカスタマイズします。

## 参考文献

https://pandoc.org/MANUAL.html

## 改訂履歴

- 2025/05/05 初版