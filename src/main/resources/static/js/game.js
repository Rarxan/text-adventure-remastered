// ======================================================================
// 01. DOM REFERENCES
// ======================================================================

const popup =
    document.getElementById("popup");

const game =
    document.getElementById("game");

const gamePanel =
    document.getElementById("game-panel");

const sceneTitle =
    document.getElementById("scene-title");

const sceneTextContent =
    document.getElementById("scene-text-content");

const currentImage =
    document.getElementById("scene-image");

const nextImage =
    document.getElementById("scene-image-next");

const welcomeControls =
    document.getElementById("welcome-controls");

const startGameControl =
    document.getElementById("start-game-control");

const startGameButton =
    document.getElementById("start-game-button");

const playerNameInput =
    document.getElementById("player-name");

const questionControls =
    document.getElementById("question-controls");

const questionOptions =
    document.getElementById("question-options");

const answerInput =
    document.getElementById("answer-input");

const submitButton =
    document.getElementById("submit-answer-button");

const answersContainer =
    document.getElementById("answers");

const languageSwitch =
    document.getElementById("language-switch");

const languageEnButton =
    document.getElementById("language-en");

const languageRuButton =
    document.getElementById("language-ru");

const backgroundMusic =
    document.getElementById("background-music");

const startMusicButton =
    document.getElementById("start-music-button");

const stopMusicButton =
    document.getElementById("stop-music-button");

const victoryIntro =
    document.getElementById("victory-intro");

const victoryVideo =
    document.getElementById("victory-intro-video");

const victoryAudio =
    document.getElementById("victory-audio");

const preWelcome =
    document.getElementById("pre-welcome");

const preWelcomeEnterButton =
    document.getElementById("pre-welcome-enter-button");

const preWelcomeVideo =
    document.getElementById("pre-welcome-video");


// ======================================================================
// 02. APPLICATION STATE
// ======================================================================

let currentLanguage =
    localStorage.getItem("language") || "en";

const musicOn =
    localStorage.getItem("musicOn");


// ======================================================================
// 03. INTERFACE TRANSLATIONS
// ======================================================================

const interfaceTranslations = {

    en: {

        answerPlaceholder:
            "Your answer...",

        gameOver:
            "Game Over",

        victory:
            "Victory",

        emptyName:
            "Please enter your name.",

        choose:
            "Please choose:",

        or:
            "or",

        error:
            "Something went wrong while loading the scene."
    },


    ru: {

        answerPlaceholder:
            "Ваш ответ...",

        gameOver:
            "Вы погибли",

        victory:
            "Победа",

        emptyName:
            "Пожалуйста, введите ваше имя.",

        choose:
            "Выберите:",

        or:
            "или",

        error:
            "Произошла ошибка при загрузке сцены."
    }
};


// ======================================================================
// 04. UI HELPERS
// ======================================================================

function showPopup(text) {

    popup.textContent = text;

    popup.classList.add("show");


    setTimeout(() => {

        popup.classList.remove("show");

    }, 4000);
}


function requestFullscreen() {

    if (document.fullscreenElement) {
        return;
    }


    document.documentElement
        .requestFullscreen()
        .catch(() => {

            console.log(
                "Fullscreen request was rejected."
            );

        });
}


// ======================================================================
// 05. MUSIC SYSTEM
// ======================================================================

backgroundMusic.volume = 0.6;


function restoreMusic() {

    const savedTime =
        parseFloat(
            localStorage.getItem("musicTime") || "0"
        );


    if (!isNaN(savedTime)) {

        backgroundMusic.currentTime =
            savedTime;
    }


    backgroundMusic
        .play()
        .catch(() => {

            console.log(
                "Autoplay blocked by browser."
            );

        });
}


function saveMusicTime() {

    if (backgroundMusic.paused) {
        return;
    }


    localStorage.setItem(
        "musicTime",
        backgroundMusic.currentTime
    );
}


function initializeMusic() {

    if (musicOn !== "true") {
        return;
    }


    if (backgroundMusic.readyState >= 1) {

        restoreMusic();

        return;
    }


    backgroundMusic.addEventListener(
        "loadedmetadata",
        restoreMusic,
        {once: true}
    );
}


startMusicButton.onclick = () => {

    localStorage.setItem(
        "musicOn",
        "true"
    );

    backgroundMusic.play();
};


stopMusicButton.onclick = () => {

    localStorage.setItem(
        "musicOn",
        "false"
    );

    backgroundMusic.pause();
};


setInterval(
    saveMusicTime,
    500
);


window.addEventListener(
    "beforeunload",
    saveMusicTime
);


// ======================================================================
// 06. LANGUAGE SYSTEM
// ======================================================================

