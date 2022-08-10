const Discord = require("discord.js");
const config = require("../config.js");
const functions = require("../functions.js");

module.exports = {
    name: "guildCreate",
    async execute(guild, client) {
        client.user.setActivity(`Type /help | Servers: ${client.guilds.cache.size}`);
        const addEmbed = new Discord.MessageEmbed()
            .setTitle("サーバー追加")
            .setDescription(`${guild.name}(${guild.id})にBotが追加されました。`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor(config.color)
            .setTimestamp();
        client.channels.fetch(config.logch.guildCreate).then(c => c.send({embeds: [addEmbed]}));
    }
}