const { SlashCommandBuilder } = require("discord.js");

let cmd = new SlashCommandBuilder();

cmd.setName('youtube').setDescription('youtubeの音声を再生').addStringOption(option => option.setName('url').setDescription('urlを入力'));

module.exports = {
    cmd,
    async excuse(client,url) {
        const track = await client.player
            .search(url, {
                requestedBy: i.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            })
            .then((x) => x.tracks[0]);
        return track;
    }
}