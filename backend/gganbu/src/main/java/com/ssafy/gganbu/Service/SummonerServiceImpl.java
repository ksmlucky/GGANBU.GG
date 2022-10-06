package com.ssafy.gganbu.Service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.gganbu.db.entity.MatchData;
import com.ssafy.gganbu.db.entity.Summoner;
import com.ssafy.gganbu.db.repository.SummonerRepository;
import com.ssafy.gganbu.model.RiotAPIDto.RiotAPISummoner;
import com.ssafy.gganbu.model.RiotAPIDto.RiotAPIRankData;
import org.apache.http.HttpResponse;
import org.apache.http.client.ResponseHandler;
import org.apache.http.impl.client.BasicResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SummonerServiceImpl implements  SummonerService{

    @Autowired
    RiotAPIService riotAPIService;

    @Autowired
    SummonerRepository summonerRepository;

    @Autowired
    MatchDataService matchDataService;

    @Autowired
    SummonerMatchService summonerMatchService;

    // 소환사 이름으로 검색.
    @Override
    public Summoner getSummonerByName(String summonerName, boolean refresh)  {

        Optional<Summoner> summonerOptional = summonerRepository.findSummonerByName(summonerName);
        //
        System.out.println(summonerOptional);
        //
        Summoner summoner = null;
        if(!refresh && summonerOptional.isPresent() ){
            return summonerOptional.get();
        }

        ObjectMapper objectMapper = new ObjectMapper();
        HttpResponse responseResult = null;
        RiotAPISummoner rSummoner = null;

        rSummoner = getRSummonerByName(summonerName);
        if(rSummoner == null){
            return null;
        }

        //뭔가 문제 생길거같은 지점.
        summoner = new Summoner(rSummoner, getSummonerRankById(rSummoner.getId()));
        if(summonerOptional.isPresent()){
            summoner.setId(summonerOptional.get().getId());
        }
        summonerRepository.save(summoner);

        //소환사
        return summoner;
    }

    @Override
    public RiotAPISummoner getRSummonerByName(String summonerName){
        summonerName = summonerName.replaceAll(" ", "%20");
        String requestURL = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName;

        ObjectMapper objectMapper = new ObjectMapper();
        HttpResponse responseResult = null;
        RiotAPISummoner rSummoner = null;

        try{
            responseResult = riotAPIService.commonRiotAPI(requestURL);
            ResponseHandler<String> handler = new BasicResponseHandler();
            rSummoner = objectMapper.readValue(handler.handleResponse((responseResult)), RiotAPISummoner.class);


        } catch(JsonProcessingException e){
            e.printStackTrace();
        } catch(IOException e){
            e.printStackTrace();
        }
        return rSummoner;
    }

    public RiotAPIRankData getSummonerRankById(String encryptedSummonerId){
        String requestURL = "https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/" + encryptedSummonerId;
        ObjectMapper objectMapper = new ObjectMapper();
        HttpResponse responseResult = null;
        RiotAPIRankData rRankData = null;

        try{
            responseResult = riotAPIService.commonRiotAPI(requestURL);
            ResponseHandler<String> handler = new BasicResponseHandler();
            List<RiotAPIRankData> rRankDatas = Arrays.asList(objectMapper.readValue(handler.handleResponse((responseResult)), RiotAPIRankData[].class));

            for( RiotAPIRankData data : rRankDatas){
                if(data.getQueueType().equals("RANKED_SOLO_5x5")){
                    rRankData = data;
                    break;
                }
            }
        }catch(JsonProcessingException e){
            e.printStackTrace();
        } catch(IOException e){
            e.printStackTrace();
        }

        return rRankData;
    }

    @Override
    public boolean refeshSummoner(String summonerName){
        Summoner summoner = getSummonerByName(summonerName, true);
        List<String> matchIds = matchDataService.getMatchIdsBySummoner(summoner, true);

        for(String matchId : matchIds){
            MatchData matchData = matchDataService.getMatchDataByMatchId(matchId);

            //
            System.out.println("리자몽2 : " + matchData);
            //

            if(matchData == null){
                System.out.println("Error while getting match data");
                return false;
            }

            List<String> puuids = matchData.getPuuids();
            //puuids가 널값이다 => 이미 matchData는 저장되어있다.
            if(puuids == null){
                continue;
            }
            long participantId = -1;
            for(int i = 0; i < puuids.size(); i++){
                if(summoner.getPuuid().equals(puuids.get(i))){
                    participantId = i + 1;
                    break;
                }
            }
            if(!summonerMatchService.createSummonerMatch(summoner, matchData, participantId)){
                System.out.println("Error while saving summoner-match data");
                return false;
            }

        }
        return true;
    }

}
