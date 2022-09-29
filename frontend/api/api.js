const HOST = "http://localhost:8080/"
const WORLDCUP = "worldcup/"

const worldcup ={
    getAllChampion : () => HOST + WORLDCUP +"/",
    getChampionByName : () => HOST + WORLDCUP +"/",
    getGoldMedal : () =>HOST + WORLDCUP + "goldmedal/"
}

export {worldcup};