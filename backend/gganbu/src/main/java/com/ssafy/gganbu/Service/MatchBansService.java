package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.MatchBans;

public interface MatchBansService {
    public MatchBans getMatchBansByRoughTier(String roughTier);
}
