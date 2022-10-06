package com.ssafy.gganbu.controller;

import com.ssafy.gganbu.Service.SingleRelationTeamService;
import com.ssafy.gganbu.db.document.SingleRelationTeam;
import com.ssafy.gganbu.model.request.TierChampPosReq;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value ="팀 관계 챔피언 데이터 API", tags = {"Team"})
@RestController
@RequestMapping("/api/v1/team")
public class SingleRelationTeamController {
    @Autowired
    SingleRelationTeamService singleRelationTeamService;


    @PostMapping("/allTeam")
    public ResponseEntity<List<SingleRelationTeam>> getAllTeam(@ModelAttribute TierChampPosReq tierChampPosReq){
        List<SingleRelationTeam> singleRelationEnemies = singleRelationTeamService.
                getAllTeam(tierChampPosReq.getRoughTier(), tierChampPosReq.getChampionId(),tierChampPosReq.getPosition());
        if(singleRelationEnemies == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(singleRelationEnemies);

    }
}
