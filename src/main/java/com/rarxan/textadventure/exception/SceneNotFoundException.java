package com.rarxan.textadventure.exception;

public class SceneNotFoundException extends RuntimeException {

    public SceneNotFoundException(String sceneId) {
        super("Scene not found : " + sceneId);
    }
}
