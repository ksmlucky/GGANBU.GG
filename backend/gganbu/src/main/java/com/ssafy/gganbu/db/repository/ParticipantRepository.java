package com.ssafy.gganbu.db.repository;

import com.ssafy.gganbu.db.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
//    List<Participant> findParticipantBySummonerSId(long sId);
    List<Participant> findParticipantByMatchDataMatchId(String matchId);
    Optional<Participant> findParticipantByMatchDataMatchIdAndParticipantId(String matchId, long participantId);
}
