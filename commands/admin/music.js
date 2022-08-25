const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");

module.exports = {
    guildOnly: false, // サーバー専用コマンドかどうか
    adminGuildOnly: true,

    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("音楽を再生します")
        .addStringOption((option) =>
            option.setName("query").setDescription("YouTube URL").setRequired(true)
        ),

    async execute(ctx,client) {
        await ctx.defer();

        const guild = client.guilds.cache.get(ctx.guildID);
        const channel = guild.channels.cache.get(ctx.channelID);
        const query = ctx.options.query;
        const searchResult = await client.player
            .search(query, {
                requestedBy: ctx.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('he');
            });
        if (!searchResult || !searchResult.tracks.length) return void ctx.sendFollowUp({ content: 'No results were found!' });

        const queue = await client.player.createQueue(guild, {
            ytdlOptions: {
                filter: 'audioonly',
                highWaterMark: 1 << 30,
                dlChunkSize: 0,
            },
            metadata: channel
        });

        const member = guild.members.cache.get(ctx.user.id) ?? await guild.members.fetch(ctx.user.id);
        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            void client.player.deleteQueue(ctx.guildID);
            return void ctx.sendFollowUp({ content: 'Could not join your voice channel!' });
        }

        await ctx.sendFollowUp({ content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    }
};