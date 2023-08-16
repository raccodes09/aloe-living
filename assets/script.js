// Array of valid 5-letter words
const validWords = ["apple", "happy", "tiger", "bread", "music", "zebra", "watch", "smile"];

// Initialize game variables
let targetWord;
let attempts = 0;
let score = 5;

// Generate a random word for the game
function generateRandomWord() {
    const randomIndex = Math.floor(Math.random() * validWords.length);
    return validWords[randomIndex];
}

// Initialize a new game round
function startNewRound() {
    targetWord = generateRandomWord();
    attempts = 0;
    score = 5;
    document.getElementById("score").textContent = score;
    document.getElementById("attempts-left").textContent = 5;
    document.querySelectorAll(".word-letter").forEach(input => input.value = "");
    document.querySelectorAll(".word-letter").forEach(input => input.classList.remove("correct"));
}

// Handle guess submission
function submitGuess() {
    const currentGuess = Array.from(document.querySelectorAll(".word-row")).map(row =>
        row.querySelector(".word-letter").value
    ).join("");

    if (currentGuess === targetWord) {
        // Correct guess
        document.querySelector(".message").textContent = "Correct!";
        document.querySelector(".message").classList.add("correct");
    } else {
        // Incorrect guess
        attempts++;
        score--;
        document.getElementById("score").textContent = score;
        document.getElementById("attempts-left").textContent = 5 - attempts;
        document.querySelector(".message").textContent = "Incorrect!";
        document.querySelector(".message").classList.remove("correct");
        document.querySelector(".message").classList.add("incorrect");

        if (attempts >= 5) {
            // Game over
            document.querySelector(".message").textContent = "Game Over! The word was " + targetWord;
        }
    }
}

// Attach event listeners to buttons
document.getElementById("submit-button").addEventListener("click", submitGuess);
document.getElementById("clear-button").addEventListener("click", () => {
    document.querySelectorAll(".word-letter").forEach(input => input.value = "");
});
document.getElementById("reset-game-button").addEventListener("click", startNewRound);

// Start the first round
startNewRound();