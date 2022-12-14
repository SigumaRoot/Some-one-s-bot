const { SlashCommandSubcommandBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

const wait = (sec) => {

  return new Promise(resolve => setTimeout(resolve, sec * 1000));

}

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

    queue = client.player.createQueue(i.guild.id, {
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
    await queue.setVolume(25);
    if (song.playlist) {
      i.editReply({ content: `⏱️ |プレイリスト：**${song.playlist.title}**をロード中。。。` });
      for (let trackN = 0; trackN < song.tracks.length; trackN++) {
        if(!await client.player.getQueue(i.guild.id))return;
        console.log('Lording...');
        await queue.play(song.tracks[trackN]).then(l => {
          console.log(song.tracks[trackN].title);
        })
        await wait(5);        
      }
    } else {
      queue.play(song.tracks[0]);
      i.editReply({ content: `⏱️ |**${song.tracks[0].title}**をロード中。。。` });
    }
  }
}
