package com.ssafy.gganbu.db.repository;

import com.ssafy.gganbu.db.entity.Summoner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SummonerRepository extends JpaRepository <Summoner, Long> {
    Optional<Summoner> findSummonerByName(String name);
}
