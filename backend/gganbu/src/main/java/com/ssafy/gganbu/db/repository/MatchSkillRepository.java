package com.ssafy.gganbu.db.repository;

import com.ssafy.gganbu.model.MatchSkill;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MatchSkillRepository extends MongoRepository<MatchSkill, String> {
    Optional<MatchSkill> findByName(String name);
}
