const axios = require('./axios.js');


module.exports = {
  getUserProfileData: async (userId) => {
    const { data } = await axios.getStratz(`player/${userId}`);
    return data;
  },
  getUserRecentMatch: async (userId) => {
    const { data } = await axios.getStratz(`player/${userId}/matches`);
    return data[0];
  },
  getItemInfo: async (itemId) => {
    const { data } = await axios.getStratz(`item/${itemId}`);
    return data;
  },
  getHeroInfo: async (heroId) => {
    const { data } = await axios.getStratz('hero')
    return data[heroId];
  },
  getGameModeName: async (gameModeId) => {
    const { data } = await axios.getStratz('gamemode')
    return data[String(gameModeId)].name;
  }
  

    // event loop:
    //  1: check this user's object lastMatchId in DB (mb in other method for DB)
    //  2: if users' lastMatchId is different or undefined -- init event send message with info about last match
    //  3: 
}
