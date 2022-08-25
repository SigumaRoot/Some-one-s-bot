const { SlashCommandBuilder } = require("discord.js");
const { excuse } = require("../play");

let cmd = new SlashCommandBuilder();

cmd.setName('spotify').setDescription('spotifyの音声を再生').addStringOption(option => option.setName('url').setDescription('urlを入力'));

module.exports = {
    cmd,
    async excuse(client,url) {
        const track = await client.player
            .search(url, {
                requestedBy: i.user,
                searchEngine: QueryType.SPOTIFY,
            })
            .then((x) => x.tracks[0]);
        return track;
    }
}