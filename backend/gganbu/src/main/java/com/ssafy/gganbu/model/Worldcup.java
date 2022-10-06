package com.ssafy.gganbu.model;

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
@Document("worldcupdatas")
public class Worldcup {
    @Id
    private String id;

    private String englishname;

    private String name;

    private String title;

    private String blurb;

    private String difficulty;

    private int wincount;

    private int losecount;

    private int goldmedalcount;

    public double getWinRate() {
        if (getWincount() == 0) {
            return 0;
        } else if (getLosecount() + getWincount() == 0) {
            return 0;
        } else if (getLosecount() == 0) {
            return 1;
        }

        return ((double) getWincount() / (double)(getLosecount() + getWincount()));
    }
}

