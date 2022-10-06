package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.SingleRelationEnemy;
import com.ssafy.gganbu.db.document.SingleRelationTeam;
import com.ssafy.gganbu.model.response.ChampionScore;

import java.util.List;

public interface SingleRelationEnemyService {
    public SingleRelationEnemy getSingleRelationEnemy(String roughTier, String champion1,
                                                      String position1, String champion2, String position2 );

    //상대 라인 모르는 상태에서.
    public List<SingleRelationEnemy> getSingleRelationEnemyAllLaneEnemy(String roughTier, String champion1,
                                                                        String position1, String champion2);
    //특정 라인을 하려고 할때 상대 챔피언과의 상성
    public List<SingleRelationEnemy> getSingleRelationEnemyForRecommend(String roughTier, String position1, String champion2, String position2);
    List<SingleRelationEnemy> getAllEnemy(String roughTier, String champion1);

    List<ChampionScore> getAllEnemyMatchNumScore(String roughTier, String champion1);
}
