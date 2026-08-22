package com.rarxan.textadventure.model;

import java.util.List;

public class LocalizedScene {

    private final String id;
    private final String type;
    private final String text;
    private final String imagePath;
    private final List<LocalizedAnswer> answers;

    public LocalizedScene(String id,
                          String type,
                          String text,
                          String imagePath,
                          List<LocalizedAnswer> answers) {

        this.id = id;
        this.type = type;
        this.text = text;
        this.imagePath = imagePath;
        this.answers = answers;
    }

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getText() {
        return text;
    }

    public String getImagePath() {
        return imagePath;
    }

    public List<LocalizedAnswer> getAnswers() {
        return answers;
    }
}