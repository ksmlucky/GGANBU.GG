package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.entity.Participant;
import com.ssafy.gganbu.db.repository.ParticipantRepository;
import com.ssafy.gganbu.model.request.ParticipantSpecReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ParticipantServiceImpl implements ParticipantService{

    @Autowired
    ParticipantRepository participantRepository;

    @Override
    public boolean saveParticipant(Participant participant){
        try{
            participantRepository.save(participant);
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public List<Participant> getParticipantsByMatchId(String matchId){
        return participantRepository.findParticipantByMatchDataMatchId(matchId);
    }

    @Override
    public Participant getSpecificParticipant(ParticipantSpecReq specReq) {

        try{
            Optional<Participant> participantOptional = participantRepository.findParticipantByMatchDataMatchIdAndParticipantId(specReq.getMatchId(), specReq.getParticipantId());
            if(!participantOptional.isPresent()){
                return null;
            }
            return  participantOptional.get();
        }catch (Exception e ){
            e.printStackTrace();
        }
        return null;
    }

//    @Override
//    public List<Participant> getParticipantsBySummonerId(long summonerId){
//        return participantRepository.findParticipantBySummonerSId(summonerId);
//    }




}
