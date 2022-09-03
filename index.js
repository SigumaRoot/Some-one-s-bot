const { exec } = require('child_process');
const cron = require('node-cron');
cron.schedule('0 */5 * * * *', () =>
  exec('curl -v https://discord.com/api/v10', (err, stdout, stderr) => {
    if (err) {
      console.log(`stderr: ${stderr}`)
      return
    }
    console.log(stdout)
    if (stdout.match(/429/)) {
      exec('kill 1');
    }

  }));


const fs = require("fs");

const { Client, GatewayIntentBits, Collection, Partials, EmbedBuilder } = require("discord.js");

const client = new Client({
  'intents': [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ],
  'partials': [Partials.Channel]
});

const config = require("./config.js");
const functions = require("./functions.js");
const loging = functions.loging;

client.func = functions;
client.config = config;
client.fs = fs;
client.AntiSpam = require("discord-anti-spam");
client.antiSpam = new client.AntiSpam({
    warnThreshold: 10, // 警告の原因となる連続して送信されたメッセージの量。
    muteThreshold: 4, // ミュートを引き起こす連続して送信されたメッセージの量
    kickThreshold: 7, // キックを引き起こす連続して送信されるメッセージの量。
    banThreshold: 7, // 禁止の原因となる連続して送信されたメッセージの量。
    maxInterval: 2000, // メッセージがスパムと見なされる時間（ミリ秒単位）。
    warnMessage: '{@user}, スパムをやめて！', // ユーザーに警告したときにチャットで送信されるメッセージ。
    kickMessage: '**{user_tag}** をキックしたよ.', //ユーザーを蹴ったときにチャットで送信されるメッセージ。
    muteMessage: '**{user_tag}** にmuteロールを付けたよ', // ユーザーをミュートするとチャットで送信されるメッセージ。
    banMessage: '**{user_tag}** をBANしたよ.', // ユーザーの禁止時にチャットで送信されるメッセージ。
    maxDuplicatesWarning: 6, //警告をトリガーする重複メッセージの量。
    maxDuplicatesKick: 5, // 警告をトリガーする重複メッセージの量。
    maxDuplicatesBan: 7, // 警告をトリガーする重複メッセージの量。
    maxDuplicatesMute: 8, // ミュートをトリガーする重複メッセージの量。
    ignoredPermissions: ['ADMINISTRATOR'], // これらの権限のいずれかを持つユーザーをパスします。
    ignoreBots: true, // ボットメッセージを無視します。True:on  False:off
    verbose: true, // モジュールからの拡張ログ。True:on  False:off
    ignoredMembers: [], // 無視されるユーザーID。
    muteRoleName: "Muted", // ミュートされたユーザーに与えられる役割の名前！
    removeMessages: true // ボットがユーザーに対してアクションを実行するときにすべてのスパムメッセージを削除する必要がある場合.True:on  False:off
});

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

client.on('message',async message =>{
  if (msg.content.length<=50)msg.delete();
    if (msg.content.indexOf(`s!`) !== 0) return;
    const command = client.commands.get(msg.content.replace('s!', ''));
    if (!command) return    

    // DM専用コマンド
    if (command.guildOnly && !msg.inGuild()) {
      const embed = new EmbedBuilder()
        .setTitle("エラー")
        .setDescription("このコマンドはDMでは実行できません。")
        .setColor(config.color.e);
      msg.reply({ embeds: [embed] })
      return;
    }
    if (command.adminGuildOnly && !(msg.guild.id == config.dev.testGuild)) {
      const embed = new EmbedBuilder()
        .setTitle("エラー")
        .setDescription("これは管理コマンドです。")
        .setColor(config.color.e);
      msg.reply({ embeds: [embed] });
      return;
    }

    // 実行
    try {
      loging(await command.execute(msg, client), msg.content.replace('s!', ''));
      const log = new EmbedBuilder()
        .setTitle("コマンド実行ログ")
        .setDescription(`${msg.author.tag}(${msg.author.id}) がコマンドを実行しました。`)
        .setColor(config.color.s)
        .setTimestamp()
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .addFields([
          { name: 'コマンド', value: "```\n" + msg.toString() + "\n```" },
          { name: '実行サーバー', value: "```\n" + `${msg.guild.name}(${msg.guild?.id ?? "DM"})` + "\n```" },
          { name: "実行ユーザー", value: "```\n" + `${msg.author.tag}(${msg.author.id})` + "\n```" }])
        .setFooter({ text: String(msg.id) })
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
      msg.reply(config.logch.error).then(c => c.send({ embeds: [iEmbed] }));
    }
})
// コマンドが来た時
client.on("interactionCreate", async i => {
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
    i.reply(config.logch.error).then(c => c.send({ embeds: [iEmbed] }));
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

// ログイン
client.login(config.token)

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