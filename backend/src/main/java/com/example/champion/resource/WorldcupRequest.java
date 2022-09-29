package com.example.champion.resource;

public class WorldcupRequest {
    private String englishname;

    private String name;

    private String title;

    private String blurb;

    private String difficulty;

    private int wincount;

    private int losecount;

    private int goldmedalcount;

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
