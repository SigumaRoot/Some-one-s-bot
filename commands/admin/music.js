const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");
const { Player } = require("discord-player");
const play = require(`${process.cwd()}/my_modules/music/play.js`);
module.exports = {
    guildOnly: true, // サーバー専用コマンドかどうか
    adminGuildOnly: true,
    data: new SlashCommandBuilder()
        .setName("music")
        .addSubcommandGroup(play.subcmd),

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

        const group = interaction.options._group;

        const command = require(`${process.cwd()}/my_module/music/${group}.js`);
        return command.excuse(client, i, queue);

    },
}