const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  adminGuildOnly: true,
  data: new SlashCommandBuilder() // スラッシュコマンド登録のため
    .setName("maintenance")
    .setDescription("メンテモード")
    .addStringOption(option => option.setName('status').setDescription('すたーてす')),

  async execute(i, client,command) {
    const status=i.options.getString('status');    
    client.user.setStatus(status);
      const embed = new Discord.EmbedBuilder()
      .setTitle("ok")
      .setColor(client.config.color.s)
      .setTimestamp();
    
    return i.reply({ embeds: [embed] });
    
    
  },
}