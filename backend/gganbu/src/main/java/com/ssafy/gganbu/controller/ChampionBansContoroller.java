package com.ssafy.gganbu.controller;

import com.ssafy.gganbu.Service.ChampionBansService;
import com.ssafy.gganbu.db.document.ChampionBans;
import com.ssafy.gganbu.model.request.ChampionBansReq;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value ="특정 챔피언이 밴한 다른 챔피언 정보 API", tags = {"ChampionBans"})
@RestController
@RequestMapping("/api/v1/championBans")
public class ChampionBansContoroller {
    @Autowired
    ChampionBansService championBansService;

    @PostMapping("/allLane")
    public ResponseEntity<List<ChampionBans>> getChampionBansAllLane(@ModelAttribute ChampionBansReq req){
        List<ChampionBans> championBansList = championBansService.getChampionBansAllLane(req.getRoughTier(), req.getChampionId());

        if(championBansList == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(championBansList);
    }

    @PostMapping("/oneLane")
    public ResponseEntity<ChampionBans> getChampionBansByLane(@ModelAttribute ChampionBansReq req){
        ChampionBans championBans = championBansService.getChampionBansByLane(req.getRoughTier(),
                req.getChampionId(), req.getPosition());

        if(championBans == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(championBans);
    }

}
