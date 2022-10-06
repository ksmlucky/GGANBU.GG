package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.entity.MatchData;
import com.ssafy.gganbu.db.entity.Summoner;

import java.util.List;

public interface MatchDataService {
//    List<String> getMatchIdsByName(String summonerName);

    List<String> getMatchIdsBySummoner(Summoner summoner, boolean refresh);

    List<String> getMatchIdsByPuuid(String puuid);

    MatchData getMatchDataByMatchId(String matchId);
}
