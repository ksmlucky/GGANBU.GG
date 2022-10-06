package com.ssafy.gganbu.model.response;

import lombok.Data;

@Data
public class ChampionScore implements Comparable<ChampionScore>{
    private String championId;
    private double score;

    @Override
    public int compareTo(ChampionScore o) {
        if(this.score < o.score){
            return 1;
        }
        return -1;
    }
}
