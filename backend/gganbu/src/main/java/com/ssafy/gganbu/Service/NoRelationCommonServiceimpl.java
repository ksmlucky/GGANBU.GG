package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.NoRelationCommon;
import com.ssafy.gganbu.db.repository.NoRelationCommonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service @Transactional
public class NoRelationCommonServiceimpl implements NoRelationCommonService
{
    @Autowired
    NoRelationCommonRepository noRelationCommonRepository;

    @Override
    public NoRelationCommon getNoRelationCommonByLane(String roughTier, String championId, String position) {
        NoRelationCommon noRelationCommon = null;
        try{
            Optional<NoRelationCommon> noRelationCommonOptional = noRelationCommonRepository.
                    findNoRelationCommonByRoughTierAndChampion1AndPosition1(roughTier, championId, position);
            if(noRelationCommonOptional.isPresent()){
                noRelationCommon = noRelationCommonOptional.get();
            }
        } catch(Exception e){
            e.printStackTrace();
        }

        return noRelationCommon;
    }

    @Override
    public List<NoRelationCommon> getNoRelationCommonAllLane(String roughTier, String championId) {
        List<NoRelationCommon> noRelationCommonList = null;
        try{
            noRelationCommonList = noRelationCommonRepository.
                    findNoRelationCommonByRoughTierAndChampion1(roughTier, championId);

        } catch(Exception e){
            e.printStackTrace();
        }
        return noRelationCommonList;
    }

    @Override
    public List<NoRelationCommon> getAllNoRelationCommon(String roughTier) {
        List<NoRelationCommon> allData = null;
        try {
            allData = noRelationCommonRepository.findNoRelationCommonsByRoughTier(roughTier);
        }catch(Exception e){
                e.printStackTrace();
            }
        return allData;
    }

    @Override
    public List<NoRelationCommon> getAllNoRelationCommonByLane(String roughTier, String position) {
        List<NoRelationCommon> laneData = null;
        try {
            laneData = noRelationCommonRepository.findNoRelationCommonsByRoughTierAndPosition1(roughTier, position);
        }catch(Exception e){
            e.printStackTrace();
        }
        return laneData;
    }
}
