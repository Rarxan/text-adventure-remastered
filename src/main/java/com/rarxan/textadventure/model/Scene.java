package com.rarxan.textadventure.model;

import java.util.List;
import java.util.Map;

public class Scene {

    private final String id;
    private final String type;
    private final Map<String, String> text;
    private final String imagePath;
    private final List<Answer> answers;

    public Scene(String id, String type, Map<String, String> text, String imagePath, List<Answer> answers) {
        this.id = id;
        this.type = type;
        this.text = text;
        this.imagePath = imagePath;
        this.answers = answers;
    }

    public String getId() {
        return id;
    }

    public String getText(String language) {
        return text.get(language);
    }

    public String getImagePath() {
        return imagePath;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public String getType() {
        return type;
    }
}