const db = require('./database')
const dotaStratzApi = require('./plugins/dotaStratzApi');
const { generateImage } = require('./plugins/imgGenerator');
const { sendImage } = require('./discord/message');

module.exports = {
  async mainProcess(client) {
    const users = await db.getUsers();
    console.log(users)

    users.forEach(async (user) => {
      try {
        const lastMatchId = await dotaStratzApi.getLastMatchId(user);

        if (user.alreadySent) {
          return;
        }
      
        await db.updateUser(user, 'lastMatchId', lastMatchId);
            
        const lastMatchData = await dotaStratzApi.getLastMatchData(user);
        
        await generateImage(lastMatchData, user, lastMatchId);

        await sendImage(client, user, lastMatchId);
        await db.updateUser(user, 'alreadySent', true);

      } catch (err) {
        console.error(err)
      }
    })

    await db.syncProfiles();
  }
}