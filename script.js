let score = 0;
let time = 60;
let currentLetter = '';

const fallingLetterDiv = document.getElementById('falling-letter');
const wordInput = document.getElementById('word-input');
const scoreDiv = document.getElementById('score');
const timerDiv = document.getElementById('timer');

function startGame() {
    generateLetter();
    setInterval(updateTimer, 1000);
}

function generateLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    currentLetter = letters[Math.floor(Math.random() * letters.length)];
    fallingLetterDiv.innerText = currentLetter;
}

function updateTimer() {
    if (time > 0) {
        time--;
        timerDiv.innerText = `Time: ${time}s`;
    } else {
        alert('Game Over! Your score is ' + score);
        resetGame();
    }
}

async function checkWord() {
    const word = wordInput.value.toLowerCase();
    if (word.startsWith(currentLetter.toLowerCase())) {
        const isValid = await validateWord(word);
        if (isValid) {
            score++;
            scoreDiv.innerText = `Score: ${score}`;
            wordInput.value = '';
            generateLetter();
        } else {
            alert('Invalid word!');
            wordInput.value = '';
        }
    } else {
        alert('Word does not start with the current letter!');
        wordInput.value = '';
    }
}

async function validateWord(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error('Word not found');
        const data = await response.json();
        return data.length > 0;
    } catch (error) {
        console.error('Error validating word:', error);
        return false;
    }
}

function resetGame() {
    score = 0;
    time = 60;
    scoreDiv.innerText = `Score: ${score}`;
    timerDiv.innerText = `Time: ${time}s`;
    wordInput.value = '';
    generateLetter();
}

wordInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        checkWord();
    }
});

startGame();
