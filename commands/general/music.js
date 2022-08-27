const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  adminGuildOnly: true,
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("音楽関係")
    .addSubcommand(subcommand =>
      subcommand
        .setName('play')
        .setDescription('再生')
        .addStringOption(option =>
          option
            .setName('query')
            .setDescription('urlなど'))),

  async execute(i, client) {
    const subCmdName = i.options.getSubcommand();
    const subCmd = require(`${process.cwd()}/my_module/music/${subCmdName}.js`);
    const responce = subCmd.execute(i, client);
    return responce;
  }
};