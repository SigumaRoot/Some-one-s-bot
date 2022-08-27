const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType } = require('@discordjs/voice');
const fs = require('fs');
const spdl = require('spdl-core').default;

module.exports = {
    async execute(i, client, ytdl) {
        const guild = i.guild;
        const member = await guild.members.fetch(i.member.id);
        const channel = member.voice.channel;

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
        const query = i.options.getString('query');

        //不正かどうか確認
        if (ytdl.validateURL(query)) {
            const get = require('./play/youtube.js');
            const responce = get.execute(i, query, player);
            return responce;
        } else if (spdl.validateURL(query)) {
            const get = require('./play/spotify.js');
            const responce = get.execute(i, query, player);
            return responce;
        } else {
            i.reply(`${query}は処理不能です！！`);
            return 'No data';
        }
    }
}