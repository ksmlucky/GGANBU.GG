package com.example.champion.exception;

public class WorldcupCollectionException extends Exception {
    private static final long serialVersionUID = 1L;

    public WorldcupCollectionException(String message) {
        super(message);
    }

    public static String NotFoundException(String temp) {
        return "Champion with " + temp + "not found!";
    }

    public static String ChampionAlreadyExists() {
        return "Champion with given name already exists";
    }
}
