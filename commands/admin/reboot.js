const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  adminGuildOnly: true,
  data: new SlashCommandBuilder() 
    .setName("reboot")
    .setDescription("reboot"),

  async execute(i, client) {
    client.destroy();
    client.login(process.env.token);
  },
}