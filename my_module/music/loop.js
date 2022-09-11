const { SlashCommandSubcommandBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandSubcommandBuilder()
        .setName('loop')
        .setDescription('ループ設定')
        .addStringOption(option => 
            option.setName('type')
            .setDescription('タイプを選択')
            .addChoice('TRACK')),
    async execute(i, client) {
        let type;
        switch(i.options.getString('type')){
            case TRACK:
                type = QueueRepeatMode.TRACK;
        }
        let queue = client.player.getQueue(i.guild.id);
        queue.setRepeatMode(type);
        i.reply(`ループ設定完了！！次も同じ曲を再生します！！`);
    }
}