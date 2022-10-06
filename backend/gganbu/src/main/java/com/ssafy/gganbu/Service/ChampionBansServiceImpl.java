package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.ChampionBans;
import com.ssafy.gganbu.db.repository.ChampionBansRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ChampionBansServiceImpl implements ChampionBansService{
    @Autowired
    ChampionBansRepository championBansRepository;

    @Override
    public List<ChampionBans> getChampionBansAllLane(String roughTier, String championId) {

        List<ChampionBans> championBansList = null;
        try {
            championBansList= championBansRepository
                    .findChampionBansByRoughTierAndChampion1(roughTier, championId);
        }catch (Exception e){
            e.printStackTrace();
        }

        return championBansList;
    }

    @Override
    public ChampionBans getChampionBansByLane(String roughTier, String championId, String position) {

        ChampionBans championBans = null;
        try {
            Optional<ChampionBans> championBansOptional = championBansRepository
                    .findChampionBansByRoughTierAndChampion1AndPosition1(roughTier, championId, position);
            if (championBansOptional.isPresent()) {
                championBans = championBansOptional.get();
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        return championBans;
    }
}
