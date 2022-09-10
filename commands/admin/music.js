const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  adminGuildOnly: true,
  guildOnly: false, // サーバー専用コマンドかどうか
  data: new SlashCommandBuilder() // スラッシュコマンド登録のため
    .setName("music")
    .setDescription("music").addSubcommand(require(`${process.cwd()}/my_module/music/play.js`).data),

  async execute(i, client) {
    const cmd = i.options.getSubcommand();
    const cmf = require(`${process.cwd()}/my_module/music/${cmd}.js`) ;
    cmf.execute(i,client);
    return 'No data';
  },
}