# ImageMagick

Create, edit, compose, or convert digital images with a comprehensive suite of command-line tools.

## Overview

ImageMagick is a powerful software suite for manipulating images in various formats. It can read, convert, and write images in over 200 formats including PNG, JPEG, GIF, HEIC, TIFF, DPX, EXR, WebP, and PDF. ImageMagick can resize, flip, mirror, rotate, distort, shear, and transform images, adjust image colors, apply special effects, draw text, lines, polygons, and more.

## Options

ImageMagick consists of several command-line utilities, with the main ones being:

### **convert**

Converts between image formats and performs image operations

```console
$ convert input.jpg -resize 50% output.png
```

### **identify**

Describes the format and characteristics of image files

```console
$ identify image.jpg
image.jpg JPEG 1920x1080 1920x1080+0+0 8-bit sRGB 2.5MB 0.000u 0:00.000
```

### **mogrify**

Transforms images in-place

```console
$ mogrify -resize 800x600 *.jpg
```

### **composite**

Overlays one image on top of another

```console
$ composite overlay.png background.jpg output.jpg
```

### **montage**

Creates a composite image by combining several separate images

```console
$ montage image1.jpg image2.jpg image3.jpg -geometry +5+5 montage.jpg
```

### **display**

Displays images on any X server

```console
$ display image.jpg
```

## Usage Examples

### Resizing an Image

```console
$ convert large_image.jpg -resize 800x600 resized_image.jpg
```

### Converting Between Formats

```console
$ convert document.pdf document.jpg
```

### Adding Text to an Image

```console
$ convert image.jpg -fill white -pointsize 24 -annotate +50+50 'Hello World!' text_image.jpg
```

### Creating a Thumbnail

```console
$ convert image.jpg -thumbnail 100x100 thumbnail.jpg
```

### Applying Effects

```console
$ convert photo.jpg -charcoal 2 charcoal_effect.jpg
```

### Batch Processing Multiple Images

```console
$ mogrify -format png -quality 90 *.jpg
```

## Tips

### Use Proper Quoting for Complex Commands

When using complex commands with multiple options, use quotes to prevent shell interpretation issues:

```console
$ convert input.jpg -resize "800x600>" -quality 85 output.jpg
```

### Memory Management

ImageMagick can be memory-intensive. For large images, consider using the `-limit memory` and `-limit map` options:

```console
$ convert -limit memory 256MB -limit map 512MB large_image.tif output.jpg
```

### Preserve Metadata

Use the `-preserve-timestamp` option to maintain file timestamps when processing:

```console
$ mogrify -preserve-timestamp -resize 50% image.jpg
```

### Use Proper Sequence for Operations

The order of operations matters in ImageMagick. For example, resize before applying effects for better performance:

```console
$ convert input.jpg -resize 800x600 -sharpen 0x1.0 output.jpg
```

## Frequently Asked Questions

#### Q1. How do I install ImageMagick?
A. On Ubuntu/Debian: `sudo apt-get install imagemagick`. On macOS with Homebrew: `brew install imagemagick`. On Windows, download the installer from the official website.

#### Q2. How can I convert multiple images at once?
A. Use the `mogrify` command: `mogrify -format png *.jpg` converts all JPG files to PNG.

#### Q3. How do I resize an image while maintaining its aspect ratio?
A. Use the resize option with a percentage: `convert image.jpg -resize 50% resized.jpg` or specify only one dimension: `convert image.jpg -resize 800x output.jpg`.

#### Q4. How can I reduce image file size?
A. Use the quality option: `convert input.jpg -quality 80 output.jpg` where lower quality values produce smaller files.

#### Q5. How do I create an animated GIF from multiple images?
A. Use: `convert -delay 100 frame*.jpg animated.gif` where delay is in 1/100ths of a second.

## macOS Considerations

On macOS, the default ImageMagick installation may have some features disabled for security reasons. To enable full functionality, you might need to recompile with specific options or use package managers like Homebrew that provide more complete builds.

Additionally, macOS may use the built-in `convert` utility instead of ImageMagick's version. To ensure you're using ImageMagick's commands, use the full path or create aliases in your shell configuration.

## References

https://imagemagick.org/script/command-line-processing.php

## Revisions

- 2025/05/06 First revision