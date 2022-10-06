package com.ssafy.gganbu.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.gganbu.model.RiotAPIDto.RiotAPIParticipant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(
        name="participant",
        uniqueConstraints={
                @UniqueConstraint(
                        name= "unique_idx_and_match_id",
                        columnNames={"participant_id", "match_id"}
                )
        }
)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Participant {

    public Participant(RiotAPIParticipant riotAPIParticipant){
        super();
        BeanUtils.copyProperties(riotAPIParticipant, this);
    }

    @Id @GeneratedValue
    private long pId;

    // participant index
    @Column(name="participant_id")
    private long participantId;

//    private String summonerName;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="match_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private MatchData matchData;

    private long championId;
    private String championName;

    private long kills;
    private long assists;
    private long deaths;

    private long physicalDamageDealtToChampions;
    private long trueDamageDealtToChampions;
    private long magicDamageDealtToChampions;
    private long totalDamageTaken;

    private long champLevel;
    private long totalMinionsKilled;
    private long timeCCingOthers;
    private long goldEarned;

    private String teamPosition;
    private long teamId;

    private long item0;
    private long item1;
    private long item2;
    private long item3;
    private long item4;
    private long item5;
    private long item6;

    private long summoner1Id;
    private long summoner2Id;

    private boolean win;




}
