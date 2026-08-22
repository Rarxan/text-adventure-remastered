package com.rarxan.textadventure.repository;

import com.rarxan.textadventure.exception.SceneNotFoundException;
import com.rarxan.textadventure.model.Scene;
import com.rarxan.textadventure.model.Scenes;
import org.springframework.stereotype.Repository;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;

@Repository
public class SceneRepository {

    private final ObjectMapper objectMapper;

    public SceneRepository(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public Scene findById(String sceneId) {

        String path = "story/scenes.json";

        try (InputStream inputStream =
                     getClass()
                             .getClassLoader()
                             .getResourceAsStream(path)) {

            if (inputStream == null) {
                throw new SceneNotFoundException(sceneId);
            }

            Scenes scenes =
                    objectMapper.readValue(
                            inputStream,
                            Scenes.class
                    );

            return scenes.getScenes()
                    .stream()
                    .filter(scene ->
                            scene.getId().equals(sceneId))
                    .findFirst()
                    .orElseThrow(() ->
                            new SceneNotFoundException(sceneId));

        } catch (IOException e) {

            throw new IllegalArgumentException(
                    "Failed to read scene: " + sceneId,
                    e
            );
        }
    }
}