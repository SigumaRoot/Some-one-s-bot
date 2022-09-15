const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  adminGuildOnly: true,
  data: new SlashCommandBuilder() // スラッシュコマンド登録のため
    .setName("help")
    .setDescription("helpを表示")
    .addUserOption(option => option.setName('cmdname').setDescription('対象のコマンド')),

  async execute(i, client, command) {
    try {
      const target = i.options.getString('cmdname');
      if (cmdname) {
        const embed = new Discord.EmbedBuilder()
          .setTitle("すみません。そのオプションにはまだ対応していません。")
          .setColor(client.config.color.e)
          .setTimestamp();
        i.reply({ embeds: [embed] });
      }
      return "No data";
    } catch (e) {
      throw e;
    }

  },
}