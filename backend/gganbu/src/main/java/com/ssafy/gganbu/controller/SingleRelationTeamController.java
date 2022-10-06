package com.ssafy.gganbu.controller;

import com.ssafy.gganbu.Service.SingleRelationTeamService;
import com.ssafy.gganbu.db.document.SingleRelationTeam;
import com.ssafy.gganbu.model.request.TierChampPosReq;
import com.ssafy.gganbu.model.request.TierChampReq;
import com.ssafy.gganbu.model.response.ChampionScore;
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


    @PostMapping("/allTeamMatchNum")
    public ResponseEntity<List<ChampionScore>> getAllTeam(@RequestBody TierChampReq tierChampReq){
        List<ChampionScore> championScores = singleRelationTeamService.
                getAllTeamMatchNumScore(tierChampReq.getRoughTier(), tierChampReq.getChampionId());
        if(championScores == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(championScores);
    }
}
