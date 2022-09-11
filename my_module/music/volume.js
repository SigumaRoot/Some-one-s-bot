const { SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('volume')
        .setDescription('volume')
        .addStringOption(option => option.setName('volume').setDescription('ボリュームを指定').setRequired(true)),
    async execute(i, client) {
        let queue = client.player.getQueue(i.guild.id);
        const vol = i.options.getString('volume');
        queue.setVolume(vol);
        i.reply(`ボリュームを \`${vol}\`に変更！！`);
    }
}
