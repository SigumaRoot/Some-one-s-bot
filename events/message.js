const config = require("../config.js");
const functions = require("../functions.js");
const AntiSpam = require("discord-anti-spam");
const fs = require('fs');
const antiSpam = new AntiSpam({
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

module.exports = {
  name: "message", // イベント名
  async execute(msg,client) {
    if (message.channel.type == "dm") return;//dmの場合は無視
    if (message.author.bot) return;//botの場合は無視
    if (message.content.startsWith('s!spam unregist') && message.guild) {//メッセージ取得
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('権限がありません');//管理者以外はスルー
        try {
            fs.unlinkSync(message.channel.id)//メッセージが来たチャンネルidのファイル削除
            message.channel.send("解除しました")
        } catch (err) {
            console.log(err)//エラーの場合だす
        }
    }
    if (message.content.startsWith('s!spam regist') && message.guild) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('権限がありません');
        let myRole = message.guild.roles.cache.find(role => role.name === "Muted");//ロール検索
        if (!myRole) {//検索したロールがなかったら
            message.guild.roles.create({
                data: {
                    name: "Muted",
                    color: "#ff0000",
                    permissions: 0,
                    position: 0
                }//ロールのdata詳しくはdjsのやつ見て
            }).then(role => {
                message.channel.send(`解除は!del`);//ロールができたら発言
            }).catch(console.error);//エラーが出た時だす
        }
        fs.writeFile(message.channel.id, '技術不足のためファイル名で判断しています', function (err) {//メッセージが来たチャンネルidのファイルを作る
            if (err) {
                throw err;//エラーはスルー
            }
            message.channel.send('このチャンネルが適応されました');
        })
    }
    if (message.content.startsWith('!subetetouroku') && message.guild) {
        if (message.channel.type == "text")//チャンネルタイプ指定
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('権限がありません');
        let myRole = message.guild.roles.cache.find(role => role.name === "Muted");
        if (!myRole) {
            message.guild.roles.create({
                data: {
                    name: "Muted",
                    color: "#ff0000",
                    permissions: 0,
                    position: 2
                }
            }).then(role => {
                message.channel.send(`解除は!subetedel`);
            }).catch(console.error);
        }
        message.guild.channels.cache.find((channels) => {
            const b = channels.type == "text"
            if (!b) return;//テキストチャンネル以外のチャンネルidは無視
            const a = channels.id
            fs.writeFile(a, '技術不足のためファイル名で判断しています', function (err) {
                if (err) {
                    throw err;
                }
                console.log('一度に多くのチャンネルが適応されました');
            })
        })
        message.channel.send("すべてのチャンネルを登録しました")
    }
    if (message.content.startsWith('!subetedel') && message.guild) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('権限がありません');
        message.guild.channels.cache.find((channels) => {
            const b = channels.type == "text"
            if (!b) return;
            const a = channels.id
            try {
                fs.unlinkSync(a)
                console.log("一度に多くのチャンネルが解除されました")
            } catch (err) {
                console.log(err)
            }
        })
        message.channel.send("すべてのチャンネルを解除しました");
    }
    try {
        if (!message.channel.id) {
            return;
        }
        var ids = fs.readdirSync('./')//現在のフォルダーの中のチャンネルid検索
        if (ids.includes(message.channel.id)) {//出てきたチャンネルidを適応
            antiSpam.message(message);//そのチャンネルをスパム対策する
        };
    } catch (err) {
        console.log(err)//エラーを詳しくだす
    }
    
    
  }
}