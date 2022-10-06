package com.ssafy.gganbu.db.repository;

import com.ssafy.gganbu.db.document.SingleRelationRival;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SingleRelationRivalRepository extends MongoRepository<SingleRelationRival, String> {
    Optional<SingleRelationRival> findSingleRelationRivalByRoughTierAndChampion1AndPosition1AndChampion2
            (String roughTier, String champion1, String position1, String champion2);
    List<SingleRelationRival> findSingleRelationRivalsByRoughTierAndPosition1AndChampion2(String roughTier, String position1, String champion2);
}
