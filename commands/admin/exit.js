const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  adminGuildOnly: true,
  data: new SlashCommandBuilder() 
    .setName("exit")
    .setDescription("exit"),

  async execute(i, client) {
    client.destroy();
    process.exit(0);
  },
}