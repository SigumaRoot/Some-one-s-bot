const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('loop')
        .setDescription('loop')
        .addStringOption(option => option.setName('url')),
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);
        queue.setRepeatMode(queue);
        i.reply(`Song Looped`);
    }
}