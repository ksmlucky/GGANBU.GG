package com.ssafy.gganbu.model.RiotAPIDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RiotAPIMeta {
    List<String> participants;
}
