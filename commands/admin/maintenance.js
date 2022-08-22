const { SlashCommandBuilder ,Activity } = require("discord.js");
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
    const playing=i.options.getString('playing');
    client.user.setActivity(playing);
    const member=i.guild.members.resolve(client.user.id);
    client.user.setStatus(status);
      const embed = new Discord.EmbedBuilder()
      .setTitle("ok")
      .setColor(client.config.color.s)
      .addFields([
        { name: 'Status', value: ` ** ${member.presence.status} ** ` }, 
        { name: 'Playing', value: `** ${ member.presence.activity } ** ` }])
      .setTimestamp();
    
    return i.reply({ embeds: [embed] });
    
    
  },
}