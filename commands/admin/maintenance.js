const { SlashCommandBuilder, Activity } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  adminGuildOnly: true,
  data: new SlashCommandBuilder() // スラッシュコマンド登録のため
    .setName("maintenance")
    .setDescription("メンテモード")
    .addStringOption(option => option.setName('status').setDescription('すたーてす'))
    .addStringOption(option => option.setName('playing').setDescription('プレイ中に表示するやつ')),

  async execute(i, client, command) {
    try {
      const status = i.options.getString('status');
      const playing = i.options.getString('playing');
      client.user.setActivity(playing);
      client.user.setStatus(status);
      const embed = new Discord.EmbedBuilder()
        .setTitle("ok")
        .setColor(client.config.color.s)
        .setTimestamp();

      i.reply({ embeds: [embed] });
      return { status: status, playing: playing };
    } catch (e) {
      throw e;
    }

  },
}