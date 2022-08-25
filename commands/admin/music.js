const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");

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

        const query = interaction.options.getString("query");
        const queue = client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });

        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            await interaction.reply({ content: "すみません。vcに参加できませんでした...", ephemeral: true });
            return 'No data';
        }

        //await interaction.deferReply();

        // 入力されたURLからトラックを取得
        const track = await client.player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);

        if (!track) {
            await interaction.reply({ content: `❌ | **${query}**は見つかりませんでした...` })
            return 'No data';
        }

        // キューにトラックを追加
        await queue.addTrack(track);

        // 音楽が再生中ではない場合、再生
        if (!queue.playing) {
            queue.play();
        }

        await interaction.reply({
            content: `音楽をキューに追加しました **${track.title}**`,
        });
        return 'No data';
    },
};