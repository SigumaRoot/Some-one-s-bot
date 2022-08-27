const { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType } = require('@discordjs/voice');

module.exports = {
  async execute(i, client, ytdl) {
    const query = i.options.getString('query');
    //不正かどうか確認
    if (!ytdl.validateURL(query)) {
      i.reply(`${query}は処理不能です！！`);
      return 'No data';
    }

    // コマンドを実行したメンバーがいるボイスチャンネルを取得
    const guild = i.guild;
    const member = await guild.members.fetch(i.member.id);
    const channel = member.voice.channel;

    // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
    if (!channel) {
      i.reply('先にボイスチャンネルに参加してください！');
      return 'No data';
    }

    // チャンネルに参加
    const connection = joinVoiceChannel({
      adapterCreator: channel.guild.voiceAdapterCreator,
      channelId: channel.id,
      guildId: channel.guild.id,
      selfDeaf: true,
      selfMute: false,
    });
    const player = createAudioPlayer();
    connection.subscribe(player);

    // 動画の音源を取得
    const stream = ytdl(ytdl.getURLVideoID(query), { filter: 'audioonly' });
    const resource = createAudioResource(stream);
    
    // 再生
    player.play(resource)
    i.reply(`${query}を再生します！！`)
    await entersState(player, AudioPlayerStatus.Playing, 10 * 1000);
    await entersState(player, AudioPlayerStatus.Idle, 24 * 60 * 60 * 1000);

    // 再生が終了したら抜ける
    connection.destroy();
    return 'No data';
  }
}