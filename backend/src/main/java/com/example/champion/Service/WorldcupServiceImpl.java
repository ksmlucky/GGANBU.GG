package com.example.champion.Service;

import com.example.champion.exception.WorldcupCollectionException;
import com.example.champion.model.Worldcup;
import com.example.champion.repository.WorldcupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public String changeEnglishname(String englishname) {
        englishname = englishname.trim();
        englishname = englishname.substring(0, 1).toUpperCase() + englishname.substring(1, englishname.length()).toLowerCase();

        return englishname;
    }

    @Override
    public Worldcup getChampionByEnglishname(String englishname) throws WorldcupCollectionException {
//        englishname = changeEnglishname(englishname);

        Optional<Worldcup> optionalChampion = worldcupRepository.findByEnglishname(englishname);
        if (!optionalChampion.isPresent()) {
            throw new WorldcupCollectionException(WorldcupCollectionException.NotFoundException(englishname));
        } else {
            return optionalChampion.get();
        }
    }

    @Override
    public void updateWincount(String englishname, int wincount) throws WorldcupCollectionException {
//        englishname = changeEnglishname(englishname);
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
//        englishname = changeEnglishname(englishname);
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
        //englishname = changeEnglishname(englishname);
        Optional<Worldcup> championOptional = worldcupRepository.findByEnglishname(englishname);

        if (championOptional.isPresent()) {
            Worldcup worldcupToUpdate = championOptional.get();

            worldcupToUpdate.setGoldmedalcount(worldcupToUpdate.getGoldmedalcount() + 1);
            worldcupRepository.save(worldcupToUpdate);
        } else {
            throw new WorldcupCollectionException(WorldcupCollectionException.NotFoundException(englishname));
        }
    }
}
