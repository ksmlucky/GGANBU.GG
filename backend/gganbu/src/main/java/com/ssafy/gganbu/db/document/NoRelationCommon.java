package com.ssafy.gganbu.db.document;

import com.ssafy.gganbu.model.dbDto.NoRelationData;
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
@Document("no_relation_common")
public class NoRelationCommon {
    @Id
    private String id;
    private String roughTier;
    private String champion1;
    private String position1;
    private NoRelationData data;
}
