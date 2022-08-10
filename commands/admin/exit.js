const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  data: new SlashCommandBuilder() // スラッシュコマンド登録のため
    .setName("exit")
    .setDescription("exit"),

  async execute(i, client) {
    client.destroy();
    process.exit(0);
  },
}