const config = require("../config.js");
const functions = require("../functions.js");

module.exports = {
    name: "ready", // イベント名
    async execute(client) {
        const add = require(`../system/add.js`);
        add.addCmd(client.config);
        client.user.setPresence({ activities: [{ name: `Type /help | Servers: ${client.guilds.cache.size}` }], status: "did" });
        client.channels.cache.get(config.logch.ready).send("Discordログインしました！");
        console.log(`[${functions.timeToJST(Date.now(), true)}] Logged in as ${client.user.tag}!`);
        //client.user.setStatus('dnd');
    }
}