const { SlashCommandSubcommandBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
  data: new SlashCommandSubcommandBuilder()
    .setName('play')
    .setDescription('play')
    .addStringOption(option => option.setName('query').setDescription('query').setRequired(true)),
  async execute(i, client) {
    let voiceChannel = i.member.voice.channel;
    if (!voiceChannel) return i.editReply(`VCに参加してください！！`);

    let search_Song = i.options.getString('query');
    if (!search_Song) return i.editReply(`曲名もしくはリンクを入力してください！！`);

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
      return await i.editReply({
        content: "VCに参加できませんでした！！",
        ephemeral: true,
      });
    }

    let song = await client.player
      .search(search_Song, {
        requestedBy: i.author,
        searchEngine: QueryType.AUTO
    });

    if (!song) return i.editReply(`\`${search_Song}\` を見つけられませんでした。。。`);
    
    switch (song.type) {
      case "playlist":
        i.editReply({ content: `⏱️ |**${song[0].title}**と、ほか${song.length()-1}をロード中。。。` });
        for(let trackN = 0;trackN < song.length();trackN++){
          queue.play(song[trackN]);
        }
        break;
    
      default:
        queue.play(song);
        i.editReply({ content: `⏱️ |**${song.title}**と、をロード中。。。` });
        break;
    }

    await queue.setVolume(25);
    queue.play(song);

    
  }
}
