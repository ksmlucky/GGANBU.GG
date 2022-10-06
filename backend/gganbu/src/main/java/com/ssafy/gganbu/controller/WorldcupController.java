package com.ssafy.gganbu.controller;


import com.ssafy.gganbu.Service.WorldcupService;
import com.ssafy.gganbu.exception.WorldcupCollectionException;
import com.ssafy.gganbu.model.Worldcup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/worldcup")
public class WorldcupController {

    @Autowired
    private WorldcupService worldcupService;

    @GetMapping("/getall")
    public ResponseEntity<List<Worldcup>> getAllChampions() {
        List<Worldcup> worldcups = worldcupService.getAllChampions();

        return ResponseEntity.status(200).body(worldcups);
    }

    @GetMapping("/worldcup/winrate")
    public ResponseEntity<List<Worldcup>> getSortedByWinRate() {
        List<Worldcup> worldcups = worldcupService.getSortedByWinRateAllChampions();

        return new ResponseEntity<>(worldcups, worldcups.size() > 0 ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/worldcup/goldmedalcount")
    public ResponseEntity<List<Worldcup>> getSortedByGoldmedalRate() {
        List<Worldcup> worldcups = worldcupService.getSortedByGoldmedalAllChampions();

        return new ResponseEntity<>(worldcups, worldcups.size() > 0 ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{englishname}")
    public ResponseEntity<?> getChampionByEnglishname(@PathVariable String englishname) {

        try {
            return new ResponseEntity<>(worldcupService.getChampionByEnglishname(englishname), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/goldmedal")
    public ResponseEntity<?> updateWorldcupInfo(@RequestBody Map<String, Object> requestData) throws WorldcupCollectionException {
        String englishname = "";
        for (String key : requestData.keySet()) {
            if (key.equals("winner")) {
                String winnerName = (String) requestData.get(key);
                englishname = winnerName;
                worldcupService.updateGoldMedalCount(winnerName);
            } else {
                LinkedHashMap<String, Object> championRecordMap = (LinkedHashMap)requestData.get(key);
                for (String participantChamp : championRecordMap.keySet()) {
                    LinkedHashMap<String, Integer> winLoseMap = (LinkedHashMap) championRecordMap.get(participantChamp);
                    for (String winOrLose : winLoseMap.keySet()) {
                        Integer outcome = winLoseMap.get(winOrLose);
                        if (winOrLose.equals("win")) {
                            worldcupService.updateWincount(participantChamp, outcome);
                        } else {
                            if (winLoseMap.get(winOrLose) == 1) {
                                worldcupService.updateLosecount(participantChamp);
                            }
                        }
                    }
                }
            }
        }

        try {
            return new ResponseEntity<>(worldcupService.getChampionByEnglishname(englishname), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
