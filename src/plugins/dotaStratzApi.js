const api = require('./api');
const { fancyTimeFormat } = require('./format');
const { roleCoresEnum, roleSupportsEnum } = require('./enums');


function getRoleName(laneId, roleId) {
  if(roleId === 0) {
    return roleCoresEnum[String(laneId)]
  } else {
    return roleSupportsEnum[String(laneId)]
  }
}

async function getPlayerInfo(inGameStats) {
  const userProfileData = await api.getUserProfileData(inGameStats.steamAccountId);
  const userName = userProfileData.steamAccount.name;
  const userPosName = getRoleName(inGameStats.lane, inGameStats.role);
  const { item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, neutral0Id } = inGameStats
  const itemIds = { item0Id, item1Id, item2Id, item3Id, item4Id, item5Id, neutral0Id };
  const itemsInfo = {};

  for (const itemKey in itemIds) {
    let itemInfo = null;
    if(itemIds[itemKey]) {
      itemInfo = await api.getItemInfo(itemIds[itemKey]);
      itemInfo.imageUrl = `http://cdn.dota2.com/apps/dota2/images/items/${itemInfo.image}`
    }
    itemsInfo[itemKey] = itemInfo;
  }

  const heroInfo = await api.getHeroInfo(inGameStats.heroId)
  heroInfo.imageUrl = `http://cdn.dota2.com/apps/dota2/images/heroes/${heroInfo.shortName}_lg.png`
  return { heroInfo, userName, userPosName, inGameStats, itemsInfo };
}

function getResultObject(isWin) {
  if(isWin) {
    return {
      text: 'WIN',
      color: '44C230',
      backgroundColor: '013220',
      fontSize: '224',
    }
  } else {
    return {
      text: 'LOSE',
      backgroundColor: '80000050',
      color: 'E53845',
      fontSize: '174',
    }
  }
}

module.exports = {
  async getProfileData(user) {
    return await api.getUserProfileData(user.steamAccountId);
  },
  async getLastMatchId(user) {
    const lastMatch = await api.getUserRecentMatch(user.steamAccountId);
    return lastMatch.id;
  },
  async getLastMatchData(user) {
    const lastMatch = await api.getUserRecentMatch(user.steamAccountId);
    const matchTime = fancyTimeFormat(lastMatch.durationSeconds);
    const fromLastMatchUserInfo = await getPlayerInfo(lastMatch.players[0]);
    const gamemode = await api.getGameModeName(lastMatch.gameMode)
    const isWin = fromLastMatchUserInfo.inGameStats.isRadiant === lastMatch.didRadiantWin;
    const gameResultObject = getResultObject(isWin);
    const team = fromLastMatchUserInfo.inGameStats.isRadiant ? 'Radiant' : 'Dire'
    return { ...fromLastMatchUserInfo, matchTime, gamemode, gameResultObject, team };
  },
}
