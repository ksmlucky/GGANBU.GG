package com.ssafy.gganbu.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity(name="summoner_match")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SummonerMatch {
    @Id @GeneratedValue
    private long smId;

    @ManyToOne
    @JoinColumn(name="id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Summoner summoner;

    @ManyToOne
    @JoinColumn(name="match_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private MatchData matchData;

    private long participantId;


}
