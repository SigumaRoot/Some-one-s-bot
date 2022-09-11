const { SlashCommandSubcommandBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('loop')
        .setDescription('ループ設定')
        .addStringOption(option => 
            option.setName('type')
            .setDescription('タイプを選択')
            .addChoices(
                { name: 'OFF', value: QueueRepeatMode.OFF },
				{ name: 'TRACK', value: QueueRepeatMode.TRACK },
				{ name: 'QUEUE', value: QueueRepeatMode.QUEUE },
				{ name: 'AUTO PLAY', value: QueueRepeatMode.AUTOPLAY },
			)),
    async execute(i, client) {        
        let queue = client.player.getQueue(i.guild.id);
        queue.setRepeatMode(i.options.getString(type));
        i.reply(`ループ設定完了！！`);
    }
}