package com.ssafy.gganbu.model.response;

import lombok.Data;

import java.util.List;

@Data
public class ChampEvaluator {
    String championId;
    List<ChampEvaluation> withEnemies;
    List<ChampEvaluation> withTeammates;
    long masteryLevel;
}
