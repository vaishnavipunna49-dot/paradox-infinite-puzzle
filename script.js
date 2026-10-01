document.addEventListener("DOMContentLoaded", function () {

    console.log("PARADOX INFINITE SYSTEM STARTED");


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const homeScreen =
        document.getElementById("homeScreen");

    const levelScreen =
        document.getElementById("levelScreen");

    const gameScreen =
        document.getElementById("gameScreen");

    const winScreen =
        document.getElementById("winScreen");


    const playButton =
        document.getElementById("playButton");

    const levelsButton =
        document.getElementById("levelsButton");

    const backButton =
        document.getElementById("backButton");

    const gameHomeButton =
        document.getElementById("gameHomeButton");

    const winHomeButton =
        document.getElementById("winHomeButton");

    const nextLevelButton =
        document.getElementById("nextLevelButton");

    const loadMoreButton =
        document.getElementById("loadMoreButton");


    const levelGrid =
        document.getElementById("levelGrid");

    const gameBoard =
        document.getElementById("gameBoard");


    const currentLevelText =
        document.getElementById("currentLevelText");

    const movesText =
        document.getElementById("movesText");

    const timeText =
        document.getElementById("timeText");

    const livesText =
        document.getElementById("livesText");

    const objectiveText =
        document.getElementById("objectiveText");

    const progressText =
        document.getElementById("progressText");

    const starsText =
        document.getElementById("starsText");

    const winMessage =
        document.getElementById("winMessage");

    const worldText =
        document.getElementById("worldText");

    const difficultyText =
        document.getElementById("difficultyText");


    /* =====================================================
       GAME VARIABLES
    ===================================================== */

    let currentLevel = 1;

    let moves = 0;

    let lives = 3;

    let time = 0;

    let timer = null;

    let visibleLevels = 50;


    let player = {
        x: 0,
        y: 0
    };


    let goal = {
        x: 0,
        y: 0
    };


    let board = [];


    /* =====================================================
       SAFE STORAGE
    ===================================================== */

    function getCompletedLevel() {

        try {

            const value =
                parseInt(
                    localStorage.getItem(
                        "paradoxInfiniteCompleted"
                    )
                );

            if (Number.isNaN(value)) {
                return 0;
            }

            return value;

        } catch (error) {

            return 0;
        }
    }


    function saveCompletedLevel(level) {

        try {

            const old =
                getCompletedLevel();

            if (level > old) {

                localStorage.setItem(
                    "paradoxInfiniteCompleted",
                    level
                );
            }

        } catch (error) {

            console.log(
                "Progress saving unavailable"
            );
        }
    }


    /* =====================================================
       SCREEN
    ===================================================== */

    function showScreen(screen) {

        homeScreen.classList.remove("active");

        levelScreen.classList.remove("active");

        gameScreen.classList.remove("active");

        winScreen.classList.remove("active");

        screen.classList.add("active");
    }


    /* =====================================================
       PLAY BUTTON
    ===================================================== */

    playButton.addEventListener(
        "click",
        function () {

            const completed =
                getCompletedLevel();

            startGame(
                Math.max(
                    1,
                    completed + 1
                )
            );
        }
    );


    /* =====================================================
       LEVEL MAP BUTTON
    ===================================================== */

    levelsButton.addEventListener(
        "click",
        function () {

            createLevelMap();

            showScreen(levelScreen);
        }
    );


    /* =====================================================
       BACK
    ===================================================== */

    backButton.addEventListener(
        "click",
        function () {

            showScreen(homeScreen);
        }
    );


    /* =====================================================
       GAME HOME
    ===================================================== */

    gameHomeButton.addEventListener(
        "click",
        function () {

            stopTimer();

            showScreen(homeScreen);
        }
    );


    /* =====================================================
       WIN HOME
    ===================================================== */

    winHomeButton.addEventListener(
        "click",
        function () {

            stopTimer();

            showScreen(homeScreen);
        }
    );


    /* =====================================================
       LEVEL MAP
    ===================================================== */

    function createLevelMap() {

        levelGrid.innerHTML = "";

        const completed =
            getCompletedLevel();


        const amount =
            Math.max(
                visibleLevels,
                completed + 5
            );


        progressText.textContent =
            "♾ INFINITE";


        for (
            let level = 1;
            level <= amount;
            level++
        ) {

            const button =
                document.createElement("button");


            button.className =
                "level-button";


            button.textContent =
                level;


            /*
                Only the next unfinished
                level is unlocked.
            */

            if (
                level <= completed
            ) {

                button.classList.add(
                    "completed"
                );
            }


            if (
                level > completed + 1
            ) {

                button.classList.add(
                    "locked"
                );

                button.textContent =
                    "🔒";

            } else {

                button.addEventListener(
                    "click",
                    function () {

                        startGame(level);
                    }
                );
            }


            levelGrid.appendChild(button);
        }
    }


    /* =====================================================
       LOAD MORE
    ===================================================== */

    loadMoreButton.addEventListener(
        "click",
        function () {

            visibleLevels += 50;

            createLevelMap();

            loadMoreButton.textContent =
                "+ LOAD MORE LEVELS";
        }
    );


    /* =====================================================
       LEVEL SIZE
    ===================================================== */

    function getSize(level) {

        /*
            Infinite difficulty progression.

            1 - 10      5x5
            11 - 30     6x6
            31 - 60     7x7
            61 - 100    8x8
            101 - 150   9x9
            151+        10x10
        */

        if (level <= 10) {
            return 5;
        }

        if (level <= 30) {
            return 6;
        }

        if (level <= 60) {
            return 7;
        }

        if (level <= 100) {
            return 8;
        }

        if (level <= 150) {
            return 9;
        }

        return 10;
    }


    /* =====================================================
       WORLD
    ===================================================== */

    function getWorld(level) {

        const worlds = [
            "ENERGY LAB",
            "SHADOW ZONE",
            "REALITY CORE",
            "FROZEN SYSTEM",
            "MELTDOWN",
            "SURVEILLANCE",
            "MUTATION",
            "VOID",
            "CHAOS",
            "THE UNKNOWN"
        ];


        const index =
            Math.floor(
                (level - 1) / 10
            ) % worlds.length;


        const cycle =
            Math.floor(
                (level - 1) / 100
            );


        if (cycle === 0) {

            return worlds[index];

        }


        return (
            worlds[index] +
            " // CYCLE " +
            (cycle + 1)
        );
    }


    /* =====================================================
       OBJECTIVE
    ===================================================== */

    function getObjective(level) {

        const objectives = [

            "REACH THE BLUE CORE",

            "FIND THE CORRECT PATH",

            "ESCAPE THE GRID",

            "THE MAZE IS WATCHING",

            "FIND THE HIDDEN EXIT",

            "DO NOT TRUST THE PATH",

            "REALITY IS SHIFTING",

            "THE RULES HAVE CHANGED",

            "BREAK THE SYSTEM",

            "SURVIVE THE PARADOX"

        ];


        return objectives[
            (level - 1) % objectives.length
        ];
    }


    /* =====================================================
       DIFFICULTY
    ===================================================== */

    function getDifficulty(level) {

        if (level <= 10) {
            return "EASY";
        }

        if (level <= 30) {
            return "NORMAL";
        }

        if (level <= 60) {
            return "HARD";
        }

        if (level <= 100) {
            return "EXTREME";
        }

        if (level <= 250) {
            return "INSANE";
        }

        return "UNKNOWN";
    }


    /* =====================================================
       START GAME
    ===================================================== */

    function startGame(level) {

        currentLevel =
            Math.max(
                1,
                Number(level)
            );


        moves = 0;

        lives = 3;

        time = 0;


        currentLevelText.textContent =
            currentLevel;


        movesText.textContent =
            moves;


        livesText.textContent =
            lives;


        timeText.textContent =
            time;


        worldText.textContent =
            getWorld(currentLevel);


        objectiveText.textContent =
            getObjective(currentLevel);


        difficultyText.textContent =
            "DIFFICULTY: " +
            getDifficulty(currentLevel);


        generateBoard();


        showScreen(gameScreen);


        startTimer();
    }


    /* =====================================================
       SEEDED RANDOM
       Makes a level layout repeatable.
    ===================================================== */

    function seededRandom(seed) {

        const x =
            Math.sin(seed) *
            10000;

        return x -
            Math.floor(x);
    }


    /* =====================================================
       GENERATE BOARD
    ===================================================== */

    function generateBoard() {

        const size =
            getSize(currentLevel);


        board = [];


        /*
            Start with an empty board.
        */

        for (
            let y = 0;
            y < size;
            y++
        ) {

            board[y] = [];

            for (
                let x = 0;
                x < size;
                x++
            ) {

                board[y][x] = 0;
            }
        }


        /*
            Create guaranteed path.

            The path pattern changes
            depending on the level.
        */

        let x = 0;

        let y = 0;


        board[y][x] = 0;


        while (
            x < size - 1 ||
            y < size - 1
        ) {

            const pattern =
                currentLevel % 4;


            if (
                pattern === 0
            ) {

                if (
                    y < size - 1
                ) {

                    y++;

                } else {

                    x++;
                }

            } else if (
                pattern === 1
            ) {

                if (
                    x < size - 1
                ) {

                    x++;

                } else {

                    y++;
                }

            } else if (
                pattern === 2
            ) {

                if (
                    x < size - 1 &&
                    y < size - 1
                ) {

                    if (
                        (x + y + currentLevel)
                        % 2 === 0
                    ) {

                        x++;

                    } else {

                        y++;
                    }

                } else if (
                    x < size - 1
                ) {

                    x++;

                } else {

                    y++;
                }

            } else {

                if (
                    y < size - 1 &&
                    x < size - 1
                ) {

                    if (
                        (x * 3 +
                            y * 2 +
                            currentLevel)
                        % 3 === 0
                    ) {

                        y++;

                    } else {

                        x++;
                    }

                } else if (
                    x < size - 1
                ) {

                    x++;

                } else {

                    y++;
                }
            }


            board[y][x] = 0;
        }


        /*
            Add walls.

            Difficulty grows slowly.
        */

        const difficulty =
            Math.min(
                0.15 +
                currentLevel * 0.0025,
                0.38
            );


        for (
            let row = 0;
            row < size;
            row++
        ) {

            for (
                let col = 0;
                col < size;
                col++
            ) {

                if (
                    row === 0 &&
                    col === 0
                ) {
                    continue;
                }


                if (
                    row === size - 1 &&
                    col === size - 1
                ) {
                    continue;
                }


                /*
                    Only place a wall
                    sometimes.
                */

                const random =
                    seededRandom(
                        currentLevel *
                        1000 +
                        row *
                        100 +
                        col
                    );


                if (
                    random < difficulty
                ) {

                    board[row][col] = 1;
                }
            }
        }


        /*
            Recreate a guaranteed
            route based on level.
        */

        x = 0;

        y = 0;

        board[y][x] = 0;


        while (
            x < size - 1 ||
            y < size - 1
        ) {

            const pattern =
                currentLevel % 4;


            if (
                pattern === 0
            ) {

                if (
                    y < size - 1
                ) {

                    y++;

                } else {

                    x++;
                }

            } else if (
                pattern === 1
            ) {

                if (
                    x < size - 1
                ) {

                    x++;

                } else {

                    y++;
                }

            } else if (
                pattern === 2
            ) {

                if (
                    x < size - 1 &&
                    y < size - 1
                ) {

                    if (
                        (x + y + currentLevel)
                        % 2 === 0
                    ) {

                        x++;

                    } else {

                        y++;
                    }

                } else if (
                    x < size - 1
                ) {

                    x++;

                } else {

                    y++;
                }

            } else {

                if (
                    y < size - 1 &&
                    x < size - 1
                ) {

                    if (
                        (x * 3 +
                            y * 2 +
                            currentLevel)
                        % 3 === 0
                    ) {

                        y++;

                    } else {

                        x++;
                    }

                } else if (
                    x < size - 1
                ) {

                    x++;

                } else {

                    y++;
                }
            }


            board[y][x] = 0;
        }


        player = {
            x: 0,
            y: 0
        };


        goal = {
            x: size - 1,
            y: size - 1
        };


        renderBoard();
    }


    /* =====================================================
       RENDER BOARD
    ===================================================== */

    function renderBoard() {

        gameBoard.innerHTML = "";


        const size =
            board.length;


        gameBoard.style.gridTemplateColumns =
            `repeat(${size}, auto)`;


        for (
            let y = 0;
            y < size;
            y++
        ) {

            for (
                let x = 0;
                x < size;
                x++
            ) {

                const cell =
                    document.createElement("div");


                cell.className =
                    "cell";


                /*
                    WALL
                */

                if (
                    board[y][x] === 1
                ) {

                    cell.classList.add(
                        "wall"
                    );
                }


                /*
                    GOAL
                */

                if (
                    x === goal.x &&
                    y === goal.y
                ) {

                    cell.classList.add(
                        "goal"
                    );

                    cell.textContent =
                        "✦";
                }


                /*
                    PLAYER
                */

                if (
                    x === player.x &&
                    y === player.y
                ) {

                    cell.classList.add(
                        "player"
                    );

                    cell.textContent =
                        "●";
                }


                gameBoard.appendChild(
                    cell
                );
            }
        }
    }


    /* =====================================================
       MOVE
    ===================================================== */

    function move(dx, dy) {

        if (
            !gameScreen.classList.contains(
                "active"
            )
        ) {

            return;
        }


        const newX =
            player.x + dx;

        const newY =
            player.y + dy;


        /*
            OUTSIDE BOARD
        */

        if (
            newX < 0 ||
            newY < 0 ||
            newY >= board.length ||
            newX >= board.length
        ) {

            loseLife();

            return;
        }


        /*
            WALL
        */

        if (
            board[newY][newX] === 1
        ) {

            loseLife();

            return;
        }


        player.x =
            newX;

        player.y =
            newY;


        moves++;


        movesText.textContent =
            moves;


        renderBoard();


        /*
            GOAL
        */

        if (
            player.x === goal.x &&
            player.y === goal.y
        ) {

            levelComplete();
        }
    }


    /* =====================================================
       LIFE LOST
    ===================================================== */

    function loseLife() {

        lives--;


        livesText.textContent =
            lives;


        gameBoard.style.transform =
            "translateX(8px)";


        setTimeout(
            function () {

                gameBoard.style.transform =
                    "translateX(-8px)";

            },
            60
        );


        setTimeout(
            function () {

                gameBoard.style.transform =
                    "translateX(0)";

            },
            120
        );


        if (
            lives <= 0
        ) {

            setTimeout(
                function () {

                    alert(
                        "SYSTEM RESET\n\nTRY THE LEVEL AGAIN."
                    );

                    startGame(
                        currentLevel
                    );

                },
                100
            );
        }
    }


    /* =====================================================
       TIMER
    ===================================================== */

    function startTimer() {

        stopTimer();


        timer =
            setInterval(
                function () {

                    time++;


                    timeText.textContent =
                        time;

                },
                1000
            );
    }


    function stopTimer() {

        if (
            timer !== null
        ) {

            clearInterval(timer);

            timer = null;
        }
    }


    /* =====================================================
       LEVEL COMPLETE
    ===================================================== */

    function levelComplete() {

        stopTimer();


        saveCompletedLevel(
            currentLevel
        );


        let stars = 3;


        if (
            moves > 15
        ) {

            stars = 2;
        }


        if (
            moves > 30
        ) {

            stars = 1;
        }


        let starString = "";


        for (
            let i = 0;
            i < 3;
            i++
        ) {

            if (
                i < stars
            ) {

                starString += "★ ";

            } else {

                starString += "☆ ";
            }
        }


        starsText.textContent =
            starString;


        winMessage.textContent =
            "LEVEL " +
            currentLevel +
            " COMPLETED";


        showScreen(winScreen);
    }


    /* =====================================================
       NEXT LEVEL
       NO LIMIT
    ===================================================== */

    nextLevelButton.addEventListener(
        "click",
        function () {

            startGame(
                currentLevel + 1
            );
        }
    );


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !gameScreen.classList.contains(
                    "active"
                )
            ) {

                return;
            }


            const key =
                event.key.toLowerCase();


            if (
                key === "arrowup" ||
                key === "w"
            ) {

                event.preventDefault();

                move(0, -1);

            } else if (
                key === "arrowdown" ||
                key === "s"
            ) {

                event.preventDefault();

                move(0, 1);

            } else if (
                key === "arrowleft" ||
                key === "a"
            ) {

                event.preventDefault();

                move(-1, 0);

            } else if (
                key === "arrowright" ||
                key === "d"
            ) {

                event.preventDefault();

                move(1, 0);
            }
        }
    );


    /* =====================================================
       MOBILE CONTROLS
    ===================================================== */

    const directionButtons =
        document.querySelectorAll(
            "[data-dir]"
        );


    directionButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const direction =
                        button.dataset.dir;


                    if (
                        direction === "up"
                    ) {

                        move(0, -1);
                    }


                    if (
                        direction === "down"
                    ) {

                        move(0, 1);
                    }


                    if (
                        direction === "left"
                    ) {

                        move(-1, 0);
                    }


                    if (
                        direction === "right"
                    ) {

                        move(1, 0);
                    }

                }
            );
        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    createLevelMap();

    showScreen(homeScreen);

});
