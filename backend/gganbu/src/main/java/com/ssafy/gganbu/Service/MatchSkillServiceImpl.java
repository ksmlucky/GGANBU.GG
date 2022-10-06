package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.repository.MatchSkillRepository;
import com.ssafy.gganbu.model.MatchSkill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class MatchSkillServiceImpl implements MatchSkillService {
    @Autowired
    MatchSkillRepository matchSkillRepository;

    @Override
    public List<MatchSkill> getAllMatchSkill() {
        List<MatchSkill> matchSkillList = null;

        try {
            matchSkillList = matchSkillRepository.findAll();
            Collections.sort(matchSkillList, new MatchSkillScoreComparator());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return matchSkillList.size() <= 10 ? matchSkillList : matchSkillList.subList(0, 10);
    }

    @Override
    public void createMatchSkill(MatchSkill matchSkill) {
        matchSkillRepository.save(matchSkill);
    }

    class MatchSkillScoreComparator implements Comparator<MatchSkill> {
        @Override
        public int compare(MatchSkill o1, MatchSkill o2) {

            Long tempLong = new Long(o2.getScore() - o1.getScore());
            return tempLong.intValue();
        }

    }

}
