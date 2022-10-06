package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.SingleRelationEnemy;
import com.ssafy.gganbu.db.document.SingleRelationRival;

import java.util.List;

public interface SingleRelationRivalService {
    public SingleRelationRival getSingleRelationRival(String roughTier, String champion1,
                                                      String position1, String champion2);

    public List<SingleRelationRival> getSingleRelationRivalForRecommend(String roughTier, String position1, String champion2);

}
