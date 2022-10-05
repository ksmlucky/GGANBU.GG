package com.ssafy.gganbu.controller;


import com.ssafy.gganbu.Service.MatchBansService;
import com.ssafy.gganbu.db.document.MatchBans;
import com.ssafy.gganbu.db.entity.Participant;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(value ="티어별 전체 밴 정보 API", tags = {"MatchBans"})
@RestController
@RequestMapping("/api/v1/matchBans")
public class MatchBansController {
    @Autowired
    MatchBansService matchBansService;


    @GetMapping("/byTier/{roughTier}")
    public ResponseEntity<MatchBans> getMatchBansByRoughTier(@PathVariable String roughTier){
        MatchBans matchBans = matchBansService.getMatchBansByRoughTier(roughTier);

        //
        System.out.println("피카츄 :" + matchBans);

        //
        if(matchBans == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(matchBans);
    }


}
