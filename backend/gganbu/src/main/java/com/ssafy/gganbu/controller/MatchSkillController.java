package com.ssafy.gganbu.controller;

import com.ssafy.gganbu.Service.MatchSkillService;
import com.ssafy.gganbu.model.MatchSkill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/matchSkill")
public class MatchSkillController {
    @Autowired
    MatchSkillService matchSkillService;

    @GetMapping("/getall")
    public ResponseEntity<?> getAllMatchSkills() {
        List<MatchSkill> matchSkillList = matchSkillService.getAllMatchSkill();

        if (matchSkillList == null) {
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(matchSkillList);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerMatchSkill(@RequestBody MatchSkill matchSkill) {
        try {
            matchSkillService.createMatchSkill(matchSkill);
            return new ResponseEntity<MatchSkill>(matchSkill, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
