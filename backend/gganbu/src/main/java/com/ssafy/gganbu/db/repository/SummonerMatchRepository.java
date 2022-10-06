package com.ssafy.gganbu.db.repository;

import com.ssafy.gganbu.db.entity.SummonerMatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SummonerMatchRepository extends JpaRepository <SummonerMatch, Long> {
    List<SummonerMatch> findSummonerMatchBySummonerId(long id);
}
