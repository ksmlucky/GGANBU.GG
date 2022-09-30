package com.example.champion.controller;

import com.example.champion.Service.WorldcupService;
import com.example.champion.exception.WorldcupCollectionException;
import com.example.champion.model.Worldcup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
public class WorldcupController {

    @Autowired
    private WorldcupService worldcupService;

    @GetMapping("/worldcup")
    public ResponseEntity<List<Worldcup>> getAllChampions() {
        List<Worldcup> worldcups = worldcupService.getAllChampions();

        return new ResponseEntity<>(worldcups, worldcups.size() > 0 ? HttpStatus.OK : HttpStatus.NOT_FOUND);
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

    @GetMapping("/worldcup/{englishname}")
    public ResponseEntity<?> getChampionByEnglishname(@PathVariable String englishname) {
        System.out.println(englishname);

        try {
            return new ResponseEntity<>(worldcupService.getChampionByEnglishname(englishname), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/worldcup/goldmedal")
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
