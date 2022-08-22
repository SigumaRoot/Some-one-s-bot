const config = require("../config.js");
const functions = require("../functions.js");
const fs = require('fs');

module.exports = {
  name: "ready", // イベント名
  async execute(client) {
    let log = JSON.parse(fs.readFileSync(`../log/maintenance.log`, 'utf8'));
    const add = require(`../system/add.js`);
    add.addCmd(client.config);
    client.user.setActivity(log.playing);
    client.user.setStatus(log.status);
    /*client.user.setActivity('activity', { type: 'WATCHING' });
client.user.setActivity('activity', { type: 'LISTENING' });
client.user.setActivity('activity', { type: 'COMPETING' });*/
    /*client.user.setStatus('online');
client.user.setStatus('idle');
client.user.setStatus('dnd');
client.user.setStatus('invisible');*/ client.channels.cache.get(config.logch.ready).send("Discordログインしました！");
    console.log(`[${functions.timeToJST(Date.now(), true)}] Logged in as ${client.user.tag}!`);
  }
}