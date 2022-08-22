const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  adminGuildOnly: true,
  adminGuildOnly: true,
  data: new SlashCommandBuilder() // スラッシュコマンド登録のため
    .setName("maintenance")
    .setDescription("メンテモード")
    .addStringOption(option => option.setName('status').setDescription('すたーてす'))
    .addStringOption(option => option.setName('playing').setDescription('プレイ中に表示するやつ')),

  async execute(i, client,command) {
    const status=i.options.getString('status');
    const playing=i.options.getString('Playing');
    client.user.setActivity(playing);
    client.user.setStatus(status);
      const embed = new Discord.EmbedBuilder()
      .setTitle("ok")
      .setColor(client.config.color.s)
      .addFields([{
        name:"Status",value:client.user.status
      },{
        name:"Playing",value:playing
      }])
      .setTimestamp();
    
    return i.reply({ embeds: [embed] });
    
    
  },
}