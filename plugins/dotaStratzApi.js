const api = require('./api');
const { fancyTimeFormat } = require('./format')

async function getPlayerInfo(playerInfo) {
  const { numKills, numDeaths, numAssists, numLastHits, numDenies, goldPerMinute, experiencePerMinute, heroDamage, towerDamage, isVictory, role, networth, level } = playerInfo
  const itemsRaw = [playerInfo.item0Id, playerInfo.item1Id, playerInfo.item2Id, playerInfo.item3Id, playerInfo.item4Id, playerInfo.item5Id, playerInfo.neutral0Id];
  const itemNames = [];

  for (const item of itemsRaw) {
    const name = await api.getItemName(item);
    itemNames.push(name);
  }


  return { itemNames, numKills, numDeaths, numAssists, numLastHits, numDenies, goldPerMinute, experiencePerMinute, heroDamage, towerDamage, isVictory, role, networth, level };
} 

module.exports = {
  async getLastMatchData(playerId) {
    const lastMatch = await api.getUserRecentMatch(playerId);
    const matchTime = fancyTimeFormat(lastMatch.durationSeconds);
    const playerInfo = await getPlayerInfo(lastMatch.players[0]);
    console.log(playerInfo); 
  }
}
