const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('pause')
        .setDescription('一時停止'),
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);
        queue.setPaused(true);
        i.reply('一時停止中。。。再開するには`/music resume`を実行。');
    }
}