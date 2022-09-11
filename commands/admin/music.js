const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");

const reqDir = require('require-dir');
const reqObj = reqDir(`${process.cwd()}/my_module/music/`) ;

const req = Object.values(reqObj);

const data = new SlashCommandBuilder() // スラッシュコマンド登録のため
    .setName("music")
    .setDescription('music');

for (let cmd of req){
  data.addSubcommand(cmd.data);
}


module.exports = {
  //adminGuildOnly: true,
  guildOnly: false, // サーバー専用コマンドかどうか
  data,

  async execute(i, client) {
    i.defer();
    const cmd = i.options.getSubcommand();
    const cmf = require(`${process.cwd()}/my_module/music/${cmd}.js`) ;
    cmf.execute(i,client);
    return 'No data';
  },
}