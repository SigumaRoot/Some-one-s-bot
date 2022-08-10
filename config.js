module.exports = {
  clientId:process.env.clientId,
  color: "0x1bff49",
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