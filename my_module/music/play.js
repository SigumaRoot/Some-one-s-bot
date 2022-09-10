const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandSubcommandBuilder()
    .setName('play')
    .setDescription('play')
    .addStringOption(option => option.setName('url').setDescription('url')),
  async execute(i, client) {
    let voiceChannel = i.member.voice.channel;
    if (!voiceChannel) return i.reply(`VCに参加してください！！`);

    let search_Song = i.options.getString('url');
    if (!search_Song) return i.reply(`曲名もしくはリンクを入力してください！！`);

    let queue = client.player.createQueue(i.guild.id, {
      metadata: {
        channel: i.channel,
      },
    });

    // verify vc connection
    try {
      if (!queue.connection) await queue.connect(voiceChannel);
    } catch {
      queue.destroy();
      return await i.reply({
        content: "VCに参加できませんでした！！",
        ephemeral: true,
      });
    }

    let song = await player
      .search(search_Song, {
        requestedBy: i.author,
      })
      .then((x) => x.tracks[0]);
    if (!song) return i.reply(`\`${search_Song}\` を見つけられませんでした。。。`);

    queue.play(song);

    i.reply({ content: `⏱️ |**${song.title}**をロード中。。。` });
  }
}
