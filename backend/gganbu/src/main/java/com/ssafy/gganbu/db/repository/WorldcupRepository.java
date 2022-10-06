package com.ssafy.gganbu.db.repository;


import com.ssafy.gganbu.model.Worldcup;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


// @Repository 넣어도되나.
public interface WorldcupRepository extends MongoRepository<Worldcup, String> {
    Optional<Worldcup> findByEnglishname(String englishname);
}
