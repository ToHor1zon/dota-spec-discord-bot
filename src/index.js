const fs = require('node:fs');
const db = require('./database');
const Handlebars = require("handlebars");
const dotaStratzApi = require('./plugins/dotaStratzApi');
const { getHtmlContentFromFile } = require('./plugins/files');
const { generateImage } = require('./plugins/imgGenerator');
const { sendImage } = require('./discord/message');

module.exports = {
  async mainProcess(client) {
    const users = await db.getUsers() ?? [];

    users.forEach(async (user) => {
      try {
        const lastMatchId = await dotaStratzApi.getLastMatchId(user);

        if (user.lastMatchId === lastMatchId) {
          return;
        }

        console.log(`New match! User: ${user.name}, MatchId: ${lastMatchId}`);
      
        await db.updateUser(user, 'lastMatchId', lastMatchId);
            
        const lastMatchData = await dotaStratzApi.getLastMatchData(user);
        
        await generateImage(lastMatchData, user, lastMatchId);

        await sendImage(client, user, lastMatchId);

      } catch (err) {
        console.error(err)
      }
    })

    await db.syncProfiles();
  },
  async devProcess() {
    const user = await db.getUser({ steamAccountId: 333654278 });
    console.log(user)
    
    const lastMatchData = await dotaStratzApi.getLastMatchData(user);

    const html = getHtmlContentFromFile();

    const template = Handlebars.compile(html);
    const foo = template(lastMatchData)

    fs.writeFileSync('./src/html/generatedHtml.html', foo)
    console.log('successfully generated html')
  }
}