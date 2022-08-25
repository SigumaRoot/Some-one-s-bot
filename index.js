const fs = require("fs");

const { Client, GatewayIntentBits, Collection, Partials, EmbedBuilder } = require("discord.js");
//import { Client, GatewayIntentBits, Collection, Partials, EmbedBuilder } from "discord.js";
const client = new Client({
  'intents': [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ],
  'partials': [Partials.Channel]
});

const config = require("./config.js");
const functions = require("./functions.js");
const loging = functions.loging;

const { Player } = require("discord-player");
client.player = new Player(client);

// add the trackStart event so when a song will be played this message will be sent
client.player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | **${track.title}**を再生中!`))

client.func = functions;
client.config = config;
client.fs = fs;

const cmdH = require(`./system/command.js`);
cmdH.handling(client, fs, Collection, config);
// イベントハンドリング
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    try {
      client.once(event.name, (...args) => event.execute(...args, client));
    } catch (error) {
      console.error(`\u001b[31m[${yuika.timeToJST(Date.now(), true)}]\u001b[0m\n`, error)
    }
  } else {
    try {
      client.on(event.name, (...args) => event.execute(...args, client));
    } catch (error) {
      console.error(`\u001b[31m[${yuika.timeToJST(Date.now(), true)}]\u001b[0m\n`, error)
    }
  }
}

// コマンドが来た時
client.on("interactionCreate", async i => {
  if (!interaction.isChatInputCommand()) return;
  console.log(i.commandName);
  if (!i.isCommand()) return;
  const command = client.commands.get(i.commandName);
  if (!command) return;

  // DM専用コマンド
  if (command.guildOnly && !i.inGuild()) {
    const embed = new EmbedBuilder()
      .setTitle("エラー")
      .setDescription("このコマンドはDMでは実行できません。")
      .setColor(config.color.e);
    i.reply({ embeds: [embed] })
    return;
  }

  // 実行
  try {
    loging(await command.execute(i, client), i.commandName);
    const log = new EmbedBuilder()
      .setTitle("コマンド実行ログ")
      .setDescription(`${i.user.tag}(${i.user.id}) がコマンドを実行しました。`)
      .setColor(config.color.s)
      .setTimestamp()
      .setThumbnail(i.user.displayAvatarURL({ dynamic: true }))
      .addFields([
        { name: 'コマンド', value: "```\n" + i.toString() + "\n```" },
        { name: '実行サーバー', value: "```\n" + `${i.guild?.id ?? "DM"}(${i.guild?.id ?? "DM"})` + "\n```" },
        { name: "実行ユーザー", value: "```\n" + `${i.user.tag}(${i.user.id})` + "\n```" }])
      .setFooter({ text: String(i.id) })
    client.channels.fetch(config.logch.command).then(c => c.send({ embeds: [log] }));
  } catch (error) {
    console.error(error);
    const logEmbed = new EmbedBuilder()
      .setTitle("ERROR - cmd")
      .setDescription("```\n" + error + "\n```")
      .setColor(config.color.e)
      .setTimestamp();
    client.channels.fetch(config.logch.error).then({ embeds: [logEmbed] });
    const iEmbed = new EmbedBuilder()
      .setTitle("すみません、エラーが発生しました...")
      .setDescription("```\n" + error + "\n```")
      .setColor(config.color.e)
      .setTimestamp();
    i.reply({ embeds: [iEmbed] });
  }
})

// エラー処理 (これ入れないとエラーで落ちる。本当は良くないかもしれない)
process.on("uncaughtException", error => {
  console.error(`[${functions.timeToJST(Date.now(), true)}] ${error.stack}`);
  const embed = new EmbedBuilder()
    .setTitle("ERROR - uncaughtException")
    .setDescription("```\n" + error.stack + "\n```")
    .setColor(config.color.e)
    .setTimestamp();
  client.channels.fetch(config.logch.error).then(c => c.send({ embeds: [embed] }));
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(`\u001b[31m[${functions.timeToJST(Date.now(), true)}] ${reason}\u001b[0m\n`, promise);
  const embed = new EmbedBuilder()
    .setTitle("ERROR - unhandledRejection")
    .setDescription("```\n" + reason + "\n```")
    .setColor(config.color.e)
    .setTimestamp();
  client.channels.fetch(config.logch.error).then(c => c.send({ embeds: [embed] }));
});

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

// ログイン
client.login(config.token);