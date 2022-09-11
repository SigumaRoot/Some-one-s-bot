const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('pause')
        .setDescription('pause'),
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);
    queue.setPaused(true);
    i.reply(`Song Paused`);
    }
}