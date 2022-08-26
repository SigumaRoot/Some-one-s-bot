const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");
const { query } = require("express");

module.exports = {
    guildOnly: false, // サーバー専用コマンドかどうか
    adminGuildOnly: true,

    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("音楽を再生します")
        .addStringOption((option) =>
            option.setName("query").setDescription("YouTube URL").setRequired(true)
        ),

    async execute(interaction, client) {
        if (!interaction.member.voice.channelId) {
            await interaction.reply({ content: "vcに参加してください！！", ephemeral: true });
            return 'No data'
        }
        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            await interaction.reply({ content: "ボットと同じvcに参加してください！！", ephemeral: true });
            return 'No data';
        }

        // verify vc connection
        try {
            interaction.member.voiceChannel.join();
        } catch {
            queue.destroy();
            await interaction.reply({ content: "すみません。vcに参加できませんでした...", ephemeral: true });
            return 'No data';
        }

        const ytdl = require('ytdl-core');
        const {
            AudioPlayerStatus,
            StreamType,
            createAudioPlayer,
            createAudioResource,
            joinVoiceChannel,
        } = require('@discordjs/voice');
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
        });

        const stream = ytdl(query, { filter: 'audioonly' });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        const player = createAudioPlayer();
        if (!stream) {
            await interaction.reply({ content: `❌ | **${query}**は見つかりませんでした...` })
            return 'No data';
        }
        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => connection.destroy());
        await interaction.reply(`**${query}**を再生！！`)
        return 'No data';
    },
};