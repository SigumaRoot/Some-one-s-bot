const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlushCommandBuilder()
        .setName('skip')
        .setDescription('skip')
        .addStringOption(option => option.setName('url')),
    async execute(i, client) {
        let queue = player.getQueue(i.guild.id);
        queue.stop();
        i.reply(`Song Stoped`);
    }
}