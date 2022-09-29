package com.example.champion.repository;

import com.example.champion.model.Worldcup;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface WorldcupRepository extends MongoRepository<Worldcup, String> {
    Optional<Worldcup> findByEnglishname(String englishname);
}
