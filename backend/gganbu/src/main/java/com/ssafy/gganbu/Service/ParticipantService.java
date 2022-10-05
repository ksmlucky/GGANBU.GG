package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.entity.Participant;
import com.ssafy.gganbu.model.request.ParticipantSpecReq;

import java.util.List;

public interface ParticipantService {
    boolean saveParticipant(Participant participant);

    List<Participant> getParticipantsByMatchId(String matchId);

    Participant getSpecificParticipant(ParticipantSpecReq specReq);

//    List<Participant> getParticipantsBySummonerId(long summonerId);
}
