package com.ssafy.gganbu.model.request;

import lombok.Data;

@Data
public class ChampionBansReq {
    private String roughTier;
    private String championId;
    private String position;
}
