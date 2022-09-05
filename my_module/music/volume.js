const { SlushCommandBuilder, EmbedBuilder } =require('discord.js');

module.exports = {
    data: new SlushCommandBuilder()
        .setName('volume')
        .setDescription('volume')
        .addStringOption(option => option.setName('url')),
    async execute(i, client) {
        let queue = player.getQueue(i.guild.id);
    let amount = parseInt(args[0]);
    queue.setVolume(amount);
    i.reply(`Volume Set to \`${amount}\``);
    }
}