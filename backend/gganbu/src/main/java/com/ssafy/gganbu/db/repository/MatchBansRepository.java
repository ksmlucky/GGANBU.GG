package com.ssafy.gganbu.db.repository;

import com.ssafy.gganbu.db.document.MatchBans;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MatchBansRepository extends MongoRepository <MatchBans, String> {
    Optional<MatchBans> findMatchBansByRoughTier(String roughTier);
}
