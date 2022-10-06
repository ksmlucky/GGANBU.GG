package com.ssafy.gganbu.controller;

import com.ssafy.gganbu.Service.SingleRelationEnemyService;
import com.ssafy.gganbu.db.document.SingleRelationEnemy;
import com.ssafy.gganbu.model.request.TierChampPosReq;
import com.ssafy.gganbu.model.request.TierChampReq;
import com.ssafy.gganbu.model.response.ChampionScore;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value ="적 관계 챔피언 데이터 API", tags = {"Enemy"})
@RestController
@RequestMapping("/api/v1/match")
public class SingleRelationEnemyController {
    @Autowired
    SingleRelationEnemyService singleRelationEnemyService;


    @PostMapping("/allEnemyMatchNum")
    public ResponseEntity<List<ChampionScore>> getAllEnemy(@RequestBody TierChampReq tierChampReq){
        List<ChampionScore> championScores = singleRelationEnemyService.
                getAllEnemyMatchNumScore(tierChampReq.getRoughTier(), tierChampReq.getChampionId());
        if(championScores == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(championScores);
    }

}
