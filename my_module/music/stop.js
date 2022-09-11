const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('stop')
        .setDescription('ストップ（消す）'),
    async execute(i, client) {
        let queue = client.client.player.getQueue(i.guild.id);
        queue.stop();
        i.reply(`VCから抜けました！！`);
    }
}