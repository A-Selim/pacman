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
        this.gInterval = null;
    }
}

// define ghosts array
const ghosts = [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 500),
    new Ghost("inky", 351, 350),
    new Ghost("clyde", 379, 400),
];

let score = 0;
let pacemanCurrentIndex = 490;

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
}

document.addEventListener("keyup", control);

// when pacman eat pac dot
function pacDotEaten() {
    if (squares[pacemanCurrentIndex].classList.contains("pac-dot")) {
        squares[pacemanCurrentIndex].classList.remove("pac-dot");
        calculateScore(1);
    }
}

// when pacman eat power pellet
function powerPelletEaten() {
    if (squares[pacemanCurrentIndex].classList.contains("power-pellet")) {
        squares[pacemanCurrentIndex].classList.remove("power-pellet");
        calculateScore(10);

        ghosts.forEach((ghost) => (ghost.isScared = true));

        ghosts.forEach((ghost) => (ghost.scaredTime = true));
    }
}

// function to compute score && display it
function calculateScore(num) {
    score += num;
    scoreDisplay.textContent = score;
}

// for loop for iterate ghosts array and apply ghostControl function to every ghost
ghosts.forEach((ghost) => ghostMovement(ghost));

function ghostMovement(ghost) {
    // appear ghost in layout && add ghost className && class ghost to make easier to track
    squares[ghost.currentIndex].classList.add(ghost.className, "ghost");

    // create array of direction for ghosts
    const directions = [-1, 1, -width, width, -width, width, -width, width, 1, -1];

    // get random value of directions array && asign it to ghostDirection
    let ghostDirection = directions[Math.floor(Math.random() * directions.length)];

    // an interval to keep ghosts moving
    ghost.gInterval = setInterval(function () {
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
            // retrun ghost to normal state after 10 seconds
            if (ghost.scaredTime) {
                setTimeout(() => (ghost.isScared = false), 5000);
            }
            ghost.scaredTime = false;
        }

        // when pacman eat scared ghost
        if (ghost.isScared && squares[pacemanCurrentIndex].classList.contains("scared-ghost")) {
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
            ghost.currentIndex = ghost.startIndex;
            calculateScore(100);
        }

        // game over when pacman collide with not scared ghost
        if (!ghost.isScared && squares[pacemanCurrentIndex].classList.contains("ghost")) {
            clearInterval(ghost.gInterval);
            document.removeEventListener("keyup", control);
            scoreTitle.textContent = `Game Over, Your Score: ${score}`;
        }

        // define win
        if (score >= 1200) {
            clearInterval(ghost.gInterval);
            document.removeEventListener("keyup", control);
            scoreTitle.textContent = `You Win, Your Score: ${score}`;
        }
    }, ghost.speed);
}