function applyInterfaceLanguage() {

    const text =
        interfaceTranslations[currentLanguage];


    document.documentElement.lang =
        currentLanguage;


    languageEnButton.setAttribute(
        "aria-pressed",
        currentLanguage === "en"
            ? "true"
            : "false"
    );


    languageRuButton.setAttribute(
        "aria-pressed",
        currentLanguage === "ru"
            ? "true"
            : "false"
    );


    answerInput.placeholder =
        text.answerPlaceholder;


    submitButton.setAttribute(
        "aria-label",
        text.answerPlaceholder
    );
}


function switchLanguage(language) {

    if (language === currentLanguage) {
        return;
    }


    currentLanguage =
        language;


    localStorage.setItem(
        "language",
        currentLanguage
    );


    applyInterfaceLanguage();
}


function updateLanguageSwitchVisibility(
    sceneType
) {

    languageSwitch.style.display =
        sceneType === "welcome"
            ? "flex"
            : "none";
}


languageEnButton.onclick = () => {

    switchLanguage("en");
};


languageRuButton.onclick = () => {

    switchLanguage("ru");
};


// ======================================================================
// 07. PANEL TRANSITIONS
// ======================================================================

function getCurrentPanelType() {

    if (
        gamePanel.classList.contains(
            "welcome-panel"
        )
    ) {

        return "welcome";
    }


    if (
        gamePanel.classList.contains(
            "question-panel"
        )
    ) {

        return "question";
    }


    if (
        gamePanel.classList.contains(
            "gameover-panel"
        )
    ) {

        return "gameover";
    }


    if (
        gamePanel.classList.contains(
            "victory-panel"
        )
    ) {

        return "victory";
    }


    return null;
}


function changePanelType(
    newType,
    callback
) {

    const currentType =
        getCurrentPanelType();

    if (
        currentType === "question" &&
        newType === "question"
    ) {

        sceneTextContent.classList.remove(
            "text-smoke-in"
        );

        sceneTextContent.classList.add(
            "text-smoke-out"
        );


        gamePanel.classList.add(
            "question-changing"
        );


        setTimeout(() => {

            callback();


            sceneTextContent.classList.remove(
                "text-smoke-out"
            );

            sceneTextContent.classList.remove(
                "text-smoke-in"
            );


            void sceneTextContent.offsetWidth;


            sceneTextContent.classList.add(
                "text-smoke-in"
            );


            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    gamePanel.classList.remove(
                        "question-changing"
                    );

                });

            });


            setTimeout(() => {

                sceneTextContent.classList.remove(
                    "text-smoke-in"
                );

            }, 1000);


        }, 1200);


        return;
    }

    if (
        currentType === newType ||
        currentType === null
    ) {

        callback();

        return;
    }

    gamePanel.classList.add(
        "panel-changing"
    );


    setTimeout(() => {

        callback();


        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                gamePanel.classList.remove(
                    "panel-changing"
                );

            });

        });


    }, 350);
}


// ======================================================================
// 08. BACKGROUND IMAGE SYSTEM
// ======================================================================

function getSceneImagePath(scene) {

    const isMobile =
        window.matchMedia(
            "(max-width: 767px)"
        ).matches;

    if (!isMobile) {

        return scene.imagePath;
    }

    if (scene.type === "welcome") {

        return "/images/mobile/Welcome.jpg";
    }

    if (scene.type === "victory") {

        return "/images/mobile/Viktory.jpg";
    }


    const fileName =
        scene.imagePath
            .split("/")
            .pop();


    return `/images/mobile/m_${fileName}`;
}

function showInitialSceneImage(
    imagePath
) {

    currentImage.src =
        imagePath;


    currentImage.onload = () => {

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                game.classList.add(
                    "page-loaded"
                );


                setTimeout(() => {

                    game.classList.remove(
                        "initial-loading"
                    );

                }, 1400);

            });

        });

    };
}


function crossfadeSceneImage(
    imagePath
) {

    const preloadedImage =
        new Image();


    preloadedImage.onload = () => {

        nextImage.src =
            imagePath;


        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                nextImage.classList.add(
                    "visible"
                );

            });

        });


        setTimeout(() => {

            currentImage.src =
                imagePath;

            nextImage.classList.remove(
                "visible"
            );

        }, 700);
    };


    preloadedImage.src =
        imagePath;
}


function updateSceneBackground(
    imagePath
) {

    if (
        !currentImage.getAttribute("src")
    ) {

        showInitialSceneImage(
            imagePath
        );

        return;
    }


    crossfadeSceneImage(
        imagePath
    );
}


// ======================================================================
// 09. WELCOME SCREEN
// ======================================================================

