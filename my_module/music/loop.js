const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlushCommandBuilder()
        .setName('loop')
        .setDescription('loop')
        .addStringOption(option => option.setName('url')),
    async execute(i, client) {
        let queue = player.getQueue(i.guild.id);
        queue.setRepeatMode(queue);
        i.reply(`Song Looped`);
    }
}