package com.ssafy.gganbu.controller;

import com.ssafy.gganbu.Service.NoRelationCommonService;
import com.ssafy.gganbu.db.document.NoRelationCommon;
import com.ssafy.gganbu.model.request.TierChampPosReq;
import com.ssafy.gganbu.model.request.TierChampReq;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value ="챔피언 공통정보 API", tags = {"Common"})
@RestController
@RequestMapping("/api/v1/noRelationCommon")
public class NoRelationCommonController {
    @Autowired
    NoRelationCommonService noRelationCommonService;

    @PostMapping("/championCommon")
    public ResponseEntity<List<NoRelationCommon>> getChampionCommon(@RequestBody TierChampReq tierChampReq){
        List<NoRelationCommon> noRelationCommons = noRelationCommonService.getNoRelationCommonAllLane(tierChampReq.getRoughTier(), tierChampReq.getChampionId());
        if(noRelationCommons == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(noRelationCommons);
    }

    @PostMapping("/championCommonLane")
    public ResponseEntity<NoRelationCommon> getChampionCommonByLane(@RequestBody TierChampPosReq tierChampPosReq){
        NoRelationCommon noRelationCommon = noRelationCommonService.getNoRelationCommonByLane(tierChampPosReq.getRoughTier(), tierChampPosReq.getChampionId(), tierChampPosReq.getPosition());
        if(noRelationCommon == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(noRelationCommon);
    }
}
