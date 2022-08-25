const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  adminGuildOnly: true,

  data: new SlashCommandBuilder()
    .setName("quit")
    .setDescription("再生を停止してbotを終了します"),

  async execute(client, interaction) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) {
      return await interaction.reply({
        content: "音楽が再生されていません",
        ephemeral: true,
      });
    }

    queue.destroy();

    await interaction.reply({
      content: "botを終了しました",
    });
  },
};
