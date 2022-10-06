package com.ssafy.gganbu.db.repository;

import com.ssafy.gganbu.db.document.ChampionBans;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChampionBansRepository extends MongoRepository<ChampionBans, String> {
    Optional<ChampionBans> findChampionBansByRoughTierAndChampion1AndPosition1(String roughTier, String champion1, String position1);
    List<ChampionBans> findChampionBansByRoughTierAndChampion1(String roughTier, String champion1);
}
