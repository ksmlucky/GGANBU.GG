package com.ssafy.gganbu.model.RiotAPIDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RiotAPIMatchinfo {
    private String matchId;
    private long gameDuration;
    private String gameMode;
    private long gameCreation;
    private long gameEndTimestamp;
    private String gameType;
    private long queueId;

    List<RiotAPIParticipant> participants;
}
