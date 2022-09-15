const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('shuffle')
        .setDescription('シャッフル'),
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);
        if(!queue)return i.editReply('何も再生してません！！');
        queue.shuffle();
        i.editReply(`シャッフル完了！！`);
    }
}