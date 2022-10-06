package com.ssafy.gganbu.db.repository;

import com.ssafy.gganbu.db.document.SingleRelationEnemy;
import com.ssafy.gganbu.db.document.SingleRelationTeam;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SingleRelationTeamRepository extends MongoRepository <SingleRelationTeam, String> {
    Optional<SingleRelationTeam> findSingleRelationTeamByRoughTierAndChampion1AndPosition1AndChampion2AndPosition2
            (String roughTier, String champion1, String position1, String champion2, String position2);

    List<SingleRelationTeam> findSingleRelationTeamsByRoughTierAndChampion1AndChampion2
            (String roughTier, String champion1, String champion2);


    List<SingleRelationTeam> findSingleRelationTeamsByRoughTierAndPosition1AndChampion2AndPosition2
            (String roughTier, String position1, String champion2, String position2);
    List<SingleRelationTeam> findSingleRelationTeamsByRoughTierAndChampion1
            (String roughTier, String champion1);
}
