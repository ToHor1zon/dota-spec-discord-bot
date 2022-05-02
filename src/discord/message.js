const { channelId } = require('../../config.json');


module.exports = {
  async sendImage(client, user, matchId) {
		const channel = client.channels.cache.get(channelId);

		await channel.send({ content: `<@${user.discordId}>`, files: [`./src/generatedImages/${user.steamAccountId}_${matchId}.png`] })
  }
}