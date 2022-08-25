const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");

module.exports = {
    guildOnly: false, // サーバー専用コマンドかどうか
    adminGuildOnly: true,

    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("音楽を再生します")
        .addStringOption((option) =>
            option.setName("url").setDescription("YouTube URL").setRequired(true)
        ),

    async execute(i, client) {
        if (!i.member.voice.channelId) {
            return await i.reply({
                content: "ボイスチャンネルに参加してください",
                ephemeral: true,
            });
        }

        if (
            i.guild.id &&
            i.member.voice.channelId !==
            i.guild.id
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
        // 入力されたURLからトラックを取得
        const track = await client.player
            .search(url, {
                requestedBy: i.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            })
            .then((x) => x.tracks[0]);

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
};