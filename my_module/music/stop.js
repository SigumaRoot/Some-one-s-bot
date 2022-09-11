const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('stop')
        .setDescription('ストップ（消す）'),
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);
        if(!queue)return i.sendFollowUp('何も再生してません！！');
        queue.stop();
        i.sendFollowUp(`VCから抜けました！！`);
    }
}