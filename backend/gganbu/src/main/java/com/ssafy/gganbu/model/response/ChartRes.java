package com.ssafy.gganbu.model.response;

import lombok.Data;

@Data
public class ChartRes {
    private String championId;
    private double winRate;
    private double pickRate;
    private double banRate;
    private long dpm;
    private double kda;
    private long timeCCingOthers;
}
