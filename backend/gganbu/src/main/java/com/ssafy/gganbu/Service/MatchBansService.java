package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.MatchBans;

import java.util.List;

public interface MatchBansService {
    public MatchBans getMatchBansByRoughTier(String roughTier);
}
