const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");
const { Player } = require("discord-player");

module.exports = {
    guildOnly: true, // サーバー専用コマンドかどうか
    adminGuildOnly: true,
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("曲を再生")
        .addSubcommand(subcommand => subcommand
            .setName('play')
            .addSubcommand(subcommand => subcommand
                .setName('youtube')
                .setDescription('youtubeの曲を再生')
                .addStringOption(option => option.setName('query').setDescription('urlを入力').setRequired(true)))
            .addSubcommand(subcommand => subcommand
                .setName('spotify')
                .setDescription('Spotifyの曲を再生')
                .addStringOption(option => option.setName('query').setDescription('urlを入力').setRequired(true)))
        )
        .addStringOption(option => option.setName('query').setDescription('曲のタイトルもしくはurl').setRequired(true)),

    async execute(i, client) {
        client.player = new Player(client);
        if (!i.member.voice.channelId) {
            return await i.reply({
                content: "ボイスチャンネルに参加してください",
                ephemeral: true,
            });
        }

        if (
            i.guild.me.voice.channelId &&
            i.member.voice.channelId !==
            i.guild.me.voice.channelId
        ) {
            return await i.reply({
                content: "botと同じボイスチャンネルに参加してください",
                ephemeral: true,
            });
        }

        // キューを生成
        const queue = client.player.createQueue(i.guild, {
            metadata: {
                channel: i.channel,
            },
        });

        try {
            // VCに入ってない場合、VCに参加する
            if (!queue.connection) {
                await queue.connect(i.member.voice.channel);
            }
        } catch {
            queue.destroy();
            return await i.reply({
                content: "ボイスチャンネルに参加できませんでした",
                ephemeral: true,
            });
        }

        await i.deferReply();

        const url = i.options.getString("url");
        const subcommand = interaction.options.getSubcommand();
        let track;

        const module = require(`./music/${subcommand}.js`);
        track = module.sTrack(url, client);;

        // 入力されたURLからトラックを取得
        if (!track) {
            return await i.followUp({
                content: "動画が見つかりませんでした",
            });
        }

        // キューにトラックを追加
        await queue.addTrack(track);

        // 音楽が再生中ではない場合、再生
        if (!queue.playing) {
            queue.play();
        }

        return await i.followUp({
            content: `音楽をキューに追加しました **${track.title}**`,
        });

    },
}