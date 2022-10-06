package com.ssafy.gganbu.db.document;

import com.ssafy.gganbu.model.dbDto.RivalData;
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
@Document("single_relation_rival")
public class SingleRelationRival {
    @Id
    private String id;
    private String roughTier;
    private String champion1;
    private String position1;
    private String champion2;

    private RivalData data;
}
