const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandSubcommandBuilder()
    .setName('play')
    .setDescription('play')
    .addStringOption(option => option.setName('query').setDescription('query').setRequired(true)),
  async execute(i, client) {
    let voiceChannel = i.member.voice.channel;
    if (!voiceChannel) return i.sendFollowUp(`VCに参加してください！！`);

    let search_Song = i.options.getString('query');
    if (!search_Song) return i.sendFollowUp(`曲名もしくはリンクを入力してください！！`);

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
      return await i.sendFollowUp({
        content: "VCに参加できませんでした！！",
        ephemeral: true,
      });
    }

    let song = await client.player
      .search(search_Song, {
        requestedBy: i.author,
      })
      .then((x) => x.tracks[0]);
    if (!song) return i.sendFollowUp(`\`${search_Song}\` を見つけられませんでした。。。`);
    await queue.setVolume(25);
    queue.play(song);

    i.sendFollowUp({ content: `⏱️ |**${song.title}**をロード中。。。` });
  }
}
