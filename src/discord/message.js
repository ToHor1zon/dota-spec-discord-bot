const { channelId } = require('../../config.json');
const { MessageActionRow, MessageButton } = require('discord.js');


module.exports = {
  async sendImage(client, user, matchId) {
		const channel = client.channels.cache.get(channelId);
    const moreStatisticsButtons = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setURL(`https://ru.dotabuff.com/matches/${matchId}`)
          .setLabel('Dotabuff')
          .setStyle('LINK'),

        new MessageButton()
          .setURL(`https://stratz.com/matches/${matchId}`)
          .setLabel('Stratz')
          .setStyle('LINK'),
      );

		await channel.send({
      content: `<@${user.discordId}>`,
      files: [`./src/generatedImages/${user.steamAccountId}_${matchId}.png`],
      components: [ moreStatisticsButtons ],
    })
  }
}