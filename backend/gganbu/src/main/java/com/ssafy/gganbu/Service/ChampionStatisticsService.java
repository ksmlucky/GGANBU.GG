package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.model.request.RecommendReq;
import com.ssafy.gganbu.model.response.ChampionScore;

import java.util.List;

public interface ChampionStatisticsService {
    Long getWholeMatchNum(String roughTier);

    List<ChampionScore> recommendList1(RecommendReq recommendReq);
}
