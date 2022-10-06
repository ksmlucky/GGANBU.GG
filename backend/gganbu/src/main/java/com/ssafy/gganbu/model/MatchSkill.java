package com.ssafy.gganbu.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document("matchskills")
public class MatchSkill {
    @NotNull(message = "name cannot be null")
    private String name;

    private Long score;
}
