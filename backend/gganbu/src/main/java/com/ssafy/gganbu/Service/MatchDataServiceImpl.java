package com.ssafy.gganbu.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.gganbu.db.entity.MatchData;
import com.ssafy.gganbu.db.entity.Participant;
import com.ssafy.gganbu.db.entity.Summoner;
import com.ssafy.gganbu.db.entity.SummonerMatch;
import com.ssafy.gganbu.db.repository.MatchDataReposiotry;
import com.ssafy.gganbu.model.RiotAPIDto.RiotAPIParticipant;
import com.ssafy.gganbu.model.RiotAPIDto.RiotAPIMatchData;
import com.ssafy.gganbu.model.RiotAPIDto.RiotAPISummoner;
import org.apache.http.HttpResponse;
import org.apache.http.client.ResponseHandler;
import org.apache.http.impl.client.BasicResponseHandler;
import org.hibernate.tool.schema.internal.exec.ScriptTargetOutputToFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MatchDataServiceImpl implements MatchDataService{

    @Autowired
    MatchDataReposiotry matchDataReposiotry;

    @Autowired
    RiotAPIService riotAPIService;

//    @Autowired
//    SummonerService summonerService;

    @Autowired
    ParticipantService participantService;

    @Autowired
    SummonerMatchService summonerMatchService;


//    @Override
//    public List<String> getMatchIdsByName(String summonerName) {
//        RiotAPISummoner rSummoner = summonerService.getRSummonerByName(summonerName);
//        List<String> matchIds = getMatchIdsByPuuid(rSummoner.getPuuid());
//        return matchIds;
//    }

    @Override
    public List<String> getMatchIdsBySummoner(Summoner summoner, boolean refresh){
        List<String> matchIds = null;
        if(!refresh){
            for(SummonerMatch sm : summonerMatchService.getSummonerMatchBySummoner(summoner.getId())){
                matchIds.add(sm.getMatchData().getMatchId());
            }
            return matchIds;
        }
        //
        System.out.println("거북이 : " + summoner.getPuuid());
        //
        matchIds = getMatchIdsByPuuid(summoner.getPuuid());
        return matchIds;

    }

    @Override
    public List<String> getMatchIdsByPuuid(String puuid){
        String requestURL = "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid +
                "/ids?start=0&count=20";
        List<String> matchIds = null;

        ObjectMapper objectMapper = new ObjectMapper();
        HttpResponse responseResult = null;
        try{
            responseResult = riotAPIService.commonRiotAPI(requestURL);
            ResponseHandler<String> handler = new BasicResponseHandler();
            matchIds = Arrays.asList(objectMapper.readValue(handler.handleResponse(responseResult),String[].class));


        } catch(JsonProcessingException e){
            e.printStackTrace();
        } catch(IOException e) {
            e.printStackTrace();
        }
//        catch (InterruptedException e) {
//            e.printStackTrace();
//        }

        return matchIds;
    }

    @Override
    public MatchData getMatchDataByMatchId(String matchId){
        String requestURL = "https://asia.api.riotgames.com/lol/match/v5/matches/" + matchId;

        MatchData matchData = null;
        Optional<MatchData> matchDataOptional = matchDataReposiotry.findById(matchId);
        if(matchDataOptional.isPresent()){
            return matchDataOptional.get();
        }

        RiotAPIMatchData riotAPIMatchData = null;

        ObjectMapper objectMapper = new ObjectMapper();
        HttpResponse responseResult = null;

        try{
            responseResult = riotAPIService.commonRiotAPI(requestURL);
            ResponseHandler<String> handler = new BasicResponseHandler();

            riotAPIMatchData = objectMapper.readValue(handler.handleResponse(responseResult),RiotAPIMatchData.class);
            matchData = new MatchData(riotAPIMatchData.getInfo());
            matchData.setMatchId(matchId);


            matchData.setPuuids(riotAPIMatchData.getMetadata().getParticipants());
            List<String> puuids = matchData.getPuuids();
            matchData = matchDataReposiotry.save(matchData);
            matchData.setPuuids(puuids);
            //
            System.out.println("리자몽 : " + matchData.getPuuids());
            //
            //매치데이터에 있는 참가자 정보 저장.
            for(RiotAPIParticipant p : riotAPIMatchData.getInfo().getParticipants()){

                Participant participant = new Participant(p);
                participant.setMatchData(matchData);

                if(!participantService.saveParticipant(participant)){
                    return null;
                }
            }


        } catch(JsonProcessingException e){
            e.printStackTrace();
        } catch(IOException e){
            e.printStackTrace();
        }

        return matchData ;

    }

//    public void refreshAll(Summoner summoner){
//        List<String> matchIds = getMatchIdsByName(summoner.getName());
//
//        for(String matchId : matchIds){
//            RiotAPIMatchinfo info = getMatchDataByMatchId(matchId).getInfo();
//            MatchData matchData =
//            List< RiotAPIParticipant > participants = info.getParticipants();
//            for(RiotAPIParticipant p : participants){
//
//            }
//        }
//
//    }
}
