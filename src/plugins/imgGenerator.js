const { getHtmlContentFromFile } = require('./files')
const nodeHtmlToImage = require('node-html-to-image');

module.exports = {
  async generateImage(payload, user, matchId) {
    const html = getHtmlContentFromFile();

    await nodeHtmlToImage({
      output: `./src/generatedImages/${user.steamAccountId}_${matchId}.png`,
      html,
      transparent: true,
      content: payload,
      puppeteerArgs: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--headless",
          "--disable-gpu",
          "--disable-dev-shm-usage",
        ]
      }
    })

    console.log(`The image was created successfully for user ${user.name} with name ${user.steamAccountId}_${matchId}.png!`)
  }
}