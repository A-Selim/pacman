// width represents how many squares for horizontal && vertical line of the game grid
const width = 28;
const grid = document.querySelector(".grid");
const scoreTitle = document.querySelector(".score-title");
const scoreDisplay = document.querySelector("#score");
const squares = [];
// layout of the game 28 * 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1,
    1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2,
    2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
    4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
    4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1,
];

// create Ghost class
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.scaredTime = false;
        this.isScared = false;
        this.interval = null;
    }
}

// define ghosts array
const ghosts = [
    new Ghost("blinky", 348, 210),
    new Ghost("pinky", 376, 220),
    new Ghost("inky", 351, 230),
    new Ghost("clyde", 379, 240),
];

let score = 0;
let pacemanCurrentIndex = 490;

// create game layout && pacman
function createGameLayout() {
    // create game grid
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement("div");
        squares.push(square);
        grid.appendChild(square);
        // draw the game grid
        switch (layout[i]) {
            case 0:
                squares[i].classList.add("pac-dot");
                break;
            case 1:
                squares[i].classList.add("wall");
                break;
            case 2:
                squares[i].classList.add("ghost-lair");
                break;
            case 3:
                squares[i].classList.add("power-pellet");
        }
    }
    // create pacman
    squares[pacemanCurrentIndex].classList.add("pacman");
}

createGameLayout();

// function to control pacman
function control(event) {
    let direction = 0;
    squares[pacemanCurrentIndex].classList.remove("pacman");

    switch (event.key) {
        case "ArrowUp":
            direction = -width;
            break;
        case "ArrowDown":
            direction = width;
            break;
        case "ArrowRight":
            direction = 1;
            break;
        case "ArrowLeft":
            direction = -1;
    }

    // prevent pacman to go through walls && get into the ghost lair area
    if (
        !squares[pacemanCurrentIndex + direction].classList.contains("wall") &&
        !squares[pacemanCurrentIndex + direction].classList.contains("ghost-lair")
    ) {
        pacemanCurrentIndex += direction;
    }

    // make pacman appear at the other side of the middle pathway
    switch (pacemanCurrentIndex) {
        case 391:
            pacemanCurrentIndex = 364;
            break;
        case 364:
            pacemanCurrentIndex = 391;
    }

    squares[pacemanCurrentIndex].classList.add("pacman");

    pacDotEaten();
    powerPelletEaten();
    checkForGameOver();
    checkForWin();
}

document.addEventListener("keyup", control);

// when pacman eat pac dot
function pacDotEaten() {
    if (squares[pacemanCurrentIndex].classList.contains("pac-dot")) {
        // remove pac-dot from the grid
        squares[pacemanCurrentIndex].classList.remove("pac-dot");
        // add 1 point to score
        addToScore(1);
    }
}

// when pacman eat power pellet
function powerPelletEaten() {
    if (squares[pacemanCurrentIndex].classList.contains("power-pellet")) {
        // remove power-pellet from the grid
        squares[pacemanCurrentIndex].classList.remove("power-pellet");
        // add 10 points to score
        addToScore(10);

        // make every ghost is scared
        ghosts.forEach((ghost) => (ghost.isScared = true));

        // activate scaredtime to every ghost
        ghosts.forEach((ghost) => (ghost.scaredTime = true));

        // decrease interval time for each ghost to make it faster every time pacman eat power-pellet
        ghosts.forEach((ghost) => (ghost.speed -= 50));
    }
}

// function to compute score && display it
function addToScore(num) {
    score += num;
    scoreDisplay.textContent = score;
}

// for loop for iterate ghosts array and apply ghostMovement function to every ghost
ghosts.forEach((ghost) => ghostMovement(ghost));

function ghostMovement(ghost) {
    // appear ghost in layout && add ghost className && class ghost to make easier to track
    squares[ghost.currentIndex].classList.add(ghost.className, "ghost");

    // create array of direction for ghosts
    const directions = [-1, 1, -width, width];

    // get random value of directions array && asign it to ghostDirection
    let ghostDirection = directions[Math.floor(Math.random() * directions.length)];

    // an interval to keep ghosts moving
    ghost.interval = setInterval(function () {
        squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");

        if (
            // prevent ghosts to go through walls && prevent to collide each other
            !squares[ghost.currentIndex + ghostDirection].classList.contains("wall") &&
            !squares[ghost.currentIndex + ghostDirection].classList.contains("ghost")
        ) {
            ghost.currentIndex += ghostDirection;
        } else {
            ghostDirection = directions[Math.floor(Math.random() * directions.length)];
        }

        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");

        // when ghost is scared
        if (ghost.isScared) {
            // change style of ghosts to scared ghost
            squares[ghost.currentIndex].classList.add("scared-ghost");

            if (ghost.scaredTime) {
                // make ghost is not scared after 7 seconds
                setTimeout(() => (ghost.isScared = false), 7000);
            }
            // reset scared time to false (initial value) to make sure setTimout will not be accessed again when ghost isScared === true
            ghost.scaredTime = false;
        }

        // when pacman eat scared ghost
        if (ghost.isScared && squares[pacemanCurrentIndex].classList.contains("scared-ghost")) {
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
            ghost.currentIndex = ghost.startIndex;
            // add ghost className && class "ghost"
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            // add 30 points to score
            addToScore(30);
        }

        checkForGameOver();
        checkForWin();
    }, ghost.speed);
}

// define how game is over
function checkForGameOver() {
    if (
        squares[pacemanCurrentIndex].classList.contains("ghost") &&
        !squares[pacemanCurrentIndex].classList.contains("scared-ghost")
    ) {
        ghosts.forEach((ghost) => clearInterval(ghost.interval));
        document.removeEventListener("keyup", control);
        scoreTitle.textContent = `You Lost, Your Score: ${score}`;
    }
}

// define win
function checkForWin() {
    if (score >= 274) {
        ghosts.forEach((ghost) => clearInterval(ghost.interval));
        document.removeEventListener("keyup", control);
        scoreTitle.textContent = `You Win, Your Score: ${score}`;
    }
}
