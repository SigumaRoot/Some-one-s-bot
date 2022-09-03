const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./bot.js', {
  token: process.env.token,
                                               totalShards: "auto",
});

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

// APIサーバー (UptimeRobot用)
const express = require("express");
const app = express();

// ルーティングの設定
app.get("/", (req, res) => {
  const data = {
    "Status": "OK",
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data);
});

app.listen(3000, () => {
  console.log(`Opened API Server`);
});