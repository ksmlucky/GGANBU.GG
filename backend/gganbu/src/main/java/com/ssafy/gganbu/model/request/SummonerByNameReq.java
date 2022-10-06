package com.ssafy.gganbu.model.request;

import lombok.Data;

@Data
public class SummonerByNameReq {
    String summonerName;
    boolean refresh;
}
