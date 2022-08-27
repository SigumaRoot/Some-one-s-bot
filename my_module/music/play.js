const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType } = require('@discordjs/voice');

module.exports = {
    async execute(i, client, ytdl) {
        const query = i.options.getString('query');
        //不正かどうか確認
        if (!ytdl.validateURL(query)) {
            i.reply(`${query}は処理不能です！！`);
            return 'No data';
        }

        // コマンドを実行したメンバーがいるボイスチャンネルを取得
        const channel = i.member.voice.channel;

        // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
        if (!channel) {
            i.reply('先にボイスチャンネルに参加してください！');
            return 'No data';
        }

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
        const stream = ytdl(ytdl.getURLVideoID(query), {
            filter: format => format.audioCodec === 'opus' && format.container === 'webm', //webm opus
            quality: 'highest',
            highWaterMark: 32 * 1024 * 1024, // https://github.com/fent/node-ytdl-core/issues/902
        });
        const resource = createAudioResource(stream, {
            inputType: StreamType.WebmOpus
        });

        // 再生
        player.play(resource);
        i.reply(`${query}を再生します！！`)
        await entersState(player, AudioPlayerStatus.Playing, 10 * 1000);
        await entersState(player, AudioPlayerStatus.Idle, 24 * 60 * 60 * 1000);

        // 再生が終了したら抜ける
        connection.destroy();
        return 'No data';
    }
}