# ffmpeg command

Multimedia file converter and processor for audio, video, and other media files.

## Overview

FFmpeg is a powerful command-line tool for processing multimedia files. It can convert between different file formats, compress, extract, and manipulate audio and video streams. FFmpeg supports nearly all audio and video formats and includes hundreds of encoders, decoders, filters, and other processing capabilities.

## Options

### **-i [input]**

Specifies the input file or stream

```console
$ ffmpeg -i input.mp4 output.avi
```

### **-c:v [codec]**

Sets the video codec to use for encoding

```console
$ ffmpeg -i input.mp4 -c:v libx264 output.mp4
```

### **-c:a [codec]**

Sets the audio codec to use for encoding

```console
$ ffmpeg -i input.mp4 -c:a aac output.mp4
```

### **-b:v [bitrate]**

Sets the video bitrate

```console
$ ffmpeg -i input.mp4 -b:v 1M output.mp4
```

### **-b:a [bitrate]**

Sets the audio bitrate

```console
$ ffmpeg -i input.mp4 -b:a 128k output.mp4
```

### **-r [fps]**

Sets the frame rate (frames per second)

```console
$ ffmpeg -i input.mp4 -r 30 output.mp4
```

### **-s [size]**

Sets the frame size (resolution)

```console
$ ffmpeg -i input.mp4 -s 1280x720 output.mp4
```

### **-t [duration]**

Limits the duration of the output

```console
$ ffmpeg -i input.mp4 -t 60 output.mp4
```

### **-ss [time]**

Sets the start time for processing

```console
$ ffmpeg -i input.mp4 -ss 00:01:30 -t 60 clip.mp4
```

### **-vf [filter]**

Applies video filters

```console
$ ffmpeg -i input.mp4 -vf "scale=640:480" output.mp4
```

### **-af [filter]**

Applies audio filters

```console
$ ffmpeg -i input.mp4 -af "volume=2.0" output.mp4
```

## Usage Examples

### Converting video format

```console
$ ffmpeg -i input.mp4 -c:v libx264 -c:a aac output.mkv
```

### Extracting audio from video

```console
$ ffmpeg -i video.mp4 -vn -c:a mp3 audio.mp3
```

### Compressing video

```console
$ ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k compressed.mp4
```

### Creating a video thumbnail

```console
$ ffmpeg -i input.mp4 -ss 00:00:15 -frames:v 1 thumbnail.jpg
```

### Trimming a video

```console
$ ffmpeg -i input.mp4 -ss 00:01:00 -to 00:02:00 -c copy trimmed.mp4
```

### Concatenating multiple videos

```console
$ ffmpeg -i "concat:input1.mp4|input2.mp4|input3.mp4" -c copy output.mp4
```

## Tips:

### Use -c copy for Stream Copying

When you just want to extract or trim without re-encoding, use `-c copy` to copy streams directly without quality loss and process much faster.

### Understand CRF for Quality Control

For H.264 encoding, the Constant Rate Factor (CRF) controls quality. Values range from 0 (lossless) to 51 (worst), with 18-28 being common for good quality. Lower values mean higher quality but larger files.

### Preview Commands with -t

When processing large files, test your command with a short segment first using `-t 10` to process just 10 seconds before committing to the full conversion.

### Monitor Progress

FFmpeg shows progress by default. Add `-v quiet -stats` to see only the progress information without other messages.

### Use Hardware Acceleration

On supported systems, hardware acceleration can significantly speed up encoding. Use codecs like `-c:v h264_nvenc` (NVIDIA) or `-c:v h264_qsv` (Intel) for faster processing.

## Frequently Asked Questions

#### Q1. How do I convert a video to a different format?
A. Use `ffmpeg -i input.video -c:v [video_codec] -c:a [audio_codec] output.format`. For example: `ffmpeg -i input.mp4 -c:v libx264 -c:a aac output.mkv`.

#### Q2. How can I extract audio from a video?
A. Use `ffmpeg -i video.mp4 -vn -c:a [audio_codec] audio.format`. For example: `ffmpeg -i video.mp4 -vn -c:a mp3 audio.mp3`.

#### Q3. How do I resize a video?
A. Use the scale filter: `ffmpeg -i input.mp4 -vf "scale=width:height" output.mp4`. For example: `ffmpeg -i input.mp4 -vf "scale=1280:720" output.mp4`.

#### Q4. How can I cut a portion of a video?
A. Use `-ss` for start time and `-t` for duration: `ffmpeg -i input.mp4 -ss 00:01:30 -t 60 output.mp4` (cuts from 1:30 for 60 seconds).

#### Q5. How do I check information about a media file?
A. Use `ffprobe input.mp4` to display detailed information about the file.

## References

https://ffmpeg.org/ffmpeg.html

## Revisions

- 2025/05/06 First revision