const config = require("../config.js");
const functions = require("../functions.js");

module.exports = {
    name: "disconnect", // イベント名
    async execute(client) {
      client.channels.cache.get(config.logch.ready).send("接続が切れました。");
      client.login(process.env.token);
    }
}