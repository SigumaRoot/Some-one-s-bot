const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('pause')
        .setDescription('pause')
        .addStringOption(option => option.setName('url')),
    async execute(i, client) {
        let queue = player.getQueue(i.guild.id);
    queue.setPaused(true);
    i.reply(`Song Paused`);
    }
}