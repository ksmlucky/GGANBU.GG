package com.ssafy.gganbu.model.dbDto;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class RivalInnerData {

    private long matchNum;
    private long assists15min;
    private long goldEarned15min;
    private long teamChampionKills;
    private long teamDragonKills15min;
    private long win;
    private long gameDuration;
    private long champLevel;
    private long damageDealtToBuildings;
    private long deaths;
    private long goldEarned;
    private long kills15min;
    private long magicDamageDealtToChampions15min;
    private long magicDamageDealtToChampions;
    private long teamDragonKills;
    private long timeCCingOthers;
    private long trueDamageDealtToChampions;
    private long champExperience15min;
    private long champLevel15min;
    private long deaths15min;
    private long physicalDamageDealtToChampions15min;
    private long teamRiftHeraldKills15min;
    private long assists;
    private long physicalDamageDealtToChampions;
    private long teamBaronKills;
    private long teamChampionKills15min;
    private long teamRiftHeraldKills;
    private long totalMinionsKilled;
    private long totalMinionsKilled15min;
    private long champExperience;
    private long teamBaronKills15min;
    private long trueDamageDealtToChampions15min;
    private long kills;

}
