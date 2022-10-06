package com.ssafy.gganbu.Service;

import com.ssafy.gganbu.db.document.MatchBans;
import com.ssafy.gganbu.db.document.NoRelationCommon;
import com.ssafy.gganbu.db.document.SingleRelationEnemy;
import com.ssafy.gganbu.db.document.SingleRelationTeam;
import com.ssafy.gganbu.model.dbDto.NoRelationData;
import com.ssafy.gganbu.model.request.ChampionPickReq;
import com.ssafy.gganbu.model.request.RecommendReq;
import com.ssafy.gganbu.model.response.ChampionScore;
import com.ssafy.gganbu.model.response.ChartRes;
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

    @Autowired
    MatchBansService matchBansService;

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

    @Override
    public ChartRes getChampionChart(String roughTier, String championId) {
        ChartRes chartRes = new ChartRes();
        try {

            List<NoRelationCommon> noRelationCommons = noRelationCommonService.getNoRelationCommonAllLane(roughTier, championId);
            long totalDmg = 0;
            long totalGameDuration = 0;
            long totalKills = 0;
            long totalAssists = 0;
            long totalDeaths = 0;
            long totalCCingTime = 0;
            double winRate = getChampionWinRateALlLane(roughTier, championId);
            double pickRate = getChampionPickRateAllLane(roughTier, championId);
            double banRate = getChampionBanRateAllLane(roughTier, championId);

            if(winRate < 0 || pickRate < 0 || banRate < 0){
                throw new Exception("something wrong with rate");
            }

            for (NoRelationCommon nrc : noRelationCommons) {
                NoRelationData data = nrc.getData();
                totalDmg += data.getPhysicalDamageDealtToChampions() + data.getMagicDamageDealtToChampions()
                        + data.getTrueDamageDealtToChampions();
                totalGameDuration += data.getGameDuration();
                totalKills += data.getKills();
                totalAssists += data.getAssists();
                totalDeaths += data.getDeaths();
                totalCCingTime += data.getTimeCCingOthers();
            }

            chartRes.setChampionId(championId);
            chartRes.setDpm((totalDmg * 60) / totalGameDuration);

            if(totalDeaths == 0 ){
                totalDeaths = 1;
            }
            chartRes.setKda((totalKills + totalAssists) / totalDeaths);
            chartRes.setTimeCCingOthers(totalCCingTime);
            chartRes.setWinRate(winRate);
            chartRes.setPickRate(pickRate);
            chartRes.setBanRate(banRate);

        } catch (Exception e){
            e.printStackTrace();
            return null;
        }

        return chartRes;
    }

    @Override
    public double getChampionWinRateALlLane(String roughTier, String championId) {
        try{
            long winNum = 0;
            long totalNum = 0;
            List<NoRelationCommon> noRelationCommons = noRelationCommonService.getNoRelationCommonAllLane(roughTier, championId);

            for(NoRelationCommon nrc : noRelationCommons){
                totalNum += nrc.getData().getMatchNum();
                winNum += nrc.getData().getWin();
            }
            return (double) winNum / (double) totalNum;
        } catch(Exception e){
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public double getChampionPickRateAllLane(String roughTier, String championId) {
        try{
            long totalNum = getWholeMatchNum(roughTier);
            List<NoRelationCommon> noRelationCommons = noRelationCommonService.getNoRelationCommonAllLane(roughTier, championId);
            long championMatchNum = 0;
            for(NoRelationCommon nrc : noRelationCommons){
                championMatchNum += nrc.getData().getMatchNum();
            }

            return  (double) championMatchNum /  (double) totalNum;
        } catch(Exception e){
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public double getChampionBanRateAllLane(String roughTier, String championId) {
        try{
            long totalNum = getWholeMatchNum(roughTier);
            MatchBans matchBans = matchBansService.getMatchBansByRoughTier(roughTier);
            long banNum = -1;

            if(!matchBans.getData().containsKey(Integer.parseInt(championId))){
                banNum = 0;
            }
            else {
                banNum = matchBans.getData().get(Integer.parseInt(championId));
            }


            return  (double) banNum /  (double) totalNum;
        } catch(Exception e){
            e.printStackTrace();
            return -1;
        }
    }

}
