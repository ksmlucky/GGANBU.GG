const HOST = "http://localhost:8080/api/v1/"
//const HOST ="http://j7cp204.p.ssafy.io/api/v1/"

const WORLDCUP = "worldcup/"
const STATISTICS = "statistics/"

const worldcup ={
    getAllChampion : () => HOST + WORLDCUP +"getall/",
    getChampionByName : () => HOST + WORLDCUP +"/",
    updateGoldMedal : () => HOST + WORLDCUP +"goldmedal/",
    getGoldMedalCount : () => HOST +WORLDCUP + WORLDCUP +"goldmedalcount/",
    getWinRate : () => HOST + WORLDCUP +WORLDCUP +"winrate/",
}

const statistics = {
    getAllMatchNum : () => HOST + STATISTICS +"allNum/",
    getMatchNumPerLane : () => HOST + STATISTICS + "numPerLane/",
    recommend : () => HOST +STATISTICS + "recommend/",
    chart : () => HOST + STATISTICS + "chart/",
}

const wordcloud ={
    getAllTeam : () => HOST + "team/allTeamMatchNum/",
    getAllEnemy : () =>HOST + "match/allEnemyMatchNum/",
}


export {worldcup, statistics, wordcloud};