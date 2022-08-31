const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    guildOnly: false, // サーバー専用コマンドかどうか
    adminguildOnly: true,
    data: new SlashCommandBuilder()
        .setName("init")
        .setDescription("サーバーでボットを使えるようにします。"),

    async execute(i, client) {
        let category = i.guild.channels.cache.find(c => c.type == "GUILD_CATEGORY" && c.name == 'Bot Config');
        let channels = i.guild.channels.cache.find(c => c.type == "GUILD_TEXT" && c.name == client.user.username);
        if (category) {
          console.log('1');
            let rep = new Discord.EmbedBuilder().setTitle('このサーバーにはもう設定用のチャンネルがあります！！');
            i.return({ embeds: [category] });
            return 'No data';
        } else {
            i.guild.channels.create( { name:'Bot Config',type: 'GUILD_CATEGORY' });
            //i.guild.channels.create(client.user.username);
      i.guild.channels.create({ name: client.user.username, reason: 'Bot Config(Do　not edit！)' })
            //let role = i.guilds.roles.fetch();
            /*configCh.permissionOverwrites.set([
                {
                    id: role, // またはそれらのオブジェクト
                    deny: 535529191505, // 許可しない権限
                }
            ], 'Config channel.');
            i.reply('sucsess.');*/
        }
    },
}