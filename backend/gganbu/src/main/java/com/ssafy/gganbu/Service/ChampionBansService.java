package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.ChampionBans;

import java.util.List;

public interface ChampionBansService {
    public List<ChampionBans> getChampionBansAllLane(String roughTier, String championId);
    public ChampionBans getChampionBansByLane(String roughTier, String championId, String position);

}
