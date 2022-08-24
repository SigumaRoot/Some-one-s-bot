export async function sTrack(url, client) {
    const track = await client.player
        .search(url, {
            requestedBy: i.user,
            searchEngine: QueryType.YOUTUBE_VIDEO,
        })
        .then((x) => x.tracks[0]);
}