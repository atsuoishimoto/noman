# pandoc command

Universal document converter that transforms files between markup formats.

## Overview

Pandoc is a powerful document conversion tool that can convert between numerous markup formats including Markdown, HTML, LaTeX, Word, EPUB, and many others. It's particularly useful for writers, academics, and publishers who need to transform documents while preserving formatting, citations, and other elements.

## Options

### **-f, --from=FORMAT**

Specify input format. If not specified, Pandoc will attempt to guess the format.

```console
$ pandoc -f markdown -t html document.md -o document.html
```

### **-t, --to=FORMAT**

Specify output format.

```console
$ pandoc -t docx document.md -o document.docx
```

### **-o, --output=FILE**

Write output to FILE instead of stdout.

```console
$ pandoc document.md -o document.html
```

### **--pdf-engine=PROGRAM**

Specify which program to use when creating PDF output.

```console
$ pandoc document.md --pdf-engine=xelatex -o document.pdf
```

### **--toc, --table-of-contents**

Include an automatically generated table of contents in the output document.

```console
$ pandoc --toc document.md -o document.html
```

### **-s, --standalone**

Produce a standalone document with appropriate headers and footers.

```console
$ pandoc -s document.md -o document.html
```

### **-c, --css=URL**

Link to a CSS file when creating HTML output.

```console
$ pandoc -c style.css document.md -o document.html
```

### **--bibliography=FILE**

Specify bibliography file for citation processing.

```console
$ pandoc --bibliography=references.bib document.md -o document.pdf
```

### **--citeproc**

Process citations using citeproc.

```console
$ pandoc --citeproc --bibliography=references.bib document.md -o document.pdf
```

### **-V, --variable=KEY[:VALUE]**

Set template variables for use in templates.

```console
$ pandoc -V title="My Document" document.md -o document.pdf
```

## Usage Examples

### Converting Markdown to HTML

```console
$ pandoc document.md -o document.html
```

### Converting Markdown to PDF with a custom template

```console
$ pandoc document.md --template=template.tex -o document.pdf
```

### Converting multiple files to a single output

```console
$ pandoc chapter1.md chapter2.md chapter3.md -o book.docx
```

### Creating a presentation from Markdown

```console
$ pandoc -t revealjs -s presentation.md -o presentation.html
```

### Converting HTML to Markdown

```console
$ pandoc -f html -t markdown webpage.html -o webpage.md
```

## Tips:

### Use Templates for Consistent Output

Create custom templates for frequently used output formats to maintain consistent styling across documents:

```console
$ pandoc --template=mythesis.tex thesis.md -o thesis.pdf
```

### Leverage Metadata Blocks

Include YAML metadata blocks at the top of your Markdown files to control document properties:

```markdown
---
title: "Document Title"
author: "Your Name"
date: "2025-05-05"
---
```

### Batch Convert Multiple Files

Use shell loops to convert multiple files at once:

```console
$ for file in *.md; do pandoc "$file" -o "${file%.md}.html"; done
```

### Preview Markdown in Real-time

For quick previews while writing, use pandoc with a pipe to a browser:

```console
$ pandoc document.md | firefox -
```

## Frequently Asked Questions

#### Q1. What formats can pandoc convert between?
A. Pandoc supports numerous formats including Markdown, HTML, LaTeX, DOCX, ODT, EPUB, PDF, and many more. Run `pandoc --list-input-formats` or `pandoc --list-output-formats` to see all supported formats.

#### Q2. How do I create a PDF with pandoc?
A. Use: `pandoc document.md -o document.pdf`. Note that this requires a LaTeX engine to be installed on your system.

#### Q3. How can I include citations in my document?
A. Use `--citeproc` with `--bibliography=references.bib`: `pandoc --citeproc --bibliography=references.bib document.md -o document.pdf`.

#### Q4. Can pandoc convert tables properly?
A. Yes, pandoc handles tables well across most formats. For complex tables, consider using the pipe table or grid table syntax in Markdown.

#### Q5. How do I customize the appearance of my output document?
A. Use templates (`--template`), CSS for HTML (`-c`), or variables (`-V`) to customize appearance.

## References

https://pandoc.org/MANUAL.html

## Revisions

- 2025/05/05 First revision