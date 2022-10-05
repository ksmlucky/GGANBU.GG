package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.SingleRelationEnemy;
import com.ssafy.gganbu.db.document.SingleRelationRival;
import com.ssafy.gganbu.db.repository.SingleRelationRivalRepository;
import com.ssafy.gganbu.db.repository.SingleRelationTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service @Transactional
public class SingleRelationRivalServiceImpl implements SingleRelationRivalService {
    @Autowired
    SingleRelationRivalRepository singleRelationRivalRepository;

    @Override
    public SingleRelationRival getSingleRelationRival(String roughTier, String champion1, String position1, String champion2) {
        SingleRelationRival singleRelationRival = null;
        try{
            Optional<SingleRelationRival> singleRelationRivalOptional = singleRelationRivalRepository
                    .findSingleRelationRivalByRoughTierAndChampion1AndPosition1AndChampion2(roughTier, champion1, position1, champion2);
            if(singleRelationRivalOptional.isPresent()){
                singleRelationRival = singleRelationRivalOptional.get();
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return singleRelationRival;
    }

//    @Override
//    public List<SingleRelationEnemy> getSingleRelationEnemyAllLaneEnemy(String roughTier, long champion1, String position1, long champion2) {
//        return null;
//    }
//
//    @Override
//    public List<SingleRelationEnemy> getSingleRelationEnemyAllLaneTeam(String roughTier, long champion1, long champion2, String position2) {
//        return null;
//    }
//
}
