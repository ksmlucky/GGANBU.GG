package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.entity.MatchData;
import com.ssafy.gganbu.db.entity.Summoner;
import com.ssafy.gganbu.db.entity.SummonerMatch;

import java.util.List;

public interface SummonerMatchService {
    boolean createSummonerMatch(Summoner summoner, MatchData matchData, long participantId);

    List<SummonerMatch> getSummonerMatchBySummoner(long id);
}
