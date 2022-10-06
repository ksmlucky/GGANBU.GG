package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.MatchBans;
import com.ssafy.gganbu.db.repository.MatchBansRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MatchBansServiceImpl implements MatchBansService{

    @Autowired
    MatchBansRepository matchBansRepository;

    @Override
    public MatchBans getMatchBansByRoughTier(String roughTier) {
        MatchBans matchBans = null;
        try{
            Optional<MatchBans> matchBansOptional = matchBansRepository.findMatchBansByRoughTier(roughTier);
            if(matchBansOptional.isPresent()){
                matchBans = matchBansOptional.get();
            }
            matchBans = matchBansOptional.get();
        } catch (Exception e){
            e.printStackTrace();
        }
        return matchBans;
    }

}
