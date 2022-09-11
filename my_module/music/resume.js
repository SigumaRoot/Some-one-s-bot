const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('resume')
        .setDescription('resume'),
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);
    queue.setPaused(false);
    i.reply(`Song Resumed`);
    }
}