function startGame(
    scene
) {

    const playerName =
        playerNameInput
            .value
            .trim();


    if (playerName === "") {

        showPopup(
            interfaceTranslations[
                currentLanguage
                ].emptyName
        );

        return;
    }


    localStorage.setItem(
        "playerName",
        playerName
    );


    requestFullscreen();


    const startAnswer =
        scene.answers[0];


    if (startAnswer) {

        loadScene(
            startAnswer.nextSceneId
        );
    }
}


function configureWelcome(
    scene
) {

    gamePanel.classList.add(
        "welcome-panel"
    );


    welcomeControls.style.display =
        "block";

    startGameControl.style.display =
        "block";

    questionControls.style.display =
        "none";


    sceneTitle.style.display =
        "block";

    sceneTitle.textContent =
        "Welcome to the Adventure!";


    playerNameInput.value =
        "";


    localStorage.removeItem(
        "playerName"
    );


    startGameButton.onclick = () => {

        startGame(
            scene
        );
    };


    playerNameInput.onkeydown =
        (event) => {

            if (event.key === "Enter") {

                startGameButton.click();
            }
        };
}


// ======================================================================
// 10. QUESTION SCREEN
// ======================================================================

function buildValidOptionsText(
    scene
) {

    const text =
        interfaceTranslations[
            currentLanguage
            ];


    return scene.answers
        .map(
            answer =>
                answer.text
        )
        .join(
            ` ${text.or} `
        );
}


function submitAnswer(
    scene
) {

    const playerAnswer =
        answerInput
            .value
            .trim()
            .toLowerCase();


    const selectedAnswer =
        scene.answers.find(
            answer =>
                answer.text
                    .toLowerCase() ===
                playerAnswer
        );


    if (selectedAnswer) {

        if (
            selectedAnswer.nextSceneId ===
            "victory"
        ) {

            playVictorySequence();

            return;
        }


        loadScene(
            selectedAnswer.nextSceneId
        );

        return;
    }


    const text =
        interfaceTranslations[
            currentLanguage
            ];


    const options =
        buildValidOptionsText(
            scene
        );


    showPopup(
        `${text.choose} ${options}`
    );
}


function configureQuestion(
    scene
) {

    gamePanel.classList.add(
        "question-panel"
    );


    welcomeControls.style.display =
        "none";

    startGameControl.style.display =
        "none";

    questionControls.style.display =
        "block";


    sceneTitle.style.display =
        "none";


    answerInput.value =
        "";


    submitButton.onclick = () => {

        submitAnswer(
            scene
        );
    };


    answerInput.onkeydown =
        (event) => {

            if (event.key === "Enter") {

                submitButton.click();
            }
        };
}


// ======================================================================
// 11. GAME OVER SCREEN
// ======================================================================

function configureGameOver() {

    gamePanel.classList.add(
        "gameover-panel"
    );


    welcomeControls.style.display =
        "none";

    startGameControl.style.display =
        "none";

    questionControls.style.display =
        "none";


    sceneTitle.style.display =
        "block";

    sceneTitle.textContent =
        interfaceTranslations[
            currentLanguage
            ].gameOver;
}


// ======================================================================
// 12. VICTORY SYSTEM
// ======================================================================

function playVictorySequence() {

    backgroundMusic.pause();


    victoryIntro.style.display =
        "flex";

    victoryIntro.classList.remove(
        "victory-intro-out"
    );

    victoryIntro.classList.remove(
        "victory-intro-visible"
    );


    victoryVideo.currentTime = 0;
    victoryAudio.currentTime = 0;


    victoryVideo.play();
    victoryAudio.play();


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            victoryIntro.classList.add(
                "victory-intro-visible"
            );

        });

    });


    victoryVideo.onended = () => {

        victoryAudio.pause();

        loadScene("victory")
            .then(() => {

                setTimeout(() => {

                    victoryIntro.classList.remove(
                        "victory-intro-visible"
                    );

                    victoryIntro.classList.add(
                        "victory-intro-out"
                    );

                    setTimeout(() => {

                        victoryIntro.style.display =
                            "none";

                        victoryIntro.classList.remove(
                            "victory-intro-out"
                        );

                    }, 850);


                }, 450);

            });
    };
}


function configureVictory() {

    gamePanel.classList.add(
        "victory-panel"
    );


    welcomeControls.style.display =
        "none";

    startGameControl.style.display =
        "none";

    questionControls.style.display =
        "none";


    sceneTitle.style.display =
        "none";

    sceneTitle.textContent =
        interfaceTranslations[
            currentLanguage
            ].victory;
}


// ======================================================================
// 13. DYNAMIC RENDERING
// ======================================================================

function resetPanelClasses() {

    gamePanel.classList.remove(
        "welcome-panel",
        "question-panel",
        "gameover-panel",
        "victory-panel"
    );
}


