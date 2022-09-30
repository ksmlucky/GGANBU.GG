const HOST = "http://localhost:8080/"
const WORLDCUP = "worldcup/"

const worldcup ={
    getAllChampion : () => HOST + WORLDCUP +"/",
    getChampionByName : () => HOST + WORLDCUP +"/",
    updateGoldMedal : () => HOST + WORLDCUP + "goldmedal/",
    getGoldMedalCount : () => HOST +WORLDCUP +"goldmedalcount/",
    getWinRate : () => HOST + WORLDCUP + "winrate/"
}

export {worldcup};