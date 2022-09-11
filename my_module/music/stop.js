const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('stop')
        .setDescription('stop')
        ,
    async execute(i, client) {
        let queue = client.client.player.getQueue(i.guild.id);
        queue.stop();
        i.reply(`Song stoped`);
    }
}