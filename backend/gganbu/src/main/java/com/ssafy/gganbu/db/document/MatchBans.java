package com.ssafy.gganbu.db.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document("match_bans")
public class MatchBans {
    @Id
    private String id;
    private String roughTier;
    private Map<Integer, Long> data;
}
