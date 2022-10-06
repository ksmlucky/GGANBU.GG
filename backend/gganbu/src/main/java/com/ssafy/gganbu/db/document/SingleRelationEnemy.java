package com.ssafy.gganbu.db.document;

import com.ssafy.gganbu.model.dbDto.SingleRelationData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document("single_relation_enemy")
public class SingleRelationEnemy {
    @Id
    private String id;
    private String roughTier;
    private String champion1;
    private String position1;
    private String champion2;
    private String position2;
    private SingleRelationData data;
}
