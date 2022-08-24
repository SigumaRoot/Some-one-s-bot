module.exports = {
    async sTrack(url, client) {
        const track = await client.player
            .search(url, {
                requestedBy: i.user,
                searchEngine: QueryType.SPOTIFY,
            })
            .then((x) => x.tracks[0]);
    }
}