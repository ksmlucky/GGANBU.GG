package com.ssafy.gganbu.controller;

import com.ssafy.gganbu.Service.SingleRelationEnemyService;
import com.ssafy.gganbu.db.document.SingleRelationEnemy;
import com.ssafy.gganbu.model.request.TierChampPosReq;
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


    @PostMapping("/allEnemy")
    public ResponseEntity<List<SingleRelationEnemy>> getAllEnemy(@ModelAttribute TierChampPosReq tierChampPosReq){
        List<SingleRelationEnemy> singleRelationEnemies = singleRelationEnemyService.
                getAllEnemy(tierChampPosReq.getRoughTier(), tierChampPosReq.getChampionId(),tierChampPosReq.getPosition());
        if(singleRelationEnemies == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(singleRelationEnemies);

    }

}
