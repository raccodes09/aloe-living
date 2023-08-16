console.log(Connected);

// Array of valid 5-letter words
const validWords = ["apple", "happy", "tiger", "bread", "music", "zebra", "watch", "smile"];

// Initialize game variables
let targetWord;
let attempts;
let score;

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

    // Clear input boxes and reset styles
    document.querySelectorAll(".word-letter").forEach(input => {
        input.value = "";
        input.classList.remove("correct");
    });

    document.querySelector(".message").textContent = "";
    document.querySelector(".message").classList.remove("correct", "incorrect");
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
        document.querySelectorAll(".word-letter").forEach(input => input.classList.add("correct"));
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

        // Check for correct letters in the wrong position and highlight them
        document.querySelectorAll(".word-letter").forEach((input, index) => {
            if (targetWord.includes(input.value) && input.value !== targetWord[index]) {
                input.classList.add("correct");
            }
        });
    }
}

// Attach event listeners to buttons
document.getElementById("submit-button").addEventListener("click", submitGuess);
document.getElementById("clear-button").addEventListener("click", () => {
    document.querySelectorAll(".word-letter").forEach(input => input.value = "");
});
document.getElementById("reset-game-button").addEventListener("click", startNewRound);

// Attach event listener for Enter key press to submit guess
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submitGuess();
    }
});

// Attach event listeners to input boxes to move to the next box on input
document.querySelectorAll(".word-letter").forEach((input, index) => {
    input.addEventListener("input", function () {
        if (input.value.length === 1) {
            // Move to the next input box
            if (index < 4) {
                // Focus on the next input box in the same row
                document.querySelectorAll(".word-row")[index].querySelectorAll(".word-letter")[index + 1].focus();
            } else if (index === 4) {
                // Focus on the first input box of the next row
                document.querySelectorAll(".word-row")[index + 1].querySelector(".word-letter").focus();
            }
        } else if (input.value === "" && event.inputType === "deleteContentBackward") {
            // Move to the previous input box when Backspace is pressed
            if (index > 0) {
                // Focus on the previous input box in the same row
                document.querySelectorAll(".word-row")[index].querySelectorAll(".word-letter")[index - 1].focus();
            } else if (index === 0) {
                // Focus on the last input box of the previous row
                document.querySelectorAll(".word-row")[index - 1].querySelectorAll(".word-letter")[4].focus();
            }
        }
    });
});

// Start the first round
startNewRound();