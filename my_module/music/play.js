const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandSubcommandBuilder()
    .setName('play')
    .setDescription('play')
    .addStringOption(option => option.setName('url').setDescription('url')),
  async execute(i, client) {
    let voiceChannel = i.member.voice.channel;
    if (!voiceChannel) return i.reply(`You Need to Join Voice Channel`);

    let search_Song = args.join(" ");
    if (!search_Song) return i.reply(`Type Song name or Link`);

    let queue = player.createQueue(i.guild.id, {
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
        content: "Could not join your voice channel!",
        ephemeral: true,
      });
    }

    let song = await player
      .search(search_Song, {
        requestedBy: i.author,
      })
      .then((x) => x.tracks[0]);
    if (!song) return i.reply(` I cant Find \`${search_Song}\` `);

    queue.play(song);

    i.reply({ content: `⏱️ | Loading track **${song.title}**!` });
  }
}
