import { SlushCommandBuilder, EmbedBuilder } from 'discord.js';

module.exports = {
    data: new SlushCommandBuilder()
        .setName('resume')
        .setDescription('resume')
        .addStringOption(option => option.setName('url')),
    async execute(i, client) {
        let queue = player.getQueue(i.guild.id);
    queue.setPaused(false);
    i.reply(`Song Resumed`);
    }
}