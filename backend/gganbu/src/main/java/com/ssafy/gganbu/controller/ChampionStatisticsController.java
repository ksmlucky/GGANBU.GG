package com.ssafy.gganbu.controller;

import com.ssafy.gganbu.Service.ChampionStatisticsService;
import com.ssafy.gganbu.Service.NoRelationCommonService;
import com.ssafy.gganbu.db.document.NoRelationCommon;
import com.ssafy.gganbu.model.request.TierChampReq;
import com.ssafy.gganbu.model.request.RecommendReq;
import com.ssafy.gganbu.model.response.ChampionScore;
import com.ssafy.gganbu.model.response.ChartRes;
import com.ssafy.gganbu.model.response.LaneNumRes;
import com.ssafy.gganbu.model.response.RecommendRes;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value ="챔피언 분석 API", tags = {"Champion Statistics"})
@RestController
@RequestMapping("/api/v1/statistics")

public class ChampionStatisticsController {

    @Autowired
    ChampionStatisticsService championStatisticsService;

    @Autowired
    NoRelationCommonService noRelationCommonService;

    @PostMapping("/recommend")
    public ResponseEntity<List<RecommendRes>> recommendMeChampions(@RequestBody RecommendReq recommendReq){
        List<RecommendRes> rList = championStatisticsService.dispatchAlgorithm(recommendReq);
        if( rList == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(rList);
    }


    @GetMapping("/allNum/{roughTier}")
    public ResponseEntity<Long> getAllMatchNum(@PathVariable String roughTier){
        Long allMatchNum = championStatisticsService.getWholeMatchNum(roughTier);
        if(allMatchNum == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(allMatchNum);
    }

    @PostMapping("/numPerLane")
    public ResponseEntity<LaneNumRes> getMatchNumPerLane(@ModelAttribute TierChampReq tierChampReq){
        LaneNumRes laneNumRes = championStatisticsService.getMatchNumPerLane(tierChampReq.getRoughTier(), tierChampReq.getChampionId());
        if(laneNumRes == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(laneNumRes);
    }

    @PostMapping("/chart")
    public ResponseEntity<ChartRes> getChampionChart(@ModelAttribute TierChampReq tierChampReq){
        ChartRes chartRes = championStatisticsService.getChampionChart(tierChampReq.getRoughTier(), tierChampReq.getChampionId());
        if(chartRes == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(chartRes);
    }
}
