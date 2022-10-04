package com.ssafy.gganbu.controller;

import com.ssafy.gganbu.Service.MatchDataService;
import com.ssafy.gganbu.db.entity.MatchData;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value ="매치 정보 API", tags = {"Match"})
@RestController
@RequestMapping("/api/v1/match")
public class MatchDataController {

    @Autowired
    MatchDataService matchDataService;

    @GetMapping("/matchId/{matchId}")
    public ResponseEntity<MatchData> getMatchDataByMatchId(@PathVariable("matchId") String matchId){
        MatchData matchData = matchDataService.getMatchDataByMatchId(matchId);

        if(matchData == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(matchData);
    }

}
