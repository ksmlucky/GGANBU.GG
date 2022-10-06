package com.ssafy.gganbu.controller;

import com.ssafy.gganbu.Service.ParticipantService;
import com.ssafy.gganbu.db.entity.Participant;
import com.ssafy.gganbu.db.entity.Summoner;
import com.ssafy.gganbu.model.request.ParticipantSpecReq;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value ="매치 라인 상세 정보 API", tags = {"Participant"})
@RestController
@RequestMapping("/api/v1/participant")
public class ParticipantController {
    @Autowired
    ParticipantService participantService;

    @GetMapping("/bymatchid/{matchId}")
    public ResponseEntity<List<Participant>> getParticipantsByMatchId(@PathVariable("matchId")String matchId){
        List<Participant> participants = participantService.getParticipantsByMatchId(matchId);
        if( participants == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(participants);
    }

    @PostMapping("/specific")
    public ResponseEntity<Participant> getSpecificParticipant(@ModelAttribute ParticipantSpecReq specReq){
        Participant participant = participantService.getSpecificParticipant(specReq);

        if( participant == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(participant);
    }


}
