const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    execute(i, query, player) {
        // 動画の音源を取得
        const stream = ytdl(ytdl.getURLVideoID(query), { filter: 'audioonly' });
        const resource = createAudioResource(stream);

        // 再生
        player.play(resource)
        i.reply(`${query}を再生します！！`)
        await entersState(player, AudioPlayerStatus.Playing, 10 * 1000);
        await entersState(player, AudioPlayerStatus.Idle, 24 * 60 * 60 * 1000);

        // 再生が終了したら抜ける
        connection.destroy();
        return 'No data';
    }
}