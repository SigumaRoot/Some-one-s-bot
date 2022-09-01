const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType } = require('@discordjs/voice');
const { EmbedBuilder, SlashCommandBuilder, SlashCommandSubcommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const spdl = require('spdl-core');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('Play')
        .setDescription('音楽を再生します。')
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('urlを入力')),
    async execute(i, client) {
        const guild = i.guild;
        const member = await guild.members.fetch(i.member.id);
        const channel = member.voice.channel;

        // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
        if (!channel) {
            i.reply('先にボイスチャンネルに参加してください！');
            return 'No data';
        }

        const query = i.options.getString('query');

        //不正かどうか確認
        if (ytdl.validateURL(query)) {
            const get = require('./play/youtube.js');
            const responce = get.execute(i, query);
            return responce;
        } else if (spdl.validateURL(query)) {
            const get = require('./play/spotify.js');
            const responce = get.execute(i, query);
            return responce;
        } else {
            i.reply(`${query}は処理不能です！！`);
            return 'No data';
        }
    }
}