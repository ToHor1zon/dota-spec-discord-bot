const api = require('./api');
const { fancyTimeFormat } = require('./format');
const { generateImage } = require('./imgGenerator');

async function getPlayerInfo(fromGameAccountData) {
  const userProfileData = await api.getUserProfileData(fromGameAccountData.steamAccountId);
  const userName = userProfileData.steamAccount.name;

  const { item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, neutral0Id } = fromGameAccountData
  const itemIds = { item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, neutral0Id };
  const itemsInfo = {};

  for (const itemKey in itemIds) {
    const itemInfo = await api.getItemInfo(itemIds[itemKey]);
    itemsInfo[itemKey] = itemInfo;
  }
  console.log(itemsInfo)

  const heroInfo = await api.getHeroInfo(fromGameAccountData.heroId)
  return { heroInfo, userName, fromGameAccountData, itemsInfo };
} 

module.exports = {
  async getLastMatchData(steamAccountId) {
    const lastMatch = await api.getUserRecentMatch(steamAccountId);

    const matchTime = fancyTimeFormat(lastMatch.durationSeconds);
    const fromGameAccountData = lastMatch.players[0]
    const fromLastMatchUserInfo = await getPlayerInfo(fromGameAccountData);
    const matchData = { ...fromLastMatchUserInfo, matchTime };

    generateImage(matchData)
  }
}
