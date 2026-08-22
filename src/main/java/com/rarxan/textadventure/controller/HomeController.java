package com.rarxan.textadventure.controller;

import com.rarxan.textadventure.model.LocalizedScene;
import com.rarxan.textadventure.service.SceneService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    private final SceneService sceneService;

    public HomeController(SceneService sceneService) {
        this.sceneService = sceneService;
    }

    @GetMapping("/api/scenes/{sceneId}")
    public LocalizedScene getScene(
            @PathVariable String sceneId,
            @RequestParam(defaultValue = "en") String lang) {

        return sceneService.getSceneById(sceneId, lang);
    }
}