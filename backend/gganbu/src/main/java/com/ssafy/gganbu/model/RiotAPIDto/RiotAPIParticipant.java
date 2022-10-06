package com.ssafy.gganbu.model.RiotAPIDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RiotAPIParticipant {

    private long participantId;

    private String summonerName;
    private String summonerId;

    private long championId;
    private String championName;

    private long kills;
    private long assists;
    private long deaths;

    private long physicalDamageDealtToChampions;
    private long trueDamageDealtToChampions;
    private long magicDamageDealtToChampions;
    private long totalDamageTaken;

    private long champLevel;
    private long totalMinionsKilled;
    private long timeCCingOthers;
    private long goldEarned;

    private String teamPosition;
    private long teamId;

    private long item0;
    private long item1;
    private long item2;
    private long item3;
    private long item4;
    private long item5;
    private long item6;

    private long summoner1Id;
    private long summoner2Id;

    private boolean win;

}
