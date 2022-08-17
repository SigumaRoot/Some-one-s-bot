const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  data: new SlashCommandBuilder() // スラッシュコマンド登録のため
    .setName("avatar")
    .setDescription('Get the avatar URL of the selected user, or your own avatar.')
    .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
  async execute(i, client) {
    let color = client.config.color.s;
    try {
      const user = i.options.getUser('target');
      if (user) {
        const embed = new Discord.EmbedBuilder()
          .setTitle(`${user.username}'s avatar`)
          .setDescription(`${user.displayAvatarURL({ dynamic: true })}`)
          .setColor(client.config.color.s)
          .setImage(user.displayAvatarURL({ dynamic: true }))
          .setTimestamp();
        return i.reply({ embeds: [embed] })
      }
      const embed = new Discord.EmbedBuilder()
        .setTitle(`Your avatar.`)
        .setDescription(`${i.user.displayAvatarURL({ dynamic: true })}`)
        .setImage(i.user.displayAvatarURL({ dynamic: true }))
        .setColor(client.config.color.s)
        .setTimestamp();
      return i.reply({ embeds: [embed] })
    } catch (e) { }
    const embed = new Discord.EmbedBuilder()
      .setTitle(`Your avatar.`)
      .setDescription(`${i.author.displayAvatarURL({ dynamic: true })}`)
      .setImage(i.author.displayAvatarURL({ dynamic: true }))
      .setColor(color)
      .setTimestamp();
    return i.reply({ embeds: [embed] })

  },
}
