const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('skip')
        .setDescription('skip')
        ,
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);
        queue.stop();
        i.reply(`Song Stoped`);
    }
}