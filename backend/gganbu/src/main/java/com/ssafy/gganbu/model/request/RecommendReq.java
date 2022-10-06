package com.ssafy.gganbu.model.request;

import lombok.Data;

import java.util.List;

@Data
public class RecommendReq {
    List<ChampionPickReq> enemies;
    List<ChampionPickReq> teamMates;
    String roughTier;
    String myPosition;
}
