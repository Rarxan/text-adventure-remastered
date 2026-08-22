package com.rarxan.textadventure.model;

import java.util.Map;

public class Answer {

    private final String key;

    private final Map<String, String> text;

    private final String nextSceneId;

    public Answer(String key,
                  Map<String, String> text,
                  String nextSceneId) {

        this.key = key;
        this.text = text;
        this.nextSceneId = nextSceneId;
    }

    public String getKey() {
        return key;
    }

    public String getText(String language) {
        return text.get(language);
    }

    public String getNextSceneId() {
        return nextSceneId;
    }
}