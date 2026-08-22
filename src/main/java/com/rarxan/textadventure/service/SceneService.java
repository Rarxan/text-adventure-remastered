package com.rarxan.textadventure.service;

import com.rarxan.textadventure.model.Answer;
import com.rarxan.textadventure.model.LocalizedAnswer;
import com.rarxan.textadventure.model.LocalizedScene;
import com.rarxan.textadventure.model.Scene;
import com.rarxan.textadventure.repository.SceneRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SceneService {

    private final SceneRepository sceneRepository;

    public SceneService(SceneRepository sceneRepository) {
        this.sceneRepository = sceneRepository;
    }

    public LocalizedScene getSceneById(String sceneId, String language) {

        Scene scene = sceneRepository.findById(sceneId);

        List<LocalizedAnswer> localizedAnswers =
                scene.getAnswers()
                        .stream()
                        .map(answer ->
                                new LocalizedAnswer(
                                        answer.getKey(),
                                        answer.getText(language),
                                        answer.getNextSceneId()
                                )
                        )
                        .toList();

        return new LocalizedScene(
                scene.getId(),
                scene.getType(),
                scene.getText(language),
                scene.getImagePath(),
                localizedAnswers
        );
    }
}