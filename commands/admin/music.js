const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");

module.exports = {
  guildOnly: false, // サーバー専用コマンドかどうか
  adminGuildOnly: true,

  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("音楽を再生します")
    .addStringOption((option) =>
      option.setName("url").setDescription("YouTube URL").setRequired(true)
    ),

  async execute(i, client) {
    const bot = await i.guild.members.resolve(client.user.id);
    if (!i.member.voice.channelId) {
      await i.reply({
        content: "ボイスチャンネルに参加してください",
        ephemeral: true,
      });
      return 'No data';
    }

    if (
      bot.voice.channelId &&
      i.member.voice.channelId !==
      bot.voice.channelId
    ) {
      await i.reply({
        content: "botと同じボイスチャンネルに参加してください",
        ephemeral: true,
      });
      return 'No data';
    }

    // キューを生成
    const queue = client.player.createQueue(i.guild, {
      metadata: {
        channel: i.channel,
      },
    });

    try {
      // VCに入ってない場合、VCに参加する
      if (!queue.connection) {
        await queue.connect(i.member.voice.channel);
      }
    } catch {
      queue.destroy();
      await i.reply({
        content: "ボイスチャンネルに参加できませんでした",
        ephemeral: true,
      });
      return 'No data';
    }

    await i.deferReply();
    console.log('defer');

    const url = i.options.getString("url");
    // 入力されたURLからトラックを取得
    const track = await client.player
      .search(url, {
        requestedBy: i.user,
        searchEngine: QueryType.YOUTUBE_VIDEO,
      })
      .then((x) => x.tracks[0]);
    if (!track) {
      console.log('not found');
      await i.editReply(
        '動画が見つかりませんでした');
      return 'No data';
    }

    // キューにトラックを追加
    await queue.addTrack(track);
    console.log('added');

    // 音楽が再生中ではない場合、再生
    if (!queue.playing) {
      queue.play();
      console.log('play track');
    }

    await i.editReply(
      `音楽をキューに追加しました **${track.title}**`);
    return 'No data';
  },
};