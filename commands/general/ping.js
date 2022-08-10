const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  data: new SlashCommandBuilder() // スラッシュコマンド登録のため
    .setName("ping")
    .setDescription("Ping値を測定"),

  async execute(i, client) {
    const cmdPing = new Date() - i.createdAt;
    const embed = new Discord.EmbedBuilder()
      .setTitle("Ping")
      .setDescription("Pong!")
      .addFields([
        { name: 'WebSocket', value: ` ** ${client.ws.ping} ms ** ` }, 
        { name: 'コマンド受信', value: `** ${ cmdPing } ms ** ` }])
      .setColor(client.config.color)
      .setTimestamp();
    i.reply({ embeds: [embed] });
  },
}