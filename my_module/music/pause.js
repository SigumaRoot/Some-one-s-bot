const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('pause')
        .setDescription('一時停止'),
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);        
        if(!queue)return i.sendFollowUp('何も再生してません！！');
        queue.setPaused(true);
        i.sendFollowUp('一時停止中。。。再開するには`/music resume`を実行。');
    }
}