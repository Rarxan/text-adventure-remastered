package com.rarxan.textadventure.model;

public class LocalizedAnswer {

    private final String key;
    private final String text;
    private final String nextSceneId;

    public LocalizedAnswer(String key, String text, String nextSceneId) {
        this.key = key;
        this.text = text;
        this.nextSceneId = nextSceneId;
    }

    public String getKey() {
        return key;
    }

    public String getText() {
        return text;
    }

    public String getNextSceneId() {
        return nextSceneId;
    }
}