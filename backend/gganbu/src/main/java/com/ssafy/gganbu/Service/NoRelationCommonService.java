package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.NoRelationCommon;

import java.util.List;

public interface NoRelationCommonService {
    public NoRelationCommon getNoRelationCommonByLane(String roughTier, String championId, String position);
    public List<NoRelationCommon> getNoRelationCommonAllLane(String roughTier, String championId );
    public List<NoRelationCommon> getAllNoRelationCommon(String roughTier);
}
