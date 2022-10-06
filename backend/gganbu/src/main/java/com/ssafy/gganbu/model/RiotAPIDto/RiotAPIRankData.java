package com.ssafy.gganbu.model.RiotAPIDto;

import lombok.Data;

@Data
public class RiotAPIRankData {
    private String leagueId;
    private String queueType;
    private String tier; //ex "DIAMOND"
    private String rank; //ex "I"
    private String summonerId;
    private String summonerName;
    private long leaguePoints;
    private long wins;
    private long losses;
    private boolean veteran;
    private boolean inactive;
    private boolean freshBlood;
    private boolean hotStreak;
}
