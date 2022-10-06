package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.SingleRelationEnemy;
import com.ssafy.gganbu.db.document.SingleRelationTeam;
import com.ssafy.gganbu.db.repository.SingleRelationEnemyRepository;
import com.ssafy.gganbu.model.response.ChampionScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service @Transactional
public class SingleRelationEnemyServiceImpl implements  SingleRelationEnemyService{
    @Autowired
    SingleRelationEnemyRepository singleRelationEnemyRepository;

    @Override
    public SingleRelationEnemy getSingleRelationEnemy(String roughTier, String champion1, String position1, String champion2, String position2) {
        SingleRelationEnemy singleRelationEnemy = null;

        try{
            Optional<SingleRelationEnemy> singleRelationEnemyOptional = singleRelationEnemyRepository.
                    findSingleRelationEnemyByRoughTierAndChampion1AndPosition1AndChampion2AndPosition2(roughTier, champion1, position1, champion2, position2);

            if(singleRelationEnemyOptional.isPresent()){
                singleRelationEnemy = singleRelationEnemyOptional.get();
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return singleRelationEnemy;
    }

    @Override
    public List<SingleRelationEnemy> getSingleRelationEnemyAllLaneEnemy(String roughTier, String champion1, String position1, String champion2) {
        List<SingleRelationEnemy> singleRelationEnemyList = null;

        try{
            singleRelationEnemyList = singleRelationEnemyRepository.
                    findSingleRelationEnemiesByRoughTierAndChampion1AndPosition1AndChampion2(roughTier, champion1, position1, champion2);
        }catch (Exception e){
            e.printStackTrace();
        }
        return singleRelationEnemyList;
    }

    @Override
    public List<SingleRelationEnemy> getSingleRelationEnemyForRecommend(String roughTier, String position1, String champion2, String position2) {
        List<SingleRelationEnemy> singleRelationEnemies = null;
        try{
            singleRelationEnemies = singleRelationEnemyRepository
                    .findSingleRelationEnemiesByRoughTierAndPosition1AndChampion2AndPosition2(roughTier, position1, champion2, position2);
        }catch (Exception e){
            e.printStackTrace();
        }
        return singleRelationEnemies;
    }

    @Override
    public List<SingleRelationEnemy> getAllEnemy(String roughTier, String champion1) {
        List<SingleRelationEnemy> singleRelationEnemies = null;
        try{
            singleRelationEnemies = singleRelationEnemyRepository.
                    findSingleRelationEnemiesByRoughTierAndChampion1(roughTier, champion1);
        }catch (Exception e){
            e.printStackTrace();
        }
        return singleRelationEnemies;
    }

    @Override
    public List<ChampionScore> getAllEnemyMatchNumScore(String roughTier, String champion1) {
        List<SingleRelationEnemy> singleRelationEnemies = null;
        Map<String, Long> matchNums = new HashMap<>();
        List<ChampionScore> allEnemyData = null;
        try{
            singleRelationEnemies = getAllEnemy(roughTier, champion1);

            for(SingleRelationEnemy srt : singleRelationEnemies){
                String championId = srt.getChampion2();

                long matchNum = srt.getData().getMatchNum();
                if(matchNums.containsKey(championId)){
                    matchNum += matchNums.get(championId);
                }
                matchNums.put(championId, matchNum);
            }

            allEnemyData = new ArrayList<>();
            for(String key : matchNums.keySet()){
                ChampionScore championScore = new ChampionScore();
                championScore.setChampionId(key);
                double score = matchNums.get(key);
                championScore.setScore(score);
                allEnemyData.add(championScore);
            }
            Collections.sort(allEnemyData);

        }catch (Exception e){
            e.printStackTrace();
        }

        return allEnemyData;
    }
}
