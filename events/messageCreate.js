const config = require("../config.js");
const functions = require("../functions.js");


module.exports = {
  name: "messageCreate", // イベント名
  async execute(msg,client) {
    if (msg.content.indexOf(`s!`) !== 0) return;
    const command = client.commands.get(msg.content.replace('s!', ''));
    if (!command) return;

    // DM専用コマンド
    if (command.guildOnly && !msg.inGuild()) {
      const embed = new EmbedBuilder()
        .setTitle("エラー")
        .setDescription("このコマンドはDMでは実行できません。")
        .setColor(config.color.e);
      msg.reply({ embeds: [embed] })
      return;
    }
    if (command.adminGuildOnly && !(msg.guild.id == config.dev.testGuild)) {
      const embed = new EmbedBuilder()
        .setTitle("エラー")
        .setDescription("これは管理コマンドです。")
        .setColor(config.color.e);
      msg.reply({ embeds: [embed] });
      return;
    }

    // 実行
    try {
      loging(await command.execute(msg, client), msg.content.replace('s!', ''));
      const log = new EmbedBuilder()
        .setTitle("コマンド実行ログ")
        .setDescription(`${msg.author.tag}(${msg.author.id}) がコマンドを実行しました。`)
        .setColor(config.color.s)
        .setTimestamp()
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .addFields([
          { name: 'コマンド', value: "```\n" + msg.toString() + "\n```" },
          { name: '実行サーバー', value: "```\n" + `${msg.guild.name}(${msg.guild?.id ?? "DM"})` + "\n```" },
          { name: "実行ユーザー", value: "```\n" + `${msg.author.tag}(${msg.author.id})` + "\n```" }])
        .setFooter({ text: String(msg.id) })
      client.channels.fetch(config.logch.command).then(c => c.send({ embeds: [log] }));
    } catch (error) {
      console.error(error);
      const logEmbed = new EmbedBuilder()
        .setTitle("ERROR - cmd")
        .setDescription("```\n" + error + "\n```")
        .setColor(config.color.e)
        .setTimestamp();
      client.channels.fetch(config.logch.error).then({ embeds: [logEmbed] });
      const iEmbed = new EmbedBuilder()
        .setTitle("すみません、エラーが発生しました...")
        .setDescription("```\n" + error + "\n```")
        .setColor(config.color.e)
        .setTimestamp();
      msg.reply(config.logch.error).then(c => c.send({ embeds: [iEmbed] }));
    }
  }
}