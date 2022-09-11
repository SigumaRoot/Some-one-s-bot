const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('skip')
        .setDescription('スキップ'),
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);
        if(!queue)return i.reply('何も再生してません！！');
        queue.skip();
        i.reply(`スキップしました！！`);
    }
}