const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    async execute(i, query) {
        const guild = i.guild;
        const member = await guild.members.fetch(i.member.id);
        const channel = member.voice.channel;

        // チャンネルに参加
        const connection = joinVoiceChannel({
            adapterCreator: channel.guild.voiceAdapterCreator,
            channelId: channel.id,
            guildId: channel.guild.id,
            selfDeaf: true,
            selfMute: false,
        });
        const player = createAudioPlayer();
        connection.subscribe(player);

        // 動画の音源を取得
        const stream = ytdl(ytdl.getURLVideoID(query), { filter: 'audioonly' });
        const resource = createAudioResource(stream);

        console.log('1');

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