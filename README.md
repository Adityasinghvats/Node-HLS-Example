# How does this work?
## When we run `FFmpeg` coversion function it convets `.mp4` file into an `HLS` format, it generate 2 types of file.
## `.m3u8` file
### What is this 🤔:

  - An .m3u8 file is a playlist file used in HLS streaming.
  - It is a text file written in the M3U format, extended with UTF-8 encoding (hence the .m3u8 extension).
  - It contains metadata and references to the .ts files (video segments) that make up the video stream.
### Purpose 🤨:

  - The .m3u8 file acts as an index or manifest for the video player.
  - It tells the player where to find the .ts files and in what order to play them.
  - Example
```bash
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:10.000,
segment0.ts
#EXTINF:10.000,
segment1.ts
#EXTINF:10.000,
segment2.ts
#EXT-X-ENDLIST
```

- `#EXTM3U`: Indicates the file is an extended M3U playlist.
- `#EXT-X-TARGETDURATION`: The maximum duration (in seconds) of each segment.
- `#EXTINF`: The duration of each segment.
segment0.ts, segment1.ts, etc.: References to the .ts files.

## `.ts` Files
### What They Are 🤔:

- .ts files are video segments in the MPEG-TS (Transport Stream) format.
- Each .ts file contains a small chunk of the video, typically 10 seconds long (or the duration specified in the FFmpeg options).
### Purpose 🤨:

- These files are streamed sequentially to the video player.
The player downloads and plays one segment at a time, allowing for adaptive streaming and reduced buffering.
### Why `.ts` Format? 🤔:

- The MPEG-TS format is designed for streaming and can handle errors better than other formats.
- It allows for seamless playback even if some packets are lost during transmission.

### How They Work Together🤔 ?
- The .m3u8 file is loaded by the video player.
- The player reads the .m3u8 file to determine the order and location of the .ts files.
- The player downloads and plays the .ts files one by one, ensuring smooth playback.

### How to run this programme
- Prerequisites :
  - Nodejs
  - Code Editor
- Get the project .
  ```bash
  git clone https://github.com/Adityasinghvats/Node-HLS-Example.git 
  cd Node-HLS-Example
  npm install
  ```
- Add video of your choice with name  `video.mp4` to new folder `videos` under `src` folder .
- Run conversion operation .
  ```bash
  cd src
  node ffmpeg.js
  ```
  After running this you will find many `.ts` files under videos folder .
- Run the app .
  ```bash
  node app.js
  ```
- Access the playback at `http://localhost:8000/` .
## For any queries contact me 🫡