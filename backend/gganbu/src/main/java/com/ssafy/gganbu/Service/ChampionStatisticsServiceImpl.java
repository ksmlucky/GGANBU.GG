package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.NoRelationCommon;
import com.ssafy.gganbu.db.document.SingleRelationEnemy;
import com.ssafy.gganbu.db.document.SingleRelationTeam;
import com.ssafy.gganbu.model.request.ChampionPickReq;
import com.ssafy.gganbu.model.request.RecommendReq;
import com.ssafy.gganbu.model.response.ChampionScore;
import com.ssafy.gganbu.model.response.LaneNumRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service @Transactional
public class ChampionStatisticsServiceImpl implements ChampionStatisticsService{

    @Autowired
    NoRelationCommonService noRelationCommonService;
    @Autowired
    SingleRelationEnemyService singleRelationEnemyService;
    @Autowired
    SingleRelationTeamService singleRelationTeamService;

    @Override
    public Long getWholeMatchNum(String roughTier){
        List<NoRelationCommon> allNRC = noRelationCommonService.getAllNoRelationCommon(roughTier);
        long num = 0;
        for(NoRelationCommon nrc : allNRC){
            num += nrc.getData().getMatchNum();
        }
        return num / 10;
    }

    @Override
    public List<ChampionScore> recommendList1(RecommendReq recommendReq){
        List<ChampionPickReq> teamMates = recommendReq.getTeamMates();
        List<ChampionPickReq> enemies = recommendReq.getEnemies();
        String myPosition = recommendReq.getMyPosition();
        String roughTier = recommendReq.getRoughTier();

        Map<String,ChampionScore> scores = new HashMap<>();

        for(ChampionPickReq pick :teamMates){
            List<SingleRelationTeam> teamDatas = singleRelationTeamService.getSingleRelationTeamForRecommend
                    (roughTier,myPosition, pick.getChampionId(), pick.getPosition());

            for(SingleRelationTeam srt : teamDatas){
                ChampionScore championScore = new ChampionScore();
                if(scores.containsKey(srt.getChampion1())){
                    championScore = scores.get(srt.getChampion1());
                }
                double s = ((srt.getData().getWin() * 100) / srt.getData().getMatchNum()) + championScore.getScore();
                championScore.setScore(s);
                championScore.setChampionId(srt.getChampion1());
                scores.put(srt.getChampion1(), championScore);
            }


        }
        for(ChampionPickReq pick : enemies){
            List<SingleRelationEnemy> enemyDatas = singleRelationEnemyService.getSingleRelationEnemyForRecommend(roughTier, myPosition, pick.getChampionId());

            for(SingleRelationEnemy sre : enemyDatas){
                ChampionScore championScore = new ChampionScore();
                if(scores.containsKey(sre.getChampion1())){
                    championScore = scores.get(sre.getChampion1());
                }
                double s = ((sre.getData().getWin() * 100) / sre.getData().getMatchNum()) + championScore.getScore();
                championScore.setScore(s);
                championScore.setChampionId(sre.getChampion1());
                scores.put(sre.getChampion1(), championScore);
            }
        }

        List<ChampionScore> scoreList = new ArrayList<>();
        for(ChampionPickReq pick : teamMates){
            if(scores.containsKey(pick.getChampionId())){
                scores.remove(pick.getChampionId());
            }
        }
        for(ChampionPickReq pick : enemies){
            if(scores.containsKey(pick.getChampionId())){
                scores.remove(pick.getChampionId());
            }
        }
        for(String key : scores.keySet()){


            scoreList.add(scores.get(key));
        }
        Collections.sort(scoreList);
        return scoreList;

    }

    @Override
    public LaneNumRes getMatchNumPerLane(String roughTier, String championId) {
        LaneNumRes laneNumRes = new LaneNumRes();
        List<NoRelationCommon> noRelationCommons = noRelationCommonService.getNoRelationCommonAllLane(roughTier, championId);
        try{
            laneNumRes.setChampionId(championId);
            for(NoRelationCommon nrc : noRelationCommons){
                switch(nrc.getPosition1()){
                    case "TOP":
                        laneNumRes.setMatchNumTOP(nrc.getData().getMatchNum());
                        break;
                    case "JUNGLE":
                        laneNumRes.setMatchNumJUNGLE(nrc.getData().getMatchNum());
                        break;
                    case "MIDDLE":
                        laneNumRes.setMatchNumMIDDLE(nrc.getData().getMatchNum());
                        break;
                    case "BOTTOM":
                        laneNumRes.setMatchNumBOTTOM(nrc.getData().getMatchNum());
                        break;
                    case "UTILITY":
                        laneNumRes.setMatchNumUTILITY(nrc.getData().getMatchNum());
                        break;
                }
            }
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
        return laneNumRes;


    }

}
