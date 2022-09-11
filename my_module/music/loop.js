const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('loop')
        .setDescription('ループ設定'),
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);
        queue.setRepeatMode('TRACK');
        i.reply(`ループ設定完了！！次も同じ曲を再生します！！`);
    }
}