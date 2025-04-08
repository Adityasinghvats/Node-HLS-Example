import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputPath = path.resolve(__dirname, './videos/video.mp4'); // Relative path
const outputPath = path.resolve(__dirname, './videos/output.m3u8'); // Relative path

console.log('FFmpeg Path:', ffmpegInstaller.path);

ffmpeg(inputPath,  { timeout: 432000 })
    .addOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 10', // segments of 10 sec videos
        '-hls_list_size 0',// include all segments in playlist
        '-f hls' // output format is HLS
    ])
    .output(outputPath)
    .on('end', () => {
        console.log("HLS conversion completed successfully.");
    })
    .on('error', (err) => {
        console.error('Error occurred:', err.message);
    })
    .run();