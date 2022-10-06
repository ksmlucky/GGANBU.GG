package com.ssafy.gganbu.model.response;

import lombok.Data;

@Data
public class LaneNumRes {
    String championId;
    long matchNumTOP;
    long matchNumJUNGLE;
    long matchNumMIDDLE;
    long matchNumBOTTOM;
    long matchNumUTILITY;
}