function configureSceneScreen(
    scene
) {

    resetPanelClasses();


    switch (scene.type) {

        case "welcome":

            configureWelcome(
                scene
            );

            break;


        case "question":

            configureQuestion(
                scene
            );

            break;


        case "gameover":

            configureGameOver();

            break;


        case "victory":

            configureVictory();

            break;
    }
}


function renderSceneText(
    scene
) {

    let sceneMessage =
        scene.text;


    const playerName =
        localStorage.getItem(
            "playerName"
        );


    if (
        playerName &&
        (
            scene.type === "gameover" ||
            scene.type === "victory"
        )
    ) {

        sceneMessage =
            `${playerName}, ${scene.text}`;
    }


    sceneTextContent.textContent =
        sceneMessage;
}


function renderQuestionOptions(
    scene
) {

    if (scene.type !== "question") {

        questionOptions.textContent =
            "";

        return;
    }


    questionOptions.innerHTML =
        "";


    const leftOption =
        document.createElement(
            "span"
        );

    leftOption.className =
        "question-option-left";

    leftOption.textContent =
        scene.answers[0]?.text || "";


    const rightOption =
        document.createElement(
            "span"
        );

    rightOption.className =
        "question-option-right";

    rightOption.textContent =
        scene.answers[1]?.text || "";


    const isMobile =
        window.matchMedia(
            "(max-width: 767px)"
        ).matches;


    if (isMobile) {

        leftOption.onclick = () => {

            const answer =
                scene.answers[0];

            if (!answer) {
                return;
            }

            if (answer.nextSceneId === "victory") {
                playVictorySequence();
                return;
            }

            loadScene(
                answer.nextSceneId
            );
        };


        rightOption.onclick = () => {

            const answer =
                scene.answers[1];

            if (!answer) {
                return;
            }

            if (answer.nextSceneId === "victory") {
                playVictorySequence();
                return;
            }

            loadScene(
                answer.nextSceneId
            );
        };
    }


    questionOptions.appendChild(
        leftOption
    );


    questionOptions.appendChild(
        rightOption
    );
}


function renderDynamicButtons(
    scene
) {

    answersContainer.innerHTML =
        "";


    if (
        scene.type !== "gameover" &&
        scene.type !== "victory"
    ) {

        return;
    }


    scene.answers.forEach(
        answer => {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                answer.text;


            button.addEventListener(
                "click",
                () => {

                    loadScene(
                        answer.nextSceneId
                    );

                });


            answersContainer.appendChild(
                button
            );
        }
    );
}


function renderSceneContent(
    scene
) {

    configureSceneScreen(
        scene
    );


    renderSceneText(
        scene
    );


    renderQuestionOptions(
        scene
    );


    renderDynamicButtons(
        scene
    );
}


// ======================================================================
// 14. SCENE LOADING
// ======================================================================

function loadScene(
    sceneId
) {

    return fetch(
        `/api/scenes/${sceneId}?lang=${currentLanguage}`
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `Scene not found: ${sceneId}`
                );
            }


            return response.json();
        })


        .then(scene => {

            updateLanguageSwitchVisibility(
                scene.type
            );


            const sceneImagePath =
                getSceneImagePath(
                    scene
                );


            updateSceneBackground(
                sceneImagePath
            );


            changePanelType(
                scene.type,
                () => {

                    renderSceneContent(
                        scene
                    );
                }
            );
        })


        .catch(error => {

            console.error(
                error
            );


            showPopup(
                interfaceTranslations[
                    currentLanguage
                    ].error
            );
        });
}


// ======================================================================
// 15. PRE-WELCOME INTRO
// ======================================================================

function showPreWelcome() {

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            preWelcome.classList.add(
                "pre-welcome-ready"
            );

        });

    });
}


function enterCastle() {

    localStorage.setItem(
        "musicOn",
        "true"
    );


    backgroundMusic.play();


    requestFullscreen();


    preWelcome.classList.add(
        "pre-welcome-closing"
    );


    setTimeout(() => {

        if (preWelcomeVideo) {

            preWelcomeVideo.pause();
        }


        preWelcome.classList.add(
            "pre-welcome-journey-visible"
        );


        setTimeout(() => {

            preWelcome.classList.add(
                "pre-welcome-journey-out"
            );


            setTimeout(() => {

                preWelcome.style.display =
                    "none";


                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        game.classList.add(
                            "intro-finished"
                        );

                    });

                });


            }, 2400);


        }, 5000);


    }, 1400);
}


// ======================================================================
// 16. APPLICATION INITIALIZATION
// ======================================================================

function initializeApplication() {

    applyInterfaceLanguage();


    initializeMusic();


    window.addEventListener(
        "load",
        showPreWelcome
    );


    preWelcomeEnterButton.onclick =
        enterCastle;


    loadScene(
        "welcome"
    );
}


initializeApplication();