package com.ssafy.gganbu.db.repository;

import com.ssafy.gganbu.db.document.NoRelationCommon;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.*;

public interface NoRelationCommonRepository extends MongoRepository<NoRelationCommon, String> {
    Optional<NoRelationCommon> findNoRelationCommonByRoughTierAndChampion1AndPosition1(
            String roughTier, String champion1, String position1);
    List<NoRelationCommon> findNoRelationCommonByRoughTierAndChampion1(String roughTier, String champion1);
    List<NoRelationCommon> findNoRelationCommonsByRoughTier(String roughTier);
}
