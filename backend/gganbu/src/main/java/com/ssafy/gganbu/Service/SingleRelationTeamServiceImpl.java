package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.SingleRelationTeam;
import com.ssafy.gganbu.db.repository.SingleRelationTeamRepository;
import com.ssafy.gganbu.model.dbDto.SingleRelationData;
import com.ssafy.gganbu.model.response.ChampionScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service @Transactional
public class SingleRelationTeamServiceImpl implements  SingleRelationTeamService{
    @Autowired
    SingleRelationTeamRepository singleRelationTeamRepository;

    @Override
    public SingleRelationTeam getSingleRelationTeam(String roughTier, String champion1, String position1, String champion2, String position2) {
        SingleRelationTeam singleRelationTeam = null;
        try{
            Optional<SingleRelationTeam> singleRelationTeamOptional = singleRelationTeamRepository
                    .findSingleRelationTeamByRoughTierAndChampion1AndPosition1AndChampion2AndPosition2(roughTier, champion1, position1, champion2, position2);
            if(singleRelationTeamOptional.isPresent()){
                singleRelationTeam = singleRelationTeamOptional.get();
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return singleRelationTeam;
    }

    @Override
    public List<SingleRelationTeam> getSingleRelationTeamAllLaneTeam(String roughTier, String champion1, String champion2) {
        List<SingleRelationTeam> singleRelationTeamList = null;
        try{
            singleRelationTeamList = singleRelationTeamRepository.findSingleRelationTeamsByRoughTierAndChampion1AndChampion2(roughTier, champion1, champion2);
        } catch (Exception e){
            e.printStackTrace();
        }
        return singleRelationTeamList;
    }

    @Override
    public List<SingleRelationTeam> getSingleRelationTeamForRecommend(String roughTier, String position1, String champion2, String position2) {
        List<SingleRelationTeam> singleRelationTeams = null;
        try{
            singleRelationTeams = singleRelationTeamRepository.findSingleRelationTeamsByRoughTierAndPosition1AndChampion2AndPosition2
                    (roughTier, position1, champion2, position2);
        } catch (Exception e){
            e.printStackTrace();
        }
        return singleRelationTeams;
    }

    @Override
    public List<SingleRelationTeam> getAllTeam(String roughTier, String champion1) {
        List<SingleRelationTeam> singleRelationTeams = null;
        try{
            singleRelationTeams = singleRelationTeamRepository.
                    findSingleRelationTeamsByRoughTierAndChampion1(roughTier, champion1);
        }catch (Exception e){
            e.printStackTrace();
        }
        return singleRelationTeams;
    }

    @Override
    public List<ChampionScore> getAllTeamMatchNumScore(String roughTier, String champion1) {
        List<SingleRelationTeam> singleRelationTeams = null;
        Map<String, Long> matchNums = new HashMap<>();
        List<ChampionScore> allTeamData = null;
        try{
            singleRelationTeams = getAllTeam(roughTier, champion1);

            for(SingleRelationTeam srt : singleRelationTeams){
                String championId = srt.getChampion2();

                long matchNum = srt.getData().getMatchNum();
                if(matchNums.containsKey(championId)){
                    matchNum += matchNums.get(championId);
                }
                matchNums.put(championId, matchNum);
            }

            allTeamData = new ArrayList<>();
            for(String key : matchNums.keySet()){
                ChampionScore championScore = new ChampionScore();
                championScore.setChampionId(key);
                double score = matchNums.get(key);
                championScore.setScore(score);
                allTeamData.add(championScore);
            }
            Collections.sort(allTeamData);

        }catch (Exception e){
            e.printStackTrace();
        }

        return allTeamData;
    }

}
