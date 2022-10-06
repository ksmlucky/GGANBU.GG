package com.ssafy.gganbu.controller;

import com.ssafy.gganbu.Service.SummonerMatchService;
import com.ssafy.gganbu.db.entity.SummonerMatch;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value ="소환사-매치 정보 API", tags = {"Summoner-Match"})
@RestController
@RequestMapping("/api/v1/summonermatch")
public class SummonerMatchController {

    @Autowired
    SummonerMatchService summonerMatchService;

    @GetMapping("/search/{id}")
    public ResponseEntity<List<SummonerMatch>> getSummonerMatchById(@PathVariable("id") long id){
        List<SummonerMatch> sms = summonerMatchService.getSummonerMatchBySummoner(id);

        if(sms == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(sms);
    }
}
