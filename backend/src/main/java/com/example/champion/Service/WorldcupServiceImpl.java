package com.example.champion.Service;

import com.example.champion.exception.WorldcupCollectionException;
import com.example.champion.model.Worldcup;
import com.example.champion.repository.WorldcupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WorldcupServiceImpl implements WorldcupService {

    @Autowired
    private WorldcupRepository worldcupRepository;

    @Override
    public List<Worldcup> getAllChampions() {
        List<Worldcup> worldcups = worldcupRepository.findAll();

        if (worldcups.size() > 0) {
            return worldcups;
        } else {
            return new ArrayList<Worldcup>();
        }
    }

    @Override
    public Worldcup getChampionByEnglishname(String englishname) throws WorldcupCollectionException {

        Optional<Worldcup> optionalChampion = worldcupRepository.findByEnglishname(englishname);
        if (!optionalChampion.isPresent()) {
            throw new WorldcupCollectionException(WorldcupCollectionException.NotFoundException(englishname));
        } else {
            return optionalChampion.get();
        }
    }

    @Override
    public void updateWincount(String englishname, int wincount) throws WorldcupCollectionException {

        Optional<Worldcup> championOptional = worldcupRepository.findByEnglishname(englishname);

        if (championOptional.isPresent()) {
            Worldcup worldcupToUpdate = championOptional.get();

            worldcupToUpdate.setWincount(worldcupToUpdate.getWincount() + wincount);
            worldcupRepository.save(worldcupToUpdate);
        } else {
            throw new WorldcupCollectionException(WorldcupCollectionException.NotFoundException(englishname));
        }
    }

    @Override
    public void updateLosecount(String englishname) throws WorldcupCollectionException {

        Optional<Worldcup> championOptional = worldcupRepository.findByEnglishname(englishname);

        if (championOptional.isPresent()) {
            Worldcup worldcupToUpdate = championOptional.get();

            worldcupToUpdate.setLosecount(worldcupToUpdate.getLosecount() + 1);
            worldcupRepository.save(worldcupToUpdate);
        } else {
            throw new WorldcupCollectionException(WorldcupCollectionException.NotFoundException(englishname));
        }
    }

    @Override
    public void updateGoldMedalCount(String englishname) throws WorldcupCollectionException {

        Optional<Worldcup> championOptional = worldcupRepository.findByEnglishname(englishname);

        if (championOptional.isPresent()) {
            Worldcup worldcupToUpdate = championOptional.get();

            worldcupToUpdate.setGoldmedalcount(worldcupToUpdate.getGoldmedalcount() + 1);
            worldcupRepository.save(worldcupToUpdate);
        } else {
            throw new WorldcupCollectionException(WorldcupCollectionException.NotFoundException(englishname));
        }
    }

    @Override
    public List<Worldcup> getSortedByWinRateAllChampions() {
        List<Worldcup> worldcups = worldcupRepository.findAll();

        if (worldcups.size() > 0) {
            Collections.sort(worldcups, new ChampionWinRateComparator());
            return worldcups;
        } else {
            return new ArrayList<Worldcup>();
        }
    }

    class ChampionWinRateComparator implements Comparator<Worldcup> {
        @Override
        public int compare(Worldcup o1, Worldcup o2) {
            double winRate1 = o1.getWinRate();
            double winRate2 = o2.getWinRate();

            int temp = Double.compare(winRate2, winRate1);

            return temp;
        }
    }

    @Override
    public List<Worldcup> getSortedByGoldmedalAllChampions() {
        List<Worldcup> worldcups = worldcupRepository.findAll();

        if (worldcups.size() > 0) {
            Collections.sort(worldcups, new ChampionGoldmedalComparator());
            return worldcups;
        } else {
            return new ArrayList<Worldcup>();
        }
    }

    class ChampionGoldmedalComparator implements Comparator<Worldcup> {
        @Override
        public int compare(Worldcup o1, Worldcup o2) {
            int goldmedal1 = o1.getGoldmedalcount();
            int goldmedal2 = o2.getGoldmedalcount();

            int temp = goldmedal2 - goldmedal1;

            return temp;
        }
    }
}
