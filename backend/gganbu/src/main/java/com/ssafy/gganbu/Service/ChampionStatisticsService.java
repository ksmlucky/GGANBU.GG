package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.model.request.RecommendReq;
import com.ssafy.gganbu.model.response.ChampionScore;
import com.ssafy.gganbu.model.response.ChartRes;
import com.ssafy.gganbu.model.response.LaneNumRes;

import java.util.List;

public interface ChampionStatisticsService {
    Long getWholeMatchNum(String roughTier);

    Long getWholeMatchNumLane(String roughTier, String position);

    List<ChampionScore> recommendList1(RecommendReq recommendReq);
    LaneNumRes getMatchNumPerLane(String roughTier, String championId);
    ChartRes getChampionChart(String roughTier, String championId);

    double getChampionWinRateALlLane(String roughTier, String championId);
    double getChampionPickRateAllLane(String roughTier, String championId);
    double getChampionBanRateAllLane(String roughTier, String championId);

    //
    List<ChampionScore> recommendList2(RecommendReq recommendReq);

    List<List<ChampionScore>> dispatchAlgorithm(RecommendReq recommendReq);
//    List<ChampionScore>
}
