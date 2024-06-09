document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const caughtLettersContainer = document.getElementById('caught-letters');
    const basket = document.getElementById('basket');
    const timerDisplay = document.getElementById('timer');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const vowels = 'AEIOU';
    const gameDuration = 20000; // 20 seconds
    const letterInterval = 1000; // Create a new letter every second
    let fallenLetters = new Set();
    let caughtLetters = [];
    let vowelsCount = 0;
    let intervalId;
    let timerId;

    const wordEntryContainer = document.getElementById('word-entry-container');
    const wordTimerDisplay = document.getElementById('word-timer');
    const inputWords = document.getElementById('input-words');
    const submitWordsButton = document.getElementById('submit-words');
    const scoreDisplay = document.getElementById('score');
    let wordEntryTimeLeft = 60; // 60 seconds for word entry
    let wordEntryInterval;

    function createFallingLetter(letter) {
        const letterElement = document.createElement('div');
        letterElement.textContent = letter;
        letterElement.classList.add('letter');
        gameContainer.appendChild(letterElement);

        const isVowel = vowels.includes(letter);
        const speed = isVowel ? Math.random() * 2 + 1 : Math.random() * 5 + 3; // Vowels: 1-3s, Consonants: 3-8s
        letterElement.style.animationDuration = `${speed}s`;
        letterElement.style.left = `${Math.random() * 90}%`; // Random horizontal position

        // Remove letter after animation ends and check if caught
        letterElement.addEventListener('animationiteration', () => {
            fallenLetters.delete(letter);
            letterElement.remove();
        });
        letterElement.addEventListener('animationend', () => {
            const basketRect = basket.getBoundingClientRect();
            const letterRect = letterElement.getBoundingClientRect();
            if (
                letterRect.bottom >= basketRect.top &&
                letterRect.left >= basketRect.left &&
                letterRect.right <= basketRect.right
            ) {
                caughtLetters.push(letter);
                letterElement.remove(); // Remove the letter immediately when caught
            }
        });
    }

    function startFallingLetters() {
        intervalId = setInterval(() => {
            if (fallenLetters.size >= letters.length || (Date.now() - startTime > gameDuration && vowelsCount >= 3)) {
                clearInterval(intervalId);
                setTimeout(endGame, 1000); // End game after a short delay
                return;
            }

            let randomIndex = Math.floor(Math.random() * letters.length);
            let randomLetter = letters[randomIndex];

            // Ensure at least 3 vowels fall
            if (vowelsCount < 3) {
                randomLetter = vowels[Math.floor(Math.random() * vowels.length)];
                if (!fallenLetters.has(randomLetter)) {
                    vowelsCount++;
                }
            }

            if (!fallenLetters.has(randomLetter)) {
                createFallingLetter(randomLetter);
                fallenLetters.add(randomLetter);
            }
        }, letterInterval);

        setTimeout(() => {
            clearInterval(intervalId);
        }, gameDuration);
    }

    function showCaughtLetters() {
        caughtLettersContainer.textContent = 'Caught Letters: ' + caughtLetters.join(', ');
        caughtLettersContainer.style.display = 'block';
    }

    function updateTimer() {
        const timeLeft = Math.max(0, Math.ceil((gameDuration - (Date.now() - startTime)) / 1000));
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerId);
        }
    }

    function endGame() {
        basket.style.display = 'none';
        showCaughtLetters();
        wordEntryContainer.style.display = 'block';
        startWordEntryTimer();
    }

    function startWordEntryTimer() {
        wordEntryInterval = setInterval(updateWordEntryTimer, 1000);
    }

    function updateWordEntryTimer() {
        wordEntryTimeLeft--;
        wordTimerDisplay.textContent = wordEntryTimeLeft;
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
        scoreDisplay.textContent = `Score: ${score}`;
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

    // Move basket with mouse
    document.addEventListener('mousemove', (event) => {
        const basketWidth = basket.offsetWidth;
        const containerRect = gameContainer.getBoundingClientRect();
        let newLeft = event.clientX - containerRect.left - basketWidth / 2;
        newLeft = Math.max(0, Math.min(newLeft, containerRect.width - basketWidth));
        basket.style.left = `${newLeft}px`;
    });

    const startTime = Date.now();
    startFallingLetters();
    timerId = setInterval(updateTimer, 1000); // Update timer every second

    // Add event listener to the button
    const gotoNextGameButton = document.getElementById('goto-next-game');
    gotoNextGameButton.addEventListener('click', () => {
        // Redirect to the linked game
        window.location.href = '../WordFinder/Home.html';
    });
});
