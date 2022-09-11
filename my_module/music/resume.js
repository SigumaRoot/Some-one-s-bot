const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('resume')
        .setDescription('再開'),
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);
        if(!queue)return i.sendFollowUp('何も再生してません！！');
        queue.setPaused(false);
        i.sendFollowUp(`一時停止を解除しました！！`);
    }
}