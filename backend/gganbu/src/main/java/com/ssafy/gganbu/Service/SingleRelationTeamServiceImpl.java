package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.SingleRelationEnemy;
import com.ssafy.gganbu.db.document.SingleRelationTeam;
import com.ssafy.gganbu.db.repository.SingleRelationEnemyRepository;
import com.ssafy.gganbu.db.repository.SingleRelationTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
    public List<SingleRelationTeam> getAllTeam(String roughTier, String champion1, String position1) {
        List<SingleRelationTeam> singleRelationEnemies = null;
        try{
            singleRelationEnemies = singleRelationTeamRepository.
                    findSingleRelationTeamsByRoughTierAndChampion1AndPosition1(roughTier, champion1, position1);
        }catch (Exception e){
            e.printStackTrace();
        }
        return singleRelationEnemies;
    }
}
