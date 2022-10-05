package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.SingleRelationTeam;

import java.util.List;

public interface SingleRelationTeamService {
    public SingleRelationTeam getSingleRelationTeam(String roughTier, String champion1,
                                                      String position1, String champion2, String position2 );

    //팀원 라인을 모르는 상태 (적군 팀끼리의 상성 계산에 사용할? )
    public List<SingleRelationTeam> getSingleRelationTeamAllLaneTeam(String roughTier, String champion1, String champion2);

    //추천용
    public List<SingleRelationTeam> getSingleRelationTeamForRecommend(String roughTier, String position1, String champion2, String position2);
}
