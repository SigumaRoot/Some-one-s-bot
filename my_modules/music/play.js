const { SlashCommandBuilder } = require("discord.js");
const spotify = require('./modules/spotify.js');
const youtube = require('./modules/youtube.js');
let subcmd = new SlashCommandBuilder()
    .setName('play')
    .setDescription('曲を再生')
    .addSubcommand(spotify.cmd)
    .addSubcommand(youtube.cmd);

module.exports = {
    subcmd,
    async excuse(client, i, queue) {
        const sub = i.options.getSubcommand();
        const url = i.options.getString('url');
        let track;

        switch (sub) {
            case 'spotify':
                track = spotify.excuse(client, url);
                break;
            case 'youtube':
                track = youtube.excuse(client, url);
                break;
        }

        // 入力されたURLからトラックを取得
        if (!track) {
            return await i.followUp({
                content: "動画が見つかりませんでした",
            });
        }

        // キューにトラックを追加
        await queue.addTrack(track);

        // 音楽が再生中ではない場合、再生
        if (!queue.playing) {
            queue.play();
        }

        return await i.followUp({
            content: `音楽をキューに追加しました **${track.title}**`,
        });
    }
}