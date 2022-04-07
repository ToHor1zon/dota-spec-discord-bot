const axios = require('./axios.js');


module.exports = {
  getUserDotaProfile: async (userId) => {
    const { data } = await axios.getStratz(`player/${userId}`);
    return data;
  },
  getUserRecentMatches: async (userId) => {
    return await axios.getStratz(`players/${userId}/recentMatches`);
  }
}
