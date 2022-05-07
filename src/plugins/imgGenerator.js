var fs = require('fs');

const nodeHtmlToImage = require('node-html-to-image');
let html;


function readModuleFile(path, callback) {
  try {
    var filename = require.resolve(path);
    fs.readFile(filename, 'utf8', callback);
  } catch (e) {
    callback(e);
  }
}

readModuleFile('../html/index.html', function (err, body) {
  html = body;
});

module.exports = {
  async generateImage(payload, user, matchId) {
    const foo = await nodeHtmlToImage({
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