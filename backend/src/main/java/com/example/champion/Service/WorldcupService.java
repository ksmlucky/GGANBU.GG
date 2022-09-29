package com.example.champion.Service;

import com.example.champion.exception.WorldcupCollectionException;
import com.example.champion.model.Worldcup;

import java.util.List;

public interface WorldcupService {
    public List<Worldcup> getAllChampions();
    public Worldcup getChampionByEnglishname(String englishname) throws WorldcupCollectionException;

    public void updateWincount(String englishname, int wincount) throws WorldcupCollectionException;

    public void updateLosecount(String englishname) throws WorldcupCollectionException;

    public void updateGoldMedalCount(String englishname) throws WorldcupCollectionException;
}
