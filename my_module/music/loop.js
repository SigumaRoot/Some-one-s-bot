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
                { name: 'OFF', value: 'OFF' },
				{ name: 'TRACK', value: 'TRACK' },
				{ name: 'QUEUE', value: 'QUEUE' },
				{ name: 'AUTO PLAY', value: 'AUTOPLAY' },
			)),
    async execute(i, client) {        
        let type;
        switch (i.options.getString(type)) {
            case 'OFF':
                type = QueueRepeatMode.OFF;
                break;
            case 'TRACK':
                type = QueueRepeatMode.TRACK;
                break;
            case 'QUEUE':
                type = QueueRepeatMode.QUEUE;
                break;
            case 'AUTOPLAY':
                type = QueueRepeatMode.AUTOPLAY;
                break;
            default:
                break;
        }


        let queue = client.player.getQueue(i.guild.id);
        queue.setRepeatMode(type);
        i.reply(`ループ設定完了！！`);
    }
}