package com.ssafy.gganbu.model.request;

import lombok.Data;

@Data
public class TierChampPosReq {
    private String roughTier;
    private String championId;
    private String position;
}
