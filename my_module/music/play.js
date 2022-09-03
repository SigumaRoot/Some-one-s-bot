const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType } = require('@discordjs/voice');
const voice = require('@discordjs/voice');
const { EmbedBuilder, SlashCommandBuilder, SlashCommandSubcommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core');

const loadYtdl = (i, query, connection) => {
    //不正かどうか確認
    if (ytdl.validateURL(query)) {
        const get = require('./play/youtube.js');
        const responce = get.execute(i, query, connection);
        return responce;
    } else {
        i.reply(`${query}は処理不能です！！`);
        return 'No data';
    }
}

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('play')
        .setDescription('音楽を再生します。')
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('urlを入力')),
    async execute(i, client) {
        let connection = voice.getVoiceConnection(i.guild.id);
        let category = i.guild.channels.cache.find((c) => c.name == 'Bot Config' && c.type == 4);
        let ch = guild.channel.cache.find((c) => c.name == 'query');
        const guild = i.guild;
        const member = await guild.members.fetch(i.member.id);
        // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
        if (!channel) {
            i.reply('先にボイスチャンネルに参加してください！');
            return 'No data';
        }
        if (!ch)
            ch = i.guild.channels.create({ name: queue, parent: cate }).then(ch => ch.permissionOverwrites.set([{
                id: i.guild.roles.everyone,
                //すべての人(everyone)の権限設定
                deny: ['67584']
                //チャンネルを見ることを禁止する
            }], 'Queue'));

        if (!connection) {
            const channel = member.voice.channel;
            if (connection) { addQueue(i, query) } else {// チャンネルに参加
                connection = joinVoiceChannel({
                    adapterCreator: guild.voiceAdapterCreator,
                    channelId: channel.id,
                    guildId: guild.id,
                    selfDeaf: true,
                    selfMute: false,
                });
            };
        }
        const query = i.options.getString('query');
        
        ch.send(query);
        while(true){
            let url = ch.messages.first().then(messages => messages.first());
            if(!url){
                connection.destroy();
                break;
            }
            loadYtdl(i,url,connection);
        }
        
        return 'No data';
    }
}