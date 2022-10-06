package com.ssafy.gganbu.model.response;

import com.ssafy.gganbu.db.document.SingleRelationRival;
import lombok.Data;

import java.util.List;

@Data
public class RecommendRes {
    String recommnedType; // 승률맨~
//    List<NoRelationCommon> commonDatas; // <-
    List<SingleRelationRival> rivalDatas; // <-
    List<ChampEvaluator> evaluators;
}
