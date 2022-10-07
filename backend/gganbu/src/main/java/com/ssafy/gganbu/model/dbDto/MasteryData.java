package com.ssafy.gganbu.model.dbDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.gganbu.model.response.ChampionScore;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MasteryData implements Comparable<MasteryData> {
    long championId;
    long championLevel;
    long championPoints;

    @Override
    public int compareTo(MasteryData o) {
        if (this.championPoints < o.getChampionPoints()){
            return 1;
        }
        return -1;
    }
}
