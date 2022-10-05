package com.ssafy.gganbu.db.repository;

import com.ssafy.gganbu.db.document.SingleRelationEnemy;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.*;

public interface SingleRelationEnemyRepository extends MongoRepository<SingleRelationEnemy, String> {
    Optional<SingleRelationEnemy> findSingleRelationEnemyByRoughTierAndChampion1AndPosition1AndChampion2AndPosition2
            (String roughTier, String champion1, String position1, String champion2, String position2);
    List<SingleRelationEnemy> findSingleRelationEnemiesByRoughTierAndChampion1AndPosition1AndChampion2
            (String roughTier, String champion1, String position1, String champion2);
    List<SingleRelationEnemy> findSingleRelationEnemiesByRoughTierAndPosition1AndChampion2(String roughTier, String position1, String champion2);
}
