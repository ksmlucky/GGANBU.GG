package com.ssafy.gganbu.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.gganbu.model.RiotAPIDto.RiotAPIMatchinfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MatchData {

//    public MatchData(JSONObject matchJsonData){
//        JSONObject metadata = (JSONObject) matchJsonData.get("metadata");
//        matchId = (String) metadata.get("matchId");
//
//        JSONObject info = (JSONObject) matchJsonData.get("info");
//        gameDuration = (long) info.get("gameDuration");
//        gameCreation = (long) info.get("gameCreation");
//
//        if(info.containsKey("gameEndTimestamp")){
//            gameEndTimestamp = (long) info.get("gameEndTimestamp");
//        }
//        //없으면 구버젼. 게임 시간이 밀리세컨드로 기록되어있음.
//        else {
//            gameDuration /= 1000;
//        }
//
//
//
//    }

    public MatchData(RiotAPIMatchinfo info){
        super();
        BeanUtils.copyProperties(info, this);
        if(this.gameEndTimestamp == 0L){
            gameDuration /= 1000;
        }
    }

    @Id @Column(name="match_id")
    private String matchId;
    private long gameDuration;
    private String gameMode;
    private long gameCreation;
    private long gameEndTimestamp;
    private String gameType;
    private long queueId;

    @Transient
    List<String> puuids;



}
