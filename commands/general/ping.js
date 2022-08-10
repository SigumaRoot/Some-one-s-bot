const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    guildOnly: false, // サーバー専用コマンドかどうか
    data: new SlashCommandBuilder() // スラッシュコマンド登録のため
        .setName("ping")
        .setDescription("Ping値を測定"),

    async execute(i, client) {
        const embed = new Discord.Embed()
                .setTitle("Ping")
                .setDescription("Pong!")
                .addField("WebSocket", `**${client.ws.ping} ms**`, true)
                .addField("コマンド受信", `**${new Date() - i.createdAt} ms**`, true)
                .setColor(client.config.color)
                .setTimestamp();
        i.reply({embeds: [embed]});
    },
}