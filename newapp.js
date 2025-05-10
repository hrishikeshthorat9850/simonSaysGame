const colors = ["red", "green", "blue", "yellow"];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let isPlaying = false;

// Select elements
const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");
const colorBoxes = document.querySelectorAll(".color-box");

// Start Game
startBtn.addEventListener("click", startGame);

function startGame() {
    gameSequence = [];
    playerSequence = [];
    level = 0;
    isPlaying = true;
    statusText.textContent = "Watch the sequence!";
    nextRound();
}

// Generate next color in sequence
function nextRound() {
    playerSequence = [];
    level++;
    statusText.textContent = `Level ${level}`;

    // Choose a random color and add to game sequence
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);

    // Show sequence to player
    let delay = 500;
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            flashColor(color);
        }, delay * (index + 1));
    });
}

// Flash a color
function flashColor(color) {
    const box = document.getElementById(color);
    box.classList.add("flash");
    setTimeout(() => {
        box.classList.remove("flash");
    }, 300);
}

// Handle player's clicks
colorBoxes.forEach(box => {
    box.addEventListener("click", () => {
        if (!isPlaying) return;

        let clickedColor = box.id;
        playerSequence.push(clickedColor);
        flashColor(clickedColor);

        // Check player's input
        if (!checkPlayerInput()) {
            gameOver();
            return;
        }

        // If player completed the sequence, start next round
        if (playerSequence.length === gameSequence.length) {
            setTimeout(nextRound, 1000);
        }
    });
});

// Check player's input against game sequence
function checkPlayerInput() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) {
            return false;
        }
    }
    return true;
}

// Game over
function gameOver() {
    isPlaying = false;
    statusText.textContent = "Game Over! Press Start to try again.";
    gameSequence = [];
    playerSequence = [];
}
