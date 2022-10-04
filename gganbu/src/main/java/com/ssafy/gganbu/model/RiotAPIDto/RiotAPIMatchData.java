package com.ssafy.gganbu.model.RiotAPIDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RiotAPIMatchData {

    RiotAPIMatchinfo info;
    RiotAPIMeta metadata;
}
