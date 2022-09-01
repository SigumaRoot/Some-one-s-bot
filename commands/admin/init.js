const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  adminguildOnly: true,
  data: new SlashCommandBuilder()
    .setName("init")
    .setDescription("サーバーでボットを使えるようにします。"),

  async execute(i, client) {
    let category = i.guild.channels.cache.find((c) => c.name == 'Bot Config' && c.type == 4);

    let channels = i.guild.channels.cache.find((c) => c.name === `${client.user.id}`);

    if (channels && category) {
      let rep = new EmbedBuilder().setTitle('このサーバーにはもう設定用のチャンネルがあります！！');
      i.reply({ embeds: [rep] });
      return 'No data';
    } else {
      i.guild.channels.create({ name: 'Bot Config', type: 4 }).then(cate =>
        i.guild.channels.create({ name: client.user.id, reason: 'Bot Config(Do　not edit！)', type: 0, parent: cate }).then(ch => ch.permissionOverwrites.set([{
          id: i.guild.roles.everyone,
          //すべての人(everyone)の権限設定
          deny: ['67584']
          //チャンネルを見ることを禁止する
        }], 'Bot Config.')));
      i.reply('sucsess.');
    }
    return 'No data';
  },
}