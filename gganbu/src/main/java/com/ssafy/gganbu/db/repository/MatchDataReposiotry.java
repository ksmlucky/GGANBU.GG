package com.ssafy.gganbu.db.repository;

import com.ssafy.gganbu.db.entity.MatchData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MatchDataReposiotry extends JpaRepository <MatchData, String> {
    Optional<MatchData> findMatchDataByMatchId(String matchId);
}
