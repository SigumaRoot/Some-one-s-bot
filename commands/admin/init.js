const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    guildsOnly: false, // サーバー専用コマンドかどうか
    adminguildsOnly: true,
    data: new SlashCommandBuilder()
        .setName("init")
        .setDescription("サーバーでボットを使えるようにします。"),

    async execute(i, client) {
        let category = i.guilds.channels.cache.find(c => c.type == "guilds_CATEGORY" && c.name == 'Bot Config');
        let channels = i.guilds.channels.cache.find(c => c.type == "guilds_TEXT" && c.name == client.user.username);
        if (category) {
            let rep = new Discord.EmbedBuilder().setTitle('このサーバーにはもう設定用のチャンネルがあります！！');
            i.return({ embeds: [category] });
            return 'No data';
        } else {
            i.guilds.channels.create('Bot Config', { type: "guilds_CATEGORY" });
            i.guilds.channels.create(client.user.username);
            /*let configCh = i.guilds.channels.cache.find(client.user.username);
            let role = i.guildss.roles.fetch();
            configCh.permissionOverwrites.set([
                {
                    id: role, // またはそれらのオブジェクト
                    deny: 535529191505, // 許可しない権限
                    //type: "IDを指定する場合は必要" // role or member
                }
            ], 'Config channel.');*/
            i.reply('sucsess.');
        }
    },
}