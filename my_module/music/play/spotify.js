const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType } = require('@discordjs/voice');
const fetch = require('isomorphic-unfetch')
const { getData, getPreview, getTracks, getDetails } = require('spotify-url-info')(fetch);
const ytdl = require(`./youtube`);
const yts = require('yt-search')



module.exports = {
    async execute(i, query) {
        const title = getPreview(query).title;
        const type = getPreview(query).type;
        switch (type) {
            case 'track':
                const r = await yts(title);
                const videos = r.videos.slice(0, 3)
                videos.forEach(function (v) {
                    const views = String(v.views).padStart(10, ' ')
                    console.log(`${views} | ${v.title} (${v.timestamp}) | ${v.author.name}`)
                });
                ytdl.execute(i,);
        }
        return 'No data';
    }
}