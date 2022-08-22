const fs = require('fs');

const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    guildOnly: false, // サーバー専用コマンドかどうか
    adminGuildOnly: true,
    data: new SlashCommandBuilder() // スラッシュコマンド登録のため
        .setName("todo")
        .setDescription("testログシステム")
        .addStringOption(option => option.setName('data').setDescription('やること')),

    async execute(i, client) {
        const fs = require("fs");

        // 書き込むデータ準備
        const data = i.options.getString('data');
        const option = { flag: "a" };
        // 書き込み
        fs.writeFile("Todo.text", data, option, (err) => {
            if (err) throw err;
            console.log('正常に書き込みが完了しました');
        });
    },
}