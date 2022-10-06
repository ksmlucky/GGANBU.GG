package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.model.request.RecommendReq;
import com.ssafy.gganbu.model.response.ChampionScore;
import com.ssafy.gganbu.model.response.ChartRes;
import com.ssafy.gganbu.model.response.LaneNumRes;
import com.ssafy.gganbu.model.response.RecommendRes;

import java.util.List;

public interface ChampionStatisticsService {
    Long getWholeMatchNum(String roughTier);

    Long getWholeMatchNumLane(String roughTier, String position);

    RecommendRes recommendList1(RecommendReq recommendReq);
    LaneNumRes getMatchNumPerLane(String roughTier, String championId);
    ChartRes getChampionChart(String roughTier, String championId);

    double getChampionWinRateALlLane(String roughTier, String championId);
    double getChampionPickRateAllLane(String roughTier, String championId);

    double getPickRateLane(String roughTier, String champion, String position);

    double getChampionBanRateAllLane(String roughTier, String championId);

    //
    RecommendRes recommendList2(RecommendReq recommendReq);

    List<RecommendRes> dispatchAlgorithm(RecommendReq recommendReq);
//    List<ChampionScore>
}
