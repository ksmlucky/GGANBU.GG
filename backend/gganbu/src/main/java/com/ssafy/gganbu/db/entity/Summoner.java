package com.ssafy.gganbu.db.entity;

import com.fasterxml.jackson.databind.util.BeanUtil;
import com.ssafy.gganbu.model.RiotAPIDto.RiotAPISummoner;
import com.ssafy.gganbu.model.RiotAPIDto.RiotAPIRankData;
import lombok.*;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;

import javax.persistence.*;

@Entity(name="summoner")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Summoner {

    public Summoner(RiotAPISummoner rSummoner, RiotAPIRankData rRankData){
        super();
        setFromRiotAPISummoner(rSummoner);
        setFromRiotAPIRankData(rRankData);
    }

    @Id @GeneratedValue @Column(name="id")// gganbu.gg의 오리지널 아이디. 실제 소환사 아이디는 아님.
    private long id;
    private String name;
    private long profileIconId;
    private long revisionData;
    private long summonerLevel;

    private String tier; //ex "DIAMOND"
    private String rank; //ex "I"
    private long leaguePoints;
    private long rankWins;
    private long rankLosses;

    @Transient
    private String puuid;

    public void setFromRiotAPISummoner(RiotAPISummoner rSummoner){
//        this.name = rSummoner.getName();
//        this.profileIconId = rSummoner.getProfileIconId();
//        this.revisionData = rSummoner.getRevisionDate();
//        this.summonerLevel = rSummoner.getSummonerLevel();
        BeanUtils.copyProperties(rSummoner, this);
    }

    public void setFromRiotAPIRankData(RiotAPIRankData rRankData){
        if(rRankData == null){
           return;
        }
//        this.tier = rRankData.getTier();
//        this.rank = rRankData.getRank();
//        this.leaguePoints = rRankData.getLeaguePoints();
//        this.rankWins = rRankData.getWins();
//        this.rankLosses = rRankData.getLosses();
        BeanUtils.copyProperties(rRankData, this);
    }


}
