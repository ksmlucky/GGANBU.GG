const HOST = "http://localhost:8080/"
//const HOST ="http://j7cp204.p.ssafy.io/api/"

const WORLDCUP = "worldcup/"
const MAP = "map/"
const CHART = "chart/"
const WORDCLOUD ="wordcloud/"
const RECOMMAND ="recommand/"

const worldcup ={
    getAllChampion : () => HOST + WORLDCUP +"/",
    getChampionByName : () => HOST + WORLDCUP +"/",
    updateGoldMedal : () => HOST + WORLDCUP + "goldmedal/",
    getGoldMedalCount : () => HOST +WORLDCUP +"goldmedalcount/",
    getWinRate : () => HOST + WORLDCUP + "winrate/"
}

const map ={
    getChampionByName : () => HOST + MAP + "/"
}

const chart = {
    getChampionByName : () =>HOST + CHART + "/"
}

const wordcloud ={
    getChampionByName : () => HOST + WORDCLOUD + "/"
}

const recommand = {
    
}
export {worldcup, map, chart, wordcloud, recommand};