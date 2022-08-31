const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    guildOnly: false, // サーバー専用コマンドかどうか
    adminGuildOnly: true,
    data: new SlashCommandBuilder()
        .setName("init")
        .setDescription("サーバーでボットを使えるようにします。"),

    async execute(i, client) {
        let category = i.guild.channels.cache.find(c => c.type == "GUILD_CATEGORY" && c.name == 'Bot Config');
        let channels = i.guild.channels.cache.find(c => c.type == "GUILD_TEXT" && c.name == client.user.username);
        if (category) {
            let rep = new Discord.EmbedBuilder().setTitle('このサーバーにはもう設定用のチャンネルがあります！！');
            i.return({ embeds: [category] });
            return 'No data';
        } else {
            i.guild.channels.create('Bot Config', { type: "GUILD_CATEGORY" });
            i.guild.channels.create(client.user.username);
            /*let configCh = i.guild.channels.cache.find(client.user.username);
            let role = i.guilds.roles.fetch();
            configCh.permissionOverwrites.set([
                {
                    id: role, // またはそれらのオブジェクト
                    deny: 535529191505, // 許可しない権限
                    //type: "IDを指定する場合は必要" // role or member
                }
            ], 'Config channel.');*/
            i.reply('sucsess.')
        }
    },
}