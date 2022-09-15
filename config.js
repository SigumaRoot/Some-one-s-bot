module.exports = {
  BuildName:'Bot',
  profile:{
    name:"シグマちゃん"
    ,server:"https://discord.gg/FMPcQ97ddf",
    website:"",
    author:"SigumaRoot #1421"
  },

  clientId: process.env.clientId,
  color: {
    s:"0x1bff49",
    e:"0xff0000",
  },
  token: process.env.token,
  dev: {
    testGuild: process.env.guildId
  },
  logch: {
    ready: process.env.logChId,
    command: process.env.logChId,
    error: process.env.logChId,
    guildCreate: process.env.logChId,
    guildDelete: process.env.logChId
  }
}