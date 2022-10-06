package com.ssafy.gganbu.model.RiotAPIDto;

import lombok.Data;

@Data
public class RiotAPISummoner {
    private String id;
    private String accountId;
    private String name;
    private String puuid;
    private long profileIconId;
    private long revisionDate;
    private long summonerLevel;
}
