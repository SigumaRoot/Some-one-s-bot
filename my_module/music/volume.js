const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('volume')
        .setDescription('volume')
        ,
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);
    let amount = parseInt(args[0]);
    queue.setVolume(amount);
    i.reply(`Volume Set to \`${amount}\``);
    }
}
