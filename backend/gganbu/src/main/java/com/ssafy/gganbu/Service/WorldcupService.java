package com.ssafy.gganbu.Service;


import com.ssafy.gganbu.exception.WorldcupCollectionException;
import com.ssafy.gganbu.model.Worldcup;


import java.util.List;

public interface WorldcupService {
    public List<Worldcup> getAllChampions();
    public Worldcup getChampionByEnglishname(String englishname) throws WorldcupCollectionException;

    public void updateWincount(String englishname, int wincount) throws WorldcupCollectionException;

    public void updateLosecount(String englishname) throws WorldcupCollectionException;

    public void updateGoldMedalCount(String englishname) throws WorldcupCollectionException;

    public List<Worldcup> getSortedByWinRateAllChampions();

    public List<Worldcup> getSortedByGoldmedalAllChampions();
}

