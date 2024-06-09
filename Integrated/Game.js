const gameContainer = document.getElementById('game-container');
const bucket = document.getElementById('bucket');
const fallingLetters = document.getElementById('falling-letters');
const timerElement = document.getElementById('time-left');
const resultContainer = document.getElementById('result-container');
const caughtLettersElement = document.getElementById('caught-letters');
const inputWords = document.getElementById('input-words');
const submitWordsButton = document.getElementById('submit-words');
const scoreElement = document.getElementById('score');
const wordTimerElement = document.createElement('div');
wordTimerElement.id = 'word-timer';
resultContainer.appendChild(wordTimerElement);

let caughtLetters = [];
let timeLeft = 20;
let gameInterval, countdownInterval, wordEntryInterval;
let wordEntryTimeLeft = 60;

function startGame() {
    gameInterval = setInterval(createFallingLetter, 1000);
    countdownInterval = setInterval(updateGameTimer, 1000);
    gameContainer.addEventListener('mousemove', moveBucket);
}

function createFallingLetter() {
    const letter = document.createElement('div');
    letter.classList.add('letter');
    letter.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    letter.style.left = Math.random() * (gameContainer.clientWidth - 20) + 'px';

    fallingLetters.appendChild(letter);

    let letterFallInterval = setInterval(() => {
        const letterTop = letter.offsetTop;
        if (letterTop > gameContainer.clientHeight - 30 && letterTop < gameContainer.clientHeight - 10 &&
            letter.offsetLeft >= bucket.offsetLeft && letter.offsetLeft <= bucket.offsetLeft + bucket.clientWidth) {
            caughtLetters.push(letter.textContent);
            fallingLetters.removeChild(letter);
            clearInterval(letterFallInterval);
        } else if (letterTop > gameContainer.clientHeight) {
            fallingLetters.removeChild(letter);
            clearInterval(letterFallInterval);
        } else {
            letter.style.top = letterTop + 5 + 'px';
        }
    }, 50);
}

function moveBucket(event) {
    const bucketWidth = bucket.clientWidth;
    const newLeft = event.clientX - bucketWidth / 2;
    if (newLeft >= 0 && newLeft <= gameContainer.clientWidth - bucketWidth) {
        bucket.style.left = newLeft + 'px';
    }
}

function updateGameTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(gameInterval);
        clearInterval(countdownInterval);
        gameContainer.removeEventListener('mousemove', moveBucket);
        showResults();
    }
}

function showResults() {
    gameContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    caughtLettersElement.textContent = caughtLetters.join(', ');
    startWordEntryTimer();
}

function startWordEntryTimer() {
    wordEntryInterval = setInterval(updateWordEntryTimer, 1000);
}

function updateWordEntryTimer() {
    wordEntryTimeLeft--;
    wordTimerElement.textContent = `Time left to enter words: ${wordEntryTimeLeft}s`;

    if (wordEntryTimeLeft <= 0) {
        clearInterval(wordEntryInterval);
        calculateScore();
    }
}

submitWordsButton.addEventListener('click', calculateScore);

async function calculateScore() {
    clearInterval(wordEntryInterval);
    const enteredWords = inputWords.value.split(/\s+/).filter(word => word.length > 0);
    let score = 0;
    for (let word of enteredWords) {
        const isValid = await validateWord(word);
        if (isValid) {
            let valid = true;
            let tempCaughtLetters = [...caughtLetters];
            for (let letter of word.toUpperCase()) {
                const index = tempCaughtLetters.indexOf(letter);
                if (index === -1) {
                    valid = false;
                    break;
                } else {
                    tempCaughtLetters.splice(index, 1);
                }
            }
            if (valid) {
                score += word.length;
            }
        }
    }
    scoreElement.textContent = `Score: ${score}`;
}

async function validateWord(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error('Word not found');
        const data = await response.json();
        return data.length > 0;
    } catch (error) {
        console.error(`Error validating word "${word}":`, error);
        return false;
    }
}

// Start the game on page load
window.onload = startGame;
