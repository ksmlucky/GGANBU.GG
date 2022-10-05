package com.ssafy.gganbu.controller;

import com.ssafy.gganbu.Service.SummonerService;
import com.ssafy.gganbu.db.entity.Summoner;
import com.ssafy.gganbu.model.request.SummonerByNameReq;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Api(value ="소환사 정보 API", tags = {"Summoner"})
@RestController
@RequestMapping("/api/v1/summoner")
public class SummonerController {
    @Autowired
    SummonerService summonerService;

    //닉네임에 공백이 포함될 경우는 어떻게 될지 나중에 처리.
    //추후 에러코드 세분화.
    @PostMapping("/summonerName")
    public ResponseEntity<Summoner> getSummonerByNickname(@ModelAttribute SummonerByNameReq summonerReq){
        Summoner summoner = summonerService.getSummonerByName(summonerReq.getSummonerName(), summonerReq.isRefresh());

        if(summoner == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(summoner);
    }

    @GetMapping("/refresh/{summonerName}")
    public ResponseEntity<Boolean> refreshSummoner(@PathVariable String summonerName){
        if(!summonerService.refeshSummoner(summonerName)){
            return ResponseEntity.status(400).body(false);
        }
        return ResponseEntity.status(200).body(true);
    }


}
