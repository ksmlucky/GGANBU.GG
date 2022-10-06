package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.model.MatchSkill;

import java.util.List;

public interface MatchSkillService {
    public List<MatchSkill> getAllMatchSkill();

    public void createMatchSkill(MatchSkill matchSkill);
}
