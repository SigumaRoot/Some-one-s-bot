const Discord = require("discord.js");
const config = require("../config.js");
const functions = require("../functions.js");

module.exports = {
    name: "guildDelete",
    async execute(guild, client) {
        client.user.setActivity(`Type /help | Servers: ${client.guilds.cache.size}`);
        const delEmbed = new Discord.EmbedBuilder()
            .setTitle("サーバー退出")
            .setDescription(`${guild.name}(${guild.id})からBotが退出しました。`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor(config.color)
            .setTimestamp();
        client.channels.fetch(config.logch.guildDelete).then(c => c.send({embeds: [delEmbed]}));
      console.log(`[${functions.timeToJST(Date.now(), true)}] Deleted from ${guild.name}(${guild.id})!`);
    }
}