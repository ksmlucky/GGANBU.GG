package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.entity.MatchData;
import com.ssafy.gganbu.db.entity.Summoner;
import com.ssafy.gganbu.db.entity.SummonerMatch;
import com.ssafy.gganbu.db.repository.SummonerMatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SummonerMatchServiceImpl implements SummonerMatchService {
    @Autowired
    SummonerMatchRepository summonerMatchRepository;

    @Override
    public boolean createSummonerMatch(Summoner summoner, MatchData matchData, long participantId){
        try {
            summonerMatchRepository.save(SummonerMatch.builder().summoner(summoner)
                    .matchData(matchData).participantId(participantId).build());
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;

    }

    @Override
    public List<SummonerMatch> getSummonerMatchBySummoner(long id){
        List<SummonerMatch> sms = null;
        try{
            sms = summonerMatchRepository.findSummonerMatchBySummonerId(id);
        } catch ( Exception e){
            e.printStackTrace();
        }
        return sms;
    }
}
