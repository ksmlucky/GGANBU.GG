package com.ssafy.gganbu.model.dbDto;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class RivalData {
    private RivalInnerData me;
    private RivalInnerData rival;
}
