const axios = require('./axios.js');


module.exports = {
  getUserDotaProfile: async (userId) => {
    const { data } = await axios.getStratz(`player/${userId}`);
    return data;
  },
  getUserRecentMatch: async (userId) => {
    const { data } = await axios.getStratz(`player/${userId}/matches`);
    return data[0];
  },
  getItemName: async (itemId) => {
    const { data } = await axios.getStratz(`item/${itemId}`);
    return data.displayName;
  },
  

    // event loop:
    //  1: check this user's object lastMatchId in DB (mb in other method for DB)
    //  2: if users' lastMatchId is different or undefined -- init event send message with info about last match
    //  3: 
}
