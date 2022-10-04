package com.ssafy.gganbu.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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

    public Worldcup() {
    }

    public Worldcup(String id, String englishname, String name, String title, String blurb, String difficulty, int wincount, int losecount, int goldmedalcount) {
        this.id = id;
        this.englishname = englishname;
        this.name = name;
        this.title = title;
        this.blurb = blurb;
        this.difficulty = difficulty;
        this.wincount = wincount;
        this.losecount = losecount;
        this.goldmedalcount = goldmedalcount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEnglishname() {
        return englishname;
    }

    public void setEnglishname(String englishname) {
        this.englishname = englishname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBlurb() {
        return blurb;
    }

    public void setBlurb(String blurb) {
        this.blurb = blurb;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public int getWincount() {
        return wincount;
    }

    public void setWincount(int wincount) {
        this.wincount = wincount;
    }

    public int getLosecount() {
        return losecount;
    }

    public void setLosecount(int losecount) {
        this.losecount = losecount;
    }

    public int getGoldmedalcount() {
        return goldmedalcount;
    }

    public void setGoldmedalcount(int goldmedalcount) {
        this.goldmedalcount = goldmedalcount;
    }
}

