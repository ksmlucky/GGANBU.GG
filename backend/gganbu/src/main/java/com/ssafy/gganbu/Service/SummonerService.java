package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.entity.Summoner;
import com.ssafy.gganbu.model.RiotAPIDto.RiotAPIRankData;
import com.ssafy.gganbu.model.RiotAPIDto.RiotAPISummoner;
import com.ssafy.gganbu.model.dbDto.MasteryData;

import java.util.List;

public interface SummonerService {
    public Summoner getSummonerByName(String summonerName, boolean refresh);

    RiotAPISummoner getRSummonerByName(String summonerName);

    public RiotAPIRankData getSummonerRankById(String encryptedSummonerId);

    boolean refeshSummoner(String summonerName);

    List<MasteryData> championMastery(String encryptedSummonerId);
}
