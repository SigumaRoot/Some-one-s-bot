const fs = require('fs');
const ytdl = require('ytdl-core');
const BASE_PATH = `https://www.youtube.com/watch?v=`;

const youtubeId = `9CHiwJhx3qw`; //DLするYoutube動画のID（urlのv=の後ろの部分11桁）
const url = BASE_PATH+youtubeId;

ytdl(url).pipe(fs.createWriteStream(`${youtubeId}.mp4`